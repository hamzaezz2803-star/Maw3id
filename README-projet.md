# Maw3id : fiche projet

> Ce fichier décrit ce qui est propre au projet. Les règles communes sont dans `.agents/rules/` :
> `README-qualite-code.md`, `README-securite.md`, `README-base-de-donnees.md`, `README-design.md`.
> En cas de conflit, ce fichier est prioritaire, à condition que l'exception soit écrite ici explicitement.

## Contexte

- **But** : application SaaS multi-organisations de prise et de gestion de rendez-vous.
- **Utilisateurs** : administrateur plateforme (équipe Maw3id), administrateurs d'organisation, secrétaires, collaborateurs, clients.
- **Organisations visées** : cliniques, cabinets dentaires, cabinets d'avocats, cabinets comptables, cabinets de conseil, centres de formation, autres services professionnels.
- **Marché** : Maroc. Langues : français et arabe.
- **Statut** : développement. Étape 2 : connexion et espace Administrateur plateforme, sur PostgreSQL local.

## Stack

- Framework : Next.js 16 (App Router, Cache Components), TypeScript strict, Tailwind CSS v4.
- Base de données : PostgreSQL 18 en local (administrée avec DBeaver), accès via `pg` avec requêtes paramétrées uniquement.
- Authentification : Better Auth (e-mail et mot de passe, session en cookie httpOnly, limitation des tentatives). Inscription libre fermée.
- Validation : Zod, côté serveur dans chaque action.
- Tests : Vitest (logique pure).
- Scripts de base (migrations, premier administrateur) : `tsx`.
- Hébergement : à définir.

## Espaces et rôles

| Espace | Chemin | Rôles autorisés |
| --- | --- | --- |
| Connexion | `/[langue]/connexion` | Tout le monde |
| Gestion d'une organisation | `/[langue]/tableau-de-bord`, `/[langue]/clients`... | `administrateur`, `secretaire`, `collaborateur` (selon le module) |
| Administration de la plateforme | `/[langue]/plateforme/organisations`, `/[langue]/plateforme/utilisateurs` | `administrateur_plateforme` |
| Espace client et réservation publique | à créer | `client`, tout le monde |

Les rôles autorisés par module sont déclarés dans `src/config/navigation.ts`. Ils servent à l'affichage **et** sont vérifiés côté serveur au début de chaque page, lecture de données et action (`exigerAccesModule`). Le rôle vient toujours de la session.

**Administrateur plateforme** : membre de l'équipe Maw3id. Crée les organisations et leur premier administrateur. L'**administrateur** d'une organisation crée ensuite ses secrétaires et collaborateurs.

## Règles métier

- Chaque donnée métier appartient à une organisation (`organisation_id`) ; aucune donnée n'est partagée entre organisations.
- Un utilisateur peut appartenir à plusieurs organisations, avec un rôle différent dans chacune (table `membres`).
- Dates stockées en UTC, affichées dans le fuseau `Africa/Casablanca`.

## Données

- Tables : `utilisateurs`, `sessions`, `comptes`, `verifications`, `limites_requetes`, `organisations`, `membres`, `invitations` (créées par Better Auth, renommées en français), puis services, clients, rendez-vous...
- Schéma modifié uniquement par les migrations versionnées de `migrations/`, appliquées avec `npm run base:migrer`.
- Colonnes en `snake_case` français, avec `id` (uuid), `cree_le`, `modifie_le` sur chaque table.
- Données sensibles : un cabinet médical ou dentaire peut enregistrer des données de santé. À traiter avec les règles renforcées avant toute mise en production.
- Données à ne jamais collecter sans besoin : CIN, date de naissance, adresse.

## Design

- Couleurs : primaire `#2563eb`, texte `#0f172a`, fond `#f5f7fa` (tous les jetons dans `src/app/globals.css`).
- Polices : Geist (latin) et IBM Plex Sans Arabic (arabe), via `next/font`.
- Arabe : `dir="rtl"`, propriétés logiques Tailwind (`ms-`, `pe-`, `start-`...), icônes directionnelles inversées.
- Priorité d'affichage : ordinateur pour l'espace de gestion ; mobile d'abord pour la future réservation publique.
- Thème sombre : non.

## Langues

- Code, commentaires et noms de données : français.
- Interface : français et arabe. Aucun texte en dur dans les composants : tout est dans `src/i18n/dictionnaires/`.
- Un test vérifie que l'arabe contient exactement les mêmes clés que le français.
- Les traductions arabes doivent être relues par un locuteur natif avant la mise en production.

