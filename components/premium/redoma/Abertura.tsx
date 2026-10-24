"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { VideoEmLoop } from "@/components/premium/VideoEmLoop";
import { navegacao, nome, numerosDaAbertura, video } from "@/data/redoma";
import { escolher } from "./escolha";
import { Logo } from "./Logo";

const pilula = "bg-neutral-900/90 backdrop-blur rounded-full";
const divisor = "hidden md:block h-px w-24 bg-white/40";
const numero = "text-4xl md:text-5xl font-medium tracking-tight";
const legenda = "text-xs md:text-sm text-white/70 mt-1";

/** Quem segue um destes links chega ao formulário já na aba certa. */
function aoSeguir(href: string) {
  if (href === "#suporte") escolher({ intencao: "suporte" });
  if (href === "#comecar") escolher({ intencao: "comecar" });
}

/**
 * A abertura do modelo: vídeo em tela cheia, barra em pílulas e as três
 * palavras gigantes em escada. A barra fica fixa para servir a página toda
 * (as pílulas já têm fundo próprio), e no celular ganha um botão de menu no
 * lugar dos links escondidos.
 */
export function Abertura() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  // Fora da abertura, um degradê preto atrás da barra: o texto que passa
  // por baixo some antes de encostar nas pílulas.
  useEffect(() => {
    const atualizar = () => setRolou(window.scrollY > window.innerHeight * 0.6);
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
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
    <section
      aria-labelledby="rd-titulo"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <VideoEmLoop
        video={video.src}
        quadro={video.quadro}
        descricao={video.descricao}
        classeDoFundo="absolute inset-0"
        classeDoVideo="rd-video absolute inset-0 w-full h-full object-cover"
      />
      {/* No celular o recorte do vídeo cai na jaqueta branca: um véu preto
          devolve a leitura ao texto branco. No desktop, o vídeo como veio. */}
      <div aria-hidden className="absolute inset-0 bg-black/45 md:hidden" />

      <header className="fixed z-30 px-6 md:px-10 pt-6 top-0 left-0 right-0">
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black via-black/70 to-transparent transition-opacity duration-300 ${rolou ? "opacity-100" : "opacity-0"}`}
        />
        <nav
          aria-label="Principal"
          className="flex items-center justify-between gap-4"
        >
          <a
            href="#topo"
            className={`flex items-center gap-2 ${pilula} pl-4 pr-6 py-3`}
          >
            <Logo />
            <span className="text-white text-sm font-normal tracking-tight">
              {nome}
            </span>
          </a>

          <div
            className={`hidden md:flex items-center gap-1 ${pilula} px-3 py-2`}
          >
            {navegacao.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => aoSeguir(link.href)}
                className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full"
              >
                {link.rotulo}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#comecar"
              onClick={() => aoSeguir("#comecar")}
              className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
            >
              começar
            </a>
            <button
              ref={botao}
              type="button"
              aria-expanded={menuAberto}
              aria-controls="rd-menu"
              onClick={(e) => {
                e.stopPropagation();
                setMenuAberto((aberto) => !aberto);
              }}
              className={`md:hidden grid size-11 place-items-center ${pilula} text-white`}
            >
              {menuAberto ? (
                <X aria-hidden className="size-5" strokeWidth={1.5} />
              ) : (
                <Menu aria-hidden className="size-5" strokeWidth={1.5} />
              )}
              <span className="sr-only">
                {menuAberto ? "Fechar menu" : "Abrir menu"}
              </span>
            </button>
          </div>
        </nav>

        <div
          ref={menu}
          id="rd-menu"
          hidden={!menuAberto}
          className="rd-menu md:hidden mt-3 rounded-3xl bg-neutral-900/95 backdrop-blur p-2"
        >
          {navegacao.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                aoSeguir(link.href);
                setMenuAberto(false);
              }}
              className="flex min-h-12 items-center rounded-2xl px-4 text-lg text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.rotulo}
            </a>
          ))}
        </div>
      </header>

      <div className="relative h-full w-full">
        <h1 id="rd-titulo" className="absolute inset-0">
          <span className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-4 md:left-10 top-[18%]">
            proteja
          </span>{" "}
          <span className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] right-4 md:right-10 top-[38%]">
            seus
          </span>{" "}
          <span className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-[18%] md:left-[28%] top-[58%]">
            dados
          </span>
        </h1>

        <p className="absolute left-6 md:left-10 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90">
          guardamos os seus dados com todo o cuidado e levamos a sua privacidade
          para onde você for
        </p>

        <div className="absolute right-6 md:right-24 top-[14%]">
          <div className="flex items-center gap-3 justify-end">
            <span aria-hidden className={`${divisor} rotate-[20deg]`} />
            <p className={numero}>{numerosDaAbertura.empresas.valor}</p>
          </div>
          <p className={`${legenda} text-right`}>
            {numerosDaAbertura.empresas.legenda}
          </p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />

        <div className="absolute left-6 md:left-20 bottom-20 md:bottom-24">
          <div className="flex items-center gap-3">
            <p className={numero}>{numerosDaAbertura.dados.valor}</p>
            <span aria-hidden className={`${divisor} rotate-[-20deg]`} />
          </div>
          <p className={legenda}>{numerosDaAbertura.dados.legenda}</p>
        </div>

        <div className="absolute right-6 md:right-20 bottom-16 md:bottom-20">
          <div className="flex items-center gap-3 justify-end">
            <span aria-hidden className={`${divisor} rotate-[-20deg]`} />
            <p className={numero}>{numerosDaAbertura.downloads.valor}</p>
          </div>
          <p className={`${legenda} text-right`}>
            {numerosDaAbertura.downloads.legenda}
          </p>
        </div>
      </div>
    </section>
  );
}
