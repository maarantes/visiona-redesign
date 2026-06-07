import type { SubmenuData } from "@/components/Navbar/Submenu";
import submenuEngineering from "@/assets/images/submenu-engineering.png";
import submenuPress from "@/assets/images/submenu-press.png";
import submenuProducts from "@/assets/images/submenu-products.png";
import submenuSolutions from "@/assets/images/submenu-solutions.png";
import submenuContact from "@/assets/images/submenu-contact.jpg";

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
          title: "Integração de Sistemas Espaciais",
          subtitle: "Do projeto ao lançamento",
          href: "#",
        },
        {
          icon: "satellite",
          title: "Plataforma VCUB",
          subtitle: "Nanosatélites brasileiros",
          href: "#",
        },
        {
          icon: "planet",
          title: "Operações Espaciais",
          subtitle: "Controle e monitoramento orbital",
          href: "#",
        },
        {
          icon: "wifi",
          title: "Programa SGDC",
          subtitle: "Conectividade e soberania",
          href: "#",
        },
        {
          icon: "cpu",
          title: "Software Embarcado",
          subtitle: "Navegação, controle e comunicação",
          href: "#",
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
          title: "Soluções para Municípios",
          subtitle: "Gestão urbana com satélites",
          href: "#",
        },
        {
          icon: "lightning",
          title: "Soluções para Energia",
          subtitle: "Monitoramento inteligente de ativos",
          href: "#",
        },
        {
          icon: "image-plus",
          title: "Imagens como Serviço",
          subtitle: "Dados geoespaciais para negócios",
          href: "#",
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
          title: "Plataforma WebVis",
          subtitle: "Inteligência em dados espaciais",
          href: "#",
        },
        {
          icon: "satellite",
          title: "Plataforma VCUB",
          subtitle: "Nanosatélites brasileiros",
          href: "#",
        },
        {
          icon: "image",
          title: "Imagens Satelitais",
          subtitle: "Soluções em observação terrestre",
          href: "#",
        },
        {
          icon: "globe",
          title: "Comunicação por Satélite",
          subtitle: "Banda larga e IoT",
          href: "#",
        },
        {
          icon: "radar",
          title: "Aerolevantamento Radar",
          subtitle: "Mapeamento nas bandas X e P",
          href: "#",
        },
      ],
    },
  },
  { name: "Quem Somos", href: "#", hasSubmenu: false },
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
          title: "Imprensa",
          subtitle: "Notícias, eventos e comunicados",
          href: "#",
        },
        {
          icon: "camera",
          title: "Galeria de imagens",
          subtitle: "Bastidores da tecnologia espacial",
          href: "#",
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
      title: "Fale Conosco",
      subtitle: "Tire dúvidas com nossa equipe",
      href: "#",
    },
    {
      icon: "briefcase",
      title: "Junte-se a nós",
      subtitle: "Vagas e oportunidades de carreira",
      href: "#",
    },
  ],
};
