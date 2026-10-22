"use client";

import { MessageCircle } from "lucide-react";
import { useTema } from "@/components/TemaDoNicho";
import { Botao, type VarianteDoBotao } from "@/components/ui/Botao";
import type { AcaoWhatsApp } from "@/data/tipos";
import { mensagemDoDemo, montarLinkWhatsApp } from "@/lib/whatsapp";

type Props = {
  acao: AcaoWhatsApp;
  rotuloDoNicho: string;
  variante?: VarianteDoBotao;
  tamanho?: "normal" | "grande";
  className?: string;
  /** Texto extra só para leitores de tela, quando o rótulo sozinho é ambíguo. */
  complementoAcessivel?: string;
};

/** Botão de WhatsApp dos demos, com a mensagem já escrita e o nome do cliente. */
export function BotaoWhatsApp({
  acao,
  rotuloDoNicho,
  variante,
  tamanho,
  className,
  complementoAcessivel,
}: Props) {
  const { nome } = useTema();
  const href = montarLinkWhatsApp(
    mensagemDoDemo(acao.pedido, nome, rotuloDoNicho),
  );

  return (
    <Botao
      href={href}
      externo
      variante={variante}
      tamanho={tamanho}
      className={className}
    >
      <MessageCircle aria-hidden className="size-5 shrink-0" />
      {acao.rotulo}
      {complementoAcessivel && (
        <span className="sr-only"> {complementoAcessivel}</span>
      )}
      <span className="sr-only"> (abre o WhatsApp)</span>
    </Botao>
  );
}
