import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Imagem } from "@/data/tipos";
import { BotaoSagital } from "./BotaoSagital";
import { rotulo, serifaItalica } from "./TituloDosPacotes";

type Props = {
  id: string;
  href: string;
  captura: Imagem;
  nome: string;
  /** Rótulo pequeno em caixa-alta, acima do nome (o ramo). */
  etiqueta: string;
  descricao: string;
  fonte: string;
  paleta: string[];
  /** Texto do botão de abrir; o complemento vai só para leitores de tela. */
  abrir: { rotulo: string; complemento: string };
  /** O olho da prévia ao vivo (os projetos premium ainda não têm). */
  previa?: ReactNode;
};

/**
 * Um cartão das listas de /demos e /trabalhos, no design das páginas
 * claras: a primeira tela no celular sobre o cinza, o nome em serifa
 * itálica, a paleta e a fonte, "Abrir" e o olho da prévia.
 */
export function CartaoDaLista({
  id,
  href,
  captura,
  nome,
  etiqueta,
  descricao,
  fonte,
  paleta,
  abrir,
  previa,
}: Props) {
  return (
    <article aria-labelledby={id} className="flex h-full flex-col">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-superficie px-6 pt-6"
      >
        <span className="relative block h-full overflow-hidden rounded-t-[1.25rem] shadow-[0_10px_30px_-8px_rgb(17_26_61/0.22),0_0_0_1px_rgb(17_26_61/0.06)]">
          <Image
            src={captura.src}
            alt={captura.alt}
            fill
            sizes="(min-width: 1024px) 16rem, (min-width: 640px) 44vw, 90vw"
            className="object-cover object-top transition-transform duration-[360ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.03]"
          />
        </span>
      </Link>

      <p className={`${rotulo} mt-5 text-texto-suave`}>{etiqueta}</p>
      <div className="mt-1.5 flex items-start justify-between gap-3">
        <h2
          id={id}
          className={`${serifaItalica} text-[1.625rem] leading-[1.05] text-[var(--sg-tinta-forte)]`}
        >
          {nome}
        </h2>
        <span aria-hidden className="mt-1 flex shrink-0">
          {paleta.map((cor) => (
            <span
              key={cor}
              className="-ml-1.5 size-5 rounded-full border-2 border-white shadow-[0_0_0_1px_var(--cor-borda)] first:ml-0"
              style={{ backgroundColor: cor }}
            />
          ))}
        </span>
      </div>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-texto-suave">
        {descricao}
      </p>
      <p className="mt-1.5 text-[0.8125rem] text-[var(--sg-terciario)]">
        Fonte {fonte}
      </p>

      <div className="mt-auto flex gap-2 pt-5">
        <BotaoSagital
          href={href}
          variante="escuro"
          tamanho="medio"
          className="flex-1"
        >
          {abrir.rotulo}
          <span className="sr-only"> {abrir.complemento}</span>
        </BotaoSagital>
        {previa}
      </div>
    </article>
  );
}
