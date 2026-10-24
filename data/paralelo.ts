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

/**
 * Os números logo abaixo do globo. Cada um conta de `de` até `valor` quando
 * aparece na tela; a liquidação conta para baixo, de D+3 até D+0.
 */
export const numeros: {
  valor: number;
  legenda: string;
  de?: number;
  casas?: number;
  prefixo?: string;
  sufixo?: string;
}[] = [
  {
    prefixo: "R$ ",
    valor: 2.4,
    casas: 1,
    sufixo: " bi",
    legenda: "movimentados por ano",
  },
  { valor: 34, legenda: "moedas e 6 stablecoins" },
  { valor: 180, legenda: "países para receber e pagar" },
  { prefixo: "D+", valor: 0, de: 3, legenda: "liquidação em reais" },
];

export const produtos = [
  {
    id: "receber",
    titulo: "Receber do exterior",
    texto:
      "Link de pagamento, fatura em dólar ou euro e cartão internacional. O dinheiro cai em reais ou fica na moeda que você escolher.",
    itens: [
      "Fatura em 34 moedas",
      "Cartão internacional",
      "Câmbio de exportação com IOF zero",
    ],
  },
  {
    id: "enviar",
    titulo: "Pagar lá fora",
    texto:
      "Fornecedores, freelancers e assinaturas em 180 países, com a cotação travada no momento do envio.",
    itens: [
      "Cotação travada",
      "Pagamentos em lote",
      "Comprovante para o contador",
    ],
  },
  {
    id: "conta",
    titulo: "Conta multimoeda",
    texto:
      "Saldo em real, dólar, euro e libra, e USDC ou USDT guardados com custódia própria, sem abrir conta em corretora.",
    itens: [
      "Custódia de stablecoins",
      "Conversão entre saldos",
      "Pix para entrar e sair",
    ],
  },
  {
    id: "checkout",
    titulo: "Checkout global",
    texto:
      "Sua loja vendendo para o mundo: Pix para quem é daqui, cartão e cripto para quem é de fora, tudo no mesmo extrato.",
    itens: [
      "Plugins para as lojas mais usadas",
      "Preço na moeda do cliente",
      "Antifraude incluso",
    ],
  },
] as const;

/** O endereço do site; as páginas internas ficam abaixo dele. */
export const raiz = "/premium/paralelo";

/** As páginas internas, na ordem da barra e do rodapé. */
export const paginas = [
  { rotulo: "Produtos", href: `${raiz}/produtos` },
  { rotulo: "Como funciona", href: `${raiz}/como-funciona` },
  { rotulo: "Preços", href: `${raiz}/precos` },
  { rotulo: "Desenvolvedores", href: `${raiz}/desenvolvedores` },
] as const;

export type IdDoPlano = "inicio" | "negocio" | "escala";

export type Plano = {
  id: IdDoPlano;
  nome: string;
  /** Mensalidade em reais; null é "sob consulta". */
  mensal: number | null;
  tarifa: number;
  resumo: string;
  itens: string[];
  chamada: string;
  destaque?: boolean;
  /** A frase de abertura da página do plano. */
  apresentacao: string;
  paraQuem: string;
  idealPara: string[];
  naoIndicado: string[];
  /** O mês de exemplo da página do plano, em dólares. */
  mesDeExemplo: { recebe: number; paga: number; quem: string };
};

