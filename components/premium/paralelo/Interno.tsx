import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { nome, raiz } from "@/data/paralelo";
import { Contato } from "./Contato";
import { Seta } from "./Seta";

/** A largura de todas as páginas da Paralelo. */
export const container = "mx-auto w-full max-w-[76rem] px-5 sm:px-8";

/** O caminho de volta: Paralelo / página / subpágina. */
export function Caminho({
  itens,
}: {
  itens: { rotulo: string; href?: string }[];
}) {
  return (
    <nav aria-label="Você está em" className="pa-entra">
      <ol className="pa-caminho">
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

/** O alto de cada página interna: caminho, título e a frase de abertura. */
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
    <header className={`${container} pt-12 pb-14 sm:pt-16 sm:pb-20`}>
      <Caminho itens={caminho} />
      <h1
        className="pa-h1 pa-entra mt-8 max-w-[18ch]"
        style={{ "--ordem": 1 } as CSSProperties}
      >
        {titulo}
      </h1>
      <p
        className="pa-entra mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-[var(--texto-suave)] sm:text-lg"
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
}: {
  id: string;
  titulo: string;
  texto?: string;
}) {
  return (
    <div className="max-w-[44rem]">
      <h2 id={id} className="pa-h2" data-revela="titulo">
        {titulo}
      </h2>
      {texto && (
        <p
          data-revela="texto"
          className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-[var(--texto-suave)]"
        >
          {texto}
        </p>
      )}
    </div>
  );
}

/** "Ver mais" das seções da página inicial: leva à página da seção. */
export function VerMais({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem] font-medium text-white"
    >
      <span className="underline decoration-[var(--linha-forte)] underline-offset-[6px] transition-[text-decoration-color] duration-200 group-hover:decoration-[var(--roxo)]">
        {children}
      </span>
      <Seta className="pa-seta h-[10px] w-[12px] text-[var(--roxo)] transition-transform duration-200 ease-out group-hover:translate-x-1" />
    </Link>
  );
}

/**
 * O fim de toda página interna: abrir a conta ou falar com vendas, o mesmo
 * formulário da página inicial. "Abrir conta" e "Falar com vendas" das
 * páginas caem aqui.
 */
export function Comecar() {
  return (
    <section
      id="comecar"
      aria-labelledby="comecar-titulo"
      className="pa-secao relative border-t border-[var(--linha)] bg-[var(--superficie)] py-20 sm:py-28"
    >
      <span id="vendas" className="pa-secao absolute top-0" aria-hidden />
      <div
        className={`${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start`}
      >
        <Cabeca
          id="comecar-titulo"
          titulo="Abra a conta ou fale com quem entende de câmbio"
          texto="Conta aberta em até um dia útil, tudo pelo celular. Para volumes grandes ou integração pela API, o time de vendas monta a proposta."
        />
        <div data-revela className="min-w-0">
          <Contato />
        </div>
      </div>
    </section>
  );
}
