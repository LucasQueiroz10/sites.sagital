"use client";

import { useRef, useState, type ReactNode } from "react";
import { etapas } from "@/data/bloco";
import { projetar } from "@/lib/blocos";
import { classes } from "@/lib/classes";
import { prefereMenosMovimento } from "@/lib/movimento";
import { cenaDoProcesso } from "./cenas";
import { useCenaAoVivo } from "./useCenaAoVivo";

const FUNDO = { topo: "#dadada", base: "#bdbdbd" };

/**
 * Onde fica cada legenda no computador, nas regiões livres em volta da
 * diagonal (que vai de baixo à esquerda até em cima à direita). A etapa k
 * aponta para o bloco k.
 */
const POSICOES = [
  "left-[3%] bottom-[4%]",
  "left-[3%] top-[45%]",
  "right-[22%] bottom-[6%]",
  "right-[3%] top-[46%]",
  "left-[42%] top-[11%]",
];

/**
 * O processo. A seção fica presa na tela enquanto a rolagem atravessa o
 * trilho alto: a pilha começa explodida no eixo roscado e cada etapa encaixa
 * o seu bloco. No computador, uma linha liga cada legenda ao bloco dela; no
 * celular, a lista embaixo da pilha abre a etapa da vez. Com menos
 * movimento, a seção não prende: mostra a pilha montada e todas as etapas.
 */
export function Processo({ titulo }: { titulo: ReactNode }) {
  const trilho = useRef<HTMLDivElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);
  const linhas = useRef<(SVGLineElement | null)[]>([]);
  const pontos = useRef<(SVGCircleElement | null)[]>([]);
  const legendas = useRef<(HTMLLIElement | null)[]>([]);
  const ultimo = useRef(-1);
  const [ativa, setAtiva] = useState(0);

  useCenaAoVivo(tela, FUNDO, (_agora, forcar) => {
    const caixa = trilho.current?.getBoundingClientRect();
    const area = palco.current;
    if (!caixa || !area) return null;
    const parado = prefereMenosMovimento();
    const percurso = caixa.height - window.innerHeight;
    const p = parado
      ? 1
      : percurso > 0
        ? Math.min(Math.max(-caixa.top / percurso, 0), 1)
        : 1;
    if (!forcar && Math.abs(p - ultimo.current) < 0.0004) return null;
    ultimo.current = p;

    const etapa = Math.min(Math.floor(p * etapas.length), etapas.length - 1);
    setAtiva(etapa);

    const largura = area.clientWidth;
    const altura = area.clientHeight;
    const emPe = largura < 1024;
    const cena = cenaDoProcesso(p * 1.08, emPe);

    // As linhas: da borda da legenda virada para o bloco até o centro dele.
    if (!emPe) {
      const origem = area.getBoundingClientRect();
      cena.blocos.forEach((bloco, k) => {
        const alvo = projetar(cena.camera, bloco.posicao, largura, altura);
        const legenda = legendas.current[k]?.getBoundingClientRect();
        const linha = linhas.current[k];
        const ponto = pontos.current[k];
        if (!legenda || !linha || !ponto) return;
        const meio = legenda.left + legenda.width / 2 - origem.left;
        const x1 = (alvo.x > meio ? legenda.right : legenda.left) - origem.left;
        const y1 = Math.min(
          Math.max(alvo.y, legenda.top - origem.top + 18),
          legenda.bottom - origem.top - 18,
        );
        linha.setAttribute("x1", `${x1}`);
        linha.setAttribute("y1", `${y1}`);
        linha.setAttribute("x2", `${alvo.x}`);
        linha.setAttribute("y2", `${alvo.y}`);
        ponto.setAttribute("cx", `${alvo.x}`);
        ponto.setAttribute("cy", `${alvo.y}`);
      });
    }
    return cena;
  });

  return (
    <div ref={trilho} className="relative h-[360vh] motion-reduce:h-auto">
      <div
        ref={palco}
        className="sticky top-0 flex h-[100dvh] min-h-[38rem] flex-col overflow-hidden bg-[linear-gradient(#dadada,#bdbdbd)] motion-reduce:relative motion-reduce:h-auto"
      >
        <canvas
          ref={tela}
          aria-hidden
          className="absolute inset-x-0 top-[22%] h-[42%] w-full lg:inset-0 lg:h-full"
        />

        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden size-full lg:block"
        >
          {etapas.map((e, k) => (
            <g key={e.nome}>
              <line
                ref={(el) => {
                  linhas.current[k] = el;
                }}
                className={classes(
                  "transition-[stroke] duration-300",
                  k === ativa
                    ? "stroke-[var(--cor-laranja-campo)]"
                    : "stroke-[rgb(28_28_28/0.35)]",
                )}
                strokeWidth={1}
              />
              <circle
                ref={(el) => {
                  pontos.current[k] = el;
                }}
                cx={-20}
                cy={-20}
                r={k === ativa ? 5 : 3.5}
                className={classes(
                  "transition-[fill] duration-300",
                  k === ativa
                    ? "fill-[var(--cor-laranja-campo)]"
                    : "fill-white",
                )}
                stroke="rgb(28 28 28 / 0.4)"
              />
            </g>
          ))}
        </svg>

        <div className="relative z-10 mx-auto w-full max-w-[90rem] px-4 pt-20 sm:px-6 lg:px-8 lg:pt-24">
          {titulo}
        </div>

        <ol className="relative z-10 mt-auto grid gap-1 px-4 pb-6 sm:px-6 lg:static lg:mt-0 lg:block lg:p-0">
          {etapas.map((e, k) => {
            const aqui = k === ativa;
            return (
              <li
                key={e.nome}
                ref={(el) => {
                  legendas.current[k] = el;
                }}
                aria-current={aqui ? "step" : undefined}
                className={classes(
                  "bl-mira transition-[background-color] duration-300 lg:absolute lg:w-[19rem] xl:w-[21rem]",
                  POSICOES[k],
                  // A etapa da vez muda a moldura (laranja) e o fundo; o
                  // texto das outras continua legível.
                  aqui
                    ? "bg-[rgb(255_255_255/0.88)]"
                    : "bl-mira-escura bg-[rgb(255_255_255/0.5)]",
                )}
              >
                <div className="flex items-baseline gap-3 px-4 pt-3 pb-2.5 lg:px-5 lg:pt-4">
                  <span className="bl-rotulo text-[0.6875rem] text-[var(--cor-laranja-tinta)]">
                    [{String(k + 1).padStart(2, "0")}]
                  </span>
                  <h3 className="bl-quadrada text-[1.375rem] text-[var(--cor-tinta)] lg:text-[1.625rem]">
                    {e.nome}
                  </h3>
                  <span className="ml-auto text-[0.8125rem] text-[var(--cor-texto-suave)] lg:hidden">
                    {e.prazo}
                  </span>
                </div>
                <div
                  className={classes(
                    "grid transition-[grid-template-rows] duration-300 ease-[var(--curva-saida)] lg:grid-rows-[1fr]",
                    aqui
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr] motion-reduce:grid-rows-[1fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="mx-4 border-t border-[var(--cor-borda)] pt-2.5 pb-3.5 lg:mx-5 lg:pb-4">
                      <p className="text-[0.9375rem] leading-snug text-[var(--cor-grafite)]">
                        {e.texto}
                      </p>
                      <p className="mt-2 hidden text-[0.8125rem] text-[var(--cor-texto-suave)] lg:block">
                        Prazo: {e.prazo}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
