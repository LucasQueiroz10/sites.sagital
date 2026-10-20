"use client";

import { Check, Copy, Download, ExternalLink, Printer } from "lucide-react";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import { classes } from "@/lib/classes";
import { montarLinkDoDemo, nomeDoArquivoQr, type Nicho } from "@/lib/link";
import {
  NOME_MAXIMO,
  contraste,
  validarCor,
  validarNome,
  variaveisDoTema,
  type PadraoDoTema,
} from "@/lib/tema";
import { CodigoQr } from "./CodigoQr";

export type OpcaoDeDemo = {
  nicho: Nicho;
  rotulo: string;
  padrao: PadraoDoTema;
};

type Props = {
  demos: OpcaoDeDemo[];
  /** "compacto" na página inicial; "completo" no /gerar, com download e impressão. */
  modo: "compacto" | "completo";
};

const CORES: { nome: string; valor: string }[] = [
  { nome: "Vermelho", valor: "#e11d48" },
  { nome: "Laranja", valor: "#f97316" },
  { nome: "Verde", valor: "#16a34a" },
  { nome: "Azul", valor: "#2563eb" },
  { nome: "Roxo", valor: "#7c3aed" },
  { nome: "Grafite", valor: "#1f2937" },
];

const foco =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

const assinarNada = () => () => {};

function Escolha({
  nome,
  marcado,
  aoEscolher,
  children,
  className,
}: {
  nome: string;
  marcado: boolean;
  aoEscolher: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className="relative cursor-pointer">
      <input
        type="radio"
        name={nome}
        checked={marcado}
        onChange={aoEscolher}
        className="peer sr-only"
      />
      <span
        className={classes(
          "flex min-h-11 items-center justify-center rounded-tema border-2 text-sm font-semibold transition-colors",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-destaque",
          marcado
            ? "border-texto bg-texto text-fundo"
            : "border-borda bg-white hover:border-texto-suave",
          className,
        )}
      >
        {children}
      </span>
    </label>
  );
}

/**
 * A placa de balcão: escolha o ramo, o nome e a cor, e saem o link e o QR
 * code do demo personalizado. Tudo no navegador, funcionando offline.
 */
