import { describe, expect, it } from "vitest";
import { aliquotaEfetiva, enquadrar, LIMITE_MEI } from "./regimes";

describe("aliquotaEfetiva", () => {
  it("na primeira faixa é a alíquota nominal", () => {
    expect(aliquotaEfetiva(150_000, "comercio")).toBeCloseTo(0.04);
    expect(aliquotaEfetiva(150_000, "servicos")).toBeCloseTo(0.06);
  });

  it("desconta a parcela a deduzir nas faixas seguintes", () => {
    // (300.000 × 7,3% − 5.940) ÷ 300.000 = 5,32%
    expect(aliquotaEfetiva(300_000, "comercio")).toBeCloseTo(0.0532, 4);
    // (500.000 × 13,5% − 17.640) ÷ 500.000 = 9,972%
    expect(aliquotaEfetiva(500_000, "servicos")).toBeCloseTo(0.09972, 5);
  });
});

describe("enquadrar", () => {
  it("até o limite do MEI, usa o valor fixo", () => {
    const resultado = enquadrar(LIMITE_MEI, "servicos", 80.9);
    expect(resultado.regime).toBe("MEI");
    expect(resultado.impostoMensal).toBe(80.9);
  });

  it("acima do MEI, estima o Simples por mês", () => {
    const resultado = enquadrar(240_000, "comercio", 80.9);
    expect(resultado.regime).toBe("Simples Nacional");
    // (240.000 × 7,3% − 5.940) ÷ 12 = 965
    expect(resultado.impostoMensal).toBeCloseTo(965, 0);
  });

  it("acima de R$ 4,8 milhões, não estima", () => {
    const resultado = enquadrar(6_000_000, "industria", 80.9);
    expect(resultado.regime).toBe("Lucro Presumido ou Real");
    expect(resultado.impostoMensal).toBeNull();
  });
});
