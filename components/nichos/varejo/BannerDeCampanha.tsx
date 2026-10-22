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
        {/* No celular e no tablet, a etiqueta é uma faixa encostada na base da
            foto; no desktop, flutua no canto, à esquerda do casal. */}
        <div className="vidro absolute inset-x-0 bottom-0 px-4 pt-3.5 pb-4 sm:px-6 sm:py-5 lg:inset-x-auto lg:bottom-6 lg:left-6 lg:max-w-[27rem] lg:rounded-xl lg:p-8">
          <h1
            id="titulo-principal"
            className="text-[1.625rem] leading-[1.08] font-semibold text-balance sm:text-[2.25rem] lg:text-[3rem] lg:leading-[1.04]"
          >
            {titulo}
          </h1>
          <p className="numero mt-1 text-[0.9375rem] leading-snug sm:mt-1.5 sm:text-lg lg:mt-3">
            {chamada}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 sm:mt-4 lg:mt-6">
            <div data-cta-principal>
              <BotaoWhatsApp
                acao={acao}
                rotuloDoNicho={rotuloDoNicho}
                variante="claro"
                className="px-3.5! text-[0.9375rem]! sm:px-5! sm:text-base!"
              />
            </div>
            <a
              href={primeiraVitrine}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/70 px-3.5 text-[0.9375rem] font-semibold transition-colors duration-150 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-5 sm:text-base"
            >
              Ver peças
              <ArrowDown aria-hidden className="hidden size-4 sm:block" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
