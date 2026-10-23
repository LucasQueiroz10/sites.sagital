"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { imagens } from "@/data/bloco";
import { classes } from "@/lib/classes";
import { prefereMenosMovimento } from "@/lib/movimento";
import { cenaDaAbertura } from "./cenas";
import { useCenaAoVivo } from "./useCenaAoVivo";

const FUNDO = { topo: "#e4e4e4", base: "#e4e4e4" };

/**
 * A pilha de três blocos fumê da abertura. Gira devagar, inclina na direção
 * do ponteiro (com mola, para não seguir o mouse de forma dura) e se abre
 * conforme a abertura sai da tela. Enquanto o WebGL não chega, e em aparelho
 * sem WebGL, fica a imagem do primeiro quadro, desenhada pelo mesmo código.
 */
export function PilhaDaAbertura({ className }: { className?: string }) {
  const tela = useRef<HTMLCanvasElement>(null);
  const alvo = useRef({ x: 0, y: 0 });
  const estadoDaMola = useRef({ x: 0, y: 0, vx: 0, vy: 0, antes: 0 });
  const inicio = useRef(0);
  const ultimaSaida = useRef(-1);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const mover = (e: PointerEvent) => {
      alvo.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("pointermove", mover, { passive: true });
    return () => window.removeEventListener("pointermove", mover);
  }, []);

  const estado = useCenaAoVivo(tela, FUNDO, (agora, forcar) => {
    const parado = prefereMenosMovimento();
    const secao = tela.current?.closest("section");
    const caixa = secao?.getBoundingClientRect();
    const saida =
      caixa && !parado
        ? Math.min(Math.max(-caixa.top / caixa.height, 0), 1)
        : 0;
    if (parado) {
      if (!forcar && ultimaSaida.current === 0) return null;
      ultimaSaida.current = 0;
      return cenaDaAbertura(0, { x: 0, y: 0 }, 0);
    }
    ultimaSaida.current = saida;

    // Mola criticamente amortecida até o ponteiro: chega rápido e pousa sem
    // passar do ponto.
    const m = estadoDaMola.current;
    const dt = m.antes ? Math.min((agora - m.antes) / 1000, 0.05) : 0;
    m.antes = agora;
    const rigidez = 60;
    const amortecimento = 2 * Math.sqrt(rigidez);
    m.vx += (rigidez * (alvo.current.x - m.x) - amortecimento * m.vx) * dt;
    m.vy += (rigidez * (alvo.current.y - m.y) - amortecimento * m.vy) * dt;
    m.x += m.vx * dt;
    m.y += m.vy * dt;

    if (!inicio.current) inicio.current = agora;
    const tempo = (agora - inicio.current) / 1000;
    return cenaDaAbertura(tempo, { x: m.x, y: m.y }, saida);
  });

  return (
    <div aria-hidden className={classes("relative", className)}>
      {/* A imagem é o primeiro quadro da cena: as duas se cruzam sem salto. */}
      <Image
        src={imagens.abertura}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 34vw, 70vw"
        className={classes(
          "object-contain transition-opacity duration-500",
          estado === "pronta" ? "opacity-0" : "opacity-100",
        )}
      />
      <canvas
        ref={tela}
        className={classes(
          "absolute inset-0 size-full transition-opacity duration-500",
          estado === "pronta" ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
