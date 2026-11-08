# Règles de sécurité

Ces règles s'appliquent à **chaque prompt**, chaque modification, chaque déploiement et chaque projet, **même en démonstration**.
Les risques propres au projet (données sensibles, paiement, santé...) sont précisés dans `README-projet.md`.

## 1. Secrets et variables d'environnement

- Les secrets sont dans `.env.local` (développement) et dans les variables d'environnement de l'hébergeur (production). **Jamais dans Git.**
- `.env*` est dans `.gitignore`. Un fichier `.env.example` liste les variables **sans leurs valeurs**.
- Seules les valeurs réellement publiques sont exposées au navigateur (préfixe `NEXT_PUBLIC_` avec Next.js). Une clé secrète ne porte **jamais** ce préfixe.
- Un fichier qui utilise une clé secrète commence par `import "server-only";` (Next.js) pour empêcher son import côté navigateur.
- Si un secret fuit (commit, capture d'écran, message) : le **régénérer immédiatement**.

## 2. Authentification

- Utiliser un service d'authentification éprouvé (Supabase Auth, Auth.js, Clerk...). **Jamais de système maison.**
- Mots de passe : jamais stockés en clair ; hachage géré par le service ou par bcrypt/argon2.
- Session en **cookie httpOnly, Secure, SameSite**. Jamais de jeton dans `localStorage` en production.
  - Exception tolérée uniquement pour une maquette sans vraies données, et signalée comme telle dans `README-projet.md`.
- Double authentification (MFA) pour les comptes administrateurs.
- Protection contre les essais répétés de mot de passe (limitation de tentatives).

## 3. Autorisation

- **L'identité et les droits viennent toujours de la session**, jamais de l'URL, d'un champ de formulaire ou d'un paramètre envoyé par le navigateur.
  - Exemple : un utilisateur ne voit que ses données, son identifiant est lu dans la session, pas dans `/profil?id=42`.
- Vérifier l'utilisateur et son rôle **au début de chaque action serveur et de chaque route API**. Une protection uniquement sur la page ou dans le `proxy.ts` ne suffit pas.
- Les pages d'administration sont réservées aux rôles prévus ; chaque rôle n'a que les droits nécessaires (moindre privilège).
- Avec une base partagée entre plusieurs clients ou utilisateurs : isolation **en base** (RLS avec Supabase/PostgreSQL), en plus du code.
- Un test automatique vérifie qu'un utilisateur A ne peut ni lire ni modifier les données d'un utilisateur B.

## 4. Entrées et sorties

- **Toute entrée est validée côté serveur** (zod ou équivalent), même si elle l'est déjà côté navigateur.
- Requêtes à la base paramétrées ou via le client officiel. Jamais de SQL construit par concaténation de texte.
- Pas de `dangerouslySetInnerHTML` (ou équivalent) avec un contenu venant d'un utilisateur.
- Fichiers envoyés par les utilisateurs : type et taille vérifiés, stockage privé, liens signés à durée limitée.
- Formulaires publics : limitation de débit et protection anti-robot (champ caché, Cloudflare Turnstile si nécessaire).
- Liens envoyés par e-mail, SMS ou WhatsApp : jeton aléatoire à usage unique et à durée limitée, jamais un identifiant brut.

## 5. API, webhooks et tâches planifiées

- Webhooks entrants (paiement, WhatsApp, etc.) : **vérifier la signature** avant tout traitement ; ignorer les doublons.
- Routes appelées par une tâche planifiée : protégées par un secret (`Authorization: Bearer <CRON_SECRET>`).
- Les réponses d'erreur ne révèlent jamais de détail technique (pile d'appels, requête SQL, chemin de fichier).
- CORS limité aux domaines du projet.

## 6. Données personnelles (Maroc : loi 09-08 ; Europe : RGPD)

- **Minimisation** : ne collecter que ce dont la fonctionnalité a réellement besoin. Pas de date de naissance, CIN, adresse ou localisation « au cas où ».
- Données sensibles (santé, finances, opinions, mineurs) : niveau d'exigence renforcé et règles précisées dans `README-projet.md`.
- Consentements : cases **non pré-cochées**, consentement marketing séparé des conditions d'utilisation.
- Droit d'accès et de suppression : l'utilisateur peut supprimer son compte et ses données depuis l'application, et dispose d'un contact pour ses demandes.
- Au Maroc : déclaration ou demande d'autorisation à la **CNDP** avant la mise en production avec de vraies données ; vérifier les conditions d'hébergement hors du Maroc.
- Politique de confidentialité à jour, listant tous les sous-traitants (hébergeur, base de données, e-mails, SMS, analyse, IA, paiement).

## 7. Paiement

- Jamais de numéro de carte bancaire stocké ni transmis par nos serveurs : la passerelle (CMI, PayZone, Stripe...) s'en charge.
- Le montant est **recalculé côté serveur**, jamais accepté tel quel depuis le navigateur.
- Le statut « payé » n'est validé qu'à réception du webhook signé de la passerelle.

## 8. Intelligence artificielle (si le projet en utilise)

- Le texte des utilisateurs est traité comme une **donnée, jamais comme une instruction** (protection contre l'injection de prompt).
- L'IA n'agit que par des **fonctions autorisées**, qui repassent par les mêmes vérifications que l'interface. Jamais d'accès direct à la base.
- Envoyer au modèle le strict nécessaire, chez un fournisseur qui n'entraîne pas ses modèles sur nos données.
- Pas de décision importante (médicale, financière, juridique) prise par l'IA seule : un humain valide.

## 9. Journalisation

- Jamais de mot de passe, jeton, numéro de carte, CIN ou contenu sensible dans les logs. Masquer les téléphones et e-mails : `+2126****5678`.
- Outil de suivi des erreurs (Sentry ou équivalent) avec filtrage des données personnelles.
- Journal d'audit pour les actions sensibles : connexion administrateur, modification de droits, export, suppression, paiement.

## 10. Configuration web

- HTTPS uniquement, avec HSTS.
- En-têtes de sécurité : `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
- Cookies d'analyse ou de publicité chargés **uniquement après consentement**.

## 11. Dépendances

- `npm audit` (ou équivalent) avant chaque mise en production ; corriger les vulnérabilités élevées et critiques.
- Dependabot ou Renovate activé sur le dépôt.
- Pas de paquet inconnu, abandonné ou à la licence incompatible.

## 12. Sauvegarde et incident

- Sauvegardes automatiques de la base ; restauration testée au moins une fois avant le lancement.
- En cas de fuite ou d'accès anormal : couper l'accès concerné, régénérer les secrets, analyser les journaux, prévenir les personnes touchées et l'autorité compétente (CNDP, CNIL...) selon les obligations en vigueur.

## Avant chaque mise en production

- [ ] Aucun secret dans le code ni dans l'historique Git.
- [ ] Chaque action serveur et chaque route API vérifie l'utilisateur et son rôle.
- [ ] Test d'isolation entre deux utilisateurs ou deux clients réussi.
- [ ] Entrées validées côté serveur, formulaires publics limités en débit.
- [ ] Webhooks et tâches planifiées protégés.
- [ ] Aucune donnée personnelle dans les logs.
- [ ] En-têtes de sécurité et HTTPS actifs.
- [ ] `npm audit` sans vulnérabilité élevée ou critique.
- [ ] Politique de confidentialité, consentements et démarche CNDP à jour.
