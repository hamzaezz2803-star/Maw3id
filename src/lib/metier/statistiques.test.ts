import { describe, expect, it } from "vitest";
import type { Facture, RendezVous } from "@/types";
import {
  classerServices,
  compterParStatut,
  minutesDepuisMinuit,
  prochainRendezVous,
  rendezVousDuJour,
  repartirEnVoies,
  tauxOccupation,
  totalFactures,
  variationPourcentage,
} from "./statistiques";

const HORODATAGE = { cree_le: "2026-11-01T00:00:00Z", modifie_le: "2026-11-01T00:00:00Z", organisation_id: "o" };

function rdv(id: string, debut: string, duree: number, statut: RendezVous["statut"], service = "s1"): RendezVous {
  return { ...HORODATAGE, id, client_id: "c", collaborateur_id: "k", service_id: service, debut_le: debut, duree_minutes: duree, statut, source: "accueil" };
}

const JOUR = [
  rdv("b", "2026-11-10T11:00:00Z", 30, "confirme", "s2"),
  rdv("a", "2026-11-10T09:00:00Z", 45, "termine"),
  rdv("c", "2026-11-10T14:00:00Z", 60, "annule"),
  rdv("d", "2026-11-10T15:00:00Z", 30, "en_attente", "s2"),
];

describe("agenda du jour", () => {
  it("convertit une heure en minutes", () => {
    expect(minutesDepuisMinuit("09:30")).toBe(570);
  });

  it("garde le jour demandé, trié par heure", () => {
    const liste = rendezVousDuJour([...JOUR, rdv("e", "2026-11-11T08:00:00Z", 30, "confirme")], "2026-11-10");
    expect(liste.map((item) => item.id)).toEqual(["a", "b", "c", "d"]);
  });

  it("compte chaque statut", () => {
    expect(compterParStatut(JOUR)).toEqual({ confirme: 1, en_attente: 1, annule: 1, termine: 1, absent: 0 });
  });

  it("trouve le prochain rendez-vous en ignorant les annulés et terminés", () => {
    const tries = rendezVousDuJour(JOUR, "2026-11-10");
    expect(prochainRendezVous(tries, "11:20")?.id).toBe("d");
    expect(prochainRendezVous(tries, "10:00")?.id).toBe("b");
    expect(prochainRendezVous(tries, "18:00")).toBeNull();
  });
});

describe("tauxOccupation", () => {
  it("ne compte pas les rendez-vous annulés", () => {
    // 45 + 30 + 30 = 105 minutes sur 210
    expect(tauxOccupation(JOUR, 210)).toBe(50);
  });

  it("vaut 0 sans disponibilité et plafonne à 100", () => {
    expect(tauxOccupation(JOUR, 0)).toBe(0);
    expect(tauxOccupation(JOUR, 60)).toBe(100);
  });
});

describe("finances et rapports", () => {
  const factures = [
    { id: "1", montant_mad: 400.1, statut: "payee" },
    { id: "2", montant_mad: 250.2, statut: "payee" },
    { id: "3", montant_mad: 900, statut: "en_retard" },
  ] as Facture[];

  it("additionne les montants au centime près", () => {
    expect(totalFactures(factures, "payee")).toBe(650.3);
    expect(totalFactures(factures, "en_attente")).toBe(0);
  });

  it("classe les services planifiés", () => {
    expect(classerServices(JOUR)).toEqual([
      { service_id: "s2", nombre: 2 },
      { service_id: "s1", nombre: 1 },
    ]);
  });

  it("calcule une variation", () => {
    expect(variationPourcentage(52, 39)).toBe(33);
    expect(variationPourcentage(30, 0)).toBeNull();
  });
});

describe("repartirEnVoies", () => {
  it("place côte à côte les rendez-vous simultanés", () => {
    const voies = repartirEnVoies([
      rdv("a", "2026-11-10T09:00:00Z", 45, "confirme"),
      rdv("b", "2026-11-10T09:00:00Z", 30, "confirme"),
      rdv("c", "2026-11-10T09:30:00Z", 30, "confirme"),
      rdv("d", "2026-11-10T11:00:00Z", 30, "confirme"),
    ]);
    expect(voies.get("a")).toEqual({ voie: 0, total: 2 });
    expect(voies.get("b")).toEqual({ voie: 1, total: 2 });
    // c réutilise la voie libérée par b à 09:30
    expect(voies.get("c")).toEqual({ voie: 1, total: 2 });
    // d ne chevauche personne : pleine largeur
    expect(voies.get("d")).toEqual({ voie: 0, total: 1 });
  });
});
