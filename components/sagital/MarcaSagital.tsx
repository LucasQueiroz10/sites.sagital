import Link from "next/link";
import { classes } from "@/lib/classes";

/**
 * A Sagital ainda não tem logotipo: o nome vai em texto, como o design
 * system pede, em Plus Jakarta Sans extranegrito e tracking apertado.
 */
export function MarcaSagital({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={classes(
        "inline-flex min-h-11 items-center text-[1.375rem] font-extrabold tracking-[-0.04em]",
        className,
      )}
    >
      Sagital
    </Link>
  );
}
