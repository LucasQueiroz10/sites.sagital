"use client";

import { diaMes, semanaDe } from "@/lib/agenda";
import { useAgora } from "@/lib/useAgora";

/** "Válidas de 19/10 a 25/10", sempre a semana corrente do aparelho. */
export function ValidadeDaSemana({ className }: { className?: string }) {
  const agora = useAgora("minuto");
  const semana = agora ? semanaDe(agora) : null;
  return (
    <p className={className}>
      {semana
        ? `Válidas de ${diaMes(semana.inicio)} a ${diaMes(semana.fim)}`
        : "Válidas nesta semana"}{" "}
      ou enquanto durarem os estoques
    </p>
  );
}
