import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { BarraFixa } from "@/components/ui/BarraFixa";
import type { AcaoWhatsApp } from "@/data/tipos";

type Props = { acao: AcaoWhatsApp; rotuloDoNicho: string };

/**
 * A ação principal a um toque em qualquer ponto da página, no celular. Aparece
 * depois que o botão do topo sai da tela; no desktop, a ação está no cabeçalho.
 */
export function BarraWhatsApp({ acao, rotuloDoNicho }: Props) {
  return (
    <BarraFixa>
      <BotaoWhatsApp
        acao={acao}
        rotuloDoNicho={rotuloDoNicho}
        className="w-full"
      />
    </BarraFixa>
  );
}
