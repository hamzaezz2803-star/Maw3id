/*
 * Génère le SQL des tables d'authentification à partir de la configuration
 * Better Auth et l'écrit dans un nouveau fichier de /migrations, à relire puis
 * commiter. Ne modifie pas la base.
 * Usage : npm run base:generer-auth -- <nom_explicite>
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { getMigrations } from "better-auth/db/migration";
import { auth } from "@/lib/serveur/auth";
import { pool } from "@/lib/serveur/base-de-donnees";

async function principal() {
  const nom = process.argv[2];
  if (!nom || !/^\d{4}_[a-z0-9_]+$/.test(nom)) {
    throw new Error("Indiquer un nom de la forme 0003_description (chiffres, minuscules, tirets bas).");
  }

  const { compileMigrations, toBeCreated, toBeAdded } = await getMigrations(auth.options);
  if (toBeCreated.length === 0 && toBeAdded.length === 0) {
    console.info("Aucun changement : les tables d'authentification sont à jour.");
    return;
  }

  const fichier = path.join(process.cwd(), "migrations", `${nom}.sql`);
  const entete = "-- Généré par scripts/generer-migration-auth.ts à partir de src/lib/serveur/auth.ts\n";
  await writeFile(fichier, `${entete}${await compileMigrations()}\n`, "utf8");
  console.info(`Migration écrite : migrations/${nom}.sql`);
}

principal()
  .catch((erreur: unknown) => {
    console.error(erreur instanceof Error ? erreur.message : erreur);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
