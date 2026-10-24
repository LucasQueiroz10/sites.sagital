"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { Container } from "@/components/ui/Container";
import type { CategoriaDoCardapio, SeloDoPrato } from "@/data/tipos";
import { classes } from "@/lib/classes";
import { formatarPreco } from "@/lib/formato";

const foco =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

const coresDosSelos: Record<SeloDoPrato, string> = {
  vegano: "bg-[var(--cor-folha)] text-[var(--cor-creme)]",
  vegetariano: "bg-[var(--cor-manteiga)] text-[var(--cor-marinho)]",
  "sem glúten": "bg-[var(--cor-areia)] text-[var(--cor-marinho)]",
  "da casa": "bg-[var(--cor-pervinca)] text-[var(--cor-marinho)]",
};

const FILTROS: (SeloDoPrato | "todos")[] = [
  "todos",
  "vegano",
  "vegetariano",
  "sem glúten",
  "da casa",
];

type Props = { categorias: CategoriaDoCardapio[]; rotuloDoNicho: string };

/**
 * O cardápio inteiro, como a folha impressa: o índice das categorias, um
 * filtro por selo (vegano, sem glúten...) e cada categoria com a sua aba
 * colorida. Ao trocar o filtro, os pratos que ficam chegam um a um.
 */
export function CardapioCompleto({ categorias, rotuloDoNicho }: Props) {
  const [filtro, setFiltro] = useState<SeloDoPrato | "todos">("todos");
  const visiveis = categorias
    .map((c) => ({
      ...c,
      itens:
        filtro === "todos"
          ? c.itens
          : c.itens.filter((i) => i.selos?.includes(filtro)),
    }))
    .filter((c) => c.itens.length > 0);
  const total = visiveis.reduce((n, c) => n + c.itens.length, 0);

  return (
    <>
      <div className="sticky top-[4.5rem] z-30 border-y border-borda bg-fundo/95 backdrop-blur-sm">
        <Container
          largura="larga"
          className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between"
        >
          <nav
            aria-label="Categorias"
            className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
          >
            <ul className="flex gap-1.5">
              {visiveis.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    data-aba={c.cor}
                    className={classes(
                      "condensada tatil inline-flex min-h-10 items-center rounded-full bg-[var(--aba-fundo)] px-4 text-[0.9375rem] whitespace-nowrap text-[var(--aba-texto)]",
                      foco,
                    )}
                  >
                    {c.nome}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div
            role="group"
            aria-label="Filtrar por selo"
            className="-mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0"
          >
            {FILTROS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filtro === f}
                onClick={() => setFiltro(f)}
                className={classes(
                  "tatil min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold whitespace-nowrap capitalize",
                  filtro === f
                    ? "border-[var(--cor-marinho)] bg-[var(--cor-marinho)] text-[var(--cor-creme)]"
                    : "border-borda bg-fundo hover:border-[var(--cor-marinho)]",
                  foco,
                )}
              >
                {f === "todos" ? "Tudo" : f}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <p aria-live="polite" className="sr-only">
        {filtro === "todos"
          ? `${total} pratos no cardápio`
          : `${total} pratos com o selo ${filtro}`}
      </p>

      <div key={filtro}>
        {visiveis.map((categoria) => (
          <section
            key={categoria.id}
            id={categoria.id}
            aria-labelledby={`${categoria.id}-titulo`}
            className="scroll-mt-40 py-12 sm:py-16"
          >
            <Container largura="larga">
              <div
                data-aba={categoria.cor}
                className="chega flex flex-col gap-1 rounded-tema bg-[var(--aba-fundo)] px-5 py-5 text-[var(--aba-texto)] sm:flex-row sm:items-end sm:justify-between sm:px-8"
              >
                <h2
                  id={`${categoria.id}-titulo`}
                  className="text-[clamp(2.25rem,6vw,3.5rem)] leading-none"
                >
                  {categoria.nome}
                </h2>
                <p className="max-w-[44ch] sm:text-right">
                  {categoria.chamada}
                </p>
              </div>
              <ul className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
                {categoria.itens.map((item, i) => (
                  <li
                    key={item.nome}
                    className="chega grid grid-cols-[6.5rem_1fr] gap-4 sm:grid-cols-[8.5rem_1fr] sm:gap-5"
                    style={{ "--ordem": i + 1 } as CSSProperties}
                  >
                    <div className="aproxima relative aspect-square overflow-hidden rounded-tema bg-superficie">
                      <Image
                        src={item.imagem.src}
                        alt={item.imagem.alt}
                        fill
                        sizes="(min-width: 640px) 8.5rem, 6.5rem"
                        className="object-cover"
                        placeholder="blur"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-[1.5rem] leading-tight">
                          {item.nome}
                        </h3>
                        <span
                          aria-hidden
                          className="mb-1.5 min-w-4 flex-1 self-end border-b-2 border-dotted border-borda max-sm:invisible"
                        />
                        <p className="condensada shrink-0 text-xl tabular-nums">
                          {formatarPreco(item.preco)}
                        </p>
                      </div>
                      <p className="mt-1 text-texto-suave">{item.descricao}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {item.selos?.map((selo) => (
                          <span
                            key={selo}
                            className={classes(
                              "condensada rounded-full px-2.5 py-0.5 text-[0.8125rem]",
                              coresDosSelos[selo],
                            )}
                          >
                            {selo}
                          </span>
                        ))}
                        <BotaoWhatsApp
                          acao={{
                            rotulo: "Pedir",
                            pedido: `Quero pedir: ${item.nome}.`,
                          }}
                          rotuloDoNicho={rotuloDoNicho}
                          variante="secundario"
                          complementoAcessivel={item.nome}
                          className="ml-auto min-h-10 px-4 text-[0.9375rem]"
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        ))}
      </div>
    </>
  );
}
