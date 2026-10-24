/**
 * Redoma: empresa fictícia de proteção de dados para pequenas e médias
 * empresas, quarto site premium. A abertura vem de um modelo em inglês
 * ("securify", protect your data) com o vídeo de fundo; o resto do site foi
 * escrito a partir dele. Números, clientes, preços e endereço são de exemplo.
 *
 * A voz da marca é em minúsculas: nome, títulos, navegação e botões. Os
 * textos corridos seguem a escrita normal, para ler sem esforço.
 */

import type { IdDoPlano } from "@/lib/assinatura";
import type { DadosDoRodape } from "./tipos";

export const nome = "redoma";
/** O nome no meio de uma frase (mensagem do WhatsApp, rodapé). */
export const nomeNoTexto = "Redoma";

export const navegacao = [
  { rotulo: "plataforma", href: "#plataforma" },
  { rotulo: "soluções", href: "#solucoes" },
  { rotulo: "empresa", href: "#empresa" },
  { rotulo: "suporte", href: "#suporte" },
] as const;

/** O endereço do site; as páginas internas ficam abaixo dele. */
export const raiz = "/premium/redoma";

/** As páginas internas, na ordem da barra e do rodapé. */
export const paginas = [
  { rotulo: "plataforma", href: `${raiz}/plataforma` },
  { rotulo: "soluções", href: `${raiz}/solucoes` },
  { rotulo: "preços", href: `${raiz}/precos` },
  { rotulo: "empresa", href: `${raiz}/empresa` },
] as const;

/** O vídeo da abertura e o quadro que aparece enquanto ele carrega. */
export const video = {
  src: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4",
  quadro: "/imagens/premium/redoma/quadro.jpg",
  descricao:
    "Snowboarder descendo uma pista à noite, levantando uma nuvem de neve contra o céu escuro",
} as const;

/** Os três números da abertura, nas posições do modelo. */
export const numerosDaAbertura = {
  empresas: { valor: "+65 mil", legenda: "empresas protegidas" },
  dados: { valor: "+1,5 bi", legenda: "GB de dados guardados" },
  downloads: { valor: "+300 mil", legenda: "downloads do app" },
} as const;

/** As cinco camadas da plataforma. */
export const camadas = [
  {
    id: "cofre",
    nome: "cofre",
    resumo:
      "Criptografia de ponta a ponta para arquivos, planilhas e bancos de dados.",
    texto:
      "Tudo o que entra na Redoma é cifrado no seu computador antes de subir. As chaves ficam com a sua empresa: nem a nossa equipe consegue abrir os arquivos.",
    itens: ["AES-256", "Chaves só suas", "Pastas compartilhadas"],
  },
  {
    id: "copia",
    nome: "cópia imutável",
    resumo: "Backup diário que nenhum vírus consegue apagar ou sequestrar.",
    texto:
      "Cada cópia fica travada por 30 dias, sem botão de apagar. Se um ransomware cifrar o servidor, você volta ao dia anterior em minutos.",
    itens: ["Cópia diária", "Trava de 30 dias", "Restauração em minutos"],
  },
  {
    id: "radar",
    nome: "radar de vazamentos",
    resumo: "Avisa quando um e-mail ou senha da empresa aparece num vazamento.",
    texto:
      "Vigiamos fóruns e bases vazadas atrás do domínio da sua empresa. Quando um login aparece, a pessoa recebe o aviso e a senha é trocada na hora.",
    itens: [
      "Domínio monitorado",
      "Alerta por WhatsApp",
      "Troca guiada de senha",
    ],
  },
  {
    id: "acesso",
    nome: "acesso",
    resumo:
      "Login único com verificação em duas etapas e permissão por pessoa.",
    texto:
      "Cada pessoa vê só o que precisa. Quem sai da empresa perde o acesso a tudo com um clique, e cada abertura de arquivo fica registrada.",
    itens: ["Duas etapas", "Permissão por pasta", "Registro de acessos"],
  },
  {
    id: "lgpd",
    nome: "lgpd em dia",
    resumo:
      "Mapa dos dados pessoais, registro de tratamento e pedidos dos titulares.",
    texto:
      "A Redoma descobre onde estão CPFs, telefones e prontuários, monta o registro que a LGPD pede e organiza os pedidos de quem quer ver ou apagar os próprios dados.",
    itens: [
      "Mapa de dados pessoais",
      "Relatório para a ANPD",
      "Pedidos de titulares",
    ],
  },
] as const;

