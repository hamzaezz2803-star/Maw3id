import { describe, expect, it } from "vitest";
import { exigeDoubleAuthentification, extraireCleSecrete, grouperParQuatre, reconnaitreCode } from "./double-authentification";

describe("exigeDoubleAuthentification", () => {
  it("est obligatoire pour les administrateurs uniquement", () => {
    expect(exigeDoubleAuthentification("administrateur_plateforme")).toBe(true);
    expect(exigeDoubleAuthentification("administrateur")).toBe(true);
    expect(exigeDoubleAuthentification("secretaire")).toBe(false);
    expect(exigeDoubleAuthentification("collaborateur")).toBe(false);
  });
});

describe("reconnaitreCode", () => {
  it("reconnaît un code d'application, espaces compris", () => {
    expect(reconnaitreCode("123 456")).toEqual({ type: "application", code: "123456" });
  });

  it("reconnaît un code de secours", () => {
    expect(reconnaitreCode(" aB3dE-9xYz1 ")).toEqual({ type: "secours", code: "aB3dE-9xYz1" });
  });

  it("refuse les autres saisies", () => {
    expect(reconnaitreCode("12345")).toBeNull();
    expect(reconnaitreCode("1234567")).toBeNull();
    expect(reconnaitreCode("abcde")).toBeNull();
    expect(reconnaitreCode("")).toBeNull();
  });
});

describe("clé secrète", () => {
  it("extrait la clé d'une adresse otpauth", () => {
    expect(extraireCleSecrete("otpauth://totp/Maw%C3%AEid:salma?secret=JBSWY3DPEHPK3PXP&issuer=Maw%C3%AEid")).toBe("JBSWY3DPEHPK3PXP");
    expect(extraireCleSecrete("pas une adresse")).toBeNull();
  });

  it("groupe la clé par quatre caractères", () => {
    expect(grouperParQuatre("JBSWY3DPEHPK3PXP")).toBe("JBSW Y3DP EHPK 3PXP");
  });
});
