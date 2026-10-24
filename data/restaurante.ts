import acai from "@/public/imagens/restaurante/acai.jpg";
import almoco from "@/public/imagens/restaurante/almoco.jpg";
import boloCenoura from "@/public/imagens/restaurante/bolo-cenoura.jpg";
import bowlAtum from "@/public/imagens/restaurante/bowl-atum.jpg";
import bowlFrango from "@/public/imagens/restaurante/bowl-frango.jpg";
import bowlSalmao from "@/public/imagens/restaurante/bowl-salmao.jpg";
import bowlVegano from "@/public/imagens/restaurante/bowl-vegano.jpg";
import bowlsMesa from "@/public/imagens/restaurante/bowls-mesa.jpg";
import burgerQuinoa from "@/public/imagens/restaurante/burger-quinoa.jpg";
import burrataPessego from "@/public/imagens/restaurante/burrata-pessego.jpg";
import caprese from "@/public/imagens/restaurante/caprese.jpg";
import feira from "@/public/imagens/restaurante/feira.jpg";
import iogurteGranola from "@/public/imagens/restaurante/iogurte-granola.jpg";
import limoes from "@/public/imagens/restaurante/limoes.jpg";
import limonadaHortela from "@/public/imagens/restaurante/limonada-hortela.jpg";
import mesaBrunch from "@/public/imagens/restaurante/mesa-brunch.jpg";
import principal from "@/public/imagens/restaurante/principal.jpg";
import pudimChia from "@/public/imagens/restaurante/pudim-chia.jpg";
import saladaCamarao from "@/public/imagens/restaurante/salada-camarao.jpg";
import salao from "@/public/imagens/restaurante/salao.jpg";
import salaoSol from "@/public/imagens/restaurante/salao-sol.jpg";
import smoothieManga from "@/public/imagens/restaurante/smoothie-manga.jpg";
import sucoVerde from "@/public/imagens/restaurante/suco-verde.jpg";
import toastAbacate from "@/public/imagens/restaurante/toast-abacate.jpg";
import wrapFrango from "@/public/imagens/restaurante/wrap-frango.jpg";
import type { DadosDoRestaurante } from "./tipos";

// Conteúdo fictício. Fotos do Unsplash (licença livre), salvas localmente,
// com a origem gravada em cada arquivo. O botão do iFood abre a página
// inicial do iFood, como as redes do rodapé: a loja do cliente entra no lugar.

