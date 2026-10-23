import campanha from "@/public/imagens/varejo/campanha.jpg";
import femCamiseta from "@/public/imagens/varejo/fem-camiseta.jpg";
import femCardigan from "@/public/imagens/varejo/fem-cardigan.jpg";
import femChemise from "@/public/imagens/varejo/fem-chemise.jpg";
import femJaquetaJeans from "@/public/imagens/varejo/fem-jaqueta-jeans.jpg";
import femVestidoAlcas from "@/public/imagens/varejo/fem-vestido-alcas.jpg";
import femVestidoLinho from "@/public/imagens/varejo/fem-vestido-linho.jpg";
import femininoBanner from "@/public/imagens/varejo/feminino-banner.jpg";
import mascCamisaLinho from "@/public/imagens/varejo/masc-camisa-linho.jpg";
import mascCamiseta from "@/public/imagens/varejo/masc-camiseta.jpg";
import mascChino from "@/public/imagens/varejo/masc-chino.jpg";
import mascJaquetaJeans from "@/public/imagens/varejo/masc-jaqueta-jeans.jpg";
import mascPolo from "@/public/imagens/varejo/masc-polo.jpg";
import mascSueter from "@/public/imagens/varejo/masc-sueter.jpg";
import masculinoBanner from "@/public/imagens/varejo/masculino-banner.jpg";
import type { DadosDoVarejo } from "./tipos";

// Conteúdo fictício, sem marcas reais. Fotos do Unsplash (licença livre),
// salvas localmente; a origem de cada uma está gravada no próprio arquivo.
// Preços em centavos.

