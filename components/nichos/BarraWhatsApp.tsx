import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import type { AcaoWhatsApp } from "@/data/tipos";

type Props = { acao: AcaoWhatsApp; rotuloDoNicho: string };

/**
 * Barra fixa no rodapé da tela do celular: a ação principal fica a um toque
 * em qualquer ponto da página. No desktop, ela está no cabeçalho.
 */
export function BarraWhatsApp({ acao, rotuloDoNicho }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-borda bg-fundo px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <BotaoWhatsApp
        acao={acao}
        rotuloDoNicho={rotuloDoNicho}
        className="w-full"
      />
    </div>
  );
}
