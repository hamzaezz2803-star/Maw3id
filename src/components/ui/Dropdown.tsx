"use client";

import Link from "next/link";
import {
  useId,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type DropdownAlign = "start" | "end";

interface DropdownProps {
  /** Content of the trigger button. */
  trigger: ReactNode;
  /** Accessible name when the trigger has no visible text. */
  triggerLabel?: string;
  triggerClassName?: string;
  /** Which edge of the trigger the panel lines up with. */
  align?: DropdownAlign;
  panelClassName?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Built on the native Popover API: outside click, Escape and focus return
 * are handled by the browser, so no global listeners are needed.
 */
export function Dropdown({
  trigger,
  triggerLabel,
  triggerClassName,
  align = "end",
  panelClassName,
  className,
  children,
}: DropdownProps) {
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const panelId = `dropdown-${reactId}`;
  const anchorStyle = { "--popover-anchor": `--anchor-${reactId}` } as CSSProperties;

  return (
    <div className={cn("relative", className)} style={anchorStyle}>
      <button
        type="button"
        popoverTarget={panelId}
        aria-label={triggerLabel}
        className={cn("[anchor-name:var(--popover-anchor)]", triggerClassName)}
      >
        {trigger}
      </button>
      <div
        id={panelId}
        popover="auto"
        data-align={align}
        className={cn(
          "popover-panel w-64 max-w-[calc(100vw-2rem)] rounded-card border border-border bg-surface p-1.5 text-fg shadow-popover",
          panelClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function closeParentPopover(event: MouseEvent<HTMLElement>) {
  event.currentTarget.closest<HTMLElement>("[popover]")?.hidePopover();
}

const ITEM_CLASSES =
  "flex min-h-11 w-full items-center gap-2.5 rounded-control px-2.5 text-start text-label text-fg transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-50 sm:min-h-9 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-fg-muted";

interface DropdownItemProps {
  href?: string;
  /** Destructive actions such as Sign out. */
  tone?: "default" | "danger";
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

/** A link (with href) or a button. Closes the dropdown when used. */
export function DropdownItem({
  href,
  tone = "default",
  disabled,
  className,
  children,
}: DropdownItemProps) {
  const classes = cn(ITEM_CLASSES, tone === "danger" && "text-danger [&_svg]:text-danger", className);

  if (href) {
    return (
      <Link href={href} onClick={closeParentPopover} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" disabled={disabled} onClick={closeParentPopover} className={classes}>
      {children}
    </button>
  );
}

export function DropdownLabel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("px-2.5 pb-1 pt-2 text-caption uppercase tracking-wide text-fg-muted", className)}>
      {children}
    </div>
  );
}

export function DropdownSeparator() {
  return <hr className="my-1.5 border-border" />;
}
