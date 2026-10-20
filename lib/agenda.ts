/**
 * Horários: próxima aula da grade e status de funcionamento.
 * Funções puras; quem chama passa o "agora" (no navegador, a hora do aparelho).
 */

/** 0 = domingo ... 6 = sábado, igual a Date.getDay(). */
export type DiaDaSemana = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DIAS: readonly { nome: string; curto: string }[] = [
  { nome: "Domingo", curto: "Dom" },
  { nome: "Segunda", curto: "Seg" },
  { nome: "Terça", curto: "Ter" },
  { nome: "Quarta", curto: "Qua" },
  { nome: "Quinta", curto: "Qui" },
  { nome: "Sexta", curto: "Sex" },
  { nome: "Sábado", curto: "Sáb" },
];

/** Segunda a domingo, a ordem em que a semana aparece na tela. */
export const ORDEM_DA_SEMANA: readonly DiaDaSemana[] = [1, 2, 3, 4, 5, 6, 0];

export type Aula = {
  dia: DiaDaSemana;
  /** "HH:MM", 24 horas. */
  inicio: string;
  duracaoMinutos: number;
  modalidade: string;
  local: string;
};

export type Expediente = {
  dias: readonly DiaDaSemana[];
  abre: string;
  fecha: string;
};

export function minutosDoDia(horario: string): number {
  const [h = 0, m = 0] = horario.split(":").map(Number);
  return h * 60 + m;
}

/** "18:30" vira "18h30"; "06:00" vira "6h". */
export function horarioCurto(horario: string): string {
  const [h = "0", m = "00"] = horario.split(":");
  return `${Number(h)}h${m === "00" ? "" : m}`;
}

function noDia(base: Date, diasDepois: number, horario: string): Date {
  const data = new Date(base);
  data.setDate(data.getDate() + diasDepois);
  data.setHours(0, minutosDoDia(horario), 0, 0);
  return data;
}

export function aulasDoDia(grade: readonly Aula[], dia: DiaDaSemana): Aula[] {
  return grade
    .filter((aula) => aula.dia === dia)
    .sort((a, b) => minutosDoDia(a.inicio) - minutosDoDia(b.inicio));
}

/** A primeira aula que começa depois de `agora`, olhando até 7 dias à frente. */
export function proximaAula(
  grade: readonly Aula[],
  agora: Date,
): { aula: Aula; inicio: Date; diasDepois: number } | null {
  for (let diasDepois = 0; diasDepois <= 7; diasDepois++) {
    const dia = ((agora.getDay() + diasDepois) % 7) as DiaDaSemana;
    for (const aula of aulasDoDia(grade, dia)) {
      const inicio = noDia(agora, diasDepois, aula.inicio);
      if (inicio > agora) return { aula, inicio, diasDepois };
    }
  }
  return null;
}

/** Milissegundos em "HH:MM:SS" (horas limitadas a 99). */
export function formatarContagem(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const horas = Math.min(99, Math.floor(total / 3600));
  const minutos = Math.floor((total % 3600) / 60);
  const segundos = total % 60;
  return [horas, minutos, segundos]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

export function expedienteDoDia(
  expedientes: readonly Expediente[],
  dia: DiaDaSemana,
): Expediente | undefined {
  return expedientes.find((e) => e.dias.includes(dia));
}

export type StatusDoExpediente =
  | { aberto: true; fechaAs: string }
  | { aberto: false; abreAs: string; diasDepois: number }
  | { aberto: false; abreAs: null; diasDepois: null };

export function statusDoExpediente(
  expedientes: readonly Expediente[],
  agora: Date,
): StatusDoExpediente {
  const minutos = agora.getHours() * 60 + agora.getMinutes();
  const hoje = expedienteDoDia(expedientes, agora.getDay() as DiaDaSemana);
  if (
    hoje &&
    minutos >= minutosDoDia(hoje.abre) &&
    minutos < minutosDoDia(hoje.fecha)
  ) {
    return { aberto: true, fechaAs: hoje.fecha };
  }
  if (hoje && minutos < minutosDoDia(hoje.abre)) {
    return { aberto: false, abreAs: hoje.abre, diasDepois: 0 };
  }
  for (let diasDepois = 1; diasDepois <= 7; diasDepois++) {
    const dia = ((agora.getDay() + diasDepois) % 7) as DiaDaSemana;
    const expediente = expedienteDoDia(expedientes, dia);
    if (expediente)
      return { aberto: false, abreAs: expediente.abre, diasDepois };
  }
  return { aberto: false, abreAs: null, diasDepois: null };
}

/** "hoje", "amanhã" ou o nome do dia. */
export function quandoFalar(diasDepois: number, agora: Date): string {
  if (diasDepois === 0) return "hoje";
  if (diasDepois === 1) return "amanhã";
  const dia = (agora.getDay() + diasDepois) % 7;
  return DIAS[dia]?.nome.toLowerCase() ?? "";
}

/** [1..5] vira "Segunda a sexta", [6] vira "Sábado", [6, 0] vira "Sábado e domingo". */
export function rotuloDosDias(dias: readonly DiaDaSemana[]): string {
  const ordenados = ORDEM_DA_SEMANA.filter((dia) => dias.includes(dia));
  const nomes = ordenados.map((dia) => DIAS[dia]?.nome.toLowerCase() ?? "");
  if (nomes.length === 0) return "";
  const posicoes = ordenados.map((dia) => ORDEM_DA_SEMANA.indexOf(dia));
  const seguidos = posicoes.every(
    (p, i) => i === 0 || p === (posicoes[i - 1] ?? 0) + 1,
  );
  const texto =
    nomes.length === 1
      ? nomes[0]
      : nomes.length >= 3 && seguidos
        ? `${nomes[0]} a ${nomes[nomes.length - 1]}`
        : `${nomes.slice(0, -1).join(", ")} e ${nomes[nomes.length - 1]}`;
  return (texto ?? "").charAt(0).toUpperCase() + (texto ?? "").slice(1);
}
