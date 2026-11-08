"use client";

import { useTraductions } from "@/i18n/FournisseurTraductions";
import { joindreClasses } from "@/lib/classes";
import type { OrganisationAvecRole, Role } from "@/types";
import { ContenuBarreLaterale } from "./ContenuBarreLaterale";
import { useBarreLaterale } from "./FournisseurBarreLaterale";

export interface ProprietesBarreLaterale {
  role: Role;
  organisations: OrganisationAvecRole[];
  idOrganisationCourante: string;
}

/** Colonne pour ordinateur et tablette, plus le tiroir mobile : même contenu. */
export function BarreLaterale(proprietes: ProprietesBarreLaterale) {
  const { t } = useTraductions();
  const { estReduite, refTiroir, fermerTiroir } = useBarreLaterale();

  return (
    <>
      <aside
        aria-label={t.navigation.barreLaterale}
        className={joindreClasses(
          "sticky top-0 hidden h-dvh shrink-0 flex-col border-e border-border bg-surface transition-[width] duration-150 md:flex",
          estReduite ? "w-sidebar-collapsed" : "w-sidebar-collapsed lg:w-sidebar",
        )}
      >
        <ContenuBarreLaterale {...proprietes} mode={estReduite ? "icones" : "adaptatif"} />
      </aside>

      <dialog
        ref={refTiroir}
        aria-label={t.navigation.menuNavigation}
        // Un clic sur l'élément <dialog> lui-même est un clic sur l'arrière-plan.
        onClick={(evenement) => evenement.target === evenement.currentTarget && fermerTiroir()}
        className="m-0 h-dvh max-h-dvh w-sidebar max-w-[85vw] border-e border-border bg-surface p-0 text-fg"
      >
        <div className="flex h-full flex-col">
          <ContenuBarreLaterale {...proprietes} mode="complet" surNavigation={fermerTiroir} />
        </div>
      </dialog>
    </>
  );
}
