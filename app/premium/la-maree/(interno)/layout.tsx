import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { BarraInterna } from "@/components/premium/la-maree/BarraInterna";
import { VoltarParaSagital } from "@/components/VoltarParaSagital";
import { nome, paginas, raiz, rodape } from "@/data/la-maree";
import { caligrafia, grotesca, serifa } from "../fontes";
import "../la-maree.css";

export const metadata: Metadata = {
  // Site conceitual: fora dos buscadores, como a página inicial dele.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#0c0b09" };

/**
 * As páginas internas da La Marée (cada seção da página inicial ganhou a
 * sua): a barra na tinta, o grão de filme por cima de tudo, o conteúdo e o
 * rodapé.
 */
export default function LayoutInterno({ children }: { children: ReactNode }) {
  return (
    <div
      data-premium="la-maree"
      className={`${serifa.variable} ${caligrafia.variable} ${grotesca.variable} relative flex min-h-dvh flex-col overflow-x-clip bg-[var(--cor-tinta)] font-texto text-[var(--cor-creme)]`}
    >
      <div aria-hidden className="lm-grao" />
      <BarraInterna />
      <main id="topo" className="flex-1">
        {children}
      </main>
      <RodapeDoPortfolio
        tom="escuro"
        nome={nome}
        marca={
          <span className="lm-serifa text-[2rem] text-[var(--cor-creme)]">
            {nome}
          </span>
        }
        navegacao={[{ rotulo: "Início", href: raiz }, ...paginas]}
        rodape={rodape}
        className="border-t border-[var(--cor-borda)] bg-[var(--cor-tinta)]"
      />
      <VoltarParaSagital />
    </div>
  );
}
