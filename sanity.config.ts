import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityConfig } from "./src/sanity/config";
import { bannerCarouselSchema } from "./src/sanity/schemas/Home/BannerCarousel";

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
                    S.documentTypeListItem("bannerCarousel").title("Banner Carousel"),
                  ]),
              ),
          ]),
    }),
  ],
  schema: {
    types: [bannerCarouselSchema],
  },
});
