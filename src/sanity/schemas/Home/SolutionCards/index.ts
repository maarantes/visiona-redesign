import { defineField, defineType } from "sanity";
import { svgField, linkField } from "@/sanity/fields";

export const solutionCardSchema = defineType({
  name: "solutionCard",
  title: "Card de Solução",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Ordem", type: "number" }),
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "description", title: "Descrição", type: "text", rows: 3, validation: (Rule) => Rule.max(130) }),
    svgField,
    defineField({ name: "image", title: "Imagem de Fundo", type: "image" }),
    linkField("link", "Link"),
  ],
  orderings: [
    {
      title: "Ordem",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
