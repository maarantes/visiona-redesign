import { defineField, defineType } from "sanity";
import { svgField, linkField } from "@/sanity/fields";

export const bannerCarouselSchema = defineType({
  name: "bannerCarousel",
  title: "Hero Banner",
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
        svgField,
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
        linkField("href", "Link"),
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
