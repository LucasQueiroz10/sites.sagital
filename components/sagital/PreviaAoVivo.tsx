"use client";

import { LoaderCircle, Monitor, Smartphone, Tablet, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { classes } from "@/lib/classes";
import {
  CURVA_CHEGADA,
  fecharDialogo,
  prefereMenosMovimento,
} from "@/lib/movimento";
import { BotaoSagital } from "./BotaoSagital";
import { FundoSoffit } from "./FundoSoffit";

export type Aparelho = "celular" | "tablet" | "computador";

/** Tamanho real de cada tela: o demo se reorganiza de verdade dentro dela. */
const APARELHOS: Record<
  Aparelho,
  { rotulo: string; largura: number; altura: number; Icone: typeof Monitor }
> = {
  celular: { rotulo: "Celular", largura: 390, altura: 844, Icone: Smartphone },
  tablet: { rotulo: "Tablet", largura: 820, altura: 1180, Icone: Tablet },
  computador: {
    rotulo: "Computador",
    largura: 1440,
    altura: 900,
    Icone: Monitor,
  },
};

/** Bisel do celular e do tablet; no computador, a barra do navegador. */
const MOLDURAS: Record<Aparelho, { lado: number; topo: number; raio: number }> =
  {
    celular: { lado: 9, topo: 9, raio: 38 },
    tablet: { lado: 12, topo: 12, raio: 26 },
    computador: { lado: 1, topo: 30, raio: 12 },
  };

type Props = {
  aberta: boolean;
  aoFechar: () => void;
  aparelho: Aparelho;
  escolherAparelho: (aparelho: Aparelho) => void;
  /** Nome do que está na tela, ex.: "Academia" ou "Lumi Odontologia". */
  titulo: string;
  /** Linha de apoio abaixo do título. */
  subtitulo: string;
  /** Título do iframe, para leitores de tela. */
  tituloDoSite: string;
  link: string | null;
  /** Controles extras na barra de baixo, como o seletor de cor dos demos. */
  controles?: ReactNode;
  /** Escolhas no alto, acima do aparelho (o ramo e o nome, nos demos). */
  escolhas?: ReactNode;
  /** Ações ao lado do botão de abrir, como o QR code dos demos. */
  acoes?: ReactNode;
  /** Texto do botão que abre o site fora da prévia. */
  rotuloDoBotao?: string;
};

/**
 * Prévia ao vivo: o site (um demo personalizado ou um site do portfólio)
 * roda de verdade num iframe, em tela cheia azul-noite. Trocar de aparelho só
 * muda o tamanho do quadro, sem recarregar: o visitante vê o mesmo site se
 * reorganizando.
 */
export function PreviaAoVivo({
  aberta,
  aoFechar,
  aparelho,
  escolherAparelho,
  titulo,
  subtitulo,
  tituloDoSite,
  link,
  controles,
  escolhas,
  acoes,
  rotuloDoBotao = "Abrir o site",
}: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const visor = useRef<HTMLDivElement>(null);
  const [area, setArea] = useState({ largura: 0, altura: 0 });
  const [carregado, setCarregado] = useState<string | null>(null);

  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;
    if (aberta && !el.open) {
      el.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!aberta && el.open) {
      el.close();
    }
  }, [aberta]);

  useEffect(() => {
    const el = palco.current;
    if (!el || !aberta) return;
    const observador = new ResizeObserver(([entrada]) => {
      if (!entrada) return;
      setArea({
        largura: entrada.contentRect.width,
        altura: entrada.contentRect.height,
      });
    });
    observador.observe(el);
    return () => observador.disconnect();
  }, [aberta]);

  function fechar() {
    const el = dialogo.current;
    if (el) void fecharDialogo(el, [{ opacity: 1 }, { opacity: 0 }], 180);
  }

  /**
   * Troca de aparelho: a tela apaga enquanto a moldura muda de tamanho e
   * acende já reorganizada, sem mostrar o site esticado no meio do caminho.
   */
  function trocarAparelho(chave: Aparelho) {
    if (chave === aparelho) return;
    if (!prefereMenosMovimento()) {
      visor.current?.animate(
        [
          { opacity: 1 },
          { opacity: 0, offset: 0.18 },
          { opacity: 0, offset: 0.55, easing: CURVA_CHEGADA },
          { opacity: 1 },
        ],
        { duration: 600 },
      );
    }
    escolherAparelho(chave);
  }

  const tela = APARELHOS[aparelho];
  const moldura = MOLDURAS[aparelho];
  const escala = area.largura
    ? Math.min(
        1,
        (area.largura - moldura.lado * 2) / tela.largura,
        (area.altura - moldura.topo - moldura.lado) / tela.altura,
      )
    : 0;
  const largura = Math.round(tela.largura * escala);
  const altura = Math.round(tela.altura * escala);
  const carregando = carregado !== link;
  const endereco = link ? link.replace(/^https?:\/\//, "") : "";

  return (
    <dialog
      ref={dialogo}
      aria-labelledby="previa-titulo"
      onCancel={(evento) => {
        evento.preventDefault();
        fechar();
      }}
      onClose={() => {
        document.documentElement.style.overflow = "";
        aoFechar();
      }}
      className="sg-previa sg-noite fixed inset-0 m-0 hidden h-dvh max-h-none w-full max-w-none flex-col overflow-hidden p-0 text-white open:flex"
    >
      <FundoSoffit />
      <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center gap-2 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2">
        <button
          type="button"
          onClick={fechar}
          className="sg-pressiona grid size-11 place-items-center rounded-full sg-vidro focus-visible:outline-white"
        >
          <X aria-hidden className="size-6" />
          <span className="sr-only">Fechar a prévia</span>
        </button>
        <div className="min-w-0 text-center">
          <h2
            id="previa-titulo"
            className="text-[0.9375rem] font-semibold text-white"
          >
            {titulo}
          </h2>
          <p className="truncate text-[0.8125rem] text-white/75">{subtitulo}</p>
        </div>
        <span aria-hidden />
      </div>

      {escolhas}

      <div
        ref={palco}
        className="relative grid min-h-0 flex-1 place-items-center px-4 py-3"
      >
        {aberta && link && escala > 0 && (
          <div
            className={classes(
              "relative animate-[sg-aparelho-chega_480ms_cubic-bezier(.16,1,.3,1)] transition-[width,height,border-radius] duration-[360ms] ease-[cubic-bezier(.2,.8,.2,1)]",
              aparelho === "computador"
                ? "bg-[#e9eef4] shadow-[0_24px_60px_rgb(5_10_30/0.45)]"
                : "bg-[#16181b] shadow-[0_0_0_1px_#34373c,0_24px_60px_rgb(5_10_30/0.45)]",
            )}
            style={{
              width: largura + moldura.lado * 2,
              height: altura + moldura.topo + moldura.lado,
              borderRadius: moldura.raio,
              padding: `${moldura.topo}px ${moldura.lado}px ${moldura.lado}px`,
            }}
          >
            {aparelho === "computador" && (
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 flex h-[30px] items-center gap-1.5 px-3"
              >
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="mx-auto max-w-[60%] truncate rounded-full bg-white px-3 py-0.5 text-[0.6875rem] font-medium text-[#5b6478]">
                  {endereco}
                </span>
              </div>
            )}
            <div
              ref={visor}
              className="relative overflow-hidden bg-white"
              style={{
                width: largura,
                height: altura,
                borderRadius: Math.max(moldura.raio - moldura.lado, 2),
              }}
            >
              {/* Embaixo do iframe: o "desligado" da tela enquanto o demo carrega. */}
              <div
                aria-hidden={!carregando}
                className="absolute inset-0 grid place-items-center bg-[#f1f5fa] text-[#5b6478]"
              >
                <p className="flex items-center gap-2 text-sm font-medium">
                  <LoaderCircle
                    aria-hidden
                    className={classes(
                      "size-5",
                      carregando && "animate-spin motion-reduce:animate-none",
                    )}
                  />
                  Abrindo o demo…
                </p>
              </div>
              {/* Quando o demo termina de carregar, a tela acende de cima para
                  baixo: o site aparece montado, com o nome e a cor escolhidos. */}
              <iframe
                key={link}
                src={link}
                title={tituloDoSite}
                onLoad={() => setCarregado(link)}
                className="relative block origin-top-left border-0 bg-white transition-[clip-path] duration-[640ms] ease-[cubic-bezier(.16,1,.3,1)]"
                style={{
                  width: tela.largura,
                  height: tela.altura,
                  transform: `scale(${escala})`,
                  clipPath: carregando ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div
        className={classes(
          "mx-auto grid w-full max-w-5xl gap-3 px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] lg:items-center lg:gap-6 lg:pb-6",
          controles
            ? "lg:grid-cols-[auto_1fr_auto]"
            : "sm:flex sm:items-center sm:justify-between",
        )}
      >
        <div
          role="radiogroup"
          aria-label="Tamanho da tela"
          className="flex gap-[3px] rounded-[10px] bg-[#0b1029]/70 p-[3px]"
        >
          {(Object.keys(APARELHOS) as Aparelho[]).map((chave) => {
            const { rotulo, Icone } = APARELHOS[chave];
            const marcado = chave === aparelho;
            return (
              <label key={chave} className="relative flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="aparelho-da-previa"
                  value={chave}
                  checked={marcado}
                  onChange={() => trocarAparelho(chave)}
                  className="peer sr-only"
                />
                <span
                  className={classes(
                    "flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-3 text-sm transition-colors duration-150",
                    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-white",
                    marcado
                      ? "bg-white/16 font-semibold text-white shadow-[0_1px_2px_rgb(0_0_0/0.35)]"
                      : "font-medium text-white/65 hover:text-white",
                  )}
                >
                  <Icone
                    aria-hidden
                    className="size-[18px]"
                    strokeWidth={1.75}
                  />
                  {rotulo}
                </span>
              </label>
            );
          })}
        </div>
        {controles && <div className="flex justify-center">{controles}</div>}
        {link && (
          <div className="flex items-center gap-2">
            {acoes}
            <BotaoSagital
              href={link}
              variante="inverso"
              className="flex-1 lg:flex-none lg:px-6"
            >
              {rotuloDoBotao}
            </BotaoSagital>
          </div>
        )}
      </div>
    </dialog>
  );
}