export const varejo: DadosDoVarejo = {
  nicho: "varejo",
  rotulo: "Varejo",
  padrao: {
    nome: "Casa do Algodão",
    cor: "#121212",
    fundo: "#ffffff",
  },
  descricao:
    "Básicos de algodão femininos e masculinos, com pedido pelo WhatsApp e retirada na loja.",
  slogan: "Básicos de algodão para o dia a dia",
  chamada: "Do PP ao GG",
  navegacao: [
    { rotulo: "Feminino", href: "#feminino" },
    { rotulo: "Masculino", href: "#masculino" },
    { rotulo: "Como comprar", href: "#como-comprar" },
    { rotulo: "Loja", href: "#contato" },
  ],
  acaoPrincipal: {
    rotulo: "Falar com a loja",
    pedido: "Quero saber mais sobre as peças da loja.",
  },
  campanha: {
    src: campanha,
    alt: "Uma mulher e um homem de camiseta branca e calça jeans num estúdio claro",
  },
  beneficios: [
    { texto: "Troca fácil em até 30 dias", icone: "troca" },
    { texto: "3x sem juros no cartão", icone: "parcelas" },
    { texto: "Retire na loja em 1 hora", icone: "retirada" },
    { texto: "Entrega grátis no bairro acima de R$ 199", icone: "entrega" },
  ],
  parcelamento: { vezes: 3, parcelaMinima: 2500 },
  setores: [
    {
      id: "feminino",
      nome: "Feminino",
      chamada: "Vestidos de linho, jeans e o básico que combina com tudo.",
      banner: {
        src: femininoBanner,
        alt: "Mulher de camiseta branca e calça jeans clara, com as mãos na cintura",
        titulo: "Básicos femininos",
        foco: "50% 30%",
      },
      pecas: [
        {
          nome: "Camiseta Básica de Algodão Branca",
          preco: 5990,
          tamanhos: ["PP", "P", "M", "G", "GG"],
          esgotados: ["PP"],
          selo: "Mais vendida",
          imagem: {
            src: femCamiseta,
            alt: "Mulher de camiseta branca de algodão e calça preta",
          },
        },
        {
          nome: "Vestido Midi de Linho Areia",
          preco: 18990,
          precoAntigo: 22990,
          tamanhos: ["P", "M", "G", "GG"],
          imagem: {
            src: femVestidoLinho,
            alt: "Mulher de vestido de linho cor de areia, sem mangas",
          },
          foco: "50% 40%",
        },
        {
          nome: "Vestido de Alça em Viscose Verde-Água",
          preco: 14990,
          tamanhos: ["P", "M", "G", "GG"],
          esgotados: ["GG"],
          selo: "Novo",
          imagem: {
            src: femVestidoAlcas,
            alt: "Vestido longo de alças finas verde-água, com elástico na cintura",
          },
          foco: "50% 30%",
        },
        {
          nome: "Vestido Chemise Terracota",
          preco: 16990,
          tamanhos: ["P", "M", "G", "GG"],
          imagem: {
            src: femChemise,
            alt: "Vestido chemise terracota de manga curta, com botões e faixa na cintura",
          },
          foco: "50% 30%",
        },
        {
          nome: "Cardigan de Tricô Off-White",
          preco: 15990,
          precoAntigo: 18990,
          tamanhos: ["P", "M", "G", "GG"],
          esgotados: ["P"],
          imagem: {
            src: femCardigan,
            alt: "Mulher de cardigan de tricô off-white com botões",
          },
          foco: "50% 30%",
        },
        {
          nome: "Jaqueta Jeans Clássica",
          preco: 23990,
          tamanhos: ["PP", "P", "M", "G", "GG"],
          imagem: {
            src: femJaquetaJeans,
            alt: "Mulher de jaqueta jeans azul-clara e calça jeans",
          },
          foco: "50% 25%",
        },
      ],
    },
    {
      id: "masculino",
      nome: "Masculino",
      chamada: "Camisetas, polos, linho e jeans para usar a semana inteira.",
      banner: {
        src: masculinoBanner,
        alt: "Homem de camisa polo lilás e calça preta",
        titulo: "Básicos masculinos",
        foco: "50% 25%",
      },
      pecas: [
        {
          nome: "Camiseta Básica de Algodão Branca",
          preco: 4990,
          tamanhos: ["P", "M", "G", "GG"],
          selo: "Mais vendida",
          imagem: {
            src: mascCamiseta,
            alt: "Homem de camiseta branca de algodão, gola careca",
          },
        },
        {
          nome: "Polo de Piquet Azul-Claro",
          preco: 8990,
          precoAntigo: 10990,
          tamanhos: ["P", "M", "G", "GG"],
          esgotados: ["P"],
          imagem: {
            src: mascPolo,
            alt: "Homem de camisa polo azul-clara e calça preta",
          },
          foco: "50% 25%",
        },
        {
          nome: "Camisa de Linho Manga Curta",
          preco: 14990,
          tamanhos: ["P", "M", "G", "GG"],
          selo: "Novo",
          imagem: {
            src: mascCamisaLinho,
            alt: "Camisa de linho azul-acinzentada de manga curta, pendurada num cabide",
          },
          foco: "50% 35%",
        },
        {
          nome: "Jaqueta Jeans Forrada",
          preco: 24990,
          tamanhos: ["P", "M", "G", "GG"],
          esgotados: ["GG"],
          imagem: {
            src: mascJaquetaJeans,
            alt: "Homem de jaqueta jeans com forro claro e óculos escuros",
          },
          foco: "50% 30%",
        },
        {
          nome: "Calça Chino Bege",
          preco: 15990,
          tamanhos: ["P", "M", "G", "GG"],
          imagem: {
            src: mascChino,
            alt: "Homem de camiseta preta e calça chino bege",
          },
          foco: "50% 45%",
        },
        {
          nome: "Suéter de Tricô Preto",
          preco: 16990,
          precoAntigo: 19990,
          tamanhos: ["P", "M", "G", "GG"],
          imagem: {
            src: mascSueter,
            alt: "Homem de suéter de tricô preto e calça preta",
          },
          foco: "50% 30%",
        },
      ],
    },
  ],
  comoComprar: [
    {
      titulo: "Escolha a peça e o tamanho",
      texto: "Deslize as vitrines e toque no tamanho que você usa.",
    },
    {
      titulo: "Peça pelo WhatsApp",
      texto:
        "A mensagem já vai com a peça, o tamanho e o preço. A loja confirma na hora.",
    },
    {
      titulo: "Retire ou receba",
      texto: "Separe para retirar em 1 hora ou receba no bairro no mesmo dia.",
    },
  ],
  expediente: [
    { dias: [1, 2, 3, 4, 5], abre: "09:00", fecha: "19:00" },
    { dias: [6], abre: "09:00", fecha: "17:00" },
  ],
  endereco: {
    logradouro: "Rua das Palmeiras, 128",
    bairro: "Centro",
    referencia: "Provador amplo e estacionamento ao lado",
  },
  redes: ["instagram", "tiktok", "pinterest", "facebook"],
};
