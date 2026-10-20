import { describe, expect, it } from "vitest";
import {
  contraste,
  garantirContraste,
  montarTitulo,
  resolverTema,
  textoSobre,
  validarCor,
  validarNome,
  variaveisDoTema,
  type CorHex,
  type PadraoDoTema,
} from "./tema";

describe("validarCor", () => {
  it("aceita 6 dígitos hex e normaliza para minúsculas com #", () => {
    expect(validarCor("FF6600")).toBe("#ff6600");
    expect(validarCor("00aaff")).toBe("#00aaff");
  });

  it.each([
    "#ff6600",
    "ff660",
    "ff66001",
    "gggggg",
    "red",
    " ff6600",
    "ff6600;background:url(x)",
    "",
  ])("rejeita %j", (valor) => {
    expect(validarCor(valor)).toBeNull();
  });

  it("rejeita ausência de valor", () => {
    expect(validarCor(null)).toBeNull();
    expect(validarCor(undefined)).toBeNull();
  });
});

describe("validarNome", () => {
  it.each([
    ["Iron Gym", "Iron Gym"],
    ["  Padaria   São   João  ", "Padaria São João"],
    ["Zé & Cia.", "Zé & Cia."],
    ["D'Ávila", "D'Ávila"],
    ["D’Ávila", "D’Ávila"],
    ["Mercado 24-7", "Mercado 24-7"],
    ["A".repeat(40), "A".repeat(40)],
  ])("aceita %j", (entrada, esperado) => {
    expect(validarNome(entrada)).toBe(esperado);
  });

  it.each([
    "<script>alert(1)</script>",
    "A".repeat(41),
    "   ",
    "",
    'Bar "X"',
    "Loja/Online",
    "http://x.com",
    "...",
    "&&",
    "Bar\u0000X",
    "Café 😀",
  ])("rejeita %j", (valor) => {
    expect(validarNome(valor)).toBeNull();
  });
});

describe("contraste", () => {
  it("preto sobre branco é 21:1 e cor igual é 1:1", () => {
    expect(contraste("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contraste("#777777", "#777777")).toBe(1);
  });

  it("escolhe texto preto no amarelo e branco no azul-marinho", () => {
    expect(textoSobre("#ffff00")).toBe("#000000");
    expect(textoSobre("#1e3a8a")).toBe("#ffffff");
  });

  it("mantém a cor quando ela já tem contraste suficiente", () => {
    expect(garantirContraste("#1e3a8a", "#ffffff")).toBe("#1e3a8a");
  });
});

describe("variaveisDoTema", () => {
  const amostra: CorHex[] = [];
  for (let r = 0; r <= 255; r += 51)
    for (let g = 0; g <= 255; g += 51)
      for (let b = 0; b <= 255; b += 51)
        amostra.push(
          `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`,
        );
  const fundos: CorHex[] = ["#ffffff", "#0b0b0c", "#f7f3ea", "#14100c"];

  it("o texto do botão passa de 4.5:1 com qualquer cor, inclusive no hover", () => {
    for (const cor of amostra) {
      const v = variaveisDoTema(cor, "#ffffff");
      expect(
        contraste(v["--cor-primaria"], v["--cor-primaria-texto"]),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contraste(v["--cor-primaria-hover"], v["--cor-primaria-texto"]),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("o destaque passa de 4.5:1 sobre fundos claros e escuros", () => {
    for (const cor of amostra)
      for (const fundo of fundos)
        expect(
          contraste(variaveisDoTema(cor, fundo)["--cor-destaque"], fundo),
        ).toBeGreaterThanOrEqual(4.5);
  });
});

describe("resolverTema", () => {
  const padrao: PadraoDoTema = {
    nome: "Academia Exemplo",
    cor: "#e11d48",
    fundo: "#0b0b0c",
  };

  it("usa os parâmetros válidos", () => {
    const tema = resolverTema({ nome: "Iron Gym", cor: "ff6600" }, padrao);
    expect(tema.nome).toBe("Iron Gym");
    expect(tema.cor).toBe("#ff6600");
  });

  it("cai no padrão com parâmetros inválidos ou ausentes", () => {
    expect(
      resolverTema({ nome: "<b>x</b>", cor: "zzz" }, padrao),
    ).toMatchObject({
      nome: "Academia Exemplo",
      cor: "#e11d48",
    });
    expect(resolverTema({}, padrao).nome).toBe("Academia Exemplo");
  });

  it("monta o título da aba", () => {
    expect(montarTitulo("Iron Gym", "Academia")).toBe("Iron Gym — Academia");
  });
});
