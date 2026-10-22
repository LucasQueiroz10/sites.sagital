"use client";

import { Eye } from "lucide-react";
import { BotaoSagital } from "./BotaoSagital";
import { useEscolha, type SiteNaPrevia } from "./EscolhaDoDemo";

/**
 * O olho dos cartões do portfólio: abre o site na prévia ao vivo, sem
 * seletor de cor. Branco, porque o cartão fica sobre a névoa.
 */
export function BotaoDePreviaDoSite({ site }: { site: SiteNaPrevia }) {
  const { abrirSite } = useEscolha();
  return (
    <BotaoSagital
      variante="inverso"
      tamanho="medio"
      onClick={() => abrirSite(site)}
      icone
    >
      <Eye aria-hidden className="size-5" strokeWidth={1.75} />
      <span className="sr-only">Ver o site de {site.nome} ao vivo</span>
    </BotaoSagital>
  );
}
