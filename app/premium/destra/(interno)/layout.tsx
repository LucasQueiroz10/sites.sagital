import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { BarraInterna } from "@/components/premium/destra/BarraInterna";
import { Avaliar } from "@/components/premium/destra/Interno";
import { Logo } from "@/components/premium/destra/Logo";
import { VoltarParaSagital } from "@/components/VoltarParaSagital";
import { nome, paginas, raiz, rodape } from "@/data/destra";
import { inter } from "../fontes";
import "../destra.css";

export const metadata: Metadata = {
  // Site conceitual: fora dos buscadores, como a página inicial dele.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

/**
 * As páginas internas da Destra (cada seção da página inicial ganhou a
 * sua): a barra em pílulas, o conteúdo e, no fim de todas, a avaliação
 * gratuita com as perguntas.
 */
export default function LayoutInterno({ children }: { children: ReactNode }) {
  return (
    <div
      id="topo"
      data-premium="destra"
      className={`${inter.variable} min-h-dvh`}
    >
      <BarraInterna />
      <main>
        {children}
        <Avaliar />
      </main>
      <RodapeDoPortfolio
        tom="claro"
        nome={nome}
        marca={
          <span className="flex items-center gap-2.5 text-[1.5rem] font-medium tracking-[-0.03em] text-black">
            <Logo className="size-7" />
            {nome}
          </span>
        }
        navegacao={[{ rotulo: "Início", href: raiz }, ...paginas]}
        rodape={rodape}
        className="border-t border-black/[0.08] bg-white"
      />
      <VoltarParaSagital />
    </div>
  );
}
