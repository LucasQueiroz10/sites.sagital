/**
 * Blocos: os blocos de montar translúcidos da agência Bloco, desenhados em
 * WebGL2 por raymarching. Cada bloco é um 2x2 de verdade (casca oca, tubo
 * central por baixo e quatro pinos), e o raio atravessa o plástico inteiro:
 * a cada parede soma o reflexo do estúdio (Fresnel) e, dentro do material,
 * perde luz pela espessura (Beer-Lambert). É isso que deixa ver o tubo e os
 * pinos de trás através da fumaça, como nas fotos de produto.
 *
 * A CPU só monta a cena (onde está cada bloco, a câmera) e desenha um quadro
 * quando pedem. Quem usa decide quando: a abertura gira sem parar enquanto
 * está na tela, o processo só redesenha quando a rolagem muda.
 */

export type Material = "fume" | "ambar" | "laranja";

export type Bloco = {
  /** Centro no mundo. Um bloco mede 2 x 1,2 x 2 (sem os pinos). */
  posicao: Vec3;
  /** Matriz de rotação (local para mundo), de `girar`. */
  giro: Mat3;
  material: Material;
};

export type Camera = {
  alvo: Vec3;
  distancia: number;
  /** Ângulo em volta do eixo vertical, em radianos. */
  azimute: number;
  /** Ângulo acima do horizonte, em radianos. */
  elevacao: number;
  /** Distância focal em alturas de tela: maior é mais fechado. */
  foco: number;
};

export type Cena = {
  blocos: Bloco[];
  camera: Camera;
  /** Um eixo roscado de metal passando pelos blocos (o processo). */
  eixo?: { de: Vec3; ate: Vec3; raio: number };
  /**
   * Quanto o plástico escurece a luz (1 = padrão). Menos deixa ver o eixo e
   * os tubos por dentro quando o bloco é visto de lado.
   */
  densidade?: number;
};

export type Fundo = {
  /** Cor de cima e de baixo, em hex. Iguais para fundo liso. */
  topo: string;
  base: string;
  /**
   * Com `opaco`, a tela inteira leva o fundo (uma imagem pronta). Sem ele,
   * fora dos blocos fica transparente e a página aparece por trás.
   */
  opaco?: boolean;
};

export type Vec3 = [number, number, number];
/** 3x3 em colunas, como o WebGL espera. */
export type Mat3 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

const MAX_BLOCOS = 8;

const CODIGO_DO_MATERIAL: Record<Material, number> = {
  fume: 0,
  ambar: 1,
  laranja: 2,
};

/* ---------- Matemática pequena ---------- */

/** Rotação: guinada (eixo vertical), arfagem (x) e rolagem (z), nessa ordem. */
export function girar(guinada = 0, arfagem = 0, rolagem = 0): Mat3 {
  const [cy, sy] = [Math.cos(guinada), Math.sin(guinada)];
  const [cx, sx] = [Math.cos(arfagem), Math.sin(arfagem)];
  const [cz, sz] = [Math.cos(rolagem), Math.sin(rolagem)];
  // R = Ry * Rx * Rz, escrita direto em colunas.
  return [
    cy * cz + sy * sx * sz,
    cx * sz,
    -sy * cz + cy * sx * sz,
    -cy * sz + sy * sx * cz,
    cx * cz,
    sy * sz + cy * sx * cz,
    sy * cx,
    -sx,
    cy * cx,
  ];
}

export function multiplicar(a: Mat3, b: Mat3): Mat3 {
  const r = new Array(9).fill(0) as Mat3;
  for (let col = 0; col < 3; col++) {
    for (let lin = 0; lin < 3; lin++) {
      let s = 0;
      for (let k = 0; k < 3; k++) s += a[k * 3 + lin] * b[col * 3 + k];
      r[col * 3 + lin] = s;
    }
  }
  return r;
}

export function aplicar(m: Mat3, v: Vec3): Vec3 {
  return [
    m[0] * v[0] + m[3] * v[1] + m[6] * v[2],
    m[1] * v[0] + m[4] * v[1] + m[7] * v[2],
    m[2] * v[0] + m[5] * v[1] + m[8] * v[2],
  ];
}

function transpor(m: Mat3): Mat3 {
  return [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]];
}

const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const normalizar = (a: Vec3): Vec3 => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};

