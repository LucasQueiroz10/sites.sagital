import type { Metadata } from "next";
import "./portfolio.css";

// Os sites do portfólio são conceituais: ficam fora dos buscadores, como os
// demos.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LayoutDoPortfolio({
  children,
}: LayoutProps<"/portfolio">) {
  return children;
}