/** Os setores das soluções, cada um com um cliente fictício da Sagital. */
export const setores = [
  {
    id: "saude",
    rotulo: "clínicas",
    titulo: "prontuário é o dado mais caro que existe",
    risco:
      "Um prontuário vazado vale mais que um cartão de crédito no mercado ilegal, e a LGPD trata dado de saúde como sensível: a multa é maior e o dever de avisar os pacientes também.",
    protege: [
      "Prontuários e exames cifrados no computador da recepção",
      "Acesso por perfil: dentista vê a ficha, recepção vê a agenda",
      "Cópia imutável do sistema da clínica, todo dia às 23h",
    ],
    depoimento: {
      texto:
        "Um dia o computador da recepção amanheceu travado pedindo resgate. Restauramos a cópia da noite anterior e atendemos normalmente às 9h.",
      autor: "Lumi Odontologia",
    },
  },
  {
    id: "escritorios",
    rotulo: "escritórios",
    titulo: "sigilo do cliente não pode depender de um pendrive",
    risco:
      "Contratos, processos e declarações circulam por e-mail e pastas compartilhadas. Basta um estagiário com a senha fraca para tudo ficar exposto.",
    protege: [
      "Pastas por cliente, com permissão de quem trabalha no caso",
      "Radar de vazamentos para todos os e-mails do escritório",
      "Registro de quem abriu cada documento, e quando",
    ],
    depoimento: {
      texto:
        "O radar avisou que o e-mail de um sócio tinha vazado de outro site. Trocamos a senha antes de qualquer um tentar entrar.",
      autor: "Duarte Moreira Advogados",
    },
  },
  {
    id: "lojas",
    rotulo: "lojas virtuais",
    titulo: "a base de clientes é o estoque que não aparece",
    risco:
      "Nome, endereço, telefone e histórico de compras de milhares de clientes. Um vazamento vira golpe por WhatsApp em nome da sua loja.",
    protege: [
      "Base de clientes cifrada e fora do alcance do painel da loja",
      "Mapa dos dados pessoais para atender pedidos da LGPD",
      "Login em duas etapas para quem mexe no painel",
    ],
    depoimento: {
      texto:
        "Quando uma cliente pediu para apagar os dados dela, levamos dois minutos para achar tudo e mandar o comprovante.",
      autor: "Casa do Algodão",
    },
  },
  {
    id: "contabilidade",
    rotulo: "contabilidade",
    titulo: "a senha do cliente na planilha é o primeiro alvo",
    risco:
      "Certificados digitais, senhas do e-CAC e folhas de pagamento de dezenas de empresas, todas num lugar só. Para um golpista, é o melhor endereço da cidade.",
    protege: [
      "Cofre de certificados digitais e senhas de portais",
      "Acesso que acaba no dia em que a pessoa sai do escritório",
      "Cópia imutável das pastas de cada cliente",
    ],
    depoimento: {
      texto:
        "Tiramos 140 senhas de uma planilha e colocamos no cofre numa tarde. A equipe nem percebeu a diferença no dia a dia.",
      autor: "Prumo Contabilidade",
    },
  },
] as const;

export type IdDoSetor = (typeof setores)[number]["id"];
export type IdDaCamada = (typeof camadas)[number]["id"];

/** Cada camada por dentro, na página da plataforma. */
export const camadasPorDentro: Record<
  IdDaCamada,
  { como: string[]; diaADia: string }
