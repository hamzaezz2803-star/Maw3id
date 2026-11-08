import type { HTMLAttributes } from "react";
import { joindreClasses } from "@/lib/classes";

export type VarianteBadge = "neutre" | "primaire" | "succes" | "attention" | "danger" | "info";

const CLASSES_VARIANTE: Record<VarianteBadge, string> = {
  neutre: "border-border bg-secondary text-fg-secondary",
  primaire: "border-primary/20 bg-primary-subtle text-primary-hover",
  succes: "border-success/20 bg-success-subtle text-success",
  attention: "border-warning/20 bg-warning-subtle text-warning",
  danger: "border-danger/20 bg-danger-subtle text-danger-hover",
  info: "border-info/20 bg-info-subtle text-info",
};

const CLASSES_POINT: Record<VarianteBadge, string> = {
  neutre: "bg-fg-muted",
  primaire: "bg-primary",
  succes: "bg-success",
  attention: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
};

export interface ProprietesBadge extends HTMLAttributes<HTMLSpanElement> {
  variante?: VarianteBadge;
  /** Petit point coloré avant le libellé. Le sens est toujours porté par le libellé. */
  avecPoint?: boolean;
}

export function Badge({ variante = "neutre", avecPoint = false, className, children, ...proprietes }: ProprietesBadge) {
  return (
    <span
      className={joindreClasses(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-0.5 text-label [&_svg]:size-3.5",
        CLASSES_VARIANTE[variante],
        className,
      )}
      {...proprietes}
    >
      {avecPoint && (
        <span aria-hidden="true" className={joindreClasses("size-1.5 rounded-full", CLASSES_POINT[variante])} />
      )}
      {children}
    </span>
  );
}
