import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { NomeDoEstabelecimento } from "@/components/TemaDoNicho";
import { Container } from "@/components/ui/Container";
import type { Imagem } from "@/data/tipos";
import { classes } from "@/lib/classes";
import { LinkDoDemo } from "./LinkDoDemo";
import { TituloQueSobe } from "./TituloQueSobe";

export type ItemDoCaminho = { rotulo: string; href?: string };

const foco =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

/** O caminho de volta: o nome do estabelecimento e a página atual. */
export function Caminho({
  raiz,
  itens,
  className,
}: {
  raiz: string;
  itens: ItemDoCaminho[];
  className?: string;
}) {
  return (
    <nav aria-label="Você está em" className={classes("entra", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-texto-suave">
        <li>
          <LinkDoDemo
            href={raiz}
            className={classes("transition-colors hover:text-texto", foco)}
          >
            <NomeDoEstabelecimento />
          </LinkDoDemo>
        </li>
        {itens.map((item) => (
          <li
            key={item.rotulo}
            aria-current={item.href ? undefined : "page"}
            className="flex items-center gap-2"
          >
            <span aria-hidden className="text-texto-suave/60">
              /
            </span>
            {item.href ? (
              <LinkDoDemo
                href={item.href}
                className={classes("transition-colors hover:text-texto", foco)}
              >
                {item.rotulo}
              </LinkDoDemo>
            ) : (
              <span className="font-medium text-texto">{item.rotulo}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * O alto de cada página interna: o caminho, o título entrando palavra por
 * palavra, o apoio e as ações. Com foto, ela abre de baixo para cima ao
 * lado (no celular, embaixo). O CSS de cada demo veste a peça pelas classes
 * `cabeca-interna` e `titulo-interno`.
 */
export function CabecaDaPagina({
  raiz,
  caminho,
  titulo,
  destaque,
  classeDoDestaque = "text-destaque",
  modoDoDestaque,
  texto,
  acoes,
  imagem,
  posicaoDaImagem,
  extra,
  className,
}: {
  raiz: string;
  caminho: ItemDoCaminho[];
  titulo: string;
  destaque?: string;
  classeDoDestaque?: string;
  modoDoDestaque?: "sobe" | "escreve";
  texto?: ReactNode;
  /** Botões do topo; a ação principal leva data-cta-principal aqui dentro. */
  acoes?: ReactNode;
  imagem?: Imagem;
  posicaoDaImagem?: string;
  /** Algo abaixo do texto (fatos, filtros) que ainda é do topo. */
  extra?: ReactNode;
  className?: string;
}) {
  const atrasoDoTexto =
    200 + `${titulo} ${destaque ?? ""}`.trim().split(/\s+/).length * 70;
  return (
    <header className={classes("cabeca-interna", className)}>
      <Container
        largura="larga"
        className={classes(
          "grid gap-10 pt-8 pb-14 sm:pt-12 sm:pb-20",
          imagem && "lg:grid-cols-12 lg:items-end lg:gap-14",
        )}
      >
        <div className={imagem ? "lg:col-span-7" : "max-w-4xl"}>
          <Caminho raiz={raiz} itens={caminho} />
          <h1 className="titulo-interno mt-8 text-balance sm:mt-10">
            <TituloQueSobe
              texto={titulo}
              destaque={destaque}
              classeDoDestaque={classeDoDestaque}
              modoDoDestaque={modoDoDestaque}
              atraso={120}
            />
          </h1>
          {texto && (
            <p
              className="entra mt-6 max-w-[54ch] text-lg leading-relaxed text-texto-suave"
              style={{ "--atraso": `${atrasoDoTexto}ms` } as CSSProperties}
            >
              {texto}
            </p>
          )}
          {acoes && (
            <div
              className="entra mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={
                { "--atraso": `${atrasoDoTexto + 120}ms` } as CSSProperties
              }
            >
              {acoes}
            </div>
          )}
          {extra && (
            <div
              className="entra mt-10"
              style={
                { "--atraso": `${atrasoDoTexto + 220}ms` } as CSSProperties
              }
            >
              {extra}
            </div>
          )}
        </div>
        {imagem && (
          <div
            className="foto-entra moldura-da-cabeca relative aspect-[4/3] overflow-hidden rounded-tema lg:col-span-5 lg:aspect-[4/5]"
            style={{ "--atraso": "160ms" } as CSSProperties}
          >
            <Image
              src={imagem.src}
              alt={imagem.alt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
              style={{ objectPosition: posicaoDaImagem }}
            />
          </div>
        )}
      </Container>
    </header>
  );
}

/** "Ver mais": leva da seção da página inicial para a página dela. */
export function VerMais({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <LinkDoDemo
      href={href}
      className={classes(
        "ver-mais tatil inline-flex min-h-11 items-center gap-2 rounded-tema border-2 border-texto px-5 text-base font-semibold text-texto hover:bg-texto hover:text-fundo",
        foco,
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden className="seta-que-anda size-4 shrink-0" />
    </LinkDoDemo>
  );
}

/**
 * O fim de cada página interna: a próxima página do demo, grande, para a
 * visita seguir sem voltar ao menu. Depois da última, volta ao início.
 */
export function ProximaPagina({
  raiz,
  paginas,
  atual,
}: {
  raiz: string;
  paginas: { rotulo: string; href: string }[];
  atual: string;
}) {
  const indice = paginas.findIndex((p) => p.href === atual);
  const ultima = indice + 1 >= paginas.length;
  const proxima = ultima
    ? { rotulo: "Início", href: raiz }
    : (paginas[indice + 1] ?? { rotulo: "Início", href: raiz });
  return (
    <nav
      aria-label="Próxima página"
      className="proxima-pagina border-t border-borda"
    >
      <Container largura="larga">
        <LinkDoDemo
          href={proxima.href}
          className={classes(
            "group flex items-end justify-between gap-6 py-12 sm:py-16",
            foco,
          )}
        >
          <span data-revela="texto">
            <span className="block text-sm font-medium text-texto-suave">
              {ultima ? "Voltar ao início" : "Próxima página"}
            </span>
            <span className="titulo-da-proxima mt-2 block text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.95]">
              {proxima.rotulo}
            </span>
          </span>
          <span
            aria-hidden
            className="seta-da-proxima grid size-14 shrink-0 place-items-center rounded-full bg-primaria text-primaria-texto transition-[scale,rotate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45 group-active:scale-95 sm:size-20"
          >
            <ArrowRight className="size-6 sm:size-8" />
          </span>
        </LinkDoDemo>
      </Container>
    </nav>
  );
}

/** As dúvidas da página, abrindo uma de cada vez pela altura. */
export function Duvidas({
  titulo = "Dúvidas",
  perguntas,
  className,
}: {
  titulo?: string;
  perguntas: { pergunta: string; resposta: string }[];
  className?: string;
}) {
  return (
    <section
      aria-labelledby="duvidas-titulo"
      className={classes("py-16 sm:py-24", className)}
    >
      <Container largura="larga" className="grid gap-10 lg:grid-cols-12">
        <h2
          id="duvidas-titulo"
          data-revela="titulo"
          className="titulo-de-secao lg:col-span-4"
        >
          {titulo}
        </h2>
        <div
          data-revela-grupo
          className="grid border-t border-borda lg:col-span-8"
        >
          {perguntas.map((p) => (
            <details
              key={p.pergunta}
              name="duvidas"
              data-revela
              className="border-b border-borda"
            >
              <summary
                className={classes(
                  "flex min-h-16 cursor-pointer items-center justify-between gap-6 py-4 text-lg font-semibold",
                  foco,
                )}
              >
                {p.pergunta}
                <Plus
                  aria-hidden
                  className="sinal-da-duvida size-5 shrink-0 text-destaque"
                />
              </summary>
              <p className="max-w-[62ch] pb-6 leading-relaxed text-texto-suave">
                {p.resposta}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
