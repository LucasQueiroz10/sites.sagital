import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { CabecaDaPagina, container } from "@/components/premium/redoma/Interno";
import { nomeNoTexto, raiz, setores } from "@/data/redoma";

export const metadata: Metadata = {
  title: { absolute: `Soluções | ${nomeNoTexto}` },
  description:
    "Proteção de dados para clínicas, escritórios, lojas virtuais e contabilidades: o que cada ramo guarda e como a Redoma protege.",
};

/**
 * Os ramos em linhas largas: no passar do mouse, a linha vira branca e o
 * texto preto, como a pílula da página atual na barra.
 */
export default function PaginaDasSolucoes() {
  return (
    <>
      <RevelarAoRolar raiz="redoma" />
      <CabecaDaPagina
        caminho={[{ rotulo: "soluções" }]}
        titulo="cada ramo guarda um segredo"
        texto="O que vaza de uma clínica é diferente do que vaza de uma loja. Escolha o seu ramo e veja o risco, o que a lei pede e como a Redoma cuida."
      />

      <section aria-label="Ramos" className={`${container} pb-24 sm:pb-32`}>
        <ul data-revela-grupo className="border-b border-white/10">
          {setores.map((s) => (
            <li key={s.id} data-revela className="border-t border-white/10">
              <Link
                href={`${raiz}/solucoes/${s.id}`}
                className="group -mx-6 grid gap-x-10 gap-y-3 rounded-[1.75rem] px-6 py-10 transition-colors duration-300 ease-out hover:bg-white hover:text-black md:-mx-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:items-center md:px-8 md:py-12"
              >
                <span className="text-[clamp(2.75rem,1.6rem+4.4vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.05em]">
                  {s.rotulo}
                </span>
                <span className="text-[1.125rem] leading-snug text-white/70 transition-colors duration-300 group-hover:text-black/70">
                  {s.titulo}
                </span>
                <span className="grid size-14 place-items-center rounded-full bg-neutral-900 transition-colors duration-300 group-hover:bg-black group-hover:text-white">
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
