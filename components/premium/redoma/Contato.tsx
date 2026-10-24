"use client";

import { TriangleAlert } from "lucide-react";
import { useEffect, useId, useState } from "react";
import {
  assuntosDoSuporte,
  interesses,
  nomeNoTexto as nomeDaEmpresa,
  planos,
} from "@/data/redoma";
import { type IdDoPlano, MAIOR_EQUIPE, MENOR_EQUIPE } from "@/lib/assinatura";
import { classes } from "@/lib/classes";
import { linkDoPremium } from "@/lib/whatsapp";
import { escolher, useEscolha } from "./escolha";

const erro = "mt-1.5 text-[0.8125rem] text-white";
const INCIDENTE = "incidente acontecendo agora";

/**
 * Começar ou pedir suporte, no mesmo formulário. Chega preenchido com o que a
 * pessoa escolheu antes (plano, equipe, ciclo e intenção) e manda tudo pelo
 * WhatsApp.
 */
export function Contato() {
  const ids = useId();
  const { plano, pessoas, ciclo, intencao } = useEscolha();
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [marcados, setMarcados] = useState<string[]>([interesses[0]]);
  const [assunto, setAssunto] = useState<string>(assuntosDoSuporte[0]);
  const [mensagemLivre, setMensagemLivre] = useState("");
  // O que está sendo digitado no número de pessoas: apagar para reescrever
  // não pode virar 1 no meio do caminho.
  const [rascunho, setRascunho] = useState<string | null>(null);
  const [tentou, setTentou] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // Quem chega direto pelo endereço #suporte já cai na aba de suporte.
  useEffect(() => {
    const lerEndereco = () => {
      if (window.location.hash === "#suporte")
        escolher({ intencao: "suporte" });
    };
    lerEndereco();
    window.addEventListener("hashchange", lerEndereco);
    return () => window.removeEventListener("hashchange", lerEndereco);
  }, []);

  const suporte = intencao === "suporte";
  const problemas = {
    nome: !nome.trim() && "Escreva seu nome.",
    empresa: !empresa.trim() && "Escreva o nome da empresa.",
    mensagem:
      suporte && !mensagemLivre.trim() && "Conte o que está acontecendo.",
  };
  const ordem = ["nome", "empresa", "mensagem"] as const;
  const valido = ordem.every((c) => !problemas[c]);
  const nomeDoPlano = planos.find((p) => p.id === plano)?.nome ?? "";

  const mensagem = (
    suporte
      ? [
          `Preciso de suporte: ${assunto}.`,
          `Nome: ${nome.trim()}`,
          `Empresa: ${empresa.trim()}`,
          `O que está acontecendo: ${mensagemLivre.trim()}`,
        ]
      : [
          `Quero começar no plano ${nomeDoPlano}, ${ciclo}, para ${pessoas} ${pessoas === 1 ? "pessoa" : "pessoas"}.`,
          `Nome: ${nome.trim()}`,
          `Empresa: ${empresa.trim()}`,
          marcados.length > 0 && `Interesse: ${marcados.join(", ")}`,
          mensagemLivre.trim() && `Mensagem: ${mensagemLivre.trim()}`,
        ]
  )
    .filter(Boolean)
    .join("\n");

  const alternar = (item: string) =>
    setMarcados((atual) =>
      atual.includes(item) ? atual.filter((i) => i !== item) : [...atual, item],
    );

  const campo = (
    chave: "nome" | "empresa",
    rotulo: string,
    valor: string,
    mudar: (v: string) => void,
    autoComplete: string,
  ) => (
    <div>
      <label htmlFor={`${ids}-${chave}`} className="rd-rotulo">
        {rotulo}
      </label>
      <input
        id={`${ids}-${chave}`}
        autoComplete={autoComplete}
        value={valor}
        onChange={(e) => mudar(e.target.value)}
        aria-invalid={tentou && !!problemas[chave]}
        aria-describedby={`${ids}-${chave}-erro`}
        className="rd-campo mt-2"
      />
      <p id={`${ids}-${chave}-erro`} className={erro}>
        {tentou && problemas[chave]}
      </p>
    </div>
  );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTentou(true);
        if (!valido) {
          const primeiro = ordem.find((c) => problemas[c]);
          document.getElementById(`${ids}-${primeiro}`)?.focus();
          return;
        }
        window.open(
          linkDoPremium(mensagem, nomeDaEmpresa),
          "_blank",
          "noopener,noreferrer",
        );
        setEnviado(true);
      }}
      className="rd-cartao grid gap-6 p-5 sm:p-8"
    >
      <div
        className="rd-alternador justify-self-start"
        role="group"
        aria-label="O que você quer"
      >
        <button
          type="button"
          aria-pressed={!suporte}
          onClick={() => escolher({ intencao: "comecar" })}
        >
          começar agora
        </button>
        <button
          type="button"
          aria-pressed={suporte}
          onClick={() => escolher({ intencao: "suporte" })}
        >
          pedir suporte
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {campo("nome", "seu nome", nome, setNome, "name")}
        {campo("empresa", "empresa", empresa, setEmpresa, "organization")}

        {suporte ? (
          <div className="sm:col-span-2">
            <label htmlFor={`${ids}-assunto`} className="rd-rotulo">
              assunto
            </label>
            <select
              id={`${ids}-assunto`}
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              className="rd-campo mt-2"
            >
              {assuntosDoSuporte.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <div>
              <label htmlFor={`${ids}-plano`} className="rd-rotulo">
                plano
              </label>
              <select
                id={`${ids}-plano`}
                value={plano}
                onChange={(e) =>
                  escolher({ plano: e.target.value as IdDoPlano })
                }
                className="rd-campo mt-2"
              >
                {planos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${ids}-pessoas`} className="rd-rotulo">
                pessoas na equipe
              </label>
              <input
                id={`${ids}-pessoas`}
                type="number"
                inputMode="numeric"
                min={MENOR_EQUIPE}
                max={MAIOR_EQUIPE}
                value={rascunho ?? pessoas}
                onChange={(e) => {
                  setRascunho(e.target.value);
                  const n = Math.round(Number(e.target.value));
                  if (e.target.value && n >= MENOR_EQUIPE && n <= MAIOR_EQUIPE)
                    escolher({ pessoas: n });
                }}
                onBlur={() => setRascunho(null)}
                className="rd-campo mt-2"
              />
            </div>
          </>
        )}
      </div>

      {suporte && assunto === INCIDENTE && (
        <div
          role="note"
          className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-3 rounded-2xl bg-white p-4 text-[0.9375rem] leading-relaxed text-black"
        >
          <TriangleAlert
            aria-hidden
            className="mt-0.5 size-5"
            strokeWidth={1.75}
          />
          <p>
            <strong className="font-medium">Antes de tudo:</strong> tire o
            computador da internet (cabo e Wi-Fi), não desligue da tomada e não
            pague o resgate. Depois mande a mensagem.
          </p>
        </div>
      )}

      {!suporte && (
        <fieldset>
          <legend className="rd-rotulo">o que mais importa agora</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {interesses.map((item) => (
              <label key={item} className="rd-ficha">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={marcados.includes(item)}
                  onChange={() => alternar(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div>
        <label htmlFor={`${ids}-mensagem`} className="rd-rotulo">
          {suporte ? "o que está acontecendo" : "algo mais"}{" "}
          {!suporte && <span className="text-white/50">(opcional)</span>}
        </label>
        <textarea
          id={`${ids}-mensagem`}
          rows={3}
          value={mensagemLivre}
          onChange={(e) => setMensagemLivre(e.target.value)}
          aria-invalid={tentou && !!problemas.mensagem}
          aria-describedby={`${ids}-mensagem-erro`}
          className="rd-campo mt-2 min-h-24 py-3 leading-relaxed"
        />
        <p id={`${ids}-mensagem-erro`} className={erro}>
          {tentou && problemas.mensagem}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" className="rd-botao rd-botao-branco">
          {suporte ? "chamar o suporte no WhatsApp" : "começar pelo WhatsApp"}
          <span className="sr-only"> (abre o WhatsApp)</span>
        </button>
        <p className="text-[0.8125rem] text-white/60">
          {suporte
            ? "Resposta em até 15 minutos no horário de suporte."
            : "Conta pronta no mesmo dia, sem instalar nada no servidor."}
        </p>
      </div>

      <p
        role="status"
        className={classes("text-[0.875rem] text-white", !enviado && "sr-only")}
      >
        {enviado && (
          <>
            Abrimos o WhatsApp com a sua mensagem escrita. Não abriu?{" "}
            <a
              href={linkDoPremium(mensagem, nomeDaEmpresa)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Tente por aqui
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
