import { defineField, defineType } from "sanity";

export const solutionCardSchema = defineType({
  name: "solutionCard",
  title: "Card de Solução",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Ordem", type: "number" }),
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "description", title: "Descrição", type: "text", rows: 3, validation: (Rule) => Rule.max(130) }),
    defineField({
      name: "icon",
      title: "Ícone (SVG)",
      type: "text",
      description: "Cole o código SVG do ícone (Tabler Icons)",
    }),
    defineField({ name: "image", title: "Imagem de Fundo", type: "image" }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;
          if (value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://")) return true;
          return "Use um caminho interno (/pagina) ou URL completa (https://...)";
        }),
    }),
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
