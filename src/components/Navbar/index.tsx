import { useState, useEffect } from "react";
import logoVisionaColor from "@/assets/images/logo-color.svg";
import logoVisionaWhite from "@/assets/images/logo-white.svg";
import flagBrazil from "@/assets/images/flag-brazil.png";
import { cn } from "@/utils/className";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { MobileMenuButton, MobileMenuDropdown } from "./MobileMenu";
import { Submenu } from "./Submenu";
import { navLinks, contactSubmenuData } from "@/data/navbar";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = isScrolled || isMobileMenuOpen;

  const activeSubmenuData =
    activeSubmenu === "Contato"
      ? contactSubmenuData
      : navLinks.find((link) => link.name === activeSubmenu)?.submenuData;

  return (
    <header
      onMouseLeave={() => setActiveSubmenu(null)}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isSolid ? "bg-white shadow-sm" : "bg-transparent",
      )}
    >
      <div className="section-container">
        <div className="flex justify-between items-center h-20 transition-all duration-300">
          <div className="shrink-0 flex items-center">
            <a
              href="/"
              aria-label="Visiona — página inicial"
              className="group relative inline-flex"
            >
              <img
                src={isSolid ? logoVisionaColor.src : logoVisionaWhite.src}
                alt="Logo Visiona"
                className="w-35 sm:w-45 transition-opacity duration-300 relative z-10 group-hover:brightness-90"
              />
            </a>
          </div>

          <div className="hidden xl:flex items-center ml-auto space-x-8 relative">
            <nav className="flex space-x-8 h-20 items-center">
              {navLinks.map((link) => {
                const isActive = activeSubmenu === link.name;

                const linkClasses = cn(
                  "flex items-center gap-1 font-medium text-sm lg:text-base transition-colors focus:outline-none cursor-pointer",
                  isSolid
                    ? "text-slate-800 hover:text-primary"
                    : "text-white hover:text-slate-200 drop-shadow-md",
                  isActive && (isSolid ? "text-primary" : "text-slate-200"),
                );

                const linkContent = (
                  <>
                    {link.name}
                    {link.hasSubmenu && (
                      <Icon
                        name="chevron-down"
                        size={16}
                        stroke={2}
                        className={cn(
                          "transition-transform duration-200",
                          isActive && "rotate-180",
                        )}
                      />
                    )}
                  </>
                );

                return (
                  <div
                    key={link.name}
                    className="flex items-center h-full"
                    onMouseEnter={() =>
                      link.hasSubmenu
                        ? setActiveSubmenu(link.name)
                        : setActiveSubmenu(null)
                    }
                  >
                    {link.href ? (
                      <a href={link.href} className={linkClasses}>
                        {linkContent}
                      </a>
                    ) : (
                      <button type="button" className={linkClasses}>
                        {linkContent}
                      </button>
                    )}
                  </div>
                );
              })}
            </nav>

            <div
              className="flex items-center h-full"
              onMouseEnter={() => setActiveSubmenu("Contato")}
            >
              <Button className="py-2 flex items-center gap-1.5">
                Contato
                <Icon
                  name="chevron-down"
                  size={16}
                  stroke={2}
                  className={cn(
                    "transition-transform duration-200",
                    activeSubmenu === "Contato" && "rotate-180",
                  )}
                />
              </Button>
            </div>

            <div
              className={cn(
                "flex items-center gap-2 font-medium cursor-pointer select-none transition-colors",
                isSolid ? "text-slate-800" : "text-white",
              )}
            >
              <img
                src={flagBrazil.src}
                alt="Brasil"
                width={32}
                className="me-1"
              />
              <span>PT</span>
              <Icon name="chevron-down" size={16} stroke={2} />
            </div>

            <Submenu activeSubmenu={activeSubmenu} data={activeSubmenuData} />
          </div>

          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            isSolid={isSolid}
          />
        </div>
      </div>

      <MobileMenuDropdown
        isOpen={isMobileMenuOpen}
        close={() => setIsMobileMenuOpen(false)}
        links={navLinks as any}
      />
    </header>
  );
}
