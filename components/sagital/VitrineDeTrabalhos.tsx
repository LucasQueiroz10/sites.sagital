import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { instrumentSerif, interTight } from "@/app/fontes";
import type { SiteDoPortfolio } from "@/data/portfolio";
import { TrilhoNoCelular } from "./TrilhoNoCelular";

/** Ano dos trabalhos, ao lado do número de cada cartão. */
const ANO = 2026;

const grotesca = "font-[family-name:var(--font-inter-tight)] font-extrabold";
const serifaItalica =
  "font-[family-name:var(--font-instrument-serif)] font-normal italic";

/**
 * A vitrine dos trabalhos na página inicial: um cartão grande por site, na
 * cor da marca de cada cliente. No desktop os cartões grudam no topo um
 * pouco abaixo do anterior, e o seguinte sobe por cima dele, como uma pilha
 * de pastas: ao fim, as bordas de todos ficam à vista. No tablet eles só vêm
 * um depois do outro; no celular, num trilho com seta. A lista completa,
 * com a prévia ao vivo, fica em /trabalhos.
 */
export function VitrineDeTrabalhos({ sites }: { sites: SiteDoPortfolio[] }) {
  return (
    <section
      id="trabalhos"
      data-revela-grupo
      aria-labelledby="trabalhos-titulo"
      className={`${interTight.variable} ${instrumentSerif.variable} scroll-mt-20 pt-10 pb-14 sm:pt-14 sm:pb-24`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2
            id="trabalhos-titulo"
            data-revela
            className="text-[clamp(3rem,9.5vw,6rem)] leading-[0.9]"
          >
            <span className={`${grotesca} tracking-[-0.045em] uppercase`}>
              Trabalhos
            </span>{" "}
            <span className={`${serifaItalica} tracking-[-0.02em]`}>
              selecionados
            </span>
          </h2>
          <Link
            href="/trabalhos"
            data-revela
            className="group inline-flex min-h-11 items-center gap-2 text-[0.75rem] font-bold tracking-[0.16em] text-[var(--sg-ceu)] uppercase sm:mb-2"
          >
            Ver todos os trabalhos
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </div>

        <div className="mt-10 sm:mt-14">
          <TrilhoNoCelular
            rotulo="Trabalhos"
            className="sm:grid sm:gap-5 lg:gap-8"
          >
            {sites.map((site, i) => (
              <li
                key={site.id}
                data-revela
                className="flex lg:sticky lg:top-[calc(5rem+var(--degrau)*1.5rem)]"
                style={{ "--degrau": i } as CSSProperties}
              >
                <CartaoDoTrabalho
                  site={site}
                  numero={i + 1}
                  total={sites.length}
                />
              </li>
            ))}
          </TrilhoNoCelular>
        </div>
      </div>
    </section>
  );
}

function CartaoDoTrabalho({
  site,
  numero,
  total,
}: {
  site: SiteDoPortfolio;
  numero: number;
  total: number;
}) {
  const dois = (n: number) => String(n).padStart(2, "0");
  return (
    <article
      aria-labelledby={`trabalho-${site.id}`}
      className="group relative grid w-full overflow-hidden rounded-[28px] text-white shadow-[0_-18px_50px_-12px_rgb(2_8_23/0.55)] lg:h-[min(34rem,calc(100vh-11rem))] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      style={{ backgroundColor: site.cor }}
    >
      <div className="relative z-10 flex flex-col gap-6 p-6 sm:p-8 lg:justify-between lg:p-10">
        <p className="flex items-center justify-between gap-4 text-[0.75rem] text-white/70 tabular-nums">
          <span className="font-bold tracking-[0.16em]">
            {dois(numero)} / {dois(total)}
          </span>
          <span>{ANO}</span>
        </p>

        <div>
          <h3
            id={`trabalho-${site.id}`}
            className={`${grotesca} text-[clamp(2rem,4.6vw,3.25rem)] leading-[0.92] tracking-[-0.04em] text-white uppercase`}
          >
            {/* O link cobre o cartão inteiro: um alvo grande e um só destino. */}
            <Link
              href={site.href}
              className="rounded-sm after:absolute after:inset-0 after:z-20 after:rounded-[28px]"
            >
              {site.nome}
            </Link>
          </h3>
          <p
            className={`${serifaItalica} mt-2 text-[1.375rem] leading-tight text-white/75 sm:text-[1.625rem]`}
          >
            {site.ramo.toLowerCase()}
          </p>
          <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-white/85 sm:text-base">
            {site.destaque}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="flex items-center gap-3 text-[0.8125rem] text-white/70">
            <span aria-hidden className="flex">
              {site.paleta.map((cor) => (
                <span
                  key={cor}
                  className="-ml-1.5 size-4 rounded-full shadow-[0_0_0_1.5px_rgb(255_255_255/0.5)] first:ml-0"
                  style={{ backgroundColor: cor }}
                />
              ))}
            </span>
            {site.fonte}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-bold tracking-[0.16em] uppercase">
            Ver o site
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </span>
        </div>
      </div>

      <Palco site={site} />
    </article>
  );
}

/**
 * O site nos dois aparelhos: a janela do navegador sai pela borda direita do
 * cartão, cortada como se a tela continuasse, e o celular pousa na frente,
 * no canto de baixo. Os dois sobem um pouco quando o cartão é apontado.
 */
function Palco({ site }: { site: SiteDoPortfolio }) {
  return (
    <div
      aria-hidden
      className="relative aspect-[5/4] overflow-hidden sm:aspect-[16/10] lg:aspect-auto"
    >
      {/* Brilho atrás dos aparelhos, para a janela não sumir no fundo escuro. */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_40%,rgb(255_255_255/0.16),transparent_70%)]" />

      <div className="absolute top-[12%] left-[14%] w-[112%] overflow-hidden rounded-t-[14px] rounded-bl-[14px] bg-white shadow-[0_30px_60px_-20px_rgb(2_8_23/0.6),0_0_0_1px_rgb(255_255_255/0.12)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-2 lg:top-[14%] lg:left-[10%]">
        <div className="flex items-center gap-3 border-b border-black/5 bg-[#f1f3f6] px-3.5 py-2.5">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="max-w-[60%] truncate rounded-md bg-white px-3 py-1 text-[0.6875rem] text-[#5b6478]">
            {site.nome}
          </span>
        </div>
        <div className="relative aspect-[1440/900]">
          <Image
            src={site.capturaDesktop.src}
            alt=""
            fill
            sizes="(min-width: 1280px) 760px, (min-width: 1024px) 62vw, 110vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="absolute bottom-[-18%] left-[4%] aspect-[0.478] h-[78%] rounded-[16%/7.6%] bg-[#0b0c0f] shadow-[0_32px_64px_-20px_rgb(2_8_23/0.7),0_0_0_1px_rgb(255_255_255/0.16)] transition-transform delay-75 duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-4 lg:bottom-[-12%] lg:left-[2%] lg:h-[72%]">
        <div className="absolute inset-x-[3.2%] inset-y-[1.53%] overflow-hidden rounded-[13%/6.1%] bg-white">
          <Image
            src={site.captura.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 200px, 34vw"
            className="object-cover object-top"
          />
          <span className="absolute top-[1.6%] left-1/2 h-[3.1%] w-[30%] -translate-x-1/2 rounded-full bg-[#0b0c0f]" />
        </div>
      </div>
    </div>
  );
}
