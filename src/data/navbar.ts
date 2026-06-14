import type { SubmenuData } from "@/components/Navbar/Submenu";
import submenuEngineering from "@/assets/images/submenu-engineering.png";
import submenuPress from "@/assets/images/submenu-press.png";
import submenuProducts from "@/assets/images/submenu-products.png";
import submenuSolutions from "@/assets/images/submenu-solutions.png";
import submenuContact from "@/assets/images/submenu-contact.jpg";
import { pages } from "@/data/pages";

export type NavLink = {
  name: string;
  href?: string;
  hasSubmenu: boolean;
  submenuData?: SubmenuData;
};

export const navLinks: NavLink[] = [
  {
    name: "Engenharia",
    hasSubmenu: true,
    submenuData: {
      image: submenuEngineering.src,
      imagePosition: "left",
      imageWidth: "sm",
      columns: 2,
      items: [
        {
          icon: "rocket",
          ...pages.engineering.systemsIntegration,
          subtitle: "Do projeto ao lançamento",
        },
        {
          icon: "satellite",
          ...pages.engineering.vcub,
          subtitle: "Nanosatélites brasileiros",
        },
        {
          icon: "planet",
          ...pages.engineering.spaceOps,
          subtitle: "Controle e monitoramento orbital",
        },
        {
          icon: "wifi",
          ...pages.engineering.sgdc,
          subtitle: "Conectividade e soberania",
        },
        {
          icon: "cpu",
          ...pages.engineering.embeddedSoftware,
          subtitle: "Navegação, controle e comunicação",
        },
      ],
    },
  },
  {
    name: "Soluções",
    hasSubmenu: true,
    submenuData: {
      image: submenuSolutions.src,
      imagePosition: "left",
      imageWidth: "sm",
      columns: 2,
      items: [
        {
          icon: "building",
          ...pages.solutions.municipalities,
          subtitle: "Gestão urbana com satélites",
        },
        {
          icon: "lightning",
          ...pages.solutions.energy,
          subtitle: "Monitoramento inteligente de ativos",
        },
        {
          icon: "image-plus",
          ...pages.solutions.imagingAsService,
          subtitle: "Dados geoespaciais para negócios",
        },
      ],
    },
  },
  {
    name: "Produtos e Serviços",
    hasSubmenu: true,
    submenuData: {
      image: submenuProducts.src,
      imagePosition: "left",
      imageWidth: "sm",
      columns: 2,
      items: [
        {
          icon: "desktop-search",
          ...pages.products.webvis,
          subtitle: "Inteligência em dados espaciais",
        },
        {
          icon: "satellite",
          ...pages.products.vcub,
          subtitle: "Nanosatélites brasileiros",
        },
        {
          icon: "image",
          ...pages.products.satelliteImages,
          subtitle: "Soluções em observação terrestre",
        },
        {
          icon: "globe",
          ...pages.products.satelliteCommunication,
          subtitle: "Banda larga e IoT",
        },
        {
          icon: "radar",
          ...pages.products.radarSurvey,
          subtitle: "Mapeamento nas bandas X e P",
        },
      ],
    },
  },
  { name: pages.about.title, href: pages.about.href, hasSubmenu: false },
  {
    name: "Imprensa",
    hasSubmenu: true,
    submenuData: {
      image: submenuPress.src,
      imagePosition: "left",
      imageWidth: "lg",
      columns: 1,
      items: [
        {
          icon: "book",
          ...pages.press.news,
          subtitle: "Notícias, eventos e comunicados",
        },
        {
          icon: "camera",
          ...pages.press.gallery,
          subtitle: "Bastidores da tecnologia espacial",
        },
      ],
    },
  },
];

export const contactSubmenuData: SubmenuData = {
  image: submenuContact.src,
  imagePosition: "left",
  imageWidth: "lg",
  columns: 1,
  items: [
    {
      icon: "message",
      ...pages.contact.talkToUs,
      subtitle: "Tire dúvidas com nossa equipe",
    },
    {
      icon: "briefcase",
      ...pages.contact.careers,
      subtitle: "Vagas e oportunidades de carreira",
    },
  ],
};
