import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { BarraFixa } from "@/components/ui/BarraFixa";
import type { AcaoWhatsApp } from "@/data/tipos";

type Props = { acao: AcaoWhatsApp; rotuloDoNicho: string };

/**
 * A ação principal a um toque em qualquer ponto da página, no celular. Aparece
 * depois que o botão do topo sai da tela; a partir de 1024px, a ação está no
 * cabeçalho.
 */
export function BarraWhatsApp({ acao, rotuloDoNicho }: Props) {
  return (
    <BarraFixa escondeEm="lg">
      <BotaoWhatsApp
        acao={acao}
        rotuloDoNicho={rotuloDoNicho}
        className="w-full"
      />
    </BarraFixa>
  );
}
