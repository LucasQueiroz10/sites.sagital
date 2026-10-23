/**
 * Retícula: o fundo da página inicial da Sagital. Uma retícula de impressão
 * (pontos numa grade girada a 45°, como a de uma gráfica) que desenha um
 * feixe diagonal, o corte "sagital", descendo do canto de cima à direita.
 * No eixo do feixe os pontos crescem; nas bordas, encolhem até sumir. Uma
 * tinta só, o royal da marca, sobre o marinho.
 *
 * É desenhada uma vez por tamanho de tela (sem laço de animação): o
 * movimento, quando há, é o elemento inteiro deslizando por CSS.
 */

/** O marinho atrás da retícula; também a cor da barra do navegador. */
export const COR_DA_NOITE = "#0b1536";

/** A tinta: dos pontos menores (mais apagados) aos maiores. */
const TINTA_FRACA = [24, 53, 134] as const; // #183586
const TINTA_FORTE = [56, 108, 236] as const; // #386cec

/** Quantos tons de tinta: cada um vira um Path2D, preenchido de uma vez. */
const TONS = 8;

export type OpcoesDaReticula = {
  /** Distância entre os pontos, em px de CSS. */
  passo: number;
  /** Onde o feixe nasce e para onde vai, em fração da largura e da altura. */
  de: [number, number];
  para: [number, number];
  /** Meia largura do feixe, em fração da diagonal do quadro. */
  largura: number;
  /** Cobertura máxima no eixo do feixe (0 a 1): abaixo de 0,7 os pontos nunca se tocam. */
  forca: number;
  /** Uma linha fina paralela ao feixe, abaixo dele: o eco do corte. */
  eco?: { distancia: number; largura: number; forca: number };
  /** Cobertura mínima no resto do fundo: uma textura quase invisível. */
  base: number;
};

export const RETICULA_DA_PAGINA: OpcoesDaReticula = {
  passo: 8,
  de: [0.98, -0.04],
  para: [0.06, 1],
  largura: 0.1,
  forca: 0.66,
  base: 0.035,
  eco: { distancia: 0.2, largura: 0.018, forca: 0.34 },
};

export const RETICULA_DO_PALCO: OpcoesDaReticula = {
  passo: 6,
  de: [1, -0.05],
  para: [0.2, 1.05],
  largura: 0.16,
  forca: 0.55,
  base: 0.04,
};

/** Cartões com texto (o pacote recomendado, a contracapa): o feixe só
    risca o canto de cima, longe das linhas de texto. */
export const RETICULA_DO_CARTAO: OpcoesDaReticula = {
  passo: 6,
  de: [1.08, -0.2],
  para: [0.5, 0.55],
  largura: 0.13,
  forca: 0.5,
  base: 0,
};

const suave = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

/**
 * Cobertura de tinta (0 a 1) num ponto do quadro, em px de CSS: o feixe, que
 * enfraquece ao descer, com a irregularidade de uma tinta de verdade (duas
 * ondas lentas cruzadas, nunca um degradê perfeito).
 */
function cobertura(
  x: number,
  y: number,
  w: number,
  h: number,
  o: OpcoesDaReticula,
): number {
  const ox = o.de[0] * w;
  const oy = o.de[1] * h;
  // Direção do feixe, normalizada.
  const dx = o.para[0] * w - ox;
  const dy = o.para[1] * h - oy;
  const n = Math.hypot(dx, dy);
  const ux = dx / n;
  const uy = dy / n;
  const px = x - ox;
  const py = y - oy;
  const aoLongo = px * ux + py * uy;
  // Lado com sinal: positivo para baixo e à direita do eixo.
  const deLado = px * uy - py * ux;
  const diagonal = Math.hypot(w, h);
  // Em tela de pé (celular), o feixe afina: senão cobriria a largura toda.
  const estreita = Math.min(Math.max(w / h, 0.5), 1);

  const meia = o.largura * diagonal * estreita;
  let atravessando = Math.exp(-((deLado / meia) ** 2) * 2.2);
  if (o.eco) {
    const meiaDoEco = o.eco.largura * diagonal * estreita;
    const distancia = o.eco.distancia * diagonal * estreita;
    atravessando +=
      o.eco.forca * Math.exp(-(((deLado - distancia) / meiaDoEco) ** 2) * 2.2);
  }
  const descendo = 1 - 0.55 * suave(0, 1, aoLongo / n);
  const tinta =
    0.8 +
    0.2 * Math.sin(x * 0.011 + y * 0.004) * Math.sin(y * 0.009 - x * 0.003);

  return Math.min(o.base + o.forca * atravessando * descendo * tinta, 0.72);
}

