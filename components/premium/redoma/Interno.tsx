import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { nome, raiz } from "@/data/redoma";
import { Contato } from "./Contato";

/** A largura de todas as páginas da Redoma. */
export const container = "mx-auto w-full max-w-[84rem] px-6 md:px-10";

/** O caminho de volta: redoma / página / subpágina, em minúsculas. */
export function Caminho({
  itens,
}: {
  itens: { rotulo: string; href?: string }[];
}) {
  return (
    <nav aria-label="Você está em" className="rd-entra">
      <ol className="rd-caminho">
        <li>
          <Link href={raiz}>{nome}</Link>
        </li>
        {itens.map((item) =>
          item.href ? (
            <li key={item.rotulo}>
              <Link href={item.href}>{item.rotulo}</Link>
            </li>
          ) : (
            <li key={item.rotulo} aria-current="page" className="text-white">
              {item.rotulo}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

/**
 * O alto de cada página interna: o caminho, o título no corpo gigante da
 * abertura e a frase de abertura alinhada à direita, como o texto pequeno
 * que cruza o título no modelo.
 */
export function CabecaDaPagina({
  caminho,
  titulo,
  texto,
}: {
  caminho: { rotulo: string; href?: string }[];
  titulo: ReactNode;
  texto: ReactNode;
}) {
  return (
    <header className={`${container} pt-36 pb-20 sm:pt-44 sm:pb-28`}>
      <Caminho itens={caminho} />
      <h1
        className="rd-h1 rd-entra mt-10"
        style={{ "--ordem": 1 } as CSSProperties}
      >
        {titulo}
      </h1>
      <p
        className="rd-entra mt-10 max-w-[44ch] text-[1.0625rem] leading-relaxed text-white/70 sm:text-lg md:ml-auto md:mr-[8%]"
        style={{ "--ordem": 2 } as CSSProperties}
      >
        {texto}
      </p>
    </header>
  );
}

/** Título e texto de abertura de cada seção, que entram ao rolar. */
export function Cabeca({
  id,
  titulo,
  texto,
}: {
  id: string;
  titulo: string;
  texto?: string;
}) {
  return (
    <div className="max-w-[52rem]">
      <h2 id={id} className="rd-h2" data-revela="titulo">
        {titulo}
      </h2>
      {texto && (
        <p
          data-revela="texto"
          className="mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-white/70 sm:text-lg"
        >
          {texto}
        </p>
      )}
    </div>
  );
}

/** "Ver mais" das seções: a pílula escura com a seta. */
export function VerMais({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <Link href={href} className="rd-botao rd-botao-escuro group">
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
      />
    </Link>
  );
}

/**
 * O fim de toda página interna: começar ou pedir suporte, o mesmo
 * formulário da página inicial.
 */
export function Comecar() {
  return (
    <section
      id="comecar"
      aria-labelledby="comecar-titulo"
      className="rd-secao relative bg-neutral-950 py-24 sm:py-32"
    >
      <span id="suporte" className="rd-secao absolute top-0" aria-hidden />
      <div
        className={`${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-16`}
      >
        <div className="lg:sticky lg:top-32">
          <Cabeca
            id="comecar-titulo"
            titulo="gente de verdade do outro lado"
            texto="Para começar, tirar uma dúvida ou pedir socorro: a mensagem chega no WhatsApp de quem resolve, não num robô."
          />
        </div>
        <div data-revela className="min-w-0">
          <Contato />
        </div>
      </div>
    </section>
  );
}
