/**
 * Simulador de enquadramento do site de contabilidade: a partir do
 * faturamento anual e da atividade, indica o regime mais provável e uma
 * estimativa do imposto no Simples Nacional. Funções puras e ilustrativas:
 * o resultado é uma orientação inicial, não um cálculo fiscal.
 *
 * Tabelas da Lei Complementar 123/2006 (Anexos I, II e III), com o limite do
 * MEI de R$ 81 mil por ano. Valores em reais.
 */

export type Atividade = "comercio" | "industria" | "servicos";

export const LIMITE_MEI = 81_000;
export const LIMITE_SIMPLES = 4_800_000;

type Faixa = { ate: number; aliquota: number; deduzir: number };

/** Faixas de receita bruta em 12 meses de cada anexo. */
export const ANEXOS: Record<Atividade, Faixa[]> = {
  comercio: [
    { ate: 180_000, aliquota: 0.04, deduzir: 0 },
    { ate: 360_000, aliquota: 0.073, deduzir: 5_940 },
    { ate: 720_000, aliquota: 0.095, deduzir: 13_860 },
    { ate: 1_800_000, aliquota: 0.107, deduzir: 22_500 },
    { ate: 3_600_000, aliquota: 0.143, deduzir: 87_300 },
    { ate: 4_800_000, aliquota: 0.19, deduzir: 378_000 },
  ],
  industria: [
    { ate: 180_000, aliquota: 0.045, deduzir: 0 },
    { ate: 360_000, aliquota: 0.078, deduzir: 5_940 },
    { ate: 720_000, aliquota: 0.1, deduzir: 13_860 },
    { ate: 1_800_000, aliquota: 0.112, deduzir: 22_500 },
    { ate: 3_600_000, aliquota: 0.147, deduzir: 85_500 },
    { ate: 4_800_000, aliquota: 0.3, deduzir: 720_000 },
  ],
  servicos: [
    { ate: 180_000, aliquota: 0.06, deduzir: 0 },
    { ate: 360_000, aliquota: 0.112, deduzir: 9_360 },
    { ate: 720_000, aliquota: 0.135, deduzir: 17_640 },
    { ate: 1_800_000, aliquota: 0.16, deduzir: 35_640 },
    { ate: 3_600_000, aliquota: 0.21, deduzir: 125_640 },
    { ate: 4_800_000, aliquota: 0.33, deduzir: 648_000 },
  ],
};

/**
 * Alíquota efetiva do Simples: (receita × alíquota nominal − parcela a
 * deduzir) ÷ receita, na faixa em que a receita anual cai.
 */
export function aliquotaEfetiva(
  receitaAnual: number,
  atividade: Atividade,
): number {
  const faixas = ANEXOS[atividade];
  const faixa = faixas.find((f) => receitaAnual <= f.ate) ?? faixas.at(-1);
  if (!faixa) return 0;
  if (receitaAnual <= 0) return faixa.aliquota;
  return (receitaAnual * faixa.aliquota - faixa.deduzir) / receitaAnual;
}

export type Enquadramento = {
  regime: "MEI" | "Simples Nacional" | "Lucro Presumido ou Real";
  /** Imposto estimado por mês, em reais; null quando não se estima aqui. */
  impostoMensal: number | null;
  /** Alíquota efetiva usada na estimativa, de 0 a 1. */
  aliquota: number | null;
  observacao: string;
};

/**
 * O regime mais provável para o faturamento e a atividade. No MEI, o
 * imposto é o valor fixo mensal informado (DAS do MEI do ano).
 */
export function enquadrar(
  receitaAnual: number,
  atividade: Atividade,
  dasMei: number,
): Enquadramento {
  if (receitaAnual <= LIMITE_MEI) {
    return {
      regime: "MEI",
      impostoMensal: dasMei,
      aliquota: null,
      observacao:
        "Valor fixo por mês, se a atividade for permitida ao MEI e houver no máximo um empregado.",
    };
  }
  if (receitaAnual <= LIMITE_SIMPLES) {
    const aliquota = aliquotaEfetiva(receitaAnual, atividade);
    return {
      regime: "Simples Nacional",
      impostoMensal: (receitaAnual * aliquota) / 12,
      aliquota,
      observacao:
        atividade === "servicos"
          ? "Estimativa pelo Anexo III. Alguns serviços caem em outros anexos, conforme a folha de pagamento."
          : "Estimativa pela tabela do Simples, sobre o faturamento médio do mês.",
    };
  }
  return {
    regime: "Lucro Presumido ou Real",
    impostoMensal: null,
    aliquota: null,
    observacao:
      "Acima de R$ 4,8 milhões por ano, a escolha entre presumido e real depende da margem e da folha. Vale uma conversa.",
  };
}
