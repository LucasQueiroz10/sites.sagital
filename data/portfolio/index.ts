import capturaAdvocacia from "@/public/imagens/sagital/portfolio-advocacia.png";
import capturaArquitetura from "@/public/imagens/sagital/portfolio-arquitetura.png";
import capturaContabilidade from "@/public/imagens/sagital/portfolio-contabilidade.png";
import capturaOdontologia from "@/public/imagens/sagital/portfolio-odontologia.png";
import desktopAdvocacia from "@/public/imagens/sagital/portfolio-advocacia-desktop.png";
import desktopArquitetura from "@/public/imagens/sagital/portfolio-arquitetura-desktop.png";
import desktopContabilidade from "@/public/imagens/sagital/portfolio-contabilidade-desktop.png";
import desktopOdontologia from "@/public/imagens/sagital/portfolio-odontologia-desktop.png";
import type { Imagem } from "@/data/tipos";

// Os sites conceituais do portfólio: empresas fictícias de serviços
// profissionais, cada um com identidade e interação próprias. As capturas
// foram feitas dos próprios sites.

export type SiteDoPortfolio = {
  id: string;
  nome: string;
  ramo: string;
  /** O que o site tem de interativo, em uma frase. */
  destaque: string;
  href: `/portfolio/${string}`;
  /** Primeira tela no celular (390px). */
  captura: Imagem;
  /** Primeira tela no computador (1440px), na janela da vitrine. */
  capturaDesktop: Imagem;
  paleta: `#${string}`[];
  fonte: string;
  /** Fundo do cartão na vitrine: uma cor da paleta do site, escura o bastante para o texto branco. */
  cor: `#${string}`;
};

export const sitesDoPortfolio: SiteDoPortfolio[] = [
  {
    id: "advocacia",
    nome: "Duarte Moreira Advogados",
    ramo: "Escritório de advocacia",
    destaque:
      "Áreas de atuação em painel e uma triagem do caso em três passos.",
    href: "/portfolio/advocacia",
    captura: {
      src: capturaAdvocacia,
      alt: "Primeira tela do site do escritório Duarte Moreira Advogados no celular",
    },
    capturaDesktop: {
      src: desktopAdvocacia,
      alt: "Primeira tela do site de Duarte Moreira Advogados no computador",
    },
    paleta: ["#0f2b24", "#b9d3c5", "#ffffff"],
    fonte: "Libre Caslon Display",
    cor: "#0f2b24",
  },
  {
    id: "odontologia",
    nome: "Lumi Odontologia",
    ramo: "Clínica odontológica",
    destaque:
      "Agenda com os horários livres da semana e o próximo horário no topo.",
    href: "/portfolio/odontologia",
    captura: {
      src: capturaOdontologia,
      alt: "Primeira tela do site da clínica Lumi Odontologia no celular",
    },
    capturaDesktop: {
      src: desktopOdontologia,
      alt: "Primeira tela do site de Lumi Odontologia no computador",
    },
    paleta: ["#ffffff", "#0b6a74", "#0f2233"],
    fonte: "Albert Sans",
    cor: "#0b6a74",
  },
  {
    id: "arquitetura",
    nome: "Atelier Vão Arquitetura",
    ramo: "Estúdio de arquitetura",
    destaque:
      "Projetos filtráveis com ficha completa e briefing com régua de área.",
    href: "/portfolio/arquitetura",
    captura: {
      src: capturaArquitetura,
      alt: "Primeira tela do site do Atelier Vão Arquitetura no celular",
    },
    capturaDesktop: {
      src: desktopArquitetura,
      alt: "Primeira tela do site de Atelier Vão Arquitetura no computador",
    },
    paleta: ["#f4f1ec", "#1c1b19", "#9c4a2c"],
    fonte: "Archivo",
    cor: "#9c4a2c",
  },
  {
    id: "contabilidade",
    nome: "Prumo Contabilidade",
    ramo: "Escritório de contabilidade",
    destaque: "Simulador de MEI e Simples Nacional com a alíquota efetiva.",
    href: "/portfolio/contabilidade",
    captura: {
      src: capturaContabilidade,
      alt: "Primeira tela do site da Prumo Contabilidade no celular",
    },
    capturaDesktop: {
      src: desktopContabilidade,
      alt: "Primeira tela do site de Prumo Contabilidade no computador",
    },
    paleta: ["#102a43", "#9fe3c9", "#f1f4f8"],
    fonte: "Schibsted Grotesk",
    cor: "#102a43",
  },
];
