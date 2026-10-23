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

/** Como formatarPreco, mas sem ",00" quando o valor é redondo: "R$ 1.490". */
export function formatarPrecoRedondo(centavos: number): string {
  if (centavos % 100 !== 0) return formatarPreco(centavos);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(centavos / 100);
}

/**
 * Parcelamento sem juros de uma peça: o maior número de parcelas, até
 * `vezes`, em que cada uma não fica abaixo de `parcelaMinima`. Abaixo de duas
 * parcelas, a peça é só à vista e a função devolve `null`.
 */
export function parcelar(
  centavos: number,
  vezes: number,
  parcelaMinima: number,
): { vezes: number; valor: number } | null {
  const possiveis = Math.min(vezes, Math.floor(centavos / parcelaMinima));
  if (possiveis < 2) return null;
  return { vezes: possiveis, valor: Math.round(centavos / possiveis) };
}

/** Dígitos com código do país em "(11) 99999-9999"; sem DDD reconhecível, devolve como veio. */
export function formatarTelefone(digitos: string): string {
  const nacional = digitos.startsWith("55") ? digitos.slice(2) : digitos;
  const partes = /^(\d{2})(\d{4,5})(\d{4})$/.exec(nacional);
  return partes ? `(${partes[1]}) ${partes[2]}-${partes[3]}` : digitos;
}

/** "Academia Pulso" em "academiapulso": usuário de rede social e domínio de e-mail. */
export function apelidoDoNome(nome: string): string {
  return nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}
