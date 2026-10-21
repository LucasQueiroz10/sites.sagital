import Image from "next/image";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import type { Oferta } from "@/data/tipos";
import { classes } from "@/lib/classes";
import { formatarPreco } from "@/lib/formato";
import { EtiquetaDePreco } from "./EtiquetaDePreco";

type Props = { ofertas: Oferta[]; rotuloDoNicho: string };

/** Todas as ofertas, em grade de encarte, cada uma com o seu pedido pronto. */
export function GradeDeOfertas({ ofertas, rotuloDoNicho }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {ofertas.map((oferta, i) => {
        const preco = formatarPreco(oferta.precoNovo);
        return (
          <li
            key={oferta.produto}
            className="flex flex-col rounded-tema border border-borda bg-white p-3"
          >
            {oferta.imagem ? (
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={oferta.imagem.src}
                  alt={oferta.imagem.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="grid aspect-square place-items-center rounded-tema bg-encarte p-3 text-center">
                <p className="titulo-encarte text-[clamp(1.5rem,7vw,2.25rem)] leading-[0.9] font-black text-tinta uppercase italic">
                  {oferta.produto}
                </p>
              </div>
            )}
            <h3 className="mt-3 leading-tight font-bold">{oferta.produto}</h3>
            <p className="text-sm text-texto-suave">
              De <s>{formatarPreco(oferta.precoAntigo)}</s>
              <span className="sr-only"> (preço anterior)</span> por
            </p>
            <EtiquetaDePreco
              centavos={oferta.precoNovo}
              unidade={oferta.unidade}
              className={classes(
                "titulo-encarte mt-2 self-start font-black italic",
                i % 2 === 0 ? "-rotate-2" : "rotate-1",
              )}
            />
            <div className="mt-auto pt-4">
              <BotaoWhatsApp
                acao={{
                  rotulo: "Pedir",
                  pedido: `Quero pedir ${oferta.produto.toLowerCase()} (${oferta.unidade}) na oferta de ${preco}.`,
                }}
                rotuloDoNicho={rotuloDoNicho}
                variante="secundario"
                className="w-full"
                complementoAcessivel={oferta.produto}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
