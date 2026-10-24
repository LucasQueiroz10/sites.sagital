import { Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { GradeDeAulas } from "@/components/nichos/academia/GradeDeAulas";
import { CabecaDaPagina, ProximaPagina } from "@/components/nichos/Interno";
import { Contador } from "@/components/premium/Contador";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Container } from "@/components/ui/Container";
import { academia as dados, paraAPrimeiraAula } from "@/data/academia";
import {
  aulasDoDia,
  DIAS,
  horarioCurto,
  minutosDoDia,
  ORDEM_DA_SEMANA,
} from "@/lib/agenda";

const caminho = "/academia/aulas";

export const metadata: Metadata = {
  title: { absolute: `Aulas | ${dados.padrao.nome}` },
  description:
    "A grade de aulas coletivas da semana, com agendamento da aula experimental pelo WhatsApp.",
};

const modalidadesNaGrade = new Set(dados.grade.map((a) => a.modalidade)).size;
const primeira = Math.min(...dados.grade.map((a) => minutosDoDia(a.inicio)));
const ultima = Math.max(...dados.grade.map((a) => minutosDoDia(a.inicio)));
const hora = (minutos: number) =>
  horarioCurto(
    `${String(Math.floor(minutos / 60)).padStart(2, "0")}:${String(minutos % 60).padStart(2, "0")}`,
  );

/**
 * As aulas: a grade do dia com o agendamento de cada horário, a semana
 * inteira num quadro (no celular, uma trilha de dias) e o que levar na
 * primeira aula, ao lado de uma foto que anda devagar.
 */
export default function PaginaDasAulas() {
  return (
    <>
      <RevelarAoRolar raiz={dados.nicho} atributo="data-nicho" />
      <CabecaDaPagina
        raiz={dados.raiz}
        caminho={[{ rotulo: "Aulas" }]}
        titulo="A grade da"
        destaque="semana."
        texto="Escolha o dia e o horário. Cada aula tem o próprio agendamento: o WhatsApp abre com a modalidade e a hora já escritas."
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
        extra={
          <dl className="grid grid-cols-3 gap-4 border-t border-borda pt-6 sm:max-w-xl">
            {[
              { valor: dados.grade.length, rotulo: "aulas por semana" },
              { valor: modalidadesNaGrade, rotulo: "tipos de aula" },
              { valor: 7, rotulo: "dias com aula" },
            ].map((fato) => (
              <div key={fato.rotulo}>
                <dt className="sr-only">{fato.rotulo}</dt>
                <dd>
                  <span className="numero-grande block text-[2.75rem] sm:text-[3.5rem]">
                    <Contador valor={fato.valor} />
                  </span>
                  <span aria-hidden className="text-sm text-texto-suave">
                    {fato.rotulo}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      <section aria-labelledby="hoje" className="bg-superficie py-16 sm:py-24">
        <Container largura="larga">
          <h2 id="hoje" data-revela="titulo" className="mb-8">
            Dia a dia
          </h2>
          <div data-revela="texto" className="rounded-xl bg-fundo p-4 sm:p-6">
            <GradeDeAulas grade={dados.grade} rotuloDoNicho={dados.rotulo} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="semana" className="py-16 sm:py-24">
        <Container largura="larga">
          <h2 id="semana" data-revela="titulo">
            A semana inteira
          </h2>
          <p
            data-revela="texto"
            className="mt-4 max-w-[52ch] text-lg text-texto-suave"
          >
            Das {hora(primeira)} às {hora(ultima)}, de segunda a domingo.
            <span className="lg:hidden"> Deslize para ver todos os dias.</span>
          </p>
        </Container>
        <ol
          data-revela-grupo
          aria-label="Aulas de cada dia da semana"
          className="trilho mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-7 lg:overflow-visible"
        >
          {ORDEM_DA_SEMANA.map((dia) => {
            const aulas = aulasDoDia(dados.grade, dia);
            return (
              <li
                key={dia}
                data-revela="cartao"
                className="w-[62%] shrink-0 snap-start rounded-xl border border-borda p-4 sm:w-[15rem] lg:w-auto"
              >
                <h3 className="text-[1.5rem]">{DIAS[dia]?.nome}</h3>
                <p className="text-sm text-texto-suave">
                  {aulas.length} {aulas.length === 1 ? "aula" : "aulas"}
                </p>
                <ul className="mt-4 grid gap-2">
                  {aulas.map((aula) => (
                    <li
                      key={aula.inicio + aula.modalidade}
                      className="rounded-lg bg-superficie px-3 py-2"
                    >
                      <span className="numero block text-[1.25rem] leading-none">
                        {aula.inicio}
                      </span>
                      <span className="mt-1 block text-sm leading-snug font-semibold">
                        {aula.modalidade}
                      </span>
                      <span className="block text-xs text-texto-suave">
                        {aula.local}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      <section
        aria-labelledby="primeira-aula"
        className="border-t border-borda py-16 sm:py-24"
      >
        <Container
          largura="larga"
          className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16"
        >
          <div
            data-revela="foto"
            className="paralaxe relative aspect-[4/5] overflow-hidden rounded-xl lg:col-span-5"
          >
            <Image
              src={
                dados.modalidades[1]?.imagem.src ?? dados.imagemPrincipal.src
              }
              alt={
                dados.modalidades[1]?.imagem.alt ?? dados.imagemPrincipal.alt
              }
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
              placeholder="blur"
            />
          </div>
          <div data-revela-grupo className="lg:col-span-7">
            <h2 id="primeira-aula" data-revela="titulo">
              Para a primeira aula
            </h2>
            <p
              data-revela="texto"
              className="mt-4 max-w-[46ch] text-lg text-texto-suave"
            >
              Não precisa de experiência nem de equipamento. O professor ajusta
              cada exercício ao seu ritmo.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {paraAPrimeiraAula.map((item) => (
                <li
                  key={item}
                  data-revela
                  className="flex items-center gap-3 rounded-xl bg-superficie px-4 py-4 font-semibold"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primaria text-primaria-texto">
                    <Check aria-hidden strokeWidth={3} className="size-4" />
                  </span>
                  {item}
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
