"use client";

import { Check, Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useDeferredValue, useEffect, useId, useState } from "react";
import { classes } from "@/lib/classes";
import {
  type Aviso,
  avaliarSenha,
  formatarTempo,
  gerarSenha,
} from "@/lib/senha";

const NIVEIS = ["muito fraca", "fraca", "razoável", "forte", "muito forte"];

const DICAS: Record<Aviso, string> = {
  curta:
    "Use 12 caracteres ou mais: cada um a mais multiplica o trabalho do ataque.",
  "um-tipo": "Misture letras maiúsculas e minúsculas, números e símbolos.",
  palavra:
    "Palavras, nomes e times são os primeiros testados, mesmo com 0 no lugar de o.",
  sequencia: "Sequências como 1234, abcd ou qwerty não contam como aleatórias.",
  repeticao: "Repetir o mesmo caractere quase não acrescenta nada.",
  ano: "Anos e datas de aniversário são fáceis de adivinhar.",
};

/**
 * Quanto tempo uma senha aguenta: a conta roda no navegador (lib/senha.ts) e
 * a senha não sai da página. O botão de gerar cria uma senha forte com o
 * sorteio criptográfico do navegador.
 */
export function TesteDeSenha() {
  const id = useId();
  const [senha, setSenha] = useState("");
  const [visivel, setVisivel] = useState(false);
  const [copiada, setCopiada] = useState(false);
  // A avaliação acompanha a digitação sem travar o campo.
  const avaliacao = avaliarSenha(useDeferredValue(senha));

  useEffect(() => {
    if (!copiada) return;
    const t = window.setTimeout(() => setCopiada(false), 2000);
    return () => window.clearTimeout(t);
  }, [copiada]);

  const nivel = avaliacao?.nivel ?? -1;

  return (
    <div className="rd-cartao p-5 sm:p-8">
      <label htmlFor={`${id}-senha`} className="rd-rotulo">
        digite uma senha
      </label>
      <div className="mt-3 flex items-stretch gap-2">
        <input
          id={`${id}-senha`}
          type={visivel ? "text" : "password"}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-describedby={`${id}-privacidade`}
          className="rd-campo min-w-0 flex-1 font-mono text-[1.0625rem]"
        />
        <button
          type="button"
          onClick={() => setVisivel((v) => !v)}
          aria-pressed={visivel}
          className="rd-botao-icone"
        >
          {visivel ? (
            <EyeOff aria-hidden className="size-5" strokeWidth={1.5} />
          ) : (
            <Eye aria-hidden className="size-5" strokeWidth={1.5} />
          )}
          <span className="sr-only">Mostrar a senha</span>
        </button>
      </div>
      <p
        id={`${id}-privacidade`}
        className="mt-3 text-[0.8125rem] text-white/50"
      >
        A senha não sai do seu navegador: nada é enviado nem guardado.
      </p>

      {/* O medidor: cinco degraus, acesos até o nível da senha. */}
      <div className="mt-8 flex items-center gap-4">
        <div aria-hidden className="grid flex-1 grid-cols-5 gap-1.5">
          {NIVEIS.map((n, i) => (
            <span
              key={n}
              className={classes(
                "rd-degrau h-1.5 rounded-full",
                i <= nivel ? "bg-white" : "bg-white/12",
              )}
            />
          ))}
        </div>
        <span className="w-24 text-right text-sm text-white/70">
          {avaliacao ? NIVEIS[nivel] : "sem senha"}
        </span>
      </div>

      <div aria-live="polite" className="mt-8">
        <p className="text-sm text-white/70">
          um computador dedicado a isso levaria
        </p>
        <p className="rd-tempo mt-2 text-[clamp(2.5rem,1.6rem+4vw,4.5rem)] font-medium">
          {avaliacao ? formatarTempo(avaliacao.segundos) : "—"}
        </p>
        <p className="mt-2 text-sm text-white/70">
          para descobrir a sua senha, testando 10 bilhões por segundo
        </p>
      </div>

      {avaliacao && avaliacao.avisos.length > 0 && (
        <ul className="mt-6 grid gap-2 border-t border-white/10 pt-6">
          {avaliacao.avisos.map((a) => (
            <li
              key={a}
              className="grid grid-cols-[1rem_minmax(0,1fr)] gap-3 text-[0.9375rem] leading-relaxed text-white/80"
            >
              <span aria-hidden className="mt-[0.6rem] h-px w-3 bg-white/50" />
              {DICAS[a]}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setSenha(gerarSenha());
            setVisivel(true);
            setCopiada(false);
          }}
          className="rd-botao rd-botao-branco"
        >
          <RefreshCw aria-hidden className="size-4" strokeWidth={1.75} />
          gerar uma senha forte
        </button>
        {senha && (
          <button
            type="button"
            onClick={() => {
              navigator.clipboard
                ?.writeText(senha)
                .then(() => setCopiada(true))
                .catch(() => {});
            }}
            className="rd-botao rd-botao-escuro"
          >
            {copiada ? (
              <Check aria-hidden className="size-4" strokeWidth={1.75} />
            ) : (
              <Copy aria-hidden className="size-4" strokeWidth={1.75} />
            )}
            {copiada ? "copiada" : "copiar"}
          </button>
        )}
      </div>
    </div>
  );
}
