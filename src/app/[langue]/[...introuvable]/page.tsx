import { notFound } from "next/navigation";

// Cette page ne fait qu'afficher la page introuvable : rien à pré-charger pour une navigation instantanée.
export const instant = false;

/** Toute adresse inconnue affiche la page introuvable traduite de app/[langue]/not-found.tsx. */
export default function PageInconnue() {
  notFound();
}
