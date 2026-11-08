# Maw3id : fiche projet

> Ce fichier décrit ce qui est propre au projet. Les règles communes sont dans `.agents/rules/` :
> `README-qualite-code.md`, `README-securite.md`, `README-base-de-donnees.md`, `README-design.md`.
> En cas de conflit, ce fichier est prioritaire, à condition que l'exception soit écrite ici explicitement.

## Contexte

- **But** : application SaaS multi-organisations de prise et de gestion de rendez-vous.
- **Utilisateurs** : administrateur plateforme (équipe Maw3id), administrateurs d'organisation, secrétaires, collaborateurs, clients.
- **Organisations visées** : cliniques, cabinets dentaires, cabinets d'avocats, cabinets comptables, cabinets de conseil, centres de formation, autres services professionnels.
- **Marché** : Maroc. Langues : français et arabe.
- **Statut** : maquette avec données fictives (étape 1 : structure et système de design).

## Stack

- Framework : Next.js 16 (App Router, Cache Components), TypeScript strict, Tailwind CSS v4.
- Base de données : aucune pour l'instant (données fictives dans `src/donnees-fictives/`). Prévue : PostgreSQL, administrée avec DBeaver.
- Authentification : aucune pour l'instant. Prévue à l'étape suivante, avec un service éprouvé (jamais de système maison).
- Tests : Vitest (logique pure).
- Hébergement : à définir.

## Espaces et rôles

| Espace | Chemin | Rôles autorisés |
| --- | --- | --- |
| Gestion d'une organisation | `/[langue]/tableau-de-bord`, `/[langue]/clients`... | `administrateur_plateforme`, `administrateur`, `secretaire`, `collaborateur` (selon le module) |
| Administration de la plateforme | à créer | `administrateur_plateforme` |
| Espace client et réservation publique | à créer | `client`, tout le monde |

Les rôles autorisés par module sont déclarés dans `src/config/navigation.ts`. Le filtrage actuel ne concerne que l'affichage : les vraies permissions seront vérifiées côté serveur et en base (RLS).

**Administrateur plateforme** : membre de l'équipe Maw3id. Crée les organisations et leur premier administrateur. L'**administrateur** d'une organisation crée ensuite ses secrétaires et collaborateurs.

## Règles métier

- Chaque donnée métier appartient à une organisation (`organisation_id`) ; aucune donnée n'est partagée entre organisations.
- Un utilisateur peut appartenir à plusieurs organisations, avec un rôle différent dans chacune (table `membres`).
- Dates stockées en UTC, affichées dans le fuseau `Africa/Casablanca`.

## Données

- Tables prévues : `organisations`, `utilisateurs`, `membres`, `notifications` (puis services, clients, rendez-vous...).
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
| Tests | `vitest` |

## Structure des dossiers

```text
src/
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
├── donnees-fictives/             # Données inventées (lues seulement par lib/donnees)
├── i18n/                         # Langues, dictionnaires, accès serveur et client
├── lib/
│   ├── donnees/                  # Couche d'accès aux données (PostgreSQL plus tard)
│   └── *.ts                      # Logique pure testée (formatage, navigation, pagination)
├── proxy.ts                      # Ajoute le préfixe de langue aux adresses
└── types/                        # Types partagés
```

## Exceptions aux règles communes

| Règle commune | Exception | Raison | Jusqu'à quand |
| --- | --- | --- | --- |
| Au moins un test de bout en bout du parcours principal | Aucun test de bout en bout | Le parcours principal (connexion, réservation) n'existe pas encore | Étape connexion |
| Vérifier l'utilisateur et son rôle, RLS, session en cookie | Aucune authentification, utilisateur fictif | Étape 1 limitée au frontend | Étape connexion |
| `Content-Security-Policy` complète | CSP partielle (iframe, plugins, base-uri, formulaires) | Les scripts demandent des nonces, à mettre en place avec l'authentification | Étape connexion |
| Pages légales et pied de page (site public) | Absentes | Pas encore de site public | Création de la réservation publique |

## Installation et lancement

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000 (redirige vers `/fr/tableau-de-bord`, ou `/ar/...` si le navigateur est en arabe).

## Avant de terminer une tâche

- `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build` passent.
- Interface vérifiée en français et en arabe (RTL), sur mobile (360 px), tablette et ordinateur.
- Les nouveaux textes existent dans les deux dictionnaires.
