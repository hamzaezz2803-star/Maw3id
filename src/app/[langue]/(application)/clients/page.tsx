import { UserPlus } from "lucide-react";
import { MentionDemonstration } from "@/components/activite/Statuts";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { genererMetadonneesModule } from "@/components/mise-en-page/metadonnees";
import { Avatar } from "@/components/ui/Avatar";
import { Bouton } from "@/components/ui/Bouton";
import { Carte } from "@/components/ui/Carte";
import { ChampRecherche } from "@/components/ui/ChampRecherche";
import { CelluleEntete, CelluleTableau, CorpsTableau, EnteteTableau, LigneTableau, Tableau } from "@/components/ui/Tableau";
import { obtenirTraductions } from "@/i18n/serveur";
import { listerClients } from "@/lib/donnees/demonstration";
import { exigerAccesModule } from "@/lib/donnees/session";
import { formaterJourCourt, formaterTelephone } from "@/lib/formatage";

export function generateMetadata() {
  return genererMetadonneesModule("clients");
}

export default async function PageClients() {
  const [{ langue, t }, , clients] = await Promise.all([obtenirTraductions(), exigerAccesModule("clients"), listerClients()]);
  const textes = t.clients;

  return (
    <ConteneurPage
      titre={t.navigation.libelles.clients}
      description={textes.description}
      actions={<Bouton><UserPlus aria-hidden="true" />{textes.nouveau}</Bouton>}
      mention={<MentionDemonstration t={t} />}
    >
      <ChampRecherche libelle={textes.rechercher} placeholder={textes.rechercherExemple} classeConteneur="max-w-md" />
      <Carte className="overflow-hidden">
        <Tableau>
          <EnteteTableau>
            <LigneTableau>
              {(["nom", "telephone", "email", "rendezVous", "dernier"] as const).map((colonne) => (
                <CelluleEntete key={colonne}>{textes.colonnes[colonne]}</CelluleEntete>
              ))}
            </LigneTableau>
          </EnteteTableau>
          <CorpsTableau>
            {clients.map((client) => (
              <LigneTableau key={client.id}>
                <CelluleTableau>
                  <span className="flex items-center gap-3 whitespace-nowrap font-medium">
                    <Avatar nom={client.nom_complet} taille="petit" />
                    {client.nom_complet}
                  </span>
                </CelluleTableau>
                <CelluleTableau dir="ltr" className="whitespace-nowrap text-start tabular-nums">{formaterTelephone(client.telephone)}</CelluleTableau>
                <CelluleTableau className="whitespace-nowrap">
                  {client.email ? <span dir="ltr">{client.email}</span> : <span className="text-fg-muted">{textes.nonRenseigne}</span>}
                </CelluleTableau>
                <CelluleTableau className="tabular-nums">{client.nombre_rendez_vous}</CelluleTableau>
                <CelluleTableau className="whitespace-nowrap text-fg-secondary">
                  {client.dernier_rendez_vous_le ? formaterJourCourt(client.dernier_rendez_vous_le, langue) : "-"}
                </CelluleTableau>
              </LigneTableau>
            ))}
          </CorpsTableau>
        </Tableau>
      </Carte>
    </ConteneurPage>
  );
}
