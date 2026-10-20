import { describe, expect, it } from "vitest";
import {
  formatarContagem,
  horarioCurto,
  proximaAula,
  quandoFalar,
  rotuloDosDias,
  statusDoExpediente,
  type Aula,
  type Expediente,
} from "./agenda";

// 2026-10-19 é uma segunda-feira.
const segunda = (h: number, m = 0) => new Date(2026, 9, 19, h, m, 0);

const grade: Aula[] = [
  {
    dia: 1,
    inicio: "18:30",
    duracaoMinutos: 45,
    modalidade: "Funcional",
    local: "Sala 2",
  },
  {
    dia: 1,
    inicio: "06:00",
    duracaoMinutos: 45,
    modalidade: "Cross",
    local: "Box",
  },
  {
    dia: 3,
    inicio: "07:00",
    duracaoMinutos: 45,
    modalidade: "Bike",
    local: "Sala 1",
  },
];

const expedientes: Expediente[] = [
  { dias: [1, 2, 3, 4, 5], abre: "05:30", fecha: "23:00" },
  { dias: [6], abre: "08:00", fecha: "14:00" },
];

describe("proximaAula", () => {
  it("encontra a próxima aula do mesmo dia, em ordem de horário", () => {
    const r = proximaAula(grade, segunda(10));
    expect(r?.aula.modalidade).toBe("Funcional");
    expect(r?.diasDepois).toBe(0);
    expect(r?.inicio.getHours()).toBe(18);
  });

  it("pula para o próximo dia com aula depois da última do dia", () => {
    const r = proximaAula(grade, segunda(20));
    expect(r?.aula.modalidade).toBe("Bike");
    expect(r?.diasDepois).toBe(2);
  });

  it("dá a volta na semana", () => {
    const quarta = new Date(2026, 9, 21, 8, 0);
    const r = proximaAula(grade, quarta);
    expect(r?.aula.modalidade).toBe("Cross");
    expect(r?.diasDepois).toBe(5);
  });

  it("devolve null com a grade vazia", () => {
    expect(proximaAula([], segunda(10))).toBeNull();
  });
});

describe("formatarContagem", () => {
  it("formata em HH:MM:SS", () => {
    expect(formatarContagem((2 * 3600 + 5 * 60 + 9) * 1000)).toBe("02:05:09");
    expect(formatarContagem(-500)).toBe("00:00:00");
    expect(formatarContagem(200 * 3600 * 1000)).toBe("99:00:00");
  });
});

describe("statusDoExpediente", () => {
  it("aberto dentro do horário", () => {
    expect(statusDoExpediente(expedientes, segunda(12))).toEqual({
      aberto: true,
      fechaAs: "23:00",
    });
  });

  it("antes de abrir, informa o horário de hoje", () => {
    expect(statusDoExpediente(expedientes, segunda(5))).toEqual({
      aberto: false,
      abreAs: "05:30",
      diasDepois: 0,
    });
  });

  it("depois de fechar no sábado, abre só na segunda", () => {
    const sabado = new Date(2026, 9, 24, 15, 0);
    expect(statusDoExpediente(expedientes, sabado)).toEqual({
      aberto: false,
      abreAs: "05:30",
      diasDepois: 2,
    });
  });
});

describe("formatação de dias e horários", () => {
  it("encurta horários", () => {
    expect(horarioCurto("18:30")).toBe("18h30");
    expect(horarioCurto("06:00")).toBe("6h");
  });

  it("fala o dia relativo", () => {
    expect(quandoFalar(0, segunda(9))).toBe("hoje");
    expect(quandoFalar(1, segunda(9))).toBe("amanhã");
    expect(quandoFalar(3, segunda(9))).toBe("quinta");
  });
});

describe("rotuloDosDias", () => {
  it("resume dias seguidos e lista os demais", () => {
    expect(rotuloDosDias([1, 2, 3, 4, 5])).toBe("Segunda a sexta");
    expect(rotuloDosDias([6])).toBe("Sábado");
    expect(rotuloDosDias([0, 6])).toBe("Sábado e domingo");
    expect(rotuloDosDias([1, 3, 5])).toBe("Segunda, quarta e sexta");
  });
});
