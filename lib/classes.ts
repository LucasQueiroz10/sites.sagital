/** Junta classes CSS ignorando valores vazios. */
export function classes(...lista: Array<string | false | null | undefined>) {
  return lista.filter(Boolean).join(" ");
}
