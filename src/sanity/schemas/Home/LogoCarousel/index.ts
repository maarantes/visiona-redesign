import { defineField, defineType } from "sanity";

export const logoCarouselSchema = defineType({
  name: "logoCarousel",
  title: "Carrossel de Logotipos",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome da Empresa", type: "string" }),
    defineField({
      name: "segmento",
      title: "Segmento",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
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
        ],
      },
    }),
    defineField({ name: "image", title: "Logotipo", type: "image" }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
