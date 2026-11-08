import { describe, expect, it } from "vitest";
import {
  formaterDate,
  formaterDateHeure,
  formaterDuree,
  formaterHeure,
  formaterJourCourt,
  formaterJourLong,
  formaterMontant,
  formaterPourcentage,
  formaterTelephone,
  formaterTexte,
  obtenirInitiales,
} from "./formatage";

describe("formaterTexte", () => {
  it("remplace les clés par leurs valeurs", () => {
    expect(formaterTexte("Page {page} sur {total}", { page: 2, total: 10 })).toBe("Page 2 sur 10");
  });

  it("laisse visible une clé sans valeur", () => {
    expect(formaterTexte("Bonjour {prenom}", {})).toBe("Bonjour {prenom}");
  });
});

describe("obtenirInitiales", () => {
  it("garde les deux premières initiales en majuscules", () => {
    expect(obtenirInitiales("salma idrissi")).toBe("SI");
    expect(obtenirInitiales("Bennani Avocats Associés")).toBe("BA");
  });

  it("ignore les espaces en trop", () => {
    expect(obtenirInitiales("  Imane   Tazi ")).toBe("IT");
  });
});

describe("dates au Maroc", () => {
  // Le décalage vient de la base des fuseaux horaires (UTC+1 à Casablanca en juillet 2026).
  const date = "2026-07-15T13:30:00Z";

  it("formate la date en français", () => {
    expect(formaterDate(date, "fr")).toBe("mer. 15 juil. 2026");
  });

  it("formate l'heure sur 24 h dans le fuseau de Casablanca", () => {
    expect(formaterHeure(date, "fr")).toBe("14:30");
    expect(formaterHeure("2026-07-15T22:05:00Z", "fr")).toBe("23:05");
  });

  it("combine date et heure", () => {
    expect(formaterDateHeure(date, "fr")).toBe("mer. 15 juil. 2026, 14:30");
  });

  it("formate en arabe avec des chiffres occidentaux (usage marocain)", () => {
    expect(formaterHeure(date, "ar")).toBe("14:30");
    expect(formaterDate(date, "ar")).toContain("2026");
  });
});

describe("montants, téléphones et durées", () => {
  it("écrit les montants au format « 1 250,00 MAD »", () => {
    expect(formaterMontant(1250, "fr")).toBe("1\u00a0250,00\u00a0MAD");
    expect(formaterMontant(400, "fr")).toBe("400,00\u00a0MAD");
    expect(formaterMontant(1250, "ar")).toContain("1.250,00");
  });

  it("rend les numéros marocains lisibles", () => {
    expect(formaterTelephone("+212612345678")).toBe("06 12 34 56 78");
    expect(formaterTelephone("+33612345678")).toBe("+33612345678");
  });

  it("écrit les durées en heures et minutes", () => {
    const unites = { heure: "h", minute: "min" };
    expect(formaterDuree(45, unites)).toBe("45 min");
    expect(formaterDuree(60, unites)).toBe("1 h");
    expect(formaterDuree(90, unites)).toBe("1 h 30");
    expect(formaterDuree(65, unites)).toBe("1 h 05");
  });

  it("écrit les jours courts et longs", () => {
    expect(formaterJourCourt("2026-11-10T09:00:00Z", "fr")).toBe("mar. 10 nov.");
    expect(formaterJourLong("2026-11-10T09:00:00Z", "fr")).toBe("mardi 10 novembre");
  });
});

describe("formaterPourcentage", () => {
  it("écrit les pourcentages selon la langue", () => {
    expect(formaterPourcentage(31, "fr")).toBe("31\u00a0%");
    expect(formaterPourcentage(31, "ar")).toContain("31");
  });
});
