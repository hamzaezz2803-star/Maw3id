import { describe, expect, it } from "vitest";
import { estLangueValide } from "./config";
import { DICTIONNAIRES } from "./dictionnaires";

/** Liste les chemins de toutes les clés feuilles : « commun.fermer », ... */
function listerCles(objet: object, prefixe = ""): string[] {
  return Object.entries(objet).flatMap(([cle, valeur]) => {
    const chemin = prefixe ? `${prefixe}.${cle}` : cle;
    return typeof valeur === "object" && valeur !== null ? listerCles(valeur, chemin) : [chemin];
  });
}

function listerValeurs(objet: object): string[] {
  return Object.values(objet).flatMap((valeur) =>
    typeof valeur === "object" && valeur !== null ? listerValeurs(valeur) : [String(valeur)],
  );
}

describe("dictionnaires", () => {
  it("l'arabe contient exactement les mêmes clés que le français", () => {
    expect(listerCles(DICTIONNAIRES.ar).sort()).toEqual(listerCles(DICTIONNAIRES.fr).sort());
  });

  it("aucun texte n'est vide", () => {
    for (const dictionnaire of Object.values(DICTIONNAIRES)) {
      expect(listerValeurs(dictionnaire).filter((texte) => texte.trim() === "")).toEqual([]);
    }
  });

  it("aucun texte visible ne contient de tiret cadratin", () => {
    for (const dictionnaire of Object.values(DICTIONNAIRES)) {
      expect(listerValeurs(dictionnaire).filter((texte) => texte.includes("—"))).toEqual([]);
    }
  });
});

describe("estLangueValide", () => {
  it("accepte uniquement les langues de l'application", () => {
    expect(estLangueValide("fr")).toBe(true);
    expect(estLangueValide("ar")).toBe(true);
    expect(estLangueValide("en")).toBe(false);
  });
});
