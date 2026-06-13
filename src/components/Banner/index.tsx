import { useState, useEffect, useCallback, useRef } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import DOMPurify from "isomorphic-dompurify";
import { Button } from "@/components/Button";
import { cn } from "@/utils/className";
import { Container } from "@/constants/layout";
import type { BannerCarouselSlide } from "@/sanity/schemas/Home/BannerCarousel/data";

const DURATION = 600;
const INTERVAL = 8000;

type Direction = "left" | "right";

interface SlideState {
  active: number;
  exiting: number | null;
  direction: Direction;
}

function sanityImageSrcSet(url: string) {
  return [640, 1280, 1920, 2560]
    .map((w) => `${url}?w=${w}&auto=format ${w}w`)
    .join(", ");
}

function slideAnimation(index: number, state: SlideState): React.CSSProperties {
  if (index === state.active) {
    if (state.exiting === null) return {};
    const anim =
      state.direction === "left" ? "slide-in-right" : "slide-in-left";
    return { animation: `${anim} ${DURATION}ms ease forwards` };
  }
  if (index === state.exiting) {
    const anim =
      state.direction === "left" ? "slide-out-left" : "slide-out-right";
    return { animation: `${anim} ${DURATION}ms ease forwards` };
  }
  return { display: "none" };
}

interface Props {
  slides: BannerCarouselSlide[];
}

export function Banner({ slides }: Props) {
  const [state, setState] = useState<SlideState>({
    active: 0,
    exiting: null,
    direction: "left",
  });
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStart = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    document.body.style.userSelect = "none";
  };

  const resetDrag = () => {
    dragStart.current = null;
    document.body.style.userSelect = "";
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - e.clientX;
    resetDrag();
    if (Math.abs(diff) < 50) return;
    navigate(diff > 0 ? "left" : "right");
  };

  const scheduleExit = useCallback(() => {
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(
      () => setState((s) => ({ ...s, exiting: null })),
      DURATION,
    );
  }, []);

  const navigate = useCallback(
    (dir: Direction) => {
      setState((prev) => {
        const next =
          dir === "left"
            ? (prev.active + 1) % slides.length
            : (prev.active - 1 + slides.length) % slides.length;
        return { active: next, exiting: prev.active, direction: dir };
      });
      scheduleExit();
    },
    [slides.length, scheduleExit],
  );

  const goTo = useCallback(
    (index: number) => {
      setState((prev) => {
        if (index === prev.active) return prev;
        const dir = index > prev.active ? "left" : "right";
        return { active: index, exiting: prev.active, direction: dir };
      });
      scheduleExit();
    },
    [scheduleExit],
  );

  useEffect(() => {
    const timer = setInterval(() => navigate("left"), INTERVAL);
    return () => clearInterval(timer);
  }, [navigate, state.active]);

  return (
    <div
      className="relative h-dvh w-full overflow-hidden touch-pan-y"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={resetDrag}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          style={slideAnimation(i, state)}
          className="absolute inset-0"
        >
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
            <div className={cn("w-full", Container)}>
              <div className="w-full lg:w-2/3">
                <p className="text-2xl sm:text-5xl leading-tight font-semibold text-white xl:text-6xl">
                  {slide.titleBefore}{" "}
                  <span className="inline-flex items-center gap-2 lg:gap-4 rounded bg-white px-2 lg:px-4 py-0 sm:py-1 align-middle uppercase text-3xl text-slate-900 xl:text-5xl">
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
                  </span>{" "}
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
        <div className={cn(Container, "flex items-center justify-between")}>
          <button
            onClick={() => navigate("right")}
            aria-label="Slide anterior"
            className="cursor-pointer text-white/70 hover:text-white"
          >
            <IconChevronLeft size={32} />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir para slide ${i + 1}`}
                className={cn(
                  "relative h-1.5 cursor-pointer overflow-hidden rounded-full bg-white/40 transition-all duration-300",
                  i === state.active ? "w-10 sm:w-24" : "w-5 sm:w-12",
                )}
              >
                {i === state.active && (
                  <span
                    key={state.active}
                    className="absolute inset-0 origin-left rounded-full bg-white"
                    style={{
                      animation: `scale-x-in ${INTERVAL}ms linear forwards`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("left")}
            aria-label="Próximo slide"
            className="cursor-pointer text-white/70 hover:text-white"
          >
            <IconChevronRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
