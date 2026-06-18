import { cn } from "../utils/className";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

export function Button({
  type = "button",
  size = "md",
  className,
  children,
  ...props
}: Props) {
  const sizeClasses = {
    sm: "text-sm px-4 py-1.5 gap-2",
    md: "text-base px-6 py-2.5 gap-2",
    lg: "text-lg px-8 py-3.5 gap-4",
  };

  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center",
        "bg-primary font-medium text-white",
        "hover:bg-primary-emphasis cursor-pointer",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
