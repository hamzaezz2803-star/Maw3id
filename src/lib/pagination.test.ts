import { describe, expect, it } from "vitest";
import { obtenirJetonsPages } from "./pagination";

describe("obtenirJetonsPages", () => {
  it("affiche toutes les pages quand il y en a peu", () => {
    expect(obtenirJetonsPages(1, 3)).toEqual([1, 2, 3]);
  });

  it("place des ellipses autour de la page courante", () => {
    expect(obtenirJetonsPages(5, 10)).toEqual([1, "ellipse-debut", 4, 5, 6, "ellipse-fin", 10]);
  });

  it("n'ajoute pas d'ellipse en début de liste", () => {
    expect(obtenirJetonsPages(1, 10)).toEqual([1, 2, "ellipse-fin", 10]);
  });

  it("n'ajoute pas d'ellipse en fin de liste", () => {
    expect(obtenirJetonsPages(10, 10)).toEqual([1, "ellipse-debut", 9, 10]);
  });

  it("gère une seule page et aucune page", () => {
    expect(obtenirJetonsPages(1, 1)).toEqual([1]);
    expect(obtenirJetonsPages(1, 0)).toEqual([]);
  });
});
