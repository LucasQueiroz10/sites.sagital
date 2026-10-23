import ostras from "@/public/imagens/premium/la-maree/ostras.jpg";
import mar from "@/public/imagens/premium/la-maree/mar.jpg";
import mesa from "@/public/imagens/premium/la-maree/mesa.jpg";
import polvo from "@/public/imagens/premium/la-maree/polvo.jpg";
import prato from "@/public/imagens/premium/la-maree/prato.jpg";
import rede from "@/public/imagens/premium/la-maree/rede.jpg";
import salao from "@/public/imagens/premium/la-maree/salao.jpg";
import vieira from "@/public/imagens/premium/la-maree/vieira.jpg";
import vinho from "@/public/imagens/premium/la-maree/vinho.jpg";
import type { DadosDoRodape, Imagem } from "./tipos";

// La Marée: restaurante fictício de frutos do mar com sotaque francês, no
// Ribeirão da Ilha (Florianópolis). Primeiro projeto premium da Sagital, a
// partir de uma identidade de cardápio em papel colorido, gravuras antigas e
// fotos com cara de filme. Nome, endereço, preços e contatos são inventados.

export const nome = "La Marée";

/** As cores do papel das referências: cada parte do cardápio tem a sua. */
export const cores = {
  laranja: "#e26127",
  pessego: "#dda27a",
  creme: "#f4eab5",
  salvia: "#cccca2",
  oliva: "#89822f",
  tinta: "#0c0b09",
} as const;

export type CorDoPapel = Exclude<keyof typeof cores, "tinta" | "creme">;

export const navegacao = [
  { rotulo: "Cardápio", href: "#cardapio" },
  { rotulo: "Degustação", href: "#degustacao" },
  { rotulo: "A casa", href: "#a-casa" },
  { rotulo: "Reservas", href: "#reservas" },
] as const;

export const fotos = {
  ostras: {
    src: ostras,
    alt: "Ostras abertas sobre gelo, com gomos de limão, numa travessa de metal",
  },
  vieira: {
    src: vieira,
    alt: "Mão segurando uma vieira servida na própria concha, com ervas e gomos cítricos",
  },
  rede: {
    src: rede,
    alt: "Rede de pesca recolhida na borda de um barco, sobre o mar escuro",
  },
  polvo: {
    src: polvo,
    alt: "Tentáculo de polvo grelhado sobre purê, com ervas frescas e caldo",
  },
  prato: {
    src: prato,
    alt: "Garçom servindo um prato com ostras pequenas e uma flor comestível no centro",
  },
  mar: {
    src: mar,
    alt: "Mar aberto e calmo sob um céu acinzentado",
  },
  vinho: {
    src: vinho,
    alt: "Vinho tinto sendo servido em taças sobre a mesa posta",
  },
  mesa: {
    src: mesa,
    alt: "Mesa com toalha branca, taças e talheres sob luz de fim de tarde",
  },
  salao: {
    src: salao,
    alt: "Salão do restaurante com mesas de mármore, cadeiras de madeira e janelas altas",
  },
} satisfies Record<string, Imagem>;

export type Prato = {
  nome: string;
  /** O complemento do nome, na linha de baixo, como no cardápio impresso. */
  complemento?: string;
  descricao: string;
  /** Em reais, sem centavos; nos vinhos, o texto da garrafa e da taça. */
  preco: number | string;
};

export type ParteDoCardapio = {
  id: string;
  /** O nome curto da aba. */
  rotulo: string;
  /** O título em caligrafia, no alto da folha. */
  titulo: string;
  cor: CorDoPapel;
  pratos: Prato[];
};

