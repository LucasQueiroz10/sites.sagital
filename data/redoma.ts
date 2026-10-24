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
