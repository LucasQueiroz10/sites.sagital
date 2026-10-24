"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, type CSSProperties, type ReactNode } from "react";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { NomeDoEstabelecimento } from "@/components/TemaDoNicho";
import { Container } from "@/components/ui/Container";
import type { AcaoWhatsApp, LinkDeNavegacao } from "@/data/tipos";
import { classes } from "@/lib/classes";
import { LinkDoDemo } from "./LinkDoDemo";

type Props = {
  /** As seções da página inicial (âncoras), mostradas nela. */
  navegacao: LinkDeNavegacao[];
  /** As páginas internas, mostradas fora da página inicial. */
  paginas: { rotulo: string; href: string }[];
  /** O endereço da página inicial do demo, ex.: "/academia". */
  raiz: string;
  acao: AcaoWhatsApp;
  rotuloDoNicho: string;
  /** Classes da marca (o nome do estabelecimento), para cada nicho estilizar. */
  classeDaMarca?: string;
  /** Linha abaixo do nome, como a assinatura de uma marca. */
  complementoDaMarca?: ReactNode;
  className?: string;
};

const foco =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

/**
 * O cabeçalho dos demos. Na página inicial, os links levam às seções dela;
 * nas páginas internas, às outras páginas, com a atual sublinhada. Os
 * links internos levam junto o nome e a cor da URL.
 */
export function CabecalhoDoDemo({
  navegacao,
  paginas,
  raiz,
  acao,
  rotuloDoNicho,
  classeDaMarca,
  complementoDaMarca,
  className,
}: Props) {
  const [aberto, setAberto] = useState(false);
  const caminho = usePathname();
  const naInicial = caminho === raiz;
  const links = naInicial ? navegacao : paginas;
  const linksDoMenu = naInicial
    ? navegacao
    : [{ rotulo: "Início", href: raiz }, ...paginas];

  const atual = (href: string) =>
    !naInicial && href !== raiz && caminho.startsWith(href)
      ? ("page" as const)
      : undefined;

  return (
    <header
      className={classes(
        "cabecalho-do-demo sticky top-0 z-40 border-b border-borda bg-fundo",
        className,
      )}
    >
      <Container
        largura="larga"
        className="flex min-h-16 items-center justify-between gap-4"
      >
        {naInicial ? (
          <a
            href="#topo"
            className={classes("min-w-0 truncate py-2", foco, classeDaMarca)}
          >
            <NomeDoEstabelecimento />
            {complementoDaMarca}
          </a>
        ) : (
          <LinkDoDemo
            href={raiz}
            className={classes("min-w-0 truncate py-2", foco, classeDaMarca)}
          >
            <NomeDoEstabelecimento />
            {complementoDaMarca}
          </LinkDoDemo>
        )}

        <nav
          aria-label={naInicial ? "Seções" : "Páginas"}
          className="hidden items-center gap-6 lg:flex"
        >
          {links.map((link) =>
            naInicial ? (
              <a
                key={link.href}
                href={link.href}
                className={classes(
                  "link-do-cabecalho py-2 text-sm font-medium text-texto-suave transition-colors hover:text-texto",
                  foco,
                )}
              >
                {link.rotulo}
              </a>
            ) : (
              <LinkDoDemo
                key={link.href}
                href={link.href}
                aria-current={atual(link.href)}
                className={classes(
                  "link-do-cabecalho py-2 text-sm font-medium text-texto-suave transition-colors hover:text-texto aria-[current=page]:text-texto",
                  foco,
                )}
              >
                {link.rotulo}
              </LinkDoDemo>
            ),
          )}
          <BotaoWhatsApp acao={acao} rotuloDoNicho={rotuloDoNicho} />
        </nav>

        <button
          type="button"
          aria-expanded={aberto}
          aria-controls="menu-do-demo"
          onClick={() => setAberto((valor) => !valor)}
          className={classes(
            "tatil inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-tema px-2 text-sm font-medium lg:hidden",
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
        aria-label={naInicial ? "Seções" : "Páginas"}
        hidden={!aberto}
        className="border-t border-borda lg:hidden"
      >
        <Container largura="larga" className="flex flex-col py-2">
          {linksDoMenu.map((link, i) => {
            const estilo = { "--ordem": i } as CSSProperties;
            const classe = classes(
              "flex min-h-12 items-center text-lg font-medium aria-[current=page]:text-destaque",
              foco,
            );
            return naInicial ? (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setAberto(false)}
                style={estilo}
                className={classe}
              >
                {link.rotulo}
              </a>
            ) : (
              <LinkDoDemo
                key={link.href}
                href={link.href}
                aria-current={atual(link.href)}
                onClick={() => setAberto(false)}
                style={estilo}
                className={classe}
              >
                {link.rotulo}
              </LinkDoDemo>
            );
          })}
        </Container>
      </nav>
    </header>
  );
}