export const cardapio: ParteDoCardapio[] = [
  {
    id: "entradas",
    rotulo: "Entradas",
    titulo: "Para começar",
    cor: "salvia",
    pratos: [
      {
        nome: "Ostras do Ribeirão",
        complemento: "ao natural ou gratinadas",
        descricao:
          "Meia dúzia colhida pela manhã, com mignonette de cebola roxa e limão-cravo.",
        preco: 68,
      },
      {
        nome: "Carpaccio de vieiras",
        complemento: "& azeite de trufa",
        descricao:
          "Lâminas finas de vieira, flor de sal e raspas de limão-siciliano.",
        preco: 74,
      },
      {
        nome: "Tartare de atum",
        complemento: "cítricos & erva-doce",
        descricao:
          "Atum fresco marinado em cítricos, erva-doce crocante e gergelim tostado.",
        preco: 62,
      },
      {
        nome: "Velouté de abóbora",
        complemento: "com açafrão",
        descricao: "Abóbora cabotiá, açafrão, creme fraîche e avelãs tostadas.",
        preco: 46,
      },
    ],
  },
  {
    id: "pratos",
    rotulo: "Pratos",
    titulo: "Da casa",
    cor: "oliva",
    pratos: [
      {
        nome: "Bouillabaisse da ilha",
        complemento: "revisitada",
        descricao:
          "Peixes e frutos do mar do dia em caldo de açafrão e erva-doce, com rouille e croûtons.",
        preco: 148,
      },
      {
        nome: "Polvo crocante",
        complemento: "espuma defumada",
        descricao:
          "Polvo confitado e grelhado, espuma de batata defumada e jus de camarão.",
        preco: 132,
      },
      {
        nome: "Robalo em crosta de sal",
        complemento: "& legumes da estação",
        descricao:
          "Robalo inteiro assado na crosta de sal, servido para dois com vinagrete de ervas.",
        preco: 210,
      },
      {
        nome: "Lagosta na manteiga",
        complemento: "noisette & limão",
        descricao:
          "Meia lagosta grelhada, manteiga noisette e risoto de limão-siciliano.",
        preco: 189,
      },
    ],
  },
  {
    id: "sobremesas",
    rotulo: "Sobremesas",
    titulo: "Para terminar",
    cor: "pessego",
    pratos: [
      {
        nome: "Tarte de damasco",
        complemento: "& creme de amêndoas",
        descricao: "Massa amanteigada, damascos assados e sorvete de baunilha.",
        preco: 38,
      },
      {
        nome: "Panna cotta",
        complemento: "mel de lavanda",
        descricao: "Panna cotta de mel de lavanda com frutas cristalizadas.",
        preco: 34,
      },
      {
        nome: "Mil-folhas de limão",
        complemento: "& raspas confitadas",
        descricao: "Massa folhada, creme de limão-siciliano e casca confitada.",
        preco: 36,
      },
      {
        nome: "Sorvetes da casa",
        complemento: "três sabores",
        descricao: "Pistache, flor de laranjeira ou figo, feitos aqui.",
        preco: 28,
      },
    ],
  },
  {
    id: "bebidas",
    rotulo: "Vinhos e drinks",
    titulo: "Para brindar",
    cor: "laranja",
    pratos: [
      {
        nome: "Champagne brut",
        complemento: "Reims, França",
        descricao: "Fresco e mineral, para abrir a noite com as ostras.",
        preco: "Garrafa 690 · Taça 98",
      },
      {
        nome: "Sauvignon blanc",
        complemento: "Serra Catarinense",
        descricao: "Vinho de altitude de São Joaquim, cítrico e herbáceo.",
        preco: "Garrafa 210 · Taça 44",
      },
      {
        nome: "Fizz da Lagoa",
        complemento: "gin & tomilho",
        descricao:
          "Gin com tomilho, água com gás, licor de limão e um ramo de alecrim.",
        preco: 42,
      },
      {
        nome: "Lavanda royale",
        complemento: "espumante",
        descricao:
          "Espumante, licor de lavanda e um toque de flor de laranjeira.",
        preco: 46,
      },
    ],
  },
];

export const degustacao = {
  tempos: 7,
  preco: 420,
  harmonizacao: 260,
  quando: "Sextas e sábados, às 20h",
};

/**
 * Turnos da casa por dia da semana (0 = domingo). Segunda fechada; almoço
 * de sexta a domingo; jantar de terça a sábado.
 */
export const turnos: Record<number, { almoco: boolean; jantar: boolean }> = {
  0: { almoco: true, jantar: false },
  1: { almoco: false, jantar: false },
  2: { almoco: false, jantar: true },
  3: { almoco: false, jantar: true },
  4: { almoco: false, jantar: true },
  5: { almoco: true, jantar: true },
  6: { almoco: true, jantar: true },
};

export const horariosDoAlmoco = ["12:00", "12:30", "13:00", "13:30", "14:00"];
export const horariosDoJantar = [
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

export const ocasioes = [
  "Só um bom jantar",
  "Aniversário",
  "Pedido de casamento",
  "Jantar de negócios",
];

/** Acima disso, a reserva é conversa: o salão fecha para grupos. */
export const maximoDePessoas = 8;

export const contato = {
  instagram: "@lamaree.exemplo",
  email: "reservas@lamaree.exemplo",
  telefone: "(48) 0000-0000",
  endereco: "Rua dos Pescadores, 112",
  bairro: "Ribeirão da Ilha · Florianópolis/SC",
};

export const horarios = [
  { dias: "Terça a quinta", horas: "19h às 23h" },
  { dias: "Sexta e sábado", horas: "12h às 15h · 19h à 0h" },
  { dias: "Domingo", horas: "12h às 16h" },
  { dias: "Segunda", horas: "Fechado" },
];

export const rodape: DadosDoRodape = {
  descricao:
    "Frutos do mar com sotaque francês, de frente para a baía sul de Florianópolis.",
  endereco: contato.endereco,
  bairro: contato.bairro,
  horarios: horarios.map(({ dias, horas }) => `${dias}: ${horas}`),
  email: contato.email,
  redes: ["instagram"],
  legais: ["CNPJ 00.000.000/0001-00 (fictício)"],
};
