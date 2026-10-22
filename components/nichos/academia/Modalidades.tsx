"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useTema } from "@/components/TemaDoNicho";
import { Carrossel } from "@/components/ui/Carrossel";
import type { Modalidade } from "@/data/tipos";
import type { Aula } from "@/lib/agenda";
import { mensagemDoDemo, montarLinkWhatsApp } from "@/lib/whatsapp";

type Props = {
  modalidades: Modalidade[];
  grade: Aula[];
  rotuloDoNicho: string;
  cabecalho: ReactNode;
};

/**
 * Modalidades em fotos claras, com quantas aulas cada uma tem na semana e o
 * agendamento da experimental daquela modalidade.
 */
export function Modalidades({
  modalidades,
  grade,
  rotuloDoNicho,
  cabecalho,
}: Props) {
  const { nome } = useTema();

  return (
    <Carrossel
      rotulo="Modalidades"
      cabecalho={cabecalho}
      classeDasSetas="rounded-full bg-superficie text-texto"
    >
      {modalidades.map((modalidade) => {
        const aulasNaSemana = modalidade.naGrade
          ? grade.filter((aula) =>
              modalidade.naGrade?.includes(aula.modalidade),
            ).length
          : 0;
        const pedido = `Quero agendar uma aula experimental de ${modalidade.nome.toLowerCase()}.`;
        return (
          <li
            key={modalidade.nome}
            className="w-[82%] max-w-[24rem] shrink-0 snap-start sm:w-[24rem] lg:w-[calc((100%-3rem)/4)] lg:max-w-none"
          >
            <figure className="group flex h-full flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-superficie">
                <Image
                  src={modalidade.imagem.src}
                  alt={modalidade.imagem.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 24rem, 82vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  placeholder="blur"
                />
              </div>
              <figcaption className="flex flex-1 flex-col pt-5">
                <h3 className="text-[1.75rem]">{modalidade.nome}</h3>
                <p className="mt-1 text-sm font-semibold text-texto">
                  {aulasNaSemana > 0
                    ? `${aulasNaSemana} aulas por semana`
                    : modalidade.rodape}
                </p>
                <p className="mt-3 text-texto-suave">{modalidade.descricao}</p>
                <a
                  href={montarLinkWhatsApp(
                    mensagemDoDemo(pedido, nome, rotuloDoNicho),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-11 items-center gap-1 self-start pt-3 font-semibold text-texto underline decoration-borda decoration-2 underline-offset-4 transition-colors hover:decoration-destaque focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque"
                >
                  Agendar uma experimental
                  <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only">
                    {" "}
                    de {modalidade.nome} (abre o WhatsApp)
                  </span>
                </a>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </Carrossel>
  );
}
