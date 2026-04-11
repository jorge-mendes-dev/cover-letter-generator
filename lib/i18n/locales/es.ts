import type { Translations } from "./en";

export const es: Translations = {
  nav: {
    brand: "CL",
    label: "Generador",
  },
  hero: {
    eyebrow: "Impulsado por IA",
    headingLine1: "Carta de",
    headingLine2: "Presentación",
    subtitleLine1: "Sube tu currículum, pega la descripción del puesto.",
    subtitleLine2: "Recibe una carta personalizada en segundos.",
  },
  howItWorks: {
    heading: "Cómo funciona",
    steps: [
      {
        step: "01",
        title: "Sube tu currículum",
        body: "Selecciona tu currículum en PDF (hasta 5 MB). La IA extrae automáticamente tus habilidades, experiencia y trayectoria.",
      },
      {
        step: "02",
        title: "Pega la descripción del puesto",
        body: "Copia el anuncio completo del trabajo y pégalo aquí. Cuanto más detalle, más personalizada será la carta.",
      },
      {
        step: "03",
        title: "Obtén tu carta de presentación",
        body: "Haz clic en Generar. La IA cruza tu perfil con el puesto y redacta una carta completa en segundos.",
      },
    ],
  },
  features: {
    heading: "¿Por qué usar este generador de carta de presentación?",
    items: [
      {
        title: "Personalizada para cada empleo",
        body: "La IA lee tu currículum y la descripción del puesto juntos — generando una carta que conecta tu experiencia real con el rol exacto.",
      },
      {
        title: "Sin marcadores de posición, nunca",
        body: "Cero corchetes [Nombre de la empresa]. Cada frase está completa y lista para enviar.",
      },
      {
        title: "Resultados instantáneos",
        body: "Impulsado por el modelo 70B de Groq — obtienes una carta completa en menos de 10 segundos.",
      },
      {
        title: "Gratis y sin registro",
        body: "Sin cuenta, sin correo, sin tarjeta de crédito. Solo sube y genera.",
      },
    ],
  },
  faq: {
    heading: "Preguntas Frecuentes",
    items: [
      {
        q: "¿Cómo funciona el generador de carta de presentación con IA?",
        a: "Sube tu currículum en PDF y pega la descripción del puesto. La IA analiza tu experiencia y los requisitos del cargo, generando una carta personalizada en segundos — sin plantillas, sin marcadores.",
      },
      {
        q: "¿El generador de carta de presentación es gratuito?",
        a: "Sí, es completamente gratuito sin necesidad de cuenta ni registro.",
      },
      {
        q: "¿En qué formato debe estar mi currículum?",
        a: "Sube tu currículum como archivo PDF (basado en texto, hasta 5 MB). Los PDFs de imágenes escaneadas no son compatibles.",
      },
      {
        q: "¿La carta tendrá texto con marcadores como [Nombre de la empresa]?",
        a: "No. La IA está específicamente instruida para generar cartas completamente terminadas, sin corchetes de marcadores. Cada detalle se infiere de tu currículum y la descripción del puesto.",
      },
      {
        q: "¿Qué tan buena es la carta de presentación generada por IA?",
        a: "Utiliza el modelo llama-3.3-70b-versatile de Groq para producir cartas profesionales y personalizadas con una apertura sólida, habilidades alineadas, motivación genuina y un cierre seguro — estructuradas para causar impacto.",
      },
      {
        q: "¿Esta herramienta de IA es mejor que ChatGPT para cartas de presentación?",
        a: "Sí — a diferencia de ChatGPT, esta herramienta está diseñada específicamente para cartas de presentación con un prompt estructurado, salida validada e instrucción estricta de nunca usar marcadores. ChatGPT requiere prompts manuales y frecuentemente produce cartas genéricas o incompletas.",
      },
      {
        q: "¿Qué modelo de IA impulsa esta herramienta?",
        a: "Utiliza el llama-3.3-70b-versatile de Groq, uno de los modelos de lenguaje de código abierto más capaces, ejecutándose en el hardware LPU de Groq para inferencia casi instantánea.",
      },
      {
        q: "¿Puedo usar esta herramienta para cualquier tipo de trabajo o sector?",
        a: "Sí. La IA se adapta a cualquier rol — ingeniería de software, salud, finanzas, marketing, creatividad y más. Solo pega cualquier descripción de trabajo y personaliza la carta para esa posición y empresa específicas.",
      },
    ],
  },
  footer: {
    poweredBy: "Desarrollado con IA. - Creado por",
    author: "Jorge Mendes",
  },
  form: {
    resumeLabel: "Currículum",
    resumeSubLabel: "(solo PDF)",
    resumeAriaLabel: "Cargar currículum en PDF",
    resumeDropText: "Suelta tu PDF aquí, o",
    resumeBrowseText: "haz clic para seleccionar",
    resumeErrorPdf: "Solo se admiten archivos PDF.",
    jobDescLabel: "Descripción del Puesto",
    jobDescPlaceholder: "Pega aquí la descripción completa del puesto…",
    submitGenerating: "Generando…",
    submitGenerate: "Generar Carta de Presentación",
    resultHeading: "Tu carta de presentación",
    resultCopied: "Copiado",
    resultCopy: "Copiar",
    resultCopyFailed: "No se pudo copiar — selecciona el texto manualmente.",
    validationNoResume: "Por favor, sube tu currículum en PDF.",
    validationNoJobDesc: "Por favor, pega la descripción del puesto.",
    errorDefault: "Algo salió mal. Por favor, inténtalo de nuevo.",
  },
  themeToggle: {
    toLight: "Cambiar a modo claro",
    toDark: "Cambiar a modo oscuro",
  },
};
