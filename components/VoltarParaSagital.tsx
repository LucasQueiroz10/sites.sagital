"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { jakarta } from "@/app/fontes";
import { classes } from "@/lib/classes";
import { useNoFimDaPagina } from "@/lib/useNoFimDaPagina";
import { usePassouDoTopo } from "@/lib/usePassouDoTopo";
import { useRolandoParaBaixo } from "@/lib/useRolandoParaBaixo";

const semAssinatura = () => () => {};

/**
 * Botão fixo no canto da tela dos demos e do portfólio, de volta à página
 * inicial da Sagital. Dentro da prévia ao vivo ele some: lá o site roda num
 * iframe, e o clique abriria a Sagital dentro do próprio quadro.
 */
export function VoltarParaSagital({
  acimaDaBarra = false,
}: {
  /** Nos demos, sobe enquanto a barra do WhatsApp está à vista no celular. */
  acimaDaBarra?: boolean;
}) {
  // No servidor não dá para saber se a página está num iframe: o botão só
  // aparece no navegador.
  const foraDaPrevia = useSyncExternalStore(
    semAssinatura,
    () => window.self === window.top,
    () => false,
  );
  const barraVisivel = usePassouDoTopo("[data-cta-principal]", true);
  // Some enquanto a pessoa desce lendo, para não cobrir texto e botões da
  // página, e volta no primeiro movimento para cima. No fim da página também
  // fica escondido: ali cobriria o rodapé, que já leva à Sagital. Com foco do
  // teclado, aparece sempre.
  const descendo = useRolandoParaBaixo();
  const noFim = useNoFimDaPagina();
  const escondido = descendo || noFim;

  if (!foraDaPrevia) return null;

  return (
    <Link
      href="/"
      className={classes(
        jakarta.className,
        "fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 z-40 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#111a3d]/95 pr-4 pl-3 text-[0.9375rem] font-bold tracking-[-0.01em] text-white shadow-[0_8px_24px_rgb(17_26_61/0.28)] ring-1 ring-white/15 sm:left-4",
        "transition-[translate,opacity,background-color] duration-200 ease-out hover:bg-[#1f48c2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f48c2] print:hidden",
        escondido
          ? "pointer-events-none translate-y-[calc(100%+1.5rem)] opacity-0 focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100"
          : acimaDaBarra && barraVisivel && "max-lg:-translate-y-[4.5rem]",
      )}
    >
      <ArrowLeft aria-hidden className="size-4 shrink-0" />
      <span>
        <span className="max-sm:sr-only">Voltar para a </span>Sagital
      </span>
    </Link>
  );
}
