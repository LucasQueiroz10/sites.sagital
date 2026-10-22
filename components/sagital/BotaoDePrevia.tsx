"use client";

import { Eye } from "lucide-react";
import type { Nicho } from "@/lib/link";
import { BotaoSagital } from "./BotaoSagital";
import { useEscolha } from "./EscolhaDoDemo";

/** O olho dos cartões: abre a prévia ao vivo já no ramo do cartão. */
export function BotaoDePrevia({
  nicho,
  rotulo,
}: {
  nicho: Nicho;
  rotulo: string;
}) {
  const { abrirPrevia } = useEscolha();
  return (
    <BotaoSagital
      variante="secundario"
      tamanho="medio"
      onClick={() => abrirPrevia(nicho)}
      icone
    >
      <Eye aria-hidden className="size-5" strokeWidth={1.75} />
      <span className="sr-only">
        Ver o demo de {rotulo.toLowerCase()} ao vivo
      </span>
    </BotaoSagital>
  );
}
