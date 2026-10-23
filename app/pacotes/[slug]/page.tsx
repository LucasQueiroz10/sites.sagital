import { ArrowRight, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BotaoContato } from "@/components/sagital/BotaoContato";
import { FundoSoffit } from "@/components/sagital/FundoSoffit";
import { MarcaSagital } from "@/components/sagital/MarcaSagital";
import { RodapeSagital } from "@/components/sagital/RodapeSagital";
import { Container } from "@/components/ui/Container";
import {
  mensagemDoPacote,
  observacoesDosPacotes,
  pacotes,
  recursos,
} from "@/data/sagital";
import { classes } from "@/lib/classes";
import { formatarPrecoRedondo } from "@/lib/formato";
import { instrumentSerif, interTight, jakarta } from "../../fontes";
import "../../sagital.css";

// Só os três pacotes existem: qualquer outro endereço cai no notFound().
export function generateStaticParams() {
  return pacotes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/pacotes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pacote = pacotes.find((p) => p.slug === slug);
  if (!pacote) return {};
  return {
    title: `Pacote ${pacote.nome}`,
    description: pacote.introducao,
    // Só a página inicial é indexável (PRODUCT.md).
    robots: { index: false, follow: true },
  };
}

export const viewport: Viewport = { themeColor: "#ffffff" };

// Os títulos seguem a vitrine dos demos: a grotesca pesada em caixa-alta e
// uma palavra em serifa itálica ao lado.
const grotesca = "font-[family-name:var(--font-inter-tight)] font-extrabold";
const serifaItalica =
  "font-[family-name:var(--font-instrument-serif)] font-normal italic";
const tituloDeSecao = "text-[clamp(1.75rem,4.4vw,2.25rem)] leading-none";
const rotulo = "text-[0.6875rem] font-bold tracking-[0.14em] uppercase";

/**
 * A página de um pacote: o que ele é, para quem serve e como o prazo corre,
 * com o cartão do pacote (preço, o que inclui e o botão do WhatsApp) ao
 * lado das descrições no desktop e logo depois da introdução no celular.
 */
