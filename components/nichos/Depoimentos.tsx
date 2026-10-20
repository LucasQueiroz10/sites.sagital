import type { Depoimento } from "@/data/tipos";
import { classes } from "@/lib/classes";

type Props = {
  depoimentos: Depoimento[];
  className?: string;
  classeDoTexto?: string;
};

export function Depoimentos({ depoimentos, className, classeDoTexto }: Props) {
  return (
    <div className={className}>
      <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
        {depoimentos.map((depoimento) => (
          <li key={depoimento.autoria}>
            <figure>
              <blockquote
                className={classes(
                  "text-xl leading-snug text-pretty",
                  classeDoTexto,
                )}
              >
                <p>“{depoimento.texto}”</p>
              </blockquote>
              <figcaption className="mt-4 text-sm text-texto-suave">
                {depoimento.autoria}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-texto-suave">
        Depoimentos ilustrativos, criados para este site demonstrativo.
      </p>
    </div>
  );
}
