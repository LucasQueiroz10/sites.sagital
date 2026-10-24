"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { contato, paginas, raiz } from "@/data/la-maree";
import { classes } from "@/lib/classes";
import { useMenuDaBarra } from "../useMenuDaBarra";
import { Monograma } from "./Marcas";

/**
 * A barra das páginas internas: o cabeçalho da página inicial já na tinta,
 * com a página atual em laranja e sublinhada. No celular, a folha preta com
 * os nomes grandes na serifa, como o índice de um cardápio.
 */
export function BarraInterna() {
  const { aberto, alternar, botao, caminho, painel } = useMenuDaBarra();

  // Com o menu aberto, a página de trás não rola.
  useEffect(() => {
    if (!aberto) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [aberto]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--cor-borda)] bg-[var(--cor-tinta)] text-[var(--cor-creme)]">
      <div className="mx-auto grid min-h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:min-h-18">
        <nav aria-label="Páginas" className="hidden items-center gap-7 lg:flex">
          {paginas.map((p) => {
            const atual = caminho.startsWith(p.href);
            return (
              <Link
                key={p.href}
                href={p.href}
                aria-current={atual ? "page" : undefined}
                className={classes(
                  "lm-selo py-2 text-[0.8125rem] underline-offset-[6px] transition-[opacity,color] duration-200",
                  atual
                    ? "text-[var(--cor-laranja)] underline decoration-1"
                    : "opacity-80 hover:opacity-100",
                )}
              >
                {p.rotulo}
              </Link>
            );
          })}
        </nav>
        <button
          ref={botao}
          type="button"
          aria-expanded={aberto}
          aria-controls="lm-menu-interno"
          onClick={(e) => {
            e.stopPropagation();
            alternar();
          }}
          className="-ml-2 inline-flex size-11 items-center justify-center lg:hidden"
        >
          {aberto ? (
            <X aria-hidden className="size-6" strokeWidth={1.5} />
          ) : (
            <Menu aria-hidden className="size-6" strokeWidth={1.5} />
          )}
          <span className="sr-only">
            {aberto ? "Fechar menu" : "Abrir menu"}
          </span>
        </button>

        <Link href={raiz} className="grid place-items-center py-2">
          <Monograma className="w-9 text-[1rem] lg:w-10" />
          <span className="sr-only">La Marée, início</span>
        </Link>

        <Link
          href={`${raiz}/reservas`}
          className="lm-botao lm-botao-contorno min-h-10 justify-self-end px-3 text-[0.6875rem] tracking-[0.04em] sm:px-5 sm:text-[0.75rem]"
        >
          Reservar mesa
        </Link>
      </div>

      <div
        ref={painel}
        id="lm-menu-interno"
        hidden={!aberto}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-[var(--cor-tinta)] px-4 pt-8 pb-16 sm:px-6 lg:hidden"
      >
        <nav aria-label="Páginas">
          <ol className="grid gap-2">
            {[{ rotulo: "Início", href: raiz }, ...paginas].map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  aria-current={
                    p.href !== raiz && caminho.startsWith(p.href)
                      ? "page"
                      : undefined
                  }
                  className="lm-serifa block py-1 text-[3.25rem] transition-colors hover:text-[var(--cor-laranja)] aria-[current=page]:text-[var(--cor-laranja)]"
                >
                  {p.rotulo}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <p className="lm-selo mt-10 max-w-[30ch] text-[var(--cor-texto-suave)]">
          {contato.endereco}
          <br />
          {contato.bairro}
        </p>
      </div>
    </header>
  );
}
