import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <LoaderCircle
      aria-hidden="true"
      className={cn("size-4 animate-spin text-current", className)}
    />
  );
}

/** Placeholder block for content that is loading. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-control bg-secondary", className)}
    />
  );
}

interface LoadingStateProps {
  label?: string;
  className?: string;
}

/** Centered spinner with an announced label, for a section or a page. */
export function LoadingState({ label = "Loading", className }: LoadingStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-12 text-center",
        className,
      )}
    >
      <Spinner className="size-6 text-primary" />
      <p className="text-helper text-fg-secondary">{label}...</p>
    </div>
  );
}
