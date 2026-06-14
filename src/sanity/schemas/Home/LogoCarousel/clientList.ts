import type { SegmentValue } from "./segments";

export interface ClientItem {
  name: string;
  image: string;
  segment: SegmentValue;
}

export const CLIENT_LIST_QUERY = `*[_type == "logoCarousel"] | order(name asc) {
  name,
  "segment": segmento,
  "image": image.asset->url
}`;
