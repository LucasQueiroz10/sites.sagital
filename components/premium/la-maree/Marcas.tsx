import type { CSSProperties } from "react";
import { classes } from "@/lib/classes";

/**
 * As gravuras do Fish Market Image Bank, da Penny Magazine (1834) e dos
 * desenhos de Pearson Scott Foresman, todas em domínio público (Wikimedia
 * Commons), viradas em máscara: o traço pinta com a cor do texto.
 */
export const gravuras = {
  lagosta: {
    src: "/imagens/premium/la-maree/gravuras/lagosta.png",
    proporcao: 410 / 746,
  },
  peixe: {
    src: "/imagens/premium/la-maree/gravuras/peixe.png",
    proporcao: 1254 / 513,
  },
  polvo: {
    src: "/imagens/premium/la-maree/gravuras/polvo.png",
    proporcao: 1640 / 1200,
  },
  vieira: {
    src: "/imagens/premium/la-maree/gravuras/vieira.png",
    proporcao: 1062 / 1099,
  },
  ostra: {
    src: "/imagens/premium/la-maree/gravuras/ostra.png",
    proporcao: 1847 / 1053,
  },
} as const;

export type NomeDaGravura = keyof typeof gravuras;

/** Uma gravura decorativa; a cor vem de `text-*` e o tamanho, da largura. */
export function Gravura({
  nome,
  className,
  style,
}: {
  nome: NomeDaGravura;
  className?: string;
  style?: CSSProperties;
}) {
  const { src, proporcao } = gravuras[nome];
  return (
    <span
      aria-hidden
      className={classes("lm-gravura", className)}
      style={
        {
          "--gravura": `url("${src}")`,
          aspectRatio: proporcao,
          ...style,
        } as CSSProperties
      }
    />
  );
}

/**
 * A assinatura completa, como a das referências: "La" em caligrafia sobre
 * MARÉE na serifa estreita, e o selo de duas colunas ligado por um traço.
 */
export function Assinatura({
  className,
  animada = false,
  comoTitulo = false,
}: {
  className?: string;
  /** Entra em sequência (só na abertura). */
  animada?: boolean;
  /** Na abertura a assinatura é o h1 da página. */
  comoTitulo?: boolean;
}) {
  const Nome = comoTitulo ? "h1" : "p";
  return (
    <div className={classes("inline-grid justify-items-center", className)}>
      <Nome className="grid justify-items-center">
        <span
          className={classes(
            "lm-caligrafia -mb-[0.32em] text-[0.62em] leading-none",
            animada && "lm-entra",
          )}
          style={{ "--ordem": 1 } as CSSProperties}
        >
          La
        </span>
        <span
          className={classes("lm-serifa text-[1em]", animada && "lm-entra")}
          style={{ "--ordem": 2 } as CSSProperties}
        >
          Marée
        </span>
      </Nome>
      <div
        className={classes(
          "lm-selo mt-[0.16em] grid w-full grid-cols-[auto_1fr_auto] items-end gap-x-[0.5em] text-[max(0.75rem,0.13em)]",
          animada && "lm-entra",
        )}
        style={{ "--ordem": 3 } as CSSProperties}
      >
        <span className="text-left">
          Frutos do mar
          <br />
          Restaurante
        </span>
        <span
          aria-hidden
          className={classes(
            "mb-[0.35em] h-px bg-current",
            animada && "lm-traco",
          )}
          style={{ "--ordem": 4 } as CSSProperties}
        />
        <span className="text-right">
          Florianópolis
          <br />
          Desde 2019
        </span>
      </div>
    </div>
  );
}

/**
 * O selo oval com o monograma no meio e o nome correndo pela borda, como o
 * das referências. Desenhado com o texto da própria fonte.
 */
export function Selo({
  className,
  id = "lm-selo",
}: {
  className?: string;
  /** Único na página: a pista do texto é referenciada por ele. */
  id?: string;
}) {
  // A pista do texto: um estádio de 100 x 160 com cantos de raio 50.
  const pista =
    "M 50 130 A 50 50 0 0 1 0 80 L 0 50 A 50 50 0 0 1 100 50 L 100 80 A 50 50 0 0 1 50 130";
  const volta = 2 * (130 - 50 - 50) + Math.PI * 100;
  return (
    <svg
      viewBox="-14 -14 128 158"
      role="img"
      aria-label="Selo La Marée, Florianópolis, desde 2019"
      className={classes("overflow-visible", className)}
    >
      <rect
        x="-9"
        y="-9"
        width="118"
        height="148"
        rx="59"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="9"
        y="9"
        width="82"
        height="112"
        rx="41"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path id={id} d={pista} fill="none" />
      <text
        fill="currentColor"
        fontSize="9"
        letterSpacing="0.5"
        style={{ fontFamily: "var(--font-grotesca)", fontWeight: 500 }}
      >
        <textPath href={`#${id}`} textLength={volta - 6} lengthAdjust="spacing">
          LA MARÉE • FRUTOS DO MAR • FLORIANÓPOLIS • DESDE 2019 •
        </textPath>
      </text>
      <text
        x="50"
        y="81"
        textAnchor="middle"
        fill="currentColor"
        fontSize="40"
        style={{
          fontFamily: "var(--font-serifa)",
          fontStretch: "62.5%",
          fontWeight: 500,
        }}
      >
        LM
      </text>
    </svg>
  );
}

/** O monograma pequeno: o M em caligrafia dentro da moldura ondulada. */
export function Monograma({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={classes(
        "relative inline-grid aspect-[4/5] place-items-center rounded-[50%] border border-current",
        className,
      )}
    >
      <span className="absolute inset-[3px] rounded-[50%] border border-current opacity-60" />
      <span className="lm-caligrafia translate-y-[0.04em] text-[1.45em] leading-none">
        M
      </span>
    </span>
  );
}
