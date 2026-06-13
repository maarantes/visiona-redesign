import type { LogoCarousel } from "@/sanity/schemas/Home/LogoCarousel/data";

export function LogoCarousel({ logos }: { logos: LogoCarousel[] }) {
  const duration = `${logos.length * 10}s`;

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className="flex w-max"
        style={{ animation: `marquee ${duration} linear infinite` }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex w-40 shrink-0 items-center justify-center px-4 py-8"
          >
            <img
              src={`${logo.image}?w=354&auto=format`}
              alt={logo.name}
              className="object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
