"use client";

import Link from "next/link";
import { useState } from "react";
import { nome, paginas, raiz } from "@/data/paralelo";
import { classes } from "@/lib/classes";
import { useMenuDaBarra } from "../useMenuDaBarra";
import { DialogoDeEntrada } from "./DialogoDeEntrada";
import { Seta } from "./Seta";

/**
 * A barra das páginas internas: a mesma da abertura (vidro preto, marca em
 * 800, links claros, "Entrar" e "Abrir conta"), já sólida desde o topo e em
 * medida fixa. A página atual fica branca com o traço roxo embaixo.
 */
export function BarraInterna() {
  const { aberto, alternar, botao, caminho, fechar, painel } = useMenuDaBarra();
  const [entrarAberto, setEntrarAberto] = useState(false);

  const abrirEntrada = () => {
    fechar();
    setEntrarAberto(true);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--linha)] bg-[rgb(0_0_0/0.72)] backdrop-blur-[18px]">
      <div className="mx-auto flex h-16 w-full max-w-[76rem] items-center gap-6 px-5 sm:px-8">
        <Link
          href={raiz}
          className="text-[1.5rem] leading-none font-extrabold tracking-[-0.01em] text-white"
        >
          {nome}
        </Link>

        <nav aria-label="Páginas" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-7">
            {paginas.map((p) => {
              const atual = caminho.startsWith(p.href);
              return (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    aria-current={atual ? "page" : undefined}
                    className={classes(
                      "relative inline-flex h-16 items-center text-[0.875rem] font-medium tracking-[-0.01em] transition-colors duration-200",
                      atual
                        ? "text-white after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 after:rounded-full after:bg-[var(--roxo)]"
                        : "text-[var(--texto-suave)] hover:text-white",
                    )}
                  >
                    {p.rotulo}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            type="button"
            onClick={abrirEntrada}
            className="pa-botao hidden min-h-9 bg-[var(--painel)] px-4 text-[0.875rem] text-[#e8e8e8] hover:bg-[#232323] sm:inline-flex"
          >
            Entrar
          </button>
          <a
            href="#comecar"
            className="pa-botao pa-botao-branco hidden min-h-9 px-4 text-[0.875rem] sm:inline-flex"
          >
            Abrir conta
            <Seta className="pa-seta h-[10px] w-[12px]" />
          </a>
          <button
            ref={botao}
            type="button"
            aria-expanded={aberto}
            aria-controls="pa-menu-interno"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={(e) => {
              e.stopPropagation();
              alternar();
            }}
            className="pa-burger-interno lg:hidden"
          >
            <span />
          </button>
        </div>
      </div>

      <div
        ref={painel}
        id="pa-menu-interno"
        hidden={!aberto}
        className="pa-menu-interno lg:hidden"
      >
        <Link href={raiz}>Início</Link>
        {paginas.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            aria-current={caminho.startsWith(p.href) ? "page" : undefined}
          >
            {p.rotulo}
          </Link>
        ))}
        <div className="my-1.5 h-px bg-[var(--linha)]" />
        <button type="button" onClick={abrirEntrada}>
          Entrar
        </button>
        <a href="#comecar" onClick={fechar} className="pa-menu-comecar">
          Abrir conta
          <Seta className="pa-seta h-[10px] w-[12px]" />
        </a>
      </div>

      <DialogoDeEntrada
        aberto={entrarAberto}
        aoFechar={() => setEntrarAberto(false)}
      />
    </header>
  );
}
