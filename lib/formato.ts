const reais = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Centavos em "R$ 129,90". */
export function formatarPreco(centavos: number): string {
  return reais.format(centavos / 100);
}

/** Separa reais e centavos para preços em destaque: ["129", "90"]. */
export function partesDoPreco(centavos: number): [string, string] {
  const inteiro = Math.floor(centavos / 100).toLocaleString("pt-BR");
  return [inteiro, String(centavos % 100).padStart(2, "0")];
}
