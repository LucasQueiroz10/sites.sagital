import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { BarraInterna } from "@/components/premium/redoma/BarraInterna";
import { Comecar } from "@/components/premium/redoma/Interno";
import { Logo } from "@/components/premium/redoma/Logo";
import { VoltarParaSagital } from "@/components/VoltarParaSagital";
import { nome, nomeNoTexto, paginas, raiz, rodape } from "@/data/redoma";
import { readex } from "../fontes";
import "../redoma.css";

export const metadata: Metadata = {
  // Site conceitual: fora dos buscadores, como a página inicial dele.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#000000" };

/**
 * As páginas internas da Redoma (cada seção da página inicial ganhou a
 * sua): a barra em pílulas, o conteúdo e, no fim de todas, o formulário de
 * começar ou pedir suporte.
 */
export default function LayoutInterno({ children }: { children: ReactNode }) {
  return (
    <div
      id="topo"
      data-premium="redoma"
      className={`${readex.variable} min-h-dvh`}
    >
      <BarraInterna />
      <main>
        {children}
        <Comecar />
      </main>
      <RodapeDoPortfolio
        tom="escuro"
        nome={nomeNoTexto}
        marca={
          <span className="flex items-center gap-2.5 text-[1.75rem] font-medium tracking-[-0.04em] text-white">
            <Logo className="size-7" />
            {nome}
          </span>
        }
        navegacao={[{ rotulo: "início", href: raiz }, ...paginas]}
        rodape={rodape}
        className="border-t border-white/10 bg-black"
      />
      <VoltarParaSagital />
    </div>
  );
}
