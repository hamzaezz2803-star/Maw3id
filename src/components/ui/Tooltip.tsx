import { useId, type ReactElement, cloneElement } from "react";
import { cn } from "@/lib/utils";

export type TooltipSide = "top" | "bottom";

const SIDE_CLASSES: Record<TooltipSide, string> = {
  top: "bottom-full mb-2",
  bottom: "top-full mt-2",
};

interface TooltipProps {
  content: string;
  side?: TooltipSide;
  /** A single focusable element (button, link). */
  children: ReactElement<{ "aria-describedby"?: string }>;
  className?: string;
}

/**
 * CSS-only tooltip shown on hover and keyboard focus, linked to its trigger
 * with aria-describedby. Use for short supplementary hints only.
 */
export function Tooltip({ content, side = "top", children, className }: TooltipProps) {
  const tooltipId = useId();

  return (
    <span className={cn("group/tooltip relative inline-flex", className)}>
      {cloneElement(children, { "aria-describedby": tooltipId })}
      <span
        id={tooltipId}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-fg px-2 py-1 text-caption text-surface opacity-0 shadow-popover transition-opacity duration-150",
          "group-hover/tooltip:opacity-100 group-has-focus-visible/tooltip:opacity-100",
          SIDE_CLASSES[side],
        )}
      >
        {content}
      </span>
    </span>
  );
}
