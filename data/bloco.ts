import campo from "@/public/imagens/premium/bloco/campo.png";
import timeBianca from "@/public/imagens/premium/bloco/time-bianca.jpg";
import timeLuana from "@/public/imagens/premium/bloco/time-luana.jpg";
import timeMarcelo from "@/public/imagens/premium/bloco/time-marcelo.jpg";
import timeRenato from "@/public/imagens/premium/bloco/time-renato.jpg";
import trio from "@/public/imagens/premium/bloco/trio.png";
import trioNoLaranja from "@/public/imagens/premium/bloco/trio-laranja.png";
import fechamento from "@/public/imagens/premium/bloco/fechamento.png";
import abertura from "@/public/imagens/premium/bloco/abertura.png";
import casaDoAlgodao from "@/public/imagens/varejo/campanha.jpg";
import pulso from "@/public/imagens/academia/principal.jpg";
import limoeiro from "@/public/imagens/restaurante/mesa-brunch.jpg";
import laMaree from "@/public/imagens/premium/la-maree/ostras.jpg";
import type { Material } from "@/lib/blocos";
import type { DadosDoRodape, Imagem } from "./tipos";

// Bloco: agência fictícia de marketing de performance. Segundo projeto premium
// da Sagital, a partir da identidade BRIX (laranja, cinza, títulos entre
// colchetes e blocos de montar translúcidos). Os clientes dos cases são os
// próprios negócios fictícios dos outros sites da Sagital; números, nomes,
// endereço e contatos são inventados.

export const nome = "Bloco";

export const navegacao = [
  { rotulo: "Serviços", href: "#servicos" },
  { rotulo: "Cases", href: "#cases" },
  { rotulo: "Processo", href: "#processo" },
  { rotulo: "Equipe", href: "#equipe" },
  { rotulo: "Dúvidas", href: "#duvidas" },
] as const;

/** O endereço do site; as páginas internas ficam abaixo dele. */
export const raiz = "/premium/bloco";

/** As páginas internas, na ordem da barra e do rodapé. */
export const paginas = [
  { rotulo: "Serviços", href: `${raiz}/servicos` },
  { rotulo: "Planos", href: `${raiz}/planos` },
  { rotulo: "Cases", href: `${raiz}/cases` },
  { rotulo: "Processo", href: `${raiz}/processo` },
] as const;

/** Os três números da abertura, com a seta para cima. */
export const destaques = [
  {
    numero: "50+",
    rotulo: "Projetos entregues",
    texto: "De loja de bairro a marca com venda no país todo",
  },
  {
    numero: "300+",
    rotulo: "Campanhas em nichos diferentes",
    texto: "Performance, marca e tudo o que fica no meio",
  },
  {
    numero: "12+",
    rotulo: "Anos no digital",
    texto: "Estratégias que crescem junto com o negócio",
  },
] as const;

/** Os clientes da faixa abaixo da abertura, cada um com a sua letra. */
export const clientes = [
  { nome: "Casa do Algodão", estilo: "algodao" },
  { nome: "Pulso", estilo: "pulso" },
  { nome: "Limoeiro", estilo: "limoeiro" },
  { nome: "La Marée", estilo: "maree" },
  { nome: "Ótica Lume", estilo: "lume" },
  { nome: "Mercado Faria", estilo: "faria" },
] as const;

export type Servico = {
  id: string;
  nome: string;
  prazo: string;
  /** Prazo em dias, para dizer quando o mix começa a rodar. */
  dias: number;
  texto: string;
  /** A cor do bloco que o serviço vira na pilha do mix. */
  material: Material;
};

