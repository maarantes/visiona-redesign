export interface SolutionCard {
  title: string;
  description: string;
  icon: string;
  image: string;
  link: string;
}

export const SOLUTION_CARDS_QUERY = `*[_type == "solutionCard"] | order(order asc) [0..3] {
  title,
  description,
  icon,
  link,
  "image": image.asset->url
}`;
