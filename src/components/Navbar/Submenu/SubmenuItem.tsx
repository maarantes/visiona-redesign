import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon/IconName";

export interface SubmenuItemProps {
  icon: IconName;
  title: string;
  subtitle: string;
  href: string;
}

export function SubmenuItem({ icon, title, subtitle, href }: SubmenuItemProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 p-2 group hover:bg-slate-50"
    >
      <div className="size-12 flex items-center justify-center bg-secondary text-primary group-hover:bg-primary group-hover:text-white shrink-0">
        <Icon name={icon} size={28} stroke={1.75} />
      </div>

      <div className="flex flex-col justify-center">
        <h4 className="text-slate-800 font-medium text-base leading-tight">
          {title}
        </h4>
        <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
      </div>
    </a>
  );
}
