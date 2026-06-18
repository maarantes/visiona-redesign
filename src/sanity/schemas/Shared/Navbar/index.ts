import { defineField, defineType } from "sanity";

export const navbarConfigSchema = defineType({
  name: "navbarConfig",
  title: "Navbar",
  type: "document",
  fields: [
    defineField({
      name: "engineeringImage",
      title: "Imagem — Engenharia",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "solutionsImage",
      title: "Imagem — Soluções",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "productsImage",
      title: "Imagem — Produtos e Serviços",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "pressImage",
      title: "Imagem — Imprensa",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "contactImage",
      title: "Imagem — Contato",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navbar" };
    },
  },
});