export const servicos: Servico[] = [
  {
    id: "redes",
    nome: "Redes sociais e conteúdo",
    prazo: "A partir de 14 dias",
    dias: 14,
    texto:
      "Linha editorial, roteiros e posts para Instagram, TikTok e LinkedIn, no tom de voz da sua marca.",
    material: "ambar",
  },
  {
    id: "anuncios",
    nome: "Anúncios segmentados",
    prazo: "A partir de 14 dias",
    dias: 14,
    texto:
      "Campanhas no Instagram, Facebook e TikTok com testes de criativo e de público até achar o que vende.",
    material: "fume",
  },
  {
    id: "performance",
    nome: "Marketing de performance",
    prazo: "A partir de 7 dias",
    dias: 7,
    texto:
      "Funil inteiro medido de ponta a ponta: custo por lead, custo por venda e retorno de cada real.",
    material: "laranja",
  },
  {
    id: "google",
    nome: "Google Ads e busca",
    prazo: "A partir de 3 dias",
    dias: 3,
    texto:
      "Anúncios para quem já está procurando o que você vende, mais remarketing para quem quase comprou.",
    material: "fume",
  },
  {
    id: "email",
    nome: "E-mail e automação",
    prazo: "A partir de 45 dias",
    dias: 45,
    texto:
      "Base de contatos organizada e sequências automáticas ligadas ao seu CRM: RD Station, HubSpot ou Kommo.",
    material: "ambar",
  },
  {
    id: "assessoria",
    nome: "Assessoria e reputação",
    prazo: "A partir de 21 dias",
    dias: 21,
    texto:
      "Matérias em veículos do seu setor, cuidado com avaliações e presença no Google Meu Negócio.",
    material: "laranja",
  },
  {
    id: "videos",
    nome: "Vídeos e criativos",
    prazo: "A partir de 10 dias",
    dias: 10,
    texto:
      "Vídeos curtos e peças para anúncio, já no formato de cada rede: Reels, Shorts, Stories e feed.",
    material: "fume",
  },
];

/** Cada serviço por dentro, na página de serviços. */
export const servicosPorDentro: Record<
  string,
  { entregas: string[]; medida: string; para: string }
> = {
  redes: {
    entregas: [
      "Linha editorial e calendário do mês",
      "12 a 20 posts e roteiros de vídeo",
      "Respostas a comentários em horário comercial",
    ],
    medida:
      "Alcance de quem não segue, cliques no perfil e mensagens recebidas",
    para: "Marcas que precisam aparecer toda semana sem ocupar o dono",
  },
  anuncios: {
    entregas: [
      "Públicos montados a partir dos seus clientes",
      "Três criativos novos por semana em teste",
      "Verba remanejada para o que vende",
    ],
    medida: "Custo por mensagem, por lead e por venda",
    para: "Quem já vende e quer previsibilidade de pedidos",
  },
  performance: {
    entregas: [
      "Funil desenhado do anúncio ao caixa",
      "Painel ao vivo com custo e retorno",
      "Teste A/B de páginas e ofertas",
    ],
    medida: "Retorno sobre o investimento em mídia, por canal",
    para: "Lojas e serviços que querem saber de onde vem cada venda",
  },
  google: {
    entregas: [
      "Campanhas de busca por palavra que vende",
      "Remarketing para quem visitou e não comprou",
      "Perfil do Google Meu Negócio otimizado",
    ],
    medida: "Custo por conversão e parcela das buscas que você ganha",
    para: "Negócios que o cliente já procura no Google",
  },
  email: {
    entregas: [
      "Base de contatos limpa e separada por interesse",
      "Sequências automáticas de boas-vindas e recompra",
      "Integração com RD Station, HubSpot ou Kommo",
    ],
    medida: "Receita por e-mail enviado e taxa de recompra",
    para: "Quem tem base de clientes parada e quer vender de novo",
  },
  assessoria: {
    entregas: [
      "Pautas para veículos do seu setor",
      "Respostas às avaliações no Google",
      "Relatório de menções da marca",
    ],
    medida: "Matérias publicadas e nota média nas avaliações",
    para: "Marcas que dependem de confiança antes da compra",
  },
  videos: {
    entregas: [
      "Roteiro, gravação e edição em um dia de estúdio",
      "Cortes para Reels, Shorts, Stories e feed",
      "Legendas e versões para anúncio",
    ],
    medida: "Retenção nos três primeiros segundos e custo por clique",
    para: "Quem precisa de criativo novo todo mês para os anúncios",
  },
};

export type IdDoPlano = "arranque" | "tracao" | "escala";

