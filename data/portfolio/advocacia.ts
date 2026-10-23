import acordo from "@/public/imagens/portfolio/advocacia/acordo.jpg";
import andre from "@/public/imagens/portfolio/advocacia/andre.jpg";
import assinatura from "@/public/imagens/portfolio/advocacia/assinatura.jpg";
import biblioteca from "@/public/imagens/portfolio/advocacia/biblioteca.jpg";
import camila from "@/public/imagens/portfolio/advocacia/camila.jpg";
import rafael from "@/public/imagens/portfolio/advocacia/rafael.jpg";
import reuniao from "@/public/imagens/portfolio/advocacia/reuniao.jpg";
import socia from "@/public/imagens/portfolio/advocacia/socia.jpg";
import type { DadosDoRodape, Imagem } from "@/data/tipos";

// Escritório fictício. O texto segue a sobriedade que a OAB pede na
// publicidade da advocacia: sem promessa de resultado, sem preço e sem
// chamadas de captação. Fotos do Unsplash (licença livre), salvas localmente.

export type AreaDeAtuacao = {
  id: string;
  nome: string;
  resumo: string;
  itens: string[];
  imagem: Imagem;
};

export type Advogado = {
  nome: string;
  funcao: string;
  areas: string;
  imagem: Imagem;
  foco?: string;
};

export type OpcaoDaTriagem = { valor: string; rotulo: string };

