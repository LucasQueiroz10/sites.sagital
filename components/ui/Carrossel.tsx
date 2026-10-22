"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { classes } from "@/lib/classes";
import { prefereMenosMovimento } from "@/lib/movimento";

type Props = {
  /** Nome da lista para leitores de tela, ex.: "Demos". */
  rotulo: string;
  /** Título da seção (h2), alinhado à margem do conteúdo, com as setas ao lado. */
  cabecalho?: ReactNode;
  /** Itens: cada um é um <li>; a largura fica a cargo de quem usa. */
  children: ReactNode;
  /** Espaço entre os itens e classes extras da trilha. */
  className?: string;
  /** Classes do botão das setas, para cada mundo estilizar. */
  classeDasSetas?: string;
  /** Cor dos pontos: a do item atual e a dos outros. */
  classeDoPonto?: { atual: string; outros: string };
  /** Largura máxima do conteúdo da página, para a trilha alinhar com ela. */
  largura?: "normal" | "larga";
  /** Duas linhas: os itens enchem coluna por coluna (encarte de ofertas). */
  linhas?: 1 | 2;
};

const larguras = { normal: "72rem", larga: "80rem" } as const;

const recuoDa = (el: HTMLElement) =>
  Number.parseFloat(getComputedStyle(el).scrollPaddingInlineStart) || 0;

/** Onde começa cada coluna da trilha (com duas linhas, dois itens dividem uma). */
function posicoesDasColunas(el: HTMLElement): number[] {
  const posicoes = new Set<number>();
  for (const item of Array.from(el.children) as HTMLElement[]) {
    posicoes.add(item.offsetLeft);
  }
  return [...posicoes].sort((a, b) => a - b);
}

/**
 * Trilha horizontal: rola com o dedo no celular e com as setas no desktop.
 * Cada item é um <li> com "shrink-0 snap-start" e a sua largura (com duas
 * linhas, a largura vai em auto-cols-[...] na trilha). O primeiro
 * item alinha com a margem do conteúdo e a trilha vai até a borda da tela,
 * para o item seguinte aparecer cortado e convidar a deslizar.
 */
export function Carrossel({
  rotulo,
  cabecalho,
  children,
  className,
  classeDasSetas,
  classeDoPonto = { atual: "bg-texto-suave", outros: "bg-borda" },
  largura = "larga",
  linhas = 1,
}: Props) {
  const trilha = useRef<HTMLUListElement>(null);
  const [colunas, setColunas] = useState(() =>
    Math.ceil(Children.count(children) / linhas),
  );
  const [atual, setAtual] = useState(0);
  const [cabe, setCabe] = useState(true);
  const [noInicio, setNoInicio] = useState(true);
  const [noFim, setNoFim] = useState(false);

  const medir = useCallback(() => {
    const el = trilha.current;
    if (!el) return;
    const posicoes = posicoesDasColunas(el);
    const inicio = el.scrollLeft + recuoDa(el);
    let maisPerto = 0;
    let menorDistancia = Number.POSITIVE_INFINITY;
    posicoes.forEach((posicao, i) => {
      const distancia = Math.abs(posicao - inicio);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        maisPerto = i;
      }
    });
    const fim = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setColunas(posicoes.length);
    setAtual(fim ? posicoes.length - 1 : maisPerto);
    setCabe(el.scrollWidth <= el.clientWidth + 4);
    setNoInicio(el.scrollLeft <= 4);
    setNoFim(fim);
  }, []);

  useEffect(() => {
    const el = trilha.current;
    if (!el) return;
    let quadro = 0;
    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(medir);
    };
    medir();
    el.addEventListener("scroll", aoRolar, { passive: true });
    const observador = new ResizeObserver(aoRolar);
    observador.observe(el);
    return () => {
      cancelAnimationFrame(quadro);
      el.removeEventListener("scroll", aoRolar);
      observador.disconnect();
    };
  }, [medir]);

  function irPara(passo: 1 | -1) {
    const el = trilha.current;
    if (!el) return;
    const posicoes = posicoesDasColunas(el);
    const alvo =
      posicoes[Math.min(Math.max(atual + passo, 0), posicoes.length - 1)];
    if (alvo === undefined) return;
    el.scrollTo({
      left: alvo - recuoDa(el),
      behavior: prefereMenosMovimento() ? "auto" : "smooth",
    });
  }

  const seta = classes(
    "inline-flex size-11 items-center justify-center transition-opacity disabled:opacity-35",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque",
    classeDasSetas ?? "rounded-full bg-superficie text-texto",
  );

  return (
    <div style={{ "--trilho-largura": larguras[largura] } as CSSProperties}>
      {(cabecalho || !cabe) && (
        <div
          className={classes(
            "mx-auto flex w-full items-end justify-between gap-4 px-4 sm:px-6",
            largura === "larga" ? "max-w-7xl" : "max-w-6xl",
          )}
        >
          <div className="min-w-0 flex-1">{cabecalho}</div>
          {!cabe && (
            <div className="hidden shrink-0 gap-2 md:flex">
              <button
                type="button"
                onClick={() => irPara(-1)}
                disabled={noInicio}
                className={seta}
              >
                <ChevronLeft aria-hidden className="size-5" />
                <span className="sr-only">Anterior: {rotulo}</span>
              </button>
              <button
                type="button"
                onClick={() => irPara(1)}
                disabled={noFim}
                className={seta}
              >
                <ChevronRight aria-hidden className="size-5" />
                <span className="sr-only">Próximo: {rotulo}</span>
              </button>
            </div>
          )}
        </div>
      )}
      <ul
        ref={trilha}
        aria-label={rotulo}
        tabIndex={cabe ? undefined : 0}
        className={classes(
          "trilho relative snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
          linhas === 2 ? "grid grid-flow-col grid-rows-2" : "flex",
          "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-destaque",
          cabecalho ? "mt-6" : undefined,
          className ?? "gap-3 sm:gap-4",
        )}
      >
        {children}
      </ul>
      {!cabe && colunas > 1 && (
        <div aria-hidden className="mt-4 flex justify-center gap-1.5">
          {Array.from({ length: colunas }, (_, i) => (
            <span
              key={i}
              className={classes(
                "size-1.5 rounded-full transition-colors duration-200",
                i === atual ? classeDoPonto.atual : classeDoPonto.outros,
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
