"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { contato, navegacao } from "@/data/bloco";
import { classes } from "@/lib/classes";
import { usePassouDoTopo } from "@/lib/usePassouDoTopo";
import { MarcaBloco } from "./Marcas";

const INICIO = { rotulo: "Início", href: "#inicio" };
const ITENS = [INICIO, ...navegacao];

/**
 * Cabeçalho fixo e opaco. No computador, a navegação é uma pílula com o item da seção
 * à vista em laranja: o fundo laranja desliza de um item ao outro conforme a
 * página rola. No celular, o menu abre como uma folha cinza com os nomes
 * grandes na letra quadrada.
 */
export function Cabecalho() {
  const passou = usePassouDoTopo("[data-bl-topo]");
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState(0);
  const lista = useRef<HTMLUListElement>(null);
  const indicador = useRef<HTMLSpanElement>(null);
  const jaPosicionou = useRef(false);

  // A seção ativa é a que cruza a faixa do meio da tela.
  useEffect(() => {
    const secoes = ITENS.map((item) =>
      document.querySelector<HTMLElement>(item.href),
    );
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          const i = secoes.indexOf(e.target as HTMLElement);
          if (i >= 0) setAtivo(i);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of secoes) if (s) observador.observe(s);
    return () => observador.disconnect();
  }, []);

  // O fundo laranja vai até o item ativo. Na primeira vez, sem animar.
  useLayoutEffect(() => {
    const item = lista.current?.children[ativo] as HTMLElement | undefined;
    const fundo = indicador.current;
    if (!item || !fundo) return;
    fundo.style.transition = jaPosicionou.current ? "" : "none";
    fundo.style.transform = `translateX(${item.offsetLeft}px)`;
    fundo.style.width = `${item.offsetWidth}px`;
    jaPosicionou.current = true;
  }, [ativo]);

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
        // Sempre opaco: no topo, o cinza dele é o mesmo da abertura; o fio
        // de baixo só aparece depois que a página rola.
        "fixed inset-x-0 top-0 z-40 border-b bg-[var(--cor-cinza)] transition-[border-color] duration-300 ease-out",
        passou || aberto ? "border-[var(--cor-borda)]" : "border-transparent",
      )}
    >
      <div className="mx-auto flex min-h-16 w-full max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 lg:min-h-[4.5rem] lg:px-8">
        <a
          href="#inicio"
          onClick={() => setAberto(false)}
          className="-ml-1 inline-flex min-h-11 items-center px-1 text-[var(--cor-tinta)]"
        >
          <MarcaBloco />
          <span className="sr-only">, início</span>
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul
            ref={lista}
            className="relative flex items-center rounded-[var(--raio)] bg-[rgb(255_255_255/0.55)] p-1 shadow-[inset_0_0_0_1px_rgb(28_28_28/0.06)]"
          >
            {ITENS.map((item, i) => (
              <li key={item.href} className="relative z-10">
                <a
                  href={item.href}
                  aria-current={ativo === i ? "location" : undefined}
                  className={classes(
                    "inline-flex min-h-9 items-center rounded-[3px] px-4 text-[0.875rem] transition-colors duration-200",
                    ativo === i
                      ? "text-white"
                      : "text-[var(--cor-grafite)] hover:text-[var(--cor-laranja-tinta)]",
                  )}
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
            <span
              ref={indicador}
              aria-hidden
              className="absolute top-1 bottom-1 left-0 rounded-[3px] bg-[var(--cor-laranja-campo)] transition-[transform,width] duration-[350ms] ease-[var(--curva-saida)] motion-reduce:transition-none"
            />
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#auditoria"
            onClick={() => setAberto(false)}
            className="bl-botao bl-botao-mira bl-mira hidden min-h-11 px-4 text-[0.875rem] sm:inline-flex"
          >
            Pedir auditoria
            <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
          </a>
          <button
            type="button"
            aria-expanded={aberto}
            aria-controls="bl-menu"
            onClick={() => setAberto((v) => !v)}
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
        id="bl-menu"
        hidden={!aberto}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-[var(--cor-cinza)] px-4 pt-6 pb-16 sm:px-6 lg:hidden"
      >
        <nav aria-label="Seções">
          <ul className="grid">
            {ITENS.map((item) => (
              <li
                key={item.href}
                className="border-b border-[var(--cor-borda)]"
              >
                <a
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="bl-quadrada flex min-h-16 items-center justify-between text-[2.5rem] text-[var(--cor-tinta)] transition-colors hover:text-[var(--cor-laranja-titulo)]"
                >
                  {item.rotulo}
                  <ArrowUpRight
                    aria-hidden
                    className="size-6 text-[var(--cor-laranja-tinta)]"
                    strokeWidth={1.25}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#auditoria"
          onClick={() => setAberto(false)}
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
