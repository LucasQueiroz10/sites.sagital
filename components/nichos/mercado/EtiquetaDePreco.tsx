import { classes } from "@/lib/classes";
import { formatarPreco, partesDoPreco } from "@/lib/formato";

type Props = {
  centavos: number;
  unidade: string;
  tamanho?: "normal" | "grande";
  className?: string;
};

/**
 * Etiqueta de encarte: "R$" pequeno, reais enormes, centavos sobrescritos.
 * Preenchida com a cor primária, então o texto segue o contraste automático.
 */
export function EtiquetaDePreco({
  centavos,
  unidade,
  tamanho = "normal",
  className,
}: Props) {
  const [reais, cent] = partesDoPreco(centavos);
  return (
    <p
      className={classes(
        "etiqueta inline-flex flex-col rounded-tema bg-primaria px-2.5 pt-1 pb-1.5 text-primaria-texto",
        tamanho === "grande" ? "text-7xl" : "text-5xl",
        className,
      )}
    >
      <span aria-hidden className="flex items-start leading-[0.82]">
        <span className="mt-[0.12em] mr-[0.06em] text-[0.3em]">R$</span>
        <span className="tabular-nums">{reais}</span>
        <span className="mt-[0.04em] text-[0.45em] tabular-nums">,{cent}</span>
      </span>
      <span
        aria-hidden
        className="mt-1 font-sans text-xs font-bold tracking-wide not-italic uppercase"
      >
        {unidade}
      </span>
      <span className="sr-only">
        {formatarPreco(centavos)} ({unidade})
      </span>
    </p>
  );
}
