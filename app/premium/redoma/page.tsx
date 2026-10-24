import { Plus } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Abertura } from "@/components/premium/redoma/Abertura";
import { Contato } from "@/components/premium/redoma/Contato";
import { Logo } from "@/components/premium/redoma/Logo";
import { Planos } from "@/components/premium/redoma/Planos";
import { Setores } from "@/components/premium/redoma/Setores";
import { TesteDeSenha } from "@/components/premium/redoma/TesteDeSenha";
import { VoltarParaSagital } from "@/components/VoltarParaSagital";
import {
  camadas,
  fatos,
  navegacao,
  nome,
  nomeNoTexto,
  perguntas,
  principios,
  rodape,
} from "@/data/redoma";
import quadro from "@/public/imagens/premium/redoma/quadro.jpg";
import { readex } from "./fontes";
import "./redoma.css";

export const metadata: Metadata = {
  title: { absolute: "Redoma | Projetos premium da Sagital" },
  description: rodape.descricao,
  // Site conceitual: fora dos buscadores, como os demos e os trabalhos.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#000000" };

const container = "mx-auto w-full max-w-[84rem] px-6 md:px-10";

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
    <div className="max-w-[52rem]">
      <h2 id={id} className="rd-h2" data-revela="titulo">
        {titulo}
      </h2>
      {texto && (
        <p
          data-revela="texto"
          className="mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-white/70 sm:text-lg"
        >
          {texto}
        </p>
      )}
    </div>
  );
}

