import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { CabecaDaPagina } from "@/components/premium/la-maree/Interno";
import { Gravura } from "@/components/premium/la-maree/Marcas";
import { Reserva } from "@/components/premium/la-maree/Reserva";
import { Container } from "@/components/ui/Container";
import {
  contato,
  cores,
  eventos,
  horarios,
  maximoDePessoas,
  nome,
  regrasDaReserva,
} from "@/data/la-maree";
import { classes } from "@/lib/classes";
import { linkDoPremium } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: `Reservas | ${nome}` },
  description:
    "Reserve uma mesa na La Marée, veja as regras da casa e os formatos para grupos e eventos, com preço por pessoa.",
};

/** O papel de cada formato de evento; o do meio é o laranja do cartaz. */
const PAPEL = ["salvia", "laranja", "pessego"] as const;

/**
 * Reservas: o formulário no papel pêssego, as regras da casa, os três
 * formatos para grupos lado a lado e o endereço com os horários.
 */
export default function PaginaDasReservas() {
  return (
    <>
      <CabecaDaPagina
        caminho={[{ rotulo: "Reservas" }]}
        gravura="ostra"
        caligrafia="Reserve"
        titulo="sua mesa"
        frase={["Trinta e dois lugares", "de frente para a baía"]}
      />

      <section
        aria-label="Fazer a reserva"
        className="papel-claro relative isolate overflow-hidden bg-[var(--cor-pessego)] py-20 text-[var(--cor-tinta)] sm:py-24"
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
        <Container largura="larga">
          <Reserva />
        </Container>
      </section>

      <section aria-labelledby="regras" className="py-24 sm:py-32">
        <Container largura="larga">
          <h2
            id="regras"
            className="lm-revela grid justify-items-center text-center"
          >
            <span className="lm-caligrafia -mb-[0.3em] text-[clamp(3rem,9vw,5rem)] text-[var(--cor-laranja)]">
              Combinados
            </span>
            <span className="lm-serifa text-[clamp(3rem,10vw,6rem)]">
              da casa
            </span>
          </h2>
          <dl className="mt-14 grid gap-px bg-[var(--cor-borda)] sm:grid-cols-2 lg:grid-cols-4">
            {regrasDaReserva.map((r) => (
              <div
                key={r.titulo}
                className="lm-revela bg-[var(--cor-tinta)] p-6 sm:p-8"
              >
                <dt className="lm-serifa text-[2rem]">{r.titulo}</dt>
                <dd className="mt-4 leading-relaxed text-[var(--cor-texto-suave)]">
                  {r.texto}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section
        aria-labelledby="grupos"
        className="border-t border-[var(--cor-borda)] py-24 sm:py-32"
      >
        <Container largura="larga">
          <h2
            id="grupos"
            className="lm-revela grid justify-items-center text-center"
          >
            <span className="lm-caligrafia -mb-[0.3em] text-[clamp(3rem,9vw,5rem)] text-[var(--cor-laranja)]">
              Grupos
            </span>
            <span className="lm-serifa text-[clamp(3rem,10vw,6rem)]">
              e eventos
            </span>
          </h2>
          <p className="lm-revela mx-auto mt-6 max-w-[48ch] text-center text-[1.0625rem] leading-relaxed text-[var(--cor-texto-suave)]">
            Acima de {maximoDePessoas} pessoas, a reserva vira conversa. Três
            formatos, do jantar de família à casa fechada.
          </p>
          <ul className="mt-14 grid gap-4 lg:grid-cols-3">
            {eventos.map((ev, i) => {
              const papel = PAPEL[i] ?? "salvia";
              return (
                <li
                  key={ev.id}
                  className={classes(
                    "lm-revela papel-claro flex flex-col p-6 text-[var(--cor-tinta)] sm:p-8",
                    i === 1 && "lg:-translate-y-4",
                  )}
                  style={{ backgroundColor: cores[papel] }}
                >
                  <p className="lm-selo text-[0.6875rem]">{ev.pessoas}</p>
                  <h3 className="lm-serifa mt-4 text-[clamp(2.5rem,5vw,3.25rem)]">
                    {ev.nome}
                  </h3>
                  <p className="lm-caligrafia mt-2 text-[2rem] leading-none">
                    {ev.preco}
                  </p>
                  <ul className="mt-6 grid gap-2 border-t border-[rgb(12_11_9/0.25)] pt-5">
                    {ev.itens.map((item) => (
                      <li key={item} className="lm-descricao">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <a
                      href={linkDoPremium(
                        `Quero conversar sobre o formato "${ev.nome}" para um grupo.`,
                        nome,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lm-botao lm-botao-tinta"
                    >
                      Pedir proposta
                      <ArrowUpRight
                        aria-hidden
                        className="size-4"
                        strokeWidth={1.5}
                      />
                      <span className="sr-only"> (abre o WhatsApp)</span>
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="visita"
        className="border-t border-[var(--cor-borda)] py-24 sm:py-32"
      >
        <Container
          largura="normal"
          className="grid gap-12 sm:grid-cols-2 sm:items-start"
        >
          <div className="lm-revela">
            <h2 id="visita" className="grid">
              <span className="lm-caligrafia -mb-[0.3em] text-[clamp(2.75rem,8vw,4.25rem)] text-[var(--cor-laranja)]">
                Venha
              </span>
              <span className="lm-serifa text-[clamp(3rem,9vw,5rem)]">
                nos visitar
              </span>
            </h2>
            <address className="mt-6 text-[1.0625rem] leading-relaxed text-[var(--cor-texto-suave)] not-italic">
              {contato.endereco}
              <br />
              {contato.bairro}
            </address>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ribeir%C3%A3o+da+Ilha+Florian%C3%B3polis"
              target="_blank"
              rel="noopener noreferrer"
              className="lm-botao lm-botao-contorno mt-8"
            >
              Como chegar
              <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.5} />
              <span className="sr-only"> (abre o Google Maps)</span>
            </a>
          </div>
          <dl className="lm-revela grid gap-3 border-t border-[var(--cor-borda)] pt-6 sm:mt-4">
            {horarios.map(({ dias, horas }) => (
              <div
                key={dias}
                className="flex items-baseline justify-between gap-4"
              >
                <dt className="lm-selo text-[0.75rem] text-[var(--cor-texto-suave)]">
                  {dias}
                </dt>
                <dd className="lm-serifa text-right text-[1.375rem]">
                  {horas}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
