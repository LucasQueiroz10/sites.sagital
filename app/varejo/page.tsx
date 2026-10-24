import type { Metadata } from "next";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import { VerMais } from "@/components/nichos/Interno";
import { BannerDeCampanha } from "@/components/nichos/varejo/BannerDeCampanha";
import { FaixaDeBeneficios } from "@/components/nichos/varejo/FaixaDeBeneficios";
import { Vitrine } from "@/components/nichos/varejo/Vitrine";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import { Secao } from "@/components/ui/Secao";
import { varejo as dados } from "@/data/varejo";
import { formatarPreco } from "@/lib/formato";

export const metadata: Metadata = {
  title: { absolute: `${dados.padrao.nome} — ${dados.rotulo}` },
  description: dados.descricao,
};

// A peça mais barata da loja, para o "a partir de" do topo.
const menorPreco = Math.min(
  ...dados.setores.flatMap((setor) => setor.pecas.map((peca) => peca.preco)),
);

const pagina = (rotulo: string) =>
  dados.paginas.find((p) => p.rotulo === rotulo)?.href ?? dados.raiz;

export default function PaginaVarejo() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <FaixaDeBeneficios beneficios={dados.beneficios} />
      <BannerDeCampanha
        titulo={dados.slogan}
        chamada={`${dados.chamada}, a partir de ${formatarPreco(menorPreco)}.`}
        imagem={dados.campanha}
        acao={dados.acaoPrincipal}
        rotuloDoNicho={dados.rotulo}
        primeiraVitrine={`#${dados.setores[0]?.id ?? "feminino"}`}
      />

      {dados.setores.map((setor) => (
        <Secao
          key={setor.id}
          id={setor.id}
          cheia
          className="pt-12 pb-4 sm:pt-16 sm:pb-6"
        >
          <div data-revela-grupo>
            <Vitrine
              setor={setor}
              parcelamento={dados.parcelamento}
              rotuloDoNicho={dados.rotulo}
            />
            <Container largura="larga" className="mt-6">
              <div data-revela="texto">
                <VerMais href={pagina(setor.nome)}>
                  Todas as peças do {setor.nome.toLowerCase()}
                </VerMais>
              </div>
            </Container>
          </div>
        </Secao>
      ))}

      <section
        id="como-comprar"
        aria-labelledby="como-comprar-titulo"
        className="scroll-mt-20 pt-12 sm:pt-16"
      >
        <Container largura="larga">
          <div
            data-revela-grupo
            className="rounded-2xl bg-superficie px-5 py-8 sm:px-10 sm:py-12"
          >
            {/* O botão fica ao lado do título a partir de 640px; no
                celular, desce para depois dos passos, que o explicam. */}
            <div className="flex items-end justify-between gap-5">
              <h2 id="como-comprar-titulo" data-revela="titulo">
                Como comprar
              </h2>
              <div className="hidden sm:block">
                <BotaoWhatsApp
                  acao={dados.acaoPrincipal}
                  rotuloDoNicho={dados.rotulo}
                />
              </div>
            </div>
            <ol className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
              {dados.comoComprar.map((passo, i) => (
                <li key={passo.titulo} className="relative flex gap-4 pt-5">
                  <span
                    aria-hidden
                    data-revela="fio"
                    className="absolute inset-x-0 top-0 h-px bg-[var(--cor-fio)]"
                  />
                  <span
                    aria-hidden
                    data-revela
                    className="numero grid size-9 shrink-0 place-items-center rounded-full bg-fundo text-sm font-bold"
                  >
                    {i + 1}
                  </span>
                  <div data-revela="texto">
                    <h3 className="text-lg leading-snug font-semibold">
                      {passo.titulo}
                    </h3>
                    <p className="mt-1 text-texto-suave">{passo.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="sm:hidden">
                <BotaoWhatsApp
                  acao={dados.acaoPrincipal}
                  rotuloDoNicho={dados.rotulo}
                />
              </div>
              <div data-revela="texto">
                <VerMais href={pagina("Como comprar")}>
                  Trocas, entrega e medidas
                </VerMais>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Secao id="contato" titulo="Horário e endereço" largura="larga">
        <div data-revela="texto">
          <Funcionamento
            expediente={dados.expediente}
            endereco={dados.endereco}
            comoChegar
          />
        </div>
        <div data-revela="texto" className="mt-10">
          <VerMais href={pagina("Loja")}>Conhecer a loja</VerMais>
        </div>
      </Secao>
    </>
  );
}
