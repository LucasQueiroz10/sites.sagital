import type { ReactNode } from "react";
import { classes } from "@/lib/classes";

type PropsDoCard = {
  /** Elemento HTML: "article" para itens independentes, "li" dentro de listas. */
  como?: "div" | "article" | "li";
  className?: string;
  children: ReactNode;
};

export function Card({
  como: Elemento = "div",
  className,
  children,
}: PropsDoCard) {
  return (
    <Elemento
      className={classes(
        "rounded-tema border border-borda bg-superficie p-5",
        className,
      )}
    >
      {children}
    </Elemento>
  );
}
