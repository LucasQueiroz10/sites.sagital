"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { contato, paginas, raiz } from "@/data/bloco";
import { classes } from "@/lib/classes";
import { useMenuDaBarra } from "../useMenuDaBarra";
import { MarcaBloco } from "./Marcas";

/**
 * A barra das páginas internas: o cabeçalho cinza da página inicial, com a
 * pílula de navegação e o fundo laranja parado na página atual. No celular,
 * a folha cinza com os nomes grandes na letra quadrada.
 */
export function BarraInterna() {
  const { aberto, alternar, botao, caminho, fechar, painel } = useMenuDaBarra();

  // Com o menu aberto, a página de trás não rola.
  useEffect(() => {
    if (!aberto) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [aberto]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--cor-borda)] bg-[var(--cor-cinza)]">
      <div className="mx-auto flex min-h-16 w-full max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 lg:min-h-[4.5rem] lg:px-8">
        <Link
          href={raiz}
          className="-ml-1 inline-flex min-h-11 items-center px-1 text-[var(--cor-tinta)]"
        >
          <MarcaBloco />
          <span className="sr-only">, início</span>
        </Link>

        <nav aria-label="Páginas" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-[var(--raio)] bg-[rgb(255_255_255/0.55)] p-1 shadow-[inset_0_0_0_1px_rgb(28_28_28/0.06)]">
            {paginas.map((p) => {
              const atual = caminho.startsWith(p.href);
              return (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    aria-current={atual ? "page" : undefined}
                    className={classes(
                      "inline-flex min-h-9 items-center rounded-[3px] px-4 text-[0.875rem] transition-colors duration-200",
                      atual
                        ? "bg-[var(--cor-laranja-campo)] text-white"
                        : "text-[var(--cor-grafite)] hover:text-[var(--cor-laranja-tinta)]",
                    )}
                  >
                    {p.rotulo}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#auditoria"
            className="bl-botao bl-botao-mira bl-mira hidden min-h-11 px-4 text-[0.875rem] sm:inline-flex"
          >
            Pedir auditoria
            <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
          </a>
          <button
            ref={botao}
            type="button"
            aria-expanded={aberto}
            aria-controls="bl-menu-interno"
            onClick={(e) => {
              e.stopPropagation();
              alternar();
            }}
            className="inline-flex size-11 items-center justify-center rounded-[var(--raio)] bg-[rgb(255_255_255/0.6)] text-[var(--cor-laranja-tinta)] lg:hidden"
          >
            {aberto ? (
              <X aria-hidden className="size-5" strokeWidth={1.75} />
            ) : (
              <Menu aria-hidden className="size-5" strokeWidth={1.75} />
            )}
            <span className="sr-only">
              {aberto ? "Fechar menu" : "Abrir menu"}
            </span>
          </button>
        </div>
      </div>

      <div
        ref={painel}
        id="bl-menu-interno"
        hidden={!aberto}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-[var(--cor-cinza)] px-4 pt-6 pb-16 sm:px-6 lg:hidden"
      >
        <nav aria-label="Páginas">
          <ul className="grid">
            {[{ rotulo: "Início", href: raiz }, ...paginas].map((p) => (
              <li key={p.href} className="border-b border-[var(--cor-borda)]">
                <Link
                  href={p.href}
                  aria-current={
                    p.href !== raiz && caminho.startsWith(p.href)
                      ? "page"
                      : undefined
                  }
                  className="bl-quadrada flex min-h-16 items-center justify-between text-[2.5rem] text-[var(--cor-tinta)] transition-colors hover:text-[var(--cor-laranja-titulo)] aria-[current=page]:text-[var(--cor-laranja-titulo)]"
                >
                  {p.rotulo}
                  <ArrowUpRight
                    aria-hidden
                    className="size-6 text-[var(--cor-laranja-tinta)]"
                    strokeWidth={1.25}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#auditoria"
          onClick={fechar}
          className="bl-botao bl-botao-cheio mt-8 w-full"
        >
          Pedir auditoria
          <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
        </a>
        <p className="mt-8 text-[0.9375rem] text-[var(--cor-texto-suave)]">
          {contato.email}
          <br />
          {contato.horario}
        </p>
      </div>
    </header>
  );
}
