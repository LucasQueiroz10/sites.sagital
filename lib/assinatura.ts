/**
 * Preços da Redoma (site premium fictício): cobrança por pessoa da equipe,
 * mais barata no ciclo anual. Os textos dos planos estão em data/redoma.ts.
 */

export type IdDoPlano = "inicio" | "equipe" | "empresa";
export type Ciclo = "mensal" | "anual";

export const PRECOS: Record<
  IdDoPlano,
  {
    /** Reais por pessoa, por mês, em cada ciclo. */
    porPessoa: Record<Ciclo, number>;
    /** Pessoas cobradas mesmo que a equipe seja menor. */
    minimo: number;
    /** Acima disso o plano não atende. */
    maximo: number;
  }
> = {
  inicio: { porPessoa: { mensal: 0, anual: 0 }, minimo: 1, maximo: 3 },
  equipe: { porPessoa: { mensal: 24, anual: 19 }, minimo: 1, maximo: 150 },
  empresa: {
    porPessoa: { mensal: 42, anual: 34 },
    minimo: 10,
    maximo: Infinity,
  },
};

export const MENOR_EQUIPE = 1;
export const MAIOR_EQUIPE = 250;

export type Orcamento =
  | { cabe: false; motivo: "grande-demais"; maximo: number }
  | {
      cabe: true;
      /** Pessoas que entram na conta (o mínimo do plano, se a equipe for menor). */
      cobradas: number;
      porMes: number;
      /** O que o ano custa no ciclo escolhido. */
      porAno: number;
      /** Quanto o ciclo anual economiza em relação ao mensal, no ano. */
      economiaNoAnual: number;
    };

export function orcar(
  plano: IdDoPlano,
  pessoas: number,
  ciclo: Ciclo,
): Orcamento {
  const { porPessoa, minimo, maximo } = PRECOS[plano];
  const equipe = Math.max(MENOR_EQUIPE, Math.round(pessoas));
  if (equipe > maximo) return { cabe: false, motivo: "grande-demais", maximo };
  const cobradas = Math.max(equipe, minimo);
  const porMes = cobradas * porPessoa[ciclo];
  return {
    cabe: true,
    cobradas,
    porMes,
    porAno: porMes * 12,
    economiaNoAnual: cobradas * (porPessoa.mensal - porPessoa.anual) * 12,
  };
}

/** O plano que a página sugere para o tamanho da equipe. */
export function planoSugerido(pessoas: number): IdDoPlano {
  if (pessoas <= PRECOS.inicio.maximo) return "inicio";
  if (pessoas < 40) return "equipe";
  return "empresa";
}
