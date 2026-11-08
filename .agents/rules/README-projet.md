# [Nom du projet] — fiche projet

> Modèle à copier dans chaque nouveau projet et à remplir. Remplacer tout ce qui est entre crochets.
> Ce fichier décrit **ce qui est propre au projet**. Les règles communes sont dans :
> `README-qualite-code.md`, `README-securite.md`, `README-base-de-donnees.md`, `README-design.md` et `README1.md` (checklist de conformité avant lancement).
> **En cas de conflit, ce fichier est prioritaire**, à condition que l'exception soit écrite ici explicitement.

Ces règles s'appliquent à **chaque prompt** et à chaque modification du projet.

## Contexte

- **But** : [ce que fait l'application, en une phrase].
- **Utilisateurs** : [qui l'utilise : administrateurs, clients, collaborateurs, patients...].
- **Client ou commanditaire** : [nom, ou « projet personnel »].
- **Marché** : [pays, langues : français, arabe, anglais...].
- **Statut** : [maquette avec données fictives / MVP / production].

## Stack

- Framework : [Next.js 16, App Router, TypeScript, Tailwind CSS v4...].
- Base de données : [Supabase / PostgreSQL / aucune pour l'instant : données fictives dans `lib/mock-data.ts`].
- Authentification : [Supabase Auth / Auth.js / démo en `localStorage`, à remplacer avant la production].
- Hébergement : [Vercel / autre].
- Services externes : [WhatsApp, SMS, e-mail, paiement, IA...].

## Espaces et rôles

| Espace | Chemin | Rôles autorisés |
| --- | --- | --- |
| [Administrateur] | [`/admin/*`] | [`admin`, `super_admin`] |
| [Utilisateur] | [`/espace/*`] | [`utilisateur`] |
| [Public] | [`/`] | Tout le monde |

## Règles métier

- [Règle 1, ex. : un collaborateur ne voit que son propre solde.]
- [Règle 2, ex. : les montants sont toujours en MAD avec 2 décimales.]
- [Règle 3, ex. : un créneau ne peut pas être réservé deux fois.]

## Données

- Tables principales : [liste ou lien vers le schéma].
- Données sensibles traitées : [aucune / santé / financières / mineurs...] et précautions associées.
- Données à ne jamais collecter : [CIN, date de naissance...].

## Design

- Couleurs : [primaire `#______`, texte `#______`, fond `#______`].
- Polices : [Inter, IBM Plex Sans Arabic...].
- Priorité d'affichage : [mobile d'abord pour l'espace X, ordinateur pour l'espace Y].
- Thème sombre : [oui / non].

## Bibliothèques autorisées

| Besoin | Bibliothèque |
| --- | --- |
| [Formulaires] | [`react-hook-form`, `zod`] |
| [Icônes] | [`lucide-react`] |
| [...] | [...] |

## Structure des dossiers

```text
[Coller ici l'arborescence propre au projet]
```

## Exceptions aux règles communes

Lister ici, de façon explicite, toute règle commune volontairement non appliquée, avec la raison et la date de fin prévue.

| Règle commune | Exception | Raison | Jusqu'à quand |
| --- | --- | --- | --- |
| [Session en cookie httpOnly] | [Session en `localStorage`] | [Démo sans backend] | [Arrivée du backend] |

## Installation et lancement

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs
npm run dev
```

## Avant de terminer une tâche

- Appliquer la liste « Avant de terminer une tâche » de `README-qualite-code.md`.
- [Vérification propre au projet, ex. : tester l'interface en arabe.]
