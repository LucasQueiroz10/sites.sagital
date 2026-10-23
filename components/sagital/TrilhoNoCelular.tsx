"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { classes } from "@/lib/classes";
import { prefereMenosMovimento } from "@/lib/movimento";

/**
 * No celular (abaixo de 640px), a lista vira um trilho horizontal: um item
 * por vez, o seguinte cortado na borda, deslizando com o dedo ou com a seta
 * embaixo à direita. No último item a seta gira e volta ao primeiro. A
 * partir de 640px a lista segue o layout que `className` der a ela, e a
 * seta some.
 */
export function TrilhoNoCelular({
  rotulo,
  className,
  children,
}: {
  /** Nome da lista para leitores de tela, ex.: "Demos". */
  rotulo: string;
  /** Layout da lista a partir de 640px (grade, pilha...). */
  className?: string;
  children: ReactNode;
}) {
  const trilho = useRef<HTMLOListElement>(null);
  const [noFim, setNoFim] = useState(false);

  // O último item quase todo à vista = fim do trilho.
  useEffect(() => {
    const el = trilho.current;
    const ultimo = el?.lastElementChild;
    if (!el || !ultimo) return;
    const observador = new IntersectionObserver(
      ([entrada]) => setNoFim(Boolean(entrada?.isIntersecting)),
      { root: el, threshold: 0.6 },
    );
    observador.observe(ultimo);
    return () => observador.disconnect();
  }, []);

  function avancar() {
    const el = trilho.current;
    if (!el) return;
    const itens = Array.from(el.children) as HTMLElement[];
    const recuo =
      parseFloat(getComputedStyle(el).scrollPaddingInlineStart) || 0;
    const agora = el.scrollLeft + recuo;
    // O primeiro item que começa depois do atual; no fim, o começo.
    const proximo = noFim
      ? itens[0]
      : itens.find((item) => item.offsetLeft > agora + 8);
    el.scrollTo({
      left: (proximo?.offsetLeft ?? 0) - recuo,
      behavior: prefereMenosMovimento() ? "auto" : "smooth",
    });
  }

  return (
    <div>
      <ol
        ref={trilho}
        aria-label={rotulo}
        className={classes(
          // Celular: o trilho vai de borda a borda da tela, com o primeiro
          // item alinhado à margem de 16px do conteúdo.
          "relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] max-sm:*:w-[86%] max-sm:*:shrink-0 max-sm:*:snap-start sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden",
          className,
        )}
      >
        {children}
      </ol>
      <div className="mt-5 flex justify-end sm:hidden">
        <button
          type="button"
          onClick={avancar}
          className="sg-pressiona grid size-12 place-items-center rounded-full bg-white text-[#0b1536] shadow-[0_8px_24px_-8px_rgb(2_8_23/0.5)]"
        >
          <ArrowRight
            aria-hidden
            className={classes(
              "size-5 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)]",
              noFim && "rotate-180",
            )}
            strokeWidth={2}
          />
          <span className="sr-only">
            {noFim ? `Voltar ao começo: ${rotulo}` : `Próximo: ${rotulo}`}
          </span>
        </button>
      </div>
    </div>
  );
}