/** Os planos mensais, na página de planos. A verba dos anúncios é à parte. */
export const planos: {
  id: IdDoPlano;
  nome: string;
  /** Mensalidade em reais; null é "sob consulta". */
  mensal: number | null;
  resumo: string;
  itens: string[];
  destaque?: boolean;
}[] = [
  {
    id: "arranque",
    nome: "Arranque",
    mensal: 2900,
    resumo: "Para quem está começando a anunciar.",
    itens: [
      "Redes sociais e anúncios",
      "12 posts por mês",
      "Até R$ 3 mil de verba gerida",
      "Relatório mensal",
    ],
  },
  {
    id: "tracao",
    nome: "Tração",
    mensal: 5400,
    resumo: "Para quem já vende e quer crescer com previsão.",
    itens: [
      "Quatro serviços à escolha",
      "20 posts e 4 vídeos por mês",
      "Até R$ 15 mil de verba gerida",
      "Painel ao vivo e reunião quinzenal",
    ],
    destaque: true,
  },
  {
    id: "escala",
    nome: "Escala",
    mensal: null,
    resumo: "Para marcas com operação em vários canais.",
    itens: [
      "Os sete serviços",
      "Time dedicado",
      "Verba gerida sem teto",
      "Reunião semanal",
    ],
  },
];

type Celula = boolean | string;

/** A tabela "lado a lado" da página de planos: um valor por plano. */
export const comparacaoDosPlanos: {
  grupo: string;
  linhas: { nome: string; valores: [Celula, Celula, Celula] }[];
}[] = [
  {
    grupo: "Serviços",
    linhas: [
      { nome: "Redes sociais e conteúdo", valores: [true, true, true] },
      { nome: "Anúncios segmentados", valores: [true, true, true] },
      { nome: "Marketing de performance", valores: [false, "À escolha", true] },
      { nome: "Google Ads e busca", valores: [false, "À escolha", true] },
      { nome: "E-mail e automação", valores: [false, "À escolha", true] },
      { nome: "Assessoria e reputação", valores: [false, false, true] },
      {
        nome: "Vídeos e criativos",
        valores: [false, "4 por mês", "Sem limite"],
      },
    ],
  },
  {
    grupo: "Entregas",
    linhas: [
      { nome: "Posts por mês", valores: ["12", "20", "Sob medida"] },
      {
        nome: "Verba de anúncio gerida",
        valores: ["Até R$ 3 mil", "Até R$ 15 mil", "Sem teto"],
      },
      {
        nome: "Testes de criativo",
        valores: ["Mensal", "Semanal", "Contínuo"],
      },
    ],
  },
  {
    grupo: "Acompanhamento",
    linhas: [
      { nome: "Relatório", valores: ["Mensal", "Mensal", "Mensal"] },
      { nome: "Painel ao vivo", valores: [false, true, true] },
      { nome: "Reunião", valores: ["Mensal", "Quinzenal", "Semanal"] },
      { nome: "Time", valores: ["Compartilhado", "Compartilhado", "Dedicado"] },
    ],
  },
];

export const perguntasDosPlanos = [
  {
    pergunta: "A verba dos anúncios está dentro da mensalidade?",
    resposta:
      "Não. A verba vai direto para o Meta e o Google, no seu cartão, e você vê cada real gasto. A mensalidade paga o trabalho da agência.",
  },
  {
    pergunta: "Posso trocar de plano?",
    resposta:
      "Sim, de um mês para o outro. Quem começa no Arranque costuma subir quando a verba passa dos R$ 3 mil.",
  },
  {
    pergunta: "Tem taxa de implantação?",
    resposta:
      "Não. O primeiro mês já inclui a estratégia, a configuração das contas e os primeiros criativos.",
  },
] as const;

/** Os cases por dentro, na página de cada case. */
export const casesPorDentro: Record<
  string,
  {
    desafio: string;
    estrategia: { titulo: string; texto: string }[];
    depoimento: { texto: string; autor: string };
    duracao: string;
  }
