import caipirinha from "@/public/imagens/restaurante/caipirinha.jpg";
import cozinha from "@/public/imagens/restaurante/cozinha.jpg";
import forno from "@/public/imagens/restaurante/forno.jpg";
import peixe from "@/public/imagens/restaurante/peixe.jpg";
import pratoPrincipal from "@/public/imagens/restaurante/prato-principal.jpg";
import salao from "@/public/imagens/restaurante/salao.jpg";
import sobremesa from "@/public/imagens/restaurante/sobremesa.jpg";
import type { DadosDoRestaurante } from "./tipos";

// Conteúdo fictício. Fotos do Unsplash (licença livre), salvas localmente.
// O link de delivery aponta para um domínio de exemplo (example.com).

export const restaurante: DadosDoRestaurante = {
  nicho: "restaurante",
  rotulo: "Restaurante",
  padrao: {
    nome: "Restaurante Alecrim",
    cor: "#8a1c3c",
    fundo: "#f8f7f3",
  },
  descricao:
    "Cozinha brasileira de forno a lenha. Cardápio, reservas pelo WhatsApp e delivery.",
  slogan: "Forno a lenha, mesa posta.",
  chamada:
    "Cozinha brasileira de estação, do almoço de terça ao jantar de domingo. Escolha o dia e o horário e reserve sua mesa.",
  navegacao: [
    { rotulo: "Cardápio", href: "#cardapio" },
    { rotulo: "A casa", href: "#casa" },
    { rotulo: "Galeria", href: "#galeria" },
    { rotulo: "Contato", href: "#contato" },
  ],
  acaoPrincipal: {
    rotulo: "Reservar mesa",
    pedido: "Quero reservar uma mesa.",
  },
  delivery: {
    rotulo: "Pedir pelo delivery",
    url: "https://delivery.example.com/restaurante",
  },
  imagemPrincipal: {
    src: pratoPrincipal,
    alt: "Filé de peixe grelhado sobre risoto, com aspargos e meio limão tostado, num prato fundo azul",
  },
  pessoas: [1, 2, 3, 4, 5, 6, 8],
  cardapio: [
    {
      id: "entradas",
      nome: "Entradas",
      itens: [
        {
          nome: "Pão de fermentação natural",
          descricao: "Saído do forno a lenha, com manteiga de garrafa",
          preco: 2400,
          vegetariano: true,
        },
        {
          nome: "Bolinho de feijoada",
          descricao: "Com couve crocante e vinagrete de laranja",
          preco: 3600,
        },
        {
          nome: "Burrata com tomates assados",
          descricao: "Tomates da estação, manjericão e azeite",
          preco: 5800,
          vegetariano: true,
        },
        {
          nome: "Carpaccio de abobrinha",
          descricao: "Castanha-do-pará, limão-cravo e hortelã",
          preco: 4200,
          vegetariano: true,
        },
      ],
    },
    {
      id: "pratos",
      nome: "Pratos",
      itens: [
        {
          nome: "Peixe do dia na brasa",
          descricao: "Pirão, risoto de limão e aspargos",
          preco: 9800,
        },
        {
          nome: "Arroz de pato",
          descricao: "Com laranja, linguiça artesanal e farofa de castanha",
          preco: 8900,
        },
        {
          nome: "Costela no forno a lenha",
          descricao: "Doze horas de forno, mandioca cremosa e couve",
          preco: 9200,
        },
        {
          nome: "Risoto de cogumelos",
          descricao: "Cogumelos frescos e queijo canastra curado",
          preco: 8400,
          vegetariano: true,
        },
        {
          nome: "Nhoque de abóbora",
          descricao: "Manteiga de sálvia e amêndoas tostadas",
          preco: 7200,
          vegetariano: true,
        },
      ],
    },
    {
      id: "sobremesas",
      nome: "Sobremesas",
      itens: [
        {
          nome: "Pudim de tapioca",
          descricao: "Com calda de coco queimado",
          preco: 3200,
          vegetariano: true,
        },
        {
          nome: "Torta de frutas vermelhas",
          descricao: "Massa amanteigada e creme de baunilha",
          preco: 3400,
          vegetariano: true,
        },
        {
          nome: "Goiabada com queijo",
          descricao: "Goiabada cascão e queijo minas meia cura",
          preco: 2800,
          vegetariano: true,
        },
      ],
    },
    {
      id: "bebidas",
      nome: "Bebidas",
      itens: [
        { nome: "Limonada de capim-santo", preco: 1600 },
        { nome: "Suco do dia", preco: 1400 },
        { nome: "Caipirinha de cachaça artesanal", preco: 3200 },
        { nome: "Taça de vinho da casa", preco: 3400 },
        { nome: "Água com ou sem gás", preco: 800 },
        { nome: "Café espresso", preco: 900 },
      ],
    },
  ],
  casa: {
    destaque: "Tudo o que sai da cozinha passa pelo forno a lenha.",
    paragrafos: [
      "O forno fica no meio do salão e é aceso às dez da manhã. Dele saem o pão da mesa, a costela de doze horas e o peixe do dia, que chega toda manhã de pescadores da região.",
      "O cardápio muda com a estação e com o que a feira tem de melhor. A casa é pequena, com vinte mesas, e por isso as reservas ajudam a garantir o seu lugar.",
    ],
    imagem: {
      src: cozinha,
      alt: "Cozinheira finalizando um prato com ervas sobre a bancada de madeira",
    },
  },
  galeria: [
    { src: forno, alt: "Forno a lenha de tijolos aceso, com as brasas vivas" },
    {
      src: peixe,
      alt: "Peixe inteiro assado numa travessa, com pepino e molho",
    },
    {
      src: salao,
      alt: "Salão com mesas de madeira, luminárias pendentes e janelas altas",
    },
    {
      src: caipirinha,
      alt: "Caneca de caipirinha com limão e uma tigela de amendoim",
    },
    {
      src: sobremesa,
      alt: "Fatia de torta de frutas vermelhas num prato branco rendado",
    },
  ],
  expediente: [
    { dias: [2, 3, 4, 5], turno: "almoço", abre: "11:30", fecha: "15:00" },
    { dias: [2, 3, 4, 5], turno: "jantar", abre: "19:00", fecha: "23:00" },
    { dias: [6], abre: "12:00", fecha: "23:00" },
    { dias: [0], turno: "almoço", abre: "12:00", fecha: "17:00" },
  ],
  endereco: {
    logradouro: "Rua dos Ipês, 88",
    bairro: "Bairro Alto",
    referencia: "Manobrista no jantar, de terça a sábado",
  },
  redes: ["instagram", "facebook", "tiktok"],
};
