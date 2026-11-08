import "server-only";
import { Pool } from "pg";

/*
 * Connexion unique à PostgreSQL, réutilisée par toute l'application.
 * L'adresse vient de DATABASE_URL (.env.local), jamais du code.
 */

const globalPourPool = globalThis as unknown as { poolMaw3id?: Pool };

export const pool =
  globalPourPool.poolMaw3id ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });

// En développement, le rechargement à chaud ne doit pas ouvrir une nouvelle connexion à chaque fois.
if (process.env.NODE_ENV !== "production") globalPourPool.poolMaw3id = pool;