> = {
  "casa-do-algodao": {
    desafio:
      "A loja vendia bem no balcão, mas o Instagram só trazia curtidas. Os pedidos pelo WhatsApp não passavam de dez por semana.",
    estrategia: [
      {
        titulo: "Catálogo ligado aos anúncios",
        texto:
          "Cada peça virou um anúncio com tamanho e preço, levando direto para a conversa.",
      },
      {
        titulo: "Mensagem pronta no WhatsApp",
        texto:
          "A cliente chega com a peça e o tamanho escritos; a vendedora só confirma.",
      },
      {
        titulo: "Verba onde vende",
        texto:
          "Toda segunda, a verba sai das peças paradas e vai para as que mais saem.",
      },
    ],
    depoimento: {
      texto:
        "Hoje a gente sabe quantos pedidos cada real de anúncio traz. Antes era no escuro.",
      autor: "Dona da Casa do Algodão",
    },
    duracao: "4 meses",
  },
  limoeiro: {
    desafio:
      "O restaurante tinha fila no fim de semana e salão vazio de terça a quinta. Quase ninguém achava o Limoeiro no Google.",
    estrategia: [
      {
        titulo: "Google Meu Negócio refeito",
        texto:
          "Fotos novas, cardápio, horários certos e resposta a todas as avaliações.",
      },
      {
        titulo: "Anúncio por bairro",
        texto:
          "Campanha para quem procura almoço a até 3 km, só nos dias fracos.",
      },
      {
        titulo: "Conteúdo de bastidor",
        texto:
          "Vídeos curtos da cozinha toda semana, para quem já segue voltar.",
      },
    ],
    depoimento: {
      texto:
        "A terça virou um dos nossos melhores dias. Eu não acreditava que dava.",
      autor: "Sócio do Limoeiro",
    },
    duracao: "3 meses",
  },
  pulso: {
    desafio:
      "A academia precisava encher três unidades novas antes do verão, com um orçamento que não cobria anúncio na TV.",
    estrategia: [
      {
        titulo: "Página de campanha",
        texto:
          "Uma página por unidade, com a aula experimental marcada em dois toques.",
      },
      {
        titulo: "Tráfego pago por raio",
        texto:
          "Anúncios para quem mora ou trabalha a até 2 km de cada unidade.",
      },
      {
        titulo: "CRM com retorno em 5 minutos",
        texto:
          "Cada lead chega no WhatsApp da recepção com o horário da aula escolhido.",
      },
    ],
    depoimento: {
      texto: "As três unidades abriram com a turma da manhã cheia.",
      autor: "Gerente de marketing da Pulso",
    },
    duracao: "10 semanas",
  },
  "la-maree": {
    desafio:
      "O menu degustação só lotava no sábado. Nas noites de semana, metade das mesas ficava vazia.",
    estrategia: [
      {
        titulo: "Reels do prato à mesa",
        texto: "Um vídeo por tempo do menu, gravado no salão, em luz de noite.",
      },
      {
        titulo: "Matéria na imprensa local",
        texto:
          "A história do barco do seu Valdir virou pauta em dois veículos da cidade.",
      },
      {
        titulo: "E-mail para quem já veio",
        texto:
          "Convite para o menu da semana, com mesa reservada pelo próprio e-mail.",
      },
    ],
    depoimento: {
      texto:
        "A quarta-feira passou a ter lista de espera. Isso nunca tinha acontecido.",
      autor: "Chef do La Marée",
    },
    duracao: "5 meses",
  },
};

/** O processo por dentro, na página do processo. */
export const etapasPorDentro: Record<
  string,
  { entregas: string[]; quem: string }
> = {
  Briefing: {
    entregas: [
      "Metas do trimestre",
      "Mapa dos concorrentes",
      "Orçamento por canal",
    ],
    quem: "Marcelo Antunes",
  },
  Estratégia: {
    entregas: [
      "Plano de canais",
      "Calendário de conteúdo",
      "Resultado esperado, em números",
    ],
    quem: "Bianca Torres",
  },
  Lançamento: {
    entregas: ["Contas configuradas", "Primeiros criativos", "Campanhas no ar"],
    quem: "Renato Kenji",
  },
  Otimização: {
    entregas: ["Testes da semana", "Verba remanejada", "Criativos novos"],
    quem: "Luana Prado",
  },
  Relatório: {
    entregas: [
      "Painel atualizado",
      "Reunião de resultado",
      "Plano do mês seguinte",
    ],
    quem: "Marcelo Antunes",
  },
};

/** O bloco "Não sabe o que escolher?": o que a auditoria entrega. */
export const vantagensDoMix = [
  {
    titulo: "Estratégia de longo prazo",
    texto: "Para crescer sem queimar o orçamento",
  },
  { titulo: "Começo rápido", texto: "Primeiros pedidos entre 14 e 30 dias" },
  {
    titulo: "Análise e auditoria",
    texto: "Como está o seu marketing hoje, com números",
  },
  {
    titulo: "Escolha dos canais",
    texto: "Do anúncio à assessoria e ao e-mail",
  },
] as const;