export const restaurante: DadosDoRestaurante = {
  nicho: "restaurante",
  rotulo: "Restaurante",
  padrao: {
    nome: "Limoeiro",
    cor: "#15355a",
    fundo: "#fbf6ea",
  },
  assinatura: "comida natural",
  descricao:
    "Restaurante de comida natural: bowls, saladas, sanduíches e sucos feitos na hora. Cardápio, pedidos e reservas pelo WhatsApp.",
  slogan: { serifa: "Comida de verdade, feita", manuscrito: "na hora" },
  chamada:
    "Bowls, saladas e sucos com o que chega da feira de manhã. Peça pelo WhatsApp ou venha comer com calma no salão.",
  navegacao: [
    { rotulo: "Cardápio", href: "#cardapio" },
    { rotulo: "A casa", href: "#casa" },
    { rotulo: "Reservas", href: "#reservas" },
    { rotulo: "Galeria", href: "#galeria" },
    { rotulo: "Contato", href: "#contato" },
  ],
  raiz: "/restaurante",
  paginas: [
    { rotulo: "Cardápio", href: "/restaurante/cardapio" },
    { rotulo: "A casa", href: "/restaurante/a-casa" },
    { rotulo: "Reservas", href: "/restaurante/reservas" },
    { rotulo: "Galeria", href: "/restaurante/galeria" },
    { rotulo: "Contato", href: "/restaurante/contato" },
  ],
  acaoPrincipal: {
    rotulo: "Fazer pedido",
    pedido: "Quero fazer um pedido.",
  },
  delivery: {
    rotulo: "Abrir no iFood",
    url: "https://www.ifood.com.br/",
  },
  imagemPrincipal: {
    src: principal,
    alt: "Prato azul com ovo cozido, abacate, rabanete, tomate e folhas verdes sobre uma mesa de madeira",
  },
  pessoas: [1, 2, 3, 4, 5, 6, 8],
  cardapio: [
    {
      id: "bowls",
      nome: "Bowls",
      chamada:
        "Base de arroz integral ou quinoa, legumes da estação e molho da casa.",
      cor: "manteiga",
      itens: [
        {
          nome: "Bowl de salmão",
          descricao: "Salmão fresco, edamame, pepino, alga e gergelim",
          preco: 4890,
          imagem: {
            src: bowlSalmao,
            alt: "Bowl de salmão em cubos com edamame, pepino, alga e gergelim, visto de cima",
          },
          selos: ["sem glúten", "da casa"],
        },
        {
          nome: "Bowl de atum picante",
          descricao: "Atum marinado, manga, abacate, broto de feijão e cenoura",
          preco: 4690,
          imagem: {
            src: bowlAtum,
            alt: "Bowl de atum com manga, abacate, tomate, alga e cenoura ralada",
          },
          selos: ["sem glúten"],
        },
        {
          nome: "Bowl de frango grelhado",
          descricao: "Frango na chapa, arroz vermelho, milho, tomate e brotos",
          preco: 3990,
          imagem: {
            src: bowlFrango,
            alt: "Bowl com arroz vermelho, frango em cubos, milho, tomate e brotos, sobre fundo rosa",
          },
        },
        {
          nome: "Bowl verde",
          descricao: "Grão-de-bico, couve, repolho roxo, tomate e tahine",
          preco: 3690,
          imagem: {
            src: bowlVegano,
            alt: "Prato de legumes coloridos com grão-de-bico e repolho roxo sobre uma tábua de madeira",
          },
          selos: ["vegano"],
        },
      ],
    },
    {
      id: "saladas",
      nome: "Saladas",
      chamada:
        "Folhas lavadas no dia e molhos feitos na cozinha, sem nada de pacote.",
      cor: "folha",
      itens: [
        {
          nome: "Salada de camarão",
          descricao: "Camarão na chapa, espinafre, tomate e ovo de codorna",
          preco: 4490,
          imagem: {
            src: saladaCamarao,
            alt: "Salada de espinafre com camarões, tomates cereja e ovos de codorna num prato vermelho",
          },
          selos: ["sem glúten"],
        },
        {
          nome: "Burrata com pêssego",
          descricao: "Burrata, pêssego, figo, tomate e manjericão",
          preco: 4290,
          imagem: {
            src: burrataPessego,
            alt: "Burrata no centro de um prato com fatias de pêssego, figos e tomates, vista de cima",
          },
          selos: ["vegetariano"],
        },
        {
          nome: "Caprese da feira",
          descricao: "Muçarela de búfala, tomate cereja, manjericão e azeite",
          preco: 3490,
          imagem: {
            src: caprese,
            alt: "Muçarela de búfala fatiada com tomates cereja e manjericão num prato de borda verde",
          },
          selos: ["vegetariano", "sem glúten"],
        },
      ],
    },
    {
      id: "sanduiches",
      nome: "Sanduíches",
      chamada: "No pão de fermentação natural ou na tortilha integral.",
      cor: "areia",
      itens: [
        {
          nome: "Toast de abacate",
          descricao: "Pão de fermentação natural, abacate, ovo pochê e páprica",
          preco: 3290,
          imagem: {
            src: toastAbacate,
            alt: "Torrada com abacate fatiado e ovo pochê polvilhado com páprica num prato branco",
          },
          selos: ["vegetariano", "da casa"],
        },
        {
          nome: "Wrap de frango",
          descricao: "Tortilha integral, frango desfiado, folhas e tomate",
          preco: 3190,
          imagem: {
            src: wrapFrango,
            alt: "Wrap enrolado com folhas e tomate num prato branco sobre fundo azul",
          },
        },
        {
          nome: "Burger de quinoa",
          descricao: "Hambúrguer de quinoa, abacate, rúcula e tomate",
          preco: 3890,
          imagem: {
            src: burgerQuinoa,
            alt: "Hambúrguer de quinoa com abacate, rúcula e tomate num pão dourado",
          },
          selos: ["vegetariano"],
        },
      ],
    },
    {
      id: "doces",
      nome: "Doces e açaí",
      chamada: "Adoçados com fruta, mel ou açúcar mascavo.",
      cor: "pervinca",
      itens: [
        {
          nome: "Açaí da casa",
          descricao: "Açaí puro, banana, morango, mirtilo e granola",
          preco: 2890,
          imagem: {
            src: acai,
            alt: "Tigela de açaí coberta com banana, morangos, mirtilos e granola, vista de cima",
          },
          selos: ["vegano"],
        },
        {
          nome: "Iogurte com granola",
          descricao: "Iogurte natural, granola da casa, morango e mirtilo",
          preco: 2290,
          imagem: {
            src: iogurteGranola,
            alt: "Tigela de iogurte com granola, morangos e mirtilos sobre um pano cinza",
          },
          selos: ["vegetariano"],
        },
        {
          nome: "Pudim de chia",
          descricao: "Chia no leite de coco, frutas vermelhas e hortelã",
          preco: 2190,
          imagem: {
            src: pudimChia,
            alt: "Copo de pudim de chia com leite de coco, frutas vermelhas e uma folha de hortelã",
          },
          selos: ["vegano", "sem glúten"],
        },
        {
          nome: "Bolo de cenoura",
          descricao: "Massa integral, nozes e cobertura de cream cheese",
          preco: 1890,
          imagem: {
            src: boloCenoura,
            alt: "Fatia de bolo de cenoura em três camadas com cobertura branca e nozes",
          },
          selos: ["vegetariano"],
        },
      ],
    },
    {
      id: "bebidas",
      nome: "Bebidas",
      chamada: "Sucos espremidos na hora, sem açúcar a não ser que você peça.",
      cor: "marinho",
      itens: [
        {
          nome: "Limonada de hortelã",
          descricao: "Limão-taiti, hortelã e gelo, com ou sem açúcar",
          preco: 1290,
          imagem: {
            src: limonadaHortela,
            alt: "Copo alto de limonada com rodelas de limão, hortelã e gelo",
          },
          selos: ["vegano"],
        },
        {
          nome: "Suco verde",
          descricao: "Couve, maçã verde, gengibre e limão",
          preco: 1490,
          imagem: {
            src: sucoVerde,
            alt: "Suco verde sendo servido de uma jarra em dois copos",
          },
          selos: ["vegano"],
        },
        {
          nome: "Smoothie de manga",
          descricao: "Manga, banana e leite de aveia, batidos na hora",
          preco: 1690,
          imagem: {
            src: smoothieManga,
            alt: "Copo de smoothie de manga com canudo dourado ao lado de um smoothie de mirtilo",
          },
          selos: ["vegano"],
        },
      ],
    },
  ],
  casa: {
    titulo: { serifa: "O que vem da feira, vem com", manuscrito: "sabor" },
    paragrafos: [
      "Toda manhã a gente passa na feira antes de abrir. O que chega bonito vira o bowl do dia; o que não chega, sai do cardápio até voltar.",
      "Nada de congelado nem molho de pacote. A cozinha começa a picar às nove e monta cada prato na hora em que você pede.",
    ],
    pilares: [
      {
        titulo: "Da feira, toda manhã",
        texto:
          "Frutas, folhas e legumes comprados no dia, de quem planta perto.",
      },
      {
        titulo: "Feito na hora",
        texto: "Cada bowl e cada suco são montados quando o pedido chega.",
      },
      {
        titulo: "Embalagem que volta",
        texto: "Pedidos para levar em potes de papel e sacola de pano.",
      },
    ],
    imagem: {
      src: feira,
      alt: "Barraca de frutas numa rua de pedra, sob um guarda-sol listrado de amarelo e branco",
    },
  },
  salao: {
    titulo: "Presença sem pressa.",
    texto:
      "Um salão claro, com luz natural e mesas para trabalhar, almoçar com calma ou dividir um açaí. No almoço de sexta e no brunch de sábado, a reserva garante o seu lugar.",
    imagem: {
      src: salao,
      alt: "Salão claro com luminárias de palha, mesas de madeira, cadeiras brancas e plantas",
    },
  },
  galeria: [
    {
      src: mesaBrunch,
      alt: "Mesa rosa de brunch vista de cima, com torradas, omelete, cafés e sucos",
    },
    {
      src: limoes,
      alt: "Limões inteiros e cortados sobre uma toalha verde, ao lado de flores",
    },
    {
      src: bowlsMesa,
      alt: "Várias saladas coloridas em tigelas brancas, vistas de cima",
    },
    {
      src: salaoSol,
      alt: "Mesas e cadeiras de madeira num salão iluminado pelo sol da tarde",
    },
    {
      src: almoco,
      alt: "Pessoa almoçando uma salada com suco de laranja ao lado",
    },
  ],
  expediente: [
    { dias: [1, 2, 3, 4, 5], abre: "08:00", fecha: "21:00" },
    { dias: [6], abre: "09:00", fecha: "17:00" },
    { dias: [0], abre: "09:00", fecha: "15:00" },
  ],
  endereco: {
    logradouro: "Rua dos Limoeiros, 214",
    bairro: "Vila Jardim",
    referencia: "Em frente à praça da feira de sábado",
  },
  redes: ["instagram", "facebook", "tiktok"],
};

