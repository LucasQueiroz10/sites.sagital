import type { Metadata } from "next";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { GaleriaEmMosaico } from "@/components/nichos/GaleriaEmMosaico";
import { CabecaDaPagina, ProximaPagina } from "@/components/nichos/Interno";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import { restaurante as dados } from "@/data/restaurante";

const caminho = "/restaurante/galeria";

export const metadata: Metadata = {
  title: { absolute: `Galeria | ${dados.padrao.nome}` },
  description: "Os pratos, o salão e a feira do Limoeiro, em fotos.",
};

// O salão e a feira entre os pratos, para o mosaico ter ritmo de álbum.
const fotos = [
  dados.galeria[0],
  dados.imagemPrincipal,
  dados.salao.imagem,
  ...dados.cardapio.flatMap((c) => c.itens.slice(0, 1).map((i) => i.imagem)),
  dados.galeria[1],
  dados.casa.imagem,
  ...dados.galeria.slice(2),
].filter((f) => f !== undefined);

/** A galeria: o mosaico de fotos, com ampliação ao toque. */
export default function PaginaDaGaleria() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Galeria" }]}
        titulo="Na mesa e no"
        destaque="salão"
        modoDoDestaque="escreve"
        classeDoDestaque="manuscrito ml-2 inline-block -rotate-6 text-[1.3em] text-[var(--cor-pervinca-tinta)]"
        texto="Fotos dos pratos, do salão e da feira onde tudo começa. Toque em uma para ampliar."
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
      <section aria-label="Fotos" className="pt-4 pb-16 sm:pb-24">
        <Container largura="larga">
          <GaleriaEmMosaico imagens={fotos} />
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
