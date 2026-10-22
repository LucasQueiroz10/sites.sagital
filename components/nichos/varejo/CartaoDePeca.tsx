"use client";

import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { Botao } from "@/components/ui/Botao";
import type { DadosDoVarejo, Peca, Tamanho } from "@/data/tipos";
import { classes } from "@/lib/classes";
import { formatarPreco, parcelar } from "@/lib/formato";

type Props = {
  peca: Peca;
  parcelamento: DadosDoVarejo["parcelamento"];
  rotuloDoNicho: string;
  /** Classes de largura do item na trilha. */
  className?: string;
};

/**
 * Uma peça da vitrine: foto 3:4, preço com parcelas, tamanhos em pílula e o
 * pedido pelo WhatsApp com a peça, o tamanho e o preço já escritos.
 */
export function CartaoDePeca({
  peca,
  parcelamento,
  rotuloDoNicho,
  className,
}: Props) {
  const id = useId();
  const grade = useRef<HTMLFieldSetElement>(null);
  const [tamanho, setTamanho] = useState<Tamanho | null>(null);
  const [semTamanho, setSemTamanho] = useState(false);

  const preco = formatarPreco(peca.preco);
  const parcelas = parcelar(
    peca.preco,
    parcelamento.vezes,
    parcelamento.parcelaMinima,
  );
  const desconto =
    peca.precoAntigo && peca.precoAntigo > peca.preco
      ? Math.round((1 - peca.preco / peca.precoAntigo) * 100)
      : null;

  function pedirSemTamanho() {
    setSemTamanho(true);
    grade.current
      ?.querySelector<HTMLInputElement>("input:not(:disabled)")
      ?.focus();
  }

  return (
    <li className={classes("flex shrink-0 snap-start flex-col", className)}>
      <div className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-superficie">
        <Image
          src={peca.imagem.src}
          alt={peca.imagem.alt}
          fill
          sizes="(min-width: 1280px) 296px, (min-width: 1024px) 23vw, (min-width: 640px) 17rem, 68vw"
          style={{ objectPosition: peca.foco }}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          placeholder="blur"
        />
        {(desconto !== null || peca.selo) && (
          <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1.5">
            {desconto !== null && (
              <span className="vidro numero rounded-full px-2.5 py-1 text-xs font-bold">
                −{desconto}%
              </span>
            )}
            {peca.selo && (
              <span className="rounded-full border border-[var(--cor-fio)] bg-fundo px-2.5 py-1 text-xs font-semibold">
                {peca.selo}
              </span>
            )}
          </div>
        )}
      </div>

      <h3 className="mt-3 text-[0.9375rem] leading-snug font-medium tracking-normal">
        {peca.nome}
      </h3>
      <p className="numero mt-1.5 flex flex-wrap items-baseline gap-x-2">
        <span
          className={classes(
            "text-lg font-bold",
            desconto !== null && "text-destaque",
          )}
        >
          {preco}
        </span>
        {peca.precoAntigo && (
          <s className="text-sm text-texto-suave">
            {formatarPreco(peca.precoAntigo)}
            <span className="sr-only"> (preço anterior)</span>
          </s>
        )}
      </p>
      <p className="numero text-sm text-texto-suave">
        {parcelas
          ? `ou ${parcelas.vezes}x de ${formatarPreco(parcelas.valor)} sem juros`
          : "à vista no Pix ou no cartão"}
      </p>

      <fieldset
        ref={grade}
        className="mt-3"
        aria-describedby={semTamanho ? `${id}-aviso` : undefined}
      >
        <legend className="sr-only">Tamanho de {peca.nome}</legend>
        <div className="flex flex-wrap gap-1.5">
          {peca.tamanhos.map((opcao) => {
            const esgotado = peca.esgotados?.includes(opcao) ?? false;
            return (
              <label key={opcao}>
                <input
                  type="radio"
                  name={`${id}-tamanho`}
                  value={opcao}
                  disabled={esgotado}
                  checked={tamanho === opcao}
                  onChange={() => {
                    setTamanho(opcao);
                    setSemTamanho(false);
                  }}
                  className="peer sr-only"
                />
                <span
                  className={classes(
                    "grid size-11 cursor-pointer place-items-center rounded-full border border-[var(--cor-fio)] text-sm font-semibold transition-colors duration-150",
                    "hover:border-texto peer-checked:border-texto peer-checked:bg-texto peer-checked:text-fundo",
                    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-destaque",
                    "peer-disabled:cursor-not-allowed peer-disabled:border-borda peer-disabled:text-[#a3a3a3] peer-disabled:line-through",
                  )}
                >
                  {opcao}
                </span>
                {esgotado && <span className="sr-only"> (esgotado)</span>}
              </label>
            );
          })}
        </div>
      </fieldset>
      <p
        id={`${id}-aviso`}
        aria-live="polite"
        className="mt-2 min-h-5 text-sm font-medium"
      >
        {semTamanho && "Escolha um tamanho para pedir."}
      </p>

      <div className="mt-auto pt-2">
        {tamanho ? (
          <BotaoWhatsApp
            acao={{
              rotulo: `Pedir tamanho ${tamanho}`,
              pedido: `Quero a peça ${peca.nome}, tamanho ${tamanho}, por ${preco}.`,
            }}
            rotuloDoNicho={rotuloDoNicho}
            complementoAcessivel={peca.nome}
            className="w-full"
          />
        ) : (
          <Botao onClick={pedirSemTamanho} className="w-full">
            <MessageCircle aria-hidden className="size-5 shrink-0" />
            Pedir no WhatsApp
            <span className="sr-only"> {peca.nome}</span>
          </Botao>
        )}
      </div>
    </li>
  );
}
