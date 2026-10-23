"use client";

import { ArrowUpRight, Check, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { imagens, nome, servicos } from "@/data/bloco";
import { classes } from "@/lib/classes";
import { prefereMenosMovimento } from "@/lib/movimento";
import { linkDoPremium } from "@/lib/whatsapp";
import { cenaDoMix } from "./cenas";
import { useCenaAoVivo } from "./useCenaAoVivo";

/**
 * A lista de serviços. Cada linha pode entrar no mix: o serviço vira um bloco
 * que cai na pilha da barra do mix, e a barra manda o mix inteiro pelo
 * WhatsApp. No computador, a linha sob o ponteiro mostra os blocos âmbar ao
 * lado, numa moldura que desliza de uma linha para outra.
 */
export function Servicos() {
  const [mix, setMix] = useState<string[]>([]);
  const [sobre, setSobre] = useState<number | null>(null);
  const linhas = useRef<(HTMLLIElement | null)[]>([]);
  const [topoDaPrevia, setTopoDaPrevia] = useState(0);

  const alternar = (id: string) =>
    setMix((atual) =>
      atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id],
    );

  const mostrar = (i: number) => {
    const linha = linhas.current[i];
    if (!linha) return;
    setTopoDaPrevia(linha.offsetTop + linha.offsetHeight / 2);
    setSobre(i);
  };

  return (
    <div className="relative">
      <ol
        className="relative border-t border-[rgb(255_255_255/0.28)]"
        onPointerLeave={() => setSobre(null)}
      >
        {/* A prévia que acompanha a linha sob o ponteiro (só com mouse). */}
        <div
          aria-hidden
          className={classes(
            "bl-mira bl-mira-branca pointer-events-none absolute left-[7%] z-10 hidden aspect-[7/5] w-[17%] p-2 transition-[opacity,translate,scale] duration-300 ease-[var(--curva-saida)] lg:block",
            sobre === null ? "scale-95 opacity-0" : "scale-100 opacity-100",
          )}
          style={{ top: topoDaPrevia, translate: "0 -50%" }}
        >
          <Image
            src={imagens.trioNoLaranja}
            alt=""
            sizes="17vw"
            className="size-full object-cover"
          />
        </div>

        {servicos.map((s, i) => {
          const escolhido = mix.includes(s.id);
          return (
            <li
              key={s.id}
              ref={(el) => {
                linhas.current[i] = el;
              }}
              onPointerEnter={(e) => e.pointerType === "mouse" && mostrar(i)}
              className={classes(
                "grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 gap-y-3 border-b border-[rgb(255_255_255/0.28)] px-1 py-6 transition-colors duration-200 sm:px-3 lg:grid-cols-[4rem_minmax(0,0.9fr)_minmax(0,1.15fr)_minmax(0,1.35fr)_auto] lg:items-start lg:gap-x-8 lg:py-8",
                escolhido
                  ? "bg-[var(--cor-laranja-fundo)]"
                  : sobre === i && "bg-[rgb(0_0_0/0.08)]",
              )}
            >
              <span className="bl-rotulo pt-1.5 text-[0.75rem] text-[rgb(255_255_255/0.85)]">
                [{String(i + 1).padStart(2, "0")}]
              </span>
              <span aria-hidden className="hidden lg:block" />
              <h3 className="text-[1.375rem] leading-[1.15] font-normal tracking-[-0.02em] text-white sm:text-[1.625rem] lg:col-auto">
                {s.nome}
              </h3>
              <div className="col-start-2 lg:col-auto">
                <p className="bl-rotulo text-[0.75rem] text-white">{s.prazo}</p>
                <p className="mt-2 max-w-[46ch] text-[0.9375rem] leading-relaxed text-[rgb(255_255_255/0.9)]">
                  {s.texto}
                </p>
              </div>
              <div className="col-start-2 lg:col-auto">
                <button
                  type="button"
                  aria-pressed={escolhido}
                  onClick={() => alternar(s.id)}
                  className={classes(
                    "bl-botao min-h-11 w-[10.5rem] px-4 text-[0.875rem]",
                    escolhido ? "bl-botao-branco" : "bl-botao-vazado",
                  )}
                >
                  {escolhido ? (
                    <Check aria-hidden className="size-4" strokeWidth={2} />
                  ) : (
                    <Plus aria-hidden className="size-4" strokeWidth={1.75} />
                  )}
                  {escolhido ? "No seu mix" : "Incluir no mix"}
                </button>
              </div>
            </li>
          );
        })}
      </ol>

      <BarraDoMix mix={mix} aoLimpar={() => setMix([])} />
    </div>
  );
}

