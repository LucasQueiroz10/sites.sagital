import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { nome, perguntas, raiz } from "@/data/destra";
import { Avaliacao } from "./Avaliacao";

/** A largura de todas as páginas da Destra. */
export const container = "mx-auto w-full max-w-[84rem] px-4 md:px-8";

/** O caminho de volta: Destra / página / subpágina. */
export function Caminho({
  itens,
}: {
  itens: { rotulo: string; href?: string }[];
}) {
  return (
    <nav aria-label="Você está em" className="dt-entra">
      <ol className="dt-caminho">
        <li>
          <Link href={raiz}>{nome}</Link>
        </li>
        {itens.map((item) =>
          item.href ? (
            <li key={item.rotulo}>
              <Link href={item.href}>{item.rotulo}</Link>
            </li>
          ) : (
            <li key={item.rotulo} aria-current="page" className="text-black">
              {item.rotulo}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

/** O alto de cada página interna: caminho, título leve e a frase de abertura. */
export function CabecaDaPagina({
  caminho,
  titulo,
  texto,
  children,
}: {
  caminho: { rotulo: string; href?: string }[];
  titulo: ReactNode;
  texto: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className={`${container} pt-32 pb-16 sm:pt-40 sm:pb-24`}>
      <Caminho itens={caminho} />
      <h1
        className="dt-h1 dt-entra mt-8 max-w-[16ch]"
        style={{ "--ordem": 1 } as CSSProperties}
      >
        {titulo}
      </h1>
      <p
        className="dt-entra mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed text-black/65 sm:text-lg"
        style={{ "--ordem": 2 } as CSSProperties}
      >
        {texto}
      </p>
      {children}
    </header>
  );
}

/** Título e texto de abertura de cada seção, que entram ao rolar. */
export function Cabeca({
  id,
  titulo,
  texto,
  claro = false,
}: {
  id: string;
  titulo: string;
  texto?: string;
  /** Sobre a seção preta. */
  claro?: boolean;
}) {
  return (
    <div className="max-w-[48rem]">
      <h2 id={id} className="dt-h2" data-revela="titulo">
        {titulo}
      </h2>
      {texto && (
        <p
          data-revela="texto"
          className={`mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed ${claro ? "text-white/70" : "text-black/65"}`}
        >
          {texto}
        </p>
      )}
    </div>
  );
}

/** "Ver mais" das seções: a pílula de contorno com a seta. */
export function VerMais({
  href,
  children,
  claro = false,
}: {
  href: string;
  children: string;
  /** Sobre a seção preta. */
  claro?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`dt-botao group ${claro ? "border border-white/35 text-white hover:border-white" : "dt-botao-contorno"}`}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </Link>
  );
}

/**
 * O fim de toda página interna: a avaliação gratuita e as perguntas, como
 * na página inicial.
 */
export function Avaliar() {
  return (
    <section
      id="avaliacao"
      aria-labelledby="avaliacao-titulo"
      className="dt-secao border-t border-black/[0.08] py-24 sm:py-32"
    >
      <div className={container}>
        <Cabeca
          id="avaliacao-titulo"
          titulo="Agende a avaliação gratuita"
          texto="Uma hora com uma terapeuta ocupacional, numa das nossas clínicas parceiras. Você sai sabendo qual mão serve, quanto custa e como pedir pelo plano."
        />
        <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-start lg:gap-16">
          <div data-revela className="min-w-0">
            <Avaliacao />
          </div>
          <ul data-revela-grupo className="border-t border-black/10">
            {perguntas.map((p) => (
              <li
                key={p.pergunta}
                data-revela
                className="border-b border-black/10"
              >
                <details className="dt-pergunta">
                  <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium">
                    {p.pergunta}
                    <Plus
                      aria-hidden
                      className="dt-pergunta-icone mt-1 size-4 shrink-0"
                      strokeWidth={2}
                    />
                  </summary>
                  <p className="max-w-[60ch] pb-6 leading-relaxed text-black/65">
                    {p.resposta}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
