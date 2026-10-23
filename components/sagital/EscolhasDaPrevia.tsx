"use client";

import { useEffect, useId, useRef, useState } from "react";
import { classes } from "@/lib/classes";
import type { Nicho } from "@/lib/link";
import { NOME_MAXIMO, validarNome } from "@/lib/tema";

/** Pausa na digitação antes de recarregar o demo com o nome novo. */
const PAUSA_DO_NOME = 600;

type Props = {
  demos: { nicho: Nicho; rotulo: string }[];
  nicho: Nicho;
  aoEscolherNicho: (nicho: Nicho) => void;
  nome: string;
  aoMudarNome: (nome: string) => void;
  /** Nome que o demo usa quando o campo fica em branco. */
  nomePadrao: string;
};

/**
 * O ramo e o nome, no alto da prévia ao vivo: o mesmo controle segmentado
 * escuro dos aparelhos e um campo de vidro. O nome vai para o demo depois de
 * uma pausa na digitação (ou no Enter e ao sair do campo), para o site não
 * recarregar a cada letra.
 */
export function EscolhasDaPrevia({
  demos,
  nicho,
  aoEscolherNicho,
  nome,
  aoMudarNome,
  nomePadrao,
}: Props) {
  const id = useId();
  const [rascunho, setRascunho] = useState(nome);
  const ultimoEnviado = useRef(nome);

  // Se o nome mudar por fora (outra parte da página), o campo acompanha.
  useEffect(() => {
    if (nome !== ultimoEnviado.current) {
      ultimoEnviado.current = nome;
      setRascunho(nome);
    }
  }, [nome]);

  function enviar(valor: string) {
    if (valor === ultimoEnviado.current) return;
    ultimoEnviado.current = valor;
    aoMudarNome(valor);
  }

  useEffect(() => {
    const tempo = window.setTimeout(() => enviar(rascunho), PAUSA_DO_NOME);
    return () => window.clearTimeout(tempo);
    // enviar só lê a ref e chama o pai; o que conta é o rascunho.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rascunho]);

  const comErro = rascunho.trim().length > 0 && !validarNome(rascunho);

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-2 px-4 pb-1 lg:grid-cols-[auto_minmax(0,22rem)] lg:justify-center lg:gap-3">
      <div
        role="radiogroup"
        aria-label="Ramo"
        className="flex gap-[3px] overflow-x-auto rounded-[10px] bg-[#0b1029]/70 p-[3px] [scrollbar-width:none]"
      >
        {demos.map((d) => {
          const marcado = d.nicho === nicho;
          return (
            <label key={d.nicho} className="relative flex-1 cursor-pointer">
              <input
                type="radio"
                name={`ramo-${id}`}
                value={d.nicho}
                checked={marcado}
                onChange={() => aoEscolherNicho(d.nicho)}
                className="peer sr-only"
              />
              <span
                className={classes(
                  "flex min-h-11 items-center justify-center rounded-lg px-3 text-sm whitespace-nowrap transition-colors duration-150",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-white",
                  marcado
                    ? "bg-white/16 font-semibold text-white shadow-[0_1px_2px_rgb(0_0_0/0.35)]"
                    : "font-medium text-white/65 hover:text-white",
                )}
              >
                {d.rotulo}
              </span>
            </label>
          );
        })}
      </div>

      <div
        className={classes(
          "flex min-h-[50px] items-center gap-3 rounded-[10px] bg-[#0b1029]/70 px-3.5 transition-shadow duration-150",
          comErro
            ? "shadow-[inset_0_0_0_1.5px_#ff8a80]"
            : "focus-within:shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.7)]",
        )}
      >
        <label
          htmlFor={`nome-${id}`}
          className="shrink-0 text-[0.8125rem] text-white/75"
        >
          Nome
        </label>
        <input
          id={`nome-${id}`}
          type="text"
          value={rascunho}
          onChange={(e) => setRascunho(e.target.value)}
          onBlur={() => enviar(rascunho)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              enviar(rascunho);
            }
          }}
          maxLength={NOME_MAXIMO}
          placeholder={nomePadrao}
          autoComplete="off"
          enterKeyHint="done"
          aria-invalid={comErro}
          aria-describedby={comErro ? `erro-${id}` : undefined}
          className="min-w-0 flex-1 bg-transparent text-base font-semibold text-white placeholder:font-medium placeholder:text-white/50 focus-visible:outline-none"
        />
      </div>
      {comErro && (
        <p
          id={`erro-${id}`}
          className="text-[0.8125rem] text-white/80 lg:col-span-2 lg:text-center"
        >
          Use só letras, números, espaços e &amp; &apos; - . O demo mostra o
          nome padrão.
        </p>
      )}
    </div>
  );
}
