import { defineField, defineType } from "sanity";

export const bannerCarouselSchema = defineType({
  name: "bannerCarousel",
  title: "Banner Carousel",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Ordem", type: "number" }),
    defineField({
      name: "titleBefore",
      title: "Título (antes do destaque)",
      type: "string",
    }),
    defineField({
      name: "highlight",
      title: "Destaque",
      type: "object",
      fields: [
        defineField({ name: "icon", title: "Ícone (SVG)", type: "text", description: "Cole o código SVG do ícone (Tabler Icons)" }),
        defineField({ name: "text", title: "Texto", type: "string" }),
      ],
    }),
    defineField({
      name: "titleAfter",
      title: "Título (depois do destaque)",
      type: "string",
    }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
    defineField({
      name: "button",
      title: "Botão",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Texto", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string" }),
      ],
    }),
    defineField({ name: "image", title: "Imagem de Fundo", type: "image" }),
  ],
  orderings: [
    {
      title: "Ordem",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      titleBefore: "titleBefore",
      highlightText: "highlight.text",
      titleAfter: "titleAfter",
      media: "image",
    },
    prepare({ titleBefore, highlightText, titleAfter, media }) {
      return {
        title: [titleBefore, highlightText, titleAfter].filter(Boolean).join(" "),
        media,
      };
    },
  },
});
