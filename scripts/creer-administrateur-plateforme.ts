/*
 * Crée le premier Administrateur plateforme à partir des variables
 * ADMIN_PLATEFORME_* de .env.local. À lancer une seule fois, puis retirer le
 * mot de passe de .env.local.
 * Usage : npm run base:creer-admin
 */
import { ROLE_PLATEFORME_ADMIN } from "@/lib/auth/droits";
import { auth } from "@/lib/serveur/auth";
import { pool } from "@/lib/serveur/base-de-donnees";

function lireVariable(nom: string): string {
  const valeur = process.env[nom]?.trim();
  if (!valeur) throw new Error(`Variable manquante dans .env.local : ${nom}`);
  return valeur;
}

async function principal() {
  const email = lireVariable("ADMIN_PLATEFORME_EMAIL").toLowerCase();
  const existant = await pool.query("select 1 from utilisateurs where email = $1", [email]);
  if (existant.rowCount) {
    console.info("Un compte existe déjà avec cet e-mail : rien à faire.");
    return;
  }

  await auth.api.createUser({
    body: {
      email,
      name: lireVariable("ADMIN_PLATEFORME_NOM"),
      password: lireVariable("ADMIN_PLATEFORME_MOT_DE_PASSE"),
      role: ROLE_PLATEFORME_ADMIN,
    },
  });
  console.info("Administrateur plateforme créé. Retirez maintenant ADMIN_PLATEFORME_MOT_DE_PASSE de .env.local.");
}

principal()
  .catch((erreur: unknown) => {
    console.error("Échec :", erreur instanceof Error ? erreur.message : erreur);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
