import Image from "next/image";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { Container } from "@/components/ui/Container";
import type { AcaoWhatsApp, Oferta } from "@/data/tipos";
import { classes } from "@/lib/classes";
import { EtiquetaDePreco } from "./EtiquetaDePreco";
import { SeloDeOferta } from "./SeloDeOferta";
import { ValidadeDaSemana } from "./ValidadeDaSemana";

type Props = {
  chamada: string;
  destaques: Oferta[];
  acao: AcaoWhatsApp;
  rotuloDoNicho: string;
};

/** A capa do encarte: o título da semana, a validade e as três ofertas da vez. */
export function CapaDoEncarte({
  chamada,
  destaques,
  acao,
  rotuloDoNicho,
}: Props) {
  return (
    <section
      aria-labelledby="titulo-principal"
      className="bg-encarte text-tinta"
    >
      <Container
        largura="larga"
        className="grid gap-10 py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-12 md:py-16"
      >
        <div>
          <h1
            id="titulo-principal"
            className="titulo-encarte text-[clamp(4rem,19vw,8.5rem)] leading-[0.82] font-black uppercase italic md:text-[clamp(4.5rem,7.6vw,7.25rem)]"
          >
            Ofertas
            <br />
            da semana
          </h1>
          <ValidadeDaSemana className="mt-5 inline-block bg-tinta px-3 py-1.5 text-sm font-bold text-encarte" />
          <p className="mt-6 max-w-[40ch] text-lg font-medium">{chamada}</p>
          <div className="mt-7">
            <BotaoWhatsApp
              acao={acao}
              rotuloDoNicho={rotuloDoNicho}
              tamanho="grande"
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
          {destaques.map((oferta, i) => (
            <li
              key={oferta.produto}
              className={classes(
                "relative flex flex-col rounded-tema bg-white p-3 shadow-[0_6px_16px_-8px_rgb(20_20_20/0.45)]",
                i === 0 && "col-span-2",
              )}
            >
              {i === 0 && (
                <SeloDeOferta className="absolute -top-4 -left-3 z-10 sm:-left-5" />
              )}
              {oferta.imagem && (
                <div
                  className={classes(
                    "relative overflow-hidden",
                    i === 0 ? "aspect-[16/10]" : "aspect-square",
                  )}
                >
                  <Image
                    src={oferta.imagem.src}
                    alt={oferta.imagem.alt}
                    fill
                    preload={i === 0}
                    sizes={
                      i === 0
                        ? "(min-width: 768px) 50vw, 100vw"
                        : "(min-width: 768px) 25vw, 50vw"
                    }
                    className="object-cover"
                  />
                </div>
              )}
              <div
                className={classes(
                  "mt-2 flex flex-1 gap-2",
                  i === 0
                    ? "items-end justify-between"
                    : "flex-col items-start justify-end",
                )}
              >
                <p
                  className={classes(
                    "leading-tight font-bold",
                    i === 0 ? "text-2xl" : "text-base",
                  )}
                >
                  {oferta.produto}
                </p>
                <EtiquetaDePreco
                  centavos={oferta.precoNovo}
                  unidade={oferta.unidade}
                  tamanho={i === 0 ? "grande" : "normal"}
                  className={classes(
                    "titulo-encarte shrink-0 font-black italic",
                    i === 0 ? "-mr-1 -rotate-3" : "-ml-0.5 rotate-2",
                  )}
                />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
