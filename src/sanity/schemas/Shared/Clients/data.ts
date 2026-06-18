export interface LogoCarousel {
  name: string;
  image: string;
}

export interface ClientItem {
  name: string;
  image: string;
  segment: string;
}

export const LOGO_CAROUSEL_QUERY = `*[_type == "client"] | order(name asc) {
  name,
  "image": image.asset->url
}`;

export const CLIENT_LIST_QUERY = `*[_type == "client"] | order(name asc) {
  name,
  "segment": segmento->_id,
  "image": image.asset->url
}`;