// ---------- páginas internas ----------

/** O dia da cozinha, da feira ao fechamento (página /restaurante/a-casa). */
export const diaDaCozinha = [
  {
    hora: "7h",
    titulo: "Feira",
    texto: "A compra do dia, na barraca de quem planta a 40 km daqui.",
  },
  {
    hora: "8h",
    titulo: "Portas abertas",
    texto: "Café coado, pão de fermentação natural e os primeiros sucos.",
  },
  {
    hora: "9h",
    titulo: "Pré-preparo",
    texto: "Folhas lavadas, legumes picados e os molhos da casa batidos.",
  },
  {
    hora: "11h30",
    titulo: "Almoço",
    texto: "Os bowls saem montados na hora em que o pedido chega.",
  },
  {
    hora: "16h",
    titulo: "Tarde",
    texto: "Açaí, bolo de cenoura e smoothie para a pausa do trabalho.",
  },
  {
    hora: "21h",
    titulo: "Fechamento",
    texto: "O que sobra vai para a cozinha solidária do bairro.",
  },
];

/** Como funciona a reserva (página /restaurante/reservas). */
export const regrasDaReserva = [
  {
    titulo: "15 minutos de tolerância",
    texto: "Depois disso a mesa volta para a fila. Avise se for atrasar.",
  },
  {
    titulo: "Grupos de 8 ou mais",
    texto:
      "Juntamos mesas no salão do fundo. Reserve com um dia de antecedência.",
  },
  {
    titulo: "Aniversário à mesa",
    texto:
      "Conte na mensagem: a fatia de bolo de cenoura com vela é por nossa conta.",
  },
];

