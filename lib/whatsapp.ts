/**
 * Links wa.me para os botões de contato. O número vem da configuração
 * (variável de ambiente), nunca da URL da página.
 */

const PADRAO_NUMERO = /^\d{10,15}$/;

/** Mantém só os dígitos e aceita de 10 a 15 (código do país + DDD + número). */
export function normalizarNumero(
  valor: string | null | undefined,
): string | null {
  const digitos = (valor ?? "").replace(/\D/g, "");
  return PADRAO_NUMERO.test(digitos) ? digitos : null;
}

/**
 * Número que recebe todos os contatos, inclusive os dos demos.
 * Não é segredo: ele aparece em todos os links do site.
 */
export const NUMERO_WHATSAPP = normalizarNumero(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMERO,
);

/**
 * Monta o link com a mensagem já escrita. Sem número configurado, o WhatsApp
 * abre a tela de escolher contato com a mesma mensagem.
 */
export function montarLinkWhatsApp(
  mensagem: string,
  numero: string | null = NUMERO_WHATSAPP,
): string {
  const texto = encodeURIComponent(mensagem);
  return numero
    ? `https://wa.me/${numero}?text=${texto}`
    : `https://wa.me/?text=${texto}`;
}

/**
 * Mensagem dos botões dos demos: o pedido do cliente fictício e uma linha
 * que diz de qual demo veio o contato.
 */
export function mensagemDoDemo(
  pedido: string,
  nomeDoEstabelecimento: string,
  rotuloDoNicho: string,
): string {
  return (
    `Olá, ${nomeDoEstabelecimento}! ${pedido}\n\n` +
    `(Enviado pelo site demonstrativo de ${rotuloDoNicho.toLowerCase()} da Sagital.)`
  );
}

/**
 * Mensagem dos sites conceituais do portfólio: o pedido de quem visita e uma
 * linha que diz de qual site veio o contato.
 */
export function mensagemDoPortfolio(
  pedido: string,
  nomeDoSite: string,
): string {
  return (
    `Olá, ${nomeDoSite}! ${pedido}\n\n` +
    `(Enviado pelo site conceitual de ${nomeDoSite} no portfólio da Sagital.)`
  );
}

/** Link de WhatsApp de um site do portfólio, com a mensagem já escrita. */
export function linkDoPortfolio(pedido: string, nomeDoSite: string): string {
  return montarLinkWhatsApp(mensagemDoPortfolio(pedido, nomeDoSite));
}
