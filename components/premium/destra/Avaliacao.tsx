"use client";

import { Check } from "lucide-react";
import { useId, useState } from "react";
import {
  acabamentos,
  niveis,
  nome as nomeDaEmpresa,
  pegadas,
  situacoes,
} from "@/data/destra";
import { linkDoPremium } from "@/lib/whatsapp";
import { descreverTamanho } from "./Configurador";
import { escolher, useEscolha } from "./escolha";

const erro = "mt-1.5 min-h-[1.25rem] text-[0.8125rem] text-[#b42318]";

/**
 * Agendar a avaliação gratuita. Chega preenchido com a mão montada e a pegada
 * escolhida antes, e manda tudo pelo WhatsApp.
 */
export function Avaliacao() {
  const ids = useId();
  const escolha = useEscolha();
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [marcadas, setMarcadas] = useState<string[]>([]);
  const [mensagemLivre, setMensagemLivre] = useState("");
  const [tentou, setTentou] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const problemas = {
    nome: !nome.trim() && "Escreva seu nome.",
    cidade:
      !cidade.trim() && "Escreva a cidade, para acharmos a clínica mais perto.",
  };
  const ordem = ["nome", "cidade"] as const;
  const valido = ordem.every((c) => !problemas[c]);

  const nivel = niveis.find((n) => n.id === escolha.nivel)?.nome ?? "";
  const acabamento =
    acabamentos.find((a) => a.id === escolha.acabamento)?.nome ?? "";
  const pegada = pegadas.find((p) => p.id === escolha.pegada);
  const resumoDaMao = `Mão ${escolha.lado}, ${nivel.toLowerCase()}, ${descreverTamanho(escolha.medida).toLowerCase()}, acabamento ${acabamento.toLowerCase()}`;

  const mensagem = [
    "Quero agendar uma avaliação gratuita.",
    `Nome: ${nome.trim()}`,
    `Cidade: ${cidade.trim()}`,
    escolha.montada && `Montei no site: ${resumoDaMao}.`,
    pegada &&
      pegada.id !== "aberta" &&
      `Pegada que mais me interessa: ${pegada.nome.toLowerCase()}.`,
    marcadas.length > 0 && `Situação: ${marcadas.join(", ").toLowerCase()}.`,
    mensagemLivre.trim() && `Mensagem: ${mensagemLivre.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const alternar = (item: string) =>
    setMarcadas((atual) =>
      atual.includes(item) ? atual.filter((i) => i !== item) : [...atual, item],
    );

  const campo = (
    chave: "nome" | "cidade",
    rotulo: string,
    valor: string,
    mudar: (v: string) => void,
    autoComplete: string,
  ) => (
    <div>
      <label htmlFor={`dt-${chave}`} className="dt-rotulo">
        {rotulo}
      </label>
      <input
        id={`dt-${chave}`}
        autoComplete={autoComplete}
        value={valor}
        onChange={(e) => mudar(e.target.value)}
        aria-invalid={tentou && !!problemas[chave]}
        aria-describedby={`${ids}-${chave}-erro`}
        className="dt-campo mt-2"
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
          document.getElementById(`dt-${primeiro}`)?.focus();
          return;
        }
        window.open(
          linkDoPremium(mensagem, nomeDaEmpresa),
          "_blank",
          "noopener,noreferrer",
        );
        setEnviado(true);
      }}
      className="dt-formulario"
    >
      <div className="grid gap-x-5 sm:grid-cols-2">
        {campo("nome", "Seu nome", nome, setNome, "name")}
        {campo("cidade", "Cidade", cidade, setCidade, "address-level2")}
      </div>

      <div className="dt-mao-levada">
        {escolha.montada ? (
          <>
            <p className="dt-rotulo">A mão que você montou</p>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed">
              {resumoDaMao}
            </p>
            <button
              type="button"
              className="dt-link mt-2"
              onClick={() => escolher({ montada: false })}
            >
              Deixar para a avaliação
            </button>
          </>
        ) : (
          <>
            <p className="dt-rotulo">A mão</p>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-black/65">
              Ainda não escolheu? Tudo bem: a terapeuta define nível, tamanho e
              encaixe com você. Se quiser adiantar,{" "}
              <a href="#monte" className="dt-link">
                monte a sua
              </a>
              .
            </p>
          </>
        )}
      </div>

      <fieldset>
        <legend className="dt-rotulo">O seu caso (opcional)</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {situacoes.map((s) => (
            <label key={s} className="dt-ficha">
              <input
                type="checkbox"
                checked={marcadas.includes(s)}
                onChange={() => alternar(s)}
                className="sr-only"
              />
              <Check
                aria-hidden
                className="dt-ficha-icone size-3.5"
                strokeWidth={2.5}
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${ids}-mensagem`} className="dt-rotulo">
          Quer contar mais alguma coisa? (opcional)
        </label>
        <textarea
          id={`${ids}-mensagem`}
          rows={3}
          value={mensagemLivre}
          onChange={(e) => setMensagemLivre(e.target.value)}
          className="dt-campo mt-2 resize-y py-3"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" className="dt-botao dt-botao-cheio">
          Agendar pelo WhatsApp
        </button>
        <p role="status" className="text-[0.875rem] text-black/65">
          {enviado
            ? "Abrimos o WhatsApp com a mensagem pronta. É só enviar."
            : "A avaliação é gratuita e sem compromisso."}
        </p>
      </div>
    </form>
  );
}
