type Page = { title: string; href: string };

const p = (title: string, href: string): Page => ({ title, href });

export const pages = {
  engineering: {
    systemsIntegration: p("Integração de Sistemas Espaciais", "#"),
    vcub: p("Plataforma VCUB", "#"),
    spaceOps: p("Operações Espaciais", "#"),
    sgdc: p("Programa SGDC", "#"),
    embeddedSoftware: p("Software Embarcado", "#"),
  },
  solutions: {
    municipalities: p("Soluções para Municípios", "#"),
    energy: p("Soluções para Energia", "#"),
    imagingAsService: p("Imagens como Serviço", "#"),
  },
  products: {
    webvis: p("Plataforma WebVis", "#"),
    vcub: p("Plataforma VCUB", "#"),
    satelliteImages: p("Imagens Satelitais", "#"),
    satelliteCommunication: p("Comunicação por Satélite", "#"),
    radarSurvey: p("Aerolevantamento Radar", "#"),
  },
  press: {
    news: p("Imprensa", "#"),
    gallery: p("Galeria de imagens", "#"),
  },
  about: p("Quem Somos", "#"),
  contact: {
    talkToUs: p("Fale Conosco", "#"),
    careers: p("Junte-se a nós", "#"),
  },
  legal: {
    ethics: p("Código de ética e conduta", "#"),
    antiCorruption: p("Política anticorrupção", "#"),
    helpline: p("Help line: Canal de práticas danosas", "#"),
    privacy: p("Política de privacidade e termos de uso", "#"),
  },
} as const;
