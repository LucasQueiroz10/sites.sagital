import { describe, expect, it } from "vitest";
import { ehNicho, montarLinkDoDemo, nomeDoArquivoQr } from "./link";

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
    expect(montarLinkDoDemo(origem, "mercado", "<b>oi</b>", "vermelho")).toBe(
      "https://sagital.example/mercado",
    );
    expect(montarLinkDoDemo(origem, "mercado", "", "00aa00")).toBe(
      "https://sagital.example/mercado?cor=00aa00",
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
    expect(nomeDoArquivoQr("mercado", "")).toBe("qr-mercado.png");
  });
});
