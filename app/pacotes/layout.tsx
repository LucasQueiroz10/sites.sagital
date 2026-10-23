import type { Metadata, Viewport } from "next";
import { PaginaClara } from "@/components/sagital/PaginaClara";
import "../sagital.css";

export const metadata: Metadata = {
  // Só a página inicial é indexável (PRODUCT.md).
  robots: { index: false, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

/** As páginas dos pacotes: a comparação e a de cada um. */
export default function LayoutDosPacotes({
  children,
}: LayoutProps<"/pacotes">) {
  return <PaginaClara voltarPara="/#pacotes">{children}</PaginaClara>;
}
