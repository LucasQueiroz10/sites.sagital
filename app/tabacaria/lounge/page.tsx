import { Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { CabecaDaPagina, ProximaPagina } from "@/components/nichos/Interno";
import { PalavrasQueAcendem } from "@/components/portfolio/PalavrasQueAcendem";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import {
  tabacaria as dados,
  regrasDoLounge,
  usosDoLounge,
} from "@/data/tabacaria";

const caminho = "/tabacaria/lounge";

export const metadata: Metadata = {
  title: { absolute: `O lounge | ${dados.padrao.nome}` },
  description:
    "Poltronas de couro, luz baixa e café: o lounge nos fundos da loja, para esperar, conversar e escolher com calma.",
};

/**
 * O lounge: o primeiro parágrafo acendendo palavra por palavra, os três usos
 * do espaço ao lado da foto que anda devagar, as comodidades e as regras da
 * casa (maioridade e ambiente sem fumo, como manda a lei).
 */
export default function PaginaDoLounge() {
  const [primeiro, ...outros] = dados.lounge.paragrafos;
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "O lounge" }]}
        titulo="Uma sala para conversar"
        texto={outros[0]}
        imagem={dados.lounge.imagem}
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

      <section aria-label="O lounge" className="py-20 sm:py-28">
        <Container largura="normal">
          <p className="text-[clamp(1.75rem,4.2vw,3rem)] leading-[1.2] [font-family:var(--fonte-titulo)]">
            {primeiro && <PalavrasQueAcendem texto={primeiro} />}
          </p>
        </Container>
      </section>

      <section
        aria-labelledby="usos"
        className="border-t border-borda bg-superficie py-16 sm:py-24"
      >
        <Container
          largura="larga"
          className="grid gap-12 lg:grid-cols-12 lg:items-center"
        >
          <div
            data-revela="foto"
            className="moldura paralaxe relative aspect-[4/5] overflow-hidden lg:col-span-5"
          >
            <Image
              src={dados.galeria[0]?.src ?? dados.imagemPrincipal.src}
              alt={dados.galeria[0]?.alt ?? dados.imagemPrincipal.alt}
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
              placeholder="blur"
            />
          </div>
          <div className="lg:col-span-7">
            <h2 id="usos" data-revela="titulo" className="titulo-de-secao">
              Para que serve
            </h2>
            <ul data-revela-grupo className="mt-8">
              {usosDoLounge.map((uso) => (
                <li key={uso.titulo} className="relative py-6">
                  <span
                    aria-hidden
                    data-revela="fio"
                    className="absolute inset-x-0 top-0 h-px bg-[var(--cor-latao)]"
                  />
                  <h3 data-revela="texto" className="text-2xl">
                    {uso.titulo}
                  </h3>
                  <p
                    data-revela="texto"
                    className="mt-1 text-lg text-texto-suave"
                  >
                    {uso.texto}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="comodidades" className="py-16 sm:py-24">
        <Container largura="larga" className="grid gap-12 md:grid-cols-2">
          <div>
            <h2
              id="comodidades"
              data-revela="titulo"
              className="titulo-de-secao"
            >
              Na sala
            </h2>
            <ul data-revela-grupo className="mt-8 grid gap-4">
              {dados.lounge.comodidades.map((item) => (
                <li key={item} data-revela className="flex gap-3 text-lg">
                  <Check
                    aria-hidden
                    className="mt-1 size-5 shrink-0 text-[var(--cor-latao)]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            data-revela="texto"
            className="moldura self-start px-6 py-8 sm:px-8"
          >
            <h2 className="titulo-de-secao">Regras da casa</h2>
            <ul className="mt-6 grid gap-4">
              {regrasDoLounge.map((regra) => (
                <li key={regra} className="border-t border-borda pt-4 text-lg">
                  {regra}
                </li>
              ))}
            </ul>
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