## Bibliothèques autorisées

| Besoin | Bibliothèque |
| --- | --- |
| Icônes | `lucide-react` |
| Authentification | `better-auth` |
| Base de données | `pg` |
| Validation | `zod` |
| Tests | `vitest` |
| Scripts TypeScript | `tsx` |

## Structure des dossiers

```text
migrations/                       # Migrations SQL versionnées (ordre des numéros)
scripts/                          # migrer, generer-migration-auth, creer-administrateur-plateforme, sql/
src/
├── actions/                      # Server Actions (connexion, création d'organisations et d'utilisateurs)
├── app/
│   ├── [langue]/                 # fr ou ar : mise en page racine (lang, dir, polices)
│   │   ├── (application)/        # Espace de gestion avec barre latérale
│   │   │   ├── layout.tsx        # Charge la session, affiche MiseEnPagePrincipale
│   │   │   ├── loading.tsx
│   │   │   ├── tableau-de-bord/
│   │   │   ├── systeme-de-design/ # Galerie des jetons et composants
│   │   │   └── <module>/         # Page provisoire par module
│   │   ├── [...introuvable]/     # Adresses inconnues -> page introuvable traduite
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── globals.css               # Jetons de design
│   └── icon.svg                  # Favicon
├── components/
│   ├── mise-en-page/             # Barre latérale, barre de navigation, conteneur de page...
│   ├── systeme-design/           # Utilisé uniquement par la galerie
│   └── ui/                       # Composants réutilisables
├── config/navigation.ts          # Modules, icônes et rôles autorisés
├── constants/                    # Constantes de l'application
├── donnees-fictives/             # Exemples de la galerie du système de design
├── i18n/                         # Langues, dictionnaires, accès serveur et client
├── lib/
│   ├── auth/                     # Rôles, droits, erreurs d'authentification
│   ├── donnees/                  # Couche d'accès aux données (session, plateforme)
│   ├── serveur/                  # Connexion PostgreSQL et configuration Better Auth (serveur uniquement)
│   ├── validation/               # Schémas Zod des formulaires
│   └── *.ts                      # Logique pure testée (formatage, navigation, pagination)
├── proxy.ts                      # Ajoute le préfixe de langue aux adresses
└── types/                        # Types partagés
```

## Exceptions aux règles communes

| Règle commune | Exception | Raison | Jusqu'à quand |
| --- | --- | --- | --- |
| Double authentification (MFA) des administrateurs | Connexion par mot de passe seul | Choix de découpage : MFA (TOTP) à l'étape suivante | Étape MFA |
| Au moins un test de bout en bout du parcours principal | Aucun test de bout en bout | Demande une base de test dédiée, mise en place avec la MFA | Étape MFA |
| RLS en base | Pas de RLS sur les tables d'authentification | Tables gérées par Better Auth ; la base n'est pas accessible depuis le navigateur. RLS ajoutée sur chaque table métier dès sa création | Première table métier |
| `Content-Security-Policy` complète | CSP partielle (iframe, plugins, base-uri, formulaires) | Les scripts demandent des nonces | Avant la mise en production |
| Mot de passe initial saisi par l'administrateur | Pas d'invitation par e-mail | Aucun service d'e-mail pour l'instant ; changement obligatoire du mot de passe à prévoir | Étape e-mails |
| Pages légales et pied de page (site public) | Absentes | Pas encore de site public | Création de la réservation publique |

## Installation et lancement

1. Dans DBeaver (connecté avec `postgres`), exécuter `scripts/sql/creer-base.sql` après y avoir mis un mot de passe fort.
2. Remplir `.env.local` (modèle : `.env.example`) : `DATABASE_URL`, `BETTER_AUTH_SECRET`, et les variables `ADMIN_PLATEFORME_*`.
3. Puis :

```bash
npm install
npm run base:migrer
npm run base:creer-admin
npm run dev
```

4. Retirer `ADMIN_PLATEFORME_MOT_DE_PASSE` de `.env.local`.

Ouvrir http://localhost:3000 : la page de connexion s'affiche.

Nouvelle table d'authentification (après un changement de `src/lib/serveur/auth.ts`) : `npm run base:generer-auth -- 0003_description`, relire le fichier, puis `npm run base:migrer`.

## Avant de terminer une tâche

- `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` passent.
- Interface vérifiée en français et en arabe (RTL), sur mobile (360 px), tablette et ordinateur.
- Les nouveaux textes existent dans les deux dictionnaires.
