-- Complète les tables d'authentification selon README-base-de-donnees.md :
-- colonnes cree_le / modifie_le partout, booléens non nuls, contraintes check,
-- clés étrangères manquantes, unicité métier et mise à jour automatique de modifie_le.

-- 1. Fonction de mise à jour de modifie_le (sécurisée : search_path vide)
create or replace function public.maj_modifie_le()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.modifie_le = now();
  return new;
end;
$$;

-- 2. Colonnes d'horodatage manquantes et valeurs par défaut
alter table organisations
  alter column cree_le set default now(),
  add column modifie_le timestamptz not null default now();

alter table membres
  alter column cree_le set default now(),
  add column modifie_le timestamptz not null default now();

alter table invitations
  add column modifie_le timestamptz not null default now();

alter table limites_requetes
  add column cree_le timestamptz not null default now(),
  add column modifie_le timestamptz not null default now();

alter table sessions alter column modifie_le set default now();
alter table comptes alter column modifie_le set default now();

-- 3. Booléens : jamais de valeur nulle ambiguë
alter table utilisateurs alter column email_verifie set default false;
update utilisateurs set est_bloque = false where est_bloque is null;
alter table utilisateurs
  alter column est_bloque set default false,
  alter column est_bloque set not null;

-- 4. Clés étrangères manquantes (colonnes créées en texte par Better Auth)
alter table sessions
  alter column organisation_active_id type uuid using organisation_active_id::uuid,
  add constraint sessions_organisation_active_fk
    foreign key (organisation_active_id) references organisations (id) on delete set null,
  alter column usurpe_par type uuid using usurpe_par::uuid,
  add constraint sessions_usurpe_par_fk
    foreign key (usurpe_par) references utilisateurs (id) on delete set null;

create index sessions_organisation_active_id_idx on sessions (organisation_active_id);

-- 5. Règles métier garanties par la base
alter table utilisateurs
  add constraint utilisateurs_email_minuscules check (email = lower(email)),
  add constraint utilisateurs_role_plateforme_valide
    check (role_plateforme is null or role_plateforme in ('administrateur_plateforme', 'utilisateur'));

alter table organisations
  add constraint organisations_type_valide check (type in (
    'clinique_medicale', 'cabinet_dentaire', 'cabinet_avocats', 'cabinet_comptable',
    'cabinet_conseil', 'centre_formation', 'autre'
  )),
  add constraint organisations_nom_non_vide check (length(trim(nom)) > 0),
  add constraint organisations_ville_non_vide check (length(trim(ville)) > 0);

alter table membres
  add constraint membres_role_valide check (role in ('administrateur', 'secretaire', 'collaborateur')),
  add constraint membres_organisation_utilisateur_unique unique (organisation_id, utilisateur_id);

alter table invitations
  add constraint invitations_email_minuscules check (email = lower(email)),
  add constraint invitations_role_valide
    check (role is null or role in ('administrateur', 'secretaire', 'collaborateur')),
  add constraint invitations_statut_valide check (statut in ('pending', 'accepted', 'rejected', 'canceled'));

create index invitations_invite_par_id_idx on invitations (invite_par_id);

-- 6. modifie_le mis à jour automatiquement sur chaque table
create trigger utilisateurs_modifie_le before update on utilisateurs for each row execute function public.maj_modifie_le();
create trigger sessions_modifie_le before update on sessions for each row execute function public.maj_modifie_le();
create trigger comptes_modifie_le before update on comptes for each row execute function public.maj_modifie_le();
create trigger verifications_modifie_le before update on verifications for each row execute function public.maj_modifie_le();
create trigger organisations_modifie_le before update on organisations for each row execute function public.maj_modifie_le();
create trigger membres_modifie_le before update on membres for each row execute function public.maj_modifie_le();
create trigger invitations_modifie_le before update on invitations for each row execute function public.maj_modifie_le();
create trigger limites_requetes_modifie_le before update on limites_requetes for each row execute function public.maj_modifie_le();
