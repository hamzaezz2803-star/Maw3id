"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import QRCode from "qrcode";
import {
  extraireCleSecrete,
  grouperParQuatre,
  reconnaitreCode,
  traduireErreurCode,
  type CleErreurCode,
} from "@/lib/auth/double-authentification";
import { exigerContexteSession } from "@/lib/donnees/session";
import { auth } from "@/lib/serveur/auth";
import { extraireLangue } from "@/lib/serveur/formulaire";

export type CleErreurDoubleAuthentification = CleErreurCode | "code_format";

const TAILLE_QR_PIXELS = 208;

export interface EtatDemarrage {
  erreur?: CleErreurDoubleAuthentification;
  /** QR code (image en data URL), clé à saisir à la main et codes de secours, affichés une seule fois. */
  qr?: string;
  cle?: string;
  codesSecours?: string[];
}

/** Étape 1 : vérifie le mot de passe et prépare l'application d'authentification. */
export async function demarrerActivation(_etat: EtatDemarrage, formulaire: FormData): Promise<EtatDemarrage> {
  await exigerContexteSession({ avantDoubleAuthentification: true, langue: extraireLangue(formulaire) });
  const motDePasse = String(formulaire.get("mot_de_passe") ?? "");
  if (!motDePasse) return { erreur: "mot_de_passe_incorrect" };

  try {
    const resultat = await auth.api.enableTwoFactor({
      body: { password: motDePasse, method: "totp" },
      headers: await headers(),
    });
    if (resultat.method !== "totp") return { erreur: "erreur_serveur" };
    const cle = extraireCleSecrete(resultat.totpURI);
    return {
      qr: await QRCode.toDataURL(resultat.totpURI, { margin: 1, width: TAILLE_QR_PIXELS }),
      cle: cle ? grouperParQuatre(cle) : undefined,
      codesSecours: resultat.backupCodes,
    };
  } catch (erreur) {
    return { erreur: traduireErreurCode(erreur) };
  }
}

export interface EtatConfirmation {
  erreur?: CleErreurDoubleAuthentification;
}

/** Étape 2 : le premier code de l'application confirme l'activation, puis ouvre l'application. */
export async function confirmerActivation(_etat: EtatConfirmation, formulaire: FormData): Promise<EtatConfirmation> {
  const langue = extraireLangue(formulaire);
  await exigerContexteSession({ avantDoubleAuthentification: true, langue });
  const saisie = reconnaitreCode(String(formulaire.get("code") ?? ""));
  if (saisie?.type !== "application") return { erreur: "code_format" };

  try {
    await auth.api.verifyTOTP({ body: { code: saisie.code }, headers: await headers() });
  } catch (erreur) {
    return { erreur: traduireErreurCode(erreur) };
  }

  redirect(`/${langue}`);
}

/** À la connexion : vérifie le code de l'application ou un code de secours, puis ouvre la session. */
export async function verifierCodeConnexion(
  _etat: { erreur?: CleErreurDoubleAuthentification },
  formulaire: FormData,
): Promise<{ erreur?: CleErreurDoubleAuthentification }> {
  const langue = extraireLangue(formulaire);
  const saisie = reconnaitreCode(String(formulaire.get("code") ?? ""));
  if (!saisie) return { erreur: "code_format" };

  try {
    const options = { body: { code: saisie.code }, headers: await headers() };
    if (saisie.type === "application") await auth.api.verifyTOTP(options);
    else await auth.api.verifyBackupCode(options);
  } catch (erreur) {
    return { erreur: traduireErreurCode(erreur) };
  }

  redirect(`/${langue}`);
}
