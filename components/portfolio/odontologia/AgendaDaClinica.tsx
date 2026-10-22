"use client";

import { CalendarCheck, Clock } from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import type { Tratamento } from "@/data/portfolio/odontologia";
import { DIAS, horarioCurto } from "@/lib/agenda";
import {
  diasDeConsulta,
  horariosDoDia,
  type DiaDeConsulta,
  type TurnoDeAtendimento,
} from "@/lib/consultas";
import { useAgora } from "@/lib/useAgora";
import { linkDoPortfolio } from "@/lib/whatsapp";

/** Evento que os botões "Agendar" dos tratamentos disparam. */
export const EVENTO_DO_TRATAMENTO = "lumi:tratamento";

const MESES = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

type Props = {
  nomeDoSite: string;
  tratamentos: Tratamento[];
  turnos: TurnoDeAtendimento[];
};

function nomeDoDia(dia: DiaDeConsulta): string {
  if (dia.diasDepois === 0) return "Hoje";
  if (dia.diasDepois === 1) return "Amanhã";
  return DIAS[dia.data.getDay()]?.curto ?? "";
}

function quando(dia: DiaDeConsulta): string {
  const data = `${dia.data.getDate()}/${String(dia.data.getMonth() + 1).padStart(2, "0")}`;
  const semana = DIAS[dia.data.getDay()]?.nome.toLowerCase() ?? "";
  if (dia.diasDepois === 0) return `hoje (${semana}, ${data})`;
  if (dia.diasDepois === 1) return `amanhã (${semana}, ${data})`;
  return `${semana}, ${data}`;
}

/**
 * A agenda aberta da clínica: tratamento, dia e horário, e a confirmação
 * sai pronta para o WhatsApp. Os horários vêm do expediente e de hoje; a
 * ocupação é simulada, igual em qualquer aparelho.
 */
