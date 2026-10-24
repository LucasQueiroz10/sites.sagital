import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { nome, raiz } from "@/data/la-maree";
import { classes } from "@/lib/classes";
import { Gravura, type NomeDaGravura } from "./Marcas";

/** O caminho de volta, nos selos em caixa-alta. */
export function Caminho({
  itens,
}: {
  itens: { rotulo: string; href?: string }[];
}) {
  return (
    <nav aria-label="Você está em" className="lm-entra">
      <ol className="lm-selo flex flex-wrap justify-center gap-x-3 gap-y-1 text-[0.6875rem] text-[var(--cor-texto-suave)]">
        <li>
          <Link
            href={raiz}
            className="transition-colors hover:text-[var(--cor-creme)]"
          >
            {nome}
          </Link>
        </li>
        {itens.map((item) => (
          <li
            key={item.rotulo}
            className="before:mr-3 before:text-[var(--cor-laranja)] before:content-['/']"
            aria-current={item.href ? undefined : "page"}
          >
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-[var(--cor-creme)]"
              >
                {item.rotulo}
              </Link>
            ) : (
              <span className="text-[var(--cor-creme)]">{item.rotulo}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * O alto de cada página interna, como os cartazes das referências: a
 * gravura pequena, a palavra em caligrafia sobre o nome na serifa estreita e
 * a frase espalhada de ponta a ponta.
 */
export function CabecaDaPagina({
  caminho,
  gravura,
  caligrafia,
  titulo,
  frase,
  texto,
}: {
  caminho: { rotulo: string; href?: string }[];
  gravura: NomeDaGravura;
  caligrafia: string;
  titulo: string;
  frase: [string, string];
  texto?: ReactNode;
}) {
  return (
    <header className="px-4 pt-28 pb-20 text-center sm:pt-36 sm:pb-28">
      <Caminho itens={caminho} />
      <div className="mt-12 grid justify-items-center">
        <Gravura
          nome={gravura}
          className="lm-entra w-10 text-[var(--cor-creme)] sm:w-12"
        />
        <h1 className="mt-6 grid justify-items-center">
          <span
            className="lm-caligrafia lm-entra -mb-[0.3em] text-[clamp(3.25rem,10vw,5.5rem)] text-[var(--cor-laranja)]"
            style={{ "--ordem": 1 } as CSSProperties}
          >
            {caligrafia}
          </span>
          <span
            className="lm-serifa lm-entra text-[clamp(3.75rem,13vw,8.5rem)]"
            style={{ "--ordem": 2 } as CSSProperties}
          >
            {titulo}
          </span>
        </h1>
        <p
          className="lm-selo lm-espalhado lm-entra mt-8 w-[min(100%,19rem)] text-[0.8125rem] sm:w-[23rem] sm:text-[0.875rem]"
          style={{ "--ordem": 3 } as CSSProperties}
        >
          <span>{frase[0]}</span>
          <span>{frase[1]}</span>
        </p>
        {texto && (
          <p
            className="lm-entra mx-auto mt-10 max-w-[52ch] text-[1.0625rem] leading-relaxed text-[var(--cor-texto-suave)]"
            style={{ "--ordem": 4 } as CSSProperties}
          >
            {texto}
          </p>
        )}
      </div>
    </header>
  );
}

/** "Ver mais": o botão de contorno das referências, com a seta. */
export function VerMais({
  href,
  children,
  tinta = false,
}: {
  href: string;
  children: string;
  /** Sobre os papéis claros. */
  tinta?: boolean;
}) {
  return (
    <Link
      href={href}
      className={classes(
        "lm-botao",
        tinta ? "lm-botao-tinta" : "lm-botao-contorno",
      )}
    >
      {children}
      <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
    </Link>
  );
}

/**
 * O fim das páginas internas: o papel pêssego com as vieiras nos cantos,
 * chamando para a reserva.
 */
export function ChamadaDaReserva() {
  return (
    <section
      aria-labelledby="chamada-reserva"
      className="papel-claro relative isolate overflow-hidden bg-[var(--cor-pessego)] py-24 text-[var(--cor-tinta)] sm:py-28"
    >
      {[
        "top-6 left-4",
        "top-6 right-4",
        "bottom-6 left-4",
        "bottom-6 right-4",
      ].map((canto) => (
        <Gravura
          key={canto}
          nome="vieira"
          className={`absolute -z-10 hidden w-12 opacity-45 sm:block ${canto}`}
        />
      ))}
      <Container
        largura="normal"
        className="grid justify-items-center text-center"
      >
        <h2
          id="chamada-reserva"
          className="lm-revela grid justify-items-center"
        >
          <span className="lm-caligrafia -mb-[0.3em] text-[clamp(3rem,9vw,5rem)]">
            Reserve
          </span>
          <span className="lm-serifa text-[clamp(3rem,10vw,6.5rem)]">
            sua mesa
          </span>
        </h2>
        <p className="lm-revela mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed">
          Trinta e dois lugares de frente para a baía. Escolha o dia, o horário
          e a ocasião, e a confirmação chega pelo WhatsApp.
        </p>
        <div className="lm-revela mt-8">
          <VerMais href={`${raiz}/reservas`} tinta>
            Reservar mesa
          </VerMais>
        </div>
      </Container>
    </section>
  );
}
