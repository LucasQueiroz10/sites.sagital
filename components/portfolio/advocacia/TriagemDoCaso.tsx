"use client";

import { ArrowLeft, ArrowRight, MessageCircle, RotateCcw } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { OpcaoDaTriagem } from "@/data/portfolio/advocacia";
import { classes } from "@/lib/classes";
import { linkDoPortfolio } from "@/lib/whatsapp";

type Props = {
  nomeDoSite: string;
  assuntos: OpcaoDaTriagem[];
  situacoes: OpcaoDaTriagem[];
  formatos: OpcaoDaTriagem[];
  quando: OpcaoDaTriagem[];
};

type Respostas = {
  assunto?: string;
  situacao?: string;
  formato?: string;
  quando?: string;
};

const TOTAL = 3;

/**
 * Três perguntas e a mensagem sai pronta para o WhatsApp do escritório.
 * Nada é enviado antes do último botão; cada passo pode ser revisto.
 */
export function TriagemDoCaso({
  nomeDoSite,
  assuntos,
  situacoes,
  formatos,
  quando,
}: Props) {
  const id = useId();
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>({});
  const titulo = useRef<HTMLHeadingElement>(null);
  // Só depois de um clique em Continuar, Voltar ou Recomeçar: ao abrir a
  // página, o foco não pode puxar a rolagem até aqui.
  const focarPergunta = useRef(false);

  // A cada troca de passo, o foco vai para a pergunta nova.
  useEffect(() => {
    if (!focarPergunta.current) return;
    focarPergunta.current = false;
    titulo.current?.focus();
  }, [passo]);

  const irPara = (proximo: number) => {
    focarPergunta.current = true;
    setPasso(proximo);
  };

  const responder = (campo: keyof Respostas, valor: string) =>
    setRespostas((atuais) => ({ ...atuais, [campo]: valor }));

  const completo =
    passo === 0
      ? Boolean(respostas.assunto)
      : passo === 1
        ? Boolean(respostas.situacao)
        : Boolean(respostas.formato && respostas.quando);

  const mensagem = `Gostaria de agendar uma conversa sobre ${respostas.assunto}. Situação: ${respostas.situacao}. Prefiro conversar ${respostas.formato}, ${respostas.quando}.`;

  const grupo = (
    campo: keyof Respostas,
    opcoes: OpcaoDaTriagem[],
    legenda: string,
    colunas = "sm:grid-cols-2",
  ) => (
    <fieldset>
      <legend className="sr-only">{legenda}</legend>
      <div className={classes("grid gap-2", colunas)}>
        {opcoes.map((opcao) => (
          <label key={opcao.valor} className="cursor-pointer">
            <input
              type="radio"
              name={`${id}-${campo}`}
              value={opcao.valor}
              checked={respostas[campo] === opcao.valor}
              onChange={() => responder(campo, opcao.valor)}
              className="peer sr-only"
            />
            <span className="flex min-h-14 items-center gap-3 rounded-tema border border-white/20 px-4 py-3 text-[0.9375rem] transition-colors peer-checked:border-[var(--cor-salvia)] peer-checked:bg-[var(--cor-salvia)] peer-checked:text-[var(--cor-floresta)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white hover:border-white/50">
              {opcao.rotulo}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="rounded-tema border border-white/15 bg-white/[0.04] p-5 sm:p-8">
      {passo < TOTAL ? (
        <>
          <div className="flex items-center justify-between gap-4 text-sm text-white/70">
            <p aria-live="polite">
              Passo {passo + 1} de {TOTAL}
            </p>
            <div aria-hidden className="flex w-28 gap-1.5">
              {Array.from({ length: TOTAL }, (_, i) => (
                <span
                  key={i}
                  className={classes(
                    "h-1 flex-1 rounded-full transition-colors duration-300",
                    i <= passo ? "bg-[var(--cor-salvia)]" : "bg-white/15",
                  )}
                />
              ))}
            </div>
          </div>

          <h3
            ref={titulo}
            tabIndex={-1}
            className="mt-6 mb-5 font-titulo text-[1.75rem] leading-tight sm:text-[2rem]"
          >
            {passo === 0 && "Qual é o assunto?"}
            {passo === 1 && "Em que pé está?"}
            {passo === 2 && "Como prefere conversar?"}
          </h3>

          {passo === 0 && grupo("assunto", assuntos, "Assunto")}
          {passo === 1 && grupo("situacao", situacoes, "Situação")}
          {passo === 2 && (
            <div className="grid gap-5">
              {grupo("formato", formatos, "Formato da conversa")}
              <div>
                <p className="mb-2 text-sm text-white/70">Quando?</p>
                {grupo("quando", quando, "Quando")}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => irPara(Math.max(0, passo - 1))}
              className={classes(
                "inline-flex min-h-11 items-center gap-2 px-1 text-[0.9375rem] text-white/75 hover:text-white",
                passo === 0 && "invisible",
              )}
            >
              <ArrowLeft aria-hidden className="size-4" />
              Voltar
            </button>
            <button
              type="button"
              disabled={!completo}
              onClick={() => irPara(passo + 1)}
              className="inline-flex min-h-12 items-center gap-2 rounded-tema bg-[var(--cor-salvia)] px-6 font-medium text-[var(--cor-floresta)] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[var(--cor-salvia)]"
            >
              {passo === TOTAL - 1 ? "Ver resumo" : "Continuar"}
              <ArrowRight aria-hidden className="size-4" />
            </button>
          </div>
        </>
      ) : (
        <div>
          <h3
            ref={titulo}
            tabIndex={-1}
            className="font-titulo text-[1.75rem] leading-tight sm:text-[2rem]"
          >
            Sua mensagem está pronta
          </h3>
          <blockquote className="mt-5 border-l border-[var(--cor-salvia)] pl-5 text-lg leading-relaxed text-white/90">
            {mensagem}
          </blockquote>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={linkDoPortfolio(mensagem, nomeDoSite)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-tema bg-[var(--cor-salvia)] px-6 font-medium text-[var(--cor-floresta)] transition-colors hover:bg-white"
            >
              <MessageCircle aria-hidden className="size-5" />
              Enviar pelo WhatsApp
              <span className="sr-only"> (abre o WhatsApp)</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setRespostas({});
                irPara(0);
              }}
              className="inline-flex min-h-11 items-center gap-2 px-1 text-[0.9375rem] text-white/75 hover:text-white"
            >
              <RotateCcw aria-hidden className="size-4" />
              Recomeçar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
