import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import DOMPurify from "isomorphic-dompurify";
import { Button } from "@/components/Button";
import { cn } from "@/utils/className";
import type { BannerCarouselSlide } from "@/sanity/schemas/Home/BannerCarousel/data";
import { sanityImageSrcSet } from "@/sanity/image";
import { useBanner, INTERVAL } from "./useBanner";

function NavButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="cursor-pointer text-white/70 hover:text-white"
    >
      {children}
    </button>
  );
}

interface Props {
  slides: BannerCarouselSlide[];
}

export function Banner({ slides }: Props) {
  const { activeIndex, navigate, goTo, getSlideStyle, pointerHandlers } =
    useBanner(slides.length);

  return (
    <div
      className="relative h-dvh w-full overflow-hidden touch-pan-y"
      {...pointerHandlers}
    >
      {slides.map((slide, i) => (
        <div key={i} style={getSlideStyle(i)} className="absolute inset-0">
          <img
            src={slide.image}
            srcSet={sanityImageSrcSet(slide.image)}
            sizes="100vw"
            alt=""
            className="h-full w-full object-cover"
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-0 flex items-center">
            <div className="w-full section-container">
              <div className="w-full lg:w-2/3">
                <p className="text-2xl sm:text-5xl leading-tight font-semibold text-white xl:text-6xl">
                  {slide.titleBefore}{" "}
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 lg:gap-4 rounded bg-white px-2 lg:px-4 py-0 sm:py-1 align-middle uppercase text-3xl text-slate-900 xl:text-5xl",
                      /^[,:]/.test(slide.titleAfter) && "mr-1",
                    )}
                  >
                    <span
                      className="size-6 sm:size-9 lg:size-14 shrink-0 [&>svg]:h-full [&>svg]:w-full"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(slide.highlight.icon, {
                          USE_PROFILES: { svg: true, svgFilters: true },
                        }),
                      }}
                    />
                    <span className="text-2xl sm:text-5xl xl:text-6xl font-semibold">
                      {slide.highlight.text}
                    </span>
                  </span>
                  {/^[,:]/.test(slide.titleAfter) ? "" : " "}
                  {slide.titleAfter}
                </p>

                <p className="mt-10 mb-12 leading-relaxed max-w-full lg:max-w-4/5 text-base sm:text-2xl text-white/95">
                  {slide.subtitle}
                </p>

                <a href={slide.button.href}>
                  <Button size="lg" className="w-full sm:w-auto">
                    {slide.button.text}
                    <IconChevronRight size={20} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 z-20 w-full">
        <div className="section-container flex items-center justify-between">
          <NavButton onClick={() => navigate("right")} label="Slide anterior">
            <IconChevronLeft size={32} />
          </NavButton>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir para slide ${i + 1}`}
                className={cn(
                  "relative h-1.5 cursor-pointer overflow-hidden rounded-full bg-white/40 transition-all duration-300",
                  i === activeIndex ? "w-10 sm:w-24" : "w-5 sm:w-12",
                )}
              >
                {i === activeIndex && (
                  <span
                    key={activeIndex}
                    className="absolute inset-0 origin-left rounded-full bg-white"
                    style={{
                      animation: `scale-x-in ${INTERVAL}ms linear forwards`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <NavButton onClick={() => navigate("left")} label="Próximo slide">
            <IconChevronRight size={32} />
          </NavButton>
        </div>
      </div>
    </div>
  );
}
