import Link from "next/link";
import { classes } from "@/lib/classes";

/** Marca da Sagital: o plano sagital (a linha que divide) com a ponta de flecha. */
export function MarcaSagital({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={classes(
        "inline-flex min-h-11 items-center gap-2 text-xl font-bold tracking-tight",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque",
        className,
      )}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-7 text-primaria">
        <circle
          cx="12"
          cy="13"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M12 23V3M7.5 7.5 12 3l4.5 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Sagital
    </Link>
  );
}
