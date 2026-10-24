"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { nome, paginas, raiz } from "@/data/redoma";
import { classes } from "@/lib/classes";
import { useMenuDaBarra } from "../useMenuDaBarra";
import { escolher } from "./escolha";
import { Logo } from "./Logo";

const pilula = "bg-neutral-900/90 backdrop-blur rounded-full";

/**
 * A barra das páginas internas: as mesmas pílulas da abertura, com o
 * degradê preto atrás desde o topo. A página atual fica em pílula branca.
 */
export function BarraInterna() {
  const { aberto, alternar, botao, caminho, painel } = useMenuDaBarra();

  return (
    <header className="fixed inset-x-0 top-0 z-30 px-6 pt-6 md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black via-black/70 to-transparent"
      />
      <nav
        aria-label="Principal"
        className="flex items-center justify-between gap-4"
      >
        <Link
          href={raiz}
          className={`flex items-center gap-2 ${pilula} py-3 pr-6 pl-4`}
        >
          <Logo />
          <span className="text-sm font-normal tracking-tight text-white">
            {nome}
          </span>
        </Link>

        <div
          className={`hidden items-center gap-1 md:flex ${pilula} px-2 py-2`}
        >
          {paginas.map((p) => {
            const atual = caminho.startsWith(p.href);
            return (
              <Link
                key={p.href}
                href={p.href}
                aria-current={atual ? "page" : undefined}
                className={classes(
                  "rounded-full px-5 py-2 text-sm transition-colors duration-200",
                  atual
                    ? "bg-white text-black"
                    : "text-neutral-300 hover:text-white",
                )}
              >
                {p.rotulo}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#comecar"
            onClick={() => escolher({ intencao: "comecar" })}
            className="rounded-full bg-white px-6 py-3 text-sm font-normal text-black transition-colors hover:bg-neutral-200"
          >
            começar
          </a>
          <button
            ref={botao}
            type="button"
            aria-expanded={aberto}
            aria-controls="rd-menu-interno"
            onClick={(e) => {
              e.stopPropagation();
              alternar();
            }}
            className={`grid size-11 place-items-center md:hidden ${pilula} text-white`}
          >
            {aberto ? (
              <X aria-hidden className="size-5" strokeWidth={1.5} />
            ) : (
              <Menu aria-hidden className="size-5" strokeWidth={1.5} />
            )}
            <span className="sr-only">
              {aberto ? "Fechar menu" : "Abrir menu"}
            </span>
          </button>
        </div>
      </nav>

      <div
        ref={painel}
        id="rd-menu-interno"
        hidden={!aberto}
        className="rd-menu mt-3 rounded-3xl bg-neutral-900/95 p-2 backdrop-blur md:hidden"
      >
        <Link
          href={raiz}
          className="flex min-h-12 items-center rounded-2xl px-4 text-lg text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          início
        </Link>
        {paginas.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            aria-current={caminho.startsWith(p.href) ? "page" : undefined}
            className="flex min-h-12 items-center rounded-2xl px-4 text-lg text-neutral-300 transition-colors hover:bg-white/5 hover:text-white aria-[current=page]:bg-white aria-[current=page]:text-black"
          >
            {p.rotulo}
          </Link>
        ))}
      </div>
    </header>
  );
}
