"use client";

import { CalendarCheck, Plus, X } from "lucide-react";
import Link from "next/link";
import { nome, paginas, raiz } from "@/data/destra";
import { useMenuDaBarra } from "../useMenuDaBarra";
import { Logo } from "./Logo";

/**
 * A barra das páginas internas: as pílulas da abertura (marca, "Menu" preto
 * com o círculo branco e a pílula cinza da direita). No desktop, as páginas
 * ficam à vista numa pílula cinza, com a atual em preto.
 */
export function BarraInterna() {
  const { aberto, alternar, botao, caminho, painel } = useMenuDaBarra();

  return (
    <header className="dt-barra dt-barra-interna" data-rolou>
      <nav aria-label="Principal" className="dt-barra-linha">
        <div className="dt-barra-lado">
          <Link href={raiz} className="dt-logo">
            <Logo className="size-6 md:size-7" />
            <span className="dt-logo-nome">{nome}</span>
            <span className="sr-only md:hidden">{nome}, início</span>
          </Link>

          <div className="relative lg:hidden">
            <button
              ref={botao}
              type="button"
              className="dt-menu-botao"
              aria-expanded={aberto}
              aria-controls="dt-menu-interno"
              onClick={(e) => {
                e.stopPropagation();
                alternar();
              }}
            >
              <span className="dt-menu-circulo" aria-hidden>
                {aberto ? (
                  <X size={12} strokeWidth={3} />
                ) : (
                  <Plus size={12} strokeWidth={3} />
                )}
              </span>
              Menu
            </button>
            <div
              ref={painel}
              id="dt-menu-interno"
              hidden={!aberto}
              className="dt-menu"
            >
              <ul>
                <li>
                  <Link href={raiz}>Início</Link>
                </li>
                {paginas.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      aria-current={
                        caminho.startsWith(p.href) ? "page" : undefined
                      }
                    >
                      {p.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="dt-paginas">
            {paginas.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  aria-current={caminho.startsWith(p.href) ? "page" : undefined}
                >
                  {p.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <a href="#avaliacao" className="dt-sistemas">
          <span className="dt-sistemas-circulo" aria-hidden>
            <CalendarCheck size={13} strokeWidth={2} />
          </span>
          <span className="dt-sistemas-rotulo">Agendar avaliação</span>
          <span className="sr-only md:hidden">Agendar avaliação</span>
        </a>
      </nav>
    </header>
  );
}
