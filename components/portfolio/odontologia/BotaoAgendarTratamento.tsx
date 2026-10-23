"use client";

import { ArrowDown } from "lucide-react";
import { rolarAte } from "@/lib/movimento";
import { EVENTO_DO_TRATAMENTO } from "./AgendaDaClinica";

/** Leva à agenda com o tratamento já escolhido. */
export function BotaoAgendarTratamento({
  id,
  nome,
}: {
  id: string;
  nome: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent(EVENTO_DO_TRATAMENTO, { detail: id }),
        );
        const agenda = document.getElementById("agenda");
        if (agenda) void rolarAte(agenda);
      }}
      className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-destaque underline decoration-borda underline-offset-[6px] transition-colors hover:decoration-destaque"
    >
      Agendar
      <span className="sr-only"> {nome.toLowerCase()}</span>
      <ArrowDown aria-hidden className="size-4" />
    </button>
  );
}
