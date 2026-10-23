"use client";

import { Check, Copy, QrCode } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { fecharDialogo } from "@/lib/movimento";
import { BotaoSagital } from "./BotaoSagital";
import { CodigoQr } from "./CodigoQr";

type DadosDoQr = {
  /** Link do demo personalizado; null enquanto ainda está sendo montado. */
  link: string | null;
  /** Ramo do demo, ex.: "Academia". */
  rotulo: string;
  /** Nome que o demo mostra. */
  nomeExibido: string;
};

/**
 * O QR do demo com a instrução e o link em mono: o mesmo bloco na folha do
 * QR e no cartão do /gerar. Na impressão, só nome, ramo, QR e instrução.
 */
export function ConteudoDoQr({ link, rotulo, nomeExibido }: DadosDoQr) {
  return (
    <div className="grid w-full justify-items-center gap-3 text-center">
      <p className="hidden text-3xl font-bold print:block">{nomeExibido}</p>
      <p className="hidden text-lg print:block">
        Veja o site demonstrativo de {rotulo.toLowerCase()}
      </p>
      <div className="w-full max-w-[15rem] rounded-2xl bg-superficie p-4 print:max-w-[9cm] print:bg-white print:p-0">
        {link ? (
          <CodigoQr
            texto={link}
            rotulo={`QR code do demo de ${rotulo.toLowerCase()} para ${nomeExibido}`}
            className="w-full"
          />
        ) : (
          <div aria-hidden className="qr-fantasma aspect-square w-full" />
        )}
      </div>
      <p className="text-sm font-semibold text-texto">
        Aponte a câmera do celular
      </p>
      <p
        className="w-full truncate font-mono text-xs text-texto-suave"
        title={link ?? undefined}
      >
        {link ?? "Montando o link…"}
      </p>
    </div>
  );
}

/**
 * O botão "QR code" e a folha que ele abre: sobe de baixo no celular e
 * aparece no centro a partir de 640px, com o QR, o copiar e o fechar.
 */
export function QrDoDemo({
  link,
  rotulo,
  nomeExibido,
  className,
}: DadosDoQr & { className?: string }) {
  const folhaDoQr = useRef<HTMLDialogElement>(null);
  const idDoTitulo = useId();
  const [copiado, setCopiado] = useState(false);

  // O "Link copiado" volta a "Copiar link" sozinho em 2s.
  useEffect(() => {
    if (!copiado) return;
    const tempo = window.setTimeout(() => setCopiado(false), 2000);
    return () => window.clearTimeout(tempo);
  }, [copiado]);

  async function copiar() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopiado(true);
    } catch {
      // Sem permissão de cópia: o link inteiro continua à vista na folha.
    }
  }

  /** A folha do QR desce de volta (no desktop, some com um leve recuo). */
  function fecharFolha() {
    const el = folhaDoQr.current;
    if (!el) return;
    const desktop = window.matchMedia("(min-width: 640px)").matches;
    void fecharDialogo(
      el,
      desktop
        ? [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(16px)" },
          ]
        : [{ transform: "translateY(0)" }, { transform: "translateY(100%)" }],
      desktop ? 160 : 220,
    );
  }

  return (
    <>
      <BotaoSagital
        variante="secundario"
        tamanho="medio"
        onClick={() => folhaDoQr.current?.showModal()}
        disabled={!link}
        className={className}
      >
        <QrCode aria-hidden className="size-[18px]" strokeWidth={1.75} />
        QR code
      </BotaoSagital>
      <dialog
        ref={folhaDoQr}
        aria-labelledby={idDoTitulo}
        className="sg-dialogo fixed inset-x-0 top-auto bottom-0 m-0 w-full max-w-none rounded-t-3xl bg-white px-4 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-texto shadow-[var(--sg-sombra-folha)] sm:inset-0 sm:m-auto sm:max-w-sm sm:rounded-3xl sm:px-6 sm:pt-6"
        onCancel={(e) => {
          e.preventDefault();
          fecharFolha();
        }}
        onClick={(e) => {
          // Só o toque no fundo escurecido fecha: o recheio da folha também
          // tem o <dialog> como alvo, então confere se o ponto ficou fora.
          const caixa = e.currentTarget.getBoundingClientRect();
          const fora =
            e.clientX < caixa.left ||
            e.clientX > caixa.right ||
            e.clientY < caixa.top ||
            e.clientY > caixa.bottom;
          if (e.target === e.currentTarget && fora) fecharFolha();
        }}
      >
        <span
          aria-hidden
          className="mx-auto mb-3 block h-1 w-9 rounded-full bg-[var(--cor-borda)] sm:hidden"
        />
        <h2 id={idDoTitulo} className="text-lg font-bold tracking-[-0.01em]">
          QR code do demo
        </h2>
        <p className="mt-1 mb-5 text-sm text-texto-suave">
          {rotulo} com o nome {nomeExibido}. O cliente aponta a câmera e abre no
          celular dele.
        </p>
        <ConteudoDoQr link={link} rotulo={rotulo} nomeExibido={nomeExibido} />
        <div className="mt-5 grid gap-2">
          <BotaoSagital variante="secundario" onClick={copiar}>
            {copiado ? (
              <Check aria-hidden className="sg-confirma size-5" />
            ) : (
              <Copy aria-hidden className="size-5" strokeWidth={1.75} />
            )}
            {copiado ? "Link copiado" : "Copiar link"}
          </BotaoSagital>
          <BotaoSagital variante="contorno" onClick={fecharFolha}>
            Fechar
          </BotaoSagital>
        </div>
      </dialog>
    </>
  );
}
