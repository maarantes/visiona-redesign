import { useState, useEffect, useCallback, useRef } from "react";
import type React from "react";

const DURATION = 600;
export const INTERVAL = 8000;

type Direction = "left" | "right";

interface SlideState {
  active: number;
  exiting: number | null;
  direction: Direction;
}

function slideAnimation(index: number, state: SlideState): React.CSSProperties {
  if (index === state.active) {
    if (state.exiting === null) return {};
    const anim = state.direction === "left" ? "slide-in-right" : "slide-in-left";
    return { animation: `${anim} ${DURATION}ms ease forwards` };
  }
  if (index === state.exiting) {
    const anim = state.direction === "left" ? "slide-out-left" : "slide-out-right";
    return { animation: `${anim} ${DURATION}ms ease forwards` };
  }
  return { display: "none" };
}

export function useBanner(slideCount: number) {
  const [state, setState] = useState<SlideState>({
    active: 0,
    exiting: null,
    direction: "left",
  });
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStart = useRef<number | null>(null);

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
            ? (prev.active + 1) % slideCount
            : (prev.active - 1 + slideCount) % slideCount;
        return { active: next, exiting: prev.active, direction: dir };
      });
      scheduleExit();
    },
    [slideCount, scheduleExit],
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

  useEffect(() => {
    const timer = setInterval(() => navigate("left"), INTERVAL);
    return () => clearInterval(timer);
  }, [navigate, state.active]);

  return {
    activeIndex: state.active,
    navigate,
    goTo,
    getSlideStyle: (i: number) => slideAnimation(i, state),
    pointerHandlers: {
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerCancel: resetDrag,
    },
  };
}