export const advocacia = {
  nome: "Duarte Moreira Advogados",
  marca: { principal: "Duarte Moreira", apoio: "Advogados" },
  titulo: "Decisões importantes pedem conselho claro.",
  apoio:
    "Advocacia empresarial, trabalhista, de família e imobiliária. Atendimento com hora marcada, no escritório ou por vídeo.",
  socia: {
    nome: "Helena Duarte",
    funcao: "Sócia-fundadora",
    imagem: {
      src: socia,
      alt: "Helena Duarte, sócia-fundadora, sentada de terno escuro e camisa branca",
    },
  },
  navegacao: [
    { rotulo: "Atuação", href: "#atuacao" },
    { rotulo: "Escritório", href: "#escritorio" },
    { rotulo: "Equipe", href: "#equipe" },
    { rotulo: "Dúvidas", href: "#duvidas" },
  ],
  compromissos: [
    { titulo: "Desde 2009", texto: "Mais de quinze anos no mesmo endereço." },
    {
      titulo: "Combinado por escrito",
      texto: "Escopo e honorários definidos antes de começar.",
    },
    {
      titulo: "Retorno em dois dias úteis",
      texto: "Toda mensagem respondida por quem cuida do caso.",
    },
  ],
  areas: [
    {
      id: "empresarial",
      nome: "Empresarial",
      resumo:
        "Contratos, sociedade e o dia a dia jurídico da pequena e da média empresa.",
      itens: [
        "Abertura, alteração e saída de sócios",
        "Contratos com clientes e fornecedores",
        "Cobrança e renegociação de dívidas",
        "Consultoria mensal com um advogado de referência",
      ],
      imagem: {
        src: reuniao,
        alt: "Três profissionais revisam documentos numa mesa de reunião",
      },
    },
    {
      id: "trabalhista",
      nome: "Trabalhista",
      resumo:
        "Orientação preventiva para empregadores e defesa em reclamações trabalhistas.",
      itens: [
        "Contratos de trabalho e regras internas",
        "Rescisões e acordos",
        "Defesa em reclamações trabalhistas",
        "Revisão das rotinas de departamento pessoal",
      ],
      imagem: {
        src: acordo,
        alt: "Aperto de mãos sobre uma mesa com documentos",
      },
    },
    {
      id: "familia",
      nome: "Família e sucessões",
      resumo:
        "Divórcio, guarda, pensão e inventário, conduzidos com discrição e cuidado.",
      itens: [
        "Divórcio consensual e litigioso",
        "Guarda, convivência e pensão alimentícia",
        "Inventário judicial e em cartório",
        "Planejamento sucessório e testamentos",
      ],
      imagem: {
        src: assinatura,
        alt: "Mão assinando um documento com caneta-tinteiro, em preto e branco",
      },
    },
    {
      id: "imobiliario",
      nome: "Imobiliário",
      resumo: "Compra, venda e locação de imóveis com a documentação em ordem.",
      itens: [
        "Análise da documentação do imóvel",
        "Contratos de compra e venda",
        "Locação residencial e comercial",
        "Regularização e usucapião",
      ],
      imagem: {
        src: biblioteca,
        alt: "Estante de madeira com coleções de livros jurídicos encadernados",
      },
    },
  ] satisfies AreaDeAtuacao[],
  atendimento: [
    {
      titulo: "Primeira conversa",
      texto:
        "Você conta o que está acontecendo. Em quarenta minutos dizemos se e como podemos ajudar.",
    },
    {
      titulo: "Proposta por escrito",
      texto:
        "Escopo, prazos e honorários combinados antes de qualquer trabalho começar.",
    },
    {
      titulo: "Acompanhamento",
      texto:
        "Um advogado responsável pelo seu caso e notícia a cada movimento importante.",
    },
  ],
  escritorio: {
    citacao:
      "Um bom conselho começa por entender o que está em jogo para a pessoa, não só o que diz o processo.",
    paragrafos: [
      "O escritório nasceu em 2009 para atender empresas da cidade e as famílias por trás delas. Hoje são quatro advogados, cada um com uma área, e todos conhecem os casos uns dos outros.",
      "Preferimos resolver por acordo quando é possível e ir a juízo quando é preciso. Em qualquer caso, você sabe o que está acontecendo e quanto vai custar.",
    ],
  },
  equipe: [
    {
      nome: "Rafael Moreira",
      funcao: "Sócio",
      areas: "Empresarial e imobiliário",
      imagem: {
        src: rafael,
        alt: "Rafael Moreira, de óculos e terno escuro, com a mão na têmpora",
      },
      foco: "58% 30%",
    },
    {
      nome: "Camila Torres",
      funcao: "Advogada",
      areas: "Família e sucessões",
      imagem: {
        src: camila,
        alt: "Camila Torres, de terno preto e braços cruzados, em fundo cinza",
      },
      foco: "48% 30%",
    },
    {
      nome: "André Nascimento",
      funcao: "Advogado",
      areas: "Trabalhista",
      imagem: {
        src: andre,
        alt: "André Nascimento, de terno azul-marinho, sentado à mesa do escritório",
      },
      foco: "50% 35%",
    },
  ] satisfies Advogado[],
  triagem: {
    assuntos: [
      { valor: "empresarial", rotulo: "Empresarial" },
      { valor: "trabalhista", rotulo: "Trabalhista" },
      { valor: "família e sucessões", rotulo: "Família e sucessões" },
      { valor: "imobiliário", rotulo: "Imobiliário" },
      { valor: "outro assunto", rotulo: "Outro assunto" },
    ] satisfies OpcaoDaTriagem[],
    situacoes: [
      {
        valor: "quero orientação antes de decidir",
        rotulo: "Quero orientação antes de decidir",
      },
      {
        valor: "recebi uma notificação ou um processo",
        rotulo: "Recebi uma notificação ou um processo",
      },
      {
        valor: "preciso de um contrato ou documento",
        rotulo: "Preciso de um contrato ou documento",
      },
      {
        valor: "quero uma segunda opinião",
        rotulo: "Quero uma segunda opinião",
      },
    ] satisfies OpcaoDaTriagem[],
    formatos: [
      { valor: "no escritório", rotulo: "No escritório" },
      { valor: "por vídeo", rotulo: "Por vídeo" },
    ] satisfies OpcaoDaTriagem[],
    quando: [
      { valor: "nesta semana", rotulo: "Nesta semana" },
      { valor: "nas próximas semanas", rotulo: "Nas próximas semanas" },
    ] satisfies OpcaoDaTriagem[],
  },
  duvidas: [
    {
      pergunta: "A primeira conversa tem custo?",
      resposta:
        "A primeira conversa serve para entender o caso e dizer se podemos ajudar. As condições são informadas no agendamento, antes do encontro, sem surpresa.",
    },
    {
      pergunta: "Vocês atendem por vídeo?",
      resposta:
        "Sim. A conversa por vídeo tem o mesmo sigilo do atendimento no escritório, e os documentos podem ser enviados com antecedência.",
    },
    {
      pergunta: "Como os honorários são definidos?",
      resposta:
        "Por escrito e antes de começar, conforme a complexidade e o tempo estimado do trabalho, tendo a tabela da OAB como referência.",
    },
    {
      pergunta: "O que levar para a primeira conversa?",
      resposta:
        "Os documentos ligados ao caso: contratos, notificações, comprovantes e, se houver, o número do processo. Se não tiver tudo, a conversa acontece do mesmo jeito.",
    },
  ],
  contato: {
    endereco: "Av. das Acácias, 1200, sala 804",
    bairro: "Centro",
    horario: "Segunda a sexta, das 9h às 18h",
    /** Registro da sociedade na OAB: número fictício, só para mostrar onde ele entra. */
    registro: "Sociedade de advogados · OAB/UF 00.000 (registro fictício)",
  },
  rodape: {
    descricao:
      "Advocacia empresarial, trabalhista, de família e imobiliária, com atendimento no escritório ou por vídeo.",
    endereco: "Av. das Acácias, 1200, sala 804",
    bairro: "Centro",
    horarios: ["Segunda a sexta: 9h às 18h", "Atendimento com hora marcada"],
    email: "contato@duartemoreira.exemplo",
    redes: ["linkedin", "instagram"],
    legais: [
      "Sociedade de advogados · OAB/UF 00.000 (registro fictício)",
      "CNPJ 00.000.000/0001-00 (fictício)",
    ],
  } satisfies DadosDoRodape,
};
