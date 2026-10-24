import { validarCor, validarNome } from "./tema";

/** Rotas dos demos. Um nicho novo entra aqui e em data/. */
export const NICHOS = [
  "academia",
  "varejo",
  "restaurante",
  "tabacaria",
] as const;
export type Nicho = (typeof NICHOS)[number];

export function ehNicho(valor: string): valor is Nicho {
  return (NICHOS as readonly string[]).includes(valor);
}

/**
 * Link personalizado de um demo. Só entram na URL os valores que passam na
 * mesma validação que o demo faz ao abrir; o resto fica de fora e o demo usa
 * o padrão do nicho.
 */
export function montarLinkDoDemo(
  origem: string,
  nicho: Nicho,
  nome: string,
  cor: string,
): string {
  const url = new URL(`/${nicho}`, origem);
  const nomeValido = validarNome(nome);
  const corValida = validarCor(cor.replace(/^#/, ""));
  if (nomeValido) url.searchParams.set("nome", nomeValido);
  if (corValida) url.searchParams.set("cor", corValida.slice(1));
  return url.toString();
}

/** Nome de arquivo para o QR baixado: "qr-academia-iron-gym.png". */
export function nomeDoArquivoQr(nicho: Nicho, nome: string): string {
  const base = (validarNome(nome) ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `qr-${nicho}${base ? `-${base}` : ""}.png`;
}

/**
 * A personalização da URL (`?nome=&cor=`) como texto de busca, só com os
 * valores válidos, para os links entre as páginas de um demo levarem o
 * mesmo nome e a mesma cor. Vazio quando não há nada a levar.
 */
export function buscaDoDemo(
  nome: string | null | undefined,
  cor: string | null | undefined,
): string {
  const parametros = new URLSearchParams();
  const nomeValido = validarNome(nome);
  const corValida = validarCor(cor?.replace(/^#/, ""));
  if (nomeValido) parametros.set("nome", nomeValido);
  if (corValida) parametros.set("cor", corValida.slice(1));
  const texto = parametros.toString();
  return texto ? `?${texto}` : "";
}

/** Põe a busca no link, antes da âncora: "/academia/planos?nome=X#faq". */
export function comBusca(href: string, busca: string): string {
  if (!busca || !href.startsWith("/")) return href;
  const [caminho = "", ancora] = href.split("#");
  return `${caminho}${busca}${ancora === undefined ? "" : `#${ancora}`}`;
}