/** Posição e base da câmera: frente, direita e cima. */
function baseDaCamera(c: Camera) {
  const ce = Math.cos(c.elevacao);
  const origem: Vec3 = [
    c.alvo[0] + c.distancia * ce * Math.sin(c.azimute),
    c.alvo[1] + c.distancia * Math.sin(c.elevacao),
    c.alvo[2] + c.distancia * ce * Math.cos(c.azimute),
  ];
  const frente = normalizar(sub(c.alvo, origem));
  const direita = normalizar(cross(frente, [0, 1, 0]));
  const cima = cross(direita, frente);
  return { origem, frente, direita, cima };
}

/**
 * Onde um ponto do mundo cai na tela, em pixels CSS a partir do canto de
 * cima à esquerda. Mesma conta do shader: serve para ligar as legendas do
 * processo aos blocos.
 */
export function projetar(
  camera: Camera,
  ponto: Vec3,
  largura: number,
  altura: number,
): { x: number; y: number } {
  const b = baseDaCamera(camera);
  const v = sub(ponto, b.origem);
  const z = Math.max(dot(v, b.frente), 0.001);
  const u = (dot(v, b.direita) / z) * camera.foco;
  const w = (dot(v, b.cima) / z) * camera.foco;
  return { x: largura / 2 + u * altura, y: altura / 2 - w * altura };
}

function hexParaLinear(hex: string): Vec3 {
  const n = parseInt(hex.replace("#", ""), 16);
  const canal = (c: number) => Math.pow(c / 255, 2.2);
  return [canal((n >> 16) & 255), canal((n >> 8) & 255), canal(n & 255)];
}

/* ---------- Shaders ---------- */

