"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  acabamentos,
  type IdDaPegada,
  type IdDoAcabamento,
  pegadas,
} from "@/data/destra";
import {
  geometria,
  interpolar,
  PALMA,
  type Pose,
  type Segmento,
  VISTA,
} from "@/lib/mao";
import { prefereMenosMovimento } from "@/lib/movimento";

/** Quanto leva cada dedo para chegar à pose nova. */
const DURACAO = 620;
/** Os dedos saem um de cada vez, do mínimo ao polegar, como no vídeo. */
const DEFASAGEM = 45;
/** Ordem de saída: mínimo, anelar, médio, indicador e, por último, o polegar. */
const ATRASO = [3, 2, 1, 0, 4] as const;

const curva = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

const poseDe = (id: IdDaPegada): Pose =>
  (pegadas.find((p) => p.id === id) ?? pegadas[0]!).pose;

type Cores = (typeof acabamentos)[number];

/** Mistura duas cores #rrggbb. */
function misturar(a: string, b: string, t: number): string {
  const canal = (cor: string, i: number) =>
    parseInt(cor.slice(1 + i * 2, 3 + i * 2), 16);
  const partes = [0, 1, 2].map((i) =>
    Math.round(canal(a, i) + (canal(b, i) - canal(a, i)) * t)
      .toString(16)
      .padStart(2, "0"),
  );
  return `#${partes.join("")}`;
}

/** A pose do quadro: cada dedo anda no seu próprio tempo. */
function poseNoTempo(de: Pose, para: Pose, decorrido: number): Pose {
  const t = (i: number) =>
    curva(
      Math.min(1, Math.max(0, (decorrido - ATRASO[i]! * DEFASAGEM) / DURACAO)),
    );
  const dedo = (i: 0 | 1 | 2 | 3) => interpolar(de, para, t(i)).dedos[i];
  return {
    dedos: [dedo(0), dedo(1), dedo(2), dedo(3)],
    polegar: interpolar(de, para, t(4)).polegar,
  };
}

/**
 * Os números de cada falange no SVG: o corpo (traço de ponta redonda), o
 * brilho fino do lado da luz e o aro da articulação onde ela começa.
 */
function desenhoDaFalange(s: Segmento, cores: Cores) {
  // A luz vem da esquerda: o brilho corre do lado esquerdo da corrente.
  const desvio = s.largura * 0.24;
  const nx = s.direcao.y * desvio;
  const ny = -s.direcao.x * desvio;
  return {
    x1: s.de.x,
    y1: s.de.y,
    // Comprimento zero não desenha a ponta redonda em todo navegador.
    x2: s.ate.x + 0.01,
    y2: s.ate.y,
    bx1: s.de.x + nx,
    by1: s.de.y + ny,
    bx2: s.ate.x + nx + 0.01,
    by2: s.ate.y + ny,
    cor: misturar(cores.falange, cores.falangeDeFrente, s.frente * 0.8),
  };
}

type Partes = {
  corpo: SVGLineElement | null;
  brilho: SVGLineElement | null;
  aro: SVGCircleElement | null;
};

const fixar = (el: Element | null, attrs: Record<string, number | string>) => {
  if (!el) return;
  for (const [nome, valor] of Object.entries(attrs)) {
    el.setAttribute(nome, typeof valor === "number" ? valor.toFixed(2) : valor);
  }
};

/** Escreve no SVG as coordenadas e as cores de todas as falanges. */
function desenharMao(partes: Partes[], pose: Pose, cores: Cores) {
  geometria(pose)
    .flat()
    .forEach((s, i) => {
      const p = partes[i];
      if (!p) return;
      const d = desenhoDaFalange(s, cores);
      fixar(p.corpo, { x1: d.x1, y1: d.y1, x2: d.x2, y2: d.y2, stroke: d.cor });
      fixar(p.brilho, { x1: d.bx1, y1: d.by1, x2: d.bx2, y2: d.by2 });
      fixar(p.aro, { cx: d.x1, cy: d.y1 });
    });
}

/**
 * A mão biônica desenhada em SVG, de frente, que troca de pegada animando
 * os dedos um a um (lib/mao.ts faz a conta da perspectiva). As coordenadas
 * são escritas direto no SVG a cada quadro, sem passar pelo React. Com
 * movimento reduzido, a pegada nova aparece de uma vez.
 */
