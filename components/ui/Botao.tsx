import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { classes } from "@/lib/classes";

type Variante = "primario" | "secundario";
type Tamanho = "normal" | "grande";

type PropsBase = {
  variante?: Variante;
  tamanho?: Tamanho;
  className?: string;
  children: ReactNode;
};

type PropsLink = PropsBase & {
  href: string;
  /** Abre em nova aba com rel="noopener noreferrer" (WhatsApp, delivery). */
  externo?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, keyof PropsBase | "href">;

type PropsAcao = PropsBase & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    keyof PropsBase
  >;

export type PropsDoBotao = PropsLink | PropsAcao;

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-tema px-5 " +
  "text-base font-semibold transition-colors duration-150 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const variantes: Record<Variante, string> = {
  primario: "bg-primaria text-primaria-texto hover:bg-primaria-hover",
  secundario:
    "border-2 border-destaque text-destaque hover:bg-destaque hover:text-fundo",
};

const tamanhos: Record<Tamanho, string> = {
  normal: "",
  grande: "min-h-13 px-7 text-lg",
};

function estiloDoBotao(
  variante: Variante = "primario",
  tamanho: Tamanho = "normal",
  className?: string,
) {
  return classes(base, variantes[variante], tamanhos[tamanho], className);
}

/** Botão ou link com cara de botão. Área de toque mínima de 44px. */
export function Botao(props: PropsDoBotao) {
  if (props.href !== undefined) {
    const { href, externo, variante, tamanho, className, children, ...resto } =
      props;
    const estilo = estiloDoBotao(variante, tamanho, className);

    if (externo) {
      return (
        <a
          {...resto}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={estilo}
        >
          {children}
        </a>
      );
    }
    return (
      <Link {...resto} href={href} className={estilo}>
        {children}
      </Link>
    );
  }

  const {
    variante,
    tamanho,
    className,
    children,
    type = "button",
    ...resto
  } = props;
  return (
    <button
      {...resto}
      type={type}
      className={estiloDoBotao(variante, tamanho, className)}
    >
      {children}
    </button>
  );
}
