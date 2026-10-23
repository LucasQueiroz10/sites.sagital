"use client";

import { Eye } from "lucide-react";
import { BotaoSagital, type VarianteSagital } from "./BotaoSagital";
import { useEscolha, type SiteNaPrevia } from "./EscolhaDoDemo";

/**
 * O olho dos cartões do portfólio: abre o site na prévia ao vivo, sem
 * seletor de cor. Branco por padrão, para os fundos azuis; nas páginas
 * claras, o cinza do "secundario".
 */
export function BotaoDePreviaDoSite({
  site,
  variante = "inverso",
}: {
  site: SiteNaPrevia;
  variante?: VarianteSagital;
}) {
  const { abrirSite } = useEscolha();
  return (
    <BotaoSagital
      variante={variante}
      tamanho="medio"
      onClick={() => abrirSite(site)}
      icone
    >
      <Eye aria-hidden className="size-5" strokeWidth={1.75} />
      <span className="sr-only">Ver o site de {site.nome} ao vivo</span>
    </BotaoSagital>
  );
}
