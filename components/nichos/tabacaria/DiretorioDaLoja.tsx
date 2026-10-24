import Image from "next/image";
import type { DadosDaTabacaria } from "@/data/tipos";

type Props = Pick<DadosDaTabacaria, "categorias" | "imagensDaLoja">;

/**
 * As categorias da loja como o quadro de diretório de um saguão: nomes
 * gravados e uma linha sobre cada uma. Sem preços nem ofertas. As linhas
 * entram uma a uma e as duas fotos abrem como cortina.
 */
export function DiretorioDaLoja({ categorias, imagensDaLoja }: Props) {
  const [principal, detalhe] = imagensDaLoja;
  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
      <ul
        data-revela-grupo
        className="moldura grid content-start self-start px-5 py-6 sm:px-8 sm:py-8"
      >
        {categorias.map((categoria, i) => (
          <li
            key={categoria.nome}
            data-revela
            className={i > 0 ? "border-t border-borda py-5" : "pb-5"}
          >
            <h3 className="text-2xl">{categoria.nome}</h3>
            <p className="mt-1 text-texto-suave">{categoria.descricao}</p>
          </li>
        ))}
      </ul>

      <div className="relative grid grid-cols-2 content-start gap-3 md:grid-cols-1 md:gap-4">
        {principal && (
          <div
            data-revela="foto"
            className="relative aspect-[3/4] overflow-hidden"
          >
            <Image
              src={principal.src}
              alt={principal.alt}
              fill
              sizes="(min-width: 768px) 40vw, 48vw"
              className="object-cover"
              placeholder="blur"
            />
          </div>
        )}
        {detalhe && (
          <div
            data-revela="foto"
            className="moldura relative aspect-[3/4] overflow-hidden md:-mt-28 md:-ml-10 md:aspect-[4/3] md:w-3/4"
          >
            <Image
              src={detalhe.src}
              alt={detalhe.alt}
              fill
              sizes="(min-width: 768px) 30vw, 48vw"
              className="object-cover"
              placeholder="blur"
            />
          </div>
        )}
      </div>
    </div>
  );
}
