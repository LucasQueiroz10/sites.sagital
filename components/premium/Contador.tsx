"use client";

import { useEffect, useRef, useState } from "react";
import { prefereMenosMovimento } from "@/lib/movimento";

/** A contagem da chegada: longa, desacelerando como um contador parando. */
const DURACAO_DA_CHEGADA = 1400;
/** Troca depois de revelado (mensal → anual): só o bastante para ler a mudança. */
const DURACAO_DA_TROCA = 450;

const desacelera = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Um número que conta de `de` até `valor` na primeira vez que aparece na
 * tela, e depois anima as trocas de valor. O HTML do servidor já traz o valor
 * final (sem JavaScript, ou com movimento reduzido, é ele que fica); quem já
 * está vendo o número ao carregar também vê o valor pronto, sem recontar.
 * Leitores de tela recebem só o valor final.
 */
export function Contador({
  valor,
  de = 0,
  casas = 0,
  prefixo = "",
  sufixo = "",
}: {
  valor: number;
  de?: number;
  casas?: number;
  prefixo?: string;
  sufixo?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [mostrado, setMostrado] = useState(valor);
  const atual = useRef(valor);
  const alvo = useRef(valor);
  const revelado = useRef(false);
  const quadro = useRef(0);

  const formatar = (n: number) =>
    n.toLocaleString("pt-BR", {
      minimumFractionDigits: casas,
      maximumFractionDigits: casas,
    });

  // Anima de um valor a outro; uma animação nova interrompe a anterior.
  const animar = useRef((inicio: number, fim: number, duracao: number) => {
    cancelAnimationFrame(quadro.current);
    const comeco = performance.now();
    const passo = (agora: number) => {
      const t = Math.min((agora - comeco) / duracao, 1);
      atual.current = inicio + (fim - inicio) * desacelera(t);
      setMostrado(atual.current);
      if (t < 1) quadro.current = requestAnimationFrame(passo);
    };
    quadro.current = requestAnimationFrame(passo);
  });

  // A chegada: arma fora da tela e conta quando o número aparece.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefereMenosMovimento()) {
      revelado.current = true;
      return;
    }
    const caixa = el.getBoundingClientRect();
    if (caixa.top < window.innerHeight && caixa.bottom > 0) {
      revelado.current = true;
      return;
    }
    // Fora da tela, volta ao começo (ninguém vê a troca).
    quadro.current = requestAnimationFrame(() => {
      atual.current = de;
      setMostrado(de);
    });
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada?.isIntersecting) return;
        observador.disconnect();
        revelado.current = true;
        animar.current(de, alvo.current, DURACAO_DA_CHEGADA);
      },
      { threshold: 0.6 },
    );
    observador.observe(el);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro.current);
    };
  }, [de]);

  // As trocas de valor depois da chegada.
  useEffect(() => {
    alvo.current = valor;
    if (!revelado.current || atual.current === valor) return;
    if (prefereMenosMovimento()) {
      atual.current = valor;
      quadro.current = requestAnimationFrame(() => setMostrado(valor));
      return;
    }
    animar.current(atual.current, valor, DURACAO_DA_TROCA);
  }, [valor]);

  const final = formatar(valor);
  // Arredonda pela casa decimal do valor final, para não piscar "2,37".
  const texto = formatar(Number(mostrado.toFixed(casas)));

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        {prefixo}
        {/* O valor final, invisível, guarda a largura: o que vem depois
            (" bi", "/mês") não anda enquanto o número conta. */}
        <span className="inline-grid justify-items-start">
          <span className="invisible [grid-area:1/1]">{final}</span>
          <span className="[grid-area:1/1]">{texto}</span>
        </span>
        {sufixo}
      </span>
      <span className="sr-only">
        {prefixo}
        {final}
        {sufixo}
      </span>
    </>
  );
}
