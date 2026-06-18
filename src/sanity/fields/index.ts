import { defineField } from "sanity";

export const svgField = defineField({
  name: "icon",
  title: "Ícone (SVG)",
  type: "text",
  description: "Cole o código SVG do ícone (Tabler Icons)",
});

export function linkField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "string",
    validation: (Rule) =>
      Rule.custom((value) => {
        if (!value) return true;
        if (
          value.startsWith("/") ||
          value.startsWith("http://") ||
          value.startsWith("https://")
        )
          return true;
        return "Use um caminho interno ou URL completa.";
      }),
  });
}