> = {
  cofre: {
    como: [
      "O programa da Redoma cria uma pasta no computador de cada pessoa.",
      "O que entra nela é cifrado ali mesmo, com a chave da empresa, antes de subir.",
      "Nos servidores chega só um arquivo ilegível, guardado em dois data centers no Brasil.",
    ],
    diaADia:
      "A equipe salva e abre arquivos como sempre fez. A diferença é que um notebook roubado não leva nada junto.",
  },
  copia: {
    como: [
      "Toda noite, a Redoma copia o sistema, as pastas e o banco de dados que você escolher.",
      "Cada cópia fica travada por 30 dias: nem um administrador consegue apagar.",
      "Para voltar, você escolhe o dia e o que restaurar, do arquivo solto ao servidor inteiro.",
    ],
    diaADia:
      "Ninguém precisa lembrar de fazer backup. Se um vírus cifrar tudo, a empresa volta ao dia anterior em minutos.",
  },
  radar: {
    como: [
      "Você informa o domínio do e-mail da empresa, e só isso.",
      "Vigiamos fóruns, bases vazadas e mercados ilegais atrás dos logins desse domínio.",
      "Quando um aparece, a pessoa recebe o aviso pelo WhatsApp com o passo a passo para trocar a senha.",
    ],
    diaADia:
      "Um aviso por mês, em média, numa empresa de 20 pessoas. Quase sempre de um site de fora que vazou, não da empresa.",
  },
  acesso: {
    como: [
      "Cada pessoa entra com o login da empresa e um segundo passo no celular.",
      "As permissões são por pasta: quem é do financeiro vê o financeiro.",
      "Quem sai da empresa perde todos os acessos com um clique, e o registro guarda quem abriu o quê.",
    ],
    diaADia:
      "Um login só para tudo, e nenhum ex-funcionário com a senha do servidor anotada no caderno.",
  },
  lgpd: {
    como: [
      "A Redoma varre as pastas e o banco atrás de CPF, telefone, endereço e dados de saúde.",
      "Monta o mapa do que existe, onde está e quem acessa: o registro que a ANPD pede.",
      "Os pedidos de quem quer ver ou apagar os próprios dados chegam num painel, com prazo.",
    ],
    diaADia:
      "Quando um cliente pede para ser esquecido, você acha tudo dele em minutos e manda o comprovante.",
  },
};

/** Os ramos por dentro, na página de cada solução. */
export const setoresPorDentro: Record<
  IdDoSetor,
  {
    apresentacao: string;
    camadas: IdDaCamada[];
    exige: string[];
    plano: IdDoPlano;
    /** A equipe de exemplo da estimativa de preço. */
    equipe: string;
    pessoas: number;
  }
> = {
  saude: {
    apresentacao:
      "Consultórios, clínicas e laboratórios guardam o dado que a LGPD mais protege. A Redoma cuida dele sem mudar o sistema da recepção.",
    camadas: ["cofre", "copia", "acesso"],
    exige: [
      "Dado de saúde é sensível: precisa de cuidado reforçado e acesso restrito",
      "Vazamento obriga a avisar os pacientes e a ANPD",
      "O prontuário deve ser guardado por no mínimo 20 anos",
    ],
    plano: "equipe",
    equipe: "Uma clínica com 12 pessoas",
    pessoas: 12,
  },
  escritorios: {
    apresentacao:
      "Advocacia, arquitetura e consultoria vivem de sigilo. A Redoma tranca as pastas por cliente e avisa quando um e-mail da equipe vaza.",
    camadas: ["acesso", "radar", "cofre"],
    exige: [
      "O sigilo profissional vale para arquivos digitais também",
      "Cada acesso a documento de cliente precisa poder ser explicado",
      "Contratos com cláusula de proteção de dados pedem prova de cuidado",
    ],
    plano: "equipe",
    equipe: "Um escritório com 8 pessoas",
    pessoas: 8,
  },
  lojas: {
    apresentacao:
      "Lojas virtuais têm milhares de clientes cadastrados. A Redoma protege a base e organiza os pedidos que a LGPD dá a cada um deles.",
    camadas: ["lgpd", "acesso", "copia"],
    exige: [
      "O cliente pode pedir para ver, corrigir ou apagar os próprios dados",
      "A resposta tem prazo de 15 dias",
      "A loja precisa saber dizer onde cada dado está guardado",
    ],
    plano: "equipe",
    equipe: "Uma loja com 6 pessoas",
    pessoas: 6,
  },
  contabilidade: {
    apresentacao:
      "Escritórios contábeis guardam certificados, senhas e folhas de dezenas de empresas. A Redoma tira tudo da planilha e põe no cofre.",
    camadas: ["cofre", "acesso", "copia"],
    exige: [
      "O escritório responde pelos dados das empresas clientes",
      "Certificado digital vazado permite agir em nome do cliente",
      "Folha de pagamento tem dado pessoal de cada funcionário atendido",
    ],
    plano: "empresa",
    equipe: "Um escritório com 15 pessoas",
    pessoas: 15,
  },
};

type Celula = boolean | string;

