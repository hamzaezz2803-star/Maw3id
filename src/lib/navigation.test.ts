import { describe, expect, it } from "vitest";
import {
  cheminLocalise,
  obtenirNavigationPourRole,
  retirerLangueDuChemin,
  trouverElementParChemin,
} from "./navigation";

function idsVisibles(role: Parameters<typeof obtenirNavigationPourRole>[0]) {
  return obtenirNavigationPourRole(role).flatMap((section) => section.elements.map((element) => element.id));
}

describe("obtenirNavigationPourRole", () => {
  it("donne tous les modules à l'administrateur", () => {
    expect(idsVisibles("administrateur")).toHaveLength(11);
  });

  it("cache les modules d'administration au collaborateur", () => {
    const ids = idsVisibles("collaborateur");
    expect(ids).toContain("rendez-vous");
    expect(ids).not.toContain("finances");
    expect(ids).not.toContain("services");
  });

  it("ne montre rien de l'espace de gestion au client", () => {
    expect(obtenirNavigationPourRole("client")).toEqual([]);
  });
});

describe("chemins et langues", () => {
  it("retire le préfixe de langue", () => {
    expect(retirerLangueDuChemin("/ar/clients/12")).toBe("/clients/12");
    expect(retirerLangueDuChemin("/fr")).toBe("/");
    expect(retirerLangueDuChemin("/clients")).toBe("/clients");
  });

  it("ajoute le préfixe de langue", () => {
    expect(cheminLocalise("/clients", "ar")).toBe("/ar/clients");
    expect(cheminLocalise("/", "fr")).toBe("/fr");
  });

  it("trouve l'élément actif, pages imbriquées comprises", () => {
    expect(trouverElementParChemin("/fr/clients")?.id).toBe("clients");
    expect(trouverElementParChemin("/ar/clients/12")?.id).toBe("clients");
    expect(trouverElementParChemin("/fr/clientsx")).toBeUndefined();
  });
});
