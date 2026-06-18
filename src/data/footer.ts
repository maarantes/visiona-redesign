import { pages } from "./pages";

type FooterLink = { title: string; href: string };
type FooterColumn = { heading: string; links: FooterLink[] };

export const footerColumns: FooterColumn[] = [
  {
    heading: "Engenharia",
    links: [
      pages.engineering.systemsIntegration,
      pages.engineering.spaceOps,
      pages.engineering.embeddedSoftware,
      pages.engineering.vcub,
      pages.engineering.sgdc,
    ],
  },
  {
    heading: "Soluções",
    links: [
      pages.solutions.imagingAsService,
      pages.solutions.municipalities,
      pages.solutions.energy,
    ],
  },
  {
    heading: "Produtos e Serviços",
    links: [
      pages.products.webvis,
      pages.products.satelliteImages,
      pages.products.radarSurvey,
      pages.products.satelliteCommunication,
      pages.products.vcub,
    ],
  },
  {
    heading: "Legal",
    links: [
      pages.legal.ethics,
      pages.legal.antiCorruption,
      pages.legal.helpline,
      pages.legal.privacy,
    ],
  },
  {
    heading: "Outros Links",
    links: [
      pages.about,
      pages.press.news,
      pages.press.gallery,
      pages.contact.talkToUs,
      pages.contact.careers
    ],
  },
];
