import demoAcademia from "@/public/imagens/sagital/demo-academia.png";
import demoMercado from "@/public/imagens/sagital/demo-mercado.png";
import demoRestaurante from "@/public/imagens/sagital/demo-restaurante.png";
import demoTabacaria from "@/public/imagens/sagital/demo-tabacaria.png";
import arenaFight from "@/public/imagens/sagital/variacao-arena-fight.png";
import boxVilaNova from "@/public/imagens/sagital/variacao-box-vila-nova.png";
import ironGym from "@/public/imagens/sagital/variacao-iron-gym.png";
import studioCorpo from "@/public/imagens/sagital/variacao-studio-corpo.png";
import type { Nicho } from "@/lib/link";
import type { PadraoDoTema } from "@/lib/tema";
import { academia } from "./academia";
import { mercado } from "./mercado";
import { restaurante } from "./restaurante";
import { tabacaria } from "./tabacaria";
import type { Imagem } from "./tipos";

// Página da Sagital. As capturas dos demos foram feitas do próprio site.
// Pacotes, valores e prazos são um ponto de partida: edite à vontade.

export type Demo = {
  nicho: Nicho;
  rotulo: string;
  padrao: PadraoDoTema;
  descricao: string;
  captura: Imagem;
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
      "Cronômetro até a próxima aula, planos, grade da semana e aula experimental.",
    captura: {
      src: demoAcademia,
      alt: "Primeira tela do demo de academia no celular",
    },
    paleta: ["#0d0e0f", "#ff4b1f", "#f1f1ec"],
    fonte: "Archivo",
  },
  {
    nicho: "mercado",
    rotulo: mercado.rotulo,
    padrao: mercado.padrao,
    descricao:
      "Encarte de ofertas da semana, pedido de cada item e entrega no mesmo dia.",
    captura: {
      src: demoMercado,
      alt: "Primeira tela do demo de mercado no celular",
    },
    paleta: ["#ffd60a", "#e0101b", "#141414"],
    fonte: "Barlow Condensed",
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
    paleta: ["#120e0b", "#a8835a", "#efe6d8"],
    fonte: "Marcellus",
  },
];

/** O mesmo demo em quatro clientes: a prova de que a personalização é real. */
export const variacoes: Imagem[] = [
  { src: ironGym, alt: "Demo de academia com o nome Iron Gym, em laranja" },
  {
    src: boxVilaNova,
    alt: "Demo de academia com o nome Box Vila Nova, em verde",
  },
  {
    src: studioCorpo,
    alt: "Demo de academia com o nome Studio Corpo, em roxo",
  },
  { src: arenaFight, alt: "Demo de academia com o nome Arena Fight, em azul" },
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

export const urlDoCodigo = "https://github.com/LucasQueiroz10/sites.sagital";
