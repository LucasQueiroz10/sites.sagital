"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

/**
 * "Entrar": acesso por link no e-mail, sem senha. O site é conceitual, então
 * nenhuma mensagem sai de verdade; a confirmação diz isso com todas as letras.
 */
export function DialogoDeEntrada({
  aberto,
  aoFechar,
}: {
  aberto: boolean;
  aoFechar: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;
    if (aberto && !dialogo.open) dialogo.showModal();
    if (!aberto && dialogo.open) dialogo.close();
  }, [aberto]);

  return (
    <dialog
      ref={ref}
      className="pa-dialogo"
      aria-labelledby={`${id}-titulo`}
      onClose={() => {
        aoFechar();
        setEnviado(false);
      }}
      onClick={(e) => {
        // Clique no fundo escurecido fecha.
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h2
            id={`${id}-titulo`}
            className="text-[1.375rem] font-medium tracking-[-0.02em] text-white"
          >
            {enviado ? "Confira seu e-mail" : "Entrar na Paralelo"}
          </h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="-mt-1 -mr-2 grid size-10 place-items-center rounded-full text-[var(--texto-suave)] transition-colors hover:bg-white/5 hover:text-white"
          >
            <X aria-hidden className="size-5" strokeWidth={1.5} />
            <span className="sr-only">Fechar</span>
          </button>
        </div>

        {enviado ? (
          <div aria-live="polite">
            <p className="mt-3 leading-relaxed text-[var(--texto-suave)]">
              Se houver uma conta com este e-mail, o link de acesso chega em
              instantes e vale por 15 minutos:
            </p>
            <p className="mt-2 font-medium [overflow-wrap:anywhere] text-white">
              {email}
            </p>
            <p className="mt-4 rounded-2xl border border-[var(--linha)] bg-white/[0.03] px-4 py-3 text-[0.875rem] leading-relaxed text-[var(--texto-suave)]">
              Este é um site conceitual: nenhum e-mail é enviado de verdade.
            </p>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="pa-botao pa-botao-branco mt-6 w-full"
            >
              Entendi
            </button>
          </div>
        ) : (
          <form
            className="mt-2"
            onSubmit={(e) => {
              e.preventDefault();
              setEnviado(true);
            }}
          >
            <p className="leading-relaxed text-[var(--texto-suave)]">
              Sem senha: mandamos um link de acesso para o seu e-mail.
            </p>
            <label
              htmlFor={`${id}-email`}
              className="mt-5 block text-[0.875rem] font-medium text-white"
            >
              E-mail da conta
            </label>
            <input
              id={`${id}-email`}
              type="email"
              required
              autoComplete="email"
              placeholder="voce@empresa.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pa-campo mt-2"
            />
            <button
              type="submit"
              className="pa-botao pa-botao-branco mt-5 w-full"
            >
              Receber link de acesso
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
