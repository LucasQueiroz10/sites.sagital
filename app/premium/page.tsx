import type { Metadata, Viewport } from "next";
import { BotaoContato } from "@/components/sagital/BotaoContato";
import { CartaoDaLista } from "@/components/sagital/CartaoDaLista";
import { PaginaClara } from "@/components/sagital/PaginaClara";
import {
  Caminho,
  ParDeFontes,
  rotulo,
  serifaItalica,
  tituloDeSecao,
} from "@/components/sagital/TituloDosPacotes";
import { Container } from "@/components/ui/Container";
import {
  diferenciaisDoPremium,
  mensagemDoPremium,
  projetosPremium,
} from "@/data/premium";
import "../sagital.css";

export const metadata: Metadata = {
  title: "Projetos premium",
  description:
    "Sites além dos pacotes da Sagital: identidade feita do zero e recursos sob medida, com preço e prazo combinados com você.",
  // Só a página inicial é indexável (PRODUCT.md).
  robots: { index: false, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

/**
 * Projetos premium, no design das páginas claras: para quem precisa de mais
 * do que os três pacotes. O preço é "a definir": sai da conversa, não de uma
 * tabela.
 */
export default function PaginaDoPremium() {
  return (
    <PaginaClara voltarPara="/#premium">
      <main id="topo" className="flex-1 pt-6 pb-16 sm:pt-10 sm:pb-24">
        <Container largura="normal">
          <Caminho
            itens={[{ rotulo: "Início", href: "/" }, { rotulo: "Premium" }]}
          />
          <h1 className="sg-entra mt-6 text-[clamp(2.75rem,10vw,5.5rem)] leading-[0.92] [--ordem:1]">
            <ParDeFontes forte="Projetos" italico="premium" />
          </h1>
          <p className="sg-entra mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-texto-suave [--ordem:2] sm:text-lg">
            Para quando o seu negócio pede mais do que os pacotes: um site com
            identidade própria e os recursos que a sua operação precisa, pensado
            do zero com você.
          </p>
          <p className="sg-entra mt-6 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl bg-superficie px-5 py-3.5 [--ordem:2]">
            <span className={`${rotulo} text-texto-suave`}>Preço</span>
            <span
              className={`${serifaItalica} text-[1.5rem] leading-none text-[var(--sg-tinta-forte)]`}
            >
              A definir
            </span>
            <span className="text-sm text-texto-suave">
              combinado depois de entender o projeto
            </span>
          </p>

          <section
            aria-labelledby="exemplos"
            className="sg-entra mt-16 [--ordem:3] sm:mt-20"
          >
            <h2 id="exemplos" className={tituloDeSecao}>
              <ParDeFontes forte="Exemplos" italico="de projetos" />
            </h2>
            {projetosPremium.length > 0 ? (
              <ul className="mt-8 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {projetosPremium.map((projeto) => (
                  <li key={projeto.id}>
                    <CartaoDaLista
                      id={`premium-${projeto.id}`}
                      href={projeto.href}
                      captura={projeto.captura}
                      nome={projeto.nome}
                      etiqueta={projeto.ramo}
                      descricao={projeto.destaque}
                      fonte={projeto.fonte}
                      paleta={projeto.paleta}
                      abrir={{
                        rotulo: "Abrir o site",
                        complemento: `de ${projeto.nome}`,
                      }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-8 rounded-3xl border border-dashed border-[var(--cor-borda)] px-6 py-12 text-center text-[1.0625rem] text-texto-suave sm:py-16">
                Os primeiros exemplos chegam em breve. Enquanto isso, conte no
                WhatsApp o que você imagina para o seu site.
              </p>
            )}
          </section>

          <section
            aria-labelledby="o-que-muda"
            className="mt-20 grid gap-8 sm:mt-28 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16"
          >
            <div>
              <h2 id="o-que-muda" className={tituloDeSecao}>
                <ParDeFontes forte="O que" italico="muda" />
              </h2>
              <p className="mt-4 max-w-[36ch] text-[1.0625rem] leading-relaxed text-texto-suave">
                Os pacotes resolvem a maioria dos negócios. O premium é para o
                que não cabe neles.
              </p>
            </div>
            <ol className="border-t-2 border-[var(--sg-tinta-forte)]">
              {diferenciaisDoPremium.map(({ titulo, texto }, i) => (
                <li
                  key={titulo}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 border-b border-[var(--cor-borda)] py-5"
                >
                  <span className={`${rotulo} sg-num pt-1 text-texto-suave`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-texto">{titulo}</h3>
                    <p className="mt-1.5 max-w-[60ch] text-[0.9375rem] leading-relaxed text-texto-suave">
                      {texto}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section
            aria-labelledby="conversar"
            className="sg-foco-claro mt-20 flex flex-col gap-6 rounded-3xl bg-[var(--sg-tinta-forte)] px-6 py-10 sm:mt-28 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-12"
          >
            <div>
              <h2 id="conversar" className={`${tituloDeSecao} text-white`}>
                <ParDeFontes forte="Tem um projeto" italico="em mente?" />
              </h2>
              <p className="mt-3 max-w-[44ch] text-[1.0625rem] leading-relaxed text-white/80">
                Conte o que você precisa. A conversa é sem compromisso e a
                proposta chega com valor e prazo fechados.
              </p>
            </div>
            <BotaoContato
              rotulo="Conversar no WhatsApp"
              mensagem={mensagemDoPremium}
              variante="inverso"
              className="w-full shrink-0 sm:w-auto sm:px-7"
            />
          </section>
        </Container>
      </main>
    </PaginaClara>
  );
}
