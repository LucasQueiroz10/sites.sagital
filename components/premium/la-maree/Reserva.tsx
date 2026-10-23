"use client";

import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useId, useMemo, useState, useSyncExternalStore } from "react";
import {
  horariosDoAlmoco,
  horariosDoJantar,
  maximoDePessoas,
  nome as nomeDaCasa,
  ocasioes,
  turnos,
} from "@/data/la-maree";
import { classes } from "@/lib/classes";
import { linkDoPremium } from "@/lib/whatsapp";
import { Gravura } from "./Marcas";

const DIAS_A_FRENTE = 14;
const semAssinatura = () => () => {};

/** A data de hoje no navegador; no servidor ainda não se sabe o fuso. */
function useHoje(): string | null {
  return useSyncExternalStore(
    semAssinatura,
    () => new Date().toDateString(),
    () => null,
  );
}

type Dia = { data: Date; aberto: boolean; chave: string };

function proximosDias(hoje: string): Dia[] {
  const inicio = new Date(hoje);
  return Array.from({ length: DIAS_A_FRENTE }, (_, i) => {
    const data = new Date(inicio);
    data.setDate(inicio.getDate() + i);
    const turno = turnos[data.getDay()];
    return {
      data,
      aberto: turno.almoco || turno.jantar,
      chave: data.toDateString(),
    };
  });
}

function horariosDoDia(data: Date): string[] {
  const turno = turnos[data.getDay()];
  return [
    ...(turno.almoco ? horariosDoAlmoco : []),
    ...(turno.jantar ? horariosDoJantar : []),
  ];
}

const semana = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const extenso = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const chip =
  "lm-selo inline-flex min-h-11 items-center justify-center border border-[var(--cor-tinta)] px-3.5 text-[0.75rem] transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-35";
const chipMarcado = "bg-[var(--cor-tinta)] text-[var(--cor-creme)]";
const rotulo = "lm-selo text-[0.75rem]";

/**
 * O pedido de reserva: dia (segunda fechada), horário do turno daquele dia,
 * pessoas, ocasião e nome. Ao lado, o cartão "Bon appétit" resume tudo e
 * abre o WhatsApp com a mensagem escrita.
 */
