import { CircleHelp, Plus, Settings, Users } from "lucide-react";
import { Badge, type VarianteBadge } from "@/components/ui/Badge";
import { Bouton } from "@/components/ui/Bouton";
import { Carte, ContenuCarte, DescriptionCarte, EnteteCarte, PiedCarte, TitreCarte } from "@/components/ui/Carte";
import { EtatChargement, Squelette } from "@/components/ui/EtatChargement";
import { EtatVide } from "@/components/ui/EtatVide";
import { InfoBulle } from "@/components/ui/InfoBulle";
import { ElementMenu, MenuDeroulant, SeparateurMenu } from "@/components/ui/MenuDeroulant";
import { CelluleEntete, CelluleTableau, CorpsTableau, EnteteTableau, LegendeTableau, LigneTableau, Tableau } from "@/components/ui/Tableau";
import { RENDEZ_VOUS_DEMONSTRATION } from "@/donnees-fictives/demonstration";
import type { Dictionnaire } from "@/i18n/dictionnaires";
import { formaterDateHeure } from "@/lib/formatage";
import { cheminLocalise } from "@/lib/navigation";
import type { Langue, StatutRendezVous } from "@/types";
import { DemonstrationModale, DemonstrationPagination } from "./DemonstrationsInteractives";
import { SectionDemonstration } from "./SectionDemonstration";

const VARIANTE_STATUT: Record<StatutRendezVous, VarianteBadge> = {
  confirme: "succes",
  en_attente: "attention",
  annule: "danger",
};

export function ExemplesSuperpositions({ t, langue }: { t: Dictionnaire; langue: Langue }) {
  const textes = t.systemeDesign.superpositions;
  return (
    <SectionDemonstration titre={textes.titre} description={textes.description}>
      <div className="flex flex-wrap items-center gap-3">
        <DemonstrationModale />
        <MenuDeroulant
          alignement="debut"
          declencheur={textes.ouvrirMenu}
          classeDeclencheur="inline-flex h-11 items-center rounded-control border border-border-strong bg-surface px-4 text-label hover:bg-surface-muted sm:h-10"
        >
          <ElementMenu lien={cheminLocalise("/clients", langue)}><Users aria-hidden="true" />{textes.voirClients}</ElementMenu>
          <ElementMenu lien={cheminLocalise("/parametres", langue)}><Settings aria-hidden="true" />{t.navigation.libelles.parametres}</ElementMenu>
          <SeparateurMenu />
          <ElementMenu ton="danger">{textes.retirer}</ElementMenu>
        </MenuDeroulant>
        <InfoBulle contenu={textes.aideInfoBulle}>
          <Bouton variante="fantome" taille="icone" aria-label={textes.aide}><CircleHelp aria-hidden="true" /></Bouton>
        </InfoBulle>
      </div>
    </SectionDemonstration>
  );
}

export function ExemplesCartes({ t }: { t: Dictionnaire }) {
  const { carte, chargement } = t.systemeDesign;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Carte>
        <EnteteCarte>
          <TitreCarte>{carte.titre}</TitreCarte>
          <DescriptionCarte>{carte.description}</DescriptionCarte>
        </EnteteCarte>
        <ContenuCarte><p className="text-body text-fg-secondary">{carte.contenu}</p></ContenuCarte>
        <PiedCarte>
          <Bouton variante="fantome" taille="petit">{carte.annuler}</Bouton>
          <Bouton variante="secondaire" taille="petit">{carte.confirmer}</Bouton>
        </PiedCarte>
      </Carte>
      <Carte>
        <EnteteCarte><TitreCarte>{chargement.titre}</TitreCarte></EnteteCarte>
        <ContenuCarte className="flex flex-col gap-3">
          <Squelette className="h-4 w-2/3" />
          <Squelette className="h-4 w-full" />
          <EtatChargement libelle={chargement.rendezVous} className="py-4" />
        </ContenuCarte>
      </Carte>
    </div>
  );
}

export function ExempleTableau({ t, langue }: { t: Dictionnaire; langue: Langue }) {
  const textes = t.systemeDesign.tableau;
  return (
    <SectionDemonstration titre={textes.titre}>
      <div className="flex flex-col gap-4">
        <div className="overflow-hidden rounded-control border border-border">
          <Tableau>
            <LegendeTableau>{textes.legende}</LegendeTableau>
            <EnteteTableau>
              <LigneTableau>
                {[textes.client, textes.service, textes.collaborateur, textes.date, textes.statut].map((colonne) => (
                  <CelluleEntete key={colonne}>{colonne}</CelluleEntete>
                ))}
              </LigneTableau>
            </EnteteTableau>
            <CorpsTableau>
              {RENDEZ_VOUS_DEMONSTRATION.map((ligne) => (
                <LigneTableau key={ligne.id}>
                  <CelluleTableau className="whitespace-nowrap font-medium">{ligne.client_nom}</CelluleTableau>
                  <CelluleTableau className="whitespace-nowrap">{ligne.service_nom}</CelluleTableau>
                  <CelluleTableau className="whitespace-nowrap">{ligne.collaborateur_nom}</CelluleTableau>
                  <CelluleTableau className="whitespace-nowrap">{formaterDateHeure(ligne.debut_le, langue)}</CelluleTableau>
                  <CelluleTableau>
                    <Badge variante={VARIANTE_STATUT[ligne.statut]} avecPoint>{t.statutsRendezVous[ligne.statut]}</Badge>
                  </CelluleTableau>
                </LigneTableau>
              ))}
            </CorpsTableau>
          </Tableau>
        </div>
        <DemonstrationPagination />
      </div>
    </SectionDemonstration>
  );
}

export function ExempleEtatVide({ textes }: { textes: Dictionnaire["systemeDesign"]["vide"] }) {
  return (
    <SectionDemonstration titre={textes.titre}>
      <EtatVide
        titre={textes.aucunClient}
        description={textes.aucunClientDescription}
        action={<Bouton variante="contour"><Plus aria-hidden="true" />{textes.ajouterClient}</Bouton>}
        className="py-6"
      />
    </SectionDemonstration>
  );
}
