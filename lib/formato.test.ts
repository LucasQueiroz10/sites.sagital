import { describe, expect, it } from "vitest";
import {
  apelidoDoNome,
  formatarPreco,
  formatarPrecoRedondo,
  formatarTelefone,
  parcelar,
  partesDoPreco,
} from "./formato";

// O Intl usa espaço não separável entre "R$" e o número.
const normalizar = (texto: string) => texto.replace(/\s/g, " ");

describe("formatação de preços", () => {
  it("formata centavos em reais", () => {
    expect(normalizar(formatarPreco(12990))).toBe("R$ 129,90");
  });

  it("esconde os centavos só quando o valor é redondo", () => {
    expect(normalizar(formatarPrecoRedondo(149000))).toBe("R$ 1.490");
    expect(normalizar(formatarPrecoRedondo(8990))).toBe("R$ 89,90");
  });

  it("separa reais e centavos para os preços em destaque", () => {
    expect(partesDoPreco(149000)).toEqual(["1.490", "00"]);
    expect(partesDoPreco(499)).toEqual(["4", "99"]);
  });

  it("parcela sem deixar a parcela abaixo do mínimo", () => {
    expect(parcelar(7990, 3, 2000)).toEqual({ vezes: 3, valor: 2663 });
    expect(parcelar(5990, 3, 2500)).toEqual({ vezes: 2, valor: 2995 });
    expect(parcelar(3990, 3, 2500)).toBeNull();
  });
});

describe("contato no rodapé", () => {
  it("formata celular e fixo com DDD, com ou sem o código do país", () => {
    expect(formatarTelefone("5511999998888")).toBe("(11) 99999-8888");
    expect(formatarTelefone("1133334444")).toBe("(11) 3333-4444");
    expect(formatarTelefone("123")).toBe("123");
  });

  it("tira acentos, espaços e símbolos do nome", () => {
    expect(apelidoDoNome("Academia Pulso")).toBe("academiapulso");
    expect(apelidoDoNome("Casa do Algodão & Cia.")).toBe("casadoalgodaocia");
  });
});
