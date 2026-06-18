export type NavbarImages = Record<string, string | null>;

export const NAVBAR_CONFIG_QUERY = `*[_type == "navbarConfig" && _id == "navbar-config"][0]{
  "Engenharia": engineeringImage.asset->url,
  "Soluções": solutionsImage.asset->url,
  "Produtos e Serviços": productsImage.asset->url,
  "Imprensa": pressImage.asset->url,
  "Contato": contactImage.asset->url,
}`;
