import type { Metadata, Viewport } from "next";
import { AvisoMaioridade } from "@/components/AvisoMaioridade";
import { TemaDoNicho } from "@/components/TemaDoNicho";
import { BarraWhatsApp } from "@/components/nichos/BarraWhatsApp";
import { CabecalhoDoDemo } from "@/components/nichos/CabecalhoDoDemo";
import { RodapeDoDemo } from "@/components/nichos/RodapeDoDemo";
import { tabacaria as dados } from "@/data/tabacaria";
import "../demos.css";
import { jost, marcellus } from "./fontes";
import "./tabacaria.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Cor da barra do navegador no celular, combinando com o demo.
export const viewport: Viewport = { themeColor: "#120e0b" };

/**
 * A moldura de todas as páginas da tabacaria: o aviso de maioridade antes de
 * qualquer conteúdo (confirmado uma vez por sessão), o cabeçalho, o rodapé
 * com os avisos legais e a barra do WhatsApp no celular.
 */
export default function LayoutDaTabacaria({
  children,
}: LayoutProps<"/tabacaria">) {
  return (
    <TemaDoNicho
      nicho={dados.nicho}
      rotulo={dados.rotulo}
      padrao={dados.padrao}
      paginas={dados.paginas}
      className={`${marcellus.variable} ${jost.variable}`}
    >
      <AvisoMaioridade textura={dados.imagemMadeira}>
        <CabecalhoDoDemo
          navegacao={dados.navegacao}
          paginas={dados.paginas}
          raiz={dados.raiz}
          acao={dados.acaoPrincipal}
          rotuloDoNicho={dados.rotulo}
          classeDaMarca="marca text-sm sm:text-base"
        />
        <main id="topo" className="flex-1">
          {children}
        </main>
        <RodapeDoDemo
          dados={dados}
          classeDaMarca="marca"
          avisos={
            <div className="moldura px-5 py-6 text-center">
              <p className="text-base font-semibold tracking-wide text-texto uppercase">
                {dados.avisos.maioridade}
              </p>
              <p className="mx-auto mt-3 max-w-[60ch] text-texto">
                {dados.avisos.saude}
              </p>
            </div>
          }
        />
        <BarraWhatsApp
          acao={dados.acaoPrincipal}
          rotuloDoNicho={dados.rotulo}
        />
      </AvisoMaioridade>
    </TemaDoNicho>
  );
}
