"use client";

import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { classes } from "@/lib/classes";

type Props = {
  /** O nome do site, já estilizado; vira o link para o topo. */
  marca: ReactNode;
  /** Nome em texto puro, para o link da marca nos leitores de tela. */
  nome: string;
  navegacao: { rotulo: string; href: string }[];
  /** Ação principal, à direita no desktop e no fim do menu do celular. */
  acao?: ReactNode;
  /** Cores e borda do cabeçalho de cada site. */
  className?: string;
  /** Cor dos links da navegação no desktop. */
  classeDosLinks?: string;
  /** Fundo e borda do menu aberto no celular. */
  classeDoMenu?: string;
};

/**
 * Cabeçalho fixo dos sites do portfólio. Cada site entrega a marca, as cores
 * e a ação; o comportamento (âncoras, menu do celular) é o mesmo nos quatro.
 */
export function CabecalhoDoPortfolio({
  marca,
  nome,
  navegacao,
  acao,
  className,
  classeDosLinks = "text-current/75 hover:text-current",
  classeDoMenu,
}: Props) {
  const [aberto, setAberto] = useState(false);

  return (
    <header className={classes("sticky top-0 z-40", className)}>
      <Container
        largura="larga"
        className="flex min-h-16 items-center justify-between gap-6 lg:min-h-18"
      >
        <a href="#topo" aria-label={`${nome}, início`} className="min-w-0 py-2">
          {marca}
        </a>

        <nav aria-label="Seções" className="hidden items-center gap-8 lg:flex">
          {navegacao.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={classes(
                "py-2 text-[0.9375rem] transition-colors",
                classeDosLinks,
              )}
            >
              {link.rotulo}
            </a>
          ))}
          {acao}
        </nav>

        <button
          type="button"
          aria-expanded={aberto}
          aria-controls="menu-do-site"
          onClick={() => setAberto((valor) => !valor)}
          className="-mr-2 grid size-11 place-items-center lg:hidden"
        >
          {aberto ? (
            <X aria-hidden className="size-6" strokeWidth={1.75} />
          ) : (
            <Menu aria-hidden className="size-6" strokeWidth={1.75} />
          )}
          <span className="sr-only">
            {aberto ? "Fechar menu" : "Abrir menu"}
          </span>
        </button>
      </Container>

      <nav
        id="menu-do-site"
        aria-label="Seções"
        hidden={!aberto}
        className={classes("border-t lg:hidden", classeDoMenu)}
      >
        <Container largura="larga" className="flex flex-col py-3">
          {navegacao.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setAberto(false)}
              className="flex min-h-12 items-center text-lg"
            >
              {link.rotulo}
            </a>
          ))}
          {acao && (
            <div className="pt-3 pb-2" onClick={() => setAberto(false)}>
              {acao}
            </div>
          )}
        </Container>
      </nav>
    </header>
  );
}
