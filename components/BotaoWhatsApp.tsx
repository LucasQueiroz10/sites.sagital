"use client";

import { MessageCircle } from "lucide-react";
import { useTema } from "@/components/TemaDoNicho";
import { Botao } from "@/components/ui/Botao";
import type { AcaoWhatsApp } from "@/data/tipos";
import { mensagemDoDemo, montarLinkWhatsApp } from "@/lib/whatsapp";

type Props = {
  acao: AcaoWhatsApp;
  rotuloDoNicho: string;
  variante?: "primario" | "secundario";
  tamanho?: "normal" | "grande";
  className?: string;
};

/** Botão de WhatsApp dos demos, com a mensagem já escrita e o nome do cliente. */
export function BotaoWhatsApp({
  acao,
  rotuloDoNicho,
  variante,
  tamanho,
  className,
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
      <span className="sr-only"> (abre o WhatsApp)</span>
    </Botao>
  );
}
