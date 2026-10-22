"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Eye,
  Printer,
  QrCode,
} from "lucide-react";
import { useRef, useState } from "react";
import { classes } from "@/lib/classes";
import { nomeDoArquivoQr } from "@/lib/link";
import {
  NOME_MAXIMO,
  contraste,
  validarNome,
  variaveisDoTema,
} from "@/lib/tema";
import { BotaoSagital } from "./BotaoSagital";
import { CodigoQr } from "./CodigoQr";
import { useEscolha } from "./EscolhaDoDemo";
import { SeletorDeCor, nomeDaCor } from "./SeletorDeCor";

type Props = {
  /** "compacto" na página inicial; "completo" no /gerar, com QR, download e impressão. */
  modo: "compacto" | "completo";
};

const COPIADO = "Link copiado.";

/**
 * O painel "Monte o seu demo": escolha o ramo, o nome e a cor, e saem o link,
 * a prévia ao vivo e o QR code do demo personalizado. Tudo no navegador,
 * funcionando offline.
 */
export function GeradorDeLink({ modo }: Props) {
  const {
    demos,
    demo,
    nicho,
    nome,
    cor,
    nomeExibido,
    corEfetiva,
    link,
    escolherNicho,
    escolherNome,
    escolherCor,
    abrirPrevia,
  } = useEscolha();
  const [aviso, setAviso] = useState("");
  const folhaDoQr = useRef<HTMLDialogElement>(null);
  const completo = modo === "completo";

  const nomeComErro = nome.trim().length > 0 && !validarNome(nome);
  const variaveis = variaveisDoTema(corEfetiva as `#${string}`, "#ffffff");

  async function copiar() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setAviso(COPIADO);
    } catch {
      setAviso("Não deu para copiar. Toque e segure o link para copiar.");
    }
  }

  async function baixar() {
    if (!link) return;
    const { toDataURL } = await import("qrcode");
    const dados = await toDataURL(link, {
      width: 1024,
      margin: 2,
      errorCorrectionLevel: "M",
    });
    const ancora = document.createElement("a");
    ancora.href = dados;
    ancora.download = nomeDoArquivoQr(demo.nicho, nome);
    ancora.click();
    setAviso("QR code baixado.");
  }

  const formulario = (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid min-w-0 gap-5 print:hidden"
    >
      <fieldset className="min-w-0">
        <legend className="mb-2.5 text-sm font-medium text-texto-suave">
          Ramo
        </legend>
        <div className="flex flex-wrap gap-2">
          {demos.map((d) => {
            const marcado = d.nicho === nicho;
            return (
              <label key={d.nicho} className="shrink-0 cursor-pointer">
                <input
                  type="radio"
                  name={`nicho-${modo}`}
                  value={d.nicho}
                  checked={marcado}
                  onChange={() => {
                    escolherNicho(d.nicho);
                    setAviso("");
                  }}
                  className="peer sr-only"
                />
                <span
                  className={classes(
                    "sg-pressiona flex min-h-11 items-center rounded-full px-4 text-[0.9375rem]",
                    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-destaque",
                    marcado
                      ? "bg-texto font-semibold text-white"
                      : "bg-white font-medium text-texto hover:bg-[var(--sg-pressionado)]",
                  )}
                >
                  {d.rotulo}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <div
          className={classes(
            "rounded-[10px] bg-white px-3.5 pt-2 pb-2.5 transition-shadow duration-150",
            nomeComErro
              ? "shadow-[inset_0_0_0_1.5px_var(--cor-erro)]"
              : "focus-within:shadow-[inset_0_0_0_1.5px_var(--cor-primaria)]",
          )}
        >
          <label
            htmlFor={`nome-${modo}`}
            className="block text-[0.8125rem] text-texto-suave"
          >
            Nome do negócio
          </label>
          <input
            id={`nome-${modo}`}
            type="text"
            value={nome}
            onChange={(e) => {
              escolherNome(e.target.value);
              setAviso("");
            }}
            maxLength={NOME_MAXIMO}
            placeholder={demo.padrao.nome}
            autoComplete="off"
            enterKeyHint="done"
            aria-invalid={nomeComErro}
            aria-describedby={`ajuda-${modo}`}
            className="mt-0.5 w-full bg-transparent text-base font-semibold text-texto focus-visible:outline-none"
          />
        </div>
        <p
          id={`ajuda-${modo}`}
          className={classes(
            "mt-1.5 px-0.5 text-[0.8125rem]",
            nomeComErro ? "text-erro" : "text-texto-suave",
          )}
        >
          {nomeComErro
            ? "Use só letras, números, espaços e & ' - . O demo vai mostrar o nome padrão."
            : `Até ${NOME_MAXIMO} letras. Em branco, aparece “${demo.padrao.nome}”.`}
        </p>
      </div>

      <fieldset className="min-w-0">
        <legend className="mb-1.5 text-sm font-medium text-texto-suave">
          Cor da marca <span className="font-normal">· {nomeDaCor(cor)}</span>
        </legend>
        <SeletorDeCor
          nome={`cor-${modo}`}
          valor={cor}
          aoEscolher={(valor) => {
            escolherCor(valor);
            setAviso("");
          }}
          padrao={demo.padrao}
          livre={completo}
        />
        {completo && (
          <p className="mt-3 flex flex-wrap items-center gap-3 text-[0.8125rem] text-texto-suave">
            <span
              className="inline-flex min-h-9 items-center rounded-[10px] px-3 text-sm font-semibold"
              style={{
                backgroundColor: variaveis["--cor-primaria"],
                color: variaveis["--cor-primaria-texto"],
              }}
            >
              Botão de exemplo
            </span>
            <span className="sg-num">
              Contraste{" "}
              {contraste(
                variaveis["--cor-primaria"],
                variaveis["--cor-primaria-texto"],
              )
                .toFixed(1)
                .replace(".", ",")}
              :1, texto ajustado automaticamente.
            </span>
          </p>
        )}
      </fieldset>

      {!completo && (
        <div className="grid gap-2">
          <div className="flex gap-2">
            <BotaoSagital
              variante="inverso"
              onClick={() => abrirPrevia()}
              disabled={!link}
              className="shrink-0"
            >
              <Eye aria-hidden className="size-5" strokeWidth={1.75} />
              Ao vivo
            </BotaoSagital>
            <BotaoSagital
              href={link ?? "#"}
              aria-disabled={!link}
              className="flex-1"
            >
              Abrir o demo
              <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.75} />
            </BotaoSagital>
          </div>
          <div className="flex justify-center gap-1">
            <button
              type="button"
              onClick={copiar}
              disabled={!link}
              className="sg-pressiona inline-flex min-h-11 items-center gap-2 rounded-[10px] px-3 text-sm font-semibold text-destaque hover:bg-white disabled:opacity-40"
            >
              {aviso === COPIADO ? (
                <Check aria-hidden className="size-[18px]" />
              ) : (
                <Copy aria-hidden className="size-[18px]" strokeWidth={1.75} />
              )}
              Copiar link
            </button>
            <button
              type="button"
              onClick={() => folhaDoQr.current?.showModal()}
              disabled={!link}
              className="sg-pressiona inline-flex min-h-11 items-center gap-2 rounded-[10px] px-3 text-sm font-semibold text-destaque hover:bg-white disabled:opacity-40"
            >
              <QrCode aria-hidden className="size-[18px]" strokeWidth={1.75} />
              QR code
            </button>
          </div>
        </div>
      )}
      {!completo && (
        <p
          className="-mt-3 text-center text-[0.8125rem] text-texto-suave empty:hidden"
          aria-live="polite"
        >
          {aviso === COPIADO ? "" : aviso}
        </p>
      )}
    </form>
  );

  const qr = (
    <div className="grid w-full justify-items-center gap-3 text-center">
      <p className="hidden text-3xl font-bold print:block">{nomeExibido}</p>
      <p className="hidden text-lg print:block">
        Veja o site demonstrativo de {demo.rotulo.toLowerCase()}
      </p>
      <div className="w-full max-w-[15rem] rounded-2xl bg-superficie p-4 print:max-w-[9cm] print:bg-white print:p-0">
        {link ? (
          <CodigoQr
            texto={link}
            rotulo={`QR code do demo de ${demo.rotulo.toLowerCase()} para ${nomeExibido}`}
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

  if (!completo) {
    return (
      <div className="rounded-3xl bg-superficie p-4 sm:p-6">
        <h2 className="mb-4 text-[1.0625rem] font-bold tracking-[-0.015em]">
          Monte o seu demo
        </h2>
        {formulario}
        <dialog
          ref={folhaDoQr}
          aria-labelledby={`qr-titulo-${modo}`}
          className="sg-dialogo fixed inset-x-0 top-auto bottom-0 m-0 w-full max-w-none rounded-t-3xl bg-white px-4 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-texto shadow-[var(--sg-sombra-folha)] sm:inset-0 sm:m-auto sm:max-w-sm sm:rounded-3xl sm:px-6 sm:pt-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) folhaDoQr.current?.close();
          }}
        >
          <span
            aria-hidden
            className="mx-auto mb-3 block h-1 w-9 rounded-full bg-[var(--cor-borda)] sm:hidden"
          />
          <h2
            id={`qr-titulo-${modo}`}
            className="text-lg font-bold tracking-[-0.01em]"
          >
            QR code do demo
          </h2>
          <p className="mt-1 mb-5 text-sm text-texto-suave">
            {demo.rotulo} com o nome {nomeExibido}. O cliente aponta a câmera e
            abre no celular dele.
          </p>
          {qr}
          <div className="mt-5 grid gap-2">
            <BotaoSagital variante="secundario" onClick={copiar}>
              {aviso === COPIADO ? (
                <Check aria-hidden className="size-5" />
              ) : (
                <Copy aria-hidden className="size-5" strokeWidth={1.75} />
              )}
              {aviso === COPIADO ? "Link copiado" : "Copiar link"}
            </BotaoSagital>
            <BotaoSagital
              variante="contorno"
              onClick={() => folhaDoQr.current?.close()}
            >
              Fechar
            </BotaoSagital>
          </div>
        </dialog>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div className="rounded-3xl bg-superficie p-4 sm:p-6 print:hidden">
        {formulario}
      </div>
      <div className="area-impressao grid gap-4 rounded-3xl bg-white p-5 shadow-[var(--sg-sombra-md)] sm:p-6 print:shadow-none">
        {qr}
        <div className="grid gap-2 print:hidden">
          <BotaoSagital href={link ?? "#"} aria-disabled={!link}>
            Abrir o demo
            <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.75} />
          </BotaoSagital>
          <div className="grid grid-cols-2 gap-2">
            <BotaoSagital
              variante="secundario"
              tamanho="medio"
              onClick={() => abrirPrevia()}
              disabled={!link}
            >
              <Eye aria-hidden className="size-[18px]" strokeWidth={1.75} />
              Ver ao vivo
            </BotaoSagital>
            <BotaoSagital
              variante="secundario"
              tamanho="medio"
              onClick={copiar}
              disabled={!link}
            >
              {aviso === COPIADO ? (
                <Check aria-hidden className="size-[18px]" />
              ) : (
                <Copy aria-hidden className="size-[18px]" strokeWidth={1.75} />
              )}
              Copiar
            </BotaoSagital>
            <BotaoSagital
              variante="secundario"
              tamanho="medio"
              onClick={baixar}
              disabled={!link}
            >
              <Download
                aria-hidden
                className="size-[18px]"
                strokeWidth={1.75}
              />
              Baixar PNG
            </BotaoSagital>
            <BotaoSagital
              variante="secundario"
              tamanho="medio"
              onClick={() => window.print()}
              disabled={!link}
            >
              <Printer aria-hidden className="size-[18px]" strokeWidth={1.75} />
              Imprimir
            </BotaoSagital>
          </div>
          <p
            className="min-h-5 text-center text-[0.8125rem] text-texto-suave"
            aria-live="polite"
          >
            {aviso}
          </p>
        </div>
      </div>
    </div>
  );
}
