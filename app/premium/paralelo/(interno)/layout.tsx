import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { jakarta } from "@/app/fontes";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { BarraInterna } from "@/components/premium/paralelo/BarraInterna";
import { Comecar } from "@/components/premium/paralelo/Interno";
import { VoltarParaSagital } from "@/components/VoltarParaSagital";
import { nome, paginas, raiz, rodape } from "@/data/paralelo";
import "../paralelo.css";

export const metadata: Metadata = {
  // Site conceitual: fora dos buscadores, como a página inicial dele.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#000000" };

/**
 * As páginas internas da Paralelo (cada seção da página inicial ganhou a
 * sua): a barra fixa, o conteúdo da página e, no fim de todas, o formulário
 * de abrir conta ou falar com vendas.
 */
export default function LayoutInterno({ children }: { children: ReactNode }) {
  return (
    <div
      id="topo"
      data-premium="paralelo"
      className={`${jakarta.variable} min-h-dvh`}
    >
      <BarraInterna />
      <main className="pt-16">
        {children}
        <Comecar />
      </main>
      <RodapeDoPortfolio
        tom="escuro"
        nome={nome}
        marca={
          <span className="text-[1.75rem] font-extrabold tracking-[-0.01em] text-white">
            {nome}
          </span>
        }
        navegacao={[{ rotulo: "Início", href: raiz }, ...paginas]}
        rodape={rodape}
        className="border-t border-[var(--linha)] bg-[#050507]"
      />
      <VoltarParaSagital />
    </div>
  );
}
