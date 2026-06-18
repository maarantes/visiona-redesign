import { defineField, defineType } from "sanity";

export const clientSchema = defineType({
  name: "client",
  title: "Cliente",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome da Empresa", type: "string" }),
    defineField({
      name: "segmento",
      title: "Segmento",
      type: "reference",
      to: [{ type: "segment" }],
      validation: (R) => R.required(),
    }),
    defineField({ name: "image", title: "Logotipo", type: "image" }),
  ],
  preview: {
    select: { title: "name", subtitle: "segmento.title", media: "image" },
  },
});
