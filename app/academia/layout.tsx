import type { Metadata, Viewport } from "next";
import { TemaDoNicho } from "@/components/TemaDoNicho";
import { BarraWhatsApp } from "@/components/nichos/BarraWhatsApp";
import { CabecalhoDoDemo } from "@/components/nichos/CabecalhoDoDemo";
import { RodapeDoDemo } from "@/components/nichos/RodapeDoDemo";
import { academia as dados } from "@/data/academia";
import "../demos.css";
import "./academia.css";
import { sofia, sofiaCondensada } from "./fontes";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Cor da barra do navegador no celular, combinando com o demo.
export const viewport: Viewport = { themeColor: "#ffffff" };

/**
 * A moldura de todas as páginas da academia: o tema da URL, o cabeçalho, o
 * rodapé e a barra do WhatsApp no celular. Cada página traz o miolo.
 */
export default function LayoutDaAcademia({
  children,
}: LayoutProps<"/academia">) {
  return (
    <TemaDoNicho
      nicho={dados.nicho}
      rotulo={dados.rotulo}
      padrao={dados.padrao}
      paginas={dados.paginas}
      className={`${sofia.variable} ${sofiaCondensada.variable}`}
    >
      <CabecalhoDoDemo
        navegacao={dados.navegacao}
        paginas={dados.paginas}
        raiz={dados.raiz}
        acao={dados.acaoPrincipal}
        rotuloDoNicho={dados.rotulo}
        classeDaMarca="marca text-[1.375rem] leading-none"
      />
      <main id="topo" className="flex-1">
        {children}
      </main>
      <RodapeDoDemo dados={dados} classeDaMarca="marca text-xl" />
      <BarraWhatsApp acao={dados.acaoPrincipal} rotuloDoNicho={dados.rotulo} />
    </TemaDoNicho>
  );
}
