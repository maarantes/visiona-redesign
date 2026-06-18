import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityConfig } from "./src/sanity/config";
import { bannerCarouselSchema } from "./src/sanity/schemas/Home/BannerCarousel";
import { solutionCardSchema } from "./src/sanity/schemas/Home/SolutionCards";
import { blogPostSchema } from "./src/sanity/schemas/Blog";
import { navbarConfigSchema } from "./src/sanity/schemas/Shared/Navbar";
import { segmentSchema } from "./src/sanity/schemas/Shared/Segments";
import { clientSchema } from "./src/sanity/schemas/Shared/Clients";

export default defineConfig({
  ...sanityConfig,
  title: "Visiona",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.listItem()
              .title("Compartilhado")
              .child(
                S.list()
                  .title("Compartilhado")
                  .items([
                    S.listItem()
                      .title("Navbar")
                      .child(
                        S.document()
                          .documentId("navbar-config")
                          .schemaType("navbarConfig")
                          .title("Navbar"),
                      ),
                    S.documentTypeListItem("segment").title("Segmentos"),
                    S.documentTypeListItem("client").title("Clientes"),
                  ]),
              ),
            S.documentTypeListItem("blogPost").title("Blog"),
            S.listItem()
              .title("Home")
              .child(
                S.list()
                  .title("Home")
                  .items([
                    S.documentTypeListItem("bannerCarousel").title(
                      "Slides do Banner",
                    ),
                    S.documentTypeListItem("solutionCard").title(
                      "Cards de Soluções",
                    ),
                  ]),
              ),
          ]),
    }),
  ],
  schema: {
    types: [
      bannerCarouselSchema,
      solutionCardSchema,
      blogPostSchema,
      navbarConfigSchema,
      segmentSchema,
      clientSchema,
    ],
  },
});