export const planos: Plano[] = [
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
    apresentacao:
      "A conta para receber os primeiros clientes de fora sem pagar nada por mês.",
    paraQuem:
      "Freelancers com CNPJ, estúdios pequenos e quem fecha os primeiros contratos em dólar. Você paga só a tarifa de cada operação.",
    idealPara: [
      "Receber de dois ou três clientes no exterior",
      "Mandar fatura em dólar pelo link",
      "Testar a Paralelo antes de levar a operação toda",
    ],
    naoIndicado: [
      "Quem movimenta mais de US$ 10 mil por mês",
      "Equipes que dividem a conta",
      "Lojas que vendem para fora pelo checkout",
    ],
    mesDeExemplo: {
      recebe: 4200,
      paga: 0,
      quem: "Uma designer que recebe de dois clientes nos Estados Unidos",
    },
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
    apresentacao:
      "Receber, pagar e vender em outras moedas todo mês, com a tarifa caindo quase pela metade.",
    paraQuem:
      "Empresas que exportam serviço, importam insumo ou vendem online para fora. A mensalidade se paga a partir de uns US$ 7 mil movimentados por mês.",
    idealPara: [
      "Agências e software house com clientes lá fora",
      "Lojas virtuais vendendo para outros países",
      "Quem paga fornecedores em dólar ou euro",
      "Equipes de até cinco pessoas com aprovação em dupla",
    ],
    naoIndicado: [
      "Quem recebe pouco e de vez em quando (o Início sai mais barato)",
      "Operações acima de US$ 500 mil por mês",
      "Integrações que precisam de limites dedicados na API",
    ],
    mesDeExemplo: {
      recebe: 28000,
      paga: 9500,
      quem: "Uma software house com clientes nos Estados Unidos e na Europa",
    },
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
    apresentacao:
      "Tarifa negociada, API sem fila e uma pessoa da Paralelo cuidando da sua conta.",
    paraQuem:
      "Marketplaces, plataformas e empresas que movimentam centenas de milhares de dólares por mês. A proposta sai do volume e do jeito que você integra.",
    idealPara: [
      "Plataformas que pagam vendedores em vários países",
      "Exportadores com volume alto e previsível",
      "Quem integra cobranças e pagamentos pela API",
    ],
    naoIndicado: [
      "Quem ainda está validando a venda para fora",
      "Volumes abaixo de US$ 100 mil por mês",
    ],
    mesDeExemplo: {
      recebe: 240000,
      paga: 180000,
      quem: "Um marketplace que paga vendedores em doze países",
    },
  },
];

type Celula = boolean | string;

/** A tabela "lado a lado" da página de preços: um valor por plano. */
export const comparacaoDosPlanos: {
  grupo: string;
  linhas: { nome: string; valores: [Celula, Celula, Celula] }[];
}[] = [
  {
    grupo: "Custos",
    linhas: [
      { nome: "Mensalidade", valores: ["Grátis", "R$ 189", "Sob consulta"] },
      {
        nome: "Tarifa por operação de câmbio",
        valores: ["1,2%", "0,7%", "A partir de 0,3%"],
      },
      { nome: "Pix em reais", valores: ["Grátis", "Grátis", "Grátis"] },
      { nome: "Abertura da conta", valores: ["Grátis", "Grátis", "Grátis"] },
    ],
  },
  {
    grupo: "Conta",
    linhas: [
      {
        nome: "Limite por mês",
        valores: ["US$ 10 mil", "Sem limite", "Sem limite"],
      },
      { nome: "Moedas", valores: ["Real e dólar", "34 moedas", "34 moedas"] },
      { nome: "Saldo em USDC e USDT", valores: [false, true, true] },
      { nome: "Pessoas na conta", valores: ["1", "Até 5", "Sem limite"] },
      { nome: "Aprovação em dupla", valores: [false, true, true] },
    ],
  },
  {
    grupo: "Cobrar e vender",
    linhas: [
      { nome: "Link de pagamento e fatura", valores: [true, true, true] },
      { nome: "Cartão internacional", valores: [true, true, true] },
      { nome: "Checkout global", valores: [false, true, true] },
      { nome: "Pagamentos em lote", valores: [false, true, true] },
      {
        nome: "API",
        valores: ["Só testes", "Completa", "Limites dedicados"],
      },
    ],
  },
  {
    grupo: "Atendimento",
    linhas: [
      {
        nome: "Suporte",
        valores: ["Chat", "Chat e telefone", "Gerente de conta"],
      },
      { nome: "Liquidação em reais", valores: ["D+0", "D+0", "D+0 garantida"] },
    ],
  },
];

