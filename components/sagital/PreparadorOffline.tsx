"use client";

import { CloudDownload, CloudOff, Check } from "lucide-react";
import { useState } from "react";
import { classes } from "@/lib/classes";
import { BotaoSagital } from "./BotaoSagital";

type Estado =
  | { tipo: "parado" }
  | { tipo: "preparando"; feito: number; total: number }
  | { tipo: "pronto"; imagens: number }
  | { tipo: "erro"; mensagem: string };

type Props = { paginas: string[] };

/** Carrega uma imagem com o mesmo srcset e sizes da página: o navegador escolhe o mesmo tamanho. */
function carregarComo(origem: HTMLImageElement): Promise<void> {
  return new Promise((resolver) => {
    const imagem = new Image();
    imagem.onload = () => resolver();
    imagem.onerror = () => resolver();
    if (origem.sizes) imagem.sizes = origem.sizes;
    if (origem.srcset) imagem.srcset = origem.srcset;
    imagem.src = origem.src;
  });
}

/**
 * Prepara o aparelho para apresentar sem internet: passa pelas páginas dos
 * demos e baixa as fotos no tamanho certo para esta tela. O service worker
 * guarda tudo no cache.
 */
export function PreparadorOffline({ paginas }: Props) {
  const [estado, setEstado] = useState<Estado>({ tipo: "parado" });

  async function preparar() {
    if (!("serviceWorker" in navigator)) {
      setEstado({
        tipo: "erro",
        mensagem: "Este navegador não permite o modo offline.",
      });
      return;
    }
    try {
      await navigator.serviceWorker.ready;
      const imagens = new Map<string, HTMLImageElement>();
      for (const pagina of paginas) {
        const resposta = await fetch(pagina);
        const html = await resposta.text();
        const documento = new DOMParser().parseFromString(html, "text/html");
        for (const imagem of documento.querySelectorAll("img")) {
          // A mesma foto pode aparecer em tamanhos diferentes (srcset + sizes).
          const chave = `${imagem.getAttribute("srcset") ?? imagem.getAttribute("src")}|${imagem.getAttribute("sizes") ?? ""}`;
          if (chave) imagens.set(chave, imagem);
        }
      }
      const lista = [...imagens.values()];
      let feito = 0;
      setEstado({ tipo: "preparando", feito, total: lista.length });
      for (const imagem of lista) {
        await carregarComo(imagem);
        feito++;
        setEstado({ tipo: "preparando", feito, total: lista.length });
      }
      setEstado({ tipo: "pronto", imagens: lista.length });
    } catch {
      setEstado({
        tipo: "erro",
        mensagem:
          "Não deu para preparar agora. Confira a internet e tente de novo.",
      });
    }
  }

  const preparando = estado.tipo === "preparando";

  return (
    <section
      aria-labelledby="offline-titulo"
      className="mt-4 grid gap-4 rounded-3xl bg-superficie p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-5 sm:p-6 print:hidden"
    >
      <span
        aria-hidden
        className={classes(
          "grid size-11 place-items-center rounded-full",
          estado.tipo === "pronto"
            ? "bg-[#e8f8ef] text-[#0f8f48]"
            : "bg-white text-destaque",
        )}
      >
        {estado.tipo === "pronto" ? (
          <Check className="size-5" strokeWidth={2.25} />
        ) : (
          <CloudOff className="size-5" strokeWidth={1.75} />
        )}
      </span>
      <div className="min-w-0">
        <h2
          id="offline-titulo"
          className="text-[1.0625rem] font-bold tracking-[-0.01em]"
        >
          Modo offline
        </h2>
        <p
          className="mt-1 text-[0.9375rem] text-texto-suave"
          aria-live="polite"
        >
          {estado.tipo === "parado" &&
            "Antes de sair para as visitas, prepare este aparelho: os quatro demos passam a abrir sem internet, com qualquer nome e cor."}
          {estado.tipo === "preparando" &&
            `Baixando as fotos: ${estado.feito} de ${estado.total}.`}
          {estado.tipo === "pronto" &&
            `Pronto. Os demos e ${estado.imagens} fotos estão guardados neste aparelho.`}
          {estado.tipo === "erro" && estado.mensagem}
        </p>
        {preparando && (
          <div
            role="progressbar"
            aria-label="Fotos baixadas"
            aria-valuemin={0}
            aria-valuemax={estado.total || 1}
            aria-valuenow={estado.feito}
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--cor-borda)]"
          >
            <div
              className="h-full rounded-full bg-destaque transition-[width] duration-200"
              style={{
                width: `${Math.round((estado.feito / (estado.total || 1)) * 100)}%`,
              }}
            />
          </div>
        )}
      </div>
      <BotaoSagital
        variante="escuro"
        onClick={preparar}
        disabled={preparando}
        className="w-full sm:w-auto"
      >
        <CloudDownload aria-hidden className="size-5" strokeWidth={1.75} />
        {estado.tipo === "pronto"
          ? "Preparar de novo"
          : "Preparar modo offline"}
      </BotaoSagital>
    </section>
  );
}