const VERT = `#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
out vec4 saida;

uniform vec2 uRes;
uniform vec3 uCamOrigem, uCamFrente, uCamDireita, uCamCima;
uniform float uFoco;
uniform int uQtd;
uniform vec4 uBloco[${MAX_BLOCOS}];   // centro e material
uniform mat3 uLocal[${MAX_BLOCOS}];   // mundo para local
uniform vec4 uEsfera;                 // esfera que envolve a cena
uniform vec4 uEixoA;                  // ponta e raio (0 = sem eixo)
uniform vec3 uEixoB;
uniform vec3 uFundoTopo, uFundoBase;  // lineares
uniform float uOpaco;
uniform float uDensidade;             // escala da absorção
uniform float uFuro;                  // raio do furo do eixo (0 = sem furo)

float caixa(vec3 p, vec3 b, float r) {
  vec3 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}

// O 2x2: casca com 0,14 de parede, aberta embaixo; tubo central; pinos.
float bloco(vec3 p) {
  float fora = caixa(p, vec3(1.0, 0.6, 1.0), 0.035);
  float dentro = caixa(p - vec3(0.0, -0.16, 0.0), vec3(0.86, 0.6, 0.86), 0.02);
  float d = max(fora, -dentro);
  // Tubo e pinos entram um pouco na casca: face com face encostada deixa
  // uma fresta de ar finíssima, e o raio se perde nela.
  vec2 t = vec2(length(p.xz) - 0.3, p.y + 0.06);
  d = min(d, max(abs(t.x) - 0.055, abs(t.y) - 0.54));
  vec3 q = vec3(abs(p.x) - 0.5, p.y - 0.67, abs(p.z) - 0.5);
  vec2 c = vec2(length(q.xz) - 0.25, abs(q.y) - 0.08);
  d = min(d, min(max(c.x, c.y), 0.0) + length(max(c, 0.0)) - 0.02);
  // O furo por onde passa o eixo: sem ele, o metal ficaria dentro do
  // plástico e o raio se perderia ali.
  if (uFuro > 0.0) d = max(d, uFuro - length(p.xz));
  return d;
}

float eixo(vec3 p) {
  vec3 pa = p - uEixoA.xyz, ba = uEixoB - uEixoA.xyz;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  float ao_longo = h * length(ba);
  // A rosca: sulcos em volta do eixo, como um parafuso sem fim.
  float r = length(pa - ba * h) - uEixoA.w - 0.035 * sin(ao_longo * 26.0);
  return r * 0.7;
}

vec2 mapa(vec3 p) {
  float d = 1e5, m = 0.0;
  for (int i = 0; i < ${MAX_BLOCOS}; i++) {
    if (i >= uQtd) break;
    vec3 l = uLocal[i] * (p - uBloco[i].xyz);
    float limite = length(l) - 1.7;
    float di = limite > 0.25 ? limite : bloco(l);
    if (di < d) { d = di; m = uBloco[i].w; }
  }
  if (uEixoA.w > 0.0) {
    float e = eixo(p);
    if (e < d) { d = e; m = 3.0; }
  }
  return vec2(d, m);
}

// Quanto o raio se afasta da parede depois de entrar ou sair. Precisa
// passar do limiar de contato (que cresce com o tamanho do pixel): se não,
// numa tela pequena o raio sai e "entra" de novo na mesma parede, somando
// reflexos até o bloco parecer opaco.
float afastamento(float t, float pixel) {
  return max(0.004, t * pixel * 0.6);
}

vec3 normal(vec3 p) {
  const vec2 k = vec2(1.0, -1.0);
  const float e = 0.0015;
  return normalize(
    k.xyy * mapa(p + k.xyy * e).x + k.yyx * mapa(p + k.yyx * e).x +
    k.yxy * mapa(p + k.yxy * e).x + k.xxx * mapa(p + k.xxx * e).x);
}

// O estúdio: chão escuro, teto claro, uma caixa de luz grande em cima, atrás
// dos blocos (as faces de cima a refletem), e uma faixa mais fraca à direita,
// que desenha as quinas.
vec3 estudio(vec3 r) {
  vec3 c = mix(vec3(0.05), vec3(0.85), smoothstep(-0.35, 0.95, r.y));
  c += 1.7 * smoothstep(0.86, 0.975, dot(r, normalize(vec3(-0.35, 0.8, -0.5))));
  c += 1.6 * smoothstep(0.88, 0.97, dot(r, normalize(vec3(0.95, 0.25, -0.2))));
  return c;
}

vec3 absorcao(float m) {
  if (m < 0.5) return vec3(6.0, 6.2, 6.6) * uDensidade;    // fumê
  return vec3(0.45, 6.0, 14.0) * uDensidade;               // âmbar
}

vec3 borda(float m) {
  if (m < 0.5) return vec3(0.03);
  if (m < 1.5) return vec3(0.55, 0.12, 0.01);
  if (m < 2.5) return vec3(0.6, 0.08, 0.0);
  return vec3(0.2);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 rd = normalize(uCamFrente * uFoco + uCamDireita * uv.x + uCamCima * uv.y);
  vec3 ro = uCamOrigem;
  vec3 fundo = mix(uFundoBase, uFundoTopo, gl_FragCoord.y / uRes.y);
  float pixel = 1.0 / (uRes.y * uFoco);

  // Só marcha dentro da esfera que envolve a cena.
  vec3 oc = ro - uEsfera.xyz;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - uEsfera.w * uEsfera.w;
  float disc = b * b - c;
  if (disc < 0.0) {
    saida = uOpaco > 0.5 ? vec4(pow(fundo, vec3(1.0 / 2.2)), 1.0) : vec4(0.0);
    return;
  }
  float raiz = sqrt(disc);
  float t = max(-b - raiz, 0.0);
  float tFim = -b + raiz;

  vec3 luz = vec3(0.0), passa = vec3(1.0);
  bool dentro = false, tocou = false;
  float menor = 1e5, matPerto = 0.0, mat = 0.0;
  vec3 L = normalize(vec3(-0.35, 0.8, -0.5));
  vec3 L2 = normalize(vec3(-0.25, 0.75, 0.65));

  for (int i = 0; i < 360; i++) {
    vec3 p = ro + rd * t;
    vec2 h = mapa(p);
    float d = h.x;
    if (!dentro) {
      if (!tocou) {
        float razao = d / (t * pixel);
        if (razao < menor) { menor = razao; matPerto = h.y; }
      }
      if (d < max(0.0008, t * pixel * 0.25)) {
        tocou = true;
        mat = h.y;
        vec3 n = normal(p);
        float cosi = max(dot(n, -rd), 0.0);
        float F = 0.05 + 0.95 * pow(1.0 - cosi, 5.0);
        vec3 refl = estudio(reflect(rd, n));
        if (mat > 1.5) {
          // Opacos: o bloco laranja liso e o eixo de metal.
          float dif = 0.3 + 0.7 * max(dot(n, L), 0.0);
          float brilho = pow(max(dot(reflect(rd, n), L), 0.0), 70.0);
          vec3 cor = mat < 2.5
            ? vec3(0.81, 0.083, 0.002) * (0.45 + 0.55 * dif) + F * refl * 0.6 + brilho * 0.7
            : vec3(0.32, 0.33, 0.35) * dif * 0.6 + refl * 0.35 + brilho;
          luz += passa * cor;
          passa = vec3(0.0);
          break;
        }
        // Verniz: o reflexo do estúdio e o ponto de luz da caixa grande.
        // Mais um ponto de luz, na frente e à esquerda, para o brilho das
        // quinas viradas para quem olha.
        vec3 r = reflect(rd, n);
        float realce = pow(max(dot(r, L), 0.0), 90.0) * 0.8 +
          pow(max(dot(r, L2), 0.0), 140.0) * 0.9;
        luz += passa * (F * refl * 1.4 + realce);
        // Um pouco de luz espalhada no próprio plástico, dos lados virados
        // para a caixa de luz.
        vec3 tom = mat < 0.5 ? vec3(0.05, 0.045, 0.04) : vec3(0.5, 0.16, 0.01);
        float carga = clamp(uDensidade, 0.0, 1.0);
        luz += passa * (1.0 - F) * tom * carga * (0.25 + 0.75 * max(dot(n, L), 0.0));
        // O corante do plástico: cada parede atravessada tinge a luz (menos
        // nas cenas de plástico mais ralo).
        vec3 corante = mat < 0.5 ? vec3(0.74, 0.72, 0.7) : vec3(0.96, 0.6, 0.28);
        passa *= (1.0 - F) * mix(vec3(1.0), corante, carga);
        dentro = true;
        // Afasta da parede pela normal, não pelo raio: num raio rasante, um
        // passo fixo deixaria o ponto colado nela e ele "sairia" na hora.
        t += afastamento(t, pixel) / max(cosi, 0.12);
        continue;
      }
      // Passo mínimo de um oitavo de pixel: maior que isso, a silhueta
      // ficaria tracejada (o raio pula a quina sem medir o quanto passou perto).
      t += max(d, t * pixel * 0.12);
    } else {
      // Dentro do plástico: anda até a parede de saída. Quando o passo
      // atravessa, a bissecção acha o ponto exato, e a luz perde só a
      // espessura real (sem ela, a espessura vira degraus de brilho).
      bool saiu = false;
      float tn = t + max(-d, 0.012);
      if (mapa(ro + rd * tn).x > 0.0) {
        float lo = t;
        for (int k = 0; k < 7; k++) {
          float meio = 0.5 * (lo + tn);
          if (mapa(ro + rd * meio).x > 0.0) tn = meio; else lo = meio;
        }
        saiu = true;
      }
      passa *= exp(-absorcao(mat) * (tn - t));
      t = tn;
      if (saiu) {
        vec3 n = normal(ro + rd * t);
        float cosr = max(dot(n, rd), 0.0);
        float F = 0.04 + 0.96 * pow(1.0 - cosr, 5.0);
        luz += passa * F * 0.4 * estudio(reflect(rd, -n));
        passa *= 1.0 - F;
        dentro = false;
        t += afastamento(t, pixel) / max(cosr, 0.12);
        continue;
      }
    }
    if (t > tFim || max(passa.r, max(passa.g, passa.b)) < 0.004) break;
  }

  vec3 cor = luz + passa * fundo;
  // Antisserrilhado da silhueta: o raio que passou a menos de um pixel do
  // bloco cobre parte dele.
  float cobre = tocou ? 1.0 : clamp(0.5 - menor, 0.0, 1.0);
  if (!tocou) cor = mix(fundo, borda(matPerto), 0.45);
  cor = pow(clamp(cor, 0.0, 1.0), vec3(1.0 / 2.2));
  if (uOpaco > 0.5) {
    vec3 f = pow(fundo, vec3(1.0 / 2.2));
    saida = vec4(mix(f, cor, cobre), 1.0);
  } else {
    saida = vec4(cor * cobre, cobre);
  }
}`;

