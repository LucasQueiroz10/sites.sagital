import { describe, expect, it } from "vitest";
import {
  buscaDoDemo,
  comBusca,
  ehNicho,
  montarLinkDoDemo,
  nomeDoArquivoQr,
} from "./link";

const origem = "https://sagital.example";

describe("montarLinkDoDemo", () => {
  it("monta o link com nome e cor válidos", () => {
    expect(montarLinkDoDemo(origem, "academia", "Iron Gym", "#FF6600")).toBe(
      "https://sagital.example/academia?nome=Iron+Gym&cor=ff6600",
    );
  });

  it("codifica acentos e o &", () => {
    const link = new URL(
      montarLinkDoDemo(origem, "restaurante", "Zé & Cia", "8a1c3c"),
    );
    expect(link.searchParams.get("nome")).toBe("Zé & Cia");
    expect([...link.searchParams.keys()]).toEqual(["nome", "cor"]);
  });

  it("deixa de fora valores inválidos", () => {
    expect(montarLinkDoDemo(origem, "varejo", "<b>oi</b>", "vermelho")).toBe(
      "https://sagital.example/varejo",
    );
    expect(montarLinkDoDemo(origem, "varejo", "", "00aa00")).toBe(
      "https://sagital.example/varejo?cor=00aa00",
    );
  });
});

describe("nicho e arquivo do QR", () => {
  it("reconhece só os nichos existentes", () => {
    expect(ehNicho("tabacaria")).toBe(true);
    expect(ehNicho("barbearia")).toBe(false);
  });

  it("gera um nome de arquivo sem acentos nem espaços", () => {
    expect(nomeDoArquivoQr("academia", "Força Total Gym")).toBe(
      "qr-academia-forca-total-gym.png",
    );
    expect(nomeDoArquivoQr("varejo", "")).toBe("qr-varejo.png");
  });
});

describe("buscaDoDemo", () => {
  it("leva só nome e cor válidos", () => {
    expect(buscaDoDemo("Iron Gym", "FF6600")).toBe("?nome=Iron+Gym&cor=ff6600");
    expect(buscaDoDemo("<b>", "azul")).toBe("");
    expect(buscaDoDemo(null, "00aa00")).toBe("?cor=00aa00");
  });
});

describe("comBusca", () => {
  it("põe a busca antes da âncora", () => {
    expect(comBusca("/academia/planos", "?cor=ff6600")).toBe(
      "/academia/planos?cor=ff6600",
    );
    expect(comBusca("/academia/planos#faq", "?cor=ff6600")).toBe(
      "/academia/planos?cor=ff6600#faq",
    );
  });

  it("não mexe em âncoras da página nem em links de fora", () => {
    expect(comBusca("#planos", "?cor=ff6600")).toBe("#planos");
    expect(comBusca("https://wa.me/1", "?cor=ff6600")).toBe("https://wa.me/1");
    expect(comBusca("/varejo", "")).toBe("/varejo");
  });
});
