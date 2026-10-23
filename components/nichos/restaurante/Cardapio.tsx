"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { Carrossel } from "@/components/ui/Carrossel";
import { Container } from "@/components/ui/Container";
import type { CategoriaDoCardapio, SeloDoPrato } from "@/data/tipos";
import { classes } from "@/lib/classes";
import { formatarPreco } from "@/lib/formato";

const foco =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

const coresDosSelos: Record<SeloDoPrato, string> = {
  vegano: "bg-[var(--cor-folha)] text-[var(--cor-creme)]",
  vegetariano: "bg-[var(--cor-manteiga)] text-[var(--cor-marinho)]",
  "sem glúten": "bg-[var(--cor-creme)] text-[var(--cor-marinho)]",
  "da casa": "bg-[var(--cor-pervinca)] text-[var(--cor-marinho)]",
};

type Props = {
  categorias: CategoriaDoCardapio[];
  rotuloDoNicho: string;
};

/**
 * O cardápio como as divisórias coloridas de uma prancheta: uma aba por
 * categoria e, embaixo, os pratos da aba numa trilha horizontal, com foto,
 * preço e o pedido pronto para o WhatsApp.
 */
export function Cardapio({ categorias, rotuloDoNicho }: Props) {
  const [idAtual, setIdAtual] = useState(categorias[0]?.id);
  const atual = categorias.find((c) => c.id === idAtual) ?? categorias[0];
  if (!atual) return null;

  return (
    <>
      <Container largura="larga">
        <h2
          id="cardapio-titulo"
          className="text-[clamp(2.75rem,9vw,4.5rem)] text-balance"
        >
          Cardápio{" "}
          <span className="manuscrito ml-1 inline-block -rotate-6 text-[1.1em] text-[var(--cor-pervinca-tinta)]">
            do dia
          </span>
        </h2>
        <div
          role="group"
          aria-label="Categorias do cardápio"
          className="-mx-4 mt-8 flex items-end gap-1.5 overflow-x-auto border-b-2 border-[var(--cor-marinho)] px-4 sm:mx-0 sm:px-0"
        >
          {categorias.map((categoria) => {
            const escolhida = categoria.id === atual.id;
            return (
              <button
                key={categoria.id}
                type="button"
                data-aba={categoria.cor}
                aria-pressed={escolhida}
                onClick={() => setIdAtual(categoria.id)}
                className={classes(
                  "condensada shrink-0 rounded-t-tema bg-[var(--aba-fundo)] px-4 text-base whitespace-nowrap text-[var(--aba-texto)] transition-[padding] duration-200 ease-out sm:px-5 sm:text-lg",
                  escolhida ? "pt-5 pb-3" : "pt-2.5 pb-2 hover:pt-3.5",
                  foco,
                )}
              >
                {categoria.nome}
              </button>
            );
          })}
        </div>
        <p
          aria-live="polite"
          className="mt-4 max-w-[52ch] text-lg text-texto-suave"
        >
          {atual.chamada}
        </p>
      </Container>
      <Carrossel
        // Uma trilha nova por categoria: volta ao primeiro prato ao trocar.
        // As abas ficam fora dela para o foco não se perder no clique.
        key={atual.id}
        rotulo={`Pratos: ${atual.nome}`}
        classeDasSetas="rounded-full border-2 border-[var(--cor-marinho)] bg-fundo text-[var(--cor-marinho)]"
        classeDoPonto={{
          atual: "bg-[var(--cor-marinho)]",
          outros: "bg-[var(--cor-marinho)]/25",
        }}
        className="mt-6 gap-4 pb-2 sm:gap-6"
      >
        {atual.itens.map((item, i) => (
          <li
            key={item.nome}
            style={{ "--ordem": i } as CSSProperties}
            className="prato-chegando w-[78%] max-w-[20rem] shrink-0 snap-start sm:w-[18rem] lg:w-[calc((100%-4.5rem)/4)] lg:max-w-none"
          >
            <article className="flex h-full flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-tema bg-superficie">
                <Image
                  src={item.imagem.src}
                  alt={item.imagem.alt}
                  fill
                  sizes="(min-width: 1024px) 19rem, (min-width: 640px) 18rem, 78vw"
                  className="object-cover"
                  placeholder="blur"
                />
                {item.selos && (
                  <ul className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.selos.map((selo) => (
                      <li
                        key={selo}
                        className={classes(
                          "condensada rounded-full px-2.5 py-0.5 text-[0.8125rem]",
                          coresDosSelos[selo],
                        )}
                      >
                        {selo}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-1 flex-col pt-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[1.625rem] text-balance">{item.nome}</h3>
                  <p className="condensada shrink-0 text-xl tabular-nums">
                    {formatarPreco(item.preco)}
                  </p>
                </div>
                <p className="mt-1.5 text-texto-suave">{item.descricao}</p>
                <div className="mt-auto pt-4">
                  <BotaoWhatsApp
                    acao={{
                      rotulo: "Pedir",
                      pedido: `Quero pedir: ${item.nome}.`,
                    }}
                    rotuloDoNicho={rotuloDoNicho}
                    variante="secundario"
                    complementoAcessivel={item.nome}
                    className="px-5 text-[0.9375rem]"
                  />
                </div>
              </div>
            </article>
          </li>
        ))}
      </Carrossel>
    </>
  );
}
