import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Auditoria,
  CabecaDaPagina,
  container,
} from "@/components/premium/bloco/Interno";
import { cases, nome, raiz } from "@/data/bloco";
import { classes } from "@/lib/classes";

export const metadata: Metadata = {
  title: { absolute: `Cases | ${nome}` },
  description:
    "Os cases da Bloco: loja de roupas, restaurantes e rede de academias, com o desafio, a estratégia e os números de cada um.",
};

/**
 * Os cases em grade: a foto, o resultado em laranja
 * e o título. O primeiro e o último ocupam a largura inteira, e os do meio
 * vêm em par: a grade fecha sem buraco.
 */
export default function PaginaDosCases() {
  return (
    <>
      <CabecaDaPagina
        caminho={[{ rotulo: "Cases" }]}
        linhas={["Cases que", "falam por si"]}
        texto="Quatro negócios, quatro desafios diferentes. Em cada um, o que estava travando, o que a gente fez e o que mudou no caixa."
      />

      <section aria-label="Cases" className={`${container} pb-24 sm:pb-32`}>
        <ul className="grid gap-4 md:grid-cols-2">
          {cases.map((c, i) => {
            const largo = i === 0 || i === cases.length - 1;
            return (
              <li
                key={c.id}
                className={classes("bl-revela", largo && "md:col-span-2")}
              >
                <Link
                  href={`${raiz}/cases/${c.id}`}
                  className="group grid h-full bg-[var(--cor-cinza-claro)] md:grid-cols-12"
                >
                  <div
                    className={classes(
                      "relative overflow-hidden",
                      largo
                        ? "aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[26rem]"
                        : "aspect-[4/3] md:col-span-12",
                    )}
                  >
                    <Image
                      src={c.foto.src}
                      alt={c.foto.alt}
                      fill
                      placeholder="blur"
                      sizes={
                        largo
                          ? "(min-width: 768px) 55vw, 100vw"
                          : "(min-width: 768px) 45vw, 100vw"
                      }
                      className="object-cover transition-transform duration-700 ease-[var(--curva-saida)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div
                    className={classes(
                      "flex flex-col p-6 sm:p-8",
                      largo ? "md:col-span-5 md:justify-end" : "md:col-span-12",
                    )}
                  >
                    <p className="bl-rotulo text-[var(--cor-texto-suave)]">
                      {c.cliente}
                    </p>
                    <h2 className="bl-quadrada mt-4 text-[clamp(2rem,3.4vw,3rem)]">
                      <span className="text-[var(--cor-laranja-titulo)]">
                        {c.resultado}
                      </span>{" "}
                      {c.titulo}
                    </h2>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {c.etiquetas.map((e) => (
                        <li key={e} className="bl-etiqueta">
                          {e}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-[var(--cor-laranja-tinta)]">
                      Ler o case
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-200 ease-[var(--curva-saida)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <Auditoria />
    </>
  );
}
