import type { ReactNode } from "react";
import { joindreClasses } from "@/lib/classes";

/** Classes communes aux contrôles de saisie (ChampTexte, ZoneTexte, ListeDeroulante). */
export const CLASSES_CONTROLE =
  "w-full rounded-control border border-border-strong bg-surface px-3 text-body text-fg placeholder:text-fg-muted transition-colors duration-150 hover:border-fg-muted focus:border-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-fg-muted aria-invalid:border-danger";

export interface MessagesChamp {
  /** Aide courte sous le champ. Masquée quand une erreur est affichée. */
  aide?: string;
  erreur?: string;
}

interface ProprietesChampFormulaire extends MessagesChamp {
  id: string;
  libelle?: string;
  masquerLibelle?: boolean;
  obligatoire?: boolean;
  className?: string;
  children: ReactNode;
}

export function obtenirIdDescription(id: string, { aide, erreur }: MessagesChamp) {
  return erreur || aide ? `${id}-description` : undefined;
}

/** Libellé au-dessus, contrôle, puis aide ou message d'erreur en dessous. */
export function ChampFormulaire({
  id,
  libelle,
  masquerLibelle = false,
  obligatoire = false,
  aide,
  erreur,
  className,
  children,
}: ProprietesChampFormulaire) {
  const idDescription = obtenirIdDescription(id, { aide, erreur });

  return (
    <div className={joindreClasses("flex flex-col gap-1.5", className)}>
      {libelle && (
        <label htmlFor={id} className={joindreClasses("text-label text-fg", masquerLibelle && "sr-only")}>
          {libelle}
          {obligatoire && (
            <span className="text-danger" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      {children}
      {idDescription && (
        <p
          id={idDescription}
          role={erreur ? "alert" : undefined}
          className={joindreClasses("text-helper", erreur ? "text-danger" : "text-fg-secondary")}
        >
          {erreur ?? aide}
        </p>
      )}
    </div>
  );
}
