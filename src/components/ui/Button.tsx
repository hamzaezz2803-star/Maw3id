import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./LoadingState";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const BASE_CLASSES =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-control font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground shadow-card hover:bg-primary-hover",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
  outline: "border border-border-strong bg-surface text-fg hover:bg-surface-muted",
  ghost: "text-fg-secondary hover:bg-secondary hover:text-fg",
  danger: "bg-danger text-primary-foreground shadow-card hover:bg-danger-hover",
};

// Mobile sizes keep a 44 px touch target; desktop tightens slightly.
const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-11 px-3 text-label sm:h-8",
  md: "h-11 px-4 text-label sm:h-10",
  lg: "h-12 px-5 text-body",
  icon: "size-11 sm:size-10",
};

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** Button classes, reusable on links (`<Link className={buttonClasses()} />`). */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}): string {
  return cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<ButtonStyleOptions, "className"> {
  isLoading?: boolean;
}

export function Button({
  variant,
  size,
  isLoading = false,
  disabled,
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
}
