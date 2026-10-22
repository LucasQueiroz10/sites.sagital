import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { TemaDoNicho } from "@/components/TemaDoNicho";
import { BarraWhatsApp } from "@/components/nichos/BarraWhatsApp";
import { CabecalhoDoDemo } from "@/components/nichos/CabecalhoDoDemo";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import { RodapeDoDemo } from "@/components/nichos/RodapeDoDemo";
import { CapaDoEncarte } from "@/components/nichos/mercado/CapaDoEncarte";
import { Corredores } from "@/components/nichos/mercado/Corredores";
import { CupomDeEntrega } from "@/components/nichos/mercado/CupomDeEntrega";
import { GradeDeOfertas } from "@/components/nichos/mercado/GradeDeOfertas";
import { Secao, TituloDaSecao } from "@/components/ui/Secao";
import { mercado as dados } from "@/data/mercado";
import { barlow, barlowCondensed } from "./fontes";
import "./mercado.css";

export const metadata: Metadata = {
  title: { absolute: `${dados.padrao.nome} — ${dados.rotulo}` },
  description: dados.descricao,
  robots: { index: false, follow: false },
};

// Cor da barra do navegador no celular, combinando com o demo.
export const viewport: Viewport = { themeColor: "#ffd60a" };

export default function PaginaMercado() {
  const destaques = dados.ofertas.filter((oferta) => oferta.destaque);

  return (
    <TemaDoNicho
      nicho={dados.nicho}
      rotulo={dados.rotulo}
      padrao={dados.padrao}
      className={`${barlow.variable} ${barlowCondensed.variable}`}
    >
      <CabecalhoDoDemo
        navegacao={dados.navegacao}
        acao={dados.acaoPrincipal}
        rotuloDoNicho={dados.rotulo}
        classeDaMarca="marca text-2xl"
      />

      <main id="topo" className="flex-1">
        <CapaDoEncarte
          chamada={dados.chamada}
          destaques={destaques}
          acao={dados.acaoPrincipal}
          rotuloDoNicho={dados.rotulo}
        />

        <Secao id="ofertas" cheia className="pt-12 sm:pt-16">
          <GradeDeOfertas
            ofertas={dados.ofertas}
            rotuloDoNicho={dados.rotulo}
            cabecalho={
              <TituloDaSecao id="ofertas">Todas as ofertas</TituloDaSecao>
            }
          />
        </Secao>

        <Secao id="corredores" cheia className="bg-superficie">
          <Corredores
            corredores={dados.corredores}
            cabecalho={
              <TituloDaSecao id="corredores">Encontre na loja</TituloDaSecao>
            }
          />
        </Secao>

        <Secao id="entrega" titulo="Entrega e retirada" largura="larga">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <CupomDeEntrega entrega={dados.entrega} />
            <div className="relative -mx-4 aspect-[4/3] overflow-hidden sm:mx-0 sm:rounded-tema">
              <Image
                src={dados.imagemDaLoja.src}
                alt={dados.imagemDaLoja.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
          </div>
        </Secao>

        <Secao
          id="contato"
          titulo="Horário e endereço"
          largura="larga"
          className="border-t border-borda"
        >
          <Funcionamento
            expediente={dados.expediente}
            endereco={dados.endereco}
          />
        </Secao>
      </main>

      <RodapeDoDemo endereco={dados.endereco} classeDaMarca="marca text-xl" />
      <BarraWhatsApp acao={dados.acaoPrincipal} rotuloDoNicho={dados.rotulo} />
    </TemaDoNicho>
  );
}
