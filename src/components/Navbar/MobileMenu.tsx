import { useState, useEffect } from "react";
import { cn } from "@/utils/className";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { type NavLink, contactSubmenuData } from "@/data/navbar";
import { SubmenuItem } from "./Submenu/SubmenuItem";

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggle: () => void;
  isSolid: boolean;
}

export function MobileMenuButton({
  isOpen,
  toggle,
  isSolid,
}: MobileMenuButtonProps) {
  return (
    <div className="flex xl:hidden items-center cursor-pointer">
      <button
        onClick={toggle}
        className={cn(
          "focus:outline-none transition-colors",
          isSolid
            ? "text-slate-600 hover:text-primary"
            : "text-white drop-shadow-md",
        )}
        aria-label="Abrir menu"
      >
        <Icon name={isOpen ? "close" : "menu"} className="size-6" />
      </button>
    </div>
  );
}

interface Props {
  isOpen: boolean;
  close: () => void;
  links: NavLink[];
}

export function MobileMenuDropdown({ isOpen, close, links }: Props) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setExpandedItem(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleItem = (itemName: string) => {
    setExpandedItem((prev) => (prev === itemName ? null : itemName));
  };

  return (
    <div className="xl:hidden bg-white shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
      <div className="px-4 pt-2 pb-6 space-y-1">
        {links.map((link) => {
          const isExpanded = expandedItem === link.name;

          return (
            <div key={link.name} className="block">
              {link.hasSubmenu ? (
                <button
                  onClick={() => toggleItem(link.name)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-3 text-base font-medium rounded-lg hover:bg-secondary cursor-pointer",
                    isExpanded
                      ? "text-primary bg-secondary"
                      : "text-slate-700 hover:text-primary",
                  )}
                >
                  {link.name}
                  <Icon
                    name="chevron-down"
                    size={20}
                    className={cn(
                      "transition-transform duration-200",
                      isExpanded && "rotate-180",
                    )}
                  />
                </button>
              ) : (
                <a
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-primary hover:bg-secondary rounded-lg"
                  onClick={close}
                >
                  {link.name}
                </a>
              )}

              {link.hasSubmenu && isExpanded && (
                <div className="space-y-1 mt-2 mb-2 animate-in fade-in slide-in-from-top-2">
                  {link.submenuData?.items.map((item, index) => (
                    <div key={index} onClick={close}>
                      <SubmenuItem
                        icon={item.icon}
                        title={item.title}
                        subtitle={item.subtitle}
                        href={item.href}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <Button
          onClick={() => toggleItem("Contato")}
          className="w-full flex justify-center items-center gap-2 py-3 mt-4"
        >
          Contato
          <Icon
            name="chevron-down"
            size={18}
            stroke={2.5}
            className={cn(
              "transition-transform duration-200",
              expandedItem === "Contato" && "rotate-180",
            )}
          />
        </Button>

        {expandedItem === "Contato" && (
          <div className="space-y-1 mt-2 animate-in fade-in slide-in-from-top-2">
            {contactSubmenuData.items.map((item, index) => (
              <div key={index} onClick={close}>
                <SubmenuItem
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  href={item.href}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
