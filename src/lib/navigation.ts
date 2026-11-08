import { ELEMENT_PARAMETRES, NAVIGATION } from "@/config/navigation";
import { estLangueValide } from "@/i18n/config";
import type { ElementNavigation, Langue, Role, SectionNavigation } from "@/types";

const TOUS_LES_ELEMENTS: ElementNavigation[] = [
  ...NAVIGATION.flatMap((section) => section.elements),
  ELEMENT_PARAMETRES,
];

/** Sections visibles pour un rôle. Les sections vides sont retirées. */
export function obtenirNavigationPourRole(role: Role): SectionNavigation[] {
  return NAVIGATION.map((section) => ({
    ...section,
    elements: section.elements.filter((element) => element.roles.includes(role)),
  })).filter((section) => section.elements.length > 0);
}

export function peutAccederElement(element: ElementNavigation, role: Role): boolean {
  return element.roles.includes(role);
}

export function obtenirElementNavigation(id: string): ElementNavigation | undefined {
  return TOUS_LES_ELEMENTS.find((element) => element.id === id);
}

/** « /fr/clients/12 » -> « /clients/12 » */
export function retirerLangueDuChemin(chemin: string): string {
  const [, premierSegment, ...reste] = chemin.split("/");
  if (premierSegment && estLangueValide(premierSegment)) return `/${reste.join("/")}`;
  return chemin;
}

/** « /clients », « ar » -> « /ar/clients » */
export function cheminLocalise(chemin: string, langue: Langue): string {
  return `/${langue}${chemin === "/" ? "" : chemin}`;
}

/** Élément correspondant au chemin courant, pages imbriquées comprises (/clients/12). */
export function trouverElementParChemin(chemin: string): ElementNavigation | undefined {
  const cheminSansLangue = retirerLangueDuChemin(chemin);
  return TOUS_LES_ELEMENTS.find(
    (element) => cheminSansLangue === element.chemin || cheminSansLangue.startsWith(`${element.chemin}/`),
  );
}

export function estElementActif(element: ElementNavigation, chemin: string): boolean {
  return trouverElementParChemin(chemin)?.id === element.id;
}
