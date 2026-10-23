import type { Metadata, Viewport } from "next";
import { BotaoDePreviaDoSite } from "@/components/sagital/BotaoDePreviaDoSite";
import { CartaoDaLista } from "@/components/sagital/CartaoDaLista";
import { ProvedorDaEscolha } from "@/components/sagital/EscolhaDoDemo";
import { PaginaClara } from "@/components/sagital/PaginaClara";
import { Caminho, ParDeFontes } from "@/components/sagital/TituloDosPacotes";
import { Container } from "@/components/ui/Container";
import { sitesDoPortfolio } from "@/data/portfolio";
import { demos } from "@/data/sagital";
import "../sagital.css";

export const metadata: Metadata = {
  title: "Todos os trabalhos",
  description:
    "Os sites completos da Sagital para escritórios e clínicas: advocacia, odontologia, arquitetura e contabilidade. Abra cada um ou veja ao vivo no celular, no tablet e no computador.",
  // Só a página inicial é indexável (PRODUCT.md).
  robots: { index: false, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

/**
 * Todos os trabalhos, no design das páginas claras: cartão com a primeira
 * tela, a paleta e a fonte, "Abrir o site" e o olho que abre a prévia ao
 * vivo (sem seletor de cor).
 */
export default function PaginaDosTrabalhos() {
  // A prévia ao vivo vive no mesmo provedor dos demos.
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
    <PaginaClara voltarPara="/#trabalhos">
      <ProvedorDaEscolha demos={opcoes}>
        <main id="topo" className="flex-1 pt-6 pb-16 sm:pt-10 sm:pb-24">
          <Container largura="normal">
            <Caminho
              itens={[{ rotulo: "Início", href: "/" }, { rotulo: "Trabalhos" }]}
            />
            <h1 className="sg-entra mt-6 text-[clamp(2.75rem,10vw,5.5rem)] leading-[0.92] [--ordem:1]">
              <ParDeFontes forte="Trabalhos" italico="selecionados" />
            </h1>
            <p className="sg-entra mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-texto-suave [--ordem:2] sm:text-lg">
              Sites completos para escritórios e clínicas, cada um com
              identidade e recursos próprios. Toque no olho e navegue no
              celular, no tablet e no computador.
            </p>

            <ul className="sg-entra mt-12 grid gap-x-5 gap-y-12 [--ordem:3] sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
              {sitesDoPortfolio.map((site) => (
                <li key={site.id}>
                  <CartaoDaLista
                    id={`trabalho-${site.id}`}
                    href={site.href}
                    captura={site.captura}
                    nome={site.nome}
                    etiqueta={site.ramo}
                    descricao={site.destaque}
                    fonte={site.fonte}
                    paleta={site.paleta}
                    abrir={{
                      rotulo: "Abrir o site",
                      complemento: `de ${site.nome}`,
                    }}
                    previa={
                      <BotaoDePreviaDoSite
                        variante="secundario"
                        site={{
                          nome: site.nome,
                          ramo: site.ramo,
                          href: site.href,
                        }}
                      />
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
