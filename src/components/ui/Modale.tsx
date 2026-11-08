"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { joindreClasses } from "@/lib/classes";
import { Bouton } from "./Bouton";

export type TailleModale = "petite" | "moyenne" | "grande";

const CLASSES_TAILLE: Record<TailleModale, string> = {
  petite: "max-w-sm",
  moyenne: "max-w-lg",
  grande: "max-w-2xl",
};

interface ProprietesModale {
  ouverte: boolean;
  surFermeture: () => void;
  titre: string;
  description?: string;
  taille?: TailleModale;
  /** Actions en bas, ex. Annuler et Confirmer. */
  pied?: ReactNode;
  children?: ReactNode;
}

/**
 * Construite sur <dialog> natif : piège du focus, touche Échap et arrière-plan
 * inerte sont gérés par le navigateur.
 */
export function Modale({ ouverte, surFermeture, titre, description, taille = "moyenne", pied, children }: ProprietesModale) {
  const { t } = useTraductions();
  const refDialogue = useRef<HTMLDialogElement>(null);
  const idTitre = useId();
  const idDescription = useId();

  // Synchronise la prop `ouverte` avec l'API impérative du <dialog>.
  useEffect(() => {
    const dialogue = refDialogue.current;
    if (!dialogue) return;
    if (ouverte && !dialogue.open) dialogue.showModal();
    if (!ouverte && dialogue.open) dialogue.close();
  }, [ouverte]);

  return (
    <dialog
      ref={refDialogue}
      aria-labelledby={idTitre}
      aria-describedby={description ? idDescription : undefined}
      onClose={surFermeture}
      // Un clic sur l'élément <dialog> lui-même est un clic sur l'arrière-plan.
      onClick={(evenement) => evenement.target === evenement.currentTarget && surFermeture()}
      className={joindreClasses(
        "m-auto w-[calc(100%-2rem)] rounded-card border border-border bg-surface p-0 text-fg shadow-popover",
        CLASSES_TAILLE[taille],
      )}
    >
      <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6">
        <div className="flex flex-col gap-1">
          <h2 id={idTitre} className="text-section-title">
            {titre}
          </h2>
          {description && (
            <p id={idDescription} className="text-helper text-fg-secondary">
              {description}
            </p>
          )}
        </div>
        <Bouton variante="fantome" taille="icone" aria-label={t.commun.fermer} onClick={surFermeture} className="-me-2 -mt-2">
          <X aria-hidden="true" />
        </Bouton>
      </div>
      {children && <div className="px-5 py-4 sm:px-6">{children}</div>}
      {pied && (
        <div className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          {pied}
        </div>
      )}
    </dialog>
  );
}
