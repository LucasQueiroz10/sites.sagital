import type { Metadata } from "next";
import Image from "next/image";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import {
  CabecaDaPagina,
  ProximaPagina,
  VerMais,
} from "@/components/nichos/Interno";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import { atendimento, tabacaria as dados } from "@/data/tabacaria";

const caminho = "/tabacaria/loja";

export const metadata: Metadata = {
  title: { absolute: `A loja | ${dados.padrao.nome}` },
  description:
    "O acervo da loja: sedas, piteiras, isqueiros, cinzeiros, tabaqueiras e acessórios, com atendimento sem pressa.",
};

/**
 * A loja: o diretório inteiro em placas grandes, cada uma separada por um
 * friso de latão que se desenha; o atendimento em três passos e as duas
 * fotos do acervo. Sem preços, ofertas ou chamadas ao consumo.
 */
export default function PaginaDaLoja() {
  const [tabaqueira, isqueiro] = dados.imagensDaLoja;
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "A loja" }]}
        titulo="O acervo da casa"
        texto="Peças escolhidas uma a uma, para usar todo dia ou para guardar. Venha ver de perto: tudo sai da vitrine para a sua mão."
        imagem={tabaqueira}
        acoes={
          <div data-cta-principal>
            <BotaoWhatsApp
              acao={dados.acaoPrincipal}
              rotuloDoNicho={dados.rotulo}
              tamanho="grande"
              className="w-full sm:w-auto"
            />
          </div>
        }
      />

      <section aria-labelledby="diretorio" className="py-16 sm:py-24">
        <Container largura="larga">
          <h2 id="diretorio" data-revela="titulo" className="titulo-de-secao">
            Diretório
          </h2>
          <ul className="mt-10">
            {dados.categorias.map((categoria) => (
              <li key={categoria.nome} data-revela-grupo className="relative">
                <span
                  aria-hidden
                  data-revela="fio"
                  className="absolute inset-x-0 top-0 h-px bg-[var(--cor-latao)]"
                />
                <div className="grid gap-2 py-8 md:grid-cols-12 md:items-baseline md:gap-8">
                  <h3
                    data-revela="texto"
                    className="text-[clamp(1.75rem,4vw,2.75rem)] md:col-span-6"
                  >
                    {categoria.nome}
                  </h3>
                  <p
                    data-revela="texto"
                    className="text-lg text-texto-suave md:col-span-6"
                  >
                    {categoria.descricao}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="atendimento"
        className="border-t border-borda bg-superficie py-16 sm:py-24"
      >
        <Container
          largura="larga"
          className="grid gap-12 lg:grid-cols-12 lg:items-center"
        >
          <div className="lg:col-span-7">
            <h2
              id="atendimento"
              data-revela="titulo"
              className="titulo-de-secao"
            >
              Atendimento sem pressa
            </h2>
            <ol data-revela-grupo className="mt-10 grid gap-8">
              {atendimento.map((passo) => (
                <li
                  key={passo.titulo}
                  data-revela
                  className="moldura px-6 py-6"
                >
                  <h3 className="text-2xl text-[var(--cor-latao)]">
                    {passo.titulo}
                  </h3>
                  <p className="mt-2 text-lg text-texto-suave">{passo.texto}</p>
                </li>
              ))}
            </ol>
          </div>
          {isqueiro && (
            <div
              data-revela="foto"
              className="moldura paralaxe relative aspect-[4/5] overflow-hidden lg:col-span-5"
            >
              <Image
                src={isqueiro.src}
                alt={isqueiro.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
                placeholder="blur"
              />
            </div>
          )}
        </Container>
      </section>

      <section aria-label="Aviso" className="py-16">
        <Container
          largura="normal"
          className="grid justify-items-center gap-8 text-center"
        >
          <p data-revela="texto" className="max-w-[56ch] text-texto-suave">
            Venda só na loja, para maiores de 18 anos com documento. Não
            vendemos pelo site nem pelo WhatsApp.
          </p>
          <div data-revela="texto">
            <VerMais href="/tabacaria/contato">Horários e endereço</VerMais>
          </div>
        </Container>
      </section>

      <ProximaPagina
        raiz={dados.raiz}
        paginas={dados.paginas}
        atual={caminho}
      />
    </>
  );
}