/* ---------- Renderizador ---------- */

export type Renderizador = {
  /** Desenha um quadro. Ajusta o tamanho da tela ao elemento antes. */
  desenhar(cena: Cena): void;
  /** Pixels por pixel CSS. Aparelho lento: menos pixels, mesma cena. */
  definirDensidade(densidade: number): void;
  destruir(): void;
};

/**
 * Prepara o WebGL2 na tela. Devolve null sem WebGL2 (ou se o shader falhar),
 * e quem chamou fica com o que já estava por trás: uma imagem parada.
 */
export function criarRenderizador(
  canvas: HTMLCanvasElement,
  fundo: Fundo,
  { densidadeMaxima = 1.5 }: { densidadeMaxima?: number } = {},
): Renderizador | null {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    preserveDrawingBuffer: false,
  });
  if (!gl) return null;

  const compilar = (tipo: number, codigo: string) => {
    const s = gl.createShader(tipo)!;
    gl.shaderSource(s, codigo);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  };
  const vs = compilar(gl.VERTEX_SHADER, VERT);
  const fs = compilar(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const programa = gl.createProgram()!;
  gl.attachShader(programa, vs);
  gl.attachShader(programa, fs);
  gl.linkProgram(programa);
  if (!gl.getProgramParameter(programa, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(programa));
    return null;
  }
  gl.useProgram(programa);
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const u = (nome: string) => gl.getUniformLocation(programa, nome);
  const loc = {
    res: u("uRes"),
    origem: u("uCamOrigem"),
    frente: u("uCamFrente"),
    direita: u("uCamDireita"),
    cima: u("uCamCima"),
    foco: u("uFoco"),
    qtd: u("uQtd"),
    bloco: u("uBloco"),
    local: u("uLocal"),
    esfera: u("uEsfera"),
    eixoA: u("uEixoA"),
    eixoB: u("uEixoB"),
    topo: u("uFundoTopo"),
    base: u("uFundoBase"),
    opaco: u("uOpaco"),
    densidade: u("uDensidade"),
    furo: u("uFuro"),
  };

  gl.uniform3fv(loc.topo, hexParaLinear(fundo.topo));
  gl.uniform3fv(loc.base, hexParaLinear(fundo.base));
  gl.uniform1f(loc.opaco, fundo.opaco ? 1 : 0);

  const blocos = new Float32Array(MAX_BLOCOS * 4);
  const locais = new Float32Array(MAX_BLOCOS * 9);
  let densidade = densidadeMaxima;

  return {
    definirDensidade(valor) {
      densidade = valor;
    },
    desenhar(cena) {
      const dpr = Math.min(window.devicePixelRatio || 1, densidade);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(loc.res, w, h);

      const cam = baseDaCamera(cena.camera);
      gl.uniform3fv(loc.origem, cam.origem);
      gl.uniform3fv(loc.frente, cam.frente);
      gl.uniform3fv(loc.direita, cam.direita);
      gl.uniform3fv(loc.cima, cam.cima);
      gl.uniform1f(loc.foco, cena.camera.foco);

      const qtd = Math.min(cena.blocos.length, MAX_BLOCOS);
      // A esfera que envolve tudo: o centro médio e o ponto mais longe.
      let centro: Vec3 = [0, 0, 0];
      cena.blocos.slice(0, qtd).forEach((b) => {
        centro = [
          centro[0] + b.posicao[0] / qtd,
          centro[1] + b.posicao[1] / qtd,
          centro[2] + b.posicao[2] / qtd,
        ];
      });
      let raio = 0;
      for (let i = 0; i < qtd; i++) {
        const b = cena.blocos[i];
        blocos.set([...b.posicao, CODIGO_DO_MATERIAL[b.material]], i * 4);
        locais.set(transpor(b.giro), i * 9);
        const d = sub(b.posicao, centro);
        raio = Math.max(raio, Math.hypot(d[0], d[1], d[2]) + 1.8);
      }
      if (cena.eixo) {
        for (const ponta of [cena.eixo.de, cena.eixo.ate]) {
          const d = sub(ponta, centro);
          raio = Math.max(raio, Math.hypot(d[0], d[1], d[2]) + 0.3);
        }
      }
      gl.uniform1i(loc.qtd, qtd);
      gl.uniform1f(loc.densidade, cena.densidade ?? 1);
      // O furo do eixo tem o raio de dentro do tubo: vira um canal só, sem
      // fresta fina entre o metal e o plástico.
      gl.uniform1f(loc.furo, cena.eixo ? 0.24 : 0);
      gl.uniform4fv(loc.bloco, blocos);
      gl.uniformMatrix3fv(loc.local, false, locais);
      gl.uniform4f(loc.esfera, centro[0], centro[1], centro[2], raio);
      if (cena.eixo) {
        gl.uniform4f(loc.eixoA, ...cena.eixo.de, cena.eixo.raio);
        gl.uniform3fv(loc.eixoB, cena.eixo.ate);
      } else {
        gl.uniform4f(loc.eixoA, 0, 0, 0, 0);
        gl.uniform3f(loc.eixoB, 0, 1, 0);
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    destruir() {
      gl.deleteProgram(programa);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteVertexArray(vao);
    },
  };
}
