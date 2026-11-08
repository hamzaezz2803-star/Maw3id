import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export function Checkbox({ id, label, description, className, ...props }: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const descriptionId = description ? `${checkboxId}-description` : undefined;

  return (
    // The clickable label makes the whole row the touch target (44 px min on mobile).
    <div className={cn("flex min-h-11 items-start gap-3 py-2.5 sm:min-h-0 sm:py-0", className)}>
      <input
        id={checkboxId}
        type="checkbox"
        aria-describedby={descriptionId}
        className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary disabled:cursor-not-allowed"
        {...props}
      />
      <div className="flex flex-col">
        <label htmlFor={checkboxId} className="cursor-pointer text-label text-fg">
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="text-helper text-fg-secondary">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
