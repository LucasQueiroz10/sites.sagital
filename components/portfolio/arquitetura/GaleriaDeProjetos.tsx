"use client";

import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  categorias,
  type Categoria,
  type Projeto,
} from "@/data/portfolio/arquitetura";
import { classes } from "@/lib/classes";
import { fecharDialogo } from "@/lib/movimento";
import { linkDoPortfolio } from "@/lib/whatsapp";

type Props = { projetos: Projeto[]; nomeDoSite: string };

const nomeDaCategoria = (valor: Categoria) =>
  categorias.find((c) => c.valor === valor)?.rotulo ?? valor;

/**
 * Os projetos do estúdio em mosaico, com filtro por tipo. Cada capa abre a
 * ficha do projeto num diálogo: fotos, dados da obra e o pedido de conversa.
 */
export function GaleriaDeProjetos({ projetos, nomeDoSite }: Props) {
  const [filtro, setFiltro] = useState<Categoria | "todos">("todos");
  const [aberto, setAberto] = useState<Projeto | null>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const origem = useRef<HTMLButtonElement | null>(null);

  const visiveis =
    filtro === "todos"
      ? projetos
      : projetos.filter((projeto) => projeto.categoria === filtro);

  useEffect(() => {
    const el = dialogo.current;
    if (aberto && el && !el.open) {
      el.showModal();
      document.documentElement.style.overflow = "hidden";
    }
  }, [aberto]);

  function fechar() {
    const el = dialogo.current;
    if (el)
      void fecharDialogo(
        el,
        [
          { opacity: 1, transform: "none" },
          { opacity: 0, transform: "translateY(12px)" },
        ],
        200,
      );
  }

  return (
    <>
      <div
        role="group"
        aria-label="Filtrar projetos"
        className="flex flex-wrap gap-2"
      >
        {categorias.map((categoria) => {
          const marcado = filtro === categoria.valor;
          const total =
            categoria.valor === "todos"
              ? projetos.length
              : projetos.filter((p) => p.categoria === categoria.valor).length;
          return (
            <button
              key={categoria.valor}
              type="button"
              aria-pressed={marcado}
              onClick={() => setFiltro(categoria.valor)}
              className={classes(
                "inline-flex min-h-11 items-center gap-2 border px-4 text-[0.9375rem] transition-colors",
                marcado
                  ? "border-texto bg-texto text-fundo"
                  : "border-borda hover:border-texto",
              )}
            >
              {categoria.rotulo}
              <span
                className={classes(
                  "numero text-xs",
                  marcado ? "text-fundo/70" : "text-texto-suave",
                )}
              >
                {total}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visiveis.length} projetos
      </p>

      <ul className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {visiveis.map((projeto) => (
          <li
            key={projeto.id}
            className="projeto-entra mb-10 break-inside-avoid"
          >
            <button
              type="button"
              onClick={(evento) => {
                origem.current = evento.currentTarget;
                setAberto(projeto);
              }}
              className="group block w-full text-left"
            >
              <span
                className={classes(
                  "relative block overflow-hidden bg-superficie",
                  projeto.formato === "retrato"
                    ? "aspect-[4/5]"
                    : "aspect-[4/3]",
                )}
              >
                <Image
                  src={projeto.imagens[0].src}
                  alt={projeto.imagens[0].alt}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
                  placeholder="blur"
                />
              </span>
              <span className="mt-4 flex items-baseline justify-between gap-4">
                <span className="text-xl font-medium tracking-[-0.02em]">
                  {projeto.nome}
                </span>
                <span className="numero text-sm text-texto-suave">
                  {projeto.ano}
                </span>
              </span>
              <span className="mt-1 block text-[0.9375rem] text-texto-suave">
                {nomeDaCategoria(projeto.categoria)} · {projeto.local} ·{" "}
                {projeto.area}
              </span>
              <span className="sr-only"> (abre a ficha do projeto)</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogo}
        aria-labelledby="ficha-titulo"
        onCancel={(evento) => {
          evento.preventDefault();
          fechar();
        }}
        onClose={() => {
          document.documentElement.style.overflow = "";
          setAberto(null);
          origem.current?.focus();
        }}
        onClick={(evento) => {
          if (evento.target === evento.currentTarget) fechar();
        }}
        className="ficha m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-[rgb(20_20_18/0.6)] backdrop:backdrop-blur-sm sm:m-auto sm:h-auto sm:max-h-[92dvh] sm:w-[min(72rem,calc(100%-3rem))]"
      >
        {aberto && (
          <div className="flex h-full flex-col overflow-y-auto bg-fundo sm:max-h-[92dvh]">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-borda bg-fundo/95 px-5 py-3 backdrop-blur sm:px-8">
              <p className="text-sm text-texto-suave">
                {nomeDaCategoria(aberto.categoria)} · {aberto.ano}
              </p>
              <button
                type="button"
                onClick={fechar}
                className="grid size-11 place-items-center border border-borda transition-colors hover:border-texto"
              >
                <X aria-hidden className="size-5" />
                <span className="sr-only">Fechar a ficha</span>
              </button>
            </div>
            <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-12">
              <div className="grid gap-4">
                {aberto.imagens.map((imagem) => (
                  <div
                    key={imagem.alt}
                    className="relative aspect-[4/3] overflow-hidden bg-superficie"
                  >
                    <Image
                      src={imagem.src}
                      alt={imagem.alt}
                      fill
                      sizes="(min-width: 1024px) 640px, 100vw"
                      className="object-cover"
                      placeholder="blur"
                    />
                  </div>
                ))}
              </div>
              <div className="lg:sticky lg:top-24 lg:self-start">
                <h3
                  id="ficha-titulo"
                  className="text-[2.25rem] leading-tight font-medium tracking-[-0.03em]"
                >
                  {aberto.nome}
                </h3>
                <p className="mt-1 text-texto-suave">{aberto.local}</p>
                <p className="mt-6 text-lg leading-relaxed">{aberto.resumo}</p>
                <dl className="mt-8 border-t border-borda">
                  {aberto.ficha.map((linha) => (
                    <div
                      key={linha.rotulo}
                      className="flex justify-between gap-6 border-b border-borda py-3 text-[0.9375rem]"
                    >
                      <dt className="text-texto-suave">{linha.rotulo}</dt>
                      <dd className="text-right">{linha.valor}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={linkDoPortfolio(
                    `Vi o projeto ${aberto.nome} no site e quero conversar sobre um projeto parecido.`,
                    nomeDoSite,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-12 items-center gap-2 bg-texto px-6 font-medium text-fundo transition-colors hover:bg-[var(--cor-terracota)]"
                >
                  Quero um projeto assim
                  <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only"> (abre o WhatsApp)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
