/*
 * Modes d'affichage du contenu de la barre latérale :
 * - "complet" : toujours déplié (tiroir mobile) ;
 * - "adaptatif" : colonne d'icônes sur tablette, dépliée à partir de `lg` ;
 * - "icones" : icônes seules (colonne réduite par l'utilisateur).
 */
export type ModeBarreLaterale = "complet" | "adaptatif" | "icones";

/** Texte qui doit rester lisible par les lecteurs d'écran quand il est masqué. */
export const VISIBILITE_LIBELLE: Record<ModeBarreLaterale, string> = {
  complet: "",
  adaptatif: "max-lg:sr-only",
  icones: "sr-only",
};

/** Blocs décoratifs ou secondaires, retirés complètement quand ils sont masqués. */
export const VISIBILITE_BLOC: Record<ModeBarreLaterale, string> = {
  complet: "",
  adaptatif: "max-lg:hidden",
  icones: "hidden",
};

/** Centre les icônes quand la barre est réduite. */
export const ALIGNEMENT_ICONES: Record<ModeBarreLaterale, string> = {
  complet: "",
  adaptatif: "max-lg:justify-center max-lg:px-0",
  icones: "justify-center px-0",
};
