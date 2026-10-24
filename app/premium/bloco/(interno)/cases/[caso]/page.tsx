import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type CSSProperties, Suspense } from "react";
import {
  Auditoria,
  Caminho,
  Cinza,
  Colchetes,
  container,
} from "@/components/premium/bloco/Interno";
import { cases, casesPorDentro, nome, raiz } from "@/data/bloco";

// Só os quatro cases existem: qualquer outro endereço cai no notFound().
export function generateStaticParams() {
  return cases.map(({ id }) => ({ caso: id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/premium/bloco/cases/[caso]">): Promise<Metadata> {
  const { caso: id } = await params;
  const caso = cases.find((c) => c.id === id);
  if (!caso) return {};
  return {
    title: { absolute: `${caso.cliente}: ${caso.resultado} | ${nome}` },
    description: casesPorDentro[caso.id]?.desafio,
  };
}

/**
 * A página de um case: o resultado no título, a foto larga, as métricas,
 * o desafio, a estratégia em três blocos e a fala do cliente. O próximo
 * case fica no fim, antes da auditoria.
 */
export default function PaginaDoCase({
  params,
}: PageProps<"/premium/bloco/cases/[caso]">) {
  // O case vem do endereço: fica dentro do Suspense para a barra e o rodapé
  // aparecerem na hora da navegação.
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <ConteudoDoCase params={params} />
    </Suspense>
  );
}

async function ConteudoDoCase({
  params,
}: Pick<PageProps<"/premium/bloco/cases/[caso]">, "params">) {
  const { caso: id } = await params;
  const i = cases.findIndex((c) => c.id === id);
  const caso = cases[i];
  if (!caso) notFound();
  const dentro = casesPorDentro[caso.id]!;
  const proximo = cases[(i + 1) % cases.length]!;

  return (
    <>
      <header className={`${container} pt-28 pb-12 sm:pt-36 sm:pb-16`}>
        <Caminho
          itens={[
            { rotulo: "Cases", href: `${raiz}/cases` },
            { rotulo: caso.cliente },
          ]}
        />
        <h1
          className="bl-quadrada bl-entra mt-10 max-w-[18ch] text-[clamp(2.75rem,6.4vw,6rem)]"
          style={{ "--ordem": 1 } as CSSProperties}
        >
          <span className="text-[var(--cor-laranja-titulo)]">
            {caso.resultado}
          </span>{" "}
          {caso.titulo}
        </h1>
        <p
          className="bl-entra mt-6 text-[1.0625rem] text-[var(--cor-texto-suave)] sm:ml-[3.2em]"
          style={{ "--ordem": 2 } as CSSProperties}
        >
          {caso.cliente}, {caso.ramo.replace(/^(a|o) /, "")}. {dentro.duracao}{" "}
          de trabalho.
        </p>
        <ul
          className="bl-entra mt-6 flex flex-wrap gap-2 sm:ml-[3.2em]"
          style={{ "--ordem": 3 } as CSSProperties}
        >
          {caso.etiquetas.map((e) => (
            <li key={e} className="bl-etiqueta">
              {e}
            </li>
          ))}
        </ul>
      </header>

      <div className={container}>
        <figure
          className="bl-entra relative aspect-[4/3] overflow-hidden sm:aspect-[16/7]"
          style={{ "--ordem": 3 } as CSSProperties}
        >
          <Image
            src={caso.foto.src}
            alt={caso.foto.alt}
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1440px) 86rem, 100vw"
            className="object-cover"
          />
        </figure>

        <dl className="grid border-b border-[var(--cor-borda)] sm:grid-cols-3">
          {caso.metricas.map((m) => {
            const Seta = m.direcao === "sobe" ? ArrowUp : ArrowDown;
            return (
              <div
                key={m.rotulo}
                className="bl-revela flex items-center gap-4 border-t border-[var(--cor-borda)] py-8 sm:border-t-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0"
              >
                <Seta
                  aria-hidden
                  className="size-8 shrink-0 text-[var(--cor-grafite)]"
                  strokeWidth={1.25}
                />
                <div>
                  <dt className="bl-rotulo text-[var(--cor-grafite)]">
                    {m.rotulo}
                  </dt>
                  <dd className="bl-quadrada mt-1 text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--cor-laranja-titulo)]">
                    {m.valor}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>

      <section aria-labelledby="desafio" className="py-24 sm:py-32">
        <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-6`}>
          <div className="lg:col-span-4">
            <Colchetes
              id="desafio"
              linhas={["O", <Cinza key="c">desafio</Cinza>]}
              recuo="1.2em"
            />
          </div>
          <p className="bl-revela text-[clamp(1.375rem,1.1rem+1vw,2rem)] leading-[1.3] font-light tracking-[-0.02em] lg:col-span-7 lg:col-start-6">
            {dentro.desafio}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="estrategia"
        className="bg-[var(--cor-cinza-claro)] py-24 sm:py-32"
      >
        <div className={container}>
          <Colchetes
            id="estrategia"
            linhas={["O que a", <Cinza key="c">gente fez</Cinza>]}
            recuo="1.6em"
          />
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {dentro.estrategia.map((passo) => (
              <li
                key={passo.titulo}
                className="bl-revela bl-mira bl-mira-escura bg-white p-6 sm:p-8"
              >
                <h3 className="bl-quadrada text-[1.875rem]">{passo.titulo}</h3>
                <p className="mt-4 leading-relaxed text-[var(--cor-texto-suave)]">
                  {passo.texto}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="O que o cliente diz" className="py-24 sm:py-32">
        <figure className={`${container} grid gap-6 lg:grid-cols-12`}>
          <blockquote className="bl-revela text-[clamp(1.75rem,1.2rem+2.2vw,3.25rem)] leading-[1.12] font-light tracking-[-0.035em] text-balance lg:col-span-9 lg:col-start-2">
            <span aria-hidden className="text-[var(--cor-laranja-titulo)]">
              “
            </span>
            {dentro.depoimento.texto}
            <span aria-hidden className="text-[var(--cor-laranja-titulo)]">
              ”
            </span>
          </blockquote>
          <figcaption className="bl-rotulo text-[var(--cor-texto-suave)] lg:col-span-9 lg:col-start-2">
            {dentro.depoimento.autor}
          </figcaption>
        </figure>
      </section>

      <nav aria-label="Próximo case" className={`${container} pb-24`}>
        <Link
          href={`${raiz}/cases/${proximo.id}`}
          className="group flex flex-wrap items-end justify-between gap-6 border-y border-[var(--cor-borda)] py-10"
        >
          <span>
            <span className="bl-rotulo block text-[var(--cor-texto-suave)]">
              Próximo case
            </span>
            <span className="bl-quadrada mt-3 block text-[clamp(2rem,4vw,3.25rem)] transition-colors duration-200 group-hover:text-[var(--cor-laranja-titulo)]">
              {proximo.cliente}
            </span>
          </span>
          <span className="bl-seta">
            <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.5} />
          </span>
        </Link>
      </nav>

      <Auditoria />
    </>
  );
}
