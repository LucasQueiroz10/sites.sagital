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
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { classes } from "@/lib/classes";
import { nomeDoArquivoQr } from "@/lib/link";
import { fecharDialogo } from "@/lib/movimento";
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
const FALHA_AO_COPIAR =
  "Não deu para copiar sozinho: o link está selecionado, é só copiar.";

/** O link em duas partes, para a barra de endereço: o site e o caminho legível. */
function partesDoEndereco(link: string): { host: string; caminho: string } {
  const url = new URL(link);
  const busca = decodeURIComponent(url.search.replace(/\+/g, " "));
  return { host: url.host, caminho: `${url.pathname}${busca}` };
}

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
  const campoDoLink = useRef<HTMLInputElement>(null);
  const completo = modo === "completo";

  const nomeComErro = nome.trim().length > 0 && !validarNome(nome);
  const enderecoVisivel = link ? partesDoEndereco(link) : null;
  const variaveis = variaveisDoTema(corEfetiva as `#${string}`, "#ffffff");

  // O "copiado" some sozinho em 2s; um erro fica até a próxima escolha.
  useEffect(() => {
    if (aviso !== COPIADO) return;
    const tempo = window.setTimeout(() => setAviso(""), 2000);
    return () => window.clearTimeout(tempo);
  }, [aviso]);

  async function copiar() {
    if (!link) return;
    // Esvazia antes, para o leitor de tela anunciar de novo uma cópia repetida.
    setAviso("");
    try {
      await navigator.clipboard.writeText(link);
      requestAnimationFrame(() => setAviso(COPIADO));
    } catch {
      if (completo) {
        setAviso("Não deu para copiar. Toque e segure o link para copiar.");
        return;
      }
      // No painel, a barra mostra só o caminho: na falha, ela vira um campo
      // com o link inteiro, já selecionado, pronto para copiar à mão.
      setAviso(FALHA_AO_COPIAR);
      requestAnimationFrame(() => campoDoLink.current?.select());
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

  /** Fio fino entre as linhas da ficha. */
  const linha = "border-t border-[var(--sg-borda-sutil)] pt-5 lg:pt-4";

  /** "Abrir o demo": enquanto o link não existe, um botão desabilitado, fora do Tab. */
  const botaoAbrir = (className?: string) => {
    const conteudo = (
      <>
        Abrir o demo
        <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.75} />
      </>
    );
    return link ? (
      <BotaoSagital href={link} className={className}>
        {conteudo}
      </BotaoSagital>
    ) : (
      <BotaoSagital disabled className={className}>
        {conteudo}
      </BotaoSagital>
    );
  };

  const formulario = (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid min-w-0 grid-cols-1 gap-5 lg:gap-4 print:hidden"
    >
      {/* Ramo: escolhido pela primeira tela real de cada demo. */}
      <fieldset className="min-w-0">
        <legend className="mb-3 text-[0.8125rem] font-medium text-texto-suave">
          Ramo
        </legend>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {demos.map((d) => {
            const marcado = d.nicho === nicho;
            return (
              <label key={d.nicho} className="group min-w-0 cursor-pointer">
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
                    "relative block aspect-[4/5] overflow-hidden rounded-xl lg:aspect-[4/3] bg-superficie transition-[box-shadow,opacity,filter] duration-200 ease-[cubic-bezier(.2,.8,.2,1)]",
                    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-destaque",
                    marcado
                      ? "shadow-[0_0_0_2px_#ffffff,0_0_0_4px_var(--cor-texto)]"
                      : "opacity-75 saturate-[.8] shadow-[inset_0_0_0_1px_var(--sg-borda-sutil)] group-hover:opacity-100 group-hover:saturate-100",
                  )}
                >
                  {d.captura ? (
                    <Image
                      src={d.captura.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 7.5rem, (min-width: 640px) 9rem, 22vw"
                      className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(160deg, ${d.padrao.fundo} 0 55%, ${d.padrao.cor} 55% 100%)`,
                      }}
                    />
                  )}
                </span>
                <span
                  className={classes(
                    "mt-2 block truncate text-center text-[0.8125rem] tracking-[-0.01em] transition-colors",
                    marcado
                      ? "font-semibold text-texto"
                      : "font-medium text-texto-suave group-hover:text-texto",
                  )}
                >
                  {d.rotulo}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Nome: campo de linha só, grande, com o contador à direita. */}
      <div className={linha}>
        <div className="flex items-baseline justify-between gap-3">
          <label
            htmlFor={`nome-${modo}`}
            className="text-[0.8125rem] font-medium text-texto-suave"
          >
            Nome do negócio
          </label>
          <span
            aria-hidden
            className="sg-num text-[0.8125rem] text-texto-suave"
          >
            {nome.length}/{NOME_MAXIMO}
          </span>
        </div>
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
          className={classes(
            "mt-1 w-full bg-transparent pt-1 pb-2.5 text-[1.375rem] font-semibold tracking-[-0.02em] text-texto transition-shadow duration-200 placeholder:font-medium focus-visible:outline-none",
            nomeComErro
              ? "shadow-[inset_0_-2px_0_var(--cor-erro)]"
              : "shadow-[inset_0_-1px_0_var(--sg-terciario)] focus:shadow-[inset_0_-2px_0_var(--cor-primaria)]",
          )}
        />
        <p
          id={`ajuda-${modo}`}
          className={classes(
            "mt-2 text-[0.8125rem]",
            nomeComErro ? "text-erro" : "text-texto-suave",
          )}
        >
          {nomeComErro
            ? "Use só letras, números, espaços e & ' - . O demo vai mostrar o nome padrão."
            : `Em branco, aparece “${demo.padrao.nome}”.`}
        </p>
      </div>

      <fieldset className={classes("min-w-0", linha)}>
        <legend className="float-left text-[0.8125rem] font-medium text-texto-suave">
          Cor da marca
        </legend>
        {/* No painel, o nome da cor fica na outra ponta da linha; no /gerar,
            com a coluna larga, logo depois do rótulo. */}
        <span
          className={classes(
            "text-[0.8125rem] font-semibold text-texto",
            completo ? "float-left ml-1.5" : "float-right",
          )}
        >
          {completo && <span className="text-texto-suave">· </span>}
          {nomeDaCor(cor)}
        </span>
        <div className="clear-both pt-3">
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
        </div>
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
        <div className={classes("grid grid-cols-1 gap-3", linha)}>
          {/* O link se monta enquanto o visitante escolhe: o endereço do
              demo dele, pronto para copiar ou virar QR code. */}
          <div className="flex min-w-0 gap-2">
            <div className="flex min-h-11 min-w-0 flex-1 items-center rounded-[10px] bg-superficie pl-3.5">
              {aviso === FALHA_AO_COPIAR && link ? (
                <input
                  ref={campoDoLink}
                  readOnly
                  value={link}
                  aria-label="Link do demo"
                  onFocus={(e) => e.currentTarget.select()}
                  className="min-w-0 flex-1 bg-transparent font-mono text-xs text-texto focus-visible:outline-none"
                />
              ) : (
                <p
                  className="min-w-0 flex-1 truncate font-mono text-xs"
                  title={link ?? undefined}
                >
                  {enderecoVisivel ? (
                    <>
                      <span className="hidden text-texto-suave sm:inline">
                        {enderecoVisivel.host}
                      </span>
                      <span className="font-medium text-texto">
                        {enderecoVisivel.caminho}
                      </span>
                    </>
                  ) : (
                    <span className="text-texto-suave">Montando o link…</span>
                  )}
                </p>
              )}
              <button
                type="button"
                onClick={copiar}
                disabled={!link}
                className="sg-pressiona grid size-11 shrink-0 place-items-center rounded-[10px] text-texto hover:bg-[var(--sg-pressionado)] disabled:opacity-40"
              >
                {aviso === COPIADO ? (
                  <Check
                    aria-hidden
                    className="sg-confirma size-[18px] text-destaque"
                  />
                ) : (
                  <Copy
                    aria-hidden
                    className="size-[18px]"
                    strokeWidth={1.75}
                  />
                )}
                <span className="sr-only">Copiar link</span>
              </button>
            </div>
            <BotaoSagital
              variante="secundario"
              tamanho="medio"
              onClick={() => folhaDoQr.current?.showModal()}
              disabled={!link}
              className="shrink-0 px-3.5"
            >
              <QrCode aria-hidden className="size-[18px]" strokeWidth={1.75} />
              QR code
            </BotaoSagital>
          </div>
          <p
            className="-mt-1 text-[0.8125rem] text-texto-suave empty:hidden"
            aria-live="polite"
          >
            {aviso === COPIADO ? (
              <span className="sr-only">{aviso}</span>
            ) : (
              aviso
            )}
          </p>
          <div className="flex gap-2">
            <BotaoSagital
              variante="secundario"
              onClick={() => abrirPrevia()}
              disabled={!link}
              className="shrink-0"
            >
              <Eye aria-hidden className="size-5" strokeWidth={1.75} />
              Ao vivo
            </BotaoSagital>
            {botaoAbrir("flex-1")}
          </div>
        </div>
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
      <div className="rounded-3xl bg-white p-4 shadow-[inset_0_0_0_1px_var(--sg-borda-sutil),var(--sg-sombra-lg)] sm:p-7 lg:p-6">
        <h2 className="mb-5 text-[1.0625rem] font-bold tracking-[-0.015em] lg:mb-4">
          Monte o seu demo
        </h2>
        {formulario}
        <dialog
          ref={folhaDoQr}
          aria-labelledby={`qr-titulo-${modo}`}
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
                <Check aria-hidden className="sg-confirma size-5" />
              ) : (
                <Copy aria-hidden className="size-5" strokeWidth={1.75} />
              )}
              {aviso === COPIADO ? "Link copiado" : "Copiar link"}
            </BotaoSagital>
            <BotaoSagital variante="contorno" onClick={fecharFolha}>
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
          {botaoAbrir()}
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
                <Check aria-hidden className="sg-confirma size-[18px]" />
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
