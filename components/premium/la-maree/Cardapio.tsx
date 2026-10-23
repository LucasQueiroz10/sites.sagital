"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cardapio, cores, type Prato } from "@/data/la-maree";
import { classes } from "@/lib/classes";
import { Gravura, Monograma } from "./Marcas";

/** Gravura de fundo de cada folha, bem apagada, como as pinceladas do papel. */
const marcaDagua = {
  entradas: "ostra",
  pratos: "peixe",
  sobremesas: "vieira",
  bebidas: "polvo",
} as const;

/**
 * O cardápio como as folhas coloridas das referências: abas de papel, cada
 * parte na sua cor, os nomes alternando à esquerda e à direita. Trocar de
 * aba tira a folha nova do envelope.
 */
export function Cardapio() {
  const [atual, setAtual] = useState(0);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const parte = cardapio[atual];

  // Setas e Home/End andam entre as abas, como pede o padrão de abas.
  function navegarPeloTeclado(e: KeyboardEvent) {
    const ultimo = cardapio.length - 1;
    const destino =
      e.key === "ArrowRight"
        ? atual === ultimo
          ? 0
          : atual + 1
        : e.key === "ArrowLeft"
          ? atual === 0
            ? ultimo
            : atual - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? ultimo
              : null;
    if (destino === null) return;
    e.preventDefault();
    setAtual(destino);
    abas.current[destino]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Partes do cardápio"
        onKeyDown={navegarPeloTeclado}
        className="-mx-4 flex snap-x scroll-px-4 gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {cardapio.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              abas.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`aba-${p.id}`}
            aria-selected={i === atual}
            aria-controls="folha-do-cardapio"
            tabIndex={i === atual ? 0 : -1}
            onClick={() => setAtual(i)}
            className={classes(
              "lm-selo papel-claro min-h-11 shrink-0 snap-start px-4 pt-3 pb-2.5 text-[0.75rem] text-[var(--cor-tinta)] transition-[opacity,transform] duration-200 ease-out",
              i === atual
                ? "opacity-100"
                : "translate-y-1 opacity-55 hover:translate-y-0.5 hover:opacity-85",
            )}
            style={{ backgroundColor: cores[p.cor] }}
          >
            {p.rotulo}
          </button>
        ))}
      </div>

      <div
        key={parte.id}
        id="folha-do-cardapio"
        role="tabpanel"
        aria-labelledby={`aba-${parte.id}`}
        tabIndex={0}
        className="lm-folha papel-claro relative isolate overflow-hidden px-5 pt-10 pb-8 text-[var(--cor-tinta)] sm:px-10 sm:pt-12 sm:pb-10"
        style={{ backgroundColor: cores[parte.cor] }}
      >
        <Gravura
          nome={marcaDagua[parte.id as keyof typeof marcaDagua]}
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[85%] -translate-x-1/2 -translate-y-1/2 -rotate-6 opacity-[0.09]"
        />
        <h3 className="lm-caligrafia text-center text-[clamp(3rem,9vw,4.25rem)]">
          {parte.titulo}
        </h3>
        <ul className="mt-6 grid gap-9 sm:mt-8 sm:gap-11">
          {parte.pratos.map((prato, i) => (
            <ItemDoCardapio
              key={prato.nome}
              prato={prato}
              aDireita={i % 2 === 1}
            />
          ))}
        </ul>
        <Monograma className="mx-auto mt-10 w-8 text-[0.875rem] opacity-80" />
      </div>
    </div>
  );
}

function ItemDoCardapio({
  prato,
  aDireita,
}: {
  prato: Prato;
  aDireita: boolean;
}) {
  // Como no cardápio impresso: o número solto, em reais.
  const preco = String(prato.preco);
  return (
    <li
      className={classes(
        "grid gap-x-6 gap-y-2 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:items-start",
        aDireita && "text-right sm:[direction:rtl]",
      )}
    >
      <div className="[direction:ltr]">
        <p className="lm-serifa text-[clamp(1.75rem,5.4vw,2.375rem)] leading-[0.95]">
          {prato.nome}
        </p>
        {prato.complemento && (
          <p className="lm-serifa mt-1 text-[1.0625rem] leading-none">
            {prato.complemento}
          </p>
        )}
      </div>
      <div
        className={classes(
          "[direction:ltr]",
          aDireita ? "sm:text-left" : "sm:text-right",
        )}
      >
        <p
          className={classes(
            "lm-descricao max-w-[34ch] sm:pt-1.5",
            aDireita ? "ml-auto sm:ml-0" : "sm:ml-auto",
          )}
        >
          {prato.descricao}
        </p>
        <p
          className={classes(
            "mt-1.5",
            typeof prato.preco === "number"
              ? "lm-caligrafia text-[1.875rem] leading-none"
              : "lm-selo",
          )}
        >
          {preco}
        </p>
      </div>
    </li>
  );
}
