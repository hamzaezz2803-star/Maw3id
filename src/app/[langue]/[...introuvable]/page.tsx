import { notFound } from "next/navigation";

/** Toute adresse inconnue affiche la page introuvable traduite de app/[langue]/not-found.tsx. */
export default function PageInconnue() {
  notFound();
}
