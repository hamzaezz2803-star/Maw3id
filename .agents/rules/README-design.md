# Règles de design et de contenu

Ces règles s'appliquent à toutes les pages, composants, textes et images, dans tous les projets (site web ou application).
La palette, les polices et les écrans propres au projet sont définis dans `README-projet.md`.

## 1. Identité visuelle

- **Pas de dégradé violet**, ni de dégradé purement décoratif. Palette sobre et cohérente avec la marque du projet ou du client.
- Les couleurs sont définies **une seule fois** (variables CSS du thème, Tailwind ou équivalent). Jamais de couleur en dur dans un composant.
- Une couleur primaire, des couleurs neutres (texte, fond, bordures) et des couleurs de statut (succès, attention, erreur, neutre).
- Les statuts ne sont **jamais indiqués par la couleur seule** : toujours un libellé ou une icône en plus.
- Thème clair obligatoire ; thème sombre si le projet le prévoit, avec les mêmes exigences de contraste.

## 2. Typographie

- Deux familles de polices au maximum, sous **licence permettant un usage commercial** (Google Fonts en OFL, par exemple), chargées localement (`next/font` avec Next.js).
- Texte courant : 16 px minimum. Libellés secondaires : 14 px minimum.
- Projet en arabe : police arabe dédiée et lisible (IBM Plex Sans Arabic, Noto Sans Arabic...).

## 3. Composants

- **Pas de boutons en forme de pilule** (`border-radius: 9999px`). Rayon modéré, de 6 à 10 px, avec des états survol, focus et désactivé visibles.
- Un seul **bouton principal** par écran ; les actions secondaires en style « contour » ou « fantôme ».
- **Pas d'emoji comme icône.** Une seule bibliothèque d'icônes (Lucide par défaut), avec un `aria-label` quand l'icône est seule.
- Zones cliquables d'au moins **44 × 44 px** sur mobile.
- Formulaires : libellé toujours visible au-dessus du champ, message d'erreur clair sous le champ, bouton de validation désactivé pendant l'envoi.
- Chaque liste ou page de données prévoit trois états : chargement, erreur, vide (avec une action utile).

## 4. Mise en page

- **Responsive** : testé sur mobile (360 px), tablette et ordinateur.
- Les espaces destinés au grand public sont pensés **d'abord pour le mobile**.
- Hiérarchie claire : un titre par page, des sections courtes, des espacements réguliers (multiples de 4 ou 8 px).

## 5. Langues et formats

- Projet multilingue : aucun texte en dur dans les composants ; tout passe par les fichiers de traduction.
- Arabe : `dir="rtl"` sur la page, propriétés logiques (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-` avec Tailwind) plutôt que `left`/`right`, icônes directionnelles inversées.
- Formats (par défaut pour le Maroc) :
  - montants toujours avec 2 décimales et la devise : « 1 250,00 MAD » ;
  - heures au format 24 h : « 14:30 » ;
  - dates lisibles : « ven. 14 nov. 2026 » ;
  - téléphones lisibles à l'affichage (« 06 12 34 56 78 »), stockés au format international.

## 6. Mouvement et performance

- **Pas d'animations excessives** au défilement, pas d'effet de parallaxe, pas d'animation sur chaque section.
- Transitions courtes (moins de 200 ms), uniquement quand elles aident à comprendre.
- Respecter `prefers-reduced-motion`.
- Images optimisées (formats modernes, dimensions adaptées, chargement différé) ; pages principales rapides sur une connexion mobile.

## 7. Accessibilité (WCAG AA)

- Contraste d'au moins **4,5:1** pour le texte, **3:1** pour le grand texte et les éléments d'interface. Vérifier avec un outil de contraste.
- Tout fonctionne au **clavier** (Tab, Maj+Tab, Entrée, Échap), avec un contour de focus visible et sans piège.
- Chaque image utile a un `alt` descriptif ; les images décoratives ont `alt=""`.
- Champs de formulaire reliés à leur libellé ; erreurs annoncées aux lecteurs d'écran.
- Ordre de lecture logique sur mobile et avec un lecteur d'écran.

## 8. Images et ressources

- **Pas d'images générées par IA présentées comme réelles** (faux employés, faux locaux, faux clients, fausses réalisations).
- Utiliser de vraies photos du produit ou de l'équipe, des photos sous licence commerciale ou des illustrations assumées.
- Sources et licences de toutes les polices, icônes, images et sons listées dans `docs/licences.md`.
- **Pas de badge « Fait avec l'IA »** ni de mention promotionnelle de ce type, sauf obligation légale réelle.

## 9. Textes et contenu

- **Titre principal précis** : ce que propose le projet, pour qui, et le résultat attendu, suivi d'une phrase d'appui et d'un bouton d'action pertinent. Pas de slogan vague.
- **Pas de faux avis**, de fausses notes, de faux noms ni de faux logos de clients. Uniquement des témoignages réels et autorisés, sinon pas de section.
- **Pas de faux chiffres** (nombre de clients, chiffre d'affaires, taux de satisfaction, performances). Un chiffre n'est affiché que s'il est exact, actuel et vérifiable.
- **Pas d'affirmation non prouvée** : « n°1 au Maroc », « 100 % sécurisé », « résultats garantis ».
- **Pas de tiret cadratin (—)** dans les textes visibles : utiliser un point, une virgule, deux-points ou des parenthèses.
- **Pas de procédé trompeur** : faux compte à rebours, bouton d'annulation caché, double négation, texte culpabilisant pour refuser.
- **Prix complets** affichés avant le paiement (taxes, frais, fréquence de renouvellement d'un abonnement).
- Ton simple, poli et professionnel, adapté au public du projet.

## 10. Pages et éléments obligatoires (site public)

- Conditions générales d'utilisation, politique de confidentialité, politique de cookies, et politique de remboursement si quelque chose est vendu. Toutes reliées depuis le **pied de page**.
- Informations sur l'entreprise : nom ou raison sociale, adresse, e-mail ou téléphone de contact, ICE et RC si l'entreprise est immatriculée au Maroc.
- Bandeau cookies avec « Accepter » et « Refuser » de même importance, uniquement si des cookies non essentiels sont utilisés.
- **Favicon** (et icônes d'application si le site est installable) aux couleurs du projet.
- Production sur le **nom de domaine réel** du projet, jamais sur une adresse temporaire de l'hébergeur.
- Le contenu légal n'est jamais inventé : il décrit le vrai service et les vrais sous-traitants. Le faire relire pour un produit payant ou sensible.

## Vérification avant mise en ligne

- [ ] Aucun dégradé violet, aucun bouton en pilule, aucun emoji comme icône.
- [ ] Titre principal précis ; aucun faux avis, faux chiffre ni affirmation non prouvée.
- [ ] Aucun tiret cadratin dans les textes visibles.
- [ ] Animations limitées, `prefers-reduced-motion` respecté.
- [ ] Contraste, navigation au clavier et textes `alt` vérifiés.
- [ ] Testé sur mobile, tablette et ordinateur, et dans chaque langue du projet.
- [ ] Images authentiques ou sous licence ; `docs/licences.md` à jour.
- [ ] Pages légales et informations de l'entreprise reliées depuis le pied de page.
- [ ] Favicon en place, domaine réel en production.