/** Os três números da seção de resultados, com a direção da seta. */
export const numeros = [
  {
    rotulo: "Retorno médio das campanhas de anúncio",
    valor: 230,
    sufixo: "%",
    direcao: "sobe",
  },
  {
    rotulo: "Queda média no custo por lead",
    valor: 37,
    sufixo: "%",
    direcao: "desce",
  },
  {
    rotulo: "Clientes que renovam depois do primeiro ano",
    valor: 86,
    sufixo: "%",
    direcao: "sobe",
  },
] as const;

export type Case = {
  id: string;
  cliente: string;
  /** O ramo com o artigo, como entra na frase: "a loja de roupas". */
  ramo: string;
  /** O resultado principal, que fica em laranja no título. */
  resultado: string;
  titulo: string;
  etiquetas: string[];
  foto: Imagem;
  metricas: { valor: string; rotulo: string; direcao: "sobe" | "desce" }[];
};

export const cases: Case[] = [
  {
    id: "casa-do-algodao",
    cliente: "Casa do Algodão",
    ramo: "a loja de roupas básicas",
    resultado: "+180% pedidos",
    titulo: "pelo WhatsApp com anúncios de catálogo",
    etiquetas: ["Performance", "Redes sociais", "Catálogo"],
    foto: {
      src: casaDoAlgodao,
      alt: "Campanha da Casa do Algodão: modelos com roupas básicas de algodão em tons claros",
    },
    metricas: [
      { valor: "+180%", rotulo: "Pedidos", direcao: "sobe" },
      { valor: "−35%", rotulo: "Custo por pedido", direcao: "desce" },
      { valor: "×3,2", rotulo: "Retorno", direcao: "sobe" },
    ],
  },
  {
    id: "limoeiro",
    cliente: "Limoeiro",
    ramo: "o restaurante de comida natural",
    resultado: "+64% reservas",
    titulo: "em três meses com Google e conteúdo",
    etiquetas: ["Google Meu Negócio", "Conteúdo", "Anúncios locais"],
    foto: {
      src: limoeiro,
      alt: "Mesa de brunch do Limoeiro com bowls, sucos e pães, vista de cima",
    },
    metricas: [
      { valor: "+64%", rotulo: "Reservas", direcao: "sobe" },
      { valor: "4,8", rotulo: "Nota no Google", direcao: "sobe" },
      { valor: "−22%", rotulo: "Custo por clique", direcao: "desce" },
    ],
  },
  {
    id: "pulso",
    cliente: "Academia Pulso",
    ramo: "a rede de academias",
    resultado: "+1.240 matrículas",
    titulo: "na campanha de verão com tráfego pago",
    etiquetas: ["Tráfego pago", "Página de campanha", "CRM"],
    foto: {
      src: pulso,
      alt: "Salão de musculação da Academia Pulso, com aparelhos enfileirados e luz natural",
    },
    metricas: [
      { valor: "+1.240", rotulo: "Matrículas", direcao: "sobe" },
      { valor: "−41%", rotulo: "Custo por matrícula", direcao: "desce" },
      { valor: "×4,1", rotulo: "Retorno", direcao: "sobe" },
    ],
  },
  {
    id: "la-maree",
    cliente: "La Marée",
    ramo: "o restaurante de frutos do mar",
    resultado: "+92% reservas",
    titulo: "nas noites de semana com o menu degustação",
    etiquetas: ["Reels", "Assessoria", "E-mail"],
    foto: {
      src: laMaree,
      alt: "Ostras abertas sobre gelo com limão, do restaurante La Marée",
    },
    metricas: [
      { valor: "+92%", rotulo: "Reservas", direcao: "sobe" },
      { valor: "+18 mil", rotulo: "Seguidores", direcao: "sobe" },
      { valor: "−30%", rotulo: "Mesas vazias", direcao: "desce" },
    ],
  },
];

/** Os selos redondos da auditoria. */
export const selosDaAuditoria = [
  "Auditoria em 2 dias úteis",
  "100% gratuita",
  "Sigilo garantido",
  "Sem letras miúdas",
] as const;

