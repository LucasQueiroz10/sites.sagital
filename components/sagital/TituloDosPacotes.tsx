import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

// Os títulos das páginas de pacotes seguem a vitrine dos demos: a grotesca
// pesada em caixa-alta e uma palavra em serifa itálica ao lado.
export const grotesca =
  "font-[family-name:var(--font-inter-tight)] font-extrabold";
export const serifaItalica =
  "font-[family-name:var(--font-instrument-serif)] font-normal italic";
export const tituloDeSecao = "text-[clamp(1.75rem,4.4vw,2.25rem)] leading-none";
/** Rótulo pequeno em caixa-alta: o caminho, as etapas, as células. */
export const rotulo = "text-[0.6875rem] font-bold tracking-[0.14em] uppercase";

/** "PALAVRA em itálico": o par de fontes dos títulos. */
export function ParDeFontes({
  forte,
  italico,
}: {
  forte: ReactNode;
  italico: ReactNode;
}) {
  return (
    <>
      <span className={`${grotesca} tracking-[-0.045em] uppercase`}>
        {forte}
      </span>{" "}
      <span className={`${serifaItalica} tracking-[-0.015em]`}>{italico}</span>
    </>
  );
}

/** Início › Pacotes › …: o último item é a página atual, sem link. */
export function Caminho({
  itens,
}: {
  itens: { rotulo: string; href?: string }[];
}) {
  return (
    <nav aria-label="Caminho" className="sg-entra">
      <ol
        className={`${rotulo} flex flex-wrap items-center gap-1.5 text-texto-suave`}
      >
        {itens.map((item, i) => (
          <Fragment key={item.rotulo}>
            {i > 0 && (
              <li aria-hidden>
                <ChevronRight className="size-3" strokeWidth={2.5} />
              </li>
            )}
            {item.href ? (
              <li>
                <Link href={item.href} className="hover:text-texto">
                  {item.rotulo}
                </Link>
              </li>
            ) : (
              <li aria-current="page" className="text-texto">
                {item.rotulo}
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
