import { MessageCircle } from "lucide-react";
import { mensagemDeContato } from "@/data/sagital";
import { montarLinkWhatsApp } from "@/lib/whatsapp";
import { BotaoSagital, type VarianteSagital } from "./BotaoSagital";

type Props = {
  rotulo?: string;
  /** Mensagem já escrita; o padrão é o pedido de orçamento geral. */
  mensagem?: string;
  variante?: VarianteSagital;
  tamanho?: "medio" | "grande";
  className?: string;
  /** Texto extra só para leitores de tela, quando o rótulo sozinho é ambíguo. */
  complementoAcessivel?: string;
};

/** WhatsApp da Sagital, com a mensagem de orçamento já escrita. */
export function BotaoContato({
  rotulo = "Falar no WhatsApp",
  mensagem = mensagemDeContato,
  variante,
  tamanho,
  className,
  complementoAcessivel,
}: Props) {
  return (
    <BotaoSagital
      href={montarLinkWhatsApp(mensagem)}
      externo
      variante={variante}
      tamanho={tamanho}
      className={className}
    >
      <MessageCircle
        aria-hidden
        className="size-5 shrink-0"
        strokeWidth={1.75}
      />
      {rotulo}
      {complementoAcessivel && (
        <span className="sr-only"> {complementoAcessivel}</span>
      )}
      <span className="sr-only"> (abre o WhatsApp)</span>
    </BotaoSagital>
  );
}
