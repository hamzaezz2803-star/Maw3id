import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { joindreClasses } from "@/lib/classes";

/** Défile horizontalement dans sa carte au lieu de déborder de la page. */
export function Tableau({ className, ...proprietes }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={joindreClasses("w-full border-collapse text-start text-body", className)} {...proprietes} />
    </div>
  );
}

export function EnteteTableau({ className, ...proprietes }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={joindreClasses("border-b border-border bg-surface-muted", className)} {...proprietes} />;
}

export function CorpsTableau({ className, ...proprietes }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={joindreClasses("divide-y divide-border", className)} {...proprietes} />;
}

export function LigneTableau({ className, ...proprietes }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={joindreClasses("transition-colors hover:bg-surface-muted", className)} {...proprietes} />;
}

export function CelluleEntete({ className, scope = "col", ...proprietes }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope={scope}
      className={joindreClasses("h-11 whitespace-nowrap px-4 text-start align-middle text-label text-fg-secondary", className)}
      {...proprietes}
    />
  );
}

export function CelluleTableau({ className, ...proprietes }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={joindreClasses("px-4 py-3 align-middle text-fg", className)} {...proprietes} />;
}

export function LegendeTableau({ className, ...proprietes }: HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={joindreClasses("sr-only", className)} {...proprietes} />;
}
