/*
 * Applique dans l'ordre les migrations SQL de /migrations qui ne l'ont pas encore été.
 * Chaque fichier s'exécute dans une transaction : il passe entièrement ou pas du tout.
 * Usage : npm run base:migrer
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pool } from "@/lib/serveur/base-de-donnees";

const DOSSIER_MIGRATIONS = path.join(process.cwd(), "migrations");

async function listerMigrationsAppliquees(): Promise<Set<string>> {
  await pool.query(`
    create table if not exists migrations_appliquees (
      nom text primary key,
      appliquee_le timestamptz not null default now()
    )
  `);
  const resultat = await pool.query<{ nom: string }>("select nom from migrations_appliquees");
  return new Set(resultat.rows.map((ligne) => ligne.nom));
}

async function appliquer(nom: string): Promise<void> {
  const sql = await readFile(path.join(DOSSIER_MIGRATIONS, nom), "utf8");
  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query(sql);
    await client.query("insert into migrations_appliquees (nom) values ($1)", [nom]);
    await client.query("commit");
    console.info(`Appliquée : ${nom}`);
  } catch (erreur) {
    await client.query("rollback");
    throw erreur;
  } finally {
    client.release();
  }
}

async function principal() {
  const fichiers = (await readdir(DOSSIER_MIGRATIONS)).filter((nom) => nom.endsWith(".sql")).sort();
  const dejaAppliquees = await listerMigrationsAppliquees();
  const aAppliquer = fichiers.filter((nom) => !dejaAppliquees.has(nom));

  for (const nom of aAppliquer) await appliquer(nom);
  console.info(aAppliquer.length ? `${aAppliquer.length} migration(s) appliquée(s).` : "Base déjà à jour.");
}

principal()
  .catch((erreur: unknown) => {
    console.error("Échec de la migration :", erreur instanceof Error ? erreur.message : erreur);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