export const perguntasDosPrecos = [
  {
    pergunta: "A tarifa é cobrada sobre o quê?",
    resposta:
      "Sobre o valor convertido em reais de cada operação de câmbio, na hora em que ela acontece. Movimentar entre saldos na mesma moeda e fazer Pix em reais não paga tarifa.",
  },
  {
    pergunta: "Posso trocar de plano depois?",
    resposta:
      "A qualquer momento, pelo aplicativo. Subir de plano vale na hora; descer vale a partir do mês seguinte, para não cobrar duas mensalidades.",
  },
  {
    pergunta: "Tem fidelidade ou multa?",
    resposta:
      "No mensal, não. No anual, os dois meses de desconto valem pelo ano inteiro, e o cancelamento devolve os meses que faltam.",
  },
  {
    pergunta: "O IOF está incluído na tarifa?",
    resposta:
      "Não, ele é um imposto e aparece separado no comprovante. Receber pagamento de exportação de serviço tem IOF zero; pagar lá fora tem 0,38%.",
  },
  {
    pergunta: "Como funciona o preço do plano Escala?",
    resposta:
      "O time de vendas olha o volume dos últimos meses e as moedas que você usa e manda uma proposta com tarifa fixa por faixa. Leva até dois dias úteis.",
  },
] as const;

/** Os produtos por dentro, na página de produtos: como cada um funciona. */
export const produtosPorDentro: Record<
  (typeof produtos)[number]["id"],
  { passos: { titulo: string; texto: string }[]; exemplo: string }
> = {
  receber: {
    passos: [
      {
        titulo: "Você cria a cobrança",
        texto:
          "Pelo aplicativo ou pela API: valor, moeda e a descrição que vai na fatura.",
      },
      {
        titulo: "O cliente paga como prefere",
        texto:
          "Cartão, transferência local nos Estados Unidos e na Europa, ou stablecoin.",
      },
      {
        titulo: "O dinheiro cai no mesmo dia",
        texto:
          "Em reais na sua conta, ou na moeda de origem se você quiser guardar.",
      },
    ],
    exemplo:
      "Uma fatura de US$ 1.500 paga às 10h vira reais na conta antes das 18h do mesmo dia útil.",
  },
  enviar: {
    passos: [
      {
        titulo: "Cadastre quem vai receber",
        texto:
          "Nome, país e os dados bancários de lá. A Paralelo confere tudo antes do primeiro envio.",
      },
      {
        titulo: "Trave a cotação",
        texto:
          "Você vê o valor exato em reais, com tarifa e IOF, e a cotação fica travada por 30 segundos.",
      },
      {
        titulo: "Acompanhe até chegar",
        texto:
          "O status muda no aplicativo a cada etapa, e o comprovante sai pronto para o contador.",
      },
    ],
    exemplo:
      "Pagar € 2.000 a um fornecedor em Portugal chega em até um dia útil, com o comprovante de câmbio no e-mail.",
  },
  conta: {
    passos: [
      {
        titulo: "Um saldo para cada moeda",
        texto:
          "Real, dólar, euro e libra, mais USDC e USDT, todos no mesmo aplicativo.",
      },
      {
        titulo: "Converta quando quiser",
        texto:
          "Mude de uma moeda para outra na hora, inclusive no fim de semana para as stablecoins.",
      },
      {
        titulo: "Entre e saia por Pix",
        texto:
          "O saldo em reais funciona como qualquer conta: Pix, boleto e TED.",
      },
    ],
    exemplo:
      "Guardar parte do que recebe em dólar e converter só quando a cotação estiver melhor.",
  },
  checkout: {
    passos: [
      {
        titulo: "Instale o plugin ou use a API",
        texto:
          "Plugins prontos para as plataformas de loja mais usadas no Brasil.",
      },
      {
        titulo: "O preço aparece na moeda do cliente",
        texto:
          "Quem compra de Lisboa vê euro; quem compra de São Paulo paga em Pix.",
      },
      {
        titulo: "Um extrato só",
        texto:
          "Pix, cartão e cripto entram no mesmo extrato, com o antifraude olhando cada venda.",
      },
    ],
    exemplo:
      "Uma loja de moda praia passou a vender para Portugal e Argentina sem abrir empresa fora.",
  },
};

