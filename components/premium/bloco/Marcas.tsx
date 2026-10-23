import { Leaf, Sparkles } from "lucide-react";
import { clientes } from "@/data/bloco";
import { classes } from "@/lib/classes";

/**
 * O símbolo da Bloco: um bloco 2x2 visto de cima, com os quatro pinos
 * vazados. Em laranja por padrão; segue currentColor com `cor="texto"`.
 */
export function SimboloBloco({
  className,
  cor = "laranja",
}: {
  className?: string;
  cor?: "laranja" | "texto";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill={cor === "laranja" ? "var(--cor-laranja)" : "currentColor"}
    >
      <path
        fillRule="evenodd"
        d="M4 1h16a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Zm4 4.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm8 0a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm-8 8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm8 0a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z"
      />
    </svg>
  );
}

/** Símbolo e nome, como no cabeçalho das referências. */
export function MarcaBloco({
  className,
  tamanho = "normal",
}: {
  className?: string;
  tamanho?: "normal" | "grande";
}) {
  return (
    <span
      className={classes(
        "inline-flex items-center gap-2 font-[family-name:var(--font-quadrada)] font-semibold tracking-[0.06em] uppercase [font-stretch:100%]",
        tamanho === "grande" ? "text-[1.75rem]" : "text-[1.1875rem]",
        className,
      )}
    >
      <SimboloBloco
        className={tamanho === "grande" ? "size-8" : "size-[1.375rem]"}
      />
      Bloco
    </span>
  );
}

/**
 * As assinaturas dos clientes, cada uma com a sua letra, como a faixa de
 * logos das referências. Todas em cinza: quem dá a cor é a Bloco.
 */
export function FaixaDeClientes() {
  return (
    <ul
      aria-label="Clientes"
      className="grid grid-cols-2 items-center gap-x-6 gap-y-7 text-[#8a8a8a] sm:grid-cols-3 lg:flex lg:justify-between"
    >
      {clientes.map((c) => (
        <li key={c.nome} className="flex justify-center lg:justify-start">
          <Assinatura estilo={c.estilo} />
        </li>
      ))}
    </ul>
  );
}

function Assinatura({ estilo }: { estilo: string }) {
  switch (estilo) {
    case "algodao":
      return (
        <span className="font-[family-name:var(--font-neutra)] text-[1.125rem] leading-none font-light tracking-[-0.02em]">
          casa do <strong className="font-semibold">algodão</strong>
        </span>
      );
    case "pulso":
      return (
        <span className="font-[family-name:var(--font-quadrada)] text-[1.75rem] leading-none font-extrabold tracking-[0.02em] uppercase italic [font-stretch:70%]">
          Pulso
        </span>
      );
    case "limoeiro":
      return (
        <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-neutra)] text-[1.25rem] leading-none font-medium tracking-[-0.03em]">
          <Leaf aria-hidden className="size-5" strokeWidth={1.75} />
          limoeiro
        </span>
      );
    case "maree":
      return (
        <span className="font-[family-name:var(--font-quadrada)] text-[1.375rem] leading-none font-light tracking-[0.22em] uppercase [font-stretch:62.5%]">
          La Marée
        </span>
      );
    case "lume":
      return (
        <span className="inline-flex items-center gap-1 font-[family-name:var(--font-neutra)] text-[1.125rem] leading-none font-semibold tracking-[0.12em] uppercase">
          <Sparkles aria-hidden className="size-4" strokeWidth={2} />
          <span className="text-[0.6875rem] font-normal tracking-[0.04em] lowercase">
            ótica
          </span>
          Lume
        </span>
      );
    default:
      return (
        <span className="grid font-[family-name:var(--font-quadrada)] leading-[0.85] font-bold uppercase [font-stretch:100%]">
          <span className="text-[0.75rem] tracking-[0.3em]">Mercado</span>
          <span className="text-[1.5rem] tracking-[0.04em]">Faria</span>
        </span>
      );
  }
}
