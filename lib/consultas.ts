/**
 * Agenda de consultas do site da clínica: os dias em que ela atende, os
 * horários de cada dia e quais já estão ocupados. Funções puras; quem chama
 * passa o "agora" (no navegador, a hora do aparelho).
 */
import { minutosDoDia, type DiaDaSemana } from "./agenda";

export type TurnoDeAtendimento = {
  dias: readonly DiaDaSemana[];
  /** "HH:MM", 24 horas. */
  abre: string;
  /** Último horário termina antes deste. */
  fecha: string;
  /** Intervalo sem consultas, como o almoço: ["12:00", "13:30"]. */
  pausa?: readonly [string, string];
};

export type DiaDeConsulta = {
  data: Date;
  /** "2026-10-22": identifica o dia na ocupação simulada. */
  chave: string;
  diasDepois: number;
};

export type HorarioDeConsulta = { horario: string; livre: boolean };

/** Parte das vagas que aparece ocupada, para a agenda parecer real. */
const OCUPACAO = 0.38;

const doisDigitos = (n: number) => String(n).padStart(2, "0");

export function chaveDoDia(data: Date): string {
  return `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}-${doisDigitos(data.getDate())}`;
}

function turnoDoDia(
  turnos: readonly TurnoDeAtendimento[],
  data: Date,
): TurnoDeAtendimento | undefined {
  const dia = data.getDay() as DiaDaSemana;
  return turnos.find((turno) => turno.dias.includes(dia));
}

/** Hash FNV-1a de 32 bits: o mesmo texto dá sempre o mesmo número. */
function hash(texto: string): number {
  let valor = 0x811c9dc5;
  for (let i = 0; i < texto.length; i++) {
    valor ^= texto.charCodeAt(i);
    valor = Math.imul(valor, 0x01000193);
  }
  return valor >>> 0;
}

/**
 * Ocupação simulada e estável: o mesmo dia e horário dão sempre o mesmo
 * resultado, em qualquer aparelho, sem banco de dados.
 */
export function estaOcupado(chave: string, horario: string): boolean {
  return (hash(`${chave} ${horario}`) % 1000) / 1000 < OCUPACAO;
}

/** Os próximos `quantos` dias em que a clínica atende, a partir de hoje. */
export function diasDeConsulta(
  turnos: readonly TurnoDeAtendimento[],
  agora: Date,
  quantos: number,
): DiaDeConsulta[] {
  const dias: DiaDeConsulta[] = [];
  for (
    let diasDepois = 0;
    dias.length < quantos && diasDepois < 60;
    diasDepois++
  ) {
    const data = new Date(agora);
    data.setHours(0, 0, 0, 0);
    data.setDate(data.getDate() + diasDepois);
    if (turnoDoDia(turnos, data))
      dias.push({ data, chave: chaveDoDia(data), diasDepois });
  }
  return dias;
}

/**
 * Horários de um dia, de `intervalo` em `intervalo` minutos. Ficam
 * indisponíveis os ocupados e, no dia de hoje, os que começam em menos de uma
 * hora.
 */
export function horariosDoDia(
  turnos: readonly TurnoDeAtendimento[],
  data: Date,
  agora: Date,
  intervalo = 30,
): HorarioDeConsulta[] {
  const turno = turnoDoDia(turnos, data);
  if (!turno) return [];
  const chave = chaveDoDia(data);
  const ehHoje = chave === chaveDoDia(agora);
  const limite = agora.getHours() * 60 + agora.getMinutes() + 60;
  const pausaInicio = turno.pausa ? minutosDoDia(turno.pausa[0]) : Infinity;
  const pausaFim = turno.pausa ? minutosDoDia(turno.pausa[1]) : Infinity;

  const horarios: HorarioDeConsulta[] = [];
  for (
    let minuto = minutosDoDia(turno.abre);
    minuto + intervalo <= minutosDoDia(turno.fecha);
    minuto += intervalo
  ) {
    if (minuto >= pausaInicio && minuto < pausaFim) continue;
    const horario = `${doisDigitos(Math.floor(minuto / 60))}:${doisDigitos(minuto % 60)}`;
    const passou = ehHoje && minuto < limite;
    horarios.push({ horario, livre: !passou && !estaOcupado(chave, horario) });
  }
  return horarios;
}

/** O primeiro horário livre a partir de agora, olhando `quantosDias` dias à frente. */
export function proximoHorarioLivre(
  turnos: readonly TurnoDeAtendimento[],
  agora: Date,
  quantosDias = 14,
): { dia: DiaDeConsulta; horario: string } | null {
  for (const dia of diasDeConsulta(turnos, agora, quantosDias)) {
    const livre = horariosDoDia(turnos, dia.data, agora).find((h) => h.livre);
    if (livre) return { dia, horario: livre.horario };
  }
  return null;
}
