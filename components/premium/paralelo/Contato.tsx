"use client";

import { useEffect, useId, useState } from "react";
import {
  type IdDoPlano,
  interesses,
  nome as nomeDaEmpresa,
  planos,
  volumes,
} from "@/data/paralelo";
import { classes } from "@/lib/classes";
import { linkDoPremium } from "@/lib/whatsapp";
import { escolher, useEscolha } from "./escolha";
import { Seta } from "./Seta";

const rotulo = "block text-[0.875rem] font-medium text-white";
const erro = "mt-1.5 text-[0.8125rem] text-[#fca5a5]";

/**
 * Abrir conta ou falar com vendas, no mesmo formulário. Chega preenchido com
 * o que a pessoa escolheu antes (plano e intenção) e manda tudo pelo WhatsApp.
 */
export function Contato() {
  const ids = useId();
  const { plano, intencao } = useEscolha();
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [volume, setVolume] = useState<string>(volumes[1]);
  const [marcados, setMarcados] = useState<string[]>([interesses[0]]);
  const [mensagemLivre, setMensagemLivre] = useState("");
  const [tentou, setTentou] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // Quem chega direto pelo endereço #vendas já cai na aba de vendas.
  useEffect(() => {
    const lerEndereco = () => {
      if (window.location.hash === "#vendas") escolher({ intencao: "vendas" });
    };
    lerEndereco();
    window.addEventListener("hashchange", lerEndereco);
    return () => window.removeEventListener("hashchange", lerEndereco);
  }, []);

  const vendas = intencao === "vendas";
  const problemas = {
    nome: !nome.trim() && "Escreva seu nome.",
    empresa: !empresa.trim() && "Escreva o nome da empresa.",
  };
  const valido = !problemas.nome && !problemas.empresa;
  const nomeDoPlano = planos.find((p) => p.id === plano)?.nome ?? "";

  const mensagem = [
    vendas
      ? "Quero falar com o time de vendas."
      : `Quero abrir uma conta no plano ${nomeDoPlano}.`,
    `Nome: ${nome.trim()}`,
    `Empresa: ${empresa.trim()}`,
    vendas && `Plano de interesse: ${nomeDoPlano}`,
    `Volume no exterior: ${volume}`,
    marcados.length > 0 && `Interesse: ${marcados.join(", ")}`,
    mensagemLivre.trim() && `Mensagem: ${mensagemLivre.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const alternar = (item: string) =>
    setMarcados((atual) =>
      atual.includes(item) ? atual.filter((i) => i !== item) : [...atual, item],
    );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTentou(true);
        if (!valido) {
          const primeiro = (["nome", "empresa"] as const).find(
            (c) => problemas[c],
          );
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
      className="pa-cartao grid gap-6 p-5 sm:p-8"
    >
      <div
        className="pa-alternador justify-self-start"
        role="group"
        aria-label="O que você quer"
      >
        <button
          type="button"
          aria-pressed={!vendas}
          onClick={() => escolher({ intencao: "conta" })}
        >
          Abrir conta
        </button>
        <button
          type="button"
          aria-pressed={vendas}
          onClick={() => escolher({ intencao: "vendas" })}
        >
          Falar com vendas
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${ids}-nome`} className={rotulo}>
            Seu nome
          </label>
          <input
            id={`${ids}-nome`}
            autoComplete="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            aria-invalid={tentou && !!problemas.nome}
            aria-describedby={`${ids}-nome-erro`}
            className="pa-campo mt-2"
          />
          <p id={`${ids}-nome-erro`} className={erro}>
            {tentou && problemas.nome}
          </p>
        </div>
        <div>
          <label htmlFor={`${ids}-empresa`} className={rotulo}>
            Empresa
          </label>
          <input
            id={`${ids}-empresa`}
            autoComplete="organization"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            aria-invalid={tentou && !!problemas.empresa}
            aria-describedby={`${ids}-empresa-erro`}
            className="pa-campo mt-2"
          />
          <p id={`${ids}-empresa-erro`} className={erro}>
            {tentou && problemas.empresa}
          </p>
        </div>
        <div>
          <label htmlFor={`${ids}-plano`} className={rotulo}>
            Plano
          </label>
          <select
            id={`${ids}-plano`}
            value={plano}
            onChange={(e) => escolher({ plano: e.target.value as IdDoPlano })}
            className="pa-campo mt-2"
          >
            {planos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${ids}-volume`} className={rotulo}>
            Quanto passa pelo exterior
          </label>
          <select
            id={`${ids}-volume`}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="pa-campo mt-2"
          >
            {volumes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className={rotulo}>O que você precisa</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {interesses.map((item) => (
            <label key={item} className="pa-ficha">
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

      <div className={classes(!vendas && "hidden")}>
        <label htmlFor={`${ids}-mensagem`} className={rotulo}>
          Conte um pouco da operação{" "}
          <span className="font-normal text-[var(--texto-suave)]">
            (opcional)
          </span>
        </label>
        <textarea
          id={`${ids}-mensagem`}
          rows={3}
          value={mensagemLivre}
          onChange={(e) => setMensagemLivre(e.target.value)}
          className="pa-campo mt-2 min-h-24 py-3 leading-relaxed"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" className="pa-botao pa-botao-branco">
          {vendas ? "Chamar vendas no WhatsApp" : "Abrir conta pelo WhatsApp"}
          <Seta className="pa-seta h-[11px] w-[13px]" />
          <span className="sr-only"> (abre o WhatsApp)</span>
        </button>
        <p className="text-[0.8125rem] text-[var(--texto-suave)]">
          {vendas
            ? "Resposta em até 1 hora útil."
            : "Conta aberta em até 1 dia útil, sem papelada."}
        </p>
      </div>

      <p
        role="status"
        className={classes("text-[0.875rem] text-white", !enviado && "sr-only")}
      >
        {enviado && (
          <>
            Abrimos o WhatsApp com o seu pedido escrito. Não abriu?{" "}
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
