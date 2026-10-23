/**
 * Soffit: o degradê animado em WebGL2 que pinta os fundos azuis da Sagital.
 * Um triângulo de tela cheia e um fragment shader; a CPU só segue o ponteiro,
 * envia os uniforms e desenha. Para mudar as cores, mexa no CONFIG, nunca no
 * shader: a rampa é percorrida em conjunto e as paradas dependem umas das
 * outras.
 *
 * Diferenças para o original, que ocupava a janela inteira: a tela segue o
 * tamanho do próprio elemento, o ponteiro é medido em relação a ele (e preso
 * às bordas, para um cursor longe não entortar a luz) e, com movimento
 * reduzido, desenha um quadro parado no lugar da animação.
 */

const CONFIG = {
  bgColor: "#062334",
  colorA: "#2b7be8",
  colorB: "#2bc8e8",
  colorC: "#4fe0d8",
  colorD: "#7fe8a0",
  scale: 1,
  speed: 0.33,
  tilt: 1.87,
  rock: 0.12,
  horizon: 0.36,
  breathe: 0.29,
  spread: 0.41,
  curve: 3.32,
  direct: 0.97,
  bounce: 0.38,
  bounceCurve: 4.25,
  spillCentre: 0.3,
  spillWidth: 2.18,
  spillFloor: 0.26,
  amount: 0.2,
  warp: 2.58,
  warpScale: 0.78,
  flow: 0.475,
  roughness: 0.29,
  lacunarity: 1.99,
  motes: 0.074,
  moteScale: 7,
  ambient: 0.24,
  contrast: 2.45,
  midpoint: 0.57,
  sink: 0.24,
  glow: 0.38,
  grain: 0,
  grainAnim: 0,
  dither: 0.58,
  vignette: 0.21,
  steer: -0.13,
  lift: 0.11,
  sweep: 0.5,
  cursor: 1,
  parallax: 0.0137,
  maxDpr: 1,
};

/** Cor de fundo do degradê, para o que fica em volta (cabeçalho, barra do navegador). */
export const COR_DO_SOFFIT = CONFIG.bgColor;

