import demoAcademia from "@/public/imagens/sagital/demo-academia.png";
import demoAcademiaDesktop from "@/public/imagens/sagital/demo-academia-desktop.png";
import demoRestaurante from "@/public/imagens/sagital/demo-restaurante.png";
import demoRestauranteDesktop from "@/public/imagens/sagital/demo-restaurante-desktop.png";
import demoTabacaria from "@/public/imagens/sagital/demo-tabacaria.png";
import demoTabacariaDesktop from "@/public/imagens/sagital/demo-tabacaria-desktop.png";
import demoVarejo from "@/public/imagens/sagital/demo-varejo.png";
import demoVarejoDesktop from "@/public/imagens/sagital/demo-varejo-desktop.png";
import arenaFight from "@/public/imagens/sagital/variacao-arena-fight.png";
import boxVilaNova from "@/public/imagens/sagital/variacao-box-vila-nova.png";
import ironGym from "@/public/imagens/sagital/variacao-iron-gym.png";
import studioCorpo from "@/public/imagens/sagital/variacao-studio-corpo.png";
import type { Nicho } from "@/lib/link";
import type { PadraoDoTema } from "@/lib/tema";
import { academia } from "./academia";
import { restaurante } from "./restaurante";
import { tabacaria } from "./tabacaria";
import type { Imagem } from "./tipos";
import { varejo } from "./varejo";

// Página da Sagital. As capturas dos demos foram feitas do próprio site.
// Pacotes, valores e prazos são um ponto de partida: edite à vontade.

export type Demo = {
  nicho: Nicho;
  rotulo: string;
  padrao: PadraoDoTema;
  descricao: string;
  /** Primeira tela no celular (390px). */
  captura: Imagem;
  /** Primeira tela no computador (1440px). */
  capturaDesktop: Imagem;
  /** Etiqueta de origem: a paleta e a fonte de cada demo. */
  paleta: `#${string}`[];
  fonte: string;
};

export const demos: Demo[] = [
  {
    nicho: "academia",
    rotulo: academia.rotulo,
    padrao: academia.padrao,
    descricao:
      "Aula experimental agendada direto da grade, planos com preço e modalidades.",
    captura: {
      src: demoAcademia,
      alt: "Primeira tela do demo de academia no celular",
    },
    capturaDesktop: {
      src: demoAcademiaDesktop,
      alt: "Primeira tela do demo de academia no computador",
    },
    paleta: ["#ffffff", "#d42a16", "#12161c"],
    fonte: "Sofia Sans Condensed",
  },
  {
    nicho: "varejo",
    rotulo: varejo.rotulo,
    padrao: varejo.padrao,
    descricao:
      "Vitrines Feminino e Masculino, escolha de tamanho e pedido pelo WhatsApp.",
    captura: {
      src: demoVarejo,
      alt: "Primeira tela do demo de varejo no celular",
    },
    capturaDesktop: {
      src: demoVarejoDesktop,
      alt: "Primeira tela do demo de varejo no computador",
    },
    paleta: ["#ffffff", "#f5f5f5", "#121212"],
    fonte: "Hanken Grotesk",
  },
  {
    nicho: "restaurante",
    rotulo: restaurante.rotulo,
    padrao: restaurante.padrao,
    descricao:
      "Reserva de mesa com dia e horário, cardápio completo e delivery.",
    captura: {
      src: demoRestaurante,
      alt: "Primeira tela do demo de restaurante no celular",
    },
    capturaDesktop: {
      src: demoRestauranteDesktop,
      alt: "Primeira tela do demo de restaurante no computador",
    },
    paleta: ["#f8f7f3", "#1f3f95", "#8a1c3c"],
    fonte: "Young Serif",
  },
  {
    nicho: "tabacaria",
    rotulo: tabacaria.rotulo,
    padrao: tabacaria.padrao,
    descricao:
      "Aviso de maioridade, lounge, acessórios e todos os avisos legais.",
    captura: {
      src: demoTabacaria,
      alt: "Primeira tela do demo de tabacaria no celular",
    },
    capturaDesktop: {
      src: demoTabacariaDesktop,
      alt: "Primeira tela do demo de tabacaria no computador",
    },
    paleta: ["#120e0b", "#a8835a", "#efe6d8"],
    fonte: "Marcellus",
  },
];

export type Variacao = {
  /** Nome fictício do cliente, como vai na URL. */
  nome: string;
  cor: `#${string}`;
  nomeDaCor: string;
  captura: Imagem;
};

