import type { StaticImageData } from "next/image";
import type { Aula, Expediente } from "@/lib/agenda";
import type { PadraoDoTema } from "@/lib/tema";

export type Imagem = {
  src: StaticImageData;
  /** Descrição do que a foto mostra, para leitores de tela. */
  alt: string;
};

export type LinkDeNavegacao = { rotulo: string; href: `#${string}` };

export type Endereco = {
  logradouro: string;
  bairro: string;
  referencia?: string;
};

export type Depoimento = {
  texto: string;
  /** Quem fala, descrito pelo perfil e nunca por um nome real. */
  autoria: string;
};

/** Pedido que vai pronto na mensagem do WhatsApp, e o texto do botão. */
export type AcaoWhatsApp = { rotulo: string; pedido: string };

/** O que todo demo tem em comum. */
export type DadosDoNicho = {
  nicho: string;
  /** Nome do nicho no título da aba e na mensagem do WhatsApp. */
  rotulo: string;
  padrao: PadraoDoTema;
  descricao: string;
  navegacao: LinkDeNavegacao[];
  acaoPrincipal: AcaoWhatsApp;
  expediente: Expediente[];
  endereco: Endereco;
};

export type Plano = {
  nome: string;
  /** Valor mensal em centavos. */
  precoMensal: number;
  /** Como o valor é cobrado, ex.: "12x no cartão". */
  cobranca: string;
  inclui: string[];
  destaque?: string;
};

export type Modalidade = {
  nome: string;
  descricao: string;
  imagem: Imagem;
  /** Nome usado na grade de aulas, para contar as aulas da semana. */
  naGrade?: string[];
  rodape?: string;
};

export type DadosDaAcademia = DadosDoNicho & {
  slogan: string;
  /** Final do slogan que vai na cor do cliente; precisa estar no slogan. */
  destaqueDoSlogan: string;
  chamada: string;
  /** Um fato curto da estrutura, na faixa abaixo do topo. */
  diferencial: { titulo: string; detalhe: string };
  imagemPrincipal: Imagem;
  imagemFinal: Imagem;
  planos: Plano[];
  grade: Aula[];
  modalidades: Modalidade[];
  depoimentos: Depoimento[];
};

export type Tamanho = "PP" | "P" | "M" | "G" | "GG";

export type Peca = {
  nome: string;
  /** Centavos. */
  preco: number;
  /** Preço de antes, em centavos, quando a peça está em promoção. */
  precoAntigo?: number;
  /** Tamanhos da grade da peça, do menor para o maior. */
  tamanhos: Tamanho[];
  /** Tamanhos da grade que acabaram na loja. */
  esgotados?: Tamanho[];
  /** Selo curto sobre a foto, ex.: "Novo". */
  selo?: string;
  imagem: Imagem;
  /** Ponto da foto que fica no recorte 3:4 (object-position). */
  foco?: string;
};

export type Setor = {
  /** Âncora da seção, ex.: "feminino". */
  id: string;
  nome: string;
  /** Linha de apoio abaixo do título. */
  chamada: string;
  /** Foto de abertura da prateleira, com a etiqueta de vidro. */
  banner: Imagem & { titulo: string; foco?: string };
  pecas: Peca[];
};

export type IconeDoBeneficio = "troca" | "parcelas" | "retirada" | "entrega";

export type DadosDoVarejo = DadosDoNicho & {
  slogan: string;
  /** Início da linha do topo; a página completa com "a partir de" o menor preço. */
  chamada: string;
  campanha: Imagem;
  beneficios: { texto: string; icone: IconeDoBeneficio }[];
  /** Parcelas sem juros no cartão e o valor mínimo de cada uma, em centavos. */
  parcelamento: { vezes: number; parcelaMinima: number };
  setores: Setor[];
  comoComprar: { titulo: string; texto: string }[];
};

export type ItemDoCardapio = {
  nome: string;
  descricao?: string;
  /** Centavos. */
  preco: number;
  vegetariano?: boolean;
};

export type CategoriaDoCardapio = {
  id: string;
  nome: string;
  itens: ItemDoCardapio[];
};

export type DadosDoRestaurante = DadosDoNicho & {
  slogan: string;
  chamada: string;
  imagemPrincipal: Imagem;
  delivery: { rotulo: string; url: string };
  cardapio: CategoriaDoCardapio[];
  casa: { paragrafos: string[]; imagem: Imagem; destaque: string };
  /** Cinco fotos: a primeira ocupa duas linhas no desktop e a grade fecha certinha. */
  galeria: Imagem[];
  /** Pessoas por mesa no formulário de reserva; o último vale "ou mais". */
  pessoas: number[];
};

export type DadosDaTabacaria = DadosDoNicho & {
  slogan: string;
  chamada: string;
  imagemPrincipal: Imagem;
  /** Textura de madeira do aviso de maioridade. */
  imagemMadeira: Imagem;
  categorias: { nome: string; descricao: string }[];
  imagensDaLoja: Imagem[];
  lounge: { paragrafos: string[]; comodidades: string[]; imagem: Imagem };
  /** Cinco fotos do ambiente e dos acessórios, sem pessoas fumando. */
  galeria: Imagem[];
  avisos: { maioridade: string; saude: string };
};
