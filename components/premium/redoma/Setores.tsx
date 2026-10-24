"use client";

import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { type IdDoSetor, raiz, setores } from "@/data/redoma";

/**
 * Soluções por ramo, em abas (padrão de abas do WAI: setas trocam de aba,
 * Home e End vão às pontas). Cada ramo traz o risco, o que a Redoma faz e um
 * cliente fictício contando o que aconteceu.
 */
export function Setores() {
  const id = useId();
  const [atual, setAtual] = useState<IdDoSetor>(setores[0].id);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const setor = setores.find((s) => s.id === atual) ?? setores[0];

  const irPara = (indice: number) => {
    const total = setores.length;
    const destino = setores[(indice + total) % total]!;
    setAtual(destino.id);
    abas.current[(indice + total) % total]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Ramos"
        className="rd-alternador flex-wrap rounded-3xl sm:rounded-full"
        onKeyDown={(e) => {
          const i = setores.findIndex((s) => s.id === atual);
          if (e.key === "ArrowRight") irPara(i + 1);
          else if (e.key === "ArrowLeft") irPara(i - 1);
          else if (e.key === "Home") irPara(0);
          else if (e.key === "End") irPara(setores.length - 1);
          else return;
          e.preventDefault();
        }}
      >
        {setores.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              abas.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-aba-${s.id}`}
            aria-selected={s.id === atual}
            aria-controls={`${id}-painel`}
            tabIndex={s.id === atual ? 0 : -1}
            onClick={() => setAtual(s.id)}
          >
            {s.rotulo}
          </button>
        ))}
      </div>

      <div
        key={setor.id}
        role="tabpanel"
        id={`${id}-painel`}
        aria-labelledby={`${id}-aba-${setor.id}`}
        className="rd-painel mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16"
      >
        <div>
          <h3 className="rd-h3">{setor.titulo}</h3>
          <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/70">
            {setor.risco}
          </p>
          <figure className="mt-10 border-l border-white/30 pl-5">
            <blockquote className="text-[1.125rem] leading-relaxed text-white">
              “{setor.depoimento.texto}”
            </blockquote>
            <figcaption className="mt-3 text-sm text-white/60">
              {setor.depoimento.autor}, cliente fictício
            </figcaption>
          </figure>
        </div>

        <div className="rd-cartao p-6 sm:p-8">
          <h4 className="text-sm text-white/60">o que a redoma faz</h4>
          <ul className="mt-6 grid gap-5">
            {setor.protege.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-3 text-[1.0625rem] leading-snug text-white"
              >
                <span className="grid size-7 place-items-center rounded-full bg-white text-black">
                  <Check aria-hidden className="size-4" strokeWidth={2} />
                </span>
                <span className="pt-0.5">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#precos" className="rd-botao rd-botao-branco">
              ver quanto custa
            </a>
            <Link
              href={`${raiz}/solucoes/${setor.id}`}
              className="rd-botao rd-botao-escuro group"
            >
              ver {setor.rotulo} por dentro
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
