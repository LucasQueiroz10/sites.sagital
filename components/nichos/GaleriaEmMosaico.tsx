"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Imagem } from "@/data/tipos";
import { classes } from "@/lib/classes";

const foco =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

type Props = {
  imagens: Imagem[];
  /** Classes de cada miniatura (raio, moldura), para cada demo vestir. */
  classeDaFoto?: string;
};

// O ritmo do mosaico: uma larga, duas em pé, uma quadrada... em colunas.
const FORMATOS = [
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
];

/**
 * As fotos num mosaico de colunas, cada uma abrindo de baixo para cima
 * quando chega à tela. Um toque amplia a foto num quadro escuro, com as
 * setas (e as do teclado) para passar de uma a outra; Esc fecha e o foco
 * volta para a miniatura de onde saiu.
 */
export function GaleriaEmMosaico({ imagens, classeDaFoto }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const miniaturas = useRef<Array<HTMLButtonElement | null>>([]);
  const [aberta, setAberta] = useState<number | null>(null);
  const atual = aberta === null ? null : imagens[aberta];

  function abrir(i: number) {
    setAberta(i);
    dialogo.current?.showModal();
  }

  function fechar() {
    dialogo.current?.close();
  }

  function passar(passo: 1 | -1) {
    setAberta((i) =>
      i === null ? i : (i + passo + imagens.length) % imagens.length,
    );
  }

  function aoTeclar(evento: KeyboardEvent) {
    if (evento.key === "ArrowRight") passar(1);
    if (evento.key === "ArrowLeft") passar(-1);
  }

  const seta =
    "tatil grid size-12 place-items-center rounded-full bg-white/12 text-white hover:bg-white/22 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {imagens.map((imagem, i) => (
          <li key={imagem.alt} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              ref={(el) => {
                miniaturas.current[i] = el;
              }}
              type="button"
              onClick={() => abrir(i)}
              data-revela="foto"
              className={classes(
                "aproxima relative block w-full cursor-zoom-in overflow-hidden",
                FORMATOS[i % FORMATOS.length],
                classeDaFoto ?? "rounded-tema",
                foco,
              )}
            >
              <Image
                src={imagem.src}
                alt={imagem.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 48vw"
                className="object-cover"
                placeholder="blur"
              />
              <span className="sr-only">Ampliar foto</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogo}
        aria-label="Foto ampliada"
        onKeyDown={aoTeclar}
        onClose={() => {
          if (aberta !== null) miniaturas.current[aberta]?.focus();
          setAberta(null);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) fechar();
        }}
        className="quadro-da-foto m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/88"
      >
        {atual && aberta !== null && (
          <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3 p-3 text-white sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm tabular-nums opacity-80" aria-live="polite">
                {aberta + 1} de {imagens.length}
              </p>
              <button type="button" onClick={fechar} autoFocus className={seta}>
                <X aria-hidden className="size-5" />
                <span className="sr-only">Fechar</span>
              </button>
            </div>
            <figure
              key={aberta}
              className="foto-que-troca relative min-h-0"
              onClick={fechar}
            >
              <Image
                src={atual.src}
                alt={atual.alt}
                fill
                sizes="100vw"
                className="object-contain"
                placeholder="blur"
              />
            </figure>
            <div className="flex items-center justify-between gap-4">
              <button type="button" onClick={() => passar(-1)} className={seta}>
                <ChevronLeft aria-hidden className="size-5" />
                <span className="sr-only">Foto anterior</span>
              </button>
              <p className="max-w-[60ch] text-center text-sm opacity-85">
                {atual.alt}
              </p>
              <button type="button" onClick={() => passar(1)} className={seta}>
                <ChevronRight aria-hidden className="size-5" />
                <span className="sr-only">Próxima foto</span>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
