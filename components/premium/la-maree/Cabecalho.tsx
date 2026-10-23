"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { contato, navegacao } from "@/data/la-maree";
import { classes } from "@/lib/classes";
import { usePassouDoTopo } from "@/lib/usePassouDoTopo";
import { Monograma } from "./Marcas";

/**
 * Cabeçalho fixo: transparente sobre a foto da abertura e em tinta depois
 * dela. No celular, o menu abre como uma folha preta com os nomes grandes na
 * serifa, como o índice de um cardápio.
 */
export function Cabecalho() {
  const passou = usePassouDoTopo("[data-lm-topo]");
  const [aberto, setAberto] = useState(false);

  // Com o menu aberto, a página de trás não rola e o Esc fecha.
  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", fechar);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", fechar);
    };
  }, [aberto]);

  return (
    <header
      className={classes(
        "fixed inset-x-0 top-0 z-40 border-b text-[var(--cor-creme)] transition-[background-color,border-color] duration-300 ease-out",
        passou || aberto
          ? "border-[var(--cor-borda)] bg-[var(--cor-tinta)]"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto grid min-h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:min-h-18">
        <nav aria-label="Seções" className="hidden items-center gap-7 lg:flex">
          {navegacao.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="lm-selo py-2 text-[0.8125rem] opacity-80 transition-opacity hover:opacity-100"
            >
              {link.rotulo}
            </a>
          ))}
        </nav>
        <button
          type="button"
          aria-expanded={aberto}
          aria-controls="lm-menu"
          onClick={() => setAberto((v) => !v)}
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

        <a
          href="#topo"
          onClick={() => setAberto(false)}
          className="grid place-items-center py-2"
        >
          <Monograma className="w-9 text-[1rem] lg:w-10" />
          <span className="sr-only">La Marée, início</span>
        </a>

        <a
          href="#reservas"
          onClick={() => setAberto(false)}
          className="lm-botao lm-botao-contorno min-h-10 justify-self-end px-3 text-[0.6875rem] tracking-[0.04em] sm:px-5 sm:text-[0.75rem]"
        >
          Reservar mesa
        </a>
      </div>

      <div
        id="lm-menu"
        hidden={!aberto}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-[var(--cor-tinta)] px-4 pt-8 pb-16 sm:px-6 lg:hidden"
      >
        <nav aria-label="Seções">
          <ol className="grid gap-2">
            {navegacao.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setAberto(false)}
                  className="lm-serifa block py-1 text-[3.25rem] transition-colors hover:text-[var(--cor-laranja)]"
                >
                  {link.rotulo}
                </a>
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
