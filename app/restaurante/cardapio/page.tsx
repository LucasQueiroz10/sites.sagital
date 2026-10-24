import { ShoppingBag } from "lucide-react";
import type { Metadata } from "next";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { CabecaDaPagina, ProximaPagina } from "@/components/nichos/Interno";
import { CardapioCompleto } from "@/components/nichos/restaurante/CardapioCompleto";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Botao } from "@/components/ui/Botao";
import { Container } from "@/components/ui/Container";
import { restaurante as dados } from "@/data/restaurante";

const caminho = "/restaurante/cardapio";

export const metadata: Metadata = {
  title: { absolute: `Cardápio | ${dados.padrao.nome}` },
  description:
    "Bowls, saladas, sanduíches, doces e bebidas, com filtro de vegano, vegetariano e sem glúten, e pedido pelo WhatsApp.",
};

/** O cardápio inteiro, com o índice e o filtro por selo grudados no alto. */
export default function PaginaDoCardapio() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Cardápio" }]}
        titulo="O cardápio"
        destaque="inteiro"
        modoDoDestaque="escreve"
        classeDoDestaque="manuscrito ml-2 inline-block -rotate-6 text-[1.25em] text-[var(--cor-pervinca-tinta)]"
        texto="Tudo montado na hora, com o que chegou da feira. Filtre pelo que você come e peça o prato direto pelo WhatsApp."
        acoes={
          <>
            <div data-cta-principal>
              <BotaoWhatsApp
                acao={dados.acaoPrincipal}
                rotuloDoNicho={dados.rotulo}
                tamanho="grande"
                className="w-full sm:w-auto"
              />
            </div>
            <Botao
              href={dados.delivery.url}
              externo
              tamanho="grande"
              className="bg-[#d81e2b]! text-white! hover:bg-[#b91824]!"
            >
              <ShoppingBag aria-hidden className="size-5 shrink-0" />
              {dados.delivery.rotulo}
              <span className="sr-only"> (abre em nova aba)</span>
            </Botao>
          </>
        }
      />

      <CardapioCompleto
        categorias={dados.cardapio}
        rotuloDoNicho={dados.rotulo}
      />

      <Container largura="larga" className="pb-16">
        <p
          data-revela="texto"
          className="max-w-[60ch] text-sm text-texto-suave"
        >
          Preços em reais. Toda base pode trocar por quinoa ou folhas, e
          qualquer prato sai sem lactose: é só pedir.
        </p>
      </Container>
      <div aria-hidden className="xadrez xadrez-que-anda" />
      <ProximaPagina
        raiz={dados.raiz}
        paginas={dados.paginas}
        atual={caminho}
      />
    </>
  );
}
