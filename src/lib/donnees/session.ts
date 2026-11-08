import "server-only";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { CHEMIN_ACTIVATION_DOUBLE_AUTHENTIFICATION, CHEMIN_CONNEXION } from "@/config/navigation";
import { obtenirLangue } from "@/i18n/serveur";
import { exigeDoubleAuthentification } from "@/lib/auth/double-authentification";
import { determinerRole } from "@/lib/auth/role";
import { cheminLocalise, obtenirElementNavigation, peutAccederElement } from "@/lib/navigation";
import { auth } from "@/lib/serveur/auth";
import { pool } from "@/lib/serveur/base-de-donnees";
import type { ContexteSession, IdElementNavigation, Langue, Notification, OrganisationAvecRole, Resultat, TypeOrganisation, Utilisateur } from "@/types";

/*
 * Couche d'accès aux données de la session. L'identité et le rôle viennent
 * toujours de la session (cookie httpOnly), jamais de l'URL ou d'un formulaire.
 */

interface LigneOrganisationMembre {
  id: string;
  nom: string;
  type: TypeOrganisation;
  ville: string;
  logo_url: string | null;
  cree_le: Date;
  modifie_le: Date;
  role: string;
}

async function listerOrganisationsDuMembre(utilisateurId: string): Promise<(OrganisationAvecRole & { roleBrut: string })[]> {
  const resultat = await pool.query<LigneOrganisationMembre>(
    `select o.id, o.nom, o.type, o.ville, o.logo_url, o.cree_le, o.modifie_le, m.role
       from membres m
       join organisations o on o.id = m.organisation_id
      where m.utilisateur_id = $1
      order by o.nom`,
    [utilisateurId],
  );
  return resultat.rows.flatMap((ligne) => {
    const role = determinerRole(null, ligne.role);
    if (!role) return [];
    const { role: roleBrut, cree_le, modifie_le, ...organisation } = ligne;
    return [{
      organisation: { ...organisation, cree_le: cree_le.toISOString(), modifie_le: modifie_le.toISOString() },
      role,
      roleBrut,
    }];
  });
}

/** Lit la session une seule fois par requête. */
const lireSession = cache(async () => auth.api.getSession({ headers: await headers() }));

export const obtenirContexteSession = cache(async (): Promise<Resultat<ContexteSession>> => {
  const session = await lireSession();
  if (!session) return { ok: false, erreur: "non_connecte" };

  const { user } = session;
  const organisations = await listerOrganisationsDuMembre(user.id);
  const courante =
    organisations.find((item) => item.organisation.id === session.session.activeOrganizationId) ?? organisations[0];
  const role = determinerRole(user.role, courante?.roleBrut);
  if (!role) return { ok: false, erreur: "aucun_acces" };

  const utilisateur: Utilisateur = {
    id: user.id,
    nom_complet: user.name,
    email: user.email,
    fonction: user.fonction ?? null,
    avatar_url: user.image ?? null,
    cree_le: user.createdAt.toISOString(),
    modifie_le: user.updatedAt.toISOString(),
  };

  return {
    ok: true,
    donnees: {
      utilisateur,
      organisationCourante: courante?.organisation ?? null,
      role,
      doubleAuthentificationActive: user.twoFactorEnabled === true,
      organisations: organisations.map(({ organisation, role: roleMembre }) => ({ organisation, role: roleMembre })),
    },
  };
});

/**
 * Contexte de l'utilisateur connecté, ou redirection vers la page de connexion.
 * Un administrateur sans double authentification est envoyé vers son activation,
 * sauf depuis la page d'activation elle-même.
 * Dans une Server Action, passer `langue` (lue dans le formulaire) : la langue de
 * l'URL n'y est pas accessible.
 */
export async function exigerContexteSession({
  avantDoubleAuthentification = false,
  langue,
}: { avantDoubleAuthentification?: boolean; langue?: Langue } = {}): Promise<ContexteSession> {
  const contexte = await obtenirContexteSession();
  const rediriger = async (chemin: string) => redirect(cheminLocalise(chemin, langue ?? (await obtenirLangue())));
  if (!contexte.ok) return rediriger(CHEMIN_CONNEXION);

  const { role, doubleAuthentificationActive } = contexte.donnees;
  if (!avantDoubleAuthentification && exigeDoubleAuthentification(role) && !doubleAuthentificationActive) {
    return rediriger(CHEMIN_ACTIVATION_DOUBLE_AUTHENTIFICATION);
  }
  return contexte.donnees;
}

/** Vérifie côté serveur que le rôle a accès au module ; sinon page introuvable. */
export async function exigerAccesModule(idModule: IdElementNavigation, langue?: Langue): Promise<ContexteSession> {
  const contexte = await exigerContexteSession({ langue });
  const element = obtenirElementNavigation(idModule);
  if (!element || !peutAccederElement(element, contexte.role)) notFound();
  return contexte;
}

/** Les notifications seront stockées en base à l'étape « Notifications ». */
export async function obtenirNotificationsRecentes(): Promise<Resultat<Notification[]>> {
  return { ok: true, donnees: [] };
}
