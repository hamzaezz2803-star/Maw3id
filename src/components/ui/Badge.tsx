import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  neutral: "border-border bg-secondary text-fg-secondary",
  primary: "border-primary/20 bg-primary-subtle text-primary-hover",
  success: "border-success/20 bg-success-subtle text-success",
  warning: "border-warning/20 bg-warning-subtle text-warning",
  danger: "border-danger/20 bg-danger-subtle text-danger-hover",
  info: "border-info/20 bg-info-subtle text-info",
};

const DOT_CLASSES: Record<BadgeVariant, string> = {
  neutral: "bg-fg-muted",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Small colored dot before the label. The label always carries the meaning. */
  withDot?: boolean;
}

export function Badge({
  variant = "neutral",
  withDot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-0.5 text-caption [&_svg]:size-3.5",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    >
      {withDot && (
        <span aria-hidden="true" className={cn("size-1.5 rounded-full", DOT_CLASSES[variant])} />
      )}
      {children}
    </span>
  );
}
