# Règles de base de données

Ces règles s'appliquent à **chaque modification** du schéma, des requêtes ou des données, dans tous les projets.
Elles sont écrites pour **PostgreSQL** (y compris Supabase), et s'adaptent facilement à une autre base relationnelle.
Le schéma propre au projet (tables, statuts, règles métier) est décrit dans `README-projet.md`.

> Projet sans base de données (données fictives) : appliquer dès maintenant les règles de nommage et de types aux données fictives, pour que le passage à une vraie base ne demande aucun changement dans les pages.

## Conventions de nommage

- Tables et colonnes en `snake_case`, sans accents, dans la langue du projet (par défaut le français) : `date_creation`, `client_id`.
- Tables au **pluriel** : `clients`, `commandes`.
- Clés étrangères : `<table_au_singulier>_id` (`client_id`).
- Contraintes et index nommés explicitement : `commandes_client_date_idx`, `montant_positif`.
- Statuts en texte avec une contrainte `check` plutôt qu'un type enum (plus simple à faire évoluer).

## Colonnes obligatoires

| Colonne | Type | Rôle |
| --- | --- | --- |
| `id` | `uuid primary key default gen_random_uuid()` | Identifiant non devinable |
| `cree_le` | `timestamptz not null default now()` | Date de création |
| `modifie_le` | `timestamptz not null default now()` | Mise à jour par un trigger |

Dans une application utilisée par plusieurs organisations (clients, entreprises, cabinets...) : chaque table métier porte aussi la colonne de rattachement (`organisation_id` ou équivalent), utilisée pour l'isolation.

## Types de données

- **Dates et heures** : toujours `timestamptz`. Stockage en UTC, affichage dans le fuseau de l'utilisateur (`Africa/Casablanca` par défaut au Maroc).
- **Montants** : `numeric(12, 2)`, jamais `float`. La devise est indiquée dans le nom de la colonne (`montant_mad`) ou dans une colonne dédiée.
- **Téléphones** : `text` au format international E.164 (`+212612345678`).
- **E-mails** : `text`, enregistrés en minuscules.
- **Booléens** : `boolean not null default false`, jamais de valeur nulle ambiguë.
- **Durées** : `integer` avec l'unité dans le nom (`duree_minutes`).
- Chaque valeur limitée a une contrainte `check` (montant positif, durée entre deux bornes, statut dans une liste).

## Intégrité

- Clés étrangères toujours déclarées, avec un comportement de suppression choisi (`on delete cascade`, `restrict` ou `set null`).
- Les règles critiques sont garanties **par la base**, pas seulement par le code : unicité, montants positifs, absence de chevauchement (contrainte `exclude` pour les réservations), etc.
- Une opération qui modifie plusieurs tables se fait dans une **transaction** (ou une fonction SQL).

## Sécurité en base

- Avec Supabase ou toute base accessible depuis le navigateur : **RLS (Row Level Security) activée sur toutes les tables**, dès leur création. Une table sans RLS est accessible à tous avec la clé publique.
- Une fonction unique vérifie l'appartenance de l'utilisateur, réutilisée par toutes les politiques :

```sql
create or replace function public.est_membre(id_organisation uuid)
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.membres
    where organisation_id = id_organisation
      and utilisateur_id = (select auth.uid())
  );
$$;

alter table commandes enable row level security;

create policy "membres_gerent_commandes" on commandes
  for all
  using ((select public.est_membre(organisation_id)))
  with check ((select public.est_membre(organisation_id)));
```

- Toute fonction `security definer` fixe `set search_path = ''` et utilise des noms complets (`public.table`).
- La clé secrète (service role) n'est utilisée que côté serveur, et seulement quand c'est indispensable.
- Requêtes toujours paramétrées. Jamais de SQL construit par concaténation de texte.

## Trigger de date de modification

```sql
create or replace function public.maj_modifie_le()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.modifie_le = now();
  return new;
end;
$$;

-- à créer pour chaque table
create trigger commandes_modifie_le before update on commandes
  for each row execute function public.maj_modifie_le();
```

## Index et performance

- Index sur chaque clé étrangère et sur les colonnes utilisées dans les filtres et tris fréquents.
- Index unique pour les règles d'unicité métier (`(organisation_id, email)`).
- Pagination sur toutes les listes ; jamais de `select *` sans limite sur une grande table.
- Vérifier les requêtes lentes (`explain analyze`, conseils « Performance » de Supabase) avant la mise en production.

## Migrations

- **Toute modification du schéma passe par une migration versionnée** dans le dépôt (avec Supabase : `npx supabase migration new <nom_explicite>`, fichiers dans `supabase/migrations/`).
- **Jamais** de modification directe du schéma de production depuis un tableau de bord.
- On ne modifie jamais une migration déjà appliquée en production : on en crée une nouvelle.
- Chaque migration est testée en local (`npx supabase db reset` ou équivalent) avant d'être appliquée.
- Après chaque migration : régénérer les types TypeScript (`npx supabase gen types typescript --local > src/types/database.ts`).

## Données interdites ou sensibles

- Jamais de mot de passe en clair, ni de numéro de carte bancaire.
- Pas de CIN, date de naissance, adresse ou localisation si la fonctionnalité ne l'exige pas.
- Données sensibles (santé, finances, mineurs) : uniquement si le projet l'exige, avec les règles décrites dans `README-projet.md` et `README-securite.md`.

## Données de développement

- Données de test **fictives** uniquement (`seed.sql` ou fichier de données fictives), avec des noms inventés et des numéros clairement factices.
- Jamais de copie de données réelles de production sur un poste de développement.

## Sauvegarde, export et suppression

- Sauvegardes automatiques quotidiennes en production ; restauration testée avant le lancement.
- Suppression d'un utilisateur sur demande : suppression ou anonymisation de ses données personnelles, en conservant seulement ce que la loi impose (factures, par exemple).
- Export des données d'un client possible à tout moment.