/**
 * O mesmo demo em quatro clientes: a prova de que a personalização é real.
 * As cores são as mesmas do gerador de link.
 */
export const variacoes: Variacao[] = [
  {
    nome: "Iron Gym",
    cor: "#f97316",
    nomeDaCor: "Laranja",
    captura: {
      src: ironGym,
      alt: "Demo de academia com o nome Iron Gym, em laranja",
    },
  },
  {
    nome: "Box Vila Nova",
    cor: "#16a34a",
    nomeDaCor: "Verde",
    captura: {
      src: boxVilaNova,
      alt: "Demo de academia com o nome Box Vila Nova, em verde",
    },
  },
  {
    nome: "Studio Corpo",
    cor: "#7c3aed",
    nomeDaCor: "Roxo",
    captura: {
      src: studioCorpo,
      alt: "Demo de academia com o nome Studio Corpo, em roxo",
    },
  },
  {
    nome: "Arena Fight",
    cor: "#2563eb",
    nomeDaCor: "Azul",
    captura: {
      src: arenaFight,
      alt: "Demo de academia com o nome Arena Fight, em azul",
    },
  },
];

/** Cores prontas do gerador de link: as mesmas das variações e mais duas. */
export const coresDoGerador: { nome: string; valor: `#${string}` }[] = [
  { nome: "Vermelho", valor: "#e11d48" },
  { nome: "Laranja", valor: "#f97316" },
  { nome: "Verde", valor: "#16a34a" },
  { nome: "Azul", valor: "#2563eb" },
  { nome: "Roxo", valor: "#7c3aed" },
  { nome: "Grafite", valor: "#1f2937" },
];

export const processo = [
  {
    titulo: "Visita na sua loja",
    texto:
      "Mostro no celular o demo do seu ramo, já com o nome e a cor do seu negócio.",
  },
  {
    titulo: "Conteúdo e ajustes",
    texto:
      "Fotos, preços, horários e textos. Você aprova cada parte pelo WhatsApp.",
  },
  {
    titulo: "Site no ar",
    texto:
      "Publicado com endereço próprio, rápido no celular e funcionando até sem internet.",
  },
  {
    titulo: "Atualizações",
    texto: "Mudou o cardápio, a oferta ou o horário? É só mandar uma mensagem.",
  },
];

export type Pacote = {
  nome: string;
  /** Centavos. */
  preco: number;
  prazo: string;
  recomendado?: boolean;
};

export const pacotes: Pacote[] = [
  { nome: "Essencial", preco: 89000, prazo: "7 dias" },
  { nome: "Completo", preco: 149000, prazo: "12 dias", recomendado: true },
  { nome: "Sob medida", preco: 229000, prazo: "20 dias" },
];

/** Linhas da tabela de pacotes: o que cada um inclui, na ordem dos pacotes. */
export const recursos: { nome: string; inclui: (boolean | string)[] }[] = [
  { nome: "Site com a cara do seu negócio", inclui: [true, true, true] },
  { nome: "Botão de WhatsApp com mensagem pronta", inclui: [true, true, true] },
  {
    nome: "Horários, endereço e status “aberto agora”",
    inclui: [true, true, true],
  },
  { nome: "Rápido no celular e acessível", inclui: [true, true, true] },
  {
    nome: "Cardápio, planos, ofertas ou catálogo",
    inclui: [false, true, true],
  },
  {
    nome: "Funciona sem internet e pode ser instalado",
    inclui: [false, true, true],
  },
  { nome: "QR code para imprimir no balcão", inclui: [false, true, true] },
  { nome: "Fotos e textos produzidos com você", inclui: [false, false, true] },
  { nome: "Páginas extras", inclui: [false, false, "até 3"] },
  {
    nome: "Ajustes depois de publicar",
    inclui: ["15 dias", "30 dias", "90 dias"],
  },
];

export const observacoesDosPacotes =
  "Domínio .com.br: cerca de R$ 40 por ano, pago direto ao Registro.br. Manutenção mensal opcional: R$ 79.";

export const mensagemDeContato =
  "Olá! Vi o site da Sagital e quero um site para o meu negócio.";

/** Mensagem do botão de cada pacote: o vendedor já sabe qual interessou. */
export function mensagemDoPacote(nome: string): string {
  return `Olá! Vi o site da Sagital e quero saber mais sobre o pacote ${nome}.`;
}

export const urlDoCodigo = "https://github.com/LucasQueiroz10/sites.sagital";
