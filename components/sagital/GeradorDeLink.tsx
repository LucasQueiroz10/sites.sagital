"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Eye,
  Printer,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { classes } from "@/lib/classes";
import { nomeDoArquivoQr } from "@/lib/link";
import {
  NOME_MAXIMO,
  contraste,
  validarNome,
  variaveisDoTema,
} from "@/lib/tema";
import { BotaoSagital } from "./BotaoSagital";
import { useEscolha } from "./EscolhaDoDemo";
import { ConteudoDoQr } from "./QrDoDemo";
import { SeletorDeCor, nomeDaCor } from "./SeletorDeCor";

const COPIADO = "Link copiado.";

/** Fio fino entre as linhas da ficha. */
const LINHA = "border-t border-[var(--sg-borda-sutil)] pt-5 lg:pt-4";

/**
 * A ferramenta do vendedor no /gerar: escolha o ramo, o nome e a cor, e saem
 * o link, a prévia ao vivo, o QR code (copiar, baixar e imprimir) e o botão
 * de exemplo com o contraste calculado. Tudo no navegador, funcionando
 * offline.
 */
export function GeradorDeLink() {
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

  const nomeComErro = nome.trim().length > 0 && !validarNome(nome);
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

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div className="rounded-3xl bg-superficie p-4 sm:p-6 print:hidden">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid min-w-0 grid-cols-1 gap-5 lg:gap-4"
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
                      name="nicho-gerar"
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
                        "relative block aspect-[4/5] overflow-hidden rounded-xl bg-superficie transition-[box-shadow,opacity,filter] duration-200 ease-[cubic-bezier(.2,.8,.2,1)] lg:aspect-[4/3]",
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
          <div className={LINHA}>
            <div className="flex items-baseline justify-between gap-3">
              <label
                htmlFor="nome-gerar"
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
              id="nome-gerar"
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
              aria-describedby="ajuda-gerar"
              className={classes(
                "mt-1 w-full bg-transparent pt-1 pb-2.5 text-[1.375rem] font-semibold tracking-[-0.02em] text-texto transition-shadow duration-200 placeholder:font-medium focus-visible:outline-none",
                nomeComErro
                  ? "shadow-[inset_0_-2px_0_var(--cor-erro)]"
                  : "shadow-[inset_0_-1px_0_var(--sg-terciario)] focus:shadow-[inset_0_-2px_0_var(--cor-primaria)]",
              )}
            />
            <p
              id="ajuda-gerar"
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

          <fieldset className={classes("min-w-0", LINHA)}>
            <legend className="float-left text-[0.8125rem] font-medium text-texto-suave">
              Cor da marca
            </legend>
            <span className="float-left ml-1.5 text-[0.8125rem] font-semibold text-texto">
              <span className="text-texto-suave">· </span>
              {nomeDaCor(cor)}
            </span>
            <div className="clear-both pt-3">
              <SeletorDeCor
                nome="cor-gerar"
                valor={cor}
                aoEscolher={(valor) => {
                  escolherCor(valor);
                  setAviso("");
                }}
                padrao={demo.padrao}
                livre
              />
            </div>
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
          </fieldset>
        </form>
      </div>
      <div className="area-impressao grid gap-4 rounded-3xl bg-white p-5 shadow-[var(--sg-sombra-md)] sm:p-6 print:shadow-none">
        <ConteudoDoQr
          link={link}
          rotulo={demo.rotulo}
          nomeExibido={nomeExibido}
        />
        <div className="grid gap-2 print:hidden">
          {/* Enquanto o link não existe, um botão desabilitado, fora do Tab. */}
          {link ? (
            <BotaoSagital href={link}>
              Abrir o demo
              <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.75} />
            </BotaoSagital>
          ) : (
            <BotaoSagital disabled>
              Abrir o demo
              <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.75} />
            </BotaoSagital>
          )}
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
