import { accesFr } from "./fr-acces";
import { activiteFr } from "./fr-activite";
import { gestionFr } from "./fr-gestion";
import { systemeDesignFr } from "./fr-systeme-design";

/**
 * Textes de l'interface en français. Ce fichier définit la forme du
 * dictionnaire : toute autre langue doit fournir exactement les mêmes clés.
 * Les accolades {nom} sont remplacées à l'affichage par formaterTexte.
 */
export const fr = {
  metadonnees: {
    description: "Plateforme de prise et de gestion de rendez-vous pour les organisations professionnelles.",
  },
  commun: {
    chargement: "Chargement",
    fermer: "Fermer",
    retourTableauDeBord: "Retour au tableau de bord",
    allerAuContenu: "Aller au contenu principal",
    filAriane: "Fil d'Ariane",
    nonLu: "(non lu)",
    actuel: "(actuel)",
    erreurTitre: "Une erreur est survenue",
    erreurDescription: "La page n'a pas pu être affichée. Réessayez dans un instant.",
    reessayer: "Réessayer",
    introuvableTitre: "Page introuvable",
    introuvableDescription: "Cette page n'existe pas ou a été déplacée.",
  },
  navigation: {
    libelles: {
      "tableau-de-bord": "Tableau de bord",
      "rendez-vous": "Rendez-vous",
      calendrier: "Calendrier",
      clients: "Clients",
      services: "Services",
      equipe: "Équipe",
      disponibilites: "Disponibilités",
      "reservation-en-ligne": "Réservation en ligne",
      notifications: "Notifications",
      finances: "Finances",
      rapports: "Rapports",
      parametres: "Paramètres",
      organisations: "Organisations",
      utilisateurs: "Utilisateurs",
    },
    sections: {
      plateforme: "Plateforme",
      apercu: "Aperçu",
      gestion: "Gestion",
      "relation-client": "Relation client",
      activite: "Activité",
    },
    barreLaterale: "Barre latérale",
    navigationPrincipale: "Navigation principale",
    menuNavigation: "Menu de navigation",
    afficherMasquerMenu: "Afficher ou masquer le menu",
    fermerMenu: "Fermer le menu de navigation",
    systemeDesign: "Système de design",
  },
  roles: {
    administrateur_plateforme: "Administrateur plateforme",
    administrateur: "Administrateur",
    secretaire: "Secrétaire",
    collaborateur: "Collaborateur",
    client: "Client",
  },
  typesOrganisation: {
    clinique_medicale: "Clinique médicale",
    cabinet_dentaire: "Cabinet dentaire",
    cabinet_avocats: "Cabinet d'avocats",
    cabinet_comptable: "Cabinet comptable",
    cabinet_conseil: "Cabinet de conseil",
    centre_formation: "Centre de formation",
    autre: "Services professionnels",
  },
  organisation: {
    vosOrganisations: "Vos organisations",
    changerOrganisation: "Organisation actuelle : {nom}. Changer d'organisation",
    changementBientot: "Le changement d'organisation sera bientôt disponible.",
  },
  barreNavigation: {
    rechercheLibelle: "Rechercher dans l'espace de travail",
    recherchePlaceholder: "Rechercher un client, un rendez-vous...",
    changerLangue: "Changer de langue",
  },
  notifications: {
    titre: "Notifications",
    libelleAvecNonLues: "Notifications, {nombre} non lues",
    nouvelles: "{nombre} nouvelles",
    voirTout: "Voir toutes les notifications",
    aucune: "Aucune notification pour le moment.",
    types: {
      nouvelle_reservation: {
        titre: "Nouvelle réservation en ligne",
        message: "{client} a réservé « {service} » pour le {date}.",
      },
      rappel_rendez_vous: {
        titre: "Rendez-vous à venir",
        message: "« {service} » avec {client} commence dans {minutes} minutes.",
      },
      paiement_recu: {
        titre: "Paiement reçu",
        message: "La facture {facture} a été marquée comme payée.",
      },
      disponibilite_modifiee: {
        titre: "Disponibilités modifiées",
        message: "{collaborateur} a modifié ses disponibilités de la semaine.",
      },
    },
  },
  utilisateur: {
    menuDuCompte: "Menu du compte de {nom}",
    parametresCompte: "Paramètres du compte",
    preferencesNotifications: "Préférences de notification",
    deconnexion: "Se déconnecter",
  },
  pagination: {
    libelle: "Pagination",
    pageSurTotal: "Page {page} sur {total}",
    page: "Page {page}",
    precedente: "Page précédente",
    suivante: "Page suivante",
  },
  statutsRendezVous: {
    confirme: "Confirmé",
    en_attente: "En attente",
    annule: "Annulé",
  },
  systemeDesign: systemeDesignFr,
  ...accesFr,
  ...activiteFr,
  ...gestionFr,
};

export type Dictionnaire = typeof fr;
