import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import path from "path";
import { sanityConfig } from "./src/sanity/config";

export default defineConfig({
  integrations: [
    react(),
    sanity({
      ...sanityConfig,
      studioBasePath: "/studio",
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
