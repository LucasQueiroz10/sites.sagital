import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import type { AcaoWhatsApp, Imagem } from "@/data/tipos";

type Props = {
  titulo: string;
  chamada: string;
  imagem: Imagem;
  acao: AcaoWhatsApp;
  rotuloDoNicho: string;
  /** Âncora da primeira vitrine, para o botão "Ver as peças". */
  primeiraVitrine: `#${string}`;
};

/**
 * A campanha da estação: foto grande com cantos de 16px e, por cima, a
 * etiqueta de vidro escuro com o título e as duas ações.
 */
export function BannerDeCampanha({
  titulo,
  chamada,
  imagem,
  acao,
  rotuloDoNicho,
  primeiraVitrine,
}: Props) {
  return (
    <section
      aria-labelledby="titulo-principal"
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:pt-4"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-superficie sm:aspect-[4/3] lg:aspect-[16/7]">
        <Image
          src={imagem.src}
          alt={imagem.alt}
          fill
          preload
          sizes="(min-width: 1280px) 1232px, 100vw"
          className="foto-que-assenta object-cover object-[50%_12%] lg:object-[50%_30%]"
          placeholder="blur"
        />
        <div className="vidro absolute inset-x-2 bottom-2 rounded-xl p-4 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[27rem] sm:p-7">
          <h1
            id="titulo-principal"
            className="text-[1.75rem] leading-[1.08] font-semibold text-balance sm:text-[2.5rem]"
          >
            {titulo}
          </h1>
          <p className="mt-2 text-[0.9375rem] leading-snug sm:mt-3 sm:text-lg">
            {chamada}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 sm:mt-5 sm:gap-2">
            <div data-cta-principal>
              <BotaoWhatsApp
                acao={acao}
                rotuloDoNicho={rotuloDoNicho}
                variante="claro"
                className="px-4! text-[0.9375rem]! sm:px-5! sm:text-base!"
              />
            </div>
            <a
              href={primeiraVitrine}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 font-semibold underline decoration-white/50 underline-offset-4 transition-colors duration-150 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 sm:border sm:border-white/70 sm:px-5 sm:no-underline"
            >
              Ver peças
              <ArrowDown aria-hidden className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