export function GeradorDeLink({ demos, modo }: Props) {
  const origem = useSyncExternalStore(
    assinarNada,
    () => window.location.origin,
    () => null,
  );
  const [nicho, setNicho] = useState<Nicho>(demos[0]?.nicho ?? "academia");
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState<string | null>(null);
  const [aviso, setAviso] = useState("");

  const demo = demos.find((d) => d.nicho === nicho) ?? demos[0];
  const nomeValido = validarNome(nome);
  const nomeComErro = nome.trim().length > 0 && !nomeValido;
  const corDoLink = cor ?? "";
  const corEfetiva =
    validarCor(corDoLink.replace("#", "")) ?? demo?.padrao.cor ?? "#111111";
  const variaveis = variaveisDoTema(corEfetiva, "#ffffff");
  const link =
    origem && demo
      ? montarLinkDoDemo(origem, demo.nicho, nome, corDoLink)
      : null;
  const nomeExibido = nomeValido ?? demo?.padrao.nome ?? "";

  async function copiar() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setAviso("Link copiado.");
    } catch {
      setAviso("Não deu para copiar. Toque e segure o link para copiar.");
    }
  }

  async function baixar() {
    if (!link || !demo) return;
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
    <div className="placa overflow-hidden rounded-tema bg-white text-texto">
      <div className="flex items-center justify-between gap-3 bg-primaria px-5 py-3 text-primaria-texto print:hidden">
        <span className="font-bold tracking-wide">Sagital</span>
        <span className="text-sm">Demonstração</span>
      </div>

      <div
        className={classes(
          "grid grid-cols-1 gap-6 p-5 sm:p-6",
          modo === "completo"
            ? "lg:grid-cols-[minmax(0,1fr)_20rem]"
            : "md:grid-cols-[minmax(0,1fr)_15rem]",
        )}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid min-w-0 content-start gap-5 print:hidden"
        >
          <fieldset className="min-w-0">
            <legend className="mb-2 text-sm font-semibold">
              Tipo de negócio
            </legend>
            <div
              className={classes(
                "grid grid-cols-2 gap-2",
                modo === "completo" && "sm:grid-cols-4",
              )}
            >
              {demos.map((d) => (
                <Escolha
                  key={d.nicho}
                  nome={`nicho-${modo}`}
                  marcado={d.nicho === nicho}
                  aoEscolher={() => {
                    setNicho(d.nicho);
                    setAviso("");
                  }}
                  className="px-2"
                >
                  {d.rotulo}
                </Escolha>
              ))}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor={`nome-${modo}`}
              className="mb-2 block text-sm font-semibold"
            >
              Nome do negócio
            </label>
            <input
              id={`nome-${modo}`}
              type="text"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                setAviso("");
              }}
              maxLength={NOME_MAXIMO}
              placeholder={demo?.padrao.nome}
              autoComplete="off"
              aria-invalid={nomeComErro}
              aria-describedby={`ajuda-${modo}`}
              className={classes(
                "min-h-12 w-full rounded-tema border-2 bg-white px-3 text-base",
                "focus-visible:border-texto focus-visible:outline-none",
                nomeComErro ? "border-erro" : "border-borda",
              )}
            />
            <p
              id={`ajuda-${modo}`}
              className={classes(
                "mt-1.5 text-sm",
                nomeComErro ? "text-erro" : "text-texto-suave",
              )}
            >
              {nomeComErro
                ? "Use só letras, números, espaços e & ' - . O demo vai mostrar o nome padrão."
                : `Até ${NOME_MAXIMO} caracteres. Em branco, aparece “${demo?.padrao.nome}”.`}
            </p>
          </div>

          <fieldset className="min-w-0">
            <legend className="mb-2 text-sm font-semibold">Cor da marca</legend>
            <div className="flex flex-wrap gap-2">
              <Escolha
                nome={`cor-${modo}`}
                marcado={cor === null}
                aoEscolher={() => setCor(null)}
                className="px-3"
              >
                Padrão
              </Escolha>
              {CORES.map((opcao) => (
                <label key={opcao.valor} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name={`cor-${modo}`}
                    checked={cor === opcao.valor}
                    onChange={() => {
                      setCor(opcao.valor);
                      setAviso("");
                    }}
                    className="peer sr-only"
                  />
                  <span
                    className={classes(
                      "block size-11 rounded-tema border-2 transition-transform",
                      "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-destaque",
                      cor === opcao.valor
                        ? "scale-90 border-texto ring-2 ring-texto ring-offset-2"
                        : "border-transparent",
                    )}
                    style={{ backgroundColor: opcao.valor }}
                  />
                  <span className="sr-only">{opcao.nome}</span>
                </label>
              ))}
              {modo === "completo" && (
                <label className="flex min-h-11 items-center gap-2 rounded-tema border-2 border-borda px-2 text-sm font-semibold">
                  <input
                    type="color"
                    value={
                      validarCor((cor ?? "").replace("#", "")) ?? corEfetiva
                    }
                    onChange={(e) => setCor(e.target.value)}
                    className="size-7 cursor-pointer rounded border-0 bg-transparent p-0"
                  />
                  Outra
                </label>
              )}
            </div>
            {modo === "completo" && (
              <p className="mt-3 flex flex-wrap items-center gap-3 text-sm text-texto-suave">
                <span
                  className="inline-flex min-h-9 items-center rounded-tema px-3 font-semibold"
                  style={{
                    backgroundColor: variaveis["--cor-primaria"],
                    color: variaveis["--cor-primaria-texto"],
                  }}
                >
                  Botão de exemplo
                </span>
                Contraste{" "}
                {contraste(
                  variaveis["--cor-primaria"],
                  variaveis["--cor-primaria-texto"],
                ).toFixed(1)}
                :1, texto ajustado automaticamente.
              </p>
            )}
          </fieldset>
        </form>

        <div className="area-impressao grid min-w-0 grid-cols-1 content-start justify-items-center gap-3 text-center">
          <p className="hidden text-3xl font-bold print:block">{nomeExibido}</p>
          <p className="hidden text-lg print:block">
            Veja o site demonstrativo de {demo?.rotulo.toLowerCase()}
          </p>
          <div className="relative w-full max-w-[15rem] rounded-tema border-2 border-texto p-2 print:max-w-[9cm]">
            {link ? (
              <CodigoQr
                texto={link}
                rotulo={`QR code do demo de ${demo?.rotulo.toLowerCase()} para ${nomeExibido}`}
                className="w-full"
              />
            ) : (
              <div aria-hidden className="qr-fantasma aspect-square w-full" />
            )}
          </div>
          <p className="text-sm font-semibold">
            <span className="print:hidden">
              Aponte a câmera ou toque em abrir
            </span>
            <span className="hidden print:inline">
              Aponte a câmera do celular
            </span>
          </p>
          <p
            className="w-full truncate font-mono text-xs text-texto-suave"
            title={link ?? undefined}
          >
            {link ?? "Montando o link…"}
          </p>
          <div className="grid w-full gap-2 print:hidden">
            <a
              href={link ?? undefined}
              aria-disabled={!link}
              className={classes(
                "inline-flex min-h-12 items-center justify-center gap-2 rounded-tema bg-primaria px-4 font-semibold text-primaria-texto hover:bg-primaria-hover",
                foco,
              )}
            >
              <ExternalLink aria-hidden className="size-5" />
              Abrir o demo
            </a>
            <button
              type="button"
              onClick={copiar}
              disabled={!link}
              className={classes(
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-tema border-2 border-texto px-4 font-semibold hover:bg-texto hover:text-fundo disabled:opacity-50",
                foco,
              )}
            >
              {aviso === "Link copiado." ? (
                <Check aria-hidden className="size-5" />
              ) : (
                <Copy aria-hidden className="size-5" />
              )}
              Copiar link
            </button>
            {modo === "completo" && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={baixar}
                  disabled={!link}
                  className={classes(
                    "inline-flex min-h-11 items-center justify-center gap-2 rounded-tema border-2 border-borda px-3 text-sm font-semibold hover:border-texto disabled:opacity-50",
                    foco,
                  )}
                >
                  <Download aria-hidden className="size-4" />
                  Baixar PNG
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  disabled={!link}
                  className={classes(
                    "inline-flex min-h-11 items-center justify-center gap-2 rounded-tema border-2 border-borda px-3 text-sm font-semibold hover:border-texto disabled:opacity-50",
                    foco,
                  )}
                >
                  <Printer aria-hidden className="size-4" />
                  Imprimir
                </button>
              </div>
            )}
            <p className="min-h-5 text-sm text-texto-suave" aria-live="polite">
              {aviso}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
