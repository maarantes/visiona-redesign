import { defineField, defineType } from "sanity";

export const segmentSchema = defineType({
  name: "segment",
  title: "Segmento",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome",
      type: "string",
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