/** A tabela "lado a lado" da página de preços: um valor por plano. */
export const comparacaoDosPlanos: {
  grupo: string;
  linhas: { nome: string; valores: [Celula, Celula, Celula] }[];
}[] = [
  {
    grupo: "preço",
    linhas: [
      {
        nome: "Por pessoa, no mensal",
        valores: ["grátis", "R$ 24", "R$ 42"],
      },
      { nome: "Por pessoa, no anual", valores: ["grátis", "R$ 19", "R$ 34"] },
      {
        nome: "Tamanho da equipe",
        valores: ["até 3", "até 150", "a partir de 10"],
      },
      {
        nome: "Taxa de instalação",
        valores: ["nenhuma", "nenhuma", "nenhuma"],
      },
    ],
  },
  {
    grupo: "proteção",
    linhas: [
      {
        nome: "Cofre cifrado",
        valores: ["50 GB", "1 TB por pessoa", "1 TB por pessoa"],
      },
      {
        nome: "Cópia dos arquivos",
        valores: ["semanal", "diária e imutável", "diária e imutável"],
      },
      {
        nome: "Radar de vazamentos",
        valores: ["3 e-mails", "domínio inteiro", "domínio inteiro"],
      },
      { nome: "Duas etapas no login", valores: [true, true, true] },
      { nome: "Permissão por pasta", valores: [false, true, true] },
      { nome: "Registro de acessos", valores: [false, "90 dias", "5 anos"] },
    ],
  },
  {
    grupo: "lgpd",
    linhas: [
      { nome: "Mapa de dados pessoais", valores: [false, true, true] },
      { nome: "Pedidos de titulares", valores: [false, true, true] },
      {
        nome: "Encarregado de dados (DPO)",
        valores: [false, false, "sob demanda"],
      },
      { nome: "Relatório para auditoria", valores: [false, false, "anual"] },
    ],
  },
  {
    grupo: "atendimento",
    linhas: [
      {
        nome: "Suporte",
        valores: ["por e-mail", "WhatsApp, 7h às 22h", "WhatsApp e telefone"],
      },
      { nome: "Plantão de incidentes", valores: [false, false, "24 horas"] },
      { nome: "Gerente de conta", valores: [false, false, true] },
    ],
  },
];

export const perguntasDosPrecos = [
  {
    pergunta: "Quem conta como pessoa da equipe?",
    resposta:
      "Quem usa computador ou celular com acesso aos arquivos da empresa. Estagiário conta; quem só usa o caixa da loja, sem acesso aos arquivos, não.",
  },
  {
    pergunta: "E se a equipe crescer no meio do ano?",
    resposta:
      "Você adiciona a pessoa pelo painel e paga a diferença proporcional aos meses que faltam. Quem sai libera a vaga na hora.",
  },
  {
    pergunta: "O plano início é grátis mesmo?",
    resposta:
      "Sim, para até três pessoas, sem cartão de crédito. Ele existe para quem trabalha sozinho ter o básico bem feito.",
  },
  {
    pergunta: "Por que o plano empresa tem mínimo de 10 pessoas?",
    resposta:
      "Porque inclui plantão 24 horas, encarregado de dados e gerente de conta, que custam o mesmo para uma equipe de 3 ou de 10.",
  },
] as const;

/** A história da Redoma, na página da empresa. */
export const historia = [
  {
    ano: "2019",
    titulo: "dois anos de prontuários perdidos",
    texto:
      "Um vírus cifra o servidor da clínica de uma das fundadoras. A cópia de segurança estava no mesmo servidor.",
  },
  {
    ano: "2020",
    titulo: "a primeira versão do cofre",
    texto:
      "Doze clínicas de Florianópolis testam a pasta cifrada e a cópia imutável. Nenhuma precisou mudar de sistema.",
  },
  {
    ano: "2022",
    titulo: "o radar e a lgpd",
    texto:
      "Com a LGPD valendo, a Redoma passa a mapear dados pessoais e a vigiar vazamentos pelo domínio da empresa.",
  },
  {
    ano: "2025",
    titulo: "65 mil empresas",
    texto:
      "Escritórios, lojas e contabilidades de todo o país. O time cresce para 48 pessoas, todas no Brasil.",
  },
] as const;

export const comoTrabalhamos = [
  {
    titulo: "dados no brasil",
    texto: "Dois data centers em São Paulo e Fortaleza. Nada sai do país.",
  },
  {
    titulo: "teste externo duas vezes por ano",
    texto:
      "Uma equipe de fora tenta invadir a plataforma. O relatório fica aberto aos clientes.",
  },
  {
    titulo: "código revisado em dupla",
    texto: "Nenhuma linha vai ao ar sem que outra pessoa leia antes.",
  },
  {
    titulo: "transparência nos incidentes",
    texto: "Se algo acontecer, os clientes sabem por nós, no mesmo dia.",
  },
] as const;

