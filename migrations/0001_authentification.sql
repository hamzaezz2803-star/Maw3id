-- Généré par scripts/generer-migration-auth.ts à partir de src/lib/serveur/auth.ts
create table "utilisateurs" ("id" uuid default pg_catalog.gen_random_uuid() not null primary key, "nom_complet" text not null, "email" text not null unique, "email_verifie" boolean not null, "avatar_url" text, "cree_le" timestamptz default CURRENT_TIMESTAMP not null, "modifie_le" timestamptz default CURRENT_TIMESTAMP not null, "role_plateforme" text, "est_bloque" boolean, "raison_blocage" text, "blocage_expire_le" timestamptz, "fonction" text);

create table "sessions" ("id" uuid default pg_catalog.gen_random_uuid() not null primary key, "expire_le" timestamptz not null, "jeton" text not null unique, "cree_le" timestamptz default CURRENT_TIMESTAMP not null, "modifie_le" timestamptz not null, "adresse_ip" text, "agent_utilisateur" text, "utilisateur_id" uuid not null references "utilisateurs" ("id") on delete cascade, "usurpe_par" text, "organisation_active_id" text);

create table "comptes" ("id" uuid default pg_catalog.gen_random_uuid() not null primary key, "compte_fournisseur_id" text not null, "fournisseur_id" text not null, "utilisateur_id" uuid not null references "utilisateurs" ("id") on delete cascade, "jeton_acces" text, "jeton_rafraichissement" text, "jeton_identite" text, "jeton_acces_expire_le" timestamptz, "jeton_rafraichissement_expire_le" timestamptz, "portee" text, "mot_de_passe_hache" text, "cree_le" timestamptz default CURRENT_TIMESTAMP not null, "modifie_le" timestamptz not null);

create table "verifications" ("id" uuid default pg_catalog.gen_random_uuid() not null primary key, "identifiant" text not null, "valeur" text not null, "expire_le" timestamptz not null, "cree_le" timestamptz default CURRENT_TIMESTAMP not null, "modifie_le" timestamptz default CURRENT_TIMESTAMP not null);

create table "organisations" ("id" uuid default pg_catalog.gen_random_uuid() not null primary key, "nom" text not null, "identifiant_url" text not null unique, "logo_url" text, "cree_le" timestamptz not null, "metadonnees" text, "type" text not null, "ville" text not null);

create table "membres" ("id" uuid default pg_catalog.gen_random_uuid() not null primary key, "organisation_id" uuid not null references "organisations" ("id") on delete cascade, "utilisateur_id" uuid not null references "utilisateurs" ("id") on delete cascade, "role" text not null, "cree_le" timestamptz not null);

create table "invitations" ("id" uuid default pg_catalog.gen_random_uuid() not null primary key, "organisation_id" uuid not null references "organisations" ("id") on delete cascade, "email" text not null, "role" text, "statut" text not null, "expire_le" timestamptz not null, "cree_le" timestamptz default CURRENT_TIMESTAMP not null, "invite_par_id" uuid not null references "utilisateurs" ("id") on delete cascade);

create table "limites_requetes" ("id" uuid default pg_catalog.gen_random_uuid() not null primary key, "cle" text not null unique, "nombre" integer not null, "derniere_requete" bigint not null);

create index "sessions_utilisateur_id_idx" on "sessions" ("utilisateur_id");

create index "comptes_utilisateur_id_idx" on "comptes" ("utilisateur_id");

create index "verifications_identifiant_idx" on "verifications" ("identifiant");

create index "membres_organisation_id_idx" on "membres" ("organisation_id");

create index "membres_utilisateur_id_idx" on "membres" ("utilisateur_id");

create index "invitations_organisation_id_idx" on "invitations" ("organisation_id");

create index "invitations_email_idx" on "invitations" ("email");
