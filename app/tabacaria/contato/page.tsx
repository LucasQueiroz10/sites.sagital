import type { Metadata } from "next";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import {
  CabecaDaPagina,
  Duvidas,
  ProximaPagina,
} from "@/components/nichos/Interno";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import { tabacaria as dados, perguntasDaTabacaria } from "@/data/tabacaria";

const caminho = "/tabacaria/contato";

export const metadata: Metadata = {
  title: { absolute: `Contato | ${dados.padrao.nome}` },
  description: "Horários, endereço e as dúvidas sobre a visita à loja.",
};

/** Contato: o horário com o status ao vivo, o endereço e as dúvidas da visita. */
export default function PaginaDeContato() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Contato" }]}
        titulo="A porta de madeira"
        texto={`${dados.endereco.logradouro}, ${dados.endereco.bairro}. ${dados.endereco.referencia ?? ""}.`}
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
      <section aria-label="Horários e endereço" className="py-16 sm:py-24">
        <Container largura="larga">
          <div
            data-revela="texto"
            className="moldura bg-superficie px-6 py-8 sm:px-10 sm:py-12"
          >
            <Funcionamento
              expediente={dados.expediente}
              endereco={dados.endereco}
            />
          </div>
        </Container>
      </section>
      <Duvidas
        perguntas={perguntasDaTabacaria}
        className="border-t border-borda bg-superficie"
      />
      <ProximaPagina
        raiz={dados.raiz}
        paginas={dados.paginas}
        atual={caminho}
      />
    </>
  );
}
