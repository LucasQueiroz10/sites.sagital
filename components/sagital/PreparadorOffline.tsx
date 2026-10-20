"use client";

import { CloudDownload, CloudOff, Check } from "lucide-react";
import { useState } from "react";
import { classes } from "@/lib/classes";

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
      className="placa mt-8 grid gap-4 rounded-tema bg-white p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6 print:hidden"
    >
      <div>
        <h2 id="offline-titulo" className="flex items-center gap-2 text-xl">
          {estado.tipo === "pronto" ? (
            <Check aria-hidden className="size-6 text-destaque" />
          ) : (
            <CloudOff aria-hidden className="size-6 text-texto-suave" />
          )}
          Modo offline
        </h2>
        <p className="mt-2 text-texto-suave" aria-live="polite">
          {estado.tipo === "parado" &&
            "Antes de sair para as visitas, prepare este aparelho: os quatro demos passam a abrir sem internet, com qualquer nome e cor."}
          {estado.tipo === "preparando" &&
            `Baixando as fotos: ${estado.feito} de ${estado.total}.`}
          {estado.tipo === "pronto" &&
            `Pronto. Os demos e ${estado.imagens} fotos estão guardados neste aparelho.`}
          {estado.tipo === "erro" && estado.mensagem}
        </p>
        {preparando && (
          <progress
            className="mt-3 h-2 w-full accent-[var(--cor-primaria)]"
            value={estado.feito}
            max={estado.total || 1}
          />
        )}
      </div>
      <button
        type="button"
        onClick={preparar}
        disabled={preparando}
        className={classes(
          "inline-flex min-h-12 items-center justify-center gap-2 rounded-tema bg-primaria px-5 font-semibold text-primaria-texto hover:bg-primaria-hover disabled:opacity-60",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque",
        )}
      >
        <CloudDownload aria-hidden className="size-5" />
        {estado.tipo === "pronto"
          ? "Preparar de novo"
          : "Preparar modo offline"}
      </button>
    </section>
  );
}
