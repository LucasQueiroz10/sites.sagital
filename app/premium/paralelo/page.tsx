import {
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import type { Metadata, Viewport } from "next";
import { jakarta } from "@/app/fontes";
import { RodapeDoPortfolio } from "@/components/portfolio/RodapeDoPortfolio";
import { Abertura } from "@/components/premium/paralelo/Abertura";
import { Contador } from "@/components/premium/Contador";
import { Contato } from "@/components/premium/paralelo/Contato";
import { ExemploDaApi } from "@/components/premium/paralelo/ExemploDaApi";
import { Planos } from "@/components/premium/paralelo/Planos";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import { Simulador } from "@/components/premium/paralelo/Simulador";
import { VoltarParaSagital } from "@/components/VoltarParaSagital";
import {
  globo,
  navegacao,
  nome,
  numeros,
  perguntas,
  produtos,
  recursosDaApi,
  rodape,
} from "@/data/paralelo";
import "./paralelo.css";

export const metadata: Metadata = {
  title: { absolute: `${nome} | Projetos premium da Sagital` },
  description: rodape.descricao,
  // Site conceitual: fora dos buscadores, como os demos e os trabalhos.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#000000" };

const container = "mx-auto w-full max-w-[76rem] px-5 sm:px-8";

const ICONES = {
  receber: ArrowDownLeft,
  enviar: ArrowUpRight,
  conta: Wallet,
  checkout: ShoppingBag,
} as const;

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
    <div className="max-w-[44rem]">
      <h2 id={id} className="pa-h2" data-revela="titulo">
        {titulo}
      </h2>
      {texto && (
        <p
          data-revela="texto"
          className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-[var(--texto-suave)]"
        >
          {texto}
        </p>
      )}
    </div>
  );
}

