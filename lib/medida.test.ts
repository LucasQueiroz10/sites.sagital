import { describe, expect, it } from "vitest";
import { formatarMedida, tamanhoPelaMedida } from "./medida";

describe("tamanhoPelaMedida", () => {
  it("acha o tamanho de linha pela volta da mão", () => {
    expect(tamanhoPelaMedida(17)).toEqual({ tipo: "linha", tamanho: "P" });
    expect(tamanhoPelaMedida(20)).toEqual({ tipo: "linha", tamanho: "M" });
    expect(tamanhoPelaMedida(23)).toEqual({ tipo: "linha", tamanho: "G" });
  });

  it("o limite entre dois tamanhos fica com o maior", () => {
    expect(tamanhoPelaMedida(19)).toEqual({ tipo: "linha", tamanho: "M" });
    expect(tamanhoPelaMedida(21.5)).toEqual({ tipo: "linha", tamanho: "G" });
    expect(tamanhoPelaMedida(16.5)).toEqual({ tipo: "linha", tamanho: "P" });
  });

  it("fora da faixa, a mão é sob medida", () => {
    expect(tamanhoPelaMedida(15)).toEqual({
      tipo: "sob-medida",
      motivo: "pequena",
    });
    expect(tamanhoPelaMedida(24.5)).toEqual({
      tipo: "sob-medida",
      motivo: "grande",
    });
    expect(tamanhoPelaMedida(Number.NaN)).toEqual({
      tipo: "sob-medida",
      motivo: "pequena",
    });
  });
});

describe("formatarMedida", () => {
  it("escreve com vírgula e sem casa à toa", () => {
    expect(formatarMedida(19.5)).toBe("19,5 cm");
    expect(formatarMedida(20)).toBe("20 cm");
  });
});
