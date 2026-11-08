import type { ReactNode } from "react";

interface ProprietesSectionFormulaire {
  titre: string;
  description?: string;
  children: ReactNode;
}

/** Groupe de champs avec un titre, sur deux colonnes à partir de la tablette. */
export function SectionFormulaire({ titre, description, children }: ProprietesSectionFormulaire) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="mb-1 flex flex-col gap-1">
        <span className="text-card-title text-fg">{titre}</span>
        {description && <span className="text-helper text-fg-secondary">{description}</span>}
      </legend>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
