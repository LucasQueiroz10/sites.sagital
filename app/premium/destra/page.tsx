import { Plus } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { Contador } from "@/components/premium/Contador";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Abertura } from "@/components/premium/destra/Abertura";
import { Avaliacao } from "@/components/premium/destra/Avaliacao";
import { Configurador } from "@/components/premium/destra/Configurador";
import { VerMais } from "@/components/premium/destra/Interno";
import { Logo } from "@/components/premium/destra/Logo";
import { Pegadas } from "@/components/premium/destra/Pegadas";
import { Relatos } from "@/components/premium/destra/Relatos";
import { Sinal } from "@/components/premium/destra/Sinal";
import { VoltarParaSagital } from "@/components/VoltarParaSagital";
import {
  fichaCompleta,
  fichaEmDestaque,
  jornada,
  nome,
  paginas,
  perguntas,
  raiz,
  rodape,
} from "@/data/destra";
import maoAberta from "@/public/imagens/premium/destra/mao-aberta.jpg";
import { inter } from "./fontes";
import "./destra.css";

export const metadata: Metadata = {
  title: { absolute: "Destra | Projetos premium da Sagital" },
  description: rodape.descricao,
  // Site conceitual: fora dos buscadores, como os demos e os trabalhos.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

const container = "mx-auto w-full max-w-[84rem] px-4 md:px-8";

/** Título e texto de abertura de cada seção, que entram ao rolar. */
function Cabeca({
  id,
  titulo,
  texto,
}: {
  id: string;
  titulo: string;
  texto?: string;
}) {
  return (
    <div className="max-w-[48rem]">
      <h2 id={id} className="dt-h2" data-revela="titulo">
        {titulo}
      </h2>
      {texto && (
        <p
          data-revela="texto"
          className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-black/65"
        >
          {texto}
        </p>
      )}
    </div>
  );
}

export default function PaginaDaDestra() {
  return (
    <div
      id="topo"
      data-premium="destra"
      className={`${inter.variable} min-h-dvh`}
    >
      <Abertura />
      <RevelarAoRolar raiz="destra" />

      <main>
        <section
          id="pegadas"
          aria-labelledby="pegadas-titulo"
          className="dt-secao pt-20 pb-24 sm:pt-28 sm:pb-32"
        >
          <div className={container}>
            <Cabeca
              id="pegadas-titulo"
              titulo="Uma pegada para cada coisa que você segura"
              texto="Escolha uma e veja a mão fechar. Os dedos se movem um de cada vez e param sozinhos quando encostam no objeto."
            />
            <div data-revela className="mt-12 sm:mt-16">
              <Pegadas />
            </div>
            <div data-revela className="mt-10">
              <VerMais href={`${raiz}/pegadas`}>Ver as sete pegadas</VerMais>
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          aria-labelledby="como-titulo"
          className="dt-secao border-t border-black/[0.08] py-24 sm:py-32"
        >
          <div className={container}>
            <Cabeca
              id="como-titulo"
              titulo="Você pensa no gesto. A mão faz."
              texto="A mesma contração, do começo ao fim: o sinal cru do músculo, o que o chip entende dele e o movimento dos dedos."
            />
            <div className="mt-14 sm:mt-20">
              <Sinal />
            </div>
            <div data-revela className="mt-12">
              <VerMais href={`${raiz}/como-funciona`}>
                Ficha técnica e encaixes
              </VerMais>
            </div>
          </div>
        </section>

        <section
          id="ficha"
          aria-labelledby="ficha-titulo"
          className="dt-secao bg-[#f4f4f6] py-24 sm:py-32"
        >
          <div className={container}>
            <Cabeca id="ficha-titulo" titulo="Leve no braço, forte na mão" />
            <dl data-revela-grupo className="dt-ficha-grade mt-12 sm:mt-16">
              {fichaEmDestaque.map((f, i) => (
                <div
                  key={f.legenda}
                  data-revela
                  className={`dt-ficha-celula ${i === 0 ? "dt-ficha-escura" : ""}`}
                >
                  <dt className="sr-only">{f.legenda}</dt>
                  <dd>
                    <span className="dt-numero">
                      <Contador valor={f.valor} sufixo={f.sufixo} />
                    </span>
                    <span className="mt-3 block max-w-[26ch] text-[0.9375rem] leading-snug opacity-70">
                      {f.legenda}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <dl
              data-revela-grupo
              className="mt-12 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {fichaCompleta.map((f) => (
                <div key={f.item} data-revela>
                  <dt className="dt-rotulo">{f.item}</dt>
                  <dd className="mt-1 text-[1.0625rem]">{f.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* A mão do vídeo, parada, com a frase da marca. */}
        <section aria-label="Manifesto" className="dt-manifesto">
          <Image
            src={maoAberta}
            alt=""
            sizes="100vw"
            className="dt-manifesto-foto"
          />
          <div className={`${container} dt-manifesto-texto`}>
            <p data-revela="titulo">Feita para</p>
            <p data-revela="titulo">o que você</p>
            <p data-revela="titulo">faz todo dia.</p>
          </div>
        </section>

        <section
          id="monte"
          aria-labelledby="monte-titulo"
          className="dt-secao py-24 sm:py-32"
        >
          <div className={container}>
            <Cabeca
              id="monte-titulo"
              titulo="Monte a sua"
              texto="Uma ideia de como vai ficar. Na avaliação, a terapeuta confere cada escolha com você."
            />
            <div data-revela className="mt-12 sm:mt-16">
              <Configurador />
            </div>
          </div>
        </section>

        <section
          id="jornada"
          aria-labelledby="jornada-titulo"
          className="dt-secao bg-[#0b0b0c] py-24 text-white sm:py-32"
        >
          <div className={container}>
            <div className="max-w-[48rem]">
              <h2 id="jornada-titulo" className="dt-h2" data-revela="titulo">
                Da primeira conversa ao primeiro copo
              </h2>
              <p
                data-revela="texto"
                className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-white/70"
              >
                Ninguém recebe a mão numa caixa. Uma equipe acompanha cada
                etapa, e o treino faz parte do preço.
              </p>
            </div>
            <ol data-revela-grupo className="dt-jornada mt-14 sm:mt-20">
              {jornada.map((j) => (
                <li key={j.titulo} data-revela>
                  <p className="dt-jornada-prazo">{j.prazo}</p>
                  <h3 className="dt-h3 mt-6">{j.titulo}</h3>
                  <p className="mt-3 max-w-[36ch] leading-relaxed text-white/70">
                    {j.texto}
                  </p>
                </li>
              ))}
            </ol>
            <div data-revela className="mt-14">
              <VerMais href={`${raiz}/jornada`} claro>
                A jornada por dentro
              </VerMais>
            </div>
          </div>
        </section>

        <section
          id="relatos"
          aria-labelledby="relatos-titulo"
          className="dt-secao py-24 sm:py-32"
        >
          <div className={container}>
            <Cabeca id="relatos-titulo" titulo="Quem usa conta" />
            <div data-revela className="mt-12 sm:mt-16">
              <Relatos />
            </div>
            <div data-revela className="mt-12">
              <VerMais href={`${raiz}/relatos`}>
                Ler as histórias inteiras
              </VerMais>
            </div>
          </div>
        </section>

        <section
          id="avaliacao"
          aria-labelledby="avaliacao-titulo"
          className="dt-secao border-t border-black/[0.08] py-24 sm:py-32"
        >
          <div className={container}>
            <Cabeca
              id="avaliacao-titulo"
              titulo="Agende a avaliação gratuita"
              texto="Uma hora com uma terapeuta ocupacional, numa das nossas clínicas parceiras. Você sai sabendo qual mão serve, quanto custa e como pedir pelo plano."
            />
            <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-start lg:gap-16">
              <div data-revela className="min-w-0">
                <Avaliacao />
              </div>
              <ul data-revela-grupo className="border-t border-black/10">
                {perguntas.map((p, i) => (
                  <li
                    key={p.pergunta}
                    data-revela
                    className="border-b border-black/10"
                  >
                    <details className="dt-pergunta" open={i === 0}>
                      <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium">
                        {p.pergunta}
                        <Plus
                          aria-hidden
                          className="dt-pergunta-icone mt-1 size-4 shrink-0"
                          strokeWidth={2}
                        />
                      </summary>
                      <p className="max-w-[60ch] pb-6 leading-relaxed text-black/65">
                        {p.resposta}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <RodapeDoPortfolio
        tom="claro"
        nome={nome}
        marca={
          <span className="flex items-center gap-2.5 text-[1.5rem] font-medium tracking-[-0.03em] text-black">
            <Logo className="size-7" />
            {nome}
          </span>
        }
        navegacao={[
          ...paginas,
          { rotulo: "Monte a sua", href: "#monte" },
          { rotulo: "Avaliação", href: "#avaliacao" },
        ]}
        rodape={rodape}
        className="border-t border-black/[0.08] bg-white"
      />
      <VoltarParaSagital />
    </div>
  );
}
