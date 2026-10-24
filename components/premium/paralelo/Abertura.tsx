"use client";

import { useEffect, useRef, useState } from "react";
import { navegacao, nome } from "@/data/paralelo";
import { classes } from "@/lib/classes";
import { prefereMenosMovimento } from "@/lib/movimento";
import { DialogoDeEntrada } from "./DialogoDeEntrada";
import { escolher, type Intencao } from "./escolha";
import { Seta } from "./Seta";
import { VideoDoGlobo } from "./VideoDoGlobo";

/** A entrada inteira dura 1,67s; passou disso, ela se desliga de qualquer jeito. */
const LIMITE_DA_ENTRADA = 2600;

/** Os links que levam ao formulário avisam com que intenção a pessoa chega. */
function intencaoDoLink(href: string): Intencao | null {
  if (href === "#vendas") return "vendas";
  if (href === "#comecar") return "conta";
  return null;
}

/**
 * A abertura: o globo em vídeo, a barra de navegação (fixa, ganha fundo fora
 * da abertura), o menu do celular e o título. A entrada já vem armada do
 * servidor (classe pa-anim), toca na primeira pintura e se desliga quando o
 * último botão assenta, deixando o desenho parado.
 */
export function Abertura() {
  const raiz = useRef<HTMLElement>(null);
  const burger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  const [entrando, setEntrando] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);
  const [entrarAberto, setEntrarAberto] = useState(false);
  const [solida, setSolida] = useState(false);

  // Desliga a entrada quando o botão secundário (o último) termina.
  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    // Com movimento reduzido o CSS já desliga a entrada inteira.
    if (prefereMenosMovimento()) return;
    const encerrar = () => setEntrando(false);
    const aoTerminar = (e: AnimationEvent) => {
      if (
        e.animationName === "pa-pilula-entra" &&
        e.target instanceof HTMLElement &&
        e.target.classList.contains("pa-btn-vidro")
      ) {
        encerrar();
      }
    };
    const limite = window.setTimeout(encerrar, LIMITE_DA_ENTRADA);
    el.addEventListener("animationend", aoTerminar, true);
    return () => {
      window.clearTimeout(limite);
      el.removeEventListener("animationend", aoTerminar, true);
    };
  }, []);

  // A barra ganha fundo assim que a página rola: transparente, o texto da
  // abertura passaria por baixo dos links.
  useEffect(() => {
    const atualizar = () => setSolida(window.scrollY > 16);
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
      if (!menu.current?.contains(alvo) && !burger.current?.contains(alvo)) {
        setMenuAberto(false);
      }
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuAberto(false);
        burger.current?.focus();
      }
    };
    document.addEventListener("click", aoClicar);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("click", aoClicar);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [menuAberto]);

  const aoSeguir = (href: string) => {
    const intencao = intencaoDoLink(href);
    if (intencao) escolher({ intencao });
  };

  const abrirEntrada = () => {
    setMenuAberto(false);
    setEntrarAberto(true);
  };

  return (
    <section
      ref={raiz}
      aria-labelledby="pa-titulo"
      className={classes("pa-hero", entrando && "pa-anim")}
    >
      <VideoDoGlobo />

      <header className={classes("pa-nav", solida && "solida")}>
        <a className="pa-logo" href="#topo">
          {nome}
        </a>
        <nav className="pa-links" aria-label="Principal">
          {navegacao.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => aoSeguir(link.href)}
            >
              {link.rotulo}
            </a>
          ))}
        </nav>
        <div className="pa-acoes">
          <button
            type="button"
            className="pa-btn pa-btn-entrar"
            onClick={abrirEntrada}
          >
            Entrar
          </button>
          <a
            className="pa-btn pa-btn-comecar"
            href="#comecar"
            onClick={() => aoSeguir("#comecar")}
          >
            Abrir conta
            <Seta />
          </a>
        </div>
        <button
          ref={burger}
          type="button"
          className="pa-burger"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="pa-menu"
          onClick={(e) => {
            e.stopPropagation();
            setMenuAberto((aberto) => !aberto);
          }}
        >
          <span />
        </button>
      </header>

      <nav
        ref={menu}
        id="pa-menu"
        aria-label="Celular"
        className={classes("pa-menu", menuAberto && "aberto")}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setMenuAberto(false);
        }}
      >
        {navegacao.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => aoSeguir(link.href)}
          >
            {link.rotulo}
          </a>
        ))}
        <div className="pa-divisor" />
        <button type="button" onClick={abrirEntrada}>
          Entrar
        </button>
        <a
          className="pa-m-comecar"
          href="#comecar"
          onClick={() => aoSeguir("#comecar")}
        >
          Abrir conta
          <Seta />
        </a>
      </nav>

      <div className="pa-conteudo">
        <h1 id="pa-titulo" className="pa-titulo">
          <span className="pa-ln">
            <span className="pa-ln-i">Finanças</span>
          </span>
          <span className="pa-ln">
            <span className="pa-ln-i">sem fronteiras</span>
          </span>
        </h1>
        <p className="pa-sub">
          Receba de clientes no exterior, pague fornecedores lá fora
          <br /> e guarde saldo em real, dólar, euro ou stablecoin,
          <br /> com câmbio na hora e checkout pronto para o mundo.
        </p>
        <div className="pa-ctas">
          <a
            className="pa-btn pa-btn-lg pa-btn-primario"
            href="#comecar"
            onClick={() => aoSeguir("#comecar")}
          >
            Abrir conta
            <Seta />
          </a>
          <a
            className="pa-btn pa-btn-lg pa-btn-vidro"
            href="#vendas"
            onClick={() => aoSeguir("#vendas")}
          >
            Falar com vendas
            <Seta />
          </a>
        </div>
      </div>

      <DialogoDeEntrada
        aberto={entrarAberto}
        aoFechar={() => setEntrarAberto(false)}
      />
    </section>
  );
}
