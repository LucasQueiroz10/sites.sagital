import { describe, expect, it } from "vitest";
import {
  corrente,
  distancia,
  geometria,
  interpolar,
  type Pose,
  ponta,
} from "./mao";

const aberta: Pose = {
  dedos: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  polegar: { giro: 0, dobras: [0, 0, 0] },
};

const fechada: Pose = {
  dedos: [
    [90, 90, 0],
    [90, 90, 0],
    [90, 90, 0],
    [90, 90, 0],
  ],
  polegar: { giro: 60, dobras: [0, 0, 0] },
};

describe("corrente", () => {
  it("esticada, sobe a soma dos comprimentos", () => {
    const s = corrente({ x: 0, y: 100 }, [30, 20, 10], [0, 0, 0], 10);
    expect(ponta(s).x).toBeCloseTo(0);
    expect(ponta(s).y).toBeCloseTo(40);
  });

  it("dobrada a 90°, a falange vira um ponto visto de frente", () => {
    const [primeira] = corrente({ x: 0, y: 0 }, [30], [90], 10);
    expect(primeira && distancia(primeira.de, primeira.ate)).toBeCloseTo(0);
    expect(primeira?.frente).toBeCloseTo(1);
  });

  it("passando de 90°, a falange desce sobre a palma", () => {
    const s = corrente({ x: 0, y: 100 }, [30, 20], [90, 90], 10);
    expect(ponta(s).y).toBeCloseTo(120);
  });

  it("o giro aponta a corrente no plano do desenho", () => {
    const s = corrente({ x: 0, y: 0 }, [10], [0], 10, 90);
    expect(ponta(s).x).toBeCloseTo(10);
    expect(ponta(s).y).toBeCloseTo(0);
  });

  it("cada falange afina um pouco até a ponta", () => {
    const s = corrente({ x: 0, y: 0 }, [10, 10, 10], [0, 0, 0], 30);
    const larguras = s.map((f) => f.largura);
    expect(larguras[0]).toBe(30);
    expect(larguras[1]).toBeCloseTo(27.9);
    expect(larguras[2]).toBeCloseTo(25.8);
  });
});

describe("geometria", () => {
  it("devolve quatro dedos e o polegar, com três falanges cada", () => {
    const g = geometria(aberta);
    expect(g).toHaveLength(5);
    for (const dedo of g) expect(dedo).toHaveLength(3);
  });
});

describe("interpolar", () => {
  it("nas pontas, devolve as próprias poses", () => {
    expect(interpolar(aberta, fechada, 0)).toEqual(aberta);
    expect(interpolar(aberta, fechada, 1)).toEqual(fechada);
  });

  it("no meio, cada ângulo fica na metade", () => {
    const meio = interpolar(aberta, fechada, 0.5);
    expect(meio.dedos[0]).toEqual([45, 45, 0]);
    expect(meio.polegar.giro).toBe(30);
  });
});
