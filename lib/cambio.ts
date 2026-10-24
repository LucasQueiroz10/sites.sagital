/**
 * Contas do simulador de câmbio da Paralelo (site premium fictício). As
 * cotações e tarifas são de exemplo e ficam fixas: o site é conceitual e não
 * consulta mercado nenhum.
 */

export type Moeda = "USD" | "EUR" | "GBP" | "USDC";
export type Sentido = "receber" | "enviar";

/** Reais por unidade, cotação comercial de exemplo. */
export const COTACOES: Record<Moeda, number> = {
  USD: 5.418,
  EUR: 5.873,
  GBP: 6.912,
  USDC: 5.415,
};

/** IOF do câmbio para pagar fornecedores lá fora. Receber exportação é isento. */
export const IOF_ENVIO = 0.0038;

/** O banco tradicional da comparação: spread sobre a cotação e tarifa fixa. */
export const SPREAD_DO_BANCO = 0.04;
export const TARIFA_FIXA_DO_BANCO = 120;

export type Simulacao = {
  /** Valor na moeda estrangeira convertido pela cotação comercial. */
  convertido: number;
  tarifa: number;
  iof: number;
  /** Receber: o que cai na conta. Enviar: o que sai da conta. */
  total: number;
  /** O mesmo resultado num banco tradicional. */
  noBanco: number;
  /** Quanto a Paralelo deixa a mais (receber) ou a menos (enviar), em reais. */
  economia: number;
};

const centavos = (valor: number) => Math.round(valor * 100) / 100;

/**
 * `valor` está sempre na moeda estrangeira: o que o cliente lá fora paga
 * (receber) ou o que o fornecedor lá fora recebe (enviar).
 */
export function simular(
  valor: number,
  moeda: Moeda,
  sentido: Sentido,
  tarifaPercentual: number,
): Simulacao {
  const convertido = Math.max(0, valor) * COTACOES[moeda];
  const tarifa = convertido * tarifaPercentual;

  if (sentido === "receber") {
    const total = convertido - tarifa;
    const noBanco = Math.max(
      0,
      convertido * (1 - SPREAD_DO_BANCO) - TARIFA_FIXA_DO_BANCO,
    );
    return {
      convertido: centavos(convertido),
      tarifa: centavos(tarifa),
      iof: 0,
      total: centavos(total),
      noBanco: centavos(noBanco),
      economia: centavos(Math.max(0, total - noBanco)),
    };
  }

  const iof = convertido * IOF_ENVIO;
  const total = convertido + tarifa + iof;
  const noBanco =
    convertido > 0
      ? convertido * (1 + SPREAD_DO_BANCO) + TARIFA_FIXA_DO_BANCO + iof
      : 0;
  return {
    convertido: centavos(convertido),
    tarifa: centavos(tarifa),
    iof: centavos(iof),
    total: centavos(total),
    noBanco: centavos(noBanco),
    economia: centavos(Math.max(0, noBanco - total)),
  };
}

/** "R$ 1.234,56". */
export function formatarReais(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** Lê o que a pessoa digitou ("1.500,50", "1500.5", "2 000") como número. */
export function lerValor(texto: string): number {
  const limpo = texto.replace(/[^\d,.]/g, "");
  if (!limpo) return 0;
  // Com vírgula, ela é o decimal e os pontos são milhar (jeito brasileiro).
  const normalizado = limpo.includes(",")
    ? limpo.replace(/\./g, "").replace(",", ".")
    : /^\d{1,3}(\.\d{3})+$/.test(limpo)
      ? limpo.replace(/\./g, "")
      : limpo;
  const numero = Number.parseFloat(normalizado);
  return Number.isFinite(numero) ? numero : 0;
}
