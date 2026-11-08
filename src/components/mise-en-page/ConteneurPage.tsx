import type { ReactNode } from "react";
import { FilAriane } from "@/components/ui/FilAriane";
import { obtenirTraductions } from "@/i18n/serveur";
import type { ElementFilAriane } from "@/types";

interface ProprietesConteneurPage {
  /** Titre de la page (h1). Omis quand le contenu fournit son propre h1, comme le tableau de bord. */
  titre?: string;
  description?: string;
  filAriane?: ElementFilAriane[];
  /** Actions de la page, alignées en fin de ligne sur grand écran. Une action principale au plus. */
  actions?: ReactNode;
  /** Ligne sous l'en-tête, ex. la mention « données de démonstration ». */
  mention?: ReactNode;
  children: ReactNode;
}

/** Cadre standard d'une page : en-tête (fil d'Ariane, titre, description, actions) et contenu. */
export async function ConteneurPage({ titre, description, filAriane, actions, mention, children }: ProprietesConteneurPage) {
  const { t } = await obtenirTraductions();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {titre && (
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            {filAriane && filAriane.length > 0 && <FilAriane elements={filAriane} libelle={t.commun.filAriane} />}
            <h1 className="text-page-title text-fg">{titre}</h1>
            {description && <p className="max-w-2xl text-body text-fg-secondary">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
        </header>
      )}
      <div className="flex flex-col gap-6">
        {mention}
        {children}
      </div>
    </div>
  );
}
