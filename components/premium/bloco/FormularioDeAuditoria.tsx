"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useId, useState } from "react";
import { nome as nomeDaAgencia, servicos } from "@/data/bloco";
import { classes } from "@/lib/classes";
import { linkDoPremium } from "@/lib/whatsapp";

const NAO_SEI = "Ainda não sei, quero ajuda para escolher";

/** O rótulo fica dentro da caixa, no alto, sempre visível. */
const rotulo =
  "bl-rotulo pointer-events-none absolute top-2 left-3.5 text-[0.6875rem] text-[rgb(255_255_255/0.88)]";
const erro = "mt-1.5 text-[0.8125rem] font-medium text-white";

/**
 * O pedido de auditoria. Não guarda nada: monta a mensagem e abre o WhatsApp
 * da agência com tudo escrito. Os erros aparecem embaixo de cada campo só
 * depois da primeira tentativa de envio.
 */
export function FormularioDeAuditoria() {
  const ids = useId();
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [servico, setServico] = useState(NAO_SEI);
  const [site, setSite] = useState("");
  const [aceite, setAceite] = useState(false);
  const [tentou, setTentou] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const digitos = whatsapp.replace(/\D/g, "");
  const problemas = {
    nome: !nome.trim() && "Escreva o seu nome.",
    whatsapp:
      (digitos.length < 10 || digitos.length > 11) &&
      "Digite o número com DDD, só com números: 11 98765-4321.",
    aceite: !aceite && "Marque para a gente poder falar com você.",
  };
  const valido = !problemas.nome && !problemas.whatsapp && !problemas.aceite;

  const mensagem = [
    "Quero a auditoria gratuita do meu marketing.",
    `Nome: ${nome.trim()}`,
    `WhatsApp: ${whatsapp.trim()}`,
    `Interesse: ${servico}`,
    site.trim() && `Site ou Instagram: ${site.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setTentou(true);
        if (!valido) {
          const primeiro = (["nome", "whatsapp", "aceite"] as const).find(
            (c) => problemas[c],
          );
          document.getElementById(`${ids}-${primeiro}`)?.focus();
          return;
        }
        window.open(
          linkDoPremium(mensagem, nomeDaAgencia),
          "_blank",
          "noopener,noreferrer",
        );
        setEnviado(true);
      }}
      className="grid gap-3"
    >
      <div>
        <div className="relative">
          <label htmlFor={`${ids}-nome`} className={rotulo}>
            Nome
          </label>
          <input
            id={`${ids}-nome`}
            className="bl-entrada"
            autoComplete="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            aria-invalid={tentou && !!problemas.nome}
            aria-describedby={`${ids}-nome-erro`}
          />
        </div>
        <p id={`${ids}-nome-erro`} className={erro}>
          {tentou && problemas.nome}
        </p>
      </div>

      <div>
        <div className="relative">
          <label htmlFor={`${ids}-whatsapp`} className={rotulo}>
            WhatsApp com DDD
          </label>
          <input
            id={`${ids}-whatsapp`}
            className="bl-entrada"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            aria-invalid={tentou && !!problemas.whatsapp}
            aria-describedby={`${ids}-whatsapp-erro`}
          />
        </div>
        <p id={`${ids}-whatsapp-erro`} className={erro}>
          {tentou && problemas.whatsapp}
        </p>
      </div>

      <div className="relative">
        <label htmlFor={`${ids}-servico`} className={rotulo}>
          Serviço de interesse
        </label>
        <select
          id={`${ids}-servico`}
          className="bl-entrada bl-escolha"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
        >
          <option>{NAO_SEI}</option>
          {servicos.map((s) => (
            <option key={s.id}>{s.nome}</option>
          ))}
        </select>
      </div>

      <div className="relative">
        <label htmlFor={`${ids}-site`} className={rotulo}>
          Site ou Instagram (opcional)
        </label>
        <input
          id={`${ids}-site`}
          className="bl-entrada"
          autoComplete="url"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
      </div>

      <div className="mt-2">
        <label
          htmlFor={`${ids}-aceite`}
          className="flex min-h-11 cursor-pointer items-start gap-3 py-1 text-[0.875rem] leading-snug text-white"
        >
          <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center border border-white">
            <input
              id={`${ids}-aceite`}
              type="checkbox"
              checked={aceite}
              onChange={(e) => setAceite(e.target.checked)}
              aria-invalid={tentou && !!problemas.aceite}
              aria-describedby={`${ids}-aceite-erro`}
              className="peer absolute inset-0 cursor-pointer appearance-none"
            />
            <Check
              aria-hidden
              className="pointer-events-none size-3.5 scale-50 opacity-0 transition-[opacity,scale] duration-150 ease-out peer-checked:scale-100 peer-checked:opacity-100"
              strokeWidth={3}
            />
          </span>
          Concordo que a Bloco fale comigo pelo WhatsApp sobre a auditoria. Nada
          de lista de spam.
        </label>
        <p id={`${ids}-aceite-erro`} className={erro}>
          {tentou && problemas.aceite}
        </p>
      </div>

      <button
        type="submit"
        className="bl-botao bl-botao-branco mt-2 w-full sm:w-auto sm:justify-self-start"
      >
        Quero minha auditoria
        <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
        <span className="sr-only"> (abre o WhatsApp)</span>
      </button>

      <p
        role="status"
        className={classes("text-[0.875rem] text-white", !enviado && "sr-only")}
      >
        {enviado && (
          <>
            Abrimos o WhatsApp com o seu pedido escrito. Não abriu?{" "}
            <a
              href={linkDoPremium(mensagem, nomeDaAgencia)}
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
