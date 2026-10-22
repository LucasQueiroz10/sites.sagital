"use client";

import { ArrowUpRight } from "lucide-react";
import { useId, useState, type CSSProperties } from "react";
import type { Categoria } from "@/data/portfolio/arquitetura";
import { classes } from "@/lib/classes";
import { linkDoPortfolio } from "@/lib/whatsapp";

type Props = {
  nomeDoSite: string;
  tipos: { valor: Categoria; rotulo: string }[];
  area: { minima: number; maxima: number; inicial: number; passo: number };
  etapas: { valor: string; rotulo: string }[];
};

const artigo: Record<Categoria, string> = {
  residencial: "uma casa",
  interiores: "um projeto de interiores",
  corporativo: "um escritório",
};

/**
 * Tipo, área e escopo: três escolhas e o primeiro contato sai pronto, com a
 * descrição do projeto que a pessoa tem em mente.
 */
export function ConversaSobreProjeto({
  nomeDoSite,
  tipos,
  area,
  etapas,
}: Props) {
  const id = useId();
  const [tipo, setTipo] = useState<Categoria>(tipos[0]?.valor ?? "residencial");
  const [metros, setMetros] = useState(area.inicial);
  const [etapa, setEtapa] = useState(etapas[0]?.valor ?? "só do projeto");

  const mensagem = `Quero conversar sobre ${artigo[tipo]} de cerca de ${metros} m². Preciso ${etapa}.`;
  const progresso =
    ((metros - area.minima) / (area.maxima - area.minima)) * 100;

  const opcao = (marcado: boolean) =>
    classes(
      "flex min-h-12 items-center justify-center border px-4 text-center text-[0.9375rem] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white",
      marcado
        ? "border-[var(--cor-cal)] bg-[var(--cor-cal)] text-[var(--cor-grafite)]"
        : "border-white/25 hover:border-white/60",
    );

  return (
    <div className="grid gap-8">
      <fieldset className="min-w-0">
        <legend className="mb-3 text-sm text-white/65">
          O que você quer construir?
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {tipos.map((item) => (
            <label key={item.valor} className="cursor-pointer">
              <input
                type="radio"
                name={`${id}-tipo`}
                value={item.valor}
                checked={tipo === item.valor}
                onChange={() => setTipo(item.valor)}
                className="peer sr-only"
              />
              <span className={opcao(tipo === item.valor)}>{item.rotulo}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <label htmlFor={`${id}-area`} className="text-sm text-white/65">
            Área aproximada
          </label>
          <output
            htmlFor={`${id}-area`}
            className="numero text-[2rem] leading-none font-medium tracking-[-0.03em]"
          >
            {metros}
            <span className="ml-1 text-base text-white/65">m²</span>
          </output>
        </div>
        <input
          id={`${id}-area`}
          type="range"
          min={area.minima}
          max={area.maxima}
          step={area.passo}
          value={metros}
          onChange={(evento) => setMetros(Number(evento.target.value))}
          style={{ "--progresso": `${progresso}%` } as CSSProperties}
          className="regua w-full"
        />
        <div className="numero mt-2 flex justify-between text-xs text-white/50">
          <span>{area.minima} m²</span>
          <span>{area.maxima} m² ou mais</span>
        </div>
      </div>

      <fieldset className="min-w-0">
        <legend className="mb-3 text-sm text-white/65">Escopo</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {etapas.map((item) => (
            <label key={item.valor} className="cursor-pointer">
              <input
                type="radio"
                name={`${id}-etapa`}
                value={item.valor}
                checked={etapa === item.valor}
                onChange={() => setEtapa(item.valor)}
                className="peer sr-only"
              />
              <span className={opcao(etapa === item.valor)}>{item.rotulo}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="border-t border-white/15 pt-6">
        <p className="text-sm text-white/65">A mensagem vai assim:</p>
        <p aria-live="polite" className="mt-2 text-lg leading-relaxed">
          “{mensagem}”
        </p>
        <a
          href={linkDoPortfolio(mensagem, nomeDoSite)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 items-center gap-2 bg-[var(--cor-cal)] px-6 font-medium text-[var(--cor-grafite)] transition-colors hover:bg-white"
        >
          Enviar pelo WhatsApp
          <ArrowUpRight aria-hidden className="size-4" />
          <span className="sr-only"> (abre o WhatsApp)</span>
        </a>
      </div>
    </div>
  );
}
