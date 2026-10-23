import {
  aplicar,
  girar,
  multiplicar,
  type Bloco,
  type Cena,
  type Material,
} from "@/lib/blocos";

/** Altura de um bloco: é o passo da pilha (os pinos entram no de cima). */
const ALTURA = 1.2;

const suave = (x: number) => {
  const t = Math.min(Math.max(x, 0), 1);
  return t * t * (3 - 2 * t);
};

/**
 * A pilha da abertura: três blocos fumê, o de cima torto, girando devagar.
 * O ponteiro mexe a câmera um pouco; ao rolar para fora da abertura, a pilha
 * se abre.
 */
export function cenaDaAbertura(
  tempo: number,
  ponteiro: { x: number; y: number },
  saida: number,
): Cena {
  const giro = 0.5 + tempo * 0.16;
  const abre = 1 + saida * 0.9;
  const flutua = (fase: number) => Math.sin(tempo * 0.9 + fase) * 0.05;
  return {
    camera: {
      alvo: [0, 0.25, 0],
      distancia: 14.5,
      azimute: 0.55 + ponteiro.x * 0.3,
      elevacao: 0.34 + ponteiro.y * 0.12,
      foco: 2.05,
    },
    blocos: [
      {
        posicao: [0, -1.45 * abre + flutua(0), 0],
        giro: girar(giro),
        material: "fume",
      },
      {
        posicao: [0.1, 0.2 * abre + flutua(1.3), 0],
        giro: girar(giro + 0.18),
        material: "fume",
      },
      {
        posicao: [-0.15, 1.75 * abre + saida * 0.4 + flutua(2.1), 0.1],
        giro: girar(giro - 0.3, 0.28 + saida * 0.35, -0.18),
        material: "fume",
      },
    ],
  };
}

/** Os cinco blocos do processo, de baixo para cima. O do meio é o laranja. */
const MATERIAIS_DO_PROCESSO: Material[] = [
  "fume",
  "fume",
  "laranja",
  "fume",
  "fume",
];

/**
 * A montagem do processo deitada na diagonal, como na foto da referência. Na
 * tela em pé (celular), o eixo fica quase vertical e os blocos se afastam
 * menos, para caber.
 */
const EIXO_DEITADO = girar(0.4, 0, -1.02);
const EIXO_EM_PE = girar(0.5, 0, -0.32);

/**
 * O processo: a pilha começa explodida ao longo do eixo roscado e cada etapa
 * encaixa o seu bloco, conforme a rolagem (`progresso` de 0 a 1).
 */
export function cenaDoProcesso(progresso: number, emPe = false): Cena {
  const n = MATERIAIS_DO_PROCESSO.length;
  const eixo = emPe ? EIXO_EM_PE : EIXO_DEITADO;
  const afastamento = emPe ? 2.5 : 2.95;
  const blocos: Bloco[] = MATERIAIS_DO_PROCESSO.map((material, k) => {
    const encaixe = suave((progresso - k / n) * n * 0.9);
    const montado = (k - (n - 1) / 2) * ALTURA;
    const solto = (k - (n - 1) / 2) * afastamento;
    const y = solto + (montado - solto) * encaixe;
    const torcao = (1 - encaixe) * (k % 2 ? 0.55 : -0.45);
    return {
      posicao: aplicar(eixo, [0, y, 0]),
      giro: multiplicar(eixo, girar(torcao)),
      material,
    };
  });
  const ponta = afastamento * 2 + 1.8;
  return {
    camera: {
      alvo: [0, 0, 0],
      distancia: emPe ? 26 : 23,
      azimute: 0.62,
      elevacao: 0.22,
      foco: 2.0,
    },
    blocos,
    densidade: 0.3,
    eixo: {
      de: aplicar(eixo, [0, -ponta, 0]),
      ate: aplicar(eixo, [0, ponta, 0]),
      raio: 0.11,
    },
  };
}

/**
 * O mix montado pelo visitante: um bloco por serviço, na ordem em que foram
 * escolhidos. `quedas` diz quanto falta para cada um assentar (1 = ainda lá
 * em cima, 0 = na pilha).
 */
export function cenaDoMix(
  materiais: Material[],
  quedas: number[],
  tempo: number,
): Cena {
  const n = Math.max(materiais.length, 1);
  const topo = (n - 1) * ALTURA;
  return {
    camera: {
      alvo: [0, topo / 2, 0],
      distancia: 7.5 + n * 1.45,
      azimute: 0.62 + Math.sin(tempo * 0.25) * 0.12,
      elevacao: 0.42,
      foco: 2.0,
    },
    blocos: materiais.map((material, i) => ({
      posicao: [0, i * ALTURA + (quedas[i] ?? 0) * 3.5, 0],
      giro: girar((i % 2 ? 0.07 : -0.05) + (quedas[i] ?? 0) * 0.8),
      material,
    })),
  };
}

/* ---------- Cenas das imagens paradas ---------- */

/** Três blocos âmbar soltos no ar, para as frases e as dúvidas. */
export function cenaDoTrio(): Cena {
  return {
    camera: {
      alvo: [0.15, 0, 0],
      distancia: 13.5,
      azimute: 0.5,
      elevacao: 0.42,
      foco: 2.1,
    },
    blocos: [
      {
        posicao: [-0.9, 0.95, 0],
        giro: girar(0.3, 0.5, 0.35),
        material: "ambar",
      },
      {
        posicao: [1.35, 0.55, -0.6],
        giro: girar(-0.6, -0.3, 0.6),
        material: "ambar",
      },
      {
        posicao: [-0.2, -1.35, 0.5],
        giro: girar(1.1, 0.9, -0.25),
        material: "ambar",
      },
    ],
  };
}

/**
 * Um campo de blocos âmbar soltos e empilhados, como a foto de produto das
 * referências: a imagem larga da seção de resultados.
 */
export function cenaDoCampo(): Cena {
  const b = (
    x: number,
    y: number,
    z: number,
    guinada: number,
    arfagem = 0,
    rolagem = 0,
  ): Bloco => ({
    posicao: [x, y, z],
    giro: girar(guinada, arfagem, rolagem),
    material: "ambar",
  });
  return {
    camera: {
      alvo: [0, 0.9, 0],
      distancia: 17.5,
      azimute: 0.16,
      elevacao: 0.22,
      foco: 2.3,
    },
    densidade: 0.7,
    blocos: [
      b(-5.6, 0, -0.6, 0.35),
      b(-3.0, 0, 0.7, -0.25),
      b(-3.0, ALTURA, 0.7, -0.25 + Math.PI / 2),
      b(-0.4, 0, -0.5, 0.55),
      b(2.3, 0, 0.6, 0.1),
      b(2.3, ALTURA, 0.6, 0.12),
      b(2.3, ALTURA * 2, 0.6, 0.1 + Math.PI / 2),
      b(5.2, 0, -0.4, -0.4),
    ],
  };
}

/** A pilha grande e escura atrás do nome no fim da página. */
export function cenaDoFechamento(): Cena {
  return {
    camera: {
      alvo: [0, 0.3, 0],
      distancia: 8.6,
      azimute: 0.72,
      elevacao: 0.16,
      foco: 1.75,
    },
    blocos: [
      { posicao: [0, -1.2, 0], giro: girar(0.55), material: "fume" },
      { posicao: [0.05, 0, 0], giro: girar(0.62), material: "fume" },
      { posicao: [-0.05, 1.2, 0], giro: girar(0.5), material: "fume" },
    ],
  };
}
