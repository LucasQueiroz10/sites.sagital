import { describe, expect, it } from "vitest";
import {
  avaliarSenha,
  formatarTempo,
  gerarSenha,
  tamanhoDoAlfabeto,
} from "./senha";

describe("tamanhoDoAlfabeto", () => {
  it("soma os tipos de caractere presentes", () => {
    expect(tamanhoDoAlfabeto("abc")).toBe(26);
    expect(tamanhoDoAlfabeto("aB3")).toBe(62);
    expect(tamanhoDoAlfabeto("aB3!")).toBe(95);
    expect(tamanhoDoAlfabeto("ação")).toBe(126);
  });
});

describe("avaliarSenha", () => {
  it("vazia não tem avaliação", () => {
    expect(avaliarSenha("")).toBeNull();
  });

  it("senhas famosas caem na hora", () => {
    for (const s of ["123456", "senha123", "Flamengo2024", "qwerty", "S3nh@"]) {
      const r = avaliarSenha(s)!;
      expect(r.nivel, s).toBe(0);
      expect(r.segundos, s).toBeLessThan(60);
    }
  });

  it("reconhece a palavra mesmo com números no lugar das letras", () => {
    const r = avaliarSenha("p4ssw0rd")!;
    expect(r.avisos).toContain("palavra");
    expect(r.nivel).toBe(0);
  });

  it("aponta sequência, repetição e ano", () => {
    expect(avaliarSenha("xkcdabcdefg")!.avisos).toContain("sequencia");
    expect(avaliarSenha("zzzzzzzk")!.avisos).toContain("repeticao");
    expect(avaliarSenha("Kq!x1987")!.avisos).toContain("ano");
  });

  it("uma senha longa e aleatória passa de muito forte", () => {
    const r = avaliarSenha("u7#Kp!2vQz9&Lm4w")!;
    expect(r.nivel).toBe(4);
    expect(r.avisos).toEqual([]);
  });

  it("mais caracteres aleatórios sempre aumentam a força", () => {
    const curta = avaliarSenha("Kq!x")!;
    const longa = avaliarSenha("Kq!xR8")!;
    expect(longa.bits).toBeGreaterThan(curta.bits);
  });
});

describe("formatarTempo", () => {
  it("escolhe a unidade e o plural", () => {
    expect(formatarTempo(0.2)).toBe("menos de um segundo");
    expect(formatarTempo(1)).toBe("1 segundo");
    expect(formatarTempo(90)).toBe("2 minutos");
    expect(formatarTempo(3 * 3600)).toBe("3 horas");
    expect(formatarTempo(45 * 86400)).toBe("2 meses");
    expect(formatarTempo(365 * 86400)).toBe("1 ano");
    expect(formatarTempo(1500 * 365 * 86400)).toBe("2 mil anos");
    expect(formatarTempo(1000 * 365 * 86400)).toBe("mil anos");
    expect(formatarTempo(3e6 * 365 * 86400)).toBe("3 milhões de anos");
    expect(formatarTempo(1e12 * 365 * 86400)).toBe("bilhões de anos");
  });
});

describe("gerarSenha", () => {
  it("tem o tamanho pedido e todos os tipos de caractere", () => {
    for (let i = 0; i < 50; i++) {
      const s = gerarSenha(18);
      expect(s).toHaveLength(18);
      expect(s).toMatch(/[a-z]/);
      expect(s).toMatch(/[A-Z]/);
      expect(s).toMatch(/[2-9]/);
      expect(s).toMatch(/[!@#$%&*?\-_+=]/);
      expect(s).not.toMatch(/[01lIoO]/);
    }
  });

  it("o próprio medidor a considera muito forte", () => {
    expect(avaliarSenha(gerarSenha())!.nivel).toBe(4);
  });
});
