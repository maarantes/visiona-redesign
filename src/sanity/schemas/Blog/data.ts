export interface BlogPost {
  title: string;
  slug: string;
  publishedAt: string;
  author: string | null;
  image: string | null;
}

export type PortableTextBlock =
  | {
      _key: string;
      _type: "block";
      style: "normal" | "h4";
      children: {
        _key: string;
        _type: "span";
        text: string;
        marks: string[];
      }[];
      markDefs: { _key: string; _type: string; href?: string }[];
    }
  | {
      _key: string;
      _type: "image";
      url: string;
      alt?: string;
      caption?: string;
    }
  | {
      _key: string;
      _type: "quote";
      text: string;
      author: string;
    };

export interface BlogPostFull extends BlogPost {
  body: PortableTextBlock[] | null;
}

export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) [0..4] {
  title,
  "slug": slug.current,
  publishedAt,
  author,
  "image": image.asset->url,
}`;

export const BLOG_SLUGS_QUERY = `*[_type == "blogPost"] { "slug": slug.current }`;

export const BLOG_POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  publishedAt,
  author,
  "image": image.asset->url,
  body[] {
    ...,
    _type == "image" => { ..., "url": asset->url }
  }
}`;
