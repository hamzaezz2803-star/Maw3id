import { describe, expect, it } from "vitest";
import { genererIdentifiantUrl } from "@/lib/texte";
import { determinerRole } from "@/lib/auth/role";
import {
  schemaConnexion,
  schemaNouvelleOrganisation,
  schemaNouvelUtilisateur,
  validerFormulaire,
} from "./schemas";

function formulaire(valeurs: Record<string, string>): FormData {
  const donnees = new FormData();
  for (const [cle, valeur] of Object.entries(valeurs)) donnees.set(cle, valeur);
  return donnees;
}

describe("schemaConnexion", () => {
  it("met l'e-mail en minuscules", () => {
    const resultat = validerFormulaire(schemaConnexion, formulaire({ email: " Salma@Example.COM ", mot_de_passe: "x" }));
    expect(resultat).toEqual({ ok: true, donnees: { email: "salma@example.com", mot_de_passe: "x" } });
  });

  it("signale les champs vides et l'e-mail invalide", () => {
    expect(validerFormulaire(schemaConnexion, formulaire({ email: "", mot_de_passe: "" }))).toEqual({
      ok: false,
      erreurs: { email: "requis", mot_de_passe: "requis" },
    });
    const invalide = validerFormulaire(schemaConnexion, formulaire({ email: "pas-un-email", mot_de_passe: "x" }));
    expect(invalide.ok === false && invalide.erreurs.email).toBe("email_invalide");
  });
});

describe("schemaNouvelleOrganisation", () => {
  const valide = {
    nom: "Cabinet Dentaire Nour",
    type: "cabinet_dentaire",
    ville: "Rabat",
    admin_nom: "Nour Benali",
    admin_email: "nour@example.com",
    admin_mot_de_passe: "un-mot-de-passe-long",
  };

  it("accepte une organisation complète", () => {
    expect(validerFormulaire(schemaNouvelleOrganisation, formulaire(valide)).ok).toBe(true);
  });

  it("refuse un type inconnu et un mot de passe trop court", () => {
    const resultat = validerFormulaire(
      schemaNouvelleOrganisation,
      formulaire({ ...valide, type: "boulangerie", admin_mot_de_passe: "court" }),
    );
    expect(resultat).toEqual({ ok: false, erreurs: { type: "type_invalide", admin_mot_de_passe: "mot_de_passe_court" } });
  });
});

describe("schemaNouvelUtilisateur", () => {
  it("refuse un rôle hors organisation, dont Administrateur plateforme", () => {
    const resultat = validerFormulaire(
      schemaNouvelUtilisateur,
      formulaire({
        nom_complet: "Karim Berrada",
        email: "karim@example.com",
        mot_de_passe: "un-mot-de-passe-long",
        organisation_id: "7c1e2a4b-3f5d-4e8a-9b2c-1d0e6f7a8b90",
        role: "administrateur_plateforme",
      }),
    );
    expect(resultat).toEqual({ ok: false, erreurs: { role: "role_invalide" } });
  });
});

describe("determinerRole", () => {
  it("donne la priorité au rôle plateforme", () => {
    expect(determinerRole("administrateur_plateforme", "secretaire")).toBe("administrateur_plateforme");
  });

  it("utilise le rôle dans l'organisation sinon", () => {
    expect(determinerRole("utilisateur", "secretaire")).toBe("secretaire");
  });

  it("refuse un utilisateur sans organisation ni rôle connu", () => {
    expect(determinerRole("utilisateur", undefined)).toBeNull();
    expect(determinerRole(null, "proprietaire")).toBeNull();
  });
});

describe("genererIdentifiantUrl", () => {
  it("retire accents et caractères spéciaux", () => {
    expect(genererIdentifiantUrl("Bennani Avocats Associés !", "a1b2c3")).toBe("bennani-avocats-associes-a1b2c3");
  });

  it("garde seulement le suffixe si le nom n'a aucun caractère latin", () => {
    expect(genererIdentifiantUrl("عيادة النور", "a1b2c3")).toBe("a1b2c3");
  });
});
