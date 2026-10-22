import Image from "next/image";
import type { ReactNode } from "react";
import { Carrossel } from "@/components/ui/Carrossel";
import type { Modalidade } from "@/data/tipos";
import type { Aula } from "@/lib/agenda";

type Props = { modalidades: Modalidade[]; grade: Aula[]; cabecalho: ReactNode };

/** Estrutura e modalidades numa faixa de fotos: desliza como a vitrine da recepção. */
export function Modalidades({ modalidades, grade, cabecalho }: Props) {
  return (
    <Carrossel
      rotulo="Estrutura e modalidades"
      cabecalho={cabecalho}
      classeDasSetas="rounded-tema border border-borda bg-superficie text-texto"
    >
      {modalidades.map((modalidade) => {
        const aulasNaSemana = modalidade.naGrade
          ? grade.filter((aula) =>
              modalidade.naGrade?.includes(aula.modalidade),
            ).length
          : 0;
        return (
          <li
            key={modalidade.nome}
            className="w-[82%] max-w-[24rem] shrink-0 snap-start sm:w-[24rem] lg:w-[calc((100%-2rem)/3)] lg:max-w-none"
          >
            <figure className="grid gap-5">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={modalidade.imagem.src}
                  alt={modalidade.imagem.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 24rem, 82vw"
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
              <figcaption>
                <h3 className="text-3xl">{modalidade.nome}</h3>
                <p className="mt-3 max-w-[48ch] text-texto-suave">
                  {modalidade.descricao}
                </p>
                <p className="mt-4 font-semibold text-destaque">
                  {aulasNaSemana > 0
                    ? `${aulasNaSemana} aulas por semana`
                    : modalidade.rodape}
                </p>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </Carrossel>
  );
}
