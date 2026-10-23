"use client";

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";
import { cases } from "@/data/bloco";
import { classes } from "@/lib/classes";

/**
 * Os cases, um por vez. A foto do case novo entra como uma cortina, vindo do
 * lado da seta clicada, por cima da anterior; as métricas sobem em sequência.
 * A miniatura à esquerda é o próximo case e também avança.
 */
export function Cases({ titulo }: { titulo: ReactNode }) {
  const [atual, setAtual] = useState(0);
  const [anterior, setAnterior] = useState<number | null>(null);
  const [sentido, setSentido] = useState<1 | -1>(1);
  const total = cases.length;
  const caso = cases[atual]!;
  const proximo = cases[(atual + 1) % total]!;

  const ir = (passo: 1 | -1) => {
    setAnterior(atual);
    setSentido(passo);
    setAtual((i) => (i + passo + total) % total);
  };

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Cases"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") ir(1);
        if (e.key === "ArrowLeft") ir(-1);
      }}
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        {titulo}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => ir(-1)}
            className="bl-seta"
            aria-label="Case anterior"
          >
            <ArrowLeft aria-hidden className="size-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => ir(1)}
            className="bl-seta"
            aria-label="Próximo case"
          >
            <ArrowRight aria-hidden className="size-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        aria-roledescription="case"
        aria-label={`${atual + 1} de ${total}: ${caso.cliente}`}
        className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-3 lg:gap-y-4"
      >
        <h3
          key={`t${atual}`}
          className="bl-quadrada bl-troca text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.02] text-[var(--cor-tinta)] lg:col-span-2 lg:col-start-2"
        >
          <span className="text-[var(--cor-laranja-tinta)]">
            {caso.resultado}
          </span>{" "}
          {caso.titulo} para {caso.ramo}{" "}
          <span className="text-[var(--cor-laranja-tinta)]">
            “{caso.cliente}”
          </span>
        </h3>

        <div className="flex flex-col justify-between gap-6 lg:row-span-2 lg:row-start-1">
          <ul key={`e${atual}`} className="flex flex-wrap gap-2">
            {caso.etiquetas.map((e, i) => (
              <li
                key={e}
                className="bl-etiqueta bl-sobe"
                style={{ "--ordem": i } as CSSProperties}
              >
                {e}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => ir(1)}
            className="group relative hidden aspect-[4/3] w-full overflow-hidden lg:block"
            aria-label={`Ver o próximo case: ${proximo.cliente}`}
          >
            <Image
              src={proximo.foto.src}
              alt=""
              fill
              sizes="22vw"
              className="object-cover grayscale transition-[filter,scale] duration-500 ease-[var(--curva-saida)] group-hover:scale-105 group-hover:grayscale-0"
            />
            <span className="bl-quadrada absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgb(0_0_0/0.6))] px-3 pt-8 pb-2.5 text-left text-[1.125rem] text-white">
              Próximo: {proximo.cliente}
            </span>
          </button>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--cor-cinza-medio)] lg:col-start-2 lg:row-start-2">
          {anterior !== null && (
            <Image
              src={cases[anterior]!.foto.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          )}
          <Image
            key={atual}
            src={caso.foto.src}
            alt={caso.foto.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className={classes(
              "object-cover",
              anterior !== null &&
                (sentido === 1 ? "bl-cortina-direita" : "bl-cortina-esquerda"),
            )}
          />
        </div>

        <dl
          key={`m${atual}`}
          className="grid content-end lg:col-start-3 lg:row-start-2"
        >
          {caso.metricas.map((m, i) => {
            const Icone = m.direcao === "sobe" ? ArrowUp : ArrowDown;
            return (
              <div
                key={m.rotulo}
                className="bl-sobe flex items-center gap-3 border-b border-[var(--cor-borda)] py-4"
                style={{ "--ordem": i + 1 } as CSSProperties}
              >
                <Icone
                  aria-hidden
                  className="size-6 shrink-0 text-[var(--cor-grafite)]"
                  strokeWidth={1.5}
                />
                <dt className="bl-rotulo order-last self-end pb-1.5 text-[0.75rem] text-[var(--cor-texto-suave)]">
                  {m.rotulo}
                </dt>
                <dd className="bl-quadrada text-[clamp(2.25rem,3.4vw,3rem)] text-[var(--cor-laranja-titulo)] tabular-nums">
                  {m.valor}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
