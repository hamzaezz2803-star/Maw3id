import { LoaderCircle } from "lucide-react";
import { joindreClasses } from "@/lib/classes";

export function IndicateurChargement({ className }: { className?: string }) {
  return (
    <LoaderCircle
      aria-hidden="true"
      className={joindreClasses("size-4 animate-spin text-current", className)}
    />
  );
}

/** Bloc gris qui tient la place d'un contenu en cours de chargement. */
export function Squelette({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={joindreClasses("animate-pulse rounded-control bg-secondary", className)}
    />
  );
}

interface ProprietesEtatChargement {
  /** Texte annoncé aux lecteurs d'écran et affiché sous l'indicateur. */
  libelle: string;
  className?: string;
}

/** Indicateur centré avec un libellé annoncé, pour une section ou une page. */
export function EtatChargement({ libelle, className }: ProprietesEtatChargement) {
  return (
    <div
      role="status"
      className={joindreClasses(
        "flex flex-col items-center justify-center gap-3 px-6 py-12 text-center",
        className,
      )}
    >
      <IndicateurChargement className="size-6 text-primary" />
      <p className="text-helper text-fg-secondary">{libelle}...</p>
    </div>
  );
}
