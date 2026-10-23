import Link from "next/link";

/** A linha de rodapé de todo site do portfólio: deixa claro que é fictício. */
export function AssinaturaDoPortfolio({ className }: { className?: string }) {
  return (
    <p className={className}>
      Site conceitual com empresa e conteúdo fictícios, feito pela{" "}
      <Link href="/trabalhos" className="underline underline-offset-4">
        Sagital
      </Link>
      .
    </p>
  );
}
