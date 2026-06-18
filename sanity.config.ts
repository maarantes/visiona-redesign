import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityConfig } from "./src/sanity/config";
import { bannerCarouselSchema } from "./src/sanity/schemas/Home/BannerCarousel";
import { logoCarouselSchema } from "./src/sanity/schemas/Home/LogoCarousel";
import { solutionCardSchema } from "./src/sanity/schemas/Home/SolutionCards";
import { blogPostSchema } from "./src/sanity/schemas/Blog";

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
              .title("Home")
              .child(
                S.list()
                  .title("Home")
                  .items([
                    S.documentTypeListItem("bannerCarousel").title(
                      "Slides do Banner",
                    ),
                    S.documentTypeListItem("logoCarousel").title(
                      "Carrossel de Logotipos",
                    ),
                    S.documentTypeListItem("solutionCard").title(
                      "Cards de Soluções",
                    ),
                  ]),
              ),
            S.documentTypeListItem("blogPost").title("Blog"),
          ]),
    }),
  ],
  schema: {
    types: [
      bannerCarouselSchema,
      logoCarouselSchema,
      solutionCardSchema,
      blogPostSchema,
    ],
  },
});
