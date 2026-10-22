import Image from "next/image";
import { TituloDaSecao } from "@/components/ui/Secao";
import { Carrossel } from "@/components/ui/Carrossel";
import type { DadosDoVarejo, Setor } from "@/data/tipos";
import { formatarPreco } from "@/lib/formato";
import { CartaoDePeca } from "./CartaoDePeca";

type Props = {
  setor: Setor;
  parcelamento: DadosDoVarejo["parcelamento"];
  rotuloDoNicho: string;
};

// A mesma largura para o banner e as peças: no celular, uma peça e meia à
// vista; no desktop, quatro.
const largura = "w-[68%] sm:w-[17rem] lg:w-[calc((100%-3rem)/4)]";

/**
 * A prateleira de um setor (Feminino, Masculino): o título, a foto de
 * abertura com a etiqueta de vidro e as peças, numa trilha horizontal.
 */
export function Vitrine({ setor, parcelamento, rotuloDoNicho }: Props) {
  const aPartirDe = Math.min(...setor.pecas.map((peca) => peca.preco));

  return (
    <Carrossel
      rotulo={`Vitrine do ${setor.nome}`}
      cabecalho={
        <>
          <TituloDaSecao id={setor.id}>{setor.nome}</TituloDaSecao>
          <p className="mt-2 max-w-[48ch] text-texto-suave">{setor.chamada}</p>
        </>
      }
      className="gap-3 sm:gap-4"
      classeDasSetas="rounded-full border border-[var(--cor-fio)] bg-fundo text-texto hover:border-texto"
      classeDoPonto={{ atual: "bg-texto", outros: "bg-[var(--cor-fio)]" }}
    >
      <li
        className={`relative min-h-[28rem] shrink-0 snap-start overflow-hidden rounded-2xl bg-superficie ${largura}`}
      >
        <Image
          src={setor.banner.src}
          alt={setor.banner.alt}
          fill
          sizes="(min-width: 1280px) 296px, (min-width: 1024px) 23vw, (min-width: 640px) 17rem, 68vw"
          style={{ objectPosition: setor.banner.foco }}
          className="object-cover"
          placeholder="blur"
        />
        <div className="vidro absolute inset-x-3 bottom-3 rounded-xl px-4 py-3.5">
          <p className="text-lg leading-tight font-semibold">
            {setor.banner.titulo}
          </p>
          <p className="numero mt-0.5 text-sm">
            A partir de {formatarPreco(aPartirDe)}
          </p>
        </div>
      </li>
      {setor.pecas.map((peca) => (
        <CartaoDePeca
          key={peca.nome}
          peca={peca}
          parcelamento={parcelamento}
          rotuloDoNicho={rotuloDoNicho}
          className={largura}
        />
      ))}
    </Carrossel>
  );
}
