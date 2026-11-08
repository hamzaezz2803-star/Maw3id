/** « Cabinet Dentaire Nour », « a1b2c3 » -> « cabinet-dentaire-nour-a1b2c3 » (identifiant d'URL unique). */
export function genererIdentifiantUrl(nom: string, suffixe: string): string {
  const base = nom
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
  return base ? `${base}-${suffixe}` : suffixe;
}
