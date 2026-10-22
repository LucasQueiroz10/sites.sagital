import { describe, expect, it } from "vitest";
import {
  mensagemDoDemo,
  mensagemDoPortfolio,
  montarLinkWhatsApp,
  normalizarNumero,
} from "./whatsapp";

describe("normalizarNumero", () => {
  it("mantém só os dígitos", () => {
    expect(normalizarNumero("+55 (11) 99999-0000")).toBe("5511999990000");
  });

  it.each(["", "123", "1".repeat(16), "abc", null, undefined])(
    "rejeita %j",
    (valor) => {
      expect(normalizarNumero(valor)).toBeNull();
    },
  );
});

describe("montarLinkWhatsApp", () => {
  it("codifica a mensagem com encodeURIComponent", () => {
    expect(montarLinkWhatsApp("Olá & até já?", "5511999990000")).toBe(
      "https://wa.me/5511999990000?text=Ol%C3%A1%20%26%20at%C3%A9%20j%C3%A1%3F",
    );
  });

  it("não deixa a mensagem injetar parâmetros na URL", () => {
    const link = new URL(montarLinkWhatsApp("oi&phone=000#x", "5511999990000"));
    expect(link.searchParams.get("text")).toBe("oi&phone=000#x");
    expect([...link.searchParams.keys()]).toEqual(["text"]);
  });

  it("sem número, abre a escolha de contato", () => {
    expect(montarLinkWhatsApp("oi", null)).toBe("https://wa.me/?text=oi");
  });
});

describe("mensagemDoDemo", () => {
  it("inclui o nome do estabelecimento e de qual demo veio", () => {
    const mensagem = mensagemDoDemo(
      "Quero agendar uma aula experimental.",
      "Iron Gym",
      "Academia",
    );
    expect(mensagem).toContain("Olá, Iron Gym! Quero agendar");
    expect(mensagem).toContain("demonstrativo de academia da Sagital");
  });
});

describe("mensagemDoPortfolio", () => {
  it("cumprimenta o site e diz que veio do portfólio", () => {
    const mensagem = mensagemDoPortfolio(
      "Quero agendar uma conversa.",
      "Duarte Moreira Advogados",
    );
    expect(mensagem.startsWith("Olá, Duarte Moreira Advogados! Quero")).toBe(
      true,
    );
    expect(mensagem).toContain("portfólio da Sagital");
  });
});
