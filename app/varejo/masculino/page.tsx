import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaDoSetor } from "@/components/nichos/varejo/PaginaDoSetor";
import { varejo as dados } from "@/data/varejo";

const setor = dados.setores.find((s) => s.id === "masculino");

export const metadata: Metadata = {
  title: { absolute: `Masculino | ${dados.padrao.nome}` },
  description: setor?.chamada,
};

/** Todas as peças do masculino, com filtro de tamanho, promoção e ordem. */
export default function PaginaMasculino() {
  if (!setor) notFound();
  return <PaginaDoSetor setor={setor} />;
}
