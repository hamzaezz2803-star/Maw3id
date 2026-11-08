# Règles de qualité de code

Ces règles s'appliquent à **chaque prompt**, chaque modification et chaque projet.
Le contexte propre au projet (stack, espaces, exceptions) est décrit dans `README-projet.md`, qui est prioritaire en cas de conflit.

## Principes

- Le code doit être **clair, simple à comprendre et facile à maintenir** par quelqu'un qui découvre le projet.
- Préférer la solution **la plus simple qui fonctionne**. Pas d'abstraction « pour plus tard ».
- Ne modifier que ce qui est demandé. Pas de refonte non demandée d'un fichier voisin.

## Nommage

- Noms de variables, fonctions, composants et fichiers **explicites** : `calculerTotalCommande`, pas `calc` ni `data2`.
- Langue des noms : celle indiquée dans `README-projet.md` (par défaut le **français**), la même partout dans le projet.
  - Exception : les noms imposés par un framework ou une bibliothèque (`page.tsx`, `route.ts`, `index.ts`).
- Booléens formulés comme une question : `estConnecte`, `aDesErreurs`.
- Constantes en majuscules : `DUREE_SESSION_MINUTES`.

## Fonctions et fichiers

- Une fonction = **une seule responsabilité**. Idéalement moins de 40 lignes.
- Un fichier = un sujet. Au-delà d'environ **200 lignes**, découper.
- Composants d'interface **petits et réutilisables**.
- **Pas de code dupliqué** : dès qu'un bloc est copié une deuxième fois, le factoriser dans `lib/` (logique) ou `components/ui/` (interface).
- Pas de « nombres magiques » : durées, limites et seuils dans un fichier de constantes.

## Typage

- TypeScript en mode **strict**.
- **Jamais de `any`.** Utiliser `unknown`, puis valider (zod ou équivalent) avant usage.
- Types partagés centralisés (par défaut `types/index.ts`). Types de base de données générés automatiquement, jamais écrits à la main.
- Toute donnée qui vient de l'extérieur (formulaire, URL, API, fichier, IA) est **validée** avant d'être utilisée.

## Architecture

- **Séparer les couches** :
  - interface (pages, composants) ;
  - accès aux données (un seul endroit, par défaut `lib/donnees/` ou `lib/api.ts`) ;
  - logique métier pure (`lib/metier/`), sans dépendance à l'interface ni à la base, donc facile à tester.
- Les pages et composants **n'appellent jamais directement** la base de données ni une API externe : ils passent par la couche d'accès aux données. Cela permet de remplacer des données fictives par une vraie API sans toucher aux pages.
- Avec Next.js (App Router) :
  - Server Components par défaut ; `"use client"` seulement si l'interactivité l'exige ;
  - écritures via Server Actions ou routes API qui valident l'entrée et vérifient l'utilisateur ;
  - session rafraîchie dans `proxy.ts` (Next.js 16 et plus ; `middleware.ts` avant).
- Les textes affichés à l'utilisateur sont regroupés (fichiers de traduction si le projet est multilingue), pas éparpillés dans le code.

## Commentaires et documentation

- Commentaires **courts**, dans la langue du projet, qui expliquent le **pourquoi**, pas le quoi.
- Pas de code commenté laissé « au cas où » : Git garde l'historique.
- Chaque projet a un `README-projet.md` à jour : comment installer, lancer, tester.

## Dépendances

- **Pas de bibliothèque supplémentaire sans raison claire.** Avant d'en ajouter une, vérifier : besoin réel, taille, licence compatible avec un usage commercial, maintenance récente.
- La liste des bibliothèques autorisées du projet est dans `README-projet.md`.
- Versions figées dans le fichier de verrouillage (`package-lock.json` ou équivalent), toujours commité.

## Gestion des erreurs

- Messages d'erreur **clairs, compréhensibles par l'utilisateur final**, dans sa langue. Jamais de message technique ou de trace d'erreur affichée.
- Les fonctions qui peuvent échouer renvoient un résultat explicite (`{ ok: true, donnees } | { ok: false, erreur }`) plutôt que de laisser une exception remonter jusqu'à l'interface.
- Les erreurs techniques sont journalisées côté serveur, **sans données personnelles**.
- Chaque écran qui charge des données gère trois états : chargement, erreur, vide.

## Tests

- Tests **obligatoires** pour la logique métier (calculs, règles, montants, dates).
- Au moins un test de bout en bout pour le parcours principal de l'application.
- Un bug corrigé = un test qui le reproduit.
- Données de test **fictives** uniquement.

## Git

- Une branche par fonctionnalité ou correction : `fonctionnalite/<nom>`, `correction/<nom>`.
- Messages de commit courts, au présent : « Ajoute l'export PDF ».
- Petits commits cohérents plutôt qu'un énorme commit.
- **Jamais** de fichier `.env`, de clé ou de mot de passe dans Git.

## Avant de terminer une tâche

- [ ] Le lint passe sans erreur (`npm run lint`).
- [ ] Le build passe sans erreur (`npm run build`).
- [ ] Les tests passent.
- [ ] Plus de code mort, de `console.log` ni d'import inutilisé.
- [ ] Aucun `any`, aucun secret dans le code.
- [ ] Les textes ajoutés existent dans toutes les langues du projet.
- [ ] `README-projet.md` est à jour si l'installation ou la structure a changé.
