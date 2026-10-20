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
  chamada: string;
  imagemPrincipal: Imagem;
  imagemFinal: Imagem;
  planos: Plano[];
  grade: Aula[];
  modalidades: Modalidade[];
  depoimentos: Depoimento[];
};
