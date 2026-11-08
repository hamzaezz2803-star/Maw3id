import { ClassementBarres, GraphiqueBarres } from "@/components/activite/Graphiques";
import { BadgeStatutRendezVous, MentionDemonstration } from "@/components/activite/Statuts";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { genererMetadonneesModule } from "@/components/mise-en-page/metadonnees";
import { Carte, ContenuCarte, DescriptionCarte, EnteteCarte, TitreCarte } from "@/components/ui/Carte";
import { obtenirTraductions } from "@/i18n/serveur";
import { obtenirRapports } from "@/lib/donnees/demonstration";
import { exigerAccesModule } from "@/lib/donnees/session";
import { formaterJourCourt, formaterPourcentage, formaterTexte } from "@/lib/formatage";
import type { StatutRendezVousComplet } from "@/types";

export function generateMetadata() {
  return genererMetadonneesModule("rapports");
}

const ORDRE_STATUTS: StatutRendezVousComplet[] = ["confirme", "en_attente", "termine", "annule", "absent"];

export default async function PageRapports() {
  const [{ langue, t }, , rapports] = await Promise.all([obtenirTraductions(), exigerAccesModule("rapports"), obtenirRapports()]);
  const textes = t.rapports;
  const derniere = rapports.semaines.length - 1;

  const pointsSemaines = rapports.semaines.map((semaine, index) => {
    const date = formaterJourCourt(`${semaine.semaine_du}T12:00:00Z`, langue).split(" ").slice(1).join(" ");
    return {
      cle: semaine.semaine_du,
      etiquette: date,
      description: `${formaterTexte(textes.semaineDu, { date })} : ${formaterTexte(textes.valeur, { nombre: semaine.nombre })}`,
      valeur: semaine.nombre,
      partiel: index === derniere,
    };
  });

  const pointsServices = rapports.services.map((service) => ({
    cle: service.service_id,
    etiquette: service.nom,
    description: service.nom,
    valeur: service.nombre,
  }));

  return (
    <ConteneurPage titre={t.navigation.libelles.rapports} description={textes.description} mention={<MentionDemonstration t={t} />}>
      <Carte>
        <EnteteCarte>
          <TitreCarte className="text-section-title">{textes.parSemaine}</TitreCarte>
          <DescriptionCarte>{textes.parSemaineDescription}</DescriptionCarte>
        </EnteteCarte>
        <ContenuCarte className="pt-10">
          <GraphiqueBarres points={pointsSemaines} titreTableau={textes.parSemaine} enTeteValeur={t.navigation.libelles["rendez-vous"]} />
        </ContenuCarte>
      </Carte>

      <div className="grid gap-6 lg:grid-cols-2">
        <Carte>
          <EnteteCarte><TitreCarte className="text-section-title">{textes.services}</TitreCarte></EnteteCarte>
          <ContenuCarte>
            <ClassementBarres points={pointsServices} titreTableau={textes.services} enTeteValeur={t.navigation.libelles["rendez-vous"]} />
          </ContenuCarte>
        </Carte>
        <Carte>
          <EnteteCarte><TitreCarte className="text-section-title">{textes.statuts}</TitreCarte></EnteteCarte>
          <ContenuCarte>
            <ul className="flex flex-col divide-y divide-border">
              {ORDRE_STATUTS.map((statut) => (
                <li key={statut} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <BadgeStatutRendezVous statut={statut} t={t} />
                  <span className="text-label tabular-nums text-fg">
                    {rapports.statuts[statut]}
                    <span className="ms-2 text-fg-muted">{formaterPourcentage(Math.round((rapports.statuts[statut] / rapports.total) * 100), langue)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </ContenuCarte>
        </Carte>
      </div>
    </ConteneurPage>
  );
}
