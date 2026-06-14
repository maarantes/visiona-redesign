export const SEGMENTS = [
  { title: "Agronegócio", value: "agronegocio" },
  { title: "Celulose e Papel", value: "celulose" },
  { title: "Defesa e Aeroespacial", value: "defesa" },
  { title: "Energia", value: "energia" },
  { title: "Financeiro", value: "financeiro" },
  { title: "Geotecnologia", value: "geotecnologia" },
  { title: "Governo e Setor Público", value: "governo" },
  { title: "Indústria", value: "industria" },
  { title: "Logística e Transporte", value: "logistica" },
  { title: "Meio Ambiente", value: "meioambiente" },
  { title: "Mineração", value: "mineracao" },
  { title: "Telecomunicações", value: "telecomunicacoes" },
] as const;

export type SegmentValue = (typeof SEGMENTS)[number]["value"];