export default function PaginaDaRedoma() {
  return (
    <div
      id="topo"
      data-premium="redoma"
      className={`${readex.variable} min-h-dvh`}
    >
      <Abertura />
      <RevelarAoRolar raiz="redoma" />

      <main>
        <section
          id="plataforma"
          aria-labelledby="plataforma-titulo"
          className="rd-secao pt-16 pb-24 sm:pt-24 sm:pb-32"
        >
          <div className={container}>
            <Cabeca
              id="plataforma-titulo"
              titulo="cinco camadas entre os seus dados e o resto do mundo"
              texto="Cada camada resolve um jeito diferente de perder dados: roubo, sequestro, senha vazada, acesso de quem não devia e multa da LGPD. Juntas, rodam sem mudar a rotina da equipe."
            />
            <ol data-revela-grupo className="mt-16 border-b border-white/10">
              {camadas.map((c, i) => (
                <li
                  key={c.id}
                  data-revela
                  className="grid gap-x-10 gap-y-4 border-t border-white/10 py-9 md:grid-cols-[4rem_minmax(0,0.9fr)_minmax(0,1.1fr)] md:py-12"
                >
                  <span
                    aria-hidden
                    className="text-sm text-white/40 tabular-nums md:pt-3"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="rd-h3">{c.nome}</h3>
                  <div>
                    <p className="text-[1.125rem] leading-snug text-white">
                      {c.resumo}
                    </p>
                    <p className="mt-3 leading-relaxed text-white/70">
                      {c.texto}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {c.itens.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/15 px-3 py-1.5 text-[0.8125rem] text-white/80"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="senha"
          aria-labelledby="senha-titulo"
          className="rd-secao bg-neutral-950 py-24 sm:py-32"
        >
          <div
            className={`${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-16`}
          >
            <div className="lg:sticky lg:top-32">
              <Cabeca
                id="senha-titulo"
                titulo="quanto tempo a sua senha aguenta?"
                texto="A maioria das invasões começa com uma senha fraca ou repetida. Teste uma parecida com as que você usa e veja o que um ataque comum faria com ela."
              />
            </div>
            <div data-revela className="min-w-0">
              <TesteDeSenha />
            </div>
          </div>
        </section>

        <section
          id="solucoes"
          aria-labelledby="solucoes-titulo"
          className="rd-secao py-24 sm:py-32"
        >
          <div className={container}>
            <Cabeca
              id="solucoes-titulo"
              titulo="cada ramo guarda um tipo de segredo"
              texto="Clínica, escritório, loja ou contabilidade: o que vaza é diferente, e a proteção também."
            />
            <div data-revela className="mt-12">
              <Setores />
            </div>
          </div>
        </section>

        {/* A frase do modelo, de volta sobre o vídeo parado. */}
        <section
          aria-label="Manifesto"
          className="relative isolate overflow-hidden"
        >
          <Image
            src={quadro}
            alt=""
            sizes="100vw"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_30%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/30 to-black"
          />
          <div
            className={`${container} flex min-h-[80svh] flex-col justify-center py-24`}
          >
            <p className="hero-title text-[16vw] font-medium md:text-[10vw]">
              vá viver.
            </p>
            <p className="hero-title self-end text-right text-[16vw] font-medium md:text-[10vw]">
              a gente
              <br />
              guarda.
            </p>
          </div>
        </section>

        <section
          id="precos"
          aria-labelledby="precos-titulo"
          className="rd-secao py-24 sm:py-32"
        >
          <div className={container}>
            <Cabeca
              id="precos-titulo"
              titulo="pague pelo tamanho da equipe"
              texto="Arraste a régua até o número de pessoas que usam computador na empresa. Grátis até três, sem taxa de instalação em nenhum plano."
            />
            <div data-revela className="mt-12">
              <Planos />
            </div>
          </div>
        </section>

        <section
          id="empresa"
          aria-labelledby="empresa-titulo"
          className="rd-secao border-t border-white/10 py-24 sm:py-32"
        >
          <div className={container}>
            <Cabeca
              id="empresa-titulo"
              titulo="feita para quem não tem um time de segurança"
              texto="A Redoma nasceu em Florianópolis depois que a clínica de uma das fundadoras perdeu dois anos de prontuários para um vírus. Desde então, a missão é a mesma: dar a qualquer empresa pequena a proteção que só os bancos tinham."
            />
            <dl
              data-revela-grupo
              className="mt-16 grid grid-cols-2 border-t border-white/10 lg:grid-cols-4"
            >
              {fatos.map((f, i) => (
                <div
                  key={f.legenda}
                  data-revela
                  className={`border-white/10 py-8 ${i % 2 ? "border-l pl-6" : "pr-6"} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
                >
                  <dt className="sr-only">{f.legenda}</dt>
                  <dd>
                    <span className="block text-[clamp(2.5rem,1.8rem+2.5vw,4rem)] font-medium leading-none tracking-[-0.04em]">
                      {f.valor}
                    </span>
                    <span className="mt-3 block text-[0.9375rem] text-white/70">
                      {f.legenda}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <ul data-revela-grupo className="mt-16 grid gap-10 md:grid-cols-3">
              {principios.map((p) => (
                <li key={p.titulo} data-revela>
                  <h3 className="text-[1.5rem] font-medium leading-tight tracking-[-0.03em]">
                    {p.titulo}
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/70">
                    {p.texto}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="suporte"
          aria-labelledby="suporte-titulo"
          className="rd-secao bg-neutral-950 py-24 sm:py-32"
        >
          <div className={container}>
            <Cabeca
              id="suporte-titulo"
              titulo="gente de verdade do outro lado"
              texto="Para começar, tirar uma dúvida ou pedir socorro: a mensagem chega no WhatsApp de quem resolve, não num robô."
            />
            <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-16">
              <ul data-revela-grupo className="border-t border-white/10">
                {perguntas.map((p, i) => (
                  <li
                    key={p.pergunta}
                    data-revela
                    className="border-b border-white/10"
                  >
                    <details className="rd-pergunta" open={i === 0}>
                      <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium sm:text-[1.1875rem]">
                        {p.pergunta}
                        <Plus
                          aria-hidden
                          className="rd-pergunta-icone mt-1 size-5 shrink-0 transition-transform duration-200"
                          strokeWidth={1.5}
                        />
                      </summary>
                      <p className="max-w-[60ch] pb-6 leading-relaxed text-white/70">
                        {p.resposta}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
              {/* "começar" cai direto no formulário, que fica abaixo das
                  perguntas no celular. */}
              <div
                id="comecar"
                data-revela
                className="rd-secao min-w-0 lg:sticky lg:top-32"
              >
                <Contato />
              </div>
            </div>
          </div>
        </section>
      </main>

      <RodapeDoPortfolio
        tom="escuro"
        nome={nomeNoTexto}
        marca={
          <span className="flex items-center gap-2.5 text-[1.75rem] font-medium tracking-[-0.04em] text-white">
            <Logo className="size-7" />
            {nome}
          </span>
        }
        navegacao={[
          ...navegacao,
          { rotulo: "preços", href: "#precos" },
          { rotulo: "teste de senha", href: "#senha" },
        ]}
        rodape={rodape}
        className="border-t border-white/10 bg-black"
      />
      <VoltarParaSagital />
    </div>
  );
}
