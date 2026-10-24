"use client";

import { useEffect, useRef } from "react";
import { prefereMenosMovimento } from "@/lib/movimento";

/** Duração do cruzamento entre as duas cópias, em segundos (igual ao CSS). */
const CRUZAMENTO = 0.9;

/**
 * Vídeo de fundo em loop sem emenda. O último quadro de um clipe quase nunca
 * bate com o primeiro, então um loop simples daria um salto a cada volta:
 * duas cópias do mesmo vídeo se cruzam perto do fim para esconder a emenda
 * (o CSS de cada site dá a transição de opacidade à classe `ativo`). Com
 * movimento reduzido fica o primeiro quadro, parado. Sem JavaScript, o
 * atributo loop segura: um corte por volta, nunca uma tela congelada.
 */
export function VideoEmLoop({
  video,
  quadro,
  descricao,
  classeDoFundo,
  classeDoVideo,
}: {
  video: string;
  /** O quadro que aparece enquanto o vídeo carrega. */
  quadro?: string;
  descricao: string;
  classeDoFundo: string;
  classeDoVideo: string;
}) {
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const a = refA.current;
    const b = refB.current;
    if (!a || !b) return;

    // O React não escreve o atributo muted no HTML; sem ele o navegador
    // recusa o autoplay.
    a.muted = true;
    b.muted = true;

    if (prefereMenosMovimento()) {
      a.removeAttribute("autoplay");
      a.pause();
      b.pause();
      // O autoplay pode já ter andado um ou dois quadros: volta ao primeiro.
      try {
        a.currentTime = 0;
      } catch {}
      return;
    }

    const tocar = (v: HTMLVideoElement) => {
      v.play()?.catch(() => {});
    };
    tocar(a);

    let atual = a;
    let proximo = b;
    let trocando = false;
    let espera = 0;

    const aoAvancar = () => {
      if (trocando || !atual.duration) return;
      if (atual.duration - atual.currentTime > CRUZAMENTO) return;
      trocando = true;
      const sai = atual;
      proximo.currentTime = 0;
      tocar(proximo);
      proximo.classList.add("ativo");
      sai.classList.remove("ativo");
      atual = proximo;
      proximo = sai;
      espera = window.setTimeout(
        () => {
          sai.pause();
          sai.currentTime = 0;
          trocando = false;
        },
        CRUZAMENTO * 1000 + 100,
      );
    };

    a.addEventListener("timeupdate", aoAvancar);
    b.addEventListener("timeupdate", aoAvancar);
    return () => {
      window.clearTimeout(espera);
      a.removeEventListener("timeupdate", aoAvancar);
      b.removeEventListener("timeupdate", aoAvancar);
    };
  }, []);

  return (
    <div className={classeDoFundo} role="img" aria-label={descricao}>
      <video
        ref={refA}
        className={`${classeDoVideo} ativo`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden
        poster={quadro}
      >
        <source src={video} type="video/mp4" />
      </video>
      <video
        ref={refB}
        className={classeDoVideo}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden
        poster={quadro}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
