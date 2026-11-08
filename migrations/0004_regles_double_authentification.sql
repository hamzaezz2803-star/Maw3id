-- Applique README-base-de-donnees.md à la double authentification :
-- booléens non nuls, horodatage, une seule configuration par utilisateur, compteur positif.

update utilisateurs set double_authentification_active = false where double_authentification_active is null;
alter table utilisateurs
  alter column double_authentification_active set default false,
  alter column double_authentification_active set not null;

update doubles_authentifications set est_verifiee = false where est_verifiee is null;
update doubles_authentifications set nombre_echecs = 0 where nombre_echecs is null;

alter table doubles_authentifications
  alter column est_verifiee set default false,
  alter column est_verifiee set not null,
  alter column nombre_echecs set default 0,
  alter column nombre_echecs set not null,
  add column cree_le timestamptz not null default now(),
  add column modifie_le timestamptz not null default now(),
  add constraint doubles_authentifications_nombre_echecs_positif check (nombre_echecs >= 0),
  add constraint doubles_authentifications_utilisateur_unique unique (utilisateur_id);

create trigger doubles_authentifications_modifie_le before update on doubles_authentifications
  for each row execute function public.maj_modifie_le();
