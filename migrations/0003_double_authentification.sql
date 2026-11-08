-- Généré par scripts/generer-migration-auth.ts à partir de src/lib/serveur/auth.ts
alter table "utilisateurs" add column "double_authentification_active" boolean default false;

create table "doubles_authentifications" ("id" uuid default pg_catalog.gen_random_uuid() not null primary key, "secret_chiffre" text not null, "codes_secours_chiffres" text not null, "utilisateur_id" uuid not null references "utilisateurs" ("id") on delete cascade, "est_verifiee" boolean, "nombre_echecs" integer, "bloquee_jusqu_au" timestamptz);

create index "doubles_authentifications_secret_chiffre_idx" on "doubles_authentifications" ("secret_chiffre");

create index "doubles_authentifications_utilisateur_id_idx" on "doubles_authentifications" ("utilisateur_id");
