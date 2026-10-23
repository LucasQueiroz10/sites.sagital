import demoAcademia from "@/public/imagens/sagital/demo-academia.png";
import demoAcademiaDesktop from "@/public/imagens/sagital/demo-academia-desktop.png";
import demoRestaurante from "@/public/imagens/sagital/demo-restaurante.png";
import demoRestauranteDesktop from "@/public/imagens/sagital/demo-restaurante-desktop.png";
import demoTabacaria from "@/public/imagens/sagital/demo-tabacaria.png";
import demoTabacariaDesktop from "@/public/imagens/sagital/demo-tabacaria-desktop.png";
import demoVarejo from "@/public/imagens/sagital/demo-varejo.png";
import demoVarejoDesktop from "@/public/imagens/sagital/demo-varejo-desktop.png";
import type { Nicho } from "@/lib/link";
import type { PadraoDoTema } from "@/lib/tema";
import { academia } from "./academia";
import { restaurante } from "./restaurante";
import { tabacaria } from "./tabacaria";
import type { Imagem, Rede } from "./tipos";
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
      "Cardápio em abas com fotos dos pratos, pedido pelo WhatsApp e reserva de mesa.",
    captura: {
      src: demoRestaurante,
      alt: "Primeira tela do demo de restaurante no celular",
    },
    capturaDesktop: {
      src: demoRestauranteDesktop,
      alt: "Primeira tela do demo de restaurante no computador",
    },
    paleta: ["#fbf6ea", "#8fb0f0", "#15355a"],
    fonte: "Libre Caslon Condensed",
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

/** Cores prontas do gerador de link. */
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
    titulo: "Conversa no WhatsApp",
    texto:
      "Você conta sobre o seu negócio e recebe o demo, já com o seu nome e a sua cor.",
  },
  {
    titulo: "Conteúdo e ajustes",
    texto:
      "Fotos, preços, horários e textos. Você aprova cada parte pelo WhatsApp.",
  },
  {
    titulo: "Desenvolvimento",
    texto:
      "Montamos o site com o seu conteúdo e você acompanha tudo por um link, antes de ir ao ar.",
  },
  {
    titulo: "Site no ar",
    texto:
      "Publicado com endereço próprio, rápido no celular e funcionando até sem internet.",
  },
  {
    titulo: "Atualizações",
    texto: "Mudou um preço, um serviço ou o horário? É só mandar uma mensagem.",
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
    nome: "Horários, contatos e status “aberto agora”",
    inclui: [true, true, true],
  },
  { nome: "Rápido no celular e acessível", inclui: [true, true, true] },
  {
    nome: "Catálogo, serviços, cardápio ou planos",
    inclui: [false, true, true],
  },
  {
    nome: "Funciona sem internet e pode ser instalado",
    inclui: [false, true, true],
  },
  { nome: "QR code para imprimir e divulgar", inclui: [false, true, true] },
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

/**
 * Contatos da Sagital no rodapé. Só aparece o que estiver preenchido: o
 * telefone e o WhatsApp vêm de NEXT_PUBLIC_WHATSAPP_NUMERO; e-mail, redes e
 * CNPJ, daqui. Ex.: email: "contato@seudominio.com.br" e, nas redes,
 * { rede: "instagram", usuario: "sagital", url: "https://www.instagram.com/sagital/" }.
 */
export const contatoDaSagital: {
  email: string | null;
  redes: { rede: Rede; usuario: string; url: string }[];
  cnpj: string | null;
} = {
  email: null,
  redes: [],
  cnpj: null,
};
