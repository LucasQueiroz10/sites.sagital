"use client";

import { ArrowUpRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { AreaDeAtuacao } from "@/data/portfolio/advocacia";
import { classes } from "@/lib/classes";
import { linkDoPortfolio } from "@/lib/whatsapp";

type Props = { areas: AreaDeAtuacao[]; nomeDoSite: string };

/**
 * As áreas do escritório. No celular, um acordeão; no desktop, a lista à
 * esquerda e o detalhe da área aberta à direita, com a foto.
 */
export function AreasDeAtuacao({ areas, nomeDoSite }: Props) {
  const [ativa, setAtiva] = useState(areas[0]?.id);
  const area = areas.find((a) => a.id === ativa) ?? areas[0];
  if (!area) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
      <ul className="border-t border-borda">
        {areas.map((item) => {
          const aberta = item.id === area.id;
          return (
            <li key={item.id} className="border-b border-borda">
              <h3>
                <button
                  type="button"
                  aria-expanded={aberta}
                  aria-controls={`area-${item.id} painel-da-area`}
                  onClick={() => setAtiva(item.id)}
                  className="group flex w-full items-center justify-between gap-6 py-5 text-left lg:py-6"
                >
                  <span
                    className={classes(
                      "font-titulo text-[1.75rem] leading-tight transition-colors sm:text-[2.125rem]",
                      aberta
                        ? "text-texto"
                        : "text-texto-suave group-hover:text-texto",
                    )}
                  >
                    {item.nome}
                  </span>
                  <span
                    aria-hidden
                    className={classes(
                      "grid size-10 shrink-0 place-items-center rounded-full border transition-colors",
                      aberta
                        ? "border-primaria bg-primaria text-primaria-texto"
                        : "border-borda text-texto-suave group-hover:border-texto group-hover:text-texto",
                    )}
                  >
                    {aberta ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </span>
                </button>
              </h3>
              {/* No celular, o detalhe abre logo abaixo da área. */}
              <div
                id={`area-${item.id}`}
                hidden={!aberta}
                className="pb-8 lg:hidden"
              >
                <Detalhe area={item} nomeDoSite={nomeDoSite} />
              </div>
            </li>
          );
        })}
      </ul>

      <div id="painel-da-area" className="hidden lg:block">
        <div key={area.id} className="area-entra">
          <div className="relative aspect-[16/10] overflow-hidden rounded-tema bg-superficie">
            <Image
              src={area.imagem.src}
              alt={area.imagem.alt}
              fill
              sizes="(min-width: 1280px) 640px, 50vw"
              className="object-cover"
              placeholder="blur"
            />
          </div>
          <div className="mt-8">
            <Detalhe area={area} nomeDoSite={nomeDoSite} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Detalhe({
  area,
  nomeDoSite,
}: {
  area: AreaDeAtuacao;
  nomeDoSite: string;
}) {
  return (
    <>
      <p className="max-w-[48ch] text-lg leading-relaxed text-texto-suave">
        {area.resumo}
      </p>
      <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
        {area.itens.map((item) => (
          <li
            key={item}
            className="flex gap-3 border-t border-borda py-3 text-[0.9375rem]"
          >
            <span
              aria-hidden
              className="mt-[0.6em] h-px w-3 shrink-0 bg-destaque"
            />
            {item}
          </li>
        ))}
      </ul>
      <a
        href={linkDoPortfolio(
          `Gostaria de agendar uma conversa sobre um caso de ${area.nome.toLowerCase()}.`,
          nomeDoSite,
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-11 items-center gap-2 font-medium text-destaque underline decoration-borda decoration-1 underline-offset-[6px] transition-colors hover:decoration-destaque"
      >
        Conversar sobre {area.nome.toLowerCase()}
        <ArrowUpRight aria-hidden className="size-4" />
        <span className="sr-only"> (abre o WhatsApp)</span>
      </a>
    </>
  );
}
