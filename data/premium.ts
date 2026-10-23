/**
 * Projetos premium: sites além dos três pacotes, com preço e prazo
 * combinados depois de entender o projeto. Os exemplos entram em
 * `projetosPremium` à medida que ficarem prontos.
 */

import capturaBloco from "@/public/imagens/sagital/premium-bloco.png";
import capturaLaMaree from "@/public/imagens/sagital/premium-la-maree.png";
import type { Imagem } from "./tipos";

export type ProjetoPremium = {
  id: string;
  nome: string;
  /** O ramo ou o tipo de projeto, na etiqueta do cartão. */
  ramo: string;
  /** Uma frase sobre o que o projeto tem de especial. */
  destaque: string;
  href: string;
  /** A primeira tela no celular. */
  captura: Imagem;
  fonte: string;
  paleta: string[];
};

export const projetosPremium: ProjetoPremium[] = [
  {
    id: "la-maree",
    nome: "La Marée",
    ramo: "Restaurante de frutos do mar",
    destaque:
      "Cardápio em folhas coloridas por aba e reserva com dia, horário e ocasião direto no WhatsApp.",
    href: "/premium/la-maree",
    captura: {
      src: capturaLaMaree,
      alt: "Primeira tela do site do restaurante La Marée no celular",
    },
    fonte: "Noto Serif Display",
    paleta: ["#e26127", "#cccca2", "#0c0b09"],
  },
  {
    id: "bloco",
    nome: "Bloco",
    ramo: "Agência de marketing",
    destaque:
      "Blocos de montar em 3D ao vivo: cada serviço vira um bloco do mix, e o processo se monta conforme a rolagem.",
    href: "/premium/bloco",
    captura: {
      src: capturaBloco,
      alt: "Primeira tela do site da agência Bloco no celular",
    },
    fonte: "Saira",
    paleta: ["#e85102", "#e4e4e4", "#333333"],
  },
];

/** O que um projeto premium tem a mais que os pacotes. */
export const diferenciaisDoPremium = [
  {
    titulo: "Identidade feita do zero",
    texto:
      "Nada de modelo adaptado: o visual, as fontes e a navegação nascem da sua marca e do seu público.",
  },
  {
    titulo: "Recursos sob medida",
    texto:
      "Agendamento, catálogo grande, área do cliente, integrações com o que você já usa: entra o que o seu negócio precisa.",
  },
  {
    titulo: "Preço e prazo combinados",
    texto:
      "Primeiro a gente conversa e entende o projeto; depois você recebe a proposta com o valor e o prazo fechados.",
  },
];

export const mensagemDoPremium =
  "Olá! Vi os projetos premium da Sagital e quero conversar sobre um projeto.";