export const etapas = [
  {
    nome: "Briefing",
    texto: "Conversamos sobre metas, concorrentes, público e orçamento.",
    prazo: "1 a 2 dias",
  },
  {
    nome: "Estratégia",
    texto: "Plano de canais, conteúdo, metas e o resultado que esperamos.",
    prazo: "5 a 7 dias",
  },
  {
    nome: "Lançamento",
    texto: "Campanhas no ar, com criativos e públicos já testados.",
    prazo: "3 a 7 dias",
  },
  {
    nome: "Otimização",
    texto: "Testamos criativos, públicos e mensagens toda semana.",
    prazo: "Toda semana",
  },
  {
    nome: "Relatório",
    texto: "Um painel claro com retorno, custo por lead e pedidos.",
    prazo: "Todo mês",
  },
] as const;

export const equipe = [
  {
    nome: "Marcelo Antunes",
    cargo: "Líder de equipe",
    experiencia: "9 anos em marketing digital",
    foto: {
      src: timeMarcelo,
      alt: "Marcelo Antunes, homem de barba e cabelo escuro, sorrindo, de suéter cinza",
    },
  },
  {
    nome: "Luana Prado",
    cargo: "Gestora de performance",
    experiencia: "6 anos em Meta e Google Ads",
    foto: {
      src: timeLuana,
      alt: "Luana Prado, mulher de cabelo curto rosa, de blazer cinza e camiseta listrada",
    },
  },
  {
    nome: "Renato Kenji",
    cargo: "Diretor de criação",
    experiencia: "7 anos em conceito e marca",
    foto: {
      src: timeRenato,
      alt: "Renato Kenji, homem de cabelo curto, de camisa verde-escura, sorrindo de leve",
    },
  },
  {
    nome: "Bianca Torres",
    cargo: "Estrategista de conteúdo",
    experiencia: "5 anos em redes sociais",
    foto: {
      src: timeBianca,
      alt: "Bianca Torres, mulher loira de cabelo preso, de moletom claro, em fundo branco",
    },
  },
] as const;

export const perguntas = [
  {
    pergunta: "Já tenho alguém cuidando do marketing. Por que uma agência?",
    resposta:
      "A gente soma com a sua equipe, não compete com ela: trazemos estratégia, criação e testes num ritmo difícil de ter dentro de casa.",
  },
  {
    pergunta: "Em quanto tempo vejo resultado?",
    resposta:
      "Os primeiros pedidos de campanha costumam chegar entre 14 e 30 dias. Busca orgânica e conteúdo levam de 3 a 6 meses.",
  },
  {
    pergunta: "Consigo acompanhar o andamento?",
    resposta:
      "Sim. Você acessa o painel com os números atualizados e recebe um relatório por mês, com uma reunião para explicar cada um.",
  },
  {
    pergunta: "Anúncio vale a pena para negócio pequeno?",
    resposta:
      "Vale quando o orçamento é bem dividido. Começamos pequeno, medimos e só aumentamos o que já está trazendo cliente.",
  },
  {
    pergunta: "Tem fidelidade?",
    resposta:
      "Os contratos são mensais, com 30 dias de aviso para sair. Ficamos pelo resultado, não pela multa.",
  },
] as const;

export const imagens = {
  /** O campo de blocos âmbar soltos e empilhados, na seção de resultados. */
  campo: {
    src: campo,
    alt: "Blocos de montar âmbar translúcidos, alguns soltos e outros empilhados, sobre fundo cinza claro",
  },
  /** Três blocos âmbar no ar, sobre o cinza da página. */
  trio,
  /** Os mesmos blocos sobre fundo laranja, para a lista de serviços. */
  trioNoLaranja,
  /** A pilha escura do fechamento. */
  fechamento,
  /** Um quadro da pilha da abertura, para quando não há WebGL. */
  abertura,
} as const;

export const contato = {
  email: "ola@bloco.exemplo",
  instagram: "@bloco.agencia",
  endereco: "Rua das Palmeiras, 470, sala 1203",
  bairro: "Centro empresarial",
  horario: "Segunda a sexta, das 9h às 18h",
} as const;

export const rodape: DadosDoRodape = {
  descricao:
    "Agência de marketing de performance para e-commerce, negócio local e marcas B2B.",
  endereco: contato.endereco,
  bairro: contato.bairro,
  horarios: [contato.horario],
  email: contato.email,
  redes: ["instagram", "linkedin", "youtube"],
  legais: ["CNPJ 00.000.000/0001-00 (fictício)"],
};
