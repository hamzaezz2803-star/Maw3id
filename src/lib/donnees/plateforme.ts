import "server-only";
import { TAILLE_PAGE } from "@/constants";
import { pool } from "@/lib/serveur/base-de-donnees";
import type { TypeOrganisation } from "@/types";
import { exigerAccesModule } from "./session";

/*
 * Lectures de l'espace Administrateur plateforme. Chaque fonction vérifie
 * elle-même le rôle : une protection sur la page seule ne suffit pas.
 */

export interface PageResultats<T> {
  lignes: T[];
  page: number;
  nombrePages: number;
}

export interface LigneOrganisation {
  id: string;
  nom: string;
  type: TypeOrganisation;
  ville: string;
  nombre_membres: number;
  cree_le: string;
}

export interface LigneUtilisateur {
  id: string;
  nom_complet: string;
  email: string;
  role_plateforme: string | null;
  cree_le: string;
  /** « Atlas Conseil : administrateur », une entrée par organisation. */
  appartenances: { organisation_nom: string; role: string }[];
}

function decalage(page: number): number {
  return (Math.max(1, page) - 1) * TAILLE_PAGE;
}

function nombrePages(total: number): number {
  return Math.max(1, Math.ceil(total / TAILLE_PAGE));
}

export async function listerOrganisations(page: number): Promise<PageResultats<LigneOrganisation>> {
  await exigerAccesModule("organisations");
  const [lignes, total] = await Promise.all([
    pool.query<Omit<LigneOrganisation, "cree_le"> & { cree_le: Date }>(
      `select o.id, o.nom, o.type, o.ville, o.cree_le,
              (select count(*)::int from membres m where m.organisation_id = o.id) as nombre_membres
         from organisations o
        order by o.cree_le desc
        limit $1 offset $2`,
      [TAILLE_PAGE, decalage(page)],
    ),
    pool.query<{ total: number }>("select count(*)::int as total from organisations"),
  ]);
  return {
    lignes: lignes.rows.map((ligne) => ({ ...ligne, cree_le: ligne.cree_le.toISOString() })),
    page,
    nombrePages: nombrePages(total.rows[0]?.total ?? 0),
  };
}

export async function listerUtilisateurs(page: number): Promise<PageResultats<LigneUtilisateur>> {
  await exigerAccesModule("utilisateurs");
  const [lignes, total] = await Promise.all([
    pool.query<Omit<LigneUtilisateur, "cree_le"> & { cree_le: Date }>(
      `select u.id, u.nom_complet, u.email, u.role_plateforme, u.cree_le,
              coalesce(
                json_agg(json_build_object('organisation_nom', o.nom, 'role', m.role) order by o.nom)
                  filter (where o.id is not null),
                '[]'
              ) as appartenances
         from utilisateurs u
         left join membres m on m.utilisateur_id = u.id
         left join organisations o on o.id = m.organisation_id
        group by u.id
        order by u.cree_le desc
        limit $1 offset $2`,
      [TAILLE_PAGE, decalage(page)],
    ),
    pool.query<{ total: number }>("select count(*)::int as total from utilisateurs"),
  ]);
  return {
    lignes: lignes.rows.map((ligne) => ({ ...ligne, cree_le: ligne.cree_le.toISOString() })),
    page,
    nombrePages: nombrePages(total.rows[0]?.total ?? 0),
  };
}

/** Organisations proposées dans le formulaire de création d'utilisateur. */
export async function listerOrganisationsPourSelection(): Promise<{ valeur: string; libelle: string }[]> {
  await exigerAccesModule("utilisateurs");
  const resultat = await pool.query<{ id: string; nom: string }>("select id, nom from organisations order by nom limit 500");
  return resultat.rows.map((ligne) => ({ valeur: ligne.id, libelle: ligne.nom }));
}
