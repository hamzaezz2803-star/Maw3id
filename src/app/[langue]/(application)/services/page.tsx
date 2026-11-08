import { Globe, Plus } from "lucide-react";
import { MentionDemonstration } from "@/components/activite/Statuts";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { genererMetadonneesModule } from "@/components/mise-en-page/metadonnees";
import { Badge } from "@/components/ui/Badge";
import { Bouton } from "@/components/ui/Bouton";
import { Carte } from "@/components/ui/Carte";
import { CelluleEntete, CelluleTableau, CorpsTableau, EnteteTableau, LigneTableau, Tableau } from "@/components/ui/Tableau";
import { obtenirTraductions } from "@/i18n/serveur";
import { listerServices } from "@/lib/donnees/demonstration";
import { exigerAccesModule } from "@/lib/donnees/session";
import { formaterDuree, formaterMontant } from "@/lib/formatage";

export function generateMetadata() {
  return genererMetadonneesModule("services");
}

export default async function PageServices() {
  const [{ langue, t }, , services] = await Promise.all([obtenirTraductions(), exigerAccesModule("services"), listerServices()]);
  const textes = t.services;

  return (
    <ConteneurPage
      titre={t.navigation.libelles.services}
      description={textes.description}
      actions={<Bouton><Plus aria-hidden="true" />{textes.nouveau}</Bouton>}
      mention={<MentionDemonstration t={t} />}
    >
      <Carte className="overflow-hidden">
        <Tableau>
          <EnteteTableau>
            <LigneTableau>
              {(["nom", "categorie", "duree", "prix", "semaine", "statut"] as const).map((colonne) => (
                <CelluleEntete key={colonne} className={colonne === "prix" ? "text-end" : undefined}>{textes.colonnes[colonne]}</CelluleEntete>
              ))}
            </LigneTableau>
          </EnteteTableau>
          <CorpsTableau>
            {services.map((service) => (
              <LigneTableau key={service.id} className={service.est_actif ? undefined : "text-fg-muted"}>
                <CelluleTableau className="whitespace-nowrap font-medium">{service.nom}</CelluleTableau>
                <CelluleTableau className="whitespace-nowrap text-fg-secondary">{service.categorie}</CelluleTableau>
                <CelluleTableau className="whitespace-nowrap tabular-nums">{formaterDuree(service.duree_minutes, t.apercu.unites)}</CelluleTableau>
                <CelluleTableau className="whitespace-nowrap text-end tabular-nums">{formaterMontant(service.prix_mad, langue)}</CelluleTableau>
                <CelluleTableau className="tabular-nums">{service.nombre_semaine}</CelluleTableau>
                <CelluleTableau>
                  <span className="flex flex-wrap gap-1.5">
                    <Badge variante={service.est_actif ? "succes" : "neutre"} avecPoint>{service.est_actif ? textes.actif : textes.inactif}</Badge>
                    {service.est_actif && service.est_reservable_en_ligne && (
                      <Badge variante="info"><Globe aria-hidden="true" />{textes.enLigne}</Badge>
                    )}
                  </span>
                </CelluleTableau>
              </LigneTableau>
            ))}
          </CorpsTableau>
        </Tableau>
      </Carte>
    </ConteneurPage>
  );
}
