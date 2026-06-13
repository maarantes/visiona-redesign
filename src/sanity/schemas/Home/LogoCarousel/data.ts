export interface LogoCarousel {
  name: string;
  image: string;
}

export const LOGO_CAROUSEL_QUERY = `*[_type == "logoCarousel"] | order(name asc) {
  name,
  "image": image.asset->url
}`;