/** Abrir a conta, passo a passo (página "Como funciona"). */
export const abertura = [
  {
    prazo: "5 minutos",
    titulo: "Cadastro pelo celular",
    texto:
      "CNPJ, dados de quem representa a empresa e uma selfie com documento. Tudo pelo aplicativo.",
  },
  {
    prazo: "Até 1 dia útil",
    titulo: "Análise da empresa",
    texto:
      "Conferimos o CNPJ, os sócios e a atividade, como pede o Banco Central. Se faltar algo, avisamos pelo WhatsApp.",
  },
  {
    prazo: "Na aprovação",
    titulo: "Conta liberada",
    texto:
      "Os dados para receber em dólar, euro e libra aparecem no aplicativo, junto com o link de pagamento.",
  },
  {
    prazo: "Primeira semana",
    titulo: "Primeira operação acompanhada",
    texto:
      "Alguém do time acompanha a sua primeira cobrança ou o primeiro envio, para tirar dúvida na hora.",
  },
] as const;

export const documentos = [
  "CNPJ ativo (MEI também serve)",
  "Contrato social ou certificado do MEI",
  "Documento com foto de quem representa a empresa",
  "Comprovante de endereço da empresa",
] as const;

/** Os endereços principais da API, na página de desenvolvedores. */
export const enderecosDaApi = [
  {
    metodo: "POST",
    caminho: "/v1/cobrancas",
    texto: "Cria uma cobrança em qualquer moeda",
  },
  {
    metodo: "GET",
    caminho: "/v1/cobrancas/{id}",
    texto: "Consulta o status de uma cobrança",
  },
  {
    metodo: "POST",
    caminho: "/v1/pagamentos",
    texto: "Envia dinheiro para fora com cotação travada",
  },
  {
    metodo: "POST",
    caminho: "/v1/cotacoes",
    texto: "Trava uma cotação por 30 segundos",
  },
  {
    metodo: "GET",
    caminho: "/v1/saldos",
    texto: "Lista os saldos de cada moeda",
  },
  {
    metodo: "POST",
    caminho: "/v1/conversoes",
    texto: "Converte entre saldos da conta",
  },
] as const;

export const eventosDoWebhook = [
  {
    nome: "cobranca.paga",
    texto: "O cliente pagou; o valor já está no saldo.",
  },
  { nome: "cobranca.expirada", texto: "O link venceu sem pagamento." },
  { nome: "pagamento.enviado", texto: "O envio saiu da Paralelo." },
  {
    nome: "pagamento.entregue",
    texto: "O banco de destino confirmou o crédito.",
  },
  { nome: "conversao.concluida", texto: "A troca entre saldos foi feita." },
] as const;

export const integracao = [
  {
    titulo: "Pegue as chaves de teste",
    texto:
      "No aplicativo, em Desenvolvedores. O ambiente de testes tem saldo de mentira em todas as moedas.",
  },
  {
    titulo: "Crie a primeira cobrança",
    texto:
      "Com o exemplo abaixo, em cURL, Node ou Python. A resposta traz o link para o cliente pagar.",
  },
  {
    titulo: "Ouça os webhooks",
    texto:
      "Cadastre o endereço do seu sistema e confira a assinatura de cada aviso antes de confiar nele.",
  },
  {
    titulo: "Troque para a chave de produção",
    texto: "Mesmo código, outra chave. Nada mais muda.",
  },
] as const;

/** Limites da API por plano, na página de desenvolvedores. */
export const limitesDaApi = [
  { plano: "Início", limite: "Só ambiente de testes" },
  { plano: "Negócio", limite: "100 requisições por segundo" },
  { plano: "Escala", limite: "Limites dedicados e ambiente isolado" },
] as const;

/** No plano anual, dois meses saem de graça. */
export const DESCONTO_ANUAL = 2 / 12;

export const recursosDaApi = [
  {
    titulo: "API REST e webhooks assinados",
    texto:
      "Cobranças, pagamentos e saldos por HTTP, com aviso na hora em que o dinheiro entra.",
  },
  {
    titulo: "Ambiente de testes",
    texto:
      "Chaves de teste com saldo de mentira em todas as moedas, para integrar sem risco.",
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
