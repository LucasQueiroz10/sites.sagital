import type { Metadata } from "next";
import Image from "next/image";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { Funcionamento } from "@/components/nichos/Funcionamento";
import { CabecaDaPagina, ProximaPagina } from "@/components/nichos/Interno";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import { varejo as dados, naLoja } from "@/data/varejo";

const caminho = "/varejo/loja";

export const metadata: Metadata = {
  title: { absolute: `Loja | ${dados.padrao.nome}` },
  description:
    "Horário, endereço, provador e estacionamento da loja, e como separar peças para provar.",
};

/**
 * A loja: o horário com o status ao vivo, a foto da campanha andando
 * devagar e o que a loja física oferece, em três cartões.
 */
export default function PaginaDaLoja() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Loja" }]}
        titulo="Venha provar na loja"
        texto={`${dados.endereco.logradouro}, ${dados.endereco.bairro}. ${dados.endereco.referencia ?? ""}.`}
        acoes={
          <div data-cta-principal>
            <BotaoWhatsApp
              acao={{
                rotulo: "Separar peças para provar",
                pedido: "Quero separar algumas peças para provar na loja.",
              }}
              rotuloDoNicho={dados.rotulo}
              tamanho="grande"
              className="w-full sm:w-auto"
            />
          </div>
        }
      />

      <section
        aria-label="Horário e endereço"
        className="border-t border-borda py-16 sm:py-24"
      >
        <Container largura="larga">
          <div data-revela="texto">
            <Funcionamento
              expediente={dados.expediente}
              endereco={dados.endereco}
              comoChegar
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="na-loja" className="pb-16 sm:pb-24">
        <Container largura="larga">
          <div
            data-revela="foto"
            className="paralaxe relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/7]"
          >
            <Image
              src={dados.campanha.src}
              alt={dados.campanha.alt}
              fill
              sizes="(min-width: 1280px) 1232px, 100vw"
              className="object-cover object-[50%_15%]"
              placeholder="blur"
            />
          </div>
          <h2
            id="na-loja"
            data-revela="titulo"
            className="titulo-de-secao mt-14"
          >
            Na loja
          </h2>
          <ul data-revela-grupo className="mt-8 grid gap-3 md:grid-cols-3">
            {naLoja.map((item) => (
              <li
                key={item.titulo}
                data-revela="cartao"
                className="rounded-2xl bg-superficie p-6 sm:p-8"
              >
                <h3 className="text-xl font-semibold">{item.titulo}</h3>
                <p className="mt-2 text-texto-suave">{item.texto}</p>
              </li>
            ))}
          </ul>
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
