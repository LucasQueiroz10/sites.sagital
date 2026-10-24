import { ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import {
  Cabeca,
  CabecaDaPagina,
  container,
  VerMais,
} from "@/components/premium/redoma/Interno";
import {
  camadas,
  nomeNoTexto,
  planos,
  raiz,
  setores,
  setoresPorDentro,
} from "@/data/redoma";
import { orcar, PRECOS } from "@/lib/assinatura";

// Só os quatro ramos existem: qualquer outro endereço cai no notFound().
export function generateStaticParams() {
  return setores.map(({ id }) => ({ setor: id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/premium/redoma/solucoes/[setor]">): Promise<Metadata> {
  const { setor: id } = await params;
  const setor = setores.find((s) => s.id === id);
  if (!setor) return {};
  return {
    title: { absolute: `Redoma para ${setor.rotulo} | ${nomeNoTexto}` },
    description: setoresPorDentro[setor.id].apresentacao,
  };
}

const reais = (n: number) =>
  n.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

/**
 * A página de um ramo: o risco e o que a lei pede, as camadas que mais
 * pesam, um cliente contando o que aconteceu e quanto custa para uma equipe
 * do tamanho típico do ramo.
 */
export default function PaginaDoSetor({
  params,
}: PageProps<"/premium/redoma/solucoes/[setor]">) {
  // O ramo vem do endereço: fica dentro do Suspense para a barra e o rodapé
  // aparecerem na hora da navegação.
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <ConteudoDoSetor params={params} />
    </Suspense>
  );
}

async function ConteudoDoSetor({
  params,
}: Pick<PageProps<"/premium/redoma/solucoes/[setor]">, "params">) {
  const { setor: id } = await params;
  const setor = setores.find((s) => s.id === id);
  if (!setor) notFound();

  const dentro = setoresPorDentro[setor.id];
  const plano = planos.find((p) => p.id === dentro.plano)!;
  const orcamento = orcar(dentro.plano, dentro.pessoas, "anual");
  const outros = setores.filter((s) => s.id !== setor.id);

  return (
    <>
      <RevelarAoRolar raiz="redoma" />
      <CabecaDaPagina
        caminho={[
          { rotulo: "soluções", href: `${raiz}/solucoes` },
          { rotulo: setor.rotulo },
        ]}
        titulo={setor.rotulo}
        texto={dentro.apresentacao}
      />

      <section
        aria-labelledby="risco"
        className="rd-secao border-t border-white/10 py-24 sm:py-32"
      >
        <div
          className={`${container} grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16`}
        >
          <Cabeca id="risco" titulo={setor.titulo} texto={setor.risco} />
          <div data-revela className="rd-cartao self-start p-6 sm:p-8">
            <h3 className="text-sm text-white/60">o que a lei pede</h3>
            <ul className="mt-6 grid gap-5">
              {dentro.exige.map((item) => (
                <li
                  key={item}
                  className="border-t border-white/10 pt-5 text-[1.0625rem] leading-snug text-white first:border-t-0 first:pt-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="camadas"
        className="rd-secao bg-neutral-950 py-24 sm:py-32"
      >
        <div className={container}>
          <Cabeca
            id="camadas"
            titulo="as camadas que mais pesam aqui"
            texto="A Redoma inteira vem em todos os planos pagos. Estas são as que mais trabalham no seu ramo."
          />
          <ul data-revela-grupo className="mt-14 grid gap-4 md:grid-cols-3">
            {dentro.camadas.map((idDaCamada) => {
              const camada = camadas.find((c) => c.id === idDaCamada)!;
              return (
                <li key={camada.id} data-revela>
                  <Link
                    href={`${raiz}/plataforma#${camada.id}`}
                    className="group flex h-full flex-col rounded-[1.75rem] bg-black p-6 transition-colors duration-300 hover:bg-white hover:text-black sm:p-8"
                  >
                    <span className="rd-h3">{camada.nome}</span>
                    <span className="mt-4 flex-1 leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-black/70">
                      {camada.resumo}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="mt-8 size-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {setor.protege.map((item) => (
              <p
                key={item}
                data-revela
                className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-3 text-[1.0625rem] leading-snug text-white"
              >
                <span className="grid size-7 place-items-center rounded-full bg-white text-black">
                  <Check aria-hidden className="size-4" strokeWidth={2} />
                </span>
                <span className="pt-0.5">{item}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Depoimento" className="rd-secao py-24 sm:py-32">
        <figure className={container}>
          <blockquote
            data-revela="titulo"
            className="max-w-[34ch] text-[clamp(1.75rem,1.1rem+2.2vw,3rem)] leading-[1.06] font-medium tracking-[-0.04em] text-balance"
          >
            “{setor.depoimento.texto}”
          </blockquote>
          <figcaption data-revela="texto" className="mt-8 text-white/60">
            {setor.depoimento.autor}, cliente fictício
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby="quanto"
        className="rd-secao border-t border-white/10 py-24 sm:py-32"
      >
        <div
          className={`${container} grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-16`}
        >
          <Cabeca
            id="quanto"
            titulo="quanto custa"
            texto={`${dentro.equipe}, no plano ${plano.nome} com cobrança anual. A régua da página de preços faz a conta para o tamanho da sua equipe.`}
          />
          <div data-revela className="rd-plano destaque p-6 sm:p-8">
            <p className="text-sm text-white/60">plano {plano.nome}</p>
            {orcamento.cabe && (
              <>
                <p className="mt-4 text-[clamp(2.75rem,2rem+2.5vw,4rem)] leading-none font-medium tracking-[-0.04em]">
                  R$ {reais(orcamento.porMes)}
                  <span className="text-[1.25rem] tracking-[-0.02em] text-white/60">
                    /mês
                  </span>
                </p>
                <p className="mt-3 text-sm text-white/60">
                  R$ {PRECOS[dentro.plano].porPessoa.anual} por pessoa,{" "}
                  {orcamento.cobradas} pessoas, R$ {reais(orcamento.porAno)} por
                  ano.
                </p>
              </>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#comecar" className="rd-botao rd-botao-branco">
                começar
              </a>
              <VerMais href={`${raiz}/precos`}>comparar planos</VerMais>
            </div>
          </div>
        </div>
      </section>

      <nav
        aria-label="Outros ramos"
        className={`${container} flex flex-wrap items-center gap-3 border-t border-white/10 py-16`}
      >
        <span className="mr-2 text-white/60">outros ramos</span>
        {outros.map((s) => (
          <Link
            key={s.id}
            href={`${raiz}/solucoes/${s.id}`}
            className="rd-botao rd-botao-escuro"
          >
            {s.rotulo}
          </Link>
        ))}
      </nav>
    </>
  );
}
