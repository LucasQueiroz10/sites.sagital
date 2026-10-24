import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { nome, raiz, selosDaAuditoria } from "@/data/bloco";
import { classes } from "@/lib/classes";
import { FormularioDeAuditoria } from "./FormularioDeAuditoria";
import { FaixaDePixels } from "./Pixels";

/** A largura de todas as páginas da Bloco. */
export const container = "mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8";

export const LARANJA = "var(--cor-laranja-campo)";
export const TONS_DO_LARANJA = ["#e85102", "#c24200"];

/**
 * O título entre colchetes. Cada item de `linhas` é uma linha; as palavras
 * cinza vão em <Cinza>.
 */
export function Colchetes({
  id,
  linhas,
  recuo,
  className,
  como: Tag = "h2",
}: {
  id?: string;
  linhas: ReactNode[];
  recuo?: string;
  className?: string;
  como?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      id={id}
      className={classes(
        "bl-colchetes bl-quadrada text-[var(--cor-tinta)]",
        className,
      )}
      style={recuo ? ({ "--recuo": recuo } as CSSProperties) : undefined}
    >
      {linhas.map((l, i) => (
        <span key={i}>{l}</span>
      ))}
    </Tag>
  );
}

export const Cinza = ({ children }: { children: ReactNode }) => (
  <span className="bl-cinza">{children}</span>
);

/** O caminho de volta, em rótulos quadrados com a barra laranja. */
export function Caminho({
  itens,
}: {
  itens: { rotulo: string; href?: string }[];
}) {
  return (
    <nav aria-label="Você está em" className="bl-entra">
      <ol className="bl-caminho bl-rotulo">
        <li>
          <Link href={raiz}>{nome}</Link>
        </li>
        {itens.map((item) =>
          item.href ? (
            <li key={item.rotulo}>
              <Link href={item.href}>{item.rotulo}</Link>
            </li>
          ) : (
            <li
              key={item.rotulo}
              aria-current="page"
              className="text-[var(--cor-tinta)]"
            >
              {item.rotulo}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

/**
 * O alto de cada página interna, como a abertura da página inicial: o
 * título laranja em duas linhas desencontradas e a frase embaixo.
 */
export function CabecaDaPagina({
  caminho,
  linhas,
  texto,
  children,
}: {
  caminho: { rotulo: string; href?: string }[];
  linhas: [string, string];
  texto: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className={`${container} pt-28 pb-16 sm:pt-36 sm:pb-24`}>
      <Caminho itens={caminho} />
      <h1
        className="bl-quadrada bl-entra mt-10 text-[clamp(3rem,7.4vw,7rem)] text-[var(--cor-laranja-titulo)]"
        style={{ "--ordem": 1 } as CSSProperties}
      >
        <span className="block">{linhas[0]}</span>
        <span className="block pl-[1.05em]">{linhas[1]}</span>
      </h1>
      <p
        className="bl-entra mt-8 max-w-[46ch] text-[1.0625rem] leading-relaxed text-[var(--cor-texto-suave)] sm:ml-[3.2em] sm:text-lg"
        style={{ "--ordem": 2 } as CSSProperties}
      >
        {texto}
      </p>
      {children}
    </header>
  );
}

/** "Ver mais" das seções: o botão de contorno com as cantoneiras laranja. */
export function VerMais({
  href,
  children,
  branco = false,
}: {
  href: string;
  children: string;
  /** Sobre o campo laranja. */
  branco?: boolean;
}) {
  return (
    <Link
      href={href}
      className={classes(
        "bl-botao",
        branco ? "bl-botao-vazado" : "bl-botao-mira bl-mira",
      )}
    >
      {children}
      <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
    </Link>
  );
}

/**
 * O fim de toda página interna: a faixa de pixels e a auditoria gratuita no
 * campo laranja, como na página inicial.
 */
export function Auditoria({ de = "var(--cor-cinza)" }: { de?: string }) {
  return (
    <>
      <FaixaDePixels
        de={de}
        para={LARANJA}
        tons={TONS_DO_LARANJA}
        semente={31}
      />
      <section
        id="auditoria"
        aria-labelledby="auditoria-titulo"
        className="bl-campo-laranja scroll-mt-16 bg-[var(--cor-laranja-campo)] pt-12 pb-20 text-white sm:pt-16 sm:pb-24"
      >
        <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-6`}>
          <div className="lg:col-span-5">
            <h2
              id="auditoria-titulo"
              className="bl-quadrada text-[clamp(2.25rem,4.6vw,3.75rem)]"
            >
              <span className="block">Auditoria gratuita e</span>
              <span className="block sm:pl-[1.2em]">pontos de crescimento</span>
            </h2>
            <p className="mt-6 max-w-[44ch] text-[1rem] leading-relaxed text-[rgb(255_255_255/0.92)]">
              A gente olha o que você já faz, mostra onde está perdendo cliente
              e entrega um plano com o resultado que dá para esperar.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {selosDaAuditoria.map((selo) => (
                <li key={selo} className="flex items-center gap-2">
                  <Check
                    aria-hidden
                    className="size-4 shrink-0"
                    strokeWidth={2}
                  />
                  <span className="bl-rotulo text-[0.8125rem]">{selo}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="max-w-[34rem] lg:col-span-6 lg:col-start-7">
            <FormularioDeAuditoria />
          </div>
        </div>
      </section>
      <FaixaDePixels
        de={LARANJA}
        para="#1c1c1c"
        tons={["#3a3a3a", "#2a2a2a"]}
        semente={43}
        linhas={5}
      />
    </>
  );
}
