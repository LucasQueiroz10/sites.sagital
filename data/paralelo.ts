/**
 * Paralelo: fintech fictícia de pagamentos internacionais, terceiro site
 * premium. A abertura vem de um modelo em inglês ("Cross-border finance") com
 * o globo em vídeo; o resto do site foi escrito a partir dele. Cotações,
 * tarifas, números e endereço são de exemplo.
 */

import type { DadosDoRodape } from "./tipos";

export const nome = "Paralelo";

export const navegacao = [
  { rotulo: "Produtos", href: "#produtos" },
  { rotulo: "Preços", href: "#precos" },
  { rotulo: "Desenvolvedores", href: "#desenvolvedores" },
  { rotulo: "Recursos", href: "#recursos" },
  { rotulo: "Fale com vendas", href: "#vendas" },
] as const;

/** O vídeo do globo e o quadro que aparece enquanto ele carrega. */
export const globo = {
  video:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104036_bd6924f6-3c8e-417e-8465-6d03c8c2e9e6.mp4",
  quadro:
    "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/82e7eb75-c65f-490a-99b5-f3d1cad54200.webp",
  descricao:
    "Globo terrestre desenhado em pontos roxos sobre um céu de estrelas, girando devagar",
} as const;

export const numeros = [
  { valor: "R$ 2,4 bi", legenda: "movimentados por ano" },
  { valor: "34", legenda: "moedas e 6 stablecoins" },
  { valor: "180", legenda: "países para receber e pagar" },
  { valor: "D+0", legenda: "liquidação em reais" },
] as const;

export const produtos = [
  {
    id: "receber",
    titulo: "Receber do exterior",
    texto:
      "Link de pagamento, fatura em dólar ou euro e cartão internacional. O dinheiro cai em reais ou fica na moeda que você escolher.",
    itens: ["Fatura em 34 moedas", "Cartão internacional", "Câmbio de exportação com IOF zero"],
  },
  {
    id: "enviar",
    titulo: "Pagar lá fora",
    texto:
      "Fornecedores, freelancers e assinaturas em 180 países, com a cotação travada no momento do envio.",
    itens: ["Cotação travada", "Pagamentos em lote", "Comprovante para o contador"],
  },
  {
    id: "conta",
    titulo: "Conta multimoeda",
    texto:
      "Saldo em real, dólar, euro e libra, e USDC ou USDT guardados com custódia própria, sem abrir conta em corretora.",
    itens: ["Custódia de stablecoins", "Conversão entre saldos", "Pix para entrar e sair"],
  },
  {
    id: "checkout",
    titulo: "Checkout global",
    texto:
      "Sua loja vendendo para o mundo: Pix para quem é daqui, cartão e cripto para quem é de fora, tudo no mesmo extrato.",
    itens: ["Plugins para as lojas mais usadas", "Preço na moeda do cliente", "Antifraude incluso"],
  },
] as const;

export type IdDoPlano = "inicio" | "negocio" | "escala";

export const planos: {
  id: IdDoPlano;
  nome: string;
  /** Mensalidade em reais; null é "sob consulta". */
  mensal: number | null;
  tarifa: number;
  resumo: string;
  itens: string[];
  chamada: string;
  destaque?: boolean;
}[] = [
  {
    id: "inicio",
    nome: "Início",
    mensal: 0,
    tarifa: 0.012,
    resumo: "Para quem está começando a vender para fora.",
    itens: [
      "Até US$ 10 mil por mês",
      "Conta em real e dólar",
      "Link de pagamento e fatura",
      "Suporte por chat",
    ],
    chamada: "Abrir conta grátis",
  },
  {
    id: "negocio",
    nome: "Negócio",
    mensal: 189,
    tarifa: 0.007,
    resumo: "Para empresas que recebem e pagam lá fora todo mês.",
    itens: [
      "Sem limite mensal",
      "34 moedas e stablecoins",
      "Checkout global e pagamentos em lote",
      "Até 5 pessoas na conta",
    ],
    chamada: "Começar com o Negócio",
    destaque: true,
  },
  {
    id: "escala",
    nome: "Escala",
    mensal: null,
    tarifa: 0.003,
    resumo: "Para operações grandes ou que integram pela API.",
    itens: [
      "Tarifa negociada por volume",
      "API com limites dedicados",
      "Gerente de conta",
      "Liquidação D+0 garantida",
    ],
    chamada: "Falar com vendas",
  },
];

/** No plano anual, dois meses saem de graça. */
export const DESCONTO_ANUAL = 2 / 12;

