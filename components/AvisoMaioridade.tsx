"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { NomeDoEstabelecimento } from "@/components/TemaDoNicho";
import { Botao } from "@/components/ui/Botao";
import type { Imagem } from "@/data/tipos";

const CHAVE = "sagital:tabacaria:maioridade";

function lerConfirmacao(): boolean {
  try {
    return window.sessionStorage.getItem(CHAVE) === "confirmada";
  } catch {
    // Armazenamento bloqueado (aba anônima, cookies desligados): pergunta de novo.
    return false;
  }
}

function salvarConfirmacao() {
  try {
    window.sessionStorage.setItem(CHAVE, "confirmada");
  } catch {
    // Sem armazenamento, a confirmação vale só enquanto a página estiver aberta.
  }
}

const assinarNada = () => () => {};

type Props = {
  textura: Imagem;
  children: ReactNode;
};

/**
 * Confirmação de maioridade antes de qualquer conteúdo. Usa <dialog> modal:
 * o resto da página fica inerte, o foco começa no botão de confirmar e a
 * tecla Esc equivale a "Sair". A escolha fica salva só nesta sessão.
 */
export function AvisoMaioridade({ textura, children }: Props) {
  const confirmadoAntes = useSyncExternalStore(
    assinarNada,
    lerConfirmacao,
    () => null,
  );
  const [escolha, setEscolha] = useState<"confirmou" | "saiu" | null>(null);
  const dialogo = useRef<HTMLDialogElement>(null);

  const estado =
    escolha === "confirmou" || confirmadoAntes === true
      ? "liberado"
      : escolha === "saiu"
        ? "saiu"
        : confirmadoAntes === null
          ? "verificando"
          : "perguntando";

  useEffect(() => {
    const elemento = dialogo.current;
    if (estado === "perguntando" && elemento && !elemento.open) {
      elemento.showModal();
    }
  }, [estado]);

  function confirmar() {
    salvarConfirmacao();
    setEscolha("confirmou");
    dialogo.current?.close();
  }

  function sair() {
    setEscolha("saiu");
    dialogo.current?.close();
  }

  return (
    <>
      {estado !== "liberado" && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-fundo px-4">
          <Image
            src={textura.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-35"
          />
          {estado === "saiu" && (
            <div className="moldura relative max-w-md bg-superficie px-6 py-10 text-center sm:px-10">
              <p className="titulo-lounge text-2xl">
                Este site é destinado a maiores de 18 anos.
              </p>
              <p className="mt-4 text-texto-suave">
                Você escolheu sair. Para voltar à página anterior, use o botão
                abaixo.
              </p>
              <Botao
                variante="secundario"
                className="mt-8"
                onClick={() => window.history.back()}
              >
                Voltar
              </Botao>
            </div>
          )}
        </div>
      )}

      <dialog
        ref={dialogo}
        aria-labelledby="aviso-titulo"
        aria-describedby="aviso-descricao"
        onCancel={(evento) => {
          evento.preventDefault();
          sair();
        }}
        className="moldura m-auto w-[min(28rem,calc(100%-2rem))] bg-superficie p-0 text-texto backdrop:bg-black/60"
      >
        <div className="px-6 py-10 text-center sm:px-10">
          <p className="marca text-sm">
            <NomeDoEstabelecimento />
          </p>
          <h2
            id="aviso-titulo"
            className="titulo-lounge mt-6 text-3xl text-balance"
          >
            Este site é destinado a maiores de 18 anos
          </h2>
          <p id="aviso-descricao" className="mt-4 text-texto-suave">
            Confirme a sua idade para conhecer a loja.
          </p>
          <div className="mt-8 grid gap-3">
            <Botao autoFocus onClick={confirmar} tamanho="grande">
              Tenho 18 anos ou mais
            </Botao>
            <Botao variante="secundario" onClick={sair} tamanho="grande">
              Sair
            </Botao>
          </div>
        </div>
      </dialog>

      <div
        hidden={estado !== "liberado"}
        className={estado === "liberado" ? "flex flex-1 flex-col" : "hidden"}
      >
        {children}
      </div>
    </>
  );
}
