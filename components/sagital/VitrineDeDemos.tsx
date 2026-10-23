import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { instrumentSerif, interTight } from "@/app/fontes";
import type { Demo } from "@/data/sagital";
import { classes } from "@/lib/classes";

/** Ano dos demos, ao lado da etiqueta de cada quadro. */
const ANO = 2026;

/** Onde o celular pousa em cada quadro, na ordem dos demos. */
const POSICOES_DO_CELULAR = [
  "right-[9%]",
  "right-[10%]",
  "right-[8%]",
  "left-[12%]",
];

const grotesca = "font-[family-name:var(--font-inter-tight)] font-extrabold";
const serifaItalica =
  "font-[family-name:var(--font-instrument-serif)] font-normal italic";

/**
 * A vitrine dos demos na página inicial (pedido do dono em 2026-10-23, a
 * partir de uma referência de portfólio): quadros com uma foto do próprio
 * demo e o celular mostrando a primeira tela real dele. Duas fileiras
 * desencontradas: grande e pequeno (o pequeno mais baixo), depois pequeno e
 * grande. A lista completa, com a prévia ao vivo, fica em /demos.
 */
export function VitrineDeDemos({ demos }: { demos: Demo[] }) {
  const fileiras = [demos.slice(0, 2), demos.slice(2, 4)];

  return (
    <section
      id="demos"
      data-revela-grupo
      aria-labelledby="demos-titulo"
      className={`${interTight.variable} ${instrumentSerif.variable} scroll-mt-20 pt-10 pb-14 sm:pt-14 sm:pb-24`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2
            id="demos-titulo"
            data-revela
            className="text-[clamp(3rem,9.5vw,6rem)] leading-[0.9]"
          >
            <span className={`${grotesca} tracking-[-0.045em] uppercase`}>
              Demos
            </span>{" "}
            <span className={`${serifaItalica} tracking-[-0.02em]`}>
              por ramo
            </span>
          </h2>
          <Link
            href="/demos"
            data-revela
            className="group inline-flex min-h-11 items-center gap-2 text-[0.75rem] font-bold tracking-[0.16em] text-[var(--sg-ceu)] uppercase sm:mb-2"
          >
            Ver todos os demos
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-y-10 sm:mt-14 sm:gap-y-14">
          {fileiras.map((fileira, f) => (
            <ul
              key={f}
              className={classes(
                "grid gap-x-5 gap-y-10 lg:gap-x-6",
                // A primeira fileira abre com o quadro grande; a segunda, com o pequeno.
                f === 0
                  ? "sm:grid-cols-[minmax(0,1.42fr)_minmax(0,1fr)]"
                  : "sm:grid-cols-[minmax(0,1fr)_minmax(0,1.42fr)]",
              )}
            >
              {fileira.map((demo, i) => {
                const indice = f * 2 + i;
                const grande = f === 0 ? i === 0 : i === 1;
                return (
                  <li
                    key={demo.nicho}
                    data-revela
                    // Na primeira fileira, o quadro pequeno desce um pouco.
                    className={classes(f === 0 && !grande && "sm:mt-[22%]")}
                  >
                    <QuadroDoDemo
                      demo={demo}
                      grande={grande}
                      posicao={POSICOES_DO_CELULAR[indice] ?? "right-[9%]"}
                    />
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuadroDoDemo({
  demo,
  grande,
  posicao,
}: {
  demo: Demo;
  grande: boolean;
  posicao: string;
}) {
  return (
    <Link
      href={`/${demo.nicho}`}
      aria-label={`Abrir o demo de ${demo.rotulo.toLowerCase()}: ${demo.padrao.nome}, ${demo.resumo}`}
      className="group block rounded-[20px]"
    >
      <div className="relative aspect-square overflow-hidden rounded-[20px] bg-white/5 sm:aspect-[4/3]">
        <Image
          src={demo.cenario.src}
          alt=""
          fill
          sizes={
            grande
              ? "(min-width: 1280px) 740px, (min-width: 640px) 58vw, 100vw"
              : "(min-width: 1280px) 520px, (min-width: 640px) 41vw, 100vw"
          }
          style={{ objectPosition: demo.cenario.foco }}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
        />
        <Celular demo={demo} posicao={posicao} />
      </div>

      <div className="mt-3.5 flex items-start justify-between gap-4">
        <p className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5 leading-tight">
          <span
            className={`${grotesca} text-[1.125rem] tracking-[-0.03em] text-white uppercase sm:text-[1.3125rem]`}
          >
            {demo.padrao.nome}
          </span>
          <span
            className={`${serifaItalica} text-[1.125rem] text-white/65 sm:text-[1.3125rem]`}
          >
            {demo.resumo}
          </span>
        </p>
        <span className="flex shrink-0 items-center gap-3 pt-0.5">
          <span className="rounded-full border border-white/35 px-2.5 py-1 text-[0.625rem] leading-none font-bold tracking-[0.14em] text-white/85 uppercase">
            {demo.rotulo}
          </span>
          <span className="text-[0.75rem] text-white/55 tabular-nums">
            {ANO}
          </span>
        </span>
      </div>
    </Link>
  );
}

/**
 * Celular com a primeira tela real do demo: corpo preto com cantos de
 * aparelho, a ilha no alto e sombra longa sobre a foto. Os cantos e o bisel
 * são proporcionais, então o aparelho é o mesmo em qualquer tamanho de quadro.
 * O bisel é um recuo da tela (inset), e não padding: padding em porcentagem
 * seria medido na largura do quadro. Com 3,2% de bisel dos lados (1,53% da
 * altura em cima e embaixo), a proporção 0,478 deixa a tela em 390:844, a
 * mesma da captura, sem cortar nada.
 */
function Celular({ demo, posicao }: { demo: Demo; posicao: string }) {
  return (
    <div
      aria-hidden
      className={classes(
        "absolute top-1/2 aspect-[0.478] h-[84%] -translate-y-1/2 rounded-[16%/7.6%] bg-[#0b0c0f]",
        "shadow-[0_32px_64px_-20px_rgb(2_8_23/0.65),0_0_0_1px_rgb(255_255_255/0.14)]",
        "transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-[calc(50%+8px)]",
        posicao,
      )}
    >
      <div className="absolute inset-x-[3.2%] inset-y-[1.53%] overflow-hidden rounded-[13%/6.1%] bg-white">
        <Image
          src={demo.captura.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 220px, 42vw"
          className="object-cover object-top"
        />
        <span className="absolute top-[1.6%] left-1/2 h-[3.1%] w-[30%] -translate-x-1/2 rounded-full bg-[#0b0c0f]" />
      </div>
    </div>
  );
}
