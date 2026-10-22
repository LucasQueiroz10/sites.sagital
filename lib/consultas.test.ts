import { describe, expect, it } from "vitest";
import {
  chaveDoDia,
  diasDeConsulta,
  estaOcupado,
  horariosDoDia,
  proximoHorarioLivre,
  type TurnoDeAtendimento,
} from "./consultas";

const turnos: TurnoDeAtendimento[] = [
  {
    dias: [1, 2, 3, 4, 5],
    abre: "08:00",
    fecha: "18:00",
    pausa: ["12:00", "13:30"],
  },
  { dias: [6], abre: "08:00", fecha: "12:00" },
];

// Quarta-feira, 21 de outubro de 2026, às 10h.
const quarta = new Date(2026, 9, 21, 10, 0);

describe("diasDeConsulta", () => {
  it("pula o domingo e começa hoje", () => {
    const dias = diasDeConsulta(turnos, quarta, 5);
    expect(dias.map((d) => d.chave)).toEqual([
      "2026-10-21",
      "2026-10-22",
      "2026-10-23",
      "2026-10-24",
      "2026-10-26",
    ]);
    expect(dias[0]?.diasDepois).toBe(0);
  });
});

describe("horariosDoDia", () => {
  it("respeita a pausa do almoço e o fim do expediente", () => {
    const sexta = new Date(2026, 9, 23);
    const horarios = horariosDoDia(turnos, sexta, quarta).map((h) => h.horario);
    expect(horarios[0]).toBe("08:00");
    expect(horarios).not.toContain("12:30");
    expect(horarios).toContain("13:30");
    expect(horarios.at(-1)).toBe("17:30");
  });

  it("no sábado só abre de manhã", () => {
    const sabado = new Date(2026, 9, 24);
    expect(horariosDoDia(turnos, sabado, quarta).at(-1)?.horario).toBe("11:30");
  });

  it("hoje, não oferece horário que começa em menos de uma hora", () => {
    const hoje = horariosDoDia(turnos, quarta, quarta);
    expect(hoje.filter((h) => h.horario < "11:00").every((h) => !h.livre)).toBe(
      true,
    );
  });

  it("não atende no domingo", () => {
    expect(horariosDoDia(turnos, new Date(2026, 9, 25), quarta)).toEqual([]);
  });
});

describe("ocupação simulada", () => {
  it("é estável e deixa vagas livres", () => {
    const chave = chaveDoDia(new Date(2026, 9, 22));
    expect(estaOcupado(chave, "09:00")).toBe(estaOcupado(chave, "09:00"));
    const dia = horariosDoDia(turnos, new Date(2026, 9, 22), quarta);
    const livres = dia.filter((h) => h.livre).length;
    expect(livres).toBeGreaterThan(0);
    expect(livres).toBeLessThan(dia.length);
  });

  it("acha o próximo horário livre", () => {
    const proximo = proximoHorarioLivre(turnos, quarta);
    expect(proximo).not.toBeNull();
    expect(proximo!.dia.data.getDay()).not.toBe(0);
  });
});
