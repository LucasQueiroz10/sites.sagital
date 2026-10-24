import { describe, expect, it } from "vitest";
import { orcar, planoSugerido } from "./assinatura";

describe("orcar", () => {
  it("cobra por pessoa e mostra a economia do anual", () => {
    const r = orcar("equipe", 12, "anual");
    expect(r).toEqual({
      cabe: true,
      cobradas: 12,
      porMes: 12 * 19,
      porAno: 12 * 19 * 12,
      economiaNoAnual: 12 * 5 * 12,
    });
  });

  it("o plano Empresa cobra no mínimo dez pessoas", () => {
    const r = orcar("empresa", 4, "mensal");
    expect(r.cabe && r.cobradas).toBe(10);
    expect(r.cabe && r.porMes).toBe(420);
  });

  it("o plano Início é grátis até três pessoas e não atende mais que isso", () => {
    expect(orcar("inicio", 3, "mensal")).toMatchObject({
      cabe: true,
      porMes: 0,
    });
    expect(orcar("inicio", 4, "mensal")).toEqual({
      cabe: false,
      motivo: "grande-demais",
      maximo: 3,
    });
  });

  it("arredonda a equipe e nunca conta menos de uma pessoa", () => {
    expect(orcar("equipe", 0, "mensal")).toMatchObject({ cobradas: 1 });
    expect(orcar("equipe", 2.6, "mensal")).toMatchObject({ cobradas: 3 });
  });
});

describe("planoSugerido", () => {
  it("cresce com a equipe", () => {
    expect(planoSugerido(2)).toBe("inicio");
    expect(planoSugerido(15)).toBe("equipe");
    expect(planoSugerido(80)).toBe("empresa");
  });
});
