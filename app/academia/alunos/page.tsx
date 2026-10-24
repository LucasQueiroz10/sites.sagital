import type { Metadata } from "next";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { CabecaDaPagina, ProximaPagina } from "@/components/nichos/Interno";
import { PalavrasQueAcendem } from "@/components/portfolio/PalavrasQueAcendem";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import {
  academia as dados,
  fraseDosAlunos,
  maisDepoimentos,
} from "@/data/academia";

const caminho = "/academia/alunos";

export const metadata: Metadata = {
  title: { absolute: `Alunos | ${dados.padrao.nome}` },
  description:
    "O que dizem os alunos da musculação, do funcional, das lutas e da bike.",
};

const depoimentos = [...dados.depoimentos, ...maisDepoimentos];

/**
 * Quem treina aqui: a frase da casa acendendo palavra por palavra com a
 * rolagem, e os depoimentos num mural de alturas diferentes, assentando um
 * a um.
 */
export default function PaginaDosAlunos() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Alunos" }]}
        titulo="Quem treina"
        destaque="aqui."
        texto="Gente que começou com a aula experimental e ficou: pelo horário, pela turma e pelo professor que acompanha de perto."
        imagem={dados.imagemFinal}
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

      <section
        aria-label="A frase da casa"
        className="bg-texto py-20 text-fundo sm:py-32"
      >
        <Container largura="normal">
          <p className="font-titulo text-[clamp(2.25rem,6.5vw,4.75rem)] leading-[0.98] font-extrabold uppercase">
            <PalavrasQueAcendem texto={fraseDosAlunos} />
          </p>
        </Container>
      </section>

      <section aria-labelledby="mural" className="py-16 sm:py-24">
        <Container largura="larga">
          <h2 id="mural" data-revela="titulo">
            Em palavras deles
          </h2>
          <ul
            data-revela-grupo
            className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3"
          >
            {depoimentos.map((d, i) => (
              <li key={d.autoria} className="mb-4 break-inside-avoid">
                <figure
                  data-revela="cartao"
                  className={
                    i % 3 === 0
                      ? "rounded-2xl bg-primaria p-7 text-primaria-texto"
                      : "rounded-2xl bg-superficie p-7"
                  }
                >
                  <blockquote className="text-[1.375rem] leading-snug font-semibold text-pretty">
                    <p>“{d.texto}”</p>
                  </blockquote>
                  <figcaption
                    className={
                      i % 3 === 0
                        ? "mt-5 text-sm opacity-85"
                        : "mt-5 text-sm text-texto-suave"
                    }
                  >
                    {d.autoria}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-texto-suave">
            Depoimentos ilustrativos, criados para este site demonstrativo.
          </p>
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
