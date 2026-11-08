import { Plus, Settings } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Bouton } from "@/components/ui/Bouton";
import { CaseACocher } from "@/components/ui/CaseACocher";
import { ChampRecherche } from "@/components/ui/ChampRecherche";
import { ChampTexte } from "@/components/ui/ChampTexte";
import { ListeDeroulante } from "@/components/ui/ListeDeroulante";
import { ZoneTexte } from "@/components/ui/ZoneTexte";
import { SERVICES_DEMONSTRATION } from "@/donnees-fictives/demonstration";
import type { Dictionnaire } from "@/i18n/dictionnaires";
import { SectionDemonstration } from "./SectionDemonstration";

type Textes = Dictionnaire["systemeDesign"];

export function ExemplesBoutons({ textes }: { textes: Textes["boutons"] }) {
  return (
    <SectionDemonstration titre={textes.titre} description={textes.description}>
      <div className="flex flex-wrap items-center gap-3">
        <Bouton><Plus aria-hidden="true" />{textes.nouveauRendezVous}</Bouton>
        <Bouton variante="secondaire">{textes.secondaire}</Bouton>
        <Bouton variante="contour">{textes.contour}</Bouton>
        <Bouton variante="fantome">{textes.fantome}</Bouton>
        <Bouton variante="danger">{textes.supprimer}</Bouton>
        <Bouton variante="contour" enCours>{textes.enregistrement}</Bouton>
        <Bouton variante="contour" disabled>{textes.desactive}</Bouton>
        <Bouton variante="contour" taille="icone" aria-label={textes.parametres}><Settings aria-hidden="true" /></Bouton>
      </div>
    </SectionDemonstration>
  );
}

export function ExemplesFormulaires({ textes }: { textes: Textes["formulaires"] }) {
  return (
    <SectionDemonstration titre={textes.titre}>
      <div className="grid gap-5 md:grid-cols-2">
        <ChampTexte libelle={textes.nomClient} placeholder={textes.nomClientExemple} required />
        <ChampTexte libelle={textes.email} type="email" defaultValue="client@example" erreur={textes.emailInvalide} />
        <ListeDeroulante libelle={textes.service} texteIndicatif={textes.choisirService} options={SERVICES_DEMONSTRATION} aide={textes.servicesActifs} />
        <ChampRecherche libelle={textes.rechercherClients} placeholder={textes.rechercherClientsExemple} classeConteneur="self-end" />
        <ZoneTexte libelle={textes.noteInterne} placeholder={textes.noteInterneExemple} classeConteneur="md:col-span-2" />
        <CaseACocher libelle={textes.envoyerConfirmation} description={textes.envoyerConfirmationDescription} defaultChecked />
        <CaseACocher libelle={textes.optionIndisponible} disabled />
      </div>
    </SectionDemonstration>
  );
}

export function ExemplesBadges({ textes, statuts }: { textes: Textes["badges"]; statuts: Dictionnaire["statutsRendezVous"] }) {
  return (
    <SectionDemonstration titre={textes.titre} description={textes.description}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          <Badge>{textes.neutre}</Badge>
          <Badge variante="primaire">{textes.primaire}</Badge>
          <Badge variante="succes" avecPoint>{statuts.confirme}</Badge>
          <Badge variante="attention" avecPoint>{statuts.en_attente}</Badge>
          <Badge variante="danger" avecPoint>{statuts.annule}</Badge>
          <Badge variante="info" avecPoint>{textes.information}</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Avatar nom="Salma Idrissi" taille="petit" />
          <Avatar nom="Karim Berrada" />
          <Avatar nom="Imane Tazi" taille="grand" />
          <Avatar nom="Atlas Conseil" forme="carre" taille="grand" />
        </div>
      </div>
    </SectionDemonstration>
  );
}
