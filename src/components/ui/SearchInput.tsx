import { useId, type InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTROL_CLASSES } from "./FormField";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Accessible label, visually hidden. */
  label?: string;
  containerClassName?: string;
}

export function SearchInput({
  id,
  label = "Search",
  placeholder = "Search...",
  className,
  containerClassName,
  ...props
}: SearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div role="search" className={cn("relative", containerClassName)}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-fg-muted"
      />
      <input
        id={inputId}
        type="search"
        placeholder={placeholder}
        className={cn(CONTROL_CLASSES, "h-11 ps-9 sm:h-10", className)}
        {...props}
      />
    </div>
  );
}
