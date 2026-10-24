"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { useTema } from "@/components/TemaDoNicho";
import { comBusca } from "@/lib/link";

/**
 * Link entre as páginas de um demo. Leva junto o nome e a cor da URL
 * (`?nome=&cor=`), para o link personalizado que o vendedor mandou valer
 * em todas as páginas, e não só na primeira.
 */
export function LinkDoDemo({
  href,
  ...resto
}: Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & { href: string }) {
  const { busca } = useTema();
  return <Link {...resto} href={comBusca(href, busca)} />;
}
