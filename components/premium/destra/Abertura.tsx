"use client";

import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { VideoEmLoop } from "@/components/premium/VideoEmLoop";
import { navegacao, nome, video } from "@/data/destra";
import { Logo } from "./Logo";

/** Os quatro pontos do botão da direita, do modelo. */
function IconeDeGrade() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
      <g fill="currentColor">
        <circle cx="3" cy="3" r="1.5" />
        <circle cx="9" cy="3" r="1.5" />
        <circle cx="3" cy="9" r="1.5" />
        <circle cx="9" cy="9" r="1.5" />
      </g>
    </svg>
  );
}

/**
 * A abertura do modelo: vídeo da mão em tela cheia sobre branco, barra fixa
 * em pílulas e, embaixo, o título sobre um degradê branco. Cada parte entra
 * na ordem e no tempo do modelo (CSS em destra.css). O botão "Menu" abre a
 * navegação num painel preso a ele.
 */
export function Abertura() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const marco = useRef<HTMLDivElement>(null);

  // Depois da abertura, um véu branco atrás da barra: o texto que passa por
  // baixo some antes de encostar nas pílulas.
  useEffect(() => {
    const alvo = marco.current;
    if (!alvo) return;
    const observador = new IntersectionObserver(([entrada]) =>
      setRolou(!entrada?.isIntersecting),
    );
    observador.observe(alvo);
    return () => observador.disconnect();
  }, []);

  // Menu: fecha com clique fora e com Esc (o foco volta ao botão).
  useEffect(() => {
    if (!menuAberto) return;
    const aoClicar = (e: MouseEvent) => {
      const alvo = e.target as Node;
      if (!menu.current?.contains(alvo) && !botao.current?.contains(alvo)) {
        setMenuAberto(false);
      }
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuAberto(false);
        botao.current?.focus();
      }
    };
    document.addEventListener("click", aoClicar);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("click", aoClicar);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [menuAberto]);

  return (
    <section aria-labelledby="dt-titulo" className="dt-abertura">
      <div className="dt-video-moldura">
        <VideoEmLoop
          video={video.src}
          quadro={video.quadro}
          descricao={video.descricao}
          classeDoFundo="absolute inset-0"
          classeDoVideo="dt-video"
        />
      </div>
      {/* Some da tela quando a abertura passa: liga o véu da barra. */}
      <div ref={marco} aria-hidden className="dt-marco" />

      <header className="dt-barra" data-rolou={rolou || undefined}>
        <nav aria-label="Principal" className="dt-barra-linha">
          <div className="dt-barra-lado">
            <a href="#topo" className="dt-logo" aria-label={`${nome}, início`}>
              <Logo className="size-6 md:size-7" />
              <span className="dt-logo-nome" aria-hidden>
                {nome}
              </span>
            </a>

            <div className="relative">
              <button
                ref={botao}
                type="button"
                className="dt-menu-botao"
                aria-expanded={menuAberto}
                aria-controls="dt-menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuAberto((aberto) => !aberto);
                }}
              >
                <span className="dt-menu-circulo" aria-hidden>
                  {menuAberto ? (
                    <X size={12} strokeWidth={3} />
                  ) : (
                    <Plus size={12} strokeWidth={3} />
                  )}
                </span>
                Menu
              </button>

              <div
                ref={menu}
                id="dt-menu"
                hidden={!menuAberto}
                className="dt-menu"
              >
                <ul>
                  {navegacao.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} onClick={() => setMenuAberto(false)}>
                        {link.rotulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="dt-etiquetas">
              <span>Biônica avançada</span>
              <span>IA cognitiva</span>
            </p>
          </div>

          <a href="#monte" className="dt-sistemas">
            <span className="dt-sistemas-circulo" aria-hidden>
              <IconeDeGrade />
            </span>
            <span className="dt-sistemas-rotulo">Sistemas adaptativos</span>
            <span className="sr-only md:hidden">Monte a sua mão</span>
          </a>
        </nav>
      </header>

      <div className="dt-rodape-abertura">
        <div className="dt-rodape-linha">
          <div>
            <p className="dt-subtitulo">
              <span aria-hidden className="dt-ponto" />
              Mão biônica com sete pegadas e IA que aprende com você
            </p>
            <h1 id="dt-titulo" className="dt-titulo">
              Uma mão, zero
              <br />
              limites. Em cada gesto.
            </h1>
            <div className="dt-botoes">
              <a href="#pegadas" className="dt-botao dt-botao-cheio">
                Ver as pegadas
              </a>
              <a href="#como-funciona" className="dt-botao dt-botao-contorno">
                Como funciona
              </a>
            </div>
          </div>
          <ul className="dt-tags" aria-label="Tecnologias">
            <li>Neuromórfica</li>
            <li>IA adaptativa</li>
            <li>Cibernética</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
