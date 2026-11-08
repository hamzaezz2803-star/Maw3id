"use client";

import Image from "next/image";
import { useActionState } from "react";
import { confirmerActivation, demarrerActivation, type EtatDemarrage } from "@/actions/double-authentification";
import { Bouton } from "@/components/ui/Bouton";
import { ChampTexte } from "@/components/ui/ChampTexte";
import { MessageErreur } from "@/components/ui/MessageErreur";
import { useTraductions } from "@/i18n/FournisseurTraductions";

const TAILLE_QR_PIXELS = 208;

/**
 * Activation en deux temps : mot de passe, puis QR code, codes de secours et
 * premier code. Une confirmation réussie redirige vers l'application.
 */
export function AssistantActivation() {
  const { langue, t } = useTraductions();
  const textes = t.doubleAuthentification;
  const [demarrage, demarrer, demarrageEnCours] = useActionState(demarrerActivation, {});
  const [confirmation, confirmer, confirmationEnCours] = useActionState(confirmerActivation, {});

  if (!demarrage.qr) {
    return (
      <form action={demarrer} noValidate className="flex flex-col gap-5">
        <input type="hidden" name="langue" value={langue} />
        <p className="text-body text-fg-secondary">{textes.activation.introduction}</p>
        {demarrage.erreur && <MessageErreur>{textes.erreurs[demarrage.erreur]}</MessageErreur>}
        <ChampTexte
          name="mot_de_passe"
          type="password"
          autoComplete="current-password"
          libelle={textes.activation.etapeMotDePasse}
          required
        />
        <Bouton type="submit" enCours={demarrageEnCours} className="w-full">
          {textes.activation.continuer}
        </Bouton>
      </form>
    );
  }

  return (
    <form action={confirmer} noValidate className="flex flex-col gap-6">
      <input type="hidden" name="langue" value={langue} />
      <EtapeScanner demarrage={demarrage} />
      <CodesSecours codes={demarrage.codesSecours ?? []} />
      {confirmation.erreur && <MessageErreur>{textes.erreurs[confirmation.erreur]}</MessageErreur>}
      <ChampTexte
        name="code"
        libelle={textes.activation.etapeCode}
        inputMode="numeric"
        autoComplete="one-time-code"
        dir="ltr"
        className="text-center font-mono tracking-widest"
        required
      />
      <Bouton type="submit" enCours={confirmationEnCours} className="w-full">
        {textes.activation.activer}
      </Bouton>
    </form>
  );
}

function EtapeScanner({ demarrage }: { demarrage: EtatDemarrage }) {
  const { t } = useTraductions();
  const textes = t.doubleAuthentification.activation;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-body text-fg-secondary">{textes.etapeScanner}</p>
      {demarrage.qr && (
        <Image
          src={demarrage.qr}
          alt={textes.texteQr}
          width={TAILLE_QR_PIXELS}
          height={TAILLE_QR_PIXELS}
          unoptimized
          className="rounded-control border border-border"
        />
      )}
      {demarrage.cle && (
        <div className="flex flex-col gap-1">
          <p className="text-helper text-fg-secondary">{textes.cleManuelle}</p>
          <code dir="ltr" className="select-all rounded-control bg-secondary px-3 py-2 font-mono text-label text-fg">
            {demarrage.cle}
          </code>
        </div>
      )}
    </div>
  );
}

function CodesSecours({ codes }: { codes: string[] }) {
  const { t } = useTraductions();
  const textes = t.doubleAuthentification.activation;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-label text-fg">{textes.codesSecoursTitre}</h2>
      <p className="text-helper text-fg-secondary">{textes.codesSecoursAide}</p>
      <ul dir="ltr" className="grid select-all grid-cols-2 gap-2 rounded-control bg-secondary p-3 font-mono text-label text-fg">
        {codes.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    </div>
  );
}
