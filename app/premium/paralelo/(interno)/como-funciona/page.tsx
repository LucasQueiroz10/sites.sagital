import { FileText, Plus } from "lucide-react";
import type { Metadata } from "next";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import {
  Cabeca,
  CabecaDaPagina,
  container,
} from "@/components/premium/paralelo/Interno";
import { Simulador } from "@/components/premium/paralelo/Simulador";
import { abertura, documentos, nome, perguntas } from "@/data/paralelo";

export const metadata: Metadata = {
  title: { absolute: `Como funciona | ${nome}` },
  description:
    "Como abrir a conta da Paralelo, os documentos que a empresa precisa, quanto chega do outro lado e as dúvidas de quem está começando.",
};

/**
 * Como funciona: a abertura da conta numa linha que desce, os documentos ao
 * lado, o simulador e as perguntas de quem está começando.
 */
export default function PaginaComoFunciona() {
  return (
    <>
      <RevelarAoRolar raiz="paralelo" />
      <CabecaDaPagina
        caminho={[{ rotulo: "Como funciona" }]}
        titulo="Do cadastro à primeira cobrança em um dia útil"
        texto="Tudo pelo celular, sem abrir conta lá fora e sem ir a uma agência. A análise segue as regras do Banco Central para câmbio."
      />

      <section
        aria-labelledby="abertura-titulo"
        className={`${container} grid gap-14 pb-20 sm:pb-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16`}
      >
        <div>
          <h2 id="abertura-titulo" className="sr-only">
            Abertura da conta
          </h2>
          <ol
            data-revela-grupo
            className="relative grid gap-10 before:absolute before:top-3 before:bottom-3 before:left-[0.6875rem] before:w-px before:bg-[linear-gradient(var(--roxo),var(--linha)_70%)]"
          >
            {abertura.map((etapa) => (
              <li key={etapa.titulo} data-revela className="relative pl-12">
                <span
                  aria-hidden
                  className="absolute top-1 left-0 grid size-[1.375rem] place-items-center rounded-full border border-[var(--roxo)] bg-[var(--fundo)]"
                >
                  <span className="size-2 rounded-full bg-[var(--roxo)]" />
                </span>
                <p className="inline-flex rounded-full bg-[var(--roxo-fundo)] px-3 py-1 text-[0.8125rem] font-semibold text-[var(--roxo)]">
                  {etapa.prazo}
                </p>
                <h3 className="mt-3 text-[1.375rem] font-semibold tracking-[-0.02em] text-white">
                  {etapa.titulo}
                </h3>
                <p className="mt-2 max-w-[52ch] leading-relaxed text-[var(--texto-suave)]">
                  {etapa.texto}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <aside
          aria-labelledby="documentos"
          data-revela
          className="pa-cartao self-start p-6 sm:p-8 lg:sticky lg:top-28"
        >
          <span className="grid size-11 place-items-center rounded-full bg-[var(--roxo-fundo)] text-[var(--roxo)]">
            <FileText aria-hidden className="size-5" strokeWidth={1.75} />
          </span>
          <h2
            id="documentos"
            className="mt-6 text-[1.375rem] font-semibold tracking-[-0.02em] text-white"
          >
            O que separar antes
          </h2>
          <ul className="mt-5 grid gap-3 border-t border-[var(--linha)] pt-5 text-[0.9375rem] text-[#d9d6e3]">
            {documentos.map((d) => (
              <li key={d} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-[var(--roxo)]"
                />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.875rem] leading-relaxed text-[var(--texto-suave)]">
            Empresa com mais de um sócio? Só quem assina pela empresa precisa
            mandar a selfie.
          </p>
        </aside>
      </section>

      <section
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
              texto="Depois de aberta a conta, cada operação mostra a conta inteira antes de você confirmar. Teste com um valor seu."
            />
          </div>
          <div data-revela className="min-w-0">
            <Simulador />
          </div>
        </div>
      </section>

      <section aria-labelledby="duvidas" className="pa-secao py-20 sm:py-28">
        <div
          className={`${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`}
        >
          <Cabeca
            id="duvidas"
            titulo="Dúvidas de quem está começando"
            texto="Câmbio, imposto e segurança, do jeito que perguntam antes de abrir a conta."
          />
          <ul data-revela-grupo className="border-t border-[var(--linha)]">
            {perguntas.map((p, i) => (
              <li
                key={p.pergunta}
                data-revela
                className="border-b border-[var(--linha)]"
              >
                <details className="pa-pergunta" open={i === 0}>
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
    </>
  );
}