/** Desenha a retícula no canvas, no tamanho dele e na densidade da tela. */
export function desenharReticula(
  canvas: HTMLCanvasElement,
  opcoes: OpcoesDaReticula,
): boolean {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx || w === 0 || h === 0) return false;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const passo = opcoes.passo;
  const raioMaximo = passo * 0.47;
  const tons = Array.from({ length: TONS }, () => new Path2D());

  // A grade girada a 45°, a partir do centro, cobrindo o quadro inteiro.
  const cx = w / 2;
  const cy = h / 2;
  const cos = Math.SQRT1_2;
  const sin = Math.SQRT1_2;
  const alcance = Math.ceil(Math.hypot(w, h) / 2 / passo) + 1;

  for (let i = -alcance; i <= alcance; i++) {
    for (let j = -alcance; j <= alcance; j++) {
      const gx = i * passo;
      const gy = j * passo;
      const x = cx + gx * cos - gy * sin;
      const y = cy + gx * sin + gy * cos;
      if (x < -passo || y < -passo || x > w + passo || y > h + passo) continue;

      const c = cobertura(x, y, w, h, opcoes);
      // Área do ponto proporcional à cobertura, como numa retícula impressa.
      const r = Math.min((passo / 2) * Math.sqrt(c) * 1.13, raioMaximo);
      if (r < 0.35) continue;

      const tom = Math.min(Math.floor((c / 0.72) * TONS), TONS - 1);
      const caminho = tons[tom]!;
      caminho.moveTo(x + r, y);
      caminho.arc(x, y, r, 0, Math.PI * 2);
    }
  }

  tons.forEach((caminho, t) => {
    const k = t / (TONS - 1);
    const [r, g, b] = TINTA_FRACA.map((fraca, canal) =>
      Math.round(fraca + (TINTA_FORTE[canal]! - fraca) * k),
    ) as [number, number, number];
    ctx.fillStyle = `rgb(${r} ${g} ${b})`;
    ctx.fill(caminho);
  });

  return true;
}

/**
 * A passagem entre dois capítulos da página: pontos de uma cor só, numa
 * grade a 45°, que nascem no alto da faixa e crescem até se fundir num
 * chapado embaixo, como o degradê de uma retícula impressa. O fundo da
 * faixa é o capítulo de cima; a tinta, o de baixo.
 */
export function desenharPassagem(
  canvas: HTMLCanvasElement,
  tinta: string,
  passo: number,
): boolean {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx || w === 0 || h === 0) return false;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  // Grade a 45°: fileiras a meio passo, cada uma deslocada meio passo. O
  // lado da célula fica em passo/√2, e com raio de 0,52 do passo os pontos
  // já se sobrepõem: o fim da faixa vira chapado.
  const raioCheio = passo * 0.52;
  const caminho = new Path2D();
  const linha = passo / 2;
  for (let fila = -1; fila * linha <= h + passo; fila++) {
    const y = fila * linha;
    const desvio = fila % 2 === 0 ? 0 : passo / 2;
    const c = suave(0, 1, y / h) ** 1.15;
    const r = raioCheio * Math.sqrt(c);
    if (r < 0.35) continue;
    for (let x = -passo + desvio; x <= w + passo; x += passo) {
      caminho.moveTo(x + r, y);
      caminho.arc(x, y, r, 0, Math.PI * 2);
    }
  }
  ctx.fillStyle = tinta;
  ctx.fill(caminho);
  // A última fileira de pontos deixa frestas: o pé da faixa é chapado.
  ctx.fillRect(0, h - 1, w, 1);
  return true;
}
