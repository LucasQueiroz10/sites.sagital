import type { Metadata } from "next";
import Image from "next/image";
import { RevelarAoRolar } from "@/components/premium/RevelarAoRolar";
import {
  Cabeca,
  CabecaDaPagina,
  container,
} from "@/components/premium/redoma/Interno";
import {
  comoTrabalhamos,
  fatos,
  historia,
  nomeNoTexto,
  principios,
} from "@/data/redoma";
import quadro from "@/public/imagens/premium/redoma/quadro.jpg";

export const metadata: Metadata = {
  title: { absolute: `Empresa | ${nomeNoTexto}` },
  description:
    "Como a Redoma nasceu, quem faz, onde os dados ficam e como a plataforma é testada.",
};

/**
 * A empresa: a história em anos grandes, a frase da marca sobre o vídeo
 * parado, os números, os princípios e como o time trabalha.
 */
export default function PaginaDaEmpresa() {
  return (
    <>
      <RevelarAoRolar raiz="redoma" />
      <CabecaDaPagina
        caminho={[{ rotulo: "empresa" }]}
        titulo="nascemos de um susto"
        texto="A Redoma começou em Florianópolis, depois que a clínica de uma das fundadoras perdeu dois anos de prontuários para um vírus."
      />

      <section aria-labelledby="historia" className="rd-secao pb-24 sm:pb-32">
        <div className={container}>
          <h2 id="historia" className="sr-only">
            História
          </h2>
          <ol data-revela-grupo className="border-b border-white/10">
            {historia.map((h) => (
              <li
                key={h.ano}
                data-revela
                className="grid gap-x-10 gap-y-4 border-t border-white/10 py-10 md:grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,5fr)] md:items-baseline md:py-14"
              >
                <span className="text-[clamp(3rem,2rem+4vw,6rem)] leading-none font-medium tracking-[-0.05em] text-white/20 tabular-nums">
                  {h.ano}
                </span>
                <h3 className="rd-h3">{h.titulo}</h3>
                <p className="max-w-[46ch] leading-relaxed text-white/70">
                  {h.texto}
                </p>
              </li>
            ))}
          </ol>
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
          className={`${container} flex min-h-[70svh] flex-col justify-center py-24`}
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

      <section aria-labelledby="numeros" className="rd-secao py-24 sm:py-32">
        <div className={container}>
          <Cabeca id="numeros" titulo="a redoma em números" />
          <dl
            data-revela-grupo
            className="mt-14 grid grid-cols-2 border-t border-white/10 lg:grid-cols-4"
          >
            {fatos.map((f, i) => (
              <div
                key={f.legenda}
                data-revela
                className={`border-white/10 py-8 ${i % 2 ? "border-l pl-6" : "pr-6"} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
              >
                <dt className="sr-only">{f.legenda}</dt>
                <dd>
                  <span className="block text-[clamp(2.5rem,1.8rem+2.5vw,4rem)] leading-none font-medium tracking-[-0.04em]">
                    {f.valor}
                  </span>
                  <span className="mt-3 block text-[0.9375rem] text-white/70">
                    {f.legenda}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <ul data-revela-grupo className="mt-20 grid gap-10 md:grid-cols-3">
            {principios.map((p) => (
              <li key={p.titulo} data-revela>
                <h3 className="text-[1.5rem] leading-tight font-medium tracking-[-0.03em]">
                  {p.titulo}
                </h3>
                <p className="mt-3 leading-relaxed text-white/70">{p.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="como-trabalhamos"
        className="rd-secao border-t border-white/10 py-24 sm:py-32"
      >
        <div
          className={`${container} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16`}
        >
          <Cabeca
            id="como-trabalhamos"
            titulo="como a gente trabalha"
            texto="Proteger dados dos outros começa por proteger os nossos. Estas são as regras que ninguém aqui dentro pula."
          />
          <ul data-revela-grupo className="grid gap-4 sm:grid-cols-2">
            {comoTrabalhamos.map((c) => (
              <li key={c.titulo} data-revela className="rd-cartao p-6 sm:p-7">
                <h3 className="text-[1.25rem] leading-tight font-medium tracking-[-0.03em]">
                  {c.titulo}
                </h3>
                <p className="mt-3 leading-relaxed text-white/70">{c.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
