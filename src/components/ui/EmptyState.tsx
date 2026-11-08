import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** A useful next step, e.g. a button to create the first item. */
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-6 py-12 text-center",
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-card bg-primary-subtle text-primary">
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <div className="flex max-w-md flex-col gap-1">
        <h3 className="text-card-title text-fg">{title}</h3>
        {description && <p className="text-body text-fg-secondary">{description}</p>}
      </div>
      {action && <div className="flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}
