"use client";

import Link from "next/link";
import { useActionState } from "react";
import { creerOrganisation, type EtatFormulaire } from "@/actions/plateforme";
import { Bouton, classesBouton } from "@/components/ui/Bouton";
import { ChampTexte } from "@/components/ui/ChampTexte";
import { ListeDeroulante } from "@/components/ui/ListeDeroulante";
import { MessageErreur } from "@/components/ui/MessageErreur";
import { useTraductions } from "@/i18n/FournisseurTraductions";
import { cheminLocalise } from "@/lib/navigation";
import { TYPES_ORGANISATION } from "@/lib/validation/schemas";
import { traduireErreurChamp } from "@/lib/validation/traduction";
import { SectionFormulaire } from "./SectionFormulaire";

const ETAT_INITIAL: EtatFormulaire = {};

export function FormulaireOrganisation() {
  const { langue, t } = useTraductions();
  const textes = t.plateforme.organisations.formulaire;
  const [etat, action, enCours] = useActionState(creerOrganisation, ETAT_INITIAL);
  const erreur = (champ: string) => traduireErreurChamp(t, etat.erreursChamps?.[champ]);
  const valeur = (champ: string) => etat.valeurs?.[champ];
  const types = TYPES_ORGANISATION.map((type) => ({ valeur: type, libelle: t.typesOrganisation[type] }));

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      <input type="hidden" name="langue" value={langue} />
      {etat.erreur && <MessageErreur>{t.validation[etat.erreur]}</MessageErreur>}

      <SectionFormulaire titre={textes.sectionOrganisation}>
        <ChampTexte name="nom" libelle={textes.nom} defaultValue={valeur("nom")} erreur={erreur("nom")} required classeConteneur="sm:col-span-2" />
        <ListeDeroulante name="type" libelle={textes.type} texteIndicatif={textes.choisirType} options={types} defaultValue={valeur("type") ?? ""} erreur={erreur("type")} required />
        <ChampTexte name="ville" libelle={textes.ville} defaultValue={valeur("ville")} erreur={erreur("ville")} required />
      </SectionFormulaire>

      <SectionFormulaire titre={textes.sectionAdministrateur} description={textes.aideAdministrateur}>
        <ChampTexte name="admin_nom" libelle={textes.nomComplet} autoComplete="off" defaultValue={valeur("admin_nom")} erreur={erreur("admin_nom")} required />
        <ChampTexte name="admin_email" type="email" libelle={textes.email} autoComplete="off" defaultValue={valeur("admin_email")} erreur={erreur("admin_email")} required />
        <ChampTexte
          name="admin_mot_de_passe"
          type="password"
          libelle={textes.motDePasse}
          autoComplete="new-password"
          aide={textes.aideMotDePasse}
          erreur={erreur("admin_mot_de_passe")}
          required
          classeConteneur="sm:col-span-2"
        />
      </SectionFormulaire>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link href={cheminLocalise("/plateforme/organisations", langue)} className={classesBouton({ variante: "contour" })}>
          {t.plateforme.annuler}
        </Link>
        <Bouton type="submit" enCours={enCours}>{textes.creer}</Bouton>
      </div>
    </form>
  );
}
