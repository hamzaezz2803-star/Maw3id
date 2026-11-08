/*
 * Couche d'accès aux données du contexte de session.
 * Les pages et composants lisent les données uniquement par ces fonctions :
 * les données fictives seront remplacées par PostgreSQL ici, sans toucher aux pages.
 */
import { NOTIFICATIONS_FICTIVES } from "@/donnees-fictives/notifications";
import {
  ID_ORGANISATION_COURANTE_FICTIVE,
  ORGANISATIONS_FICTIVES,
} from "@/donnees-fictives/organisations";
import { MEMBRES_FICTIFS, UTILISATEUR_FICTIF } from "@/donnees-fictives/utilisateurs";
import type { ContexteSession, Notification, OrganisationAvecRole, Resultat } from "@/types";

const ERREUR_AUCUNE_ORGANISATION = "aucune_organisation";

function listerOrganisationsDeUtilisateur(utilisateurId: string): OrganisationAvecRole[] {
  return MEMBRES_FICTIFS.filter((membre) => membre.utilisateur_id === utilisateurId).flatMap(
    (membre) => {
      const organisation = ORGANISATIONS_FICTIVES.find((item) => item.id === membre.organisation_id);
      return organisation ? [{ organisation, role: membre.role }] : [];
    },
  );
}

export async function obtenirContexteSession(): Promise<Resultat<ContexteSession>> {
  const organisations = listerOrganisationsDeUtilisateur(UTILISATEUR_FICTIF.id);
  const courante =
    organisations.find((item) => item.organisation.id === ID_ORGANISATION_COURANTE_FICTIVE) ??
    organisations[0];

  if (!courante) return { ok: false, erreur: ERREUR_AUCUNE_ORGANISATION };

  return {
    ok: true,
    donnees: {
      utilisateur: UTILISATEUR_FICTIF,
      organisationCourante: courante.organisation,
      role: courante.role,
      organisations,
    },
  };
}

export async function obtenirNotificationsRecentes(
  organisationId: string,
): Promise<Resultat<Notification[]>> {
  return {
    ok: true,
    donnees: NOTIFICATIONS_FICTIVES.filter((item) => item.organisation_id === organisationId),
  };
}
