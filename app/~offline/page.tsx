import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MarcaSagital } from "@/components/sagital/MarcaSagital";
import { Container } from "@/components/ui/Container";
import { lexend } from "../fontes";
import "../sagital.css";

export const metadata: Metadata = {
  title: "Sem conexão",
  robots: { index: false, follow: false },
};

const demos = [
  { rotulo: "Academia", href: "/academia" },
  { rotulo: "Mercado", href: "/mercado" },
  { rotulo: "Restaurante", href: "/restaurante" },
  { rotulo: "Tabacaria", href: "/tabacaria" },
];

/** Aparece quando a página pedida não está no aparelho e não há internet. */
export default function PaginaOffline() {
  return (
    <div
      data-pagina="sagital"
      className={`${lexend.variable} flex flex-1 flex-col bg-fundo font-texto text-texto`}
    >
      <header className="border-b border-borda">
        <Container largura="larga" className="flex min-h-16 items-center">
          <MarcaSagital />
        </Container>
      </header>
      <main className="flex-1 py-14">
        <Container largura="estreita">
          <h1 className="text-[clamp(2rem,8vw,3.25rem)] text-balance">
            Sem internet por aqui.
          </h1>
          <p className="mt-4 text-lg text-texto-suave">
            Esta página ainda não foi guardada neste aparelho. Os demos que já
            foram abertos continuam funcionando, inclusive com nome e cor
            personalizados:
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {demos.map((demo) => (
              <li key={demo.href}>
                <Link
                  href={demo.href}
                  className="placa flex min-h-14 items-center justify-between rounded-tema bg-white px-5 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque"
                >
                  {demo.rotulo}
                  <ArrowRight aria-hidden className="size-5 text-destaque" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-texto-suave">
            Quando o sinal voltar, recarregue a página.
          </p>
        </Container>
      </main>
    </div>
  );
}
