import { iconMap, type IconName } from "./IconName";
import { cn } from "@/utils/className";
import type { IconProps as TablerIconProps } from "@tabler/icons-react";

interface IconProps extends TablerIconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className, ...props }: IconProps) {
  const TablerIcon = iconMap[name];

  return <TablerIcon className={cn("shrink-0", className)} {...props} />;
}
