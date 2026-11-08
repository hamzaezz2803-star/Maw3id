import { useId, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONTROL_CLASSES,
  FormField,
  getDescriptionId,
  type FieldMessageProps,
} from "./FormField";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children">,
    FieldMessageProps {
  label?: string;
  hideLabel?: boolean;
  options: SelectOption[];
  /** Adds an empty first option, e.g. "Select a service". */
  placeholder?: string;
  containerClassName?: string;
}

export function Select({
  id,
  label,
  hideLabel,
  helperText,
  error,
  required,
  options,
  placeholder,
  className,
  containerClassName,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <FormField
      id={selectId}
      label={label}
      hideLabel={hideLabel}
      required={required}
      helperText={helperText}
      error={error}
      className={containerClassName}
    >
      <div className="relative">
        <select
          id={selectId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={getDescriptionId(selectId, { helperText, error })}
          className={cn(CONTROL_CLASSES, "h-11 appearance-none pe-10 sm:h-10", className)}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-fg-muted"
        />
      </div>
    </FormField>
  );
}
