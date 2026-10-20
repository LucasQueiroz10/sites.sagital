import { validarCor, validarNome } from "./tema";

/** Rotas dos demos. Um nicho novo entra aqui e em data/. */
export const NICHOS = [
  "academia",
  "mercado",
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
