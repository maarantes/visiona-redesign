export interface BannerCarousel {
  titleBefore: string;
  highlight: {
    icon: string;
    text: string;
  };
  titleAfter: string;
  subtitle: string;
  button: {
    text: string;
    href: string;
  };
  image: string;
}

export const BANNER_CAROUSEL_QUERY = `*[_type == "bannerCarousel"] | order(order asc) {
  titleBefore,
  highlight,
  titleAfter,
  subtitle,
  button,
  "image": image.asset->url
}`;