export function MaoBionica({
  pegada,
  acabamento = "grafite",
  espelhar = false,
  className,
  descricao,
}: {
  pegada: IdDaPegada;
  acabamento?: IdDoAcabamento;
  espelhar?: boolean;
  className?: string;
  descricao: string;
}) {
  const id = useId().replace(/:/g, "");
  const cores = acabamentos.find((a) => a.id === acabamento) ?? acabamentos[0]!;
  const partes = useRef<Partes[]>([]);
  // O React desenha só a primeira pose (que sai pronta do servidor); dali em
  // diante, quem mexe nas coordenadas são os efeitos abaixo.
  const [poseInicial] = useState(() => poseDe(pegada));
  const atual = useRef<Pose>(poseInicial);
  const coresAtuais = useRef(cores);

  // Troca de acabamento: a cor de cada falange depende do ângulo dela.
  // Antes da pintura, para não piscar a cor que o React escreveu.
  useLayoutEffect(() => {
    coresAtuais.current = cores;
    desenharMao(partes.current, atual.current, cores);
  }, [cores]);

  // Troca de pegada: anima da pose em que a mão está agora (mesmo no meio de
  // outra troca) até a nova.
  useEffect(() => {
    const para = poseDe(pegada);
    if (prefereMenosMovimento()) {
      atual.current = para;
      desenharMao(partes.current, para, coresAtuais.current);
      return;
    }
    const de = atual.current;
    const total = DURACAO + DEFASAGEM * 4;
    let comeco: number | null = null;
    let quadro = 0;
    const passo = (agora: number) => {
      comeco ??= agora;
      const decorrido = agora - comeco;
      atual.current = poseNoTempo(de, para, decorrido);
      desenharMao(partes.current, atual.current, coresAtuais.current);
      if (decorrido < total) quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [pegada]);

  const inicial = geometria(poseInicial);
  const brilho =
    acabamento === "nevoa"
      ? "rgb(255 255 255 / 0.5)"
      : "rgb(255 255 255 / 0.13)";
  const { topo, base, esquerda, direita } = PALMA;
  const palma = `M ${esquerda + 30} ${topo} H ${direita - 30} Q ${direita} ${topo} ${direita} ${topo + 30} L ${direita - 6} ${base - 44} Q ${direita - 12} ${base} ${direita - 54} ${base} H ${esquerda + 54} Q ${esquerda + 12} ${base} ${esquerda + 6} ${base - 44} L ${esquerda} ${topo + 30} Q ${esquerda} ${topo} ${esquerda + 30} ${topo} Z`;
  let indice = 0;

  return (
    <svg
      viewBox={`${VISTA.x} ${VISTA.y} ${VISTA.largura} ${VISTA.altura}`}
      className={className}
      role="img"
      aria-label={descricao}
    >
      <defs>
        <linearGradient id={`${id}-palma`} x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor={cores.falangeDeFrente} />
          <stop offset="0.45" stopColor={cores.palma} />
        </linearGradient>
        <linearGradient id={`${id}-encaixe`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d4d4d8" />
          <stop offset="0.35" stopColor="#f4f4f5" />
          <stop offset="1" stopColor="#d9d9de" />
        </linearGradient>
      </defs>
      <g
        className="dt-mao-espelho"
        style={{ transform: espelhar ? "scaleX(-1)" : "none" }}
      >
        {/* O encaixe de carbono claro e o anel do punho giratório. */}
        <path
          d={`M 142 ${base - 24} H 258 V 528 Q 258 560 226 560 H 174 Q 142 560 142 528 Z`}
          fill={`url(#${id}-encaixe)`}
        />
        <rect
          x={146}
          y={base - 14}
          width={108}
          height={24}
          rx={8}
          fill="#27272a"
        />
        <path d={palma} fill={`url(#${id}-palma)`} />
        {/* A barra dos nós, onde os dedos se prendem. */}
        <rect
          x={esquerda + 8}
          y={topo - 2}
          width={direita - esquerda - 16}
          height={26}
          rx={13}
          fill={cores.falangeDeFrente}
        />
        {/* O sensor de toque da palma. */}
        <circle
          cx={200}
          cy={topo + 92}
          r={5}
          fill={cores.articulacao}
          opacity={0.6}
        />
        {inicial.map((dedo, d) => (
          <g key={d}>
            {dedo.map((s) => {
              const i = indice++;
              const desenho = desenhoDaFalange(s, cores);
              return (
                <g
                  key={i}
                  ref={(g) => {
                    partes.current[i] = {
                      corpo: g?.querySelector("[data-corpo]") ?? null,
                      brilho: g?.querySelector("[data-brilho]") ?? null,
                      aro: g?.querySelector("circle") ?? null,
                    };
                  }}
                >
                  <line
                    data-corpo
                    x1={desenho.x1}
                    y1={desenho.y1}
                    x2={desenho.x2}
                    y2={desenho.y2}
                    stroke={desenho.cor}
                    strokeWidth={s.largura}
                    strokeLinecap="round"
                  />
                  <line
                    data-brilho
                    x1={desenho.bx1}
                    y1={desenho.by1}
                    x2={desenho.bx2}
                    y2={desenho.by2}
                    stroke={brilho}
                    strokeWidth={s.largura * 0.14}
                    strokeLinecap="round"
                  />
                  {/* O aro marca as juntas do meio e da ponta; a da base
                      fica escondida na barra dos nós. */}
                  <circle
                    cx={desenho.x1}
                    cy={desenho.y1}
                    r={s.largura * 0.5 - 1.5}
                    fill="none"
                    stroke={cores.articulacao}
                    strokeOpacity={i % 3 === 0 ? 0 : 0.3}
                    strokeWidth={1.5}
                  />
                </g>
              );
            })}
          </g>
        ))}
      </g>
    </svg>
  );
}