export function Reserva() {
  const hoje = useHoje();
  const dias = useMemo(() => (hoje ? proximosDias(hoje) : []), [hoje]);
  const [diaEscolhido, setDiaEscolhido] = useState<string | null>(null);
  const [horario, setHorario] = useState<string | null>(null);
  const [pessoas, setPessoas] = useState(2);
  const [ocasiao, setOcasiao] = useState(ocasioes[0]);
  const [nome, setNome] = useState("");
  const [pedidos, setPedidos] = useState("");
  const [tentou, setTentou] = useState(false);
  const ids = useId();

  // Sem escolha, vale o primeiro dia aberto.
  const dia =
    dias.find((d) => d.chave === diaEscolhido) ?? dias.find((d) => d.aberto);
  const horarios = dia ? horariosDoDia(dia.data) : [];
  const horarioValido = horario && horarios.includes(horario) ? horario : null;
  const faltando = [
    !horarioValido && "o horário",
    !nome.trim() && "o seu nome",
  ].filter(Boolean) as string[];

  const mensagem = dia
    ? "Gostaria de reservar uma mesa.\n\n" +
      [
        `Dia: ${extenso.format(dia.data)}`,
        `Horário: ${horarioValido ?? "a combinar"}`,
        `Pessoas: ${pessoas}`,
        ocasiao !== ocasioes[0] && `Ocasião: ${ocasiao}`,
        pedidos.trim() && `Pedidos: ${pedidos.trim()}`,
        `Nome: ${nome.trim()}`,
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setTentou(true);
          if (faltando.length === 0 && dia) {
            window.open(
              linkDoPremium(mensagem, nomeDaCasa),
              "_blank",
              "noopener,noreferrer",
            );
          }
        }}
        aria-describedby={`${ids}-resumo`}
        className="grid grid-cols-1 gap-9"
      >
        <fieldset className="min-w-0">
          <legend className={rotulo}>Dia</legend>
          <div className="-mx-4 mt-3 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {dias.length === 0
              ? Array.from({ length: 7 }, (_, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="h-16 w-14 shrink-0 animate-pulse bg-[var(--cor-tinta)]/10"
                  />
                ))
              : dias.map((d) => {
                  const marcado = d.chave === dia?.chave;
                  return (
                    <button
                      key={d.chave}
                      type="button"
                      disabled={!d.aberto}
                      aria-pressed={marcado}
                      onClick={() => setDiaEscolhido(d.chave)}
                      className={classes(
                        chip,
                        "h-16 w-14 shrink-0 snap-start flex-col gap-0.5 px-0",
                        marcado && chipMarcado,
                      )}
                    >
                      <span className="text-[0.625rem] opacity-75">
                        {semana.format(d.data).replace(".", "")}
                      </span>
                      <span className="text-[1.0625rem] leading-none font-semibold">
                        {d.data.getDate()}
                      </span>
                      <span className="sr-only">
                        {extenso.format(d.data)}
                        {!d.aberto && ", fechado"}
                      </span>
                    </button>
                  );
                })}
          </div>
          <p className="lm-selo mt-2 text-[0.6875rem] opacity-70">
            Segunda fechado. Almoço de sexta a domingo.
          </p>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className={rotulo}>Horário</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {horarios.map((h) => (
              <button
                key={h}
                type="button"
                aria-pressed={h === horarioValido}
                onClick={() => setHorario(h)}
                className={classes(chip, h === horarioValido && chipMarcado)}
              >
                {h}
              </button>
            ))}
          </div>
          {tentou && !horarioValido && (
            <p
              role="alert"
              className="lm-selo mt-2 text-[0.75rem] text-[#7a1f0c]"
            >
              Escolha um horário.
            </p>
          )}
        </fieldset>

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div>
            <p id={`${ids}-pessoas`} className={rotulo}>
              Pessoas
            </p>
            <div
              role="group"
              aria-labelledby={`${ids}-pessoas`}
              className="mt-3 inline-flex items-center border border-[var(--cor-tinta)]"
            >
              <button
                type="button"
                onClick={() => setPessoas((n) => Math.max(1, n - 1))}
                disabled={pessoas <= 1}
                className="inline-flex size-11 items-center justify-center transition-transform active:scale-[0.94] disabled:opacity-35"
              >
                <Minus aria-hidden className="size-4" strokeWidth={1.75} />
                <span className="sr-only">Uma pessoa a menos</span>
              </button>
              <output
                aria-live="polite"
                className="lm-serifa w-12 text-center text-[1.75rem] leading-none"
              >
                {pessoas}
              </output>
              <button
                type="button"
                onClick={() =>
                  setPessoas((n) => Math.min(maximoDePessoas, n + 1))
                }
                disabled={pessoas >= maximoDePessoas}
                className="inline-flex size-11 items-center justify-center transition-transform active:scale-[0.94] disabled:opacity-35"
              >
                <Plus aria-hidden className="size-4" strokeWidth={1.75} />
                <span className="sr-only">Uma pessoa a mais</span>
              </button>
            </div>
            <p className="lm-selo mt-2 text-[0.6875rem] opacity-70">
              {pessoas >= maximoDePessoas
                ? "Grupo maior? Conte no campo de pedidos."
                : `Até ${maximoDePessoas} pessoas por reserva.`}
            </p>
          </div>

          <fieldset className="min-w-0">
            <legend className={rotulo}>Ocasião</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {ocasioes.map((o) => (
                <button
                  key={o}
                  type="button"
                  aria-pressed={o === ocasiao}
                  onClick={() => setOcasiao(o)}
                  className={classes(chip, o === ocasiao && chipMarcado)}
                >
                  {o}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor={`${ids}-nome`} className={rotulo}>
              Nome
            </label>
            <input
              id={`${ids}-nome`}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="name"
              aria-invalid={tentou && !nome.trim()}
              aria-describedby={`${ids}-nome-erro`}
              className="min-h-11 border-b border-[var(--cor-tinta)] bg-transparent text-[1.0625rem] outline-offset-4"
            />
            <p
              id={`${ids}-nome-erro`}
              role={tentou && !nome.trim() ? "alert" : undefined}
              className="lm-selo text-[0.75rem] text-[#7a1f0c]"
            >
              {tentou && !nome.trim()
                ? "Diga em nome de quem fica a mesa."
                : ""}
            </p>
          </div>
          <div className="grid gap-2">
            <label htmlFor={`${ids}-pedidos`} className={rotulo}>
              Alergias ou pedidos (opcional)
            </label>
            <input
              id={`${ids}-pedidos`}
              value={pedidos}
              onChange={(e) => setPedidos(e.target.value)}
              className="min-h-11 border-b border-[var(--cor-tinta)] bg-transparent text-[1.0625rem] outline-offset-4"
            />
          </div>
        </div>

        <button
          type="submit"
          className="lm-botao lm-botao-tinta w-full sm:w-auto sm:justify-self-start"
        >
          Enviar pelo WhatsApp
          <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
          <span className="sr-only"> (abre o WhatsApp)</span>
        </button>
      </form>

      {/* O cartão de resumo: o "Bon appétit" laranja das referências. */}
      <aside
        id={`${ids}-resumo`}
        aria-label="Resumo da reserva"
        className="relative isolate self-start overflow-hidden bg-[var(--cor-laranja)] px-6 pt-10 pb-8 text-[var(--cor-tinta)] lg:sticky lg:top-24"
      >
        <div className="grid justify-items-center text-center">
          <p className="lm-caligrafia -mb-[0.3em] text-[3.25rem] text-[var(--cor-creme)]">
            Bon
          </p>
          <p className="lm-serifa relative text-[4rem]">
            Appétit
            <Gravura
              nome="peixe"
              className="absolute top-[58%] left-1/2 -z-10 w-[118%] -translate-x-1/2 -translate-y-1/2 text-[var(--cor-tinta)] opacity-25"
            />
          </p>
        </div>
        <dl className="mt-8 grid gap-3 border-t border-[var(--cor-tinta)]/40 pt-6">
          {[
            ["Dia", dia ? extenso.format(dia.data) : "..."],
            ["Horário", horarioValido ?? "escolha ao lado"],
            ["Pessoas", String(pessoas)],
            ["Ocasião", ocasiao],
            ["Em nome de", nome.trim() || "..."],
          ].map(([termo, valor]) => (
            <div
              key={termo}
              className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-3"
            >
              <dt className="lm-selo text-[0.6875rem] opacity-75">{termo}</dt>
              <dd className="lm-serifa text-[1.375rem] leading-[1.05] [overflow-wrap:anywhere]">
                {valor}
              </dd>
            </div>
          ))}
        </dl>
        <p className="lm-selo mt-6 text-[0.6875rem]">
          A casa confirma pelo WhatsApp em até uma hora.
        </p>
      </aside>
    </div>
  );
}
