import { Inbox, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { joindreClasses } from "@/lib/classes";

interface ProprietesEtatVide {
  titre: string;
  description?: string;
  icone?: LucideIcon;
  /** Action utile, ex. un bouton pour créer le premier élément. */
  action?: ReactNode;
  className?: string;
}

export function EtatVide({ titre, description, icone: Icone = Inbox, action, className }: ProprietesEtatVide) {
  return (
    <div className={joindreClasses("flex flex-col items-center justify-center gap-4 px-6 py-12 text-center", className)}>
      <span className="flex size-12 items-center justify-center rounded-card bg-primary-subtle text-primary">
        <Icone aria-hidden="true" className="size-6" />
      </span>
      <div className="flex max-w-md flex-col gap-1">
        <h3 className="text-card-title text-fg">{titre}</h3>
        {description && <p className="text-body text-fg-secondary">{description}</p>}
      </div>
      {action && <div className="flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}
