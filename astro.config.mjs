import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import path from "path";

export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: "c2x1figb",
      dataset: "development",
      useCdn: false,
      apiVersion: "2026-06-05",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(new URL(".", import.meta.url).pathname, "./src"),
      },
    },
  },
});
