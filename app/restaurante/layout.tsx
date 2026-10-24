import type { Metadata, Viewport } from "next";
import { TemaDoNicho } from "@/components/TemaDoNicho";
import { BarraWhatsApp } from "@/components/nichos/BarraWhatsApp";
import { CabecalhoDoDemo } from "@/components/nichos/CabecalhoDoDemo";
import { RodapeDoDemo } from "@/components/nichos/RodapeDoDemo";
import { restaurante as dados } from "@/data/restaurante";
import "../demos.css";
import { barlow, barlowCondensada, caslon, kaushan, kristi } from "./fontes";
import "./restaurante.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Cor da barra do navegador no celular, combinando com o demo.
export const viewport: Viewport = { themeColor: "#fbf6ea" };

/**
 * A moldura de todas as páginas do restaurante: o toldo listrado no alto, o
 * rodapé e a barra do WhatsApp no celular. Cada página traz o miolo.
 */
export default function LayoutDoRestaurante({
  children,
}: LayoutProps<"/restaurante">) {
  return (
    <TemaDoNicho
      nicho={dados.nicho}
      rotulo={dados.rotulo}
      padrao={dados.padrao}
      paginas={dados.paginas}
      className={`${caslon.variable} ${kristi.variable} ${kaushan.variable} ${barlow.variable} ${barlowCondensada.variable} text-[1.0625rem]`}
    >
      <CabecalhoDoDemo
        navegacao={dados.navegacao}
        paginas={dados.paginas}
        raiz={dados.raiz}
        acao={dados.acaoPrincipal}
        rotuloDoNicho={dados.rotulo}
        classeDaMarca="marca pr-2 text-[1.75rem]"
        complementoDaMarca={
          <span className="condensada mt-0.5 block text-[0.6875rem] tracking-[0.2em] text-texto">
            {dados.assinatura}
          </span>
        }
        className="toldo"
      />
      <main id="topo" className="flex-1">
        {children}
      </main>
      <RodapeDoDemo dados={dados} classeDaMarca="marca text-3xl" />
      <BarraWhatsApp acao={dados.acaoPrincipal} rotuloDoNicho={dados.rotulo} />
    </TemaDoNicho>
  );
}
