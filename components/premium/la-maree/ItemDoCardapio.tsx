import type { Prato } from "@/data/la-maree";
import { classes } from "@/lib/classes";

/**
 * Um prato do cardápio impresso: o nome na serifa estreita, a descrição em
 * caixa-alta e o preço solto em caligrafia. `aDireita` espelha a linha, como
 * os nomes que alternam de lado nas folhas.
 */
export function ItemDoCardapio({
  prato,
  aDireita,
}: {
  prato: Prato;
  aDireita: boolean;
}) {
  // Como no cardápio impresso: o número solto, em reais.
  const preco = String(prato.preco);
  return (
    <li
      className={classes(
        "grid gap-x-6 gap-y-2 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:items-start",
        aDireita && "text-right sm:[direction:rtl]",
      )}
    >
      <div className="[direction:ltr]">
        <p className="lm-serifa text-[clamp(1.75rem,5.4vw,2.375rem)] leading-[0.95]">
          {prato.nome}
        </p>
        {prato.complemento && (
          <p className="lm-serifa mt-1 text-[1.0625rem] leading-none">
            {prato.complemento}
          </p>
        )}
      </div>
      <div
        className={classes(
          "[direction:ltr]",
          aDireita ? "sm:text-left" : "sm:text-right",
        )}
      >
        <p
          className={classes(
            "lm-descricao max-w-[34ch] sm:pt-1.5",
            aDireita ? "ml-auto sm:ml-0" : "sm:ml-auto",
          )}
        >
          {prato.descricao}
        </p>
        <p
          className={classes(
            "mt-1.5",
            typeof prato.preco === "number"
              ? "lm-caligrafia text-[1.875rem] leading-none"
              : "lm-selo",
          )}
        >
          {preco}
        </p>
      </div>
    </li>
  );
}
