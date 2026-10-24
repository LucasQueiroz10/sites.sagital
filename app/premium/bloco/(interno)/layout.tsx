import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { BarraInterna } from "@/components/premium/bloco/BarraInterna";
import { MarcaBloco } from "@/components/premium/bloco/Marcas";
import { VoltarParaSagital } from "@/components/VoltarParaSagital";
import { nome, paginas, raiz, rodape } from "@/data/bloco";
import { neutra, quadrada } from "../fontes";
import "../bloco.css";

export const metadata: Metadata = {
  // Site conceitual: fora dos buscadores, como a página inicial dele.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#e4e4e4" };

/**
 * As páginas internas da Bloco (cada seção da página inicial ganhou a sua):
 * o cabeçalho cinza, o conteúdo de cada página (que termina na auditoria
 * gratuita) e o rodapé grafite.
 */
export default function LayoutInterno({ children }: { children: ReactNode }) {
  return (
    <div
      data-premium="bloco"
      className={`${quadrada.variable} ${neutra.variable} relative flex min-h-dvh flex-col overflow-x-clip bg-[var(--cor-cinza)] font-[family-name:var(--font-neutra)] text-[var(--cor-tinta)]`}
    >
      <BarraInterna />
      <main className="flex-1">{children}</main>
      <RodapeDoPortfolio
        tom="escuro"
        nome={nome}
        marca={<MarcaBloco tamanho="grande" className="text-white" />}
        navegacao={[{ rotulo: "Início", href: raiz }, ...paginas]}
        rodape={rodape}
        className="bg-[#1c1c1c]"
      />
      <VoltarParaSagital />
    </div>
  );
}
