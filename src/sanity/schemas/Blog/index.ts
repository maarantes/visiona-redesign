import { defineField, defineType } from "sanity";

export const blogPostSchema = defineType({
  name: "blogPost",
  title: "Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "date",
      validation: (R) => R.required(),
    }),
    defineField({ name: "author", title: "Autor", type: "string" }),
    defineField({
      name: "image",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Texto normal", value: "normal" },
            { title: "Subtítulo", value: "h4" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              title: "Descrição da imagem",
              type: "string",
            },
          ],
        },
        {
          type: "object",
          name: "quote",
          title: "Citação",
          fields: [
            {
              name: "text",
              title: "Frase",
              type: "text",
              rows: 3,
              validation: (R) => R.required(),
            },
            {
              name: "author",
              title: "Autor",
              type: "string",
              validation: (R) => R.required(),
            },
          ],
          preview: {
            select: { title: "text", subtitle: "author" },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Mais recentes",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "author", media: "image" },
  },
});