export default function PaginaDaParalelo() {
  return (
    <div
      id="topo"
      data-premium="paralelo"
      className={`${jakarta.variable} min-h-dvh`}
    >
      <Abertura />
      <RevelarAoRolar raiz="paralelo" />

      <main>
        {/* Números logo abaixo do globo. */}
        <section
          aria-label="A Paralelo em números"
          className="border-b border-[var(--linha)]"
        >
          <dl
            data-revela-grupo
            className={`${container} grid grid-cols-2 lg:grid-cols-4`}
          >
            {numeros.map((n, i) => (
              <div
                key={n.legenda}
                data-revela
                className={`border-[var(--linha)] py-8 sm:py-10 ${i % 2 ? "border-l pl-5 sm:pl-8" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
              >
                <dt className="sr-only">{n.legenda}</dt>
                <dd>
                  <span className="block text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] font-medium tracking-[-0.03em] text-white tabular-nums">
                    <Contador
                      valor={n.valor}
                      de={n.de}
                      casas={n.casas}
                      prefixo={n.prefixo}
                      sufixo={n.sufixo}
                    />
                  </span>
                  <span className="mt-1 block text-[0.9375rem] text-[var(--texto-suave)]">
                    {n.legenda}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          id="produtos"
          aria-labelledby="produtos-titulo"
          className="pa-secao py-20 sm:py-28"
        >
          <div className={container}>
            <Cabeca
              id="produtos-titulo"
              titulo="Uma conta para o dinheiro que cruza a fronteira"
              texto="Receber, pagar, guardar e vender em outras moedas, sem abrir conta lá fora e sem esperar o banco."
            />
            <ul data-revela-grupo className="mt-12 grid gap-4 sm:grid-cols-2">
              {produtos.map((p) => {
                const Icone = ICONES[p.id];
                return (
                  <li
                    key={p.id}
                    data-revela
                    className="pa-cartao flex flex-col p-6 sm:p-8"
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-[var(--roxo-fundo)] text-[var(--roxo)]">
                      <Icone
                        aria-hidden
                        className="size-5"
                        strokeWidth={1.75}
                      />
                    </span>
                    <h3 className="mt-6 text-[1.375rem] font-semibold tracking-[-0.02em] text-white">
                      {p.titulo}
                    </h3>
                    <p className="mt-2 leading-relaxed text-[var(--texto-suave)]">
                      {p.texto}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {p.itens.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-[var(--linha)] px-3 py-1.5 text-[0.8125rem] text-[#d9d6e3]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section
          id="simulador"
          aria-labelledby="simulador-titulo"
          className="pa-secao border-y border-[var(--linha)] bg-[var(--superficie)] py-20 sm:py-28"
        >
          <div
            className={`${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start`}
          >
            <div className="lg:sticky lg:top-28">
              <Cabeca
                id="simulador-titulo"
                titulo="Quanto chega do outro lado"
                texto="Coloque um valor e veja a conta inteira: cotação, tarifa, imposto e o que sobra. Ao lado, o mesmo envio num banco tradicional."
              />
            </div>
            <div data-revela className="min-w-0">
              <Simulador />
            </div>
          </div>
        </section>

        <section
          id="precos"
          aria-labelledby="precos-titulo"
          className="pa-secao py-20 sm:py-28"
        >
          <div className={container}>
            <Cabeca
              id="precos-titulo"
              titulo="Planos que crescem com a operação"
              texto="Sem taxa de abertura nem de manutenção no plano Início. Quanto mais movimenta, menor a tarifa."
            />
            <div className="mt-10">
              <Planos />
            </div>
          </div>
        </section>

        <section
          id="desenvolvedores"
          aria-labelledby="desenvolvedores-titulo"
          className="pa-secao border-y border-[var(--linha)] bg-[var(--superficie)] py-20 sm:py-28"
        >
          <div
            className={`${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center`}
          >
            <div>
              <Cabeca
                id="desenvolvedores-titulo"
                titulo="Uma cobrança em dólar, cinco linhas de código"
                texto="Integre recebimentos e pagamentos ao seu sistema, à sua loja ou ao seu ERP."
              />
              <ul data-revela-grupo className="mt-10 grid gap-6">
                {recursosDaApi.map((r) => (
                  <li
                    key={r.titulo}
                    data-revela
                    className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.45rem] size-2 rounded-full bg-[var(--roxo)] shadow-[0_0_14px_rgb(167_139_250/0.7)]"
                    />
                    <h3 className="font-semibold text-white">{r.titulo}</h3>
                    <p className="col-start-2 mt-1 leading-relaxed text-[var(--texto-suave)]">
                      {r.texto}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div data-revela className="min-w-0">
              <ExemploDaApi />
            </div>
          </div>
        </section>

        <section
          id="recursos"
          aria-labelledby="recursos-titulo"
          className="pa-secao py-20 sm:py-28"
        >
          <div
            className={`${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`}
          >
            <Cabeca
              id="recursos-titulo"
              titulo="Dúvidas de quem está começando"
              texto="O que mais perguntam antes de abrir a conta. Não achou a sua? O time de vendas responde."
            />
            <ul data-revela-grupo className="border-t border-[var(--linha)]">
              {perguntas.map((p, i) => (
                <li
                  key={p.pergunta}
                  data-revela
                  className="border-b border-[var(--linha)]"
                >
                  <details className="pa-pergunta group" open={i === 0}>
                    <summary className="flex items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium text-white sm:text-[1.1875rem]">
                      {p.pergunta}
                      <Plus
                        aria-hidden
                        className="pa-pergunta-icone mt-1 size-5 shrink-0 text-[var(--roxo)] transition-transform duration-200"
                        strokeWidth={1.75}
                      />
                    </summary>
                    <p className="max-w-[60ch] pb-6 leading-relaxed text-[var(--texto-suave)]">
                      {p.resposta}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="comecar"
          aria-labelledby="comecar-titulo"
          className="pa-secao relative isolate overflow-hidden border-t border-[var(--linha)] py-20 sm:py-28"
        >
          {/* "Fale com vendas" cai no mesmo lugar. */}
          <span id="vendas" className="pa-secao absolute top-0" aria-hidden />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-cover bg-[position:50%_8%] opacity-40 [mask-image:linear-gradient(transparent,black_60%)]"
            style={{ backgroundImage: `url("${globo.quadro}")` }}
          />
          <div
            className={`${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start`}
          >
            <Cabeca
              id="comecar-titulo"
              titulo="Abra a conta ou fale com quem entende de câmbio"
              texto="Conta aberta em até um dia útil, tudo pelo celular. Para volumes grandes ou integração pela API, o time de vendas monta a proposta."
            />
            <div data-revela className="min-w-0">
              <Contato />
            </div>
          </div>
        </section>
      </main>

      <RodapeDoPortfolio
        tom="escuro"
        nome={nome}
        marca={
          <span className="text-[1.75rem] font-extrabold tracking-[-0.01em] text-white">
            {nome}
          </span>
        }
        navegacao={[...navegacao]}
        rodape={rodape}
        className="border-t border-[var(--linha)] bg-[#050507]"
      />
      <VoltarParaSagital />
    </div>
  );
}
