import { useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import {
  CONTROL_CLASSES,
  FormField,
  getDescriptionId,
  type FieldMessageProps,
} from "./FormField";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    FieldMessageProps {
  label?: string;
  hideLabel?: boolean;
  containerClassName?: string;
}

export function Textarea({
  id,
  label,
  hideLabel,
  helperText,
  error,
  required,
  rows = 4,
  className,
  containerClassName,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <FormField
      id={textareaId}
      label={label}
      hideLabel={hideLabel}
      required={required}
      helperText={helperText}
      error={error}
      className={containerClassName}
    >
      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={getDescriptionId(textareaId, { helperText, error })}
        className={cn(CONTROL_CLASSES, "min-h-24 resize-y py-2", className)}
        {...props}
      />
    </FormField>
  );
}
