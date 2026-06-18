export interface Segment {
  title: string;
  value: string;
}

export const SEGMENTS_QUERY = `*[_type == "segment"] | order(title asc) {
  title,
  "value": _id
}`;
