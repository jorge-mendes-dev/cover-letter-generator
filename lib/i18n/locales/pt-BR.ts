import type { Translations } from "./en";

export const ptBR: Translations = {
  nav: {
    brand: "CL",
    label: "Gerador",
  },
  hero: {
    eyebrow: "Movido por IA",
    headingLine1: "Carta de",
    headingLine2: "Apresentação",
    subtitleLine1: "Envie seu currículo, cole a descrição da vaga.",
    subtitleLine2: "Receba uma carta personalizada em segundos.",
  },
  howItWorks: {
    heading: "Como funciona",
    steps: [
      {
        step: "01",
        title: "Envie seu currículo",
        body: "Selecione seu currículo em PDF (até 5 MB). A IA extrai automaticamente suas habilidades, experiências e histórico.",
      },
      {
        step: "02",
        title: "Cole a descrição da vaga",
        body: "Copie o anúncio completo da vaga e cole aqui. Quanto mais detalhes, mais personalizada será a carta.",
      },
      {
        step: "03",
        title: "Obtenha sua carta",
        body: "Clique em Gerar. A IA cruza seu perfil com a vaga e escreve uma carta completa em segundos.",
      },
    ],
  },
  features: {
    heading: "Por que usar este gerador de carta de apresentação?",
    items: [
      {
        title: "Personalizada para cada vaga",
        body: "A IA lê seu currículo e a descrição da vaga juntos — gerando uma carta que conecta sua experiência real ao cargo exato.",
      },
      {
        title: "Sem marcadores, nunca",
        body: "Zero colchetes [Nome da Empresa]. Cada frase é completa e pronta para enviar.",
      },
      {
        title: "Resultados instantâneos",
        body: "Movido pelo modelo 70B da Groq — você recebe uma carta completa em menos de 10 segundos.",
      },
      {
        title: "Gratuito e sem cadastro",
        body: "Sem conta, sem e-mail, sem cartão de crédito. Basta enviar e gerar.",
      },
    ],
  },
  faq: {
    heading: "Perguntas Frequentes",
    items: [
      {
        q: "Como funciona o gerador de carta de apresentação com IA?",
        a: "Envie seu currículo em PDF e cole a descrição da vaga. A IA analisa sua experiência e os requisitos do cargo, gerando uma carta personalizada em segundos — sem modelos, sem marcadores.",
      },
      {
        q: "O gerador de carta de apresentação é gratuito?",
        a: "Sim, é completamente gratuito, sem necessidade de conta ou cadastro.",
      },
      {
        q: "Em qual formato precisa estar meu currículo?",
        a: "Envie seu currículo como arquivo PDF (baseado em texto, até 5 MB). PDFs de imagem escaneada não são suportados.",
      },
      {
        q: "A carta terá texto com marcadores como [Nome da Empresa]?",
        a: "Não. A IA é instruída especificamente para gerar cartas totalmente completas, sem colchetes de preenchimento. Cada detalhe é inferido do seu currículo e da descrição da vaga.",
      },
      {
        q: "Qual a qualidade da carta de apresentação gerada pela IA?",
        a: "Utiliza o modelo llama-3.3-70b-versatile da Groq para produzir cartas profissionais e personalizadas com uma abertura forte, habilidades alinhadas, motivação genuína e um fechamento confiante — estruturado para causar impacto.",
      },
      {
        q: "Esta ferramenta de IA é melhor que o ChatGPT para escrever cartas de apresentação?",
        a: "Sim — ao contrário do ChatGPT, esta ferramenta foi criada especificamente para cartas de apresentação, com um prompt estruturado, saída validada e instrução rigorosa para nunca usar marcadores. O ChatGPT requer prompts manuais e frequentemente produz cartas genéricas ou incompletas.",
      },
      {
        q: "Qual modelo de IA alimenta esta ferramenta?",
        a: "Utiliza o llama-3.3-70b-versatile da Groq, um dos modelos de linguagem de código aberto mais capazes, rodando no hardware LPU da Groq para inferência quase instantânea.",
      },
      {
        q: "Posso usar esta ferramenta para qualquer tipo de emprego ou setor?",
        a: "Sim. A IA se adapta a qualquer cargo — engenharia de software, saúde, finanças, marketing, área criativa e muito mais. Basta colar qualquer descrição de vaga e ela personaliza a carta para aquela posição e empresa específicas.",
      },
    ],
  },
  footer: {
    poweredBy: "Desenvolvido com IA. - Criado por",
    author: "Jorge Mendes",
  },
  form: {
    resumeLabel: "Currículo",
    resumeSubLabel: "(somente PDF)",
    resumeAriaLabel: "Carregar currículo em PDF",
    resumeDropText: "Solte seu PDF aqui, ou",
    resumeBrowseText: "clique para selecionar",
    resumeErrorPdf: "Apenas arquivos PDF são suportados.",
    jobDescLabel: "Descrição da Vaga",
    jobDescPlaceholder: "Cole aqui a descrição completa da vaga…",
    submitGenerating: "Gerando…",
    submitGenerate: "Gerar Carta de Apresentação",
    resultHeading: "Sua carta de apresentação",
    resultCopied: "Copiado",
    resultCopy: "Copiar",
    resultCopyFailed: "Não foi possível copiar — selecione o texto manualmente.",
    validationNoResume: "Por favor, envie seu currículo em PDF.",
    validationNoJobDesc: "Por favor, cole a descrição da vaga.",
    errorDefault: "Algo deu errado. Por favor, tente novamente.",
  },
  themeToggle: {
    toLight: "Mudar para modo claro",
    toDark: "Mudar para modo escuro",
  },
};
