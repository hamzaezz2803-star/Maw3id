"use client";

import Link from "next/link";
import { useActionState } from "react";
import { creerUtilisateur, type EtatFormulaire } from "@/actions/plateforme";
import { Bouton, classesBouton } from "@/components/ui/Bouton";
import { ChampTexte } from "@/components/ui/ChampTexte";
import { ListeDeroulante, type OptionListe } from "@/components/ui/ListeDeroulante";
import { MessageErreur } from "@/components/ui/MessageErreur";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { ROLES_ORGANISATION } from "@/lib/auth/droits";
import { cheminLocalise } from "@/lib/navigation";
import { traduireErreurChamp } from "@/lib/validation/traduction";
import { SectionFormulaire } from "./SectionFormulaire";

const ETAT_INITIAL: EtatFormulaire = {};

export function FormulaireUtilisateur({ organisations }: { organisations: OptionListe[] }) {
  const { langue, t } = useTraductions();
  const textes = t.plateforme.utilisateurs.formulaire;
  const [etat, action, enCours] = useActionState(creerUtilisateur, ETAT_INITIAL);
  const erreur = (champ: string) => traduireErreurChamp(t, etat.erreursChamps?.[champ]);
  const valeur = (champ: string) => etat.valeurs?.[champ];
  const roles = ROLES_ORGANISATION.map((role) => ({ valeur: role, libelle: t.roles[role] }));

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      <input type="hidden" name="langue" value={langue} />
      {etat.erreur && <MessageErreur>{t.validation[etat.erreur]}</MessageErreur>}

      <SectionFormulaire titre={textes.titre} description={textes.description}>
        <ChampTexte name="nom_complet" libelle={textes.nomComplet} autoComplete="off" defaultValue={valeur("nom_complet")} erreur={erreur("nom_complet")} required />
        <ChampTexte name="email" type="email" libelle={textes.email} autoComplete="off" defaultValue={valeur("email")} erreur={erreur("email")} required />
        <ChampTexte name="fonction" libelle={textes.fonction} placeholder={textes.fonctionExemple} defaultValue={valeur("fonction")} erreur={erreur("fonction")} />
        <ChampTexte
          name="mot_de_passe"
          type="password"
          libelle={textes.motDePasse}
          autoComplete="new-password"
          aide={textes.aideMotDePasse}
          erreur={erreur("mot_de_passe")}
          required
        />
        <ListeDeroulante
          name="organisation_id"
          libelle={textes.organisation}
          texteIndicatif={textes.choisirOrganisation}
          options={organisations}
          defaultValue={valeur("organisation_id") ?? ""}
          aide={organisations.length === 0 ? textes.aucuneOrganisation : undefined}
          erreur={erreur("organisation_id")}
          required
        />
        <ListeDeroulante name="role" libelle={textes.role} texteIndicatif={textes.choisirRole} options={roles} defaultValue={valeur("role") ?? ""} erreur={erreur("role")} required />
      </SectionFormulaire>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link href={cheminLocalise("/plateforme/utilisateurs", langue)} className={classesBouton({ variante: "contour" })}>
          {t.plateforme.annuler}
        </Link>
        <Bouton type="submit" enCours={enCours} disabled={organisations.length === 0}>{textes.creer}</Bouton>
      </div>
    </form>
  );
}
