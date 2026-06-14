import { defineField, defineType } from "sanity";
import { SEGMENTS } from "./segments";

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
      options: { list: SEGMENTS.map((s) => ({ title: s.title, value: s.value })) },
    }),
    defineField({ name: "image", title: "Logotipo", type: "image" }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
