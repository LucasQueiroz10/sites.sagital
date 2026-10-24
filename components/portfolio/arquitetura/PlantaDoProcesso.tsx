"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { classes } from "@/lib/classes";

type Passo = { etapa: string; prazo: string; texto: string };

/**
 * Os tracos da planta de uma casa térrea, em camadas: cada etapa do
 * processo desenha a sua por cima das anteriores. Coordenadas no viewBox
 * 0 0 420 320; a casa ocupa de 80 a 330 por 70 a 240.
 */
const CAMADAS: {
  tracos: string[];
  textos?: { x: number; y: number; t: string }[];
}[] = [
  // Escuta: o terreno, o caimento, as árvores que ficam e o norte.
  {
    tracos: [
      "M20 20 H400 V300 H20 Z",
      "M20 118 C120 98 260 140 400 108",
      "M20 196 C140 176 280 218 400 186",
      "M342 60 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0",
      "M366 252 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0",
      "M33 272 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0",
      "M44 72 V40 M44 40 L38 52 M44 40 L50 52",
    ],
    textos: [{ x: 40, y: 86, t: "N" }],
  },
  // Estudo: o croqui, com os tracos passando dos cantos, à mão.
  {
    tracos: [
      "M62 70 H348",
      "M62 240 H348",
      "M80 52 V258",
      "M330 52 V258",
      "M210 56 V254",
      "M196 150 H344",
      "M265 138 V252",
    ],
  },
  // Projeto: paredes com os vãos das portas, as folhas, janelas e a cota.
  {
    tracos: [
      "M150 240 H80 V70 H330 V240 H180",
      "M210 70 V115 M210 140 V180 M210 205 V240",
      "M210 150 H280 M305 150 H330",
      "M265 150 V240",
      "M150 240 L150 210 A30 30 0 0 1 180 240",
      "M210 115 L235 115 A25 25 0 0 1 210 140",
      "M210 180 L235 180 A25 25 0 0 1 210 205",
      "M280 150 L280 175 A25 25 0 0 0 305 150",
      "M108 66 H172 M108 74 H172",
      "M248 66 H302 M248 74 H302",
      "M326 172 V218 M334 172 V218",
      "M76 112 V192 M84 112 V192",
      "M80 264 H330 M80 258 V270 M330 258 V270",
    ],
    textos: [{ x: 205, y: 280, t: "12,50 m" }],
  },
  // Obra: paredes levantadas, móveis e os nomes dos cômodos.
  {
    tracos: [
      "M90 80 H186 V96 H106 V128 H90 Z",
      "M118 140 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0",
      "M90 196 H146 V226 H90 Z M90 204 H146",
      "M268 80 H322 V142 H268 Z M274 86 H316 V98 H274 Z",
      "M220 156 H242 V168 H220 Z",
      "M216 210 H242 V236 H216 Z M216 210 L242 236",
      "M243 222 a7 10 0 1 0 14 0 a7 10 0 1 0 -14 0",
      "M292 168 H324 V234 H292 Z M296 172 H320 V182 H296 Z",
      "M270 204 H284 V236 H270 Z",
    ],
    textos: [
      { x: 150, y: 175, t: "estar" },
      { x: 236, y: 100, t: "quarto" },
    ],
  },
];

/** As paredes levantadas na obra: o mesmo traço do projeto, cheio. */
const PAREDES = [
  "M150 240 H80 V70 H330 V240 H180",
  "M210 70 V115 M210 140 V180 M210 205 V240",
  "M210 150 H280 M305 150 H330",
  "M265 150 V240",
];

/**
 * Como trabalhamos: a prancha fica parada na tela e a planta de uma casa se
 * desenha camada por camada conforme cada etapa cruza o meio da tela. Sem
 * JavaScript, a planta aparece pronta e as etapas, todas acesas.
 */
export function PlantaDoProcesso({ passos }: { passos: Passo[] }) {
  // -1: tudo à vista (o HTML do servidor e quem já passou da seção).
  const [atual, setAtual] = useState(-1);
  const raiz = useRef<HTMLDivElement>(null);
  const itens = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // Quem ainda não chegou à seção a encontra no começo, com a prancha só
    // com o terreno; a troca acontece fora da tela.
    const caixa = raiz.current?.getBoundingClientRect();
    const quadro = requestAnimationFrame(() => {
      if (caixa && caixa.top > window.innerHeight) setAtual(0);
    });
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          const i = itens.current.indexOf(entrada.target as HTMLLIElement);
          if (i >= 0) setAtual(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const item of itens.current) if (item) observador.observe(item);
    return () => {
      cancelAnimationFrame(quadro);
      observador.disconnect();
    };
  }, []);

  const etapa = atual < 0 ? CAMADAS.length - 1 : atual;
  const passo = passos[etapa];

  return (
    <div ref={raiz} className="grid gap-8 lg:grid-cols-12 lg:gap-14">
      <div className="sticky top-16 z-10 -mx-4 bg-fundo px-4 pt-2 pb-4 lg:static lg:col-span-7 lg:mx-0 lg:bg-transparent lg:p-0">
        <figure className="prancha relative lg:sticky lg:top-28">
          <svg
            viewBox="0 0 420 320"
            className="block w-full"
            role="img"
            aria-label={`Planta de uma casa térrea na etapa ${passo?.etapa.toLowerCase() ?? ""}`}
          >
            {CAMADAS.map((camada, c) => (
              <g
                key={c}
                className={`planta-camada planta-camada-${c}`}
                data-visivel={c <= etapa || undefined}
              >
                {c === 3 &&
                  PAREDES.map((d, i) => (
                    <path key={`parede-${i}`} d={d} className="planta-parede" />
                  ))}
                {camada.tracos.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    pathLength={1}
                    className="planta-traco"
                    style={{ "--i": i } as CSSProperties}
                  />
                ))}
                {camada.textos?.map((t) => (
                  <text
                    key={t.t + t.x}
                    x={t.x}
                    y={t.y}
                    textAnchor="middle"
                    className="planta-texto"
                  >
                    {t.t}
                  </text>
                ))}
              </g>
            ))}
          </svg>
          <figcaption className="flex items-baseline justify-between gap-4 border-t border-borda px-4 py-3 text-sm sm:px-5">
            <span className="numero text-texto-suave">
              Etapa {etapa + 1} de {passos.length}
            </span>
            <span
              key={etapa}
              className="planta-legenda font-semibold tracking-[-0.01em] [font-stretch:75%] uppercase"
            >
              {passo?.etapa}
            </span>
          </figcaption>
        </figure>
      </div>

      <ol className="lg:col-span-5">
        {passos.map((p, i) => (
          <li
            key={p.etapa}
            ref={(el) => {
              itens.current[i] = el;
            }}
            className={classes(
              "planta-passo flex min-h-[44vh] flex-col justify-center border-t border-texto py-10 lg:min-h-[62vh]",
              atual >= 0 && i !== atual && "planta-passo-apagado",
            )}
          >
            <p className="numero text-sm text-texto-suave">{p.prazo}</p>
            <h3 className="mt-3 text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.92] font-semibold tracking-[-0.02em] [font-stretch:75%] uppercase">
              {p.etapa}
            </h3>
            <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-texto-suave">
              {p.texto}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