/** A barra que sobe quando há algo no mix, com a pilha ao vivo. */
function BarraDoMix({
  mix,
  aoLimpar,
}: {
  mix: string[];
  aoLimpar: () => void;
}) {
  const escolhidos = mix
    .map((id) => servicos.find((s) => s.id === id))
    .filter((s) => s !== undefined);
  const visivel = escolhidos.length > 0;
  const dias = visivel ? Math.min(...escolhidos.map((s) => s.dias)) : 0;
  const pedido =
    "Quero montar este mix de serviços:\n" +
    escolhidos.map((s) => `• ${s.nome}`).join("\n") +
    "\n\nPode me mandar uma proposta?";

  return (
    // Escondida, a barra não ocupa lugar: a grade fecha a altura dela.
    <div
      className={classes(
        "sticky bottom-3 z-20 grid transition-[grid-template-rows,opacity,translate] sm:bottom-5",
        visivel
          ? "grid-rows-[1fr] translate-y-0 opacity-100 duration-300 ease-[var(--curva-saida)]"
          : "pointer-events-none grid-rows-[0fr] translate-y-6 opacity-0 duration-200 ease-in",
      )}
      inert={!visivel}
    >
      <div className="-mb-10 min-h-0 overflow-hidden pt-8 pb-10">
        <div className="bl-mira grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-3 bg-[var(--cor-cinza-claro)] p-3 text-[var(--cor-tinta)] shadow-[0_18px_40px_-18px_rgb(80_24_0/0.55)] sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:p-4">
          <PilhaDoMix ids={mix} className="row-span-2 h-[6.5rem] sm:h-[8rem]" />
          <div aria-live="polite" className="min-w-0">
            <p className="bl-quadrada text-[1.625rem] sm:text-[2rem]">
              {escolhidos.length} {escolhidos.length === 1 ? "bloco" : "blocos"}{" "}
              no seu mix
            </p>
            <p className="mt-1 text-[0.875rem] text-[var(--cor-texto-suave)]">
              Primeiros resultados a partir de {dias} dias
              <span className="hidden md:inline">
                {" "}
                · {escolhidos.map((s) => s.nome).join(", ")}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:row-span-2">
            <a
              href={linkDoPremium(pedido, nome)}
              target="_blank"
              rel="noopener noreferrer"
              className="bl-botao bl-botao-cheio min-h-11"
            >
              Enviar meu mix
              <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
              <span className="sr-only"> (abre o WhatsApp)</span>
            </a>
            <button
              type="button"
              onClick={aoLimpar}
              className="bl-botao min-h-11 px-3 text-[0.875rem] text-[var(--cor-texto-suave)] underline-offset-4 hover:underline"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type Queda = { y: number; v: number };

/** Um andar da pilha, na unidade das quedas (ver cenaDoMix). */
const ANDAR = 1.2 / 3.5;

/**
 * A pilha do mix em WebGL. Cada bloco novo cai de cima com uma mola um pouco
 * elástica e assenta; quando um sai do meio, os de cima descem um andar. A
 * câmera balança devagar enquanto a barra está à vista.
 */
function PilhaDoMix({ ids, className }: { ids: string[]; className?: string }) {
  const tela = useRef<HTMLCanvasElement>(null);
  const idsAtuais = useRef(ids);
  const quedas = useRef(new Map<string, Queda>());
  const ordemAnterior = useRef<string[]>([]);
  const antes = useRef(0);
  const desenhado = useRef("");

  useEffect(() => {
    idsAtuais.current = ids;
  }, [ids]);

  useCenaAoVivo(tela, FUNDO_DA_BARRA, (agora, forcar) => {
    const lista = idsAtuais.current;
    const parado = prefereMenosMovimento();

    // A lista mudou: os novos começam lá em cima; se um saiu, os que estavam
    // acima dele descem um andar.
    if (lista.join() !== ordemAnterior.current.join()) {
      const anterior = ordemAnterior.current;
      lista.forEach((id, i) => {
        const q = quedas.current.get(id);
        if (!q) quedas.current.set(id, { y: 1, v: 0 });
        else if (anterior.indexOf(id) > i)
          q.y += (anterior.indexOf(id) - i) * ANDAR;
      });
      for (const id of quedas.current.keys())
        if (!lista.includes(id)) quedas.current.delete(id);
      ordemAnterior.current = lista;
    }

    const dt = antes.current
      ? Math.min((agora - antes.current) / 1000, 0.05)
      : 0;
    antes.current = agora;
    for (const q of quedas.current.values()) {
      if (parado) {
        q.y = q.v = 0;
        continue;
      }
      // Mola sub-amortecida: cai, passa um tiquinho do ponto e assenta.
      const rigidez = 140;
      const amortecimento = 2 * Math.sqrt(rigidez) * 0.62;
      q.v += (-rigidez * q.y - amortecimento * q.v) * dt;
      q.y += q.v * dt;
      if (Math.abs(q.y) < 0.0005 && Math.abs(q.v) < 0.0005) q.y = q.v = 0;
    }

    const chave = lista.join();
    if (!lista.length) return null;
    if (parado && !forcar && desenhado.current === chave) return null;
    desenhado.current = chave;
    return cenaDoMix(
      lista.map((id) => servicos.find((s) => s.id === id)?.material ?? "fume"),
      lista.map((id) => quedas.current.get(id)?.y ?? 0),
      parado ? 0 : agora / 1000,
    );
  });

  return (
    <canvas ref={tela} aria-hidden className={classes("w-full", className)} />
  );
}

const FUNDO_DA_BARRA = { topo: "#f3f3f3", base: "#f3f3f3" };
