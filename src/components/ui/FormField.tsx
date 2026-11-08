import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared classes for text-like controls (Input, Textarea, Select). */
export const CONTROL_CLASSES =
  "w-full rounded-control border border-border-strong bg-surface px-3 text-body text-fg placeholder:text-fg-muted transition-colors duration-150 hover:border-fg-muted focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-fg-muted aria-invalid:border-danger";

export interface FieldMessageProps {
  /** Short help shown under the control. Hidden when an error is shown. */
  helperText?: string;
  error?: string;
}

interface FormFieldProps extends FieldMessageProps {
  id: string;
  label?: string;
  hideLabel?: boolean;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

export function getDescriptionId(id: string, { helperText, error }: FieldMessageProps) {
  return error || helperText ? `${id}-description` : undefined;
}

/** Label above, control, then helper text or error message below. */
export function FormField({
  id,
  label,
  hideLabel = false,
  required = false,
  helperText,
  error,
  className,
  children,
}: FormFieldProps) {
  const descriptionId = getDescriptionId(id, { helperText, error });

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn("text-label text-fg", hideLabel && "sr-only")}
        >
          {label}
          {required && (
            <span className="text-danger" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      {children}
      {descriptionId && (
        <p
          id={descriptionId}
          role={error ? "alert" : undefined}
          className={cn("text-helper", error ? "text-danger" : "text-fg-secondary")}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
