import bebida from "@/public/imagens/tabacaria/bebida.jpg";
import isqueiroMadeira from "@/public/imagens/tabacaria/isqueiro-madeira.jpg";
import loungeAbajur from "@/public/imagens/tabacaria/lounge-abajur.jpg";
import loungeArco from "@/public/imagens/tabacaria/lounge-arco.jpg";
import madeira from "@/public/imagens/tabacaria/madeira.jpg";
import poltronaLareira from "@/public/imagens/tabacaria/poltrona-lareira.jpg";
import poltrona from "@/public/imagens/tabacaria/poltrona.jpg";
import salaGlobo from "@/public/imagens/tabacaria/sala-globo.jpg";
import tabaqueira from "@/public/imagens/tabacaria/tabaqueira.jpg";
import tacas from "@/public/imagens/tabacaria/tacas.jpg";
import type { DadosDaTabacaria } from "./tipos";

// ATENÇÃO: conteúdo fictício para demonstração. Antes de publicar o site de
// um cliente real, o conteúdo final deve ser validado por ele quanto às regras
// vigentes, em especial:
// - Anvisa, RDC nº 855/2024: proibido exibir cigarros eletrônicos, vapes, pods
//   ou essências para vape;
// - Lei nº 9.294/1996: restrições à propaganda de produtos de tabaco (sem
//   ofertas, preços promocionais, "mais vendidos" ou chamadas ao consumo);
// - nenhuma venda ou pedido online de produtos de tabaco;
// - imagens sem pessoas fumando e sem associar o fumo a sucesso, esporte,
//   sensualidade, juventude ou bem-estar.
// Fotos do Unsplash (licença livre), salvas localmente.

export const tabacaria: DadosDaTabacaria = {
  nicho: "tabacaria",
  rotulo: "Tabacaria",
  padrao: {
    nome: "Tabacaria Âmbar",
    cor: "#c4874f",
    fundo: "#120e0b",
  },
  descricao:
    "Acessórios, bebidas e conveniência, com atendimento sem pressa e um lounge para conversar.",
  slogan: "Escolha com calma. A casa é sua.",
  chamada:
    "Acessórios, bebidas e conveniência, com atendimento de quem entende do assunto e um lounge confortável para esperar e conversar.",
  navegacao: [
    { rotulo: "A loja", href: "#loja" },
    { rotulo: "O lounge", href: "#lounge" },
    { rotulo: "Galeria", href: "#galeria" },
    { rotulo: "Contato", href: "#contato" },
  ],
  acaoPrincipal: {
    rotulo: "Falar com a loja",
    pedido: "Gostaria de falar com a loja.",
  },
  imagemPrincipal: {
    src: loungeArco,
    alt: "Lounge em penumbra com duas poltronas de couro diante de um arco iluminado",
  },
  imagemMadeira: {
    src: madeira,
    alt: "",
  },
  categorias: [
    {
      nome: "Sedas",
      descricao: "Diversos tamanhos e espessuras, avulsas e em caixa.",
    },
    { nome: "Piteiras", descricao: "De papel, vidro e madeira." },
    {
      nome: "Isqueiros",
      descricao: "Recarregáveis, maçaricos e modelos clássicos de coleção.",
    },
    {
      nome: "Cinzeiros",
      descricao: "De vidro, metal e cerâmica, para casa e para a varanda.",
    },
    {
      nome: "Tabaqueiras",
      descricao: "Estojos e porta-objetos de couro e tecido.",
    },
    {
      nome: "Acessórios de narguilé",
      descricao: "Mangueiras, rosh, piteiras e peças de reposição.",
    },
    {
      nome: "Bebidas e conveniência",
      descricao: "Água, refrigerantes, energéticos, café e destilados.",
    },
  ],
  imagensDaLoja: [
    {
      src: tabaqueira,
      alt: "Tabaqueira de couro caramelo com botão de pressão, sobre fundo escuro",
    },
    {
      src: isqueiroMadeira,
      alt: "Isqueiro de metal aberto, com a chama acesa, sobre uma mesa de madeira escura",
    },
  ],
  lounge: {
    paragrafos: [
      "Nos fundos da loja fica o lounge: poltronas de couro, luz baixa e mesas para conversar enquanto você espera ou escolhe um presente.",
      "O atendimento é sem pressa. A gente mostra as peças, explica as diferenças entre os modelos e ajuda a montar um kit sob medida.",
    ],
    comodidades: [
      "Poltronas e mesas para conversar",
      "Café, água e bebidas geladas",
      "Wi-fi e ar-condicionado",
      "Embalagem para presente",
    ],
    imagem: {
      src: loungeAbajur,
      alt: "Canto do lounge com poltronas de couro, abajur aceso e uma palmeira",
    },
  },
  galeria: [
    {
      src: salaGlobo,
      alt: "Sofá sob um abajur e um globo iluminado, com um mapa-múndi na parede",
    },
    {
      src: poltrona,
      alt: "Poltrona capitonê de couro verde ao lado de uma planta",
    },
    { src: tacas, alt: "Duas taças e uma vela acesa sobre o balcão" },
    { src: bebida, alt: "Copo baixo com gelo sobre uma mesa de mármore" },
    {
      src: poltronaLareira,
      alt: "Poltrona de couro ao lado de uma lareira, em ambiente escuro",
    },
  ],
  avisos: {
    maioridade: "Venda proibida para menores de 18 anos.",
    saude:
      "O Ministério da Saúde adverte: fumar causa câncer de pulmão, doenças do coração e outras doenças graves.",
  },
  expediente: [
    { dias: [1, 2, 3, 4, 5], abre: "10:00", fecha: "22:00" },
    { dias: [6], abre: "10:00", fecha: "23:00" },
    { dias: [0], abre: "14:00", fecha: "20:00" },
  ],
  endereco: {
    logradouro: "Rua Augusta Teixeira, 412",
    bairro: "Centro",
    referencia: "Ao lado da galeria, entrada pela porta de madeira",
  },
  redes: ["instagram", "facebook"],
};
