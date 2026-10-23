"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { equipe } from "@/data/bloco";
import { prefereMenosMovimento } from "@/lib/movimento";

/**
 * O time num trilho que rola de lado (no celular, com o dedo; no computador,
 * pelas setas). As fotos ficam em preto e branco e ganham cor sob o ponteiro.
 * As setas apagam nas pontas do trilho.
 */
export function Equipe({ titulo }: { titulo: ReactNode }) {
  const trilho = useRef<HTMLUListElement>(null);
  const [noComeco, setNoComeco] = useState(true);
  const [noFim, setNoFim] = useState(false);

  useEffect(() => {
    const lista = trilho.current;
    if (!lista) return;
    const primeiro = lista.firstElementChild;
    const ultimo = lista.lastElementChild;
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.target === primeiro) setNoComeco(e.intersectionRatio > 0.95);
          if (e.target === ultimo) setNoFim(e.intersectionRatio > 0.95);
        }
      },
      { root: lista, threshold: [0, 0.95, 1] },
    );
    if (primeiro) observador.observe(primeiro);
    if (ultimo) observador.observe(ultimo);
    return () => observador.disconnect();
  }, []);

  const rolar = (sentido: 1 | -1) => {
    const lista = trilho.current;
    const cartao = lista?.firstElementChild as HTMLElement | null;
    if (!lista || !cartao) return;
    lista.scrollBy({
      left: sentido * (cartao.offsetWidth + 16),
      behavior: prefereMenosMovimento() ? "instant" : "smooth",
    });
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        {titulo}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => rolar(-1)}
            disabled={noComeco}
            className="bl-seta"
            aria-label="Pessoas anteriores"
          >
            <ArrowLeft aria-hidden className="size-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => rolar(1)}
            disabled={noFim}
            className="bl-seta"
            aria-label="Próximas pessoas"
          >
            <ArrowRight aria-hidden className="size-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <ul
        ref={trilho}
        className="bl-trilho -mx-4 mt-10 flex scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-14 sm:scroll-px-0 sm:px-0"
      >
        {equipe.map((pessoa) => (
          <li
            key={pessoa.nome}
            className="bl-cartao-da-equipe relative aspect-[4/5] w-[78%] shrink-0 overflow-hidden bg-[var(--cor-cinza-medio)] sm:w-[calc((100%-2rem)/2.4)] lg:w-[calc((100%-2rem)/3)]"
          >
            <Image
              src={pessoa.foto.src}
              alt={pessoa.foto.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 42vw, 78vw"
              className="bl-foto-da-equipe object-cover"
            />
            <div className="bl-mira bl-mira-branca absolute inset-x-3 bottom-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-3 gap-y-1 bg-[rgb(20_20_20/0.42)] px-3.5 pt-3 pb-3 text-white backdrop-blur-[6px] sm:inset-x-4 sm:bottom-4">
              <h3 className="bl-quadrada col-span-2 text-[1.75rem] leading-[0.95] sm:text-[2rem]">
                {pessoa.cargo}
              </h3>
              <p className="text-[0.75rem] leading-snug text-[rgb(255_255_255/0.85)]">
                {pessoa.experiencia}
              </p>
              <p className="bl-rotulo text-right text-[0.6875rem]">
                {pessoa.nome}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
