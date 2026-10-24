import type { Metadata } from "next";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { GaleriaEmMosaico } from "@/components/nichos/GaleriaEmMosaico";
import { CabecaDaPagina, ProximaPagina } from "@/components/nichos/Interno";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import { tabacaria as dados } from "@/data/tabacaria";

const caminho = "/tabacaria/galeria";

export const metadata: Metadata = {
  title: { absolute: `Galeria | ${dados.padrao.nome}` },
  description: "O lounge, as poltronas e os acessórios da loja, em fotos.",
};

// O ambiente e o acervo, sem pessoas fumando.
const fotos = [
  dados.imagemPrincipal,
  ...dados.galeria,
  dados.lounge.imagem,
  ...dados.imagensDaLoja,
];

/** O ambiente: o mosaico de fotos em molduras de latão, com ampliação. */
export default function PaginaDaGaleria() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Galeria" }]}
        titulo="O ambiente"
        texto="A loja, o lounge e as peças do acervo. Toque em uma foto para ampliar."
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
      <section aria-label="Fotos" className="py-16 sm:py-24">
        <Container largura="larga">
          <GaleriaEmMosaico imagens={fotos} classeDaFoto="moldura" />
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