export default async function PaginaDoPacote({
  params,
}: PageProps<"/pacotes/[slug]">) {
  const { slug } = await params;
  const i = pacotes.findIndex((p) => p.slug === slug);
  const pacote = pacotes[i];
  if (!pacote) notFound();

  const inclusos = recursos.filter((r) => (r.inclui[i] ?? false) !== false);
  const ajustes = recursos.find((r) => r.nome.startsWith("Ajustes"))?.inclui[i];
  // Compara com o vizinho de cima; o último compara com o de baixo.
  const outro = pacotes[i + 1] ?? pacotes[i - 1];

  return (
    <div
      data-pagina="sagital"
      className={`${jakarta.variable} ${interTight.variable} ${instrumentSerif.variable} flex flex-1 flex-col bg-fundo font-texto text-texto`}
    >
      <header>
        <Container
          largura="normal"
          className="grid min-h-16 grid-cols-[1fr_auto_1fr] items-center gap-2"
        >
          <Link
            href="/#pacotes"
            className="-ml-2 inline-flex min-h-11 items-center gap-1 justify-self-start rounded-[10px] pr-3 pl-1 text-[0.9375rem] font-medium text-texto-suave transition-colors hover:bg-superficie hover:text-texto"
          >
            <ChevronLeft aria-hidden className="size-6" strokeWidth={1.75} />
            Voltar ao site
          </Link>
          <MarcaSagital className="text-lg text-[var(--sg-tinta-forte)]" />
          <span aria-hidden />
        </Container>
      </header>

      <main id="topo" className="flex-1 pt-6 pb-16 sm:pt-10 sm:pb-24">
        <Container largura="normal">
          <nav aria-label="Caminho" className="sg-entra">
            <ol
              className={`${rotulo} flex flex-wrap items-center gap-1.5 text-texto-suave`}
            >
              <li>
                <Link href="/" className="hover:text-texto">
                  Início
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3" strokeWidth={2.5} />
              </li>
              <li>
                <Link href="/#pacotes" className="hover:text-texto">
                  Pacotes
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3" strokeWidth={2.5} />
              </li>
              <li aria-current="page" className="text-texto">
                {pacote.nome}
              </li>
            </ol>
          </nav>

          <h1 className="sg-entra mt-6 text-[clamp(2.75rem,10vw,5.5rem)] leading-[0.92] [--ordem:1]">
            <span className={`${grotesca} tracking-[-0.045em] uppercase`}>
              {pacote.nome}
            </span>{" "}
            <span className={`${serifaItalica} tracking-[-0.02em]`}>
              {pacote.chamada}
            </span>
          </h1>
          <p className="sg-entra mt-6 max-w-[56ch] text-[1.0625rem] leading-relaxed text-texto-suave [--ordem:2] sm:text-lg">
            {pacote.introducao}{" "}
            <strong className="sg-num font-semibold text-texto">
              {formatarPrecoRedondo(pacote.preco)} em pagamento único
            </strong>
            , no ar em {pacote.prazo}.
          </p>

          <div className="mt-10 grid items-start gap-12 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-16">
            <aside
              aria-labelledby="cartao-do-pacote"
              className="sg-entra [--ordem:3] lg:sticky lg:top-8 lg:col-start-2 lg:row-start-1"
            >
              <article className="sg-noite sg-foco-claro rounded-[1.75rem] p-6 shadow-[0_24px_60px_rgb(31_72_194/0.28)] sm:p-7">
                <FundoSoffit />
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <h2
                      id="cartao-do-pacote"
                      className={`${serifaItalica} text-[1.875rem] leading-none text-white`}
                    >
                      {pacote.nome}
                    </h2>
                    {pacote.recomendado && (
                      <span className="rounded-md bg-[var(--sg-ceu)] px-2 py-0.5 text-xs font-semibold text-[#0a1029]">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <span className={`${rotulo} text-white/80`}>
                    {pacote.prazo}
                  </span>
                </div>

                <p className="mt-5 flex items-baseline gap-2">
                  <span className="sg-num text-[2.75rem] leading-none font-extrabold tracking-[-0.03em] text-white">
                    {formatarPrecoRedondo(pacote.preco)}
                  </span>
                  <span className="text-sm text-white/75">pagamento único</span>
                </p>

                <ul className="mt-5 grid gap-2.5 border-t border-white/15 pt-5 text-[0.9375rem] text-white">
                  {inclusos.map((recurso) => {
                    const valor = recurso.inclui[i];
                    return (
                      <li key={recurso.nome} className="flex gap-2.5">
                        <Check
                          aria-hidden
                          className="mt-0.5 size-4 shrink-0 text-[var(--sg-ceu)]"
                          strokeWidth={3}
                        />
                        <span>
                          {recurso.nome}
                          {typeof valor === "string" && (
                            <span className="font-semibold">: {valor}</span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <dl className="mt-6 grid grid-cols-2 rounded-xl bg-white/8 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]">
                  <div className="px-4 py-3">
                    <dt className={`${rotulo} text-white/70`}>Prazo</dt>
                    <dd className="mt-1 font-semibold text-white">
                      {pacote.prazo}
                    </dd>
                  </div>
                  <div className="border-l border-white/12 px-4 py-3">
                    <dt className={`${rotulo} text-white/70`}>
                      Ajustes depois
                    </dt>
                    <dd className="mt-1 font-semibold text-white">
                      {typeof ajustes === "string" ? ajustes : "Inclusos"}
                    </dd>
                  </div>
                </dl>

                <BotaoContato
                  rotulo="Quero este pacote"
                  complementoAcessivel={`(${pacote.nome})`}
                  mensagem={mensagemDoPacote(pacote.nome)}
                  variante="inverso"
                  className="mt-6 w-full"
                />
                <p className="mt-3 text-[0.8125rem] leading-snug text-white/75">
                  {observacoesDosPacotes}
                </p>

                {outro && (
                  <Link
                    href={`/pacotes/${outro.slug}`}
                    className="group mt-5 flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3 transition-colors hover:bg-white/16"
                  >
                    <span>
                      <span className={`${rotulo} block text-white/70`}>
                        Compare com
                      </span>
                      <span
                        className={`${serifaItalica} mt-0.5 block text-[1.375rem] leading-tight text-white`}
                      >
                        {outro.nome}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="size-4 text-white transition-transform duration-200 ease-out group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </Link>
                )}
              </article>
            </aside>

            <div className="grid gap-14 sm:gap-16 lg:col-start-1 lg:row-start-1">
              <section aria-labelledby="ideal-para">
                <h2 id="ideal-para" className={tituloDeSecao}>
                  <span className={`${grotesca} tracking-[-0.04em] uppercase`}>
                    Ideal
                  </span>{" "}
                  <span className={`${serifaItalica} tracking-[-0.01em]`}>
                    para
                  </span>
                </h2>
                <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-texto-suave">
                  {pacote.paraQuem}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <ListaDeEncaixe
                    titulo="Indicado para"
                    itens={pacote.idealPara}
                    indicado
                  />
                  <ListaDeEncaixe
                    titulo="Não indicado para"
                    itens={pacote.naoIndicado}
                  />
                </div>
              </section>

              <section aria-labelledby="etapas">
                <h2 id="etapas" className={tituloDeSecao}>
                  <span className={`${grotesca} tracking-[-0.04em] uppercase`}>
                    {pacote.prazo}
                  </span>{" "}
                  <span className={`${serifaItalica} tracking-[-0.01em]`}>
                    passo a passo
                  </span>
                </h2>
                <ol className="relative mt-8 grid gap-8 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-[var(--cor-borda)]">
                  {pacote.etapas.map((etapa, j) => (
                    <li key={etapa.titulo} className="relative pl-8">
                      <span
                        aria-hidden
                        className={classes(
                          "absolute top-[3px] left-0 size-[11px] rounded-full border-2 border-[var(--cor-primaria)]",
                          j === 0 ? "bg-[var(--cor-primaria)]" : "bg-fundo",
                        )}
                      />
                      <p className={`${rotulo} text-[var(--cor-primaria)]`}>
                        {etapa.quando}
                      </p>
                      <h3 className="mt-1.5 text-[1.0625rem] font-semibold tracking-[-0.01em]">
                        {etapa.titulo}
                      </h3>
                      <p className="mt-1 max-w-[52ch] text-[0.9375rem] leading-relaxed text-texto-suave">
                        {etapa.texto}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </Container>
      </main>

      <RodapeSagital comBarraFixa={false} />
    </div>
  );
}

/** Um dos dois quadros de "Ideal para": quando o pacote serve, e quando não. */
function ListaDeEncaixe({
  titulo,
  itens,
  indicado = false,
}: {
  titulo: string;
  itens: string[];
  indicado?: boolean;
}) {
  const Icone = indicado ? Check : X;
  return (
    <div className="rounded-2xl p-5 shadow-[inset_0_0_0_1px_var(--cor-borda)]">
      <h3
        className={`${rotulo} flex items-center gap-2 text-[var(--sg-tinta-forte)]`}
      >
        <Icone
          aria-hidden
          className={classes(
            "size-4",
            indicado ? "text-[var(--cor-primaria)]" : "text-texto-suave",
          )}
          strokeWidth={2.5}
        />
        {titulo}
      </h3>
      <ul className="mt-3 divide-y divide-[var(--sg-borda-sutil)] border-t border-[var(--sg-borda-sutil)] text-[0.9375rem] text-texto-suave">
        {itens.map((item) => (
          <li key={item} className="py-2.5">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
