"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { NomeDoEstabelecimento } from "@/components/TemaDoNicho";
import { Container } from "@/components/ui/Container";
import type { AcaoWhatsApp, LinkDeNavegacao } from "@/data/tipos";
import { classes } from "@/lib/classes";

type Props = {
  navegacao: LinkDeNavegacao[];
  acao: AcaoWhatsApp;
  rotuloDoNicho: string;
  /** Classes da marca (o nome do estabelecimento), para cada nicho estilizar. */
  classeDaMarca?: string;
  className?: string;
};

const foco =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

export function CabecalhoDoDemo({
  navegacao,
  acao,
  rotuloDoNicho,
  classeDaMarca,
  className,
}: Props) {
  const [aberto, setAberto] = useState(false);

  return (
    <header
      className={classes(
        "sticky top-0 z-40 border-b border-borda bg-fundo",
        className,
      )}
    >
      <Container
        largura="larga"
        className="flex min-h-16 items-center justify-between gap-4"
      >
        <a
          href="#topo"
          className={classes("min-w-0 truncate py-2", foco, classeDaMarca)}
        >
          <NomeDoEstabelecimento />
        </a>

        <nav aria-label="Seções" className="hidden items-center gap-6 md:flex">
          {navegacao.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={classes(
                "py-2 text-sm font-medium text-texto-suave transition-colors hover:text-texto",
                foco,
              )}
            >
              {link.rotulo}
            </a>
          ))}
          <BotaoWhatsApp acao={acao} rotuloDoNicho={rotuloDoNicho} />
        </nav>

        <button
          type="button"
          aria-expanded={aberto}
          aria-controls="menu-do-demo"
          onClick={() => setAberto((valor) => !valor)}
          className={classes(
            "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-tema px-2 text-sm font-medium md:hidden",
            foco,
          )}
        >
          {aberto ? (
            <X aria-hidden className="size-6" />
          ) : (
            <Menu aria-hidden className="size-6" />
          )}
          <span className="sr-only">
            {aberto ? "Fechar menu" : "Abrir menu"}
          </span>
        </button>
      </Container>

      <nav
        id="menu-do-demo"
        aria-label="Seções"
        hidden={!aberto}
        className="border-t border-borda md:hidden"
      >
        <Container largura="larga" className="flex flex-col py-2">
          {navegacao.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setAberto(false)}
              className={classes(
                "flex min-h-12 items-center text-lg font-medium",
                foco,
              )}
            >
              {link.rotulo}
            </a>
          ))}
        </Container>
      </nav>
    </header>
  );
}
