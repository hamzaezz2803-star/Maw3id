import type { ReactNode } from "react";
import { obtenirTraductions } from "@/i18n/serveur";
import type { ContexteSession, Notification } from "@/types";
import { BarreLaterale } from "./BarreLaterale";
import { BarreNavigation } from "./BarreNavigation";
import { FournisseurBarreLaterale } from "./FournisseurBarreLaterale";

interface ProprietesMiseEnPagePrincipale {
  session: ContexteSession;
  notifications: Notification[];
  children: ReactNode;
}

/** Coquille de l'application : barre latérale, barre de navigation et zone de contenu. */
export async function MiseEnPagePrincipale({ session, notifications, children }: ProprietesMiseEnPagePrincipale) {
  const { t } = await obtenirTraductions();

  return (
    <FournisseurBarreLaterale>
      <a
        href="#contenu-principal"
        className="sr-only z-50 rounded-control bg-surface px-4 py-2 text-label text-fg shadow-popover focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t.commun.allerAuContenu}
      </a>
      <div className="flex min-h-dvh">
        <BarreLaterale
          role={session.role}
          organisations={session.organisations}
          idOrganisationCourante={session.organisationCourante?.id ?? null}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <BarreNavigation
            utilisateur={session.utilisateur}
            role={session.role}
            nomEspace={session.organisationCourante?.nom ?? t.plateforme.nom}
            notifications={notifications}
          />
          <main id="contenu-principal" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
        </div>
      </div>
    </FournisseurBarreLaterale>
  );
}
