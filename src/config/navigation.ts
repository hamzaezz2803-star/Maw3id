import {
  Bell,
  Briefcase,
  CalendarCheck,
  CalendarDays,
  Building2,
  ChartColumn,
  Clock,
  Globe,
  LayoutDashboard,
  Settings,
  UserCog,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react";
import { ROLES_ADMINISTRATION, ROLES_EQUIPE, ROLES_GESTION, ROLES_PLATEFORME } from "@/constants";
import type { ElementNavigation, Role, SectionNavigation } from "@/types";

export const CHEMIN_CONNEXION = "/connexion";
/** Saisie du code à 6 chiffres après le mot de passe (avant que la session existe). */
export const CHEMIN_VERIFICATION_CODE = "/connexion/verification";
/** Activation obligatoire de la double authentification pour les administrateurs. */
export const CHEMIN_ACTIVATION_DOUBLE_AUTHENTIFICATION = "/securite/double-authentification";
export const CHEMIN_ACCUEIL = "/tableau-de-bord";
export const CHEMIN_ACCUEIL_PLATEFORME = "/plateforme/organisations";
export const CHEMIN_SYSTEME_DESIGN = "/systeme-de-design";

/** Page d'arrivée après connexion, selon le rôle. */
export function obtenirCheminAccueil(role: Role): string {
  return ROLES_PLATEFORME.includes(role) ? CHEMIN_ACCUEIL_PLATEFORME : CHEMIN_ACCUEIL;
}

/** Les libellés sont dans les dictionnaires (navigation.libelles). */
export const NAVIGATION: SectionNavigation[] = [
  {
    id: "plateforme",
    avecTitre: true,
    elements: [
      { id: "organisations", chemin: "/plateforme/organisations", icone: Building2, roles: ROLES_PLATEFORME },
      { id: "utilisateurs", chemin: "/plateforme/utilisateurs", icone: UserCog, roles: ROLES_PLATEFORME },
    ],
  },
  {
    id: "apercu",
    avecTitre: false,
    elements: [
      { id: "tableau-de-bord", chemin: "/tableau-de-bord", icone: LayoutDashboard, roles: ROLES_EQUIPE },
      { id: "rendez-vous", chemin: "/rendez-vous", icone: CalendarCheck, roles: ROLES_EQUIPE },
      { id: "calendrier", chemin: "/calendrier", icone: CalendarDays, roles: ROLES_EQUIPE },
    ],
  },
  {
    id: "gestion",
    avecTitre: true,
    elements: [
      { id: "clients", chemin: "/clients", icone: Users, roles: ROLES_GESTION },
      { id: "services", chemin: "/services", icone: Briefcase, roles: ROLES_ADMINISTRATION },
      { id: "equipe", chemin: "/equipe", icone: UsersRound, roles: ROLES_ADMINISTRATION },
      { id: "disponibilites", chemin: "/disponibilites", icone: Clock, roles: ROLES_EQUIPE },
    ],
  },
  {
    id: "relation-client",
    avecTitre: true,
    elements: [
      { id: "reservation-en-ligne", chemin: "/reservation-en-ligne", icone: Globe, roles: ROLES_ADMINISTRATION },
      { id: "notifications", chemin: "/notifications", icone: Bell, roles: ROLES_EQUIPE },
    ],
  },
  {
    id: "activite",
    avecTitre: true,
    elements: [
      { id: "finances", chemin: "/finances", icone: Wallet, roles: ROLES_GESTION },
      { id: "rapports", chemin: "/rapports", icone: ChartColumn, roles: ROLES_ADMINISTRATION },
    ],
  },
];

/** Épinglé en bas de la barre latérale. */
export const ELEMENT_PARAMETRES: ElementNavigation = {
  id: "parametres",
  chemin: "/parametres",
  icone: Settings,
  roles: ROLES_ADMINISTRATION,
};