export function AgendaDaClinica({ nomeDoSite, tratamentos, turnos }: Props) {
  const id = useId();
  const agora = useAgora("minuto");
  const [tratamentoId, setTratamentoId] = useState(tratamentos[0]?.id ?? "");
  const [diaEscolhido, setDiaEscolhido] = useState<string | null>(null);
  const [horario, setHorario] = useState<string | null>(null);

  // Os botões "Agendar" da lista de tratamentos já escolhem o tratamento.
  useEffect(() => {
    const aoEscolher = (evento: Event) => {
      const escolhido = (evento as CustomEvent<string>).detail;
      if (tratamentos.some((t) => t.id === escolhido))
        setTratamentoId(escolhido);
    };
    window.addEventListener(EVENTO_DO_TRATAMENTO, aoEscolher);
    return () => window.removeEventListener(EVENTO_DO_TRATAMENTO, aoEscolher);
  }, [tratamentos]);

  // Os dias só mudam quando muda a data, não a cada minuto do relógio.
  const dataDeHoje = agora?.toDateString() ?? null;
  const dias = useMemo(
    () => (dataDeHoje ? diasDeConsulta(turnos, new Date(dataDeHoje), 12) : []),
    [turnos, dataDeHoje],
  );
  const horariosPorDia = useMemo(
    () =>
      new Map(
        dias.map((dia) => [
          dia.chave,
          agora ? horariosDoDia(turnos, dia.data, agora) : [],
        ]),
      ),
    [dias, turnos, agora],
  );

  // Sem escolha, abre no primeiro dia com horário livre.
  const primeiroComVaga = dias.find((dia) =>
    horariosPorDia.get(dia.chave)?.some((h) => h.livre),
  );
  const dia =
    dias.find((d) => d.chave === diaEscolhido) ?? primeiroComVaga ?? dias[0];
  const horarios = dia ? (horariosPorDia.get(dia.chave) ?? []) : [];
  const horarioValido = horarios.some((h) => h.horario === horario && h.livre)
    ? horario
    : null;
  const tratamento = tratamentos.find((t) => t.id === tratamentoId);

  const pronto = Boolean(tratamento && dia && horarioValido);
  const mensagem =
    tratamento && dia && horarioValido
      ? `Quero agendar ${tratamento.nome.toLowerCase()} para ${quando(dia)}, às ${horarioCurto(horarioValido)}.`
      : "";

  const legenda = "mb-3 text-sm font-semibold text-texto";

  return (
    <div className="rounded-[1.75rem] bg-fundo p-5 shadow-[0_24px_60px_-28px_rgb(15_34_51/0.35)] sm:p-8">
      <fieldset className="min-w-0">
        <legend className={legenda}>1. Tratamento</legend>
        <div className="flex flex-wrap gap-2">
          {tratamentos.map((item) => (
            <label key={item.id} className="cursor-pointer">
              <input
                type="radio"
                name={`${id}-tratamento`}
                value={item.id}
                checked={tratamentoId === item.id}
                onChange={() => setTratamentoId(item.id)}
                className="peer sr-only"
              />
              <span className="flex min-h-11 items-center rounded-full border border-borda px-4 text-[0.9375rem] transition-colors peer-checked:border-primaria peer-checked:bg-primaria peer-checked:text-primaria-texto peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-destaque hover:border-texto-suave">
                {item.nome}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-7 min-w-0">
        <legend className={legenda}>2. Dia</legend>
        {dias.length === 0 ? (
          <div aria-hidden className="h-[4.75rem] rounded-2xl bg-superficie" />
        ) : (
          <div className="relative -mx-5 flex snap-x scroll-px-5 gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8">
            {dias.map((item) => {
              const temVaga = horariosPorDia
                .get(item.chave)
                ?.some((h) => h.livre);
              return (
                <label key={item.chave} className="shrink-0 snap-start">
                  <input
                    type="radio"
                    name={`${id}-dia`}
                    value={item.chave}
                    checked={dia?.chave === item.chave}
                    disabled={!temVaga}
                    onChange={() => {
                      setDiaEscolhido(item.chave);
                      setHorario(null);
                    }}
                    className="peer sr-only"
                  />
                  <span className="flex h-[4.75rem] w-[4.25rem] cursor-pointer flex-col items-center justify-center rounded-2xl border border-borda transition-colors peer-checked:border-primaria peer-checked:bg-primaria peer-checked:text-primaria-texto peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-destaque peer-disabled:cursor-not-allowed peer-disabled:opacity-40 hover:border-texto-suave">
                    <span className="text-xs">{nomeDoDia(item)}</span>
                    <span className="numero text-xl leading-tight font-semibold">
                      {item.data.getDate()}
                    </span>
                    <span className="text-xs">
                      {MESES[item.data.getMonth()]}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </fieldset>

      <fieldset className="mt-7 min-w-0">
        <legend className={legenda}>
          3. Horário
          {dia && (
            <span className="font-normal text-texto-suave">
              {" "}
              · {quando(dia)}
            </span>
          )}
        </legend>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {horarios.map((item) => (
            <label key={item.horario}>
              <input
                type="radio"
                name={`${id}-horario`}
                value={item.horario}
                checked={horarioValido === item.horario}
                disabled={!item.livre}
                onChange={() => setHorario(item.horario)}
                className="peer sr-only"
              />
              <span className="numero flex min-h-11 cursor-pointer items-center justify-center rounded-xl border border-borda text-[0.9375rem] transition-colors peer-checked:border-primaria peer-checked:bg-primaria peer-checked:text-primaria-texto peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-destaque peer-disabled:cursor-not-allowed peer-disabled:border-transparent peer-disabled:bg-superficie peer-disabled:text-[#8a99a5] peer-disabled:line-through hover:border-texto-suave">
                {item.horario}
              </span>
              {!item.livre && <span className="sr-only"> (indisponível)</span>}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-4 border-t border-borda pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-[0.9375rem] text-texto-suave">
          {pronto && tratamento && dia && horarioValido ? (
            <>
              <span className="font-semibold text-texto">
                {tratamento.nome}
              </span>
              <br />
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden className="size-4" />
                {quando(dia)}, {horarioCurto(horarioValido)} ·{" "}
                {tratamento.duracao} min
              </span>
            </>
          ) : (
            "Escolha o dia e o horário que preferir."
          )}
        </p>
        {pronto ? (
          <a
            href={linkDoPortfolio(mensagem, nomeDoSite)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primaria px-6 font-semibold text-primaria-texto transition-colors hover:bg-primaria-hover"
          >
            <CalendarCheck aria-hidden className="size-5" />
            Confirmar pelo WhatsApp
            <span className="sr-only"> (abre o WhatsApp)</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex min-h-12 shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-superficie px-6 font-semibold text-texto-suave"
          >
            <CalendarCheck aria-hidden className="size-5" />
            Confirmar pelo WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}
