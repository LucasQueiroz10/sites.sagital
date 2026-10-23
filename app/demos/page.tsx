import type { Metadata, Viewport } from "next";
import { BotaoDePrevia } from "@/components/sagital/BotaoDePrevia";
import { CartaoDaLista } from "@/components/sagital/CartaoDaLista";
import { ProvedorDaEscolha } from "@/components/sagital/EscolhaDoDemo";
import { PaginaClara } from "@/components/sagital/PaginaClara";
import { Caminho, ParDeFontes } from "@/components/sagital/TituloDosPacotes";
import { Container } from "@/components/ui/Container";
import { demos } from "@/data/sagital";
import "../sagital.css";

export const metadata: Metadata = {
  title: "Todos os demos",
  description:
    "Os quatro demos da Sagital: academia, varejo, restaurante e tabacaria. Abra cada um ou veja ao vivo no celular, no tablet e no computador.",
  // Só a página inicial é indexável (PRODUCT.md).
  robots: { index: false, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

/**
 * Todos os demos, no design das páginas claras: cartão com a primeira tela,
 * a paleta e a fonte, "Abrir o demo" e o olho que abre a prévia ao vivo com
 * o seletor de ramo, nome e cor.
 */
export default function PaginaDosDemos() {
  const opcoes = demos.map(
    ({ nicho, rotulo, padrao, captura, capturaDesktop }) => ({
      nicho,
      rotulo,
      padrao,
      captura,
      capturaDesktop,
    }),
  );

  return (
    <PaginaClara voltarPara="/#demos">
      <ProvedorDaEscolha demos={opcoes}>
        <main id="topo" className="flex-1 pt-6 pb-16 sm:pt-10 sm:pb-24">
          <Container largura="normal">
            <Caminho
              itens={[{ rotulo: "Início", href: "/" }, { rotulo: "Demos" }]}
            />
            <h1 className="sg-entra mt-6 text-[clamp(2.75rem,10vw,5.5rem)] leading-[0.92] [--ordem:1]">
              <ParDeFontes forte="Demos" italico="por ramo" />
            </h1>
            <p className="sg-entra mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-texto-suave [--ordem:2] sm:text-lg">
              Quatro demos, cada um com a cara do ramo. São pontos de partida,
              não limites: o seu site é feito para o seu negócio, seja qual for
              o ramo. Toque no olho e veja o demo ao vivo no celular, no tablet
              e no computador.
            </p>

            <ul className="sg-entra mt-12 grid gap-x-5 gap-y-12 [--ordem:3] sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
              {demos.map((demo) => (
                <li key={demo.nicho}>
                  <CartaoDaLista
                    id={`demo-${demo.nicho}`}
                    href={`/${demo.nicho}`}
                    captura={demo.captura}
                    nome={demo.padrao.nome}
                    etiqueta={demo.rotulo}
                    descricao={demo.descricao}
                    fonte={demo.fonte}
                    paleta={demo.paleta}
                    abrir={{
                      rotulo: "Abrir o demo",
                      complemento: `de ${demo.rotulo.toLowerCase()}`,
                    }}
                    previa={
                      <BotaoDePrevia nicho={demo.nicho} rotulo={demo.rotulo} />
                    }
                  />
                </li>
              ))}
            </ul>
          </Container>
        </main>
      </ProvedorDaEscolha>
    </PaginaClara>
  );
}
