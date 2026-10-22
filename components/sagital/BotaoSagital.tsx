import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { classes } from "@/lib/classes";

/**
 * Botões do Sagital Design System. Um só "principal" (o degradê) por tela;
 * as outras ações usam secundário, escuro, inverso, contorno ou vidro.
 */
export type VarianteSagital =
  "principal" | "secundario" | "escuro" | "inverso" | "contorno" | "vidro";

type Tamanho = "medio" | "grande";

type PropsBase = {
  variante?: VarianteSagital;
  tamanho?: Tamanho;
  /** Só ícone: quadrado, sem padding lateral (o rótulo vai em sr-only). */
  icone?: boolean;
  className?: string;
  children: ReactNode;
};

type PropsLink = PropsBase & {
  href: string;
  /** Abre em nova aba com rel="noopener noreferrer" (WhatsApp, GitHub). */
  externo?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, keyof PropsBase | "href">;

type PropsAcao = PropsBase & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    keyof PropsBase
  >;

const variantes: Record<VarianteSagital, string> = {
  principal: "sg-degrade",
  secundario: "bg-superficie text-texto hover:bg-[var(--sg-pressionado)]",
  escuro: "bg-texto text-white hover:bg-[var(--sg-marinho-800)]",
  inverso: "bg-white text-texto hover:bg-[#eef4fe]",
  contorno:
    "text-texto shadow-[inset_0_0_0_1px_var(--cor-borda)] hover:bg-superficie",
  vidro: "bg-white/14 text-white hover:bg-white/22",
};

const tamanhos: Record<Tamanho, string> = {
  medio: "min-h-11 px-4 text-[0.9375rem]",
  grande: "min-h-12 px-5 text-base",
};

const tamanhosDeIcone: Record<Tamanho, string> = {
  medio: "size-11",
  grande: "size-12",
};

export function estiloSagital(
  variante: VarianteSagital = "principal",
  tamanho: Tamanho = "grande",
  className?: string,
  icone = false,
) {
  return classes(
    "sg-pressiona inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold tracking-[-0.005em] whitespace-nowrap",
    "disabled:cursor-not-allowed disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40",
    variantes[variante],
    icone ? classes("shrink-0", tamanhosDeIcone[tamanho]) : tamanhos[tamanho],
    className,
  );
}

export function BotaoSagital(props: PropsLink | PropsAcao) {
  if (props.href !== undefined) {
    const {
      href,
      externo,
      variante,
      tamanho,
      icone,
      className,
      children,
      ...resto
    } = props;
    const estilo = estiloSagital(variante, tamanho, className, icone);
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
    icone,
    className,
    children,
    type = "button",
    ...resto
  } = props;
  return (
    <button
      {...resto}
      type={type}
      className={estiloSagital(variante, tamanho, className, icone)}
    >
      {children}
    </button>
  );
}