export const perguntasDaReserva = [
  {
    pergunta: "Preciso reservar para almoçar?",
    resposta:
      "Durante a semana, quase nunca. A reserva garante o lugar no almoço de sexta e no brunch de sábado, quando o salão enche.",
  },
  {
    pergunta: "Posso levar o meu cachorro?",
    resposta:
      "Pode, nas mesas da calçada. Temos pote de água e petisco natural para ele.",
  },
  {
    pergunta: "Tem cadeirinha para criança?",
    resposta:
      "Temos três cadeirinhas e um cardápio menor, com pratos em meia porção. É só pedir na reserva.",
  },
  {
    pergunta: "Como cancelo uma reserva?",
    resposta:
      "Responda a mensagem de confirmação no WhatsApp. Não cobramos nada pelo cancelamento.",
  },
];

/** Pedidos para levar e entrega (página /restaurante/contato). */
export const formasDePedir = [
  {
    titulo: "No WhatsApp",
    texto: "Mande o pedido e retire no balcão em 20 minutos, em pote de papel.",
  },
  {
    titulo: "No iFood",
    texto: "Entrega no bairro e arredores, com o mesmo cardápio do salão.",
  },
  {
    titulo: "No salão",
    texto: "Mesas com luz natural, tomada e wi-fi, para comer com calma.",
  },
];

export const perguntasDoContato = [
  {
    pergunta: "Vocês fazem marmita para a semana?",
    resposta:
      "Fazemos, por encomenda até quinta. Cinco bowls frescos, entregues na segunda de manhã, montados para durar.",
  },
  {
    pergunta: "Tem opção sem lactose e sem glúten?",
    resposta:
      "Todo prato sai sem lactose se você pedir, e os marcados como sem glúten são preparados em tábuas separadas.",
  },
  {
    pergunta: "Atendem eventos e reuniões?",
    resposta:
      "Montamos bandejas de bowls, sanduíches e sucos para grupos a partir de 10 pessoas. Conte a data e o número de pessoas no WhatsApp.",
  },
];
