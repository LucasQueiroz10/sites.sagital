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
