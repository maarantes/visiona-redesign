import { cn } from "@/utils/className";
import { type SubmenuItemProps, SubmenuItem } from "./SubmenuItem";
import { useEffect, useState } from "react";

export type SubmenuData = {
  image: string;
  items: SubmenuItemProps[];
  imagePosition?: "left" | "right";
  imageWidth?: "lg" | "sm";
  columns?: 1 | 2;
};

interface Props {
  activeSubmenu: string | null;
  data?: SubmenuData;
}

export function Submenu({ activeSubmenu, data }: Props) {
  const [cachedData, setCachedData] = useState<SubmenuData | undefined>(data);

  useEffect(() => {
    if (data) {
      setCachedData(data);
    }
  }, [data]);

  const imageWidthClass = cachedData?.imageWidth === "lg" ? "w-[60%]" : "w-1/4";

  return (
    <div
      className={cn(
        "absolute top-full -left-17.5 w-full z-50 pt-2 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        data
          ? "[clip-path:inset(-50px_-50px_-50px_-50px)] pointer-events-auto"
          : "[clip-path:inset(0_0_100%_0)] pointer-events-none",
      )}
    >
      <div
        className={cn(
          "w-full bg-white border-2 border-white shadow-2xl overflow-hidden flex h-57",
          cachedData?.imagePosition === "right"
            ? "flex-row-reverse"
            : "flex-row",
        )}
      >
        <div className={cn("shrink-0 bg-slate-100", imageWidthClass)}>
          <img
            src={cachedData?.image}
            alt={activeSubmenu || "Imagem do submenu"}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-2 bg-white overflow-y-auto">
          <div
            className={cn(
              "grid gap-x-2 gap-y-2 h-full content-start",
              cachedData?.columns === 1 ? "grid-cols-1" : "grid-cols-2",
            )}
          >
            {cachedData?.items.map((item, index) => (
              <SubmenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
