import Image from "next/image";
import type { Modalidade } from "@/data/tipos";
import type { Aula } from "@/lib/agenda";

type Props = { modalidades: Modalidade[]; grade: Aula[] };

export function Modalidades({ modalidades, grade }: Props) {
  return (
    <ul className="grid gap-x-6 gap-y-12 md:grid-cols-3">
      {modalidades.map((modalidade, i) => {
        const aulasNaSemana = modalidade.naGrade
          ? grade.filter((aula) =>
              modalidade.naGrade?.includes(aula.modalidade),
            ).length
          : 0;
        return (
          <li
            key={modalidade.nome}
            className={i === 0 ? "md:col-span-3" : undefined}
          >
            <figure
              className={
                i === 0
                  ? "grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end"
                  : "grid gap-5"
              }
            >
              <div
                className={
                  i === 0
                    ? "relative -mx-4 aspect-[16/10] overflow-hidden sm:mx-0"
                    : "relative -mx-4 aspect-[4/3] overflow-hidden sm:mx-0"
                }
              >
                <Image
                  src={modalidade.imagem.src}
                  alt={modalidade.imagem.alt}
                  fill
                  sizes={
                    i === 0
                      ? "(min-width: 768px) 60vw, 100vw"
                      : "(min-width: 768px) 33vw, 100vw"
                  }
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
    </ul>
  );
}
