import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaDoSetor } from "@/components/nichos/varejo/PaginaDoSetor";
import { varejo as dados } from "@/data/varejo";

const setor = dados.setores.find((s) => s.id === "feminino");

export const metadata: Metadata = {
  title: { absolute: `Feminino | ${dados.padrao.nome}` },
  description: setor?.chamada,
};

/** Todas as peças do feminino, com filtro de tamanho, promoção e ordem. */
export default function PaginaFeminino() {
  if (!setor) notFound();
  return <PaginaDoSetor setor={setor} />;
}
