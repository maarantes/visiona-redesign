import { useState } from "react";
import { cn } from "@/utils/className";
import {
  SEGMENTS,
  type SegmentValue,
} from "@/sanity/schemas/Home/LogoCarousel/segments";
import type { ClientItem } from "@/sanity/schemas/Home/LogoCarousel/clientList";

interface Props {
  clients: ClientItem[];
}

type ActiveSegment = SegmentValue | "all";

function Badge({
  count,
  isActive,
  inverted = false,
}: {
  count: number;
  isActive: boolean;
  inverted?: boolean;
}) {
  return (
    <span
      className={cn(
        "text-sm font-medium px-2 py-0.5 min-w-8 text-center tabular-nums",
        isActive
          ? inverted
            ? "bg-white text-primary"
            : "bg-primary text-white"
          : "bg-slate-100 text-slate-500",
      )}
    >
      {String(count).padStart(2, "0")}
    </span>
  );
}

function MobileButton({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold",
        isActive ? "bg-primary text-white" : "bg-slate-100 text-slate-700",
      )}
    >
      {label}
      <Badge count={count} isActive={isActive} inverted />
    </button>
  );
}

function DesktopButton({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex justify-between items-center text-lg py-3 w-64 cursor-pointer",
        isActive ? "text-primary" : "text-slate-700 hover:text-primary",
      )}
    >
      <span className="font-medium">{label}</span>
      <Badge count={count} isActive={isActive} />
    </button>
  );
}

export function ClientList({ clients }: Props) {
  const [active, setActive] = useState<ActiveSegment>("all");

  const filtered =
    active === "all" ? clients : clients.filter((c) => c.segment === active);

  const countFor = (seg: SegmentValue) =>
    clients.filter((c) => c.segment === seg).length;

  const visibleSegments = SEGMENTS.filter((s) => countFor(s.value) > 0);

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8">
      <div className="max-lg:scrollbar-hidden lg:hidden flex gap-2 overflow-x-auto max-lg:px-4 max-lg:full-bleed w-full">
        <MobileButton
          label="Tudo"
          count={clients.length}
          isActive={active === "all"}
          onClick={() => setActive("all")}
        />
        {visibleSegments.map((seg) => (
          <MobileButton
            key={seg.value}
            label={seg.title}
            count={countFor(seg.value)}
            isActive={active === seg.value}
            onClick={() => setActive(seg.value)}
          />
        ))}
      </div>

      <div className="hidden lg:flex flex-col px-6 py-3 h-[50dvh] overflow-y-auto scrollbar-mini bg-white">
        <DesktopButton
          label="Tudo"
          count={clients.length}
          isActive={active === "all"}
          onClick={() => setActive("all")}
        />
        {visibleSegments.map((seg) => (
          <DesktopButton
            key={seg.value}
            label={seg.title}
            count={countFor(seg.value)}
            isActive={active === seg.value}
            onClick={() => setActive(seg.value)}
          />
        ))}
      </div>

      <div
        className={cn(
          "grid w-full gap-1 bg-white content-start scrollbar-mini",

          "max-lg:full-bleed overflow-x-auto",
          "grid-rows-2 grid-flow-col auto-cols-[50%] sm:auto-cols-[33%]",

          "lg:flex-1 lg:h-[50dvh]",
          "lg:grid-rows-none lg:grid-flow-row sm:grid-cols-3 xl:grid-cols-5",
          "lg:overflow-y-auto",
        )}
      >
        {" "}
        {filtered.map((client) => (
          <div
            key={client.name}
            className="flex items-center justify-center px-6 py-3 sm::px-10 sm:py-8"
          >
            <img
              src={`${client.image}?w=300&auto=format`}
              alt={client.name}
              className="w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