/** Os textos dos planos; os preços estão em lib/assinatura.ts. */
export const planos: {
  id: IdDoPlano;
  nome: string;
  para: string;
  itens: string[];
}[] = [
  {
    id: "inicio",
    nome: "início",
    para: "Para quem trabalha sozinho ou em dupla.",
    itens: [
      "Cofre com 50 GB",
      "Cópia semanal",
      "Radar para 3 e-mails",
      "Duas etapas no login",
    ],
  },
  {
    id: "equipe",
    nome: "equipe",
    para: "Para escritórios, clínicas e lojas que crescem.",
    itens: [
      "Cofre com 1 TB por pessoa",
      "Cópia imutável diária",
      "Radar para o domínio inteiro",
      "Permissão por pasta",
      "Mapa de dados da LGPD",
    ],
  },
  {
    id: "empresa",
    nome: "empresa",
    para: "Para quem precisa de contrato, auditoria e plantão.",
    itens: [
      "Tudo do plano equipe",
      "Plantão de incidentes 24 horas",
      "Encarregado de dados (DPO) sob demanda",
      "Relatório anual para auditoria",
      "Gerente de conta",
    ],
  },
];

/** A empresa em números. */
export const fatos = [
  { valor: "2019", legenda: "fundada em Florianópolis" },
  { valor: "48", legenda: "pessoas no time" },
  { valor: "100%", legenda: "dos dados guardados no Brasil" },
  { valor: "zero", legenda: "vazamentos de clientes até hoje" },
] as const;

export const principios = [
  {
    titulo: "a chave é sua",
    texto:
      "Cifrar no seu computador, antes de subir, quer dizer que nem um pedido judicial nos faz abrir os seus arquivos: não temos como.",
  },
  {
    titulo: "segurança que ninguém precisa entender",
    texto:
      "Se proteger exige um manual, as pessoas desligam a proteção. Tudo na Redoma funciona sem mudar a rotina da equipe.",
  },
  {
    titulo: "testados por quem ataca",
    texto:
      "Duas vezes por ano, uma equipe externa tenta invadir a Redoma. O relatório fica aberto para os clientes do plano empresa.",
  },
] as const;

export const perguntas = [
  {
    pergunta: "Preciso trocar os programas que já uso?",
    resposta:
      "Não. A Redoma roda junto: o cofre aparece como uma pasta no computador, a cópia pega o sistema que você já tem e o radar só precisa do domínio do e-mail.",
  },
  {
    pergunta: "Vocês conseguem ver os meus arquivos?",
    resposta:
      "Não. Os arquivos são cifrados no seu computador com uma chave que só a sua empresa tem. O que chega aos nossos servidores é ilegível.",
  },
  {
    pergunta: "E se a pessoa que tem a chave perder o computador?",
    resposta:
      "Na criação da conta, a empresa gera um código de recuperação para guardar fora do computador. Com ele, a chave volta em qualquer máquina nova.",
  },
  {
    pergunta: "A Redoma deixa a empresa em dia com a LGPD?",
    resposta:
      "Cuida da parte técnica e da papelada que mais pesa: mapa de dados, registro de tratamento e pedidos dos titulares. O plano empresa ainda inclui um encarregado de dados sob demanda.",
  },
  {
    pergunta: "Fui atacado agora. O que eu faço?",
    resposta:
      "Desligue o computador da internet, não pague o resgate e chame o suporte escolhendo “incidente acontecendo agora”. Clientes do plano empresa têm plantão 24 horas.",
  },
  {
    pergunta: "Posso cancelar quando quiser?",
    resposta:
      "No mensal, sim, sem multa. No anual, o desconto vale pelo ano inteiro. Ao cancelar, você baixa tudo decifrado antes de a conta fechar.",
  },
] as const;

export const interesses = [
  "cofre",
  "cópia imutável",
  "radar de vazamentos",
  "acesso",
  "lgpd",
] as const;

export const assuntosDoSuporte = [
  "dúvida sobre a plataforma",
  "problema técnico",
  "incidente acontecendo agora",
  "financeiro e notas fiscais",
] as const;

export const rodape: DadosDoRodape = {
  descricao:
    "Proteção de dados para pequenas e médias empresas: cofre cifrado, cópia imutável, radar de vazamentos e LGPD em dia.",
  endereco: "Rua Lauro Linhares, 2123, sala 504",
  bairro: "Trindade, Florianópolis",
  horarios: [
    "Suporte de segunda a sábado, das 7h às 22h",
    "Plantão de incidentes 24 horas no plano empresa",
  ],
  email: "ola@redoma.exemplo",
  redes: ["linkedin", "instagram", "youtube"],
  legais: ["CNPJ 00.000.000/0001-00 (fictício)"],
};
