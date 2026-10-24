import { describe, expect, it } from "vitest";
import { COTACOES, lerValor, simular } from "./cambio";

describe("simular", () => {
  it("ao receber, desconta a tarifa e não cobra IOF", () => {
    const r = simular(1000, "USD", "receber", 0.007);
    // 1.000 × 5,418 = 5.418; tarifa 0,7% = 37,93
    expect(r.convertido).toBe(5418);
    expect(r.tarifa).toBeCloseTo(37.93, 2);
    expect(r.iof).toBe(0);
    expect(r.total).toBeCloseTo(5380.07, 2);
    // banco: 5.418 × 0,96 − 120 = 5.081,28
    expect(r.noBanco).toBeCloseTo(5081.28, 2);
    expect(r.economia).toBeCloseTo(298.79, 2);
  });

  it("ao enviar, soma tarifa e IOF ao que sai da conta", () => {
    const r = simular(1000, "EUR", "enviar", 0.012);
    const convertido = 1000 * COTACOES.EUR;
    expect(r.iof).toBeCloseTo(convertido * 0.0038, 2);
    expect(r.total).toBeCloseTo(convertido * (1 + 0.012 + 0.0038), 2);
    expect(r.economia).toBeGreaterThan(0);
  });

  it("valor zero não gera economia nem custo no banco", () => {
    const r = simular(0, "GBP", "enviar", 0.003);
    expect(r.total).toBe(0);
    expect(r.noBanco).toBe(0);
    expect(r.economia).toBe(0);
  });
});

describe("lerValor", () => {
  it("entende o jeito brasileiro e o internacional", () => {
    expect(lerValor("1.500,50")).toBe(1500.5);
    expect(lerValor("1500.5")).toBe(1500.5);
    expect(lerValor("12.000")).toBe(12000);
    expect(lerValor("US$ 2 000")).toBe(2000);
    expect(lerValor("")).toBe(0);
  });
});
