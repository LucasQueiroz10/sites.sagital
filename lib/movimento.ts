/**
 * Movimento da interface: as curvas do design system e a saída animada dos
 * diálogos. As animações via Web Animations API não são afetadas pela regra
 * de movimento reduzido do globals.css, então cada uma consulta a preferência.
 */

/** Chegada confiante, sem rebote. */
export const CURVA_CHEGADA = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Saída: acelera e some, mais rápida que a entrada. */
export const CURVA_SAIDA = "cubic-bezier(0.4, 0, 1, 1)";

export function prefereMenosMovimento(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** cubic-bezier(0.65, 0, 0.35, 1): sai devagar, corre no meio e pousa. */
function curvaDaViagem(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

const INTERRUPCOES = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
let viagemAtual: (() => void) | null = null;

/**
 * Rola a página até o elemento numa "viagem" com começo, meio e pouso: de
 * 400ms (perto) a 900ms (longe), respeitando o scroll-margin-top dele. O
 * destino é recalculado a cada quadro, então imagens que carregam no caminho
 * não tiram o pouso do lugar. Qualquer gesto do usuário (roda, toque, tecla)
 * interrompe a viagem e devolve a rolagem a ele. Com movimento reduzido, salta.
 */
export function rolarAte(elemento: HTMLElement): Promise<void> {
  viagemAtual?.();
  const destino = () =>
    Math.max(
      0,
      Math.min(
        elemento.getBoundingClientRect().top +
          window.scrollY -
          (parseFloat(getComputedStyle(elemento).scrollMarginTop) || 0),
        document.documentElement.scrollHeight - window.innerHeight,
      ),
    );
  const inicio = window.scrollY;
  const distancia = Math.abs(destino() - inicio);

  if (prefereMenosMovimento() || distancia < 2) {
    window.scrollTo({ top: destino(), behavior: "instant" });
    return Promise.resolve();
  }

  const duracao = Math.min(900, Math.max(400, 300 + distancia / 10));
  return new Promise((resolver) => {
    const comeco = performance.now();
    let quadro = 0;
    const parar = () => {
      cancelAnimationFrame(quadro);
      for (const evento of INTERRUPCOES)
        window.removeEventListener(evento, parar);
      viagemAtual = null;
      resolver();
    };
    const passo = (agora: number) => {
      const t = Math.min(1, (agora - comeco) / duracao);
      window.scrollTo({
        top: inicio + (destino() - inicio) * curvaDaViagem(t),
        behavior: "instant",
      });
      if (t < 1) quadro = requestAnimationFrame(passo);
      else parar();
    };
    for (const evento of INTERRUPCOES)
      window.addEventListener(evento, parar, { passive: true });
    viagemAtual = parar;
    quadro = requestAnimationFrame(passo);
  });
}

const fechando = new WeakSet<HTMLDialogElement>();

/**
 * Fecha um <dialog> animando a saída dele e do fundo. Com movimento reduzido,
 * fecha na hora. Chamadas repetidas durante a saída são ignoradas.
 */
export async function fecharDialogo(
  dialogo: HTMLDialogElement,
  quadros: Keyframe[],
  duracao = 200,
): Promise<void> {
  if (!dialogo.open || fechando.has(dialogo)) return;
  if (prefereMenosMovimento()) {
    dialogo.close();
    return;
  }
  fechando.add(dialogo);
  const opcoes: KeyframeAnimationOptions = {
    duration: duracao,
    easing: CURVA_SAIDA,
    fill: "forwards",
  };
  const animacoes = [dialogo.animate(quadros, opcoes)];
  try {
    animacoes.push(
      dialogo.animate([{ opacity: 1 }, { opacity: 0 }], {
        ...opcoes,
        pseudoElement: "::backdrop",
      }),
    );
  } catch {
    // Navegador sem animação de pseudo-elemento: o fundo some ao fechar.
  }
  try {
    await animacoes[0]?.finished;
  } catch {
    // Animação cancelada: fecha do mesmo jeito.
  }
  dialogo.close();
  for (const animacao of animacoes) animacao.cancel();
  fechando.delete(dialogo);
}
