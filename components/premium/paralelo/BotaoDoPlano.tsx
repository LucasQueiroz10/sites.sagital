"use client";

import type { IdDoPlano } from "@/data/paralelo";
import { classes } from "@/lib/classes";
import { escolher } from "./escolha";
import { Seta } from "./Seta";

/**
 * O botão da página de um plano: desce até o formulário do fim da página já
 * com o plano marcado (o Escala vai para vendas).
 */
export function BotaoDoPlano({
  plano,
  rotulo,
  className,
}: {
  plano: IdDoPlano;
  rotulo: string;
  className?: string;
}) {
  const vendas = plano === "escala";
  return (
    <a
      href={vendas ? "#vendas" : "#comecar"}
      onClick={() => escolher({ plano, intencao: vendas ? "vendas" : "conta" })}
      className={classes("pa-botao pa-botao-branco w-full", className)}
    >
      {rotulo}
      <Seta className="pa-seta h-[11px] w-[13px]" />
    </a>
  );
}
