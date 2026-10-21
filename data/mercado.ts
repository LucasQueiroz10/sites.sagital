import acucar from "@/public/imagens/mercado/acucar.jpg";
import arroz from "@/public/imagens/mercado/arroz.jpg";
import banana from "@/public/imagens/mercado/banana.jpg";
import cafe from "@/public/imagens/mercado/cafe.jpg";
import carne from "@/public/imagens/mercado/carne.jpg";
import detergente from "@/public/imagens/mercado/detergente.jpg";
import feijao from "@/public/imagens/mercado/feijao.jpg";
import hortifruti from "@/public/imagens/mercado/hortifruti.jpg";
import leite from "@/public/imagens/mercado/leite.jpg";
import oleo from "@/public/imagens/mercado/oleo.jpg";
import ovos from "@/public/imagens/mercado/ovos.jpg";
import pao from "@/public/imagens/mercado/pao.jpg";
import tomate from "@/public/imagens/mercado/tomate.jpg";
import type { DadosDoMercado } from "./tipos";

// Conteúdo fictício, sem marcas reais. Fotos do Unsplash (licença livre),
// salvas localmente. Se uma oferta ficar sem foto, aparece o nome em amarelo.

export const mercado: DadosDoMercado = {
  nicho: "mercado",
  rotulo: "Mercado",
  padrao: {
    nome: "Mercado Ponto Certo",
    cor: "#e0101b",
    fundo: "#ffffff",
  },
  descricao: "Ofertas da semana, entrega no mesmo dia e pedido pelo WhatsApp.",
  chamada:
    "Peça pelo WhatsApp até as 18h e receba hoje. Entrega grátis em compras acima de R$ 150.",
  navegacao: [
    { rotulo: "Ofertas", href: "#ofertas" },
    { rotulo: "Corredores", href: "#corredores" },
    { rotulo: "Entrega", href: "#entrega" },
    { rotulo: "Contato", href: "#contato" },
  ],
  acaoPrincipal: {
    rotulo: "Fazer pedido",
    pedido: "Quero fazer um pedido.",
  },
  ofertas: [
    {
      produto: "Banana prata",
      unidade: "kg",
      precoAntigo: 799,
      precoNovo: 499,
      imagem: { src: banana, alt: "Banana prata madura" },
      destaque: true,
    },
    {
      produto: "Contrafilé",
      unidade: "kg",
      precoAntigo: 5490,
      precoNovo: 4290,
      imagem: { src: carne, alt: "Cortes de carne bovina crua" },
      destaque: true,
    },
    {
      produto: "Tomate",
      unidade: "kg",
      precoAntigo: 949,
      precoNovo: 599,
      imagem: { src: tomate, alt: "Três tomates vermelhos no cacho" },
      destaque: true,
    },
    {
      produto: "Arroz branco tipo 1",
      unidade: "pacote de 5 kg",
      precoAntigo: 2990,
      precoNovo: 2290,
      imagem: { src: arroz, alt: "Tigela de barro com arroz branco cru" },
    },
    {
      produto: "Café torrado e moído",
      unidade: "500 g",
      precoAntigo: 3290,
      precoNovo: 2490,
      imagem: { src: cafe, alt: "Grãos de café torrados" },
    },
    {
      produto: "Ovos brancos",
      unidade: "bandeja com 30",
      precoAntigo: 2490,
      precoNovo: 1890,
      imagem: { src: ovos, alt: "Três ovos" },
    },
    {
      produto: "Pão francês",
      unidade: "kg",
      precoAntigo: 1790,
      precoNovo: 1390,
      imagem: { src: pao, alt: "Pães franceses sobre um pano de prato" },
    },
    {
      produto: "Feijão carioca",
      unidade: "1 kg",
      precoAntigo: 999,
      precoNovo: 749,
      imagem: { src: feijao, alt: "Grãos de feijão carioca" },
    },
    {
      produto: "Óleo de soja",
      unidade: "900 ml",
      precoAntigo: 849,
      precoNovo: 679,
      imagem: { src: oleo, alt: "Duas garrafas de óleo" },
    },
    {
      produto: "Açúcar refinado",
      unidade: "5 kg",
      precoAntigo: 2490,
      precoNovo: 1990,
      imagem: { src: acucar, alt: "Cubos de açúcar empilhados" },
    },
    {
      produto: "Leite integral",
      unidade: "caixa de 1 litro",
      precoAntigo: 649,
      precoNovo: 499,
      imagem: { src: leite, alt: "Caneca de vidro com leite" },
    },
    {
      produto: "Detergente líquido",
      unidade: "500 ml",
      precoAntigo: 299,
      precoNovo: 199,
      imagem: {
        src: detergente,
        alt: "Frascos de sabão líquido verde com válvula",
      },
    },
  ],
  corredores: [
    {
      numero: 1,
      nome: "Hortifrúti",
      exemplos: "Frutas, verduras e legumes chegando toda manhã",
      icone: "hortifruti",
      cor: "#1f7a3a",
    },
    {
      numero: 2,
      nome: "Açougue",
      exemplos: "Carnes cortadas na hora, frango e linguiças",
      icone: "acougue",
      cor: "#9b2c1f",
    },
    {
      numero: 3,
      nome: "Padaria",
      exemplos: "Pão francês às 7h e às 16h, bolos e salgados",
      icone: "padaria",
      cor: "#c2410c",
    },
    {
      numero: 4,
      nome: "Mercearia",
      exemplos: "Arroz, feijão, massas, óleo e enlatados",
      icone: "mercearia",
      cor: "#f5b800",
    },
    {
      numero: 5,
      nome: "Frios e laticínios",
      exemplos: "Queijos fatiados na hora, iogurtes e manteiga",
      icone: "laticinios",
      cor: "#1d4ed8",
    },
    {
      numero: 6,
      nome: "Bebidas",
      exemplos: "Sucos, refrigerantes, água e cervejas geladas",
      icone: "bebidas",
      cor: "#6d28d9",
    },
    {
      numero: 7,
      nome: "Limpeza",
      exemplos: "Sabão, desinfetante, esponjas e papel",
      icone: "limpeza",
      cor: "#0f766e",
    },
    {
      numero: 8,
      nome: "Congelados",
      exemplos: "Pratos prontos, sorvetes e vegetais congelados",
      icone: "congelados",
      cor: "#0369a1",
    },
  ],
  entrega: {
    linhas: [
      { item: "Pedido pelo WhatsApp", valor: "até 18h" },
      { item: "Entrega", valor: "no mesmo dia" },
      { item: "Taxa no bairro", valor: "R$ 7,90" },
      { item: "Compras acima de R$ 150", valor: "grátis" },
      { item: "Retirada na loja", valor: "em 1 hora" },
    ],
    pagamento: "Pix, cartão ou dinheiro na entrega",
  },
  imagemDaLoja: {
    src: hortifruti,
    alt: "Banca de hortifrúti com tomates, pimentões, batatas e cebolinha",
  },
  expediente: [
    { dias: [1, 2, 3, 4, 5, 6], abre: "07:00", fecha: "21:00" },
    { dias: [0], abre: "07:00", fecha: "13:00" },
  ],
  endereco: {
    logradouro: "Rua do Comércio, 315",
    bairro: "Vila Nova",
    referencia: "Estacionamento gratuito para clientes",
  },
};
