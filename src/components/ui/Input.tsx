import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import {
  CONTROL_CLASSES,
  FormField,
  getDescriptionId,
  type FieldMessageProps,
} from "./FormField";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    FieldMessageProps {
  label?: string;
  hideLabel?: boolean;
  containerClassName?: string;
}

export function Input({
  id,
  label,
  hideLabel,
  helperText,
  error,
  required,
  className,
  containerClassName,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <FormField
      id={inputId}
      label={label}
      hideLabel={hideLabel}
      required={required}
      helperText={helperText}
      error={error}
      className={containerClassName}
    >
      <input
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={getDescriptionId(inputId, { helperText, error })}
        className={cn(CONTROL_CLASSES, "h-11 sm:h-10", className)}
        {...props}
      />
    </FormField>
  );
}