export const recursosDaApi = [
  {
    titulo: "API REST e webhooks assinados",
    texto: "Cobranças, pagamentos e saldos por HTTP, com aviso na hora em que o dinheiro entra.",
  },
  {
    titulo: "Ambiente de testes",
    texto: "Chaves de teste com saldo de mentira em todas as moedas, para integrar sem risco.",
  },
  {
    titulo: "Bibliotecas prontas",
    texto: "Node, Python e PHP, além dos plugins de loja virtual.",
  },
] as const;

export const exemplosDaApi = [
  {
    id: "curl",
    rotulo: "cURL",
    codigo: `curl https://api.paralelo.exemplo/v1/cobrancas \\
  -H "Authorization: Bearer chave_teste_4eC39HqLyjWD" \\
  -d valor=1500.00 \\
  -d moeda=USD \\
  -d liquidar_em=BRL \\
  -d descricao="Projeto de identidade visual"`,
  },
  {
    id: "node",
    rotulo: "Node",
    codigo: `import Paralelo from "@paralelo/node";

const paralelo = new Paralelo(process.env.PARALELO_CHAVE);

const cobranca = await paralelo.cobrancas.criar({
  valor: 1500.0,
  moeda: "USD",
  liquidarEm: "BRL",
  descricao: "Projeto de identidade visual",
});

console.log(cobranca.link);`,
  },
  {
    id: "python",
    rotulo: "Python",
    codigo: `import os
import paralelo

cliente = paralelo.Cliente(os.environ["PARALELO_CHAVE"])

cobranca = cliente.cobrancas.criar(
    valor=1500.00,
    moeda="USD",
    liquidar_em="BRL",
    descricao="Projeto de identidade visual",
)

print(cobranca.link)`,
  },
] as const;

export const respostaDaApi = `{
  "id": "cob_7Hq2Lx",
  "status": "aguardando_pagamento",
  "valor": 1500.00,
  "moeda": "USD",
  "liquidar_em": "BRL",
  "link": "https://pague.paralelo.exemplo/7Hq2Lx"
}`;

export const perguntas = [
  {
    pergunta: "A Paralelo é um banco?",
    resposta:
      "Não. É uma conta de pagamentos internacionais: o câmbio é fechado com corretoras parceiras autorizadas a operar no Brasil, e o seu saldo fica separado do dinheiro da empresa.",
  },
  {
    pergunta: "Quanto tempo o dinheiro leva para chegar?",
    resposta:
      "Entre saldos da própria conta, na hora. Pagamento recebido do exterior cai em reais no mesmo dia útil (D+0). Envios para fora chegam em até um dia útil na maioria dos países.",
  },
  {
    pergunta: "Preciso declarar o que recebo do exterior?",
    resposta:
      "Sim, como qualquer receita da empresa. Cada operação gera um comprovante de câmbio pronto para o contador, e a exportação de serviços tem IOF zero.",
  },
  {
    pergunta: "Por que guardar saldo em stablecoin?",
    resposta:
      "USDC e USDT acompanham o dólar e se movem a qualquer hora, inclusive no fim de semana. São úteis para pagar quem já recebe em cripto ou para manter reserva em dólar sem conta lá fora.",
  },
  {
    pergunta: "Tem custo para abrir ou manter a conta?",
    resposta:
      "No plano Início, não: você paga só a tarifa de cada operação. Os planos Negócio e Escala têm mensalidade e tarifas menores.",
  },
  {
    pergunta: "Como a conta é protegida?",
    resposta:
      "Login com verificação em duas etapas, aprovação de pagamentos por mais de uma pessoa, limites por usuário e alerta a cada movimentação.",
  },
] as const;

export const volumes = [
  "Ainda não recebo nem pago lá fora",
  "Até US$ 10 mil por mês",
  "De US$ 10 mil a US$ 100 mil por mês",
  "Mais de US$ 100 mil por mês",
] as const;

export const interesses = [
  "Receber do exterior",
  "Pagar lá fora",
  "Conta multimoeda",
  "Checkout global",
  "API",
] as const;

export const rodape: DadosDoRodape = {
  descricao:
    "Conta para empresas brasileiras que recebem, pagam e guardam dinheiro em outras moedas.",
  endereco: "Rodovia SC-401, 4100, sala 702",
  bairro: "Saco Grande, Florianópolis",
  horarios: ["Atendimento de segunda a sexta, das 8h às 20h"],
  email: "ola@paralelo.exemplo",
  redes: ["linkedin", "instagram", "youtube"],
  legais: ["CNPJ 00.000.000/0001-00 (fictício)"],
};
