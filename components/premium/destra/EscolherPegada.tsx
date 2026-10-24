"use client";

import { ArrowRight } from "lucide-react";
import type { IdDaPegada } from "@/data/destra";
import { escolher } from "./escolha";

/**
 * "É esta que eu mais uso": marca a pegada e desce até a avaliação, que já
 * chega com ela no formulário.
 */
export function EscolherPegada({
  pegada,
  nome,
}: {
  pegada: IdDaPegada;
  nome: string;
}) {
  return (
    <a
      href="#avaliacao"
      onClick={() => escolher({ pegada })}
      className="dt-link group inline-flex min-h-11 items-center gap-1.5 text-[0.875rem] no-underline"
    >
      É a que eu mais usaria
      <span className="sr-only"> ({nome})</span>
      <ArrowRight
        aria-hidden
        className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </a>
  );
}
