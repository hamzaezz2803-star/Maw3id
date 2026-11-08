import { PAGES_VOISINES_PAGINATION } from "@/constants";

export type JetonPage = number | "ellipse-debut" | "ellipse-fin";

/** Pages à afficher, ex. page 5 sur 10 : [1, "ellipse-debut", 4, 5, 6, "ellipse-fin", 10] */
export function obtenirJetonsPages(page: number, nombrePages: number): JetonPage[] {
  if (nombrePages < 1) return [];

  const premiere = Math.max(2, page - PAGES_VOISINES_PAGINATION);
  const derniere = Math.min(nombrePages - 1, page + PAGES_VOISINES_PAGINATION);
  const jetons: JetonPage[] = [1];

  if (premiere > 2) jetons.push("ellipse-debut");
  for (let courante = premiere; courante <= derniere; courante += 1) jetons.push(courante);
  if (derniere < nombrePages - 1) jetons.push("ellipse-fin");
  if (nombrePages > 1) jetons.push(nombrePages);

  return jetons;
}
