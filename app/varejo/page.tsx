import type { Metadata, Viewport } from "next";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { TemaDoNicho } from "@/components/TemaDoNicho";
import { BarraWhatsApp } from "@/components/nichos/BarraWhatsApp";
import { CabecalhoDoDemo } from "@/components/nichos/CabecalhoDoDemo";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import { RodapeDoDemo } from "@/components/nichos/RodapeDoDemo";
import { BannerDeCampanha } from "@/components/nichos/varejo/BannerDeCampanha";
import { FaixaDeBeneficios } from "@/components/nichos/varejo/FaixaDeBeneficios";
import { Vitrine } from "@/components/nichos/varejo/Vitrine";
import { Container } from "@/components/ui/Container";
import { Secao } from "@/components/ui/Secao";
import { varejo as dados } from "@/data/varejo";
import { formatarPreco } from "@/lib/formato";
import { hanken } from "./fontes";
import "./varejo.css";

export const metadata: Metadata = {
  title: { absolute: `${dados.padrao.nome} — ${dados.rotulo}` },
  description: dados.descricao,
  robots: { index: false, follow: false },
};

// Cor da barra do navegador no celular, combinando com o demo.
export const viewport: Viewport = { themeColor: "#ffffff" };

// A peça mais barata da loja, para o "a partir de" do topo.
const menorPreco = Math.min(
  ...dados.setores.flatMap((setor) => setor.pecas.map((peca) => peca.preco)),
);

export default function PaginaVarejo() {
  return (
    <TemaDoNicho
      nicho={dados.nicho}
      rotulo={dados.rotulo}
      padrao={dados.padrao}
      className={hanken.variable}
    >
      <CabecalhoDoDemo
        navegacao={dados.navegacao}
        acao={dados.acaoPrincipal}
        rotuloDoNicho={dados.rotulo}
        classeDaMarca="marca text-destaque text-[1.375rem] leading-none"
      />

      <main id="topo" className="flex-1">
        <FaixaDeBeneficios beneficios={dados.beneficios} />
        <BannerDeCampanha
          titulo={dados.slogan}
          chamada={`${dados.chamada}, a partir de ${formatarPreco(menorPreco)}.`}
          imagem={dados.campanha}
          acao={dados.acaoPrincipal}
          rotuloDoNicho={dados.rotulo}
          primeiraVitrine={`#${dados.setores[0].id}`}
        />

        {dados.setores.map((setor) => (
          <Secao
            key={setor.id}
            id={setor.id}
            cheia
            className="pt-12 pb-4 sm:pt-16 sm:pb-6"
          >
            <Vitrine
              setor={setor}
              parcelamento={dados.parcelamento}
              rotuloDoNicho={dados.rotulo}
            />
          </Secao>
        ))}

        <section
          id="como-comprar"
          aria-labelledby="como-comprar-titulo"
          className="scroll-mt-20 pt-12 sm:pt-16"
        >
          <Container largura="larga">
            <div className="rounded-2xl bg-superficie px-5 py-8 sm:px-10 sm:py-12">
              {/* O botão fica ao lado do título a partir de 640px; no
                  celular, desce para depois dos passos, que o explicam. */}
              <div className="flex items-end justify-between gap-5">
                <h2 id="como-comprar-titulo">Como comprar</h2>
                <div className="hidden sm:block">
                  <BotaoWhatsApp
                    acao={dados.acaoPrincipal}
                    rotuloDoNicho={dados.rotulo}
                  />
                </div>
              </div>
              <ol className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
                {dados.comoComprar.map((passo, i) => (
                  <li
                    key={passo.titulo}
                    className="flex gap-4 border-t border-[var(--cor-fio)] pt-5"
                  >
                    <span
                      aria-hidden
                      className="numero grid size-9 shrink-0 place-items-center rounded-full bg-fundo text-sm font-bold"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg leading-snug font-semibold">
                        {passo.titulo}
                      </h3>
                      <p className="mt-1 text-texto-suave">{passo.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 sm:hidden">
                <BotaoWhatsApp
                  acao={dados.acaoPrincipal}
                  rotuloDoNicho={dados.rotulo}
                />
              </div>
            </div>
          </Container>
        </section>

        <Secao id="contato" titulo="Horário e endereço" largura="larga">
          <Funcionamento
            expediente={dados.expediente}
            endereco={dados.endereco}
            comoChegar
          />
        </Secao>
      </main>

      <RodapeDoDemo dados={dados} classeDaMarca="marca text-xl" />
      <BarraWhatsApp acao={dados.acaoPrincipal} rotuloDoNicho={dados.rotulo} />
    </TemaDoNicho>
  );
}
