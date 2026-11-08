-- À exécuter UNE FOIS dans DBeaver, connecté à PostgreSQL avec le compte « postgres ».
-- Crée un utilisateur dédié à Mawîid (pas de superutilisateur) et sa base.
-- Remplacer CHANGER_CE_MOT_DE_PASSE par un mot de passe fort avant d'exécuter.

-- 1. Utilisateur de l'application
create role maw3id_app with login password 'CHANGER_CE_MOT_DE_PASSE';

-- 2. Base de données appartenant à cet utilisateur
create database maw3id
  owner maw3id_app
  encoding 'UTF8'
  template template0;

-- 3. Personne d'autre ne peut se connecter à cette base
revoke all on database maw3id from public;
grant connect on database maw3id to maw3id_app;