const VERT = `#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  iResolution;
uniform float iTime;
uniform vec2  iMouse;          // aspect-corrected units, same space as uv
uniform float uScale;          // zoom of the whole picture — uv and the pointer together

uniform vec3  uBg, uColorA, uColorB, uColorC, uColorD;
uniform float uSpeed, uTilt, uRock, uHorizon, uBreathe, uSpread, uCurve, uDirect;
uniform float uBounce, uBounceCurve;
uniform float uSpillCentre, uSpillWidth, uSpillFloor;
uniform float uAmount, uWarp, uWarpScale, uFlow, uRoughness, uLacunarity, uMotes, uMoteScale;
uniform float uAmbient, uContrast, uMidpoint, uSink, uGlow;
uniform float uGrain, uDither, uVignette;
uniform float uSteer, uLift, uSweep, uParallax;

#define OCTAVES 4

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float snoise(vec2 p) {
  const float K1 = 0.366025404, K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  float m = step(a.y, a.x);
  vec2 o = vec2(m, 1.0 - m);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * h * vec3(dot(a, hash2(i)), dot(b, hash2(i + o)), dot(c, hash2(i + 1.0)));
  return dot(n, vec3(70.0));
}

float fbm(vec2 p) {
  float v = 0.0, amp = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    v += amp * snoise(p);
    p *= uLacunarity;
    amp *= uRoughness;
  }
  return v;
}

vec3 ramp4(float t) {
  vec3 c = mix(uColorA, uColorB, smoothstep(0.00, 0.36, t));
  c = mix(c, uColorC, smoothstep(0.32, 0.70, t));
  c = mix(c, uColorD, smoothstep(0.66, 1.00, t));
  return c;
}

float triDither(vec2 fc) {
  float a = fract(sin(dot(fc, vec2(12.9898, 78.233))) * 43758.5453);
  float b = fract(sin(dot(fc + 17.0, vec2(12.9898, 78.233))) * 43758.5453);
  return (a + b - 1.0) / 255.0;
}


// ---- house grain. ONE look across the collection: an integer hash (no sin() streaks),
// triangular so it reads as film rather than static, weighted into the midtones so it
// never crusts a black or a white. Static by default; uGrainAnim re-seeds it 24×/s.
uniform float uGrainAnim;
float houseGrain(vec2 fc) {
  uvec2 q = uvec2(fc) * uvec2(1597334677u, 3812015801u)
          + uint(floor(iTime * 24.0 * uGrainAnim)) * 2654435769u;
  uint n = q.x ^ q.y; n = n * 1664525u + 1013904223u; n ^= n >> 16u; n *= 2246822519u; n ^= n >> 13u;
  float a = float(n & 0xffffu) / 65535.0;
  n *= 3266489917u; n ^= n >> 16u;
  float b = float(n & 0xffffu) / 65535.0;
  return a + b - 1.0;
}
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution) / iResolution.y;
  uv *= uScale;                             // scale: zoom of the whole picture
  vec2 iM = iMouse * uScale;                // the pointer, in the same zoomed space
  float t = iTime * uSpeed;

  vec2 p = uv - iM * uParallax;

  // THE LIGHT HAS A DIRECTION and the picture is that direction, not a pattern. Everything
  // below is a function of ONE number: how far along the light axis this pixel is. The noise
  // is only allowed to perturb that number, which is the difference between a lit surface
  // and a noise field with a nice palette on it.
  float tilt = uTilt + sin(t * 0.13) * uRock + iM.x * uSteer;
  vec2 dir = vec2(cos(tilt), sin(tilt));
  float axis = dot(p, dir);
  float across = dot(p, vec2(-dir.y, dir.x));

  // the air the light crosses, as a domain-warped field. Held to uAmount: past about a third
  // it stops perturbing the light and starts being the subject, and the direction dissolves.
  vec2 q = vec2(fbm(p * uWarpScale + vec2(0.0, t * uFlow)),
                fbm(p * uWarpScale + vec2(5.2, 1.3) - t * uFlow * 0.7));
  float air = fbm(p + uWarp * q + vec2(t * 0.12, -t * 0.09)) * 0.5 + 0.5;

  float horizon = uHorizon + sin(t * 0.09 + 2.1) * uBreathe - iM.y * uLift;
  float alt = clamp(0.5 + (axis - horizon) * uSpread + (air - 0.5) * uAmount, 0.0, 1.0);

  // THE OPENING IS NOT INFINITELY WIDE. A band across the light axis — never a disc — so the
  // brightest part of the frame sits off to one side and the composition has a long empty end.
  float ac = (across - uSpillCentre - iM.x * uSweep) / max(0.05, uSpillWidth);
  float spill = mix(uSpillFloor, 1.0, exp(-ac * ac));

  float direct = pow(alt, max(0.05, uCurve)) * uDirect * spill;

  // THE BOUNCE. Light that has already been in the shade and come back out of it: it falls off
  // the OTHER way, so the deep end lifts off the floor instead of dying to a flat black. This
  // is the whole reason a shadow can be a subject rather than an absence.
  float bounce = uBounce * pow(1.0 - alt, max(0.05, uBounceCurve));

  float f = uAmbient + direct + bounce;
  f += uMotes * snoise(p * uMoteScale + vec2(-t * 0.5, t * 0.35)) * 0.5 * alt;

  f = clamp((f - uMidpoint) * uContrast + 0.5, 0.0, 1.0);

  vec3 col = ramp4(f);
  col += uColorD * uGlow * pow(f, 4.0);
  col = mix(uBg, col, smoothstep(0.0, max(0.01, uSink), f) * 0.90 + 0.10);

  col *= 1.0 - uVignette * dot(uv, uv);
  { float hgL = clamp(dot(col, vec3(0.299, 0.587, 0.114)), 0.0, 1.0);
    col += houseGrain(gl_FragCoord.xy) * uGrain * mix(1.0, 4.0 * hgL * (1.0 - hgL), 0.6); }
  col += triDither(gl_FragCoord.xy) * uDither;

  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

function hexParaVec3(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/** Uniform de cada chave do CONFIG: "u" + a chave com inicial maiúscula. */
const UNIFORMS_DE_COR = {
  uBg: CONFIG.bgColor,
  uColorA: CONFIG.colorA,
  uColorB: CONFIG.colorB,
  uColorC: CONFIG.colorC,
  uColorD: CONFIG.colorD,
};
const CHAVES_NUMERICAS = [
  "scale",
  "speed",
  "tilt",
  "rock",
  "horizon",
  "breathe",
  "spread",
  "curve",
  "direct",
  "bounce",
  "bounceCurve",
  "spillCentre",
  "spillWidth",
  "spillFloor",
  "amount",
  "warp",
  "warpScale",
  "flow",
  "roughness",
  "lacunarity",
  "motes",
  "moteScale",
  "ambient",
  "contrast",
  "midpoint",
  "sink",
  "glow",
  "grain",
  "grainAnim",
  "dither",
  "vignette",
  "steer",
  "lift",
  "sweep",
  "parallax",
] as const;

/**
 * Liga o degradê num <canvas>. Devolve a função que desliga tudo, ou null
 * quando o navegador não tem WebGL2 (o fundo em CSS continua no lugar).
 * Ao desenhar o primeiro quadro, marca o canvas com data-pronto.
 */
export function iniciarSoffit(canvas: HTMLCanvasElement): (() => void) | null {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
  });
  if (!gl) return null;

  const compilar = (tipo: number, fonte: string) => {
    const sh = gl.createShader(tipo);
    if (!sh) return null;
    gl.shaderSource(sh, fonte);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  };
  const vert = compilar(gl.VERTEX_SHADER, VERT);
  const frag = compilar(gl.FRAGMENT_SHADER, FRAG);
  const programa = gl.createProgram();
  if (!vert || !frag) return null;
  gl.attachShader(programa, vert);
  gl.attachShader(programa, frag);
  gl.linkProgram(programa);
  gl.deleteShader(vert);
  gl.deleteShader(frag);
  if (!gl.getProgramParameter(programa, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(programa));
    return null;
  }
  gl.useProgram(programa);
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const local = (nome: string) => gl.getUniformLocation(programa, nome);
  for (const [nome, hex] of Object.entries(UNIFORMS_DE_COR)) {
    gl.uniform3f(local(nome), ...hexParaVec3(hex));
  }
  for (const chave of CHAVES_NUMERICAS) {
    gl.uniform1f(
      local(`u${chave[0].toUpperCase()}${chave.slice(1)}`),
      CONFIG[chave],
    );
  }
  const uResolucao = local("iResolution");
  const uTempo = local("iTime");
  const uMouse = local("iMouse");

  const parado = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desenhar = () => {
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.dataset.pronto = "";
  };

  // Tamanho: o do próprio elemento, com a densidade de pixels limitada (o
  // custo cresce com o quadrado dela). Um ajuste por quadro, no máximo.
  const redimensionar = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxDpr);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uResolucao, w, h);
    if (parado) desenhar();
  };
  let ajustePendente = 0;
  const observadorDeTamanho = new ResizeObserver(() => {
    if (ajustePendente) return;
    ajustePendente = requestAnimationFrame(() => {
      ajustePendente = 0;
      redimensionar();
    });
  });
  observadorDeTamanho.observe(canvas);

  // Ponteiro: o evento só anota onde está a mão; o quadro converte para o
  // espaço do elemento e segue com dois atrasos (um rápido puxando um lento).
  const mouse = { x: 0, y: 0, ax: 0, ay: 0, cx: NaN, cy: NaN };
  const mirar = (e: PointerEvent) => {
    mouse.cx = e.clientX;
    mouse.cy = e.clientY;
  };
  if (!parado && CONFIG.cursor) {
    addEventListener("pointermove", mirar, { passive: true });
    addEventListener("pointerdown", mirar, { passive: true });
  }

  let visivel = true;
  const observadorDeVista = new IntersectionObserver(
    (es) => {
      visivel = es[0]?.isIntersecting ?? false;
    },
    { threshold: 0 },
  );
  observadorDeVista.observe(canvas);

  // Relógio acumulado do intervalo entre quadros, preso entre 4,17 e 50 ms:
  // a mesma velocidade em 60, 120 ou 144 Hz, e a volta de uma aba escondida
  // custa uma pausa, nunca um salto.
  let quadro = 0;
  let anterior = performance.now();
  let relogio = 0;
  const passo = (agora: number) => {
    quadro = requestAnimationFrame(passo);
    const bruto = agora - anterior;
    anterior = agora;
    if (!visivel || document.hidden) return;
    const ms = bruto > 50 ? 50 : bruto < 4.167 ? 4.167 : bruto;
    const s = ms > 36.7 ? 2.2 : ms * 0.06;
    relogio += ms * 0.001;

    let tx = 0;
    let ty = 0;
    if (!Number.isNaN(mouse.cx)) {
      const r = canvas.getBoundingClientRect();
      const a = r.width / Math.max(1, r.height);
      const nx = Math.min(
        1,
        Math.max(0, (mouse.cx - r.left) / Math.max(1, r.width)),
      );
      const ny = Math.min(
        1,
        Math.max(0, (mouse.cy - r.top) / Math.max(1, r.height)),
      );
      tx = (nx - 0.5) * a;
      ty = 0.5 - ny;
    }
    const kLead = 0.105 * s;
    const kBody = 0.043 * s;
    mouse.ax += (tx - mouse.ax) * kLead;
    mouse.ay += (ty - mouse.ay) * kLead;
    mouse.x += (mouse.ax - mouse.x) * kBody;
    mouse.y += (mouse.ay - mouse.y) * kBody;

    gl.uniform1f(uTempo, relogio);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    desenhar();
  };

  gl.uniform1f(uTempo, 0);
  gl.uniform2f(uMouse, 0, 0);
  redimensionar();
  // Um quadro antes de revelar, para nunca aparecer um canvas vazio.
  desenhar();
  if (!parado) quadro = requestAnimationFrame(passo);

  return () => {
    cancelAnimationFrame(quadro);
    cancelAnimationFrame(ajustePendente);
    observadorDeTamanho.disconnect();
    observadorDeVista.disconnect();
    removeEventListener("pointermove", mirar);
    removeEventListener("pointerdown", mirar);
    gl.deleteVertexArray(vao);
    gl.deleteProgram(programa);
    delete canvas.dataset.pronto;
  };
}
