import type { ReactNode } from "react";
import { classes } from "@/lib/classes";

type Largura = "estreita" | "normal" | "larga";

const larguras: Record<Largura, string> = {
  estreita: "max-w-3xl",
  normal: "max-w-6xl",
  larga: "max-w-7xl",
};

type PropsDoContainer = {
  largura?: Largura;
  className?: string;
  children: ReactNode;
};

/** Centraliza o conteúdo com margem lateral de 16px no celular. */
export function Container({
  largura = "normal",
  className,
  children,
}: PropsDoContainer) {
  return (
    <div
      className={classes(
        "mx-auto w-full px-4 sm:px-6",
        larguras[largura],
        className,
      )}
    >
      {children}
    </div>
  );
}
