import type { Metadata, Viewport } from "next";
import { ChevronRight, WifiOff } from "lucide-react";
import Link from "next/link";
import { MarcaSagital } from "@/components/sagital/MarcaSagital";
import { Container } from "@/components/ui/Container";
import { jakarta } from "../fontes";
import "../sagital.css";

export const metadata: Metadata = {
  title: "Sem conexão",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

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
      className={`${jakarta.variable} flex flex-1 flex-col bg-fundo font-texto text-texto`}
    >
      <header>
        <Container largura="larga" className="flex min-h-16 items-center">
          <MarcaSagital className="text-[var(--sg-tinta-forte)]" />
        </Container>
      </header>
      <main className="flex-1 pt-8 pb-14 sm:pt-14">
        <Container largura="estreita" className="max-w-xl">
          <div className="flex flex-col items-center text-center">
            <span
              aria-hidden
              className="grid size-14 place-items-center rounded-full bg-superficie text-texto-suave"
            >
              <WifiOff className="size-6" strokeWidth={1.75} />
            </span>
            <h1 className="mt-4 text-[1.75rem] leading-tight font-bold tracking-[-0.02em]">
              Sem internet por aqui
            </h1>
            <p className="mt-2 text-base text-texto-suave">
              Esta página ainda não foi guardada neste aparelho. Os demos que já
              foram abertos continuam funcionando, inclusive com nome e cor
              personalizados.
            </p>
          </div>
          <ul className="mt-8 overflow-hidden rounded-2xl bg-superficie">
            {demos.map((demo) => (
              <li
                key={demo.href}
                className="border-b border-[var(--sg-pressionado)] last:border-b-0"
              >
                <Link
                  href={demo.href}
                  className="flex min-h-14 items-center justify-between px-4 text-[0.9375rem] font-semibold transition-colors hover:bg-[var(--sg-pressionado)]"
                >
                  Demo de {demo.rotulo.toLowerCase()}
                  <ChevronRight
                    aria-hidden
                    className="size-5 text-[var(--sg-terciario)]"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-texto-suave">
            Quando o sinal voltar, recarregue a página.
          </p>
        </Container>
      </main>
    </div>
  );
}
