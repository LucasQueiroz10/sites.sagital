import { MessageCircle } from "lucide-react";
import { Botao } from "@/components/ui/Botao";
import { mensagemDeContato } from "@/data/sagital";
import { montarLinkWhatsApp } from "@/lib/whatsapp";

type Props = {
  rotulo?: string;
  variante?: "primario" | "secundario";
  tamanho?: "normal" | "grande";
  className?: string;
};

/** WhatsApp da Sagital, com a mensagem de orçamento já escrita. */
export function BotaoContato({
  rotulo = "Falar no WhatsApp",
  variante,
  tamanho,
  className,
}: Props) {
  return (
    <Botao
      href={montarLinkWhatsApp(mensagemDeContato)}
      externo
      variante={variante}
      tamanho={tamanho}
      className={className}
    >
      <MessageCircle aria-hidden className="size-5 shrink-0" />
      {rotulo}
      <span className="sr-only"> (abre o WhatsApp)</span>
    </Botao>
  );
}
