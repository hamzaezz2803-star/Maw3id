import { CircleCheck, Clock, Link2, ShieldCheck, Undo2 } from "lucide-react";
import { MentionDemonstration } from "@/components/activite/Statuts";
import { ConteneurPage } from "@/components/mise-en-page/ConteneurPage";
import { genererMetadonneesModule } from "@/components/mise-en-page/metadonnees";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Bouton } from "@/components/ui/Bouton";
import { Carte, ContenuCarte, EnteteCarte, TitreCarte } from "@/components/ui/Carte";
import { obtenirTraductions } from "@/i18n/serveur";
import { obtenirPageReservation } from "@/lib/donnees/demonstration";
import { exigerAccesModule } from "@/lib/donnees/session";
import { formaterDuree, formaterMontant } from "@/lib/formatage";

export function generateMetadata() {
  return genererMetadonneesModule("reservation-en-ligne");
}

export default async function PageReservationEnLigne() {
  const [{ langue, t }, contexte, { adresse, services: enLigne }] = await Promise.all([
    obtenirTraductions(),
    exigerAccesModule("reservation-en-ligne"),
    obtenirPageReservation(),
  ]);
  const textes = t.reservation;
  const nomOrganisation = contexte.organisationCourante?.nom ?? "";
  const regles = [
    { icone: Clock, texte: textes.delai },
    { icone: Undo2, texte: textes.annulation },
    { icone: ShieldCheck, texte: textes.confirmation },
  ];

  return (
    <ConteneurPage
      titre={t.navigation.libelles["reservation-en-ligne"]}
      description={textes.description}
      actions={<Bouton variante="contour">{textes.modifier}</Bouton>}
      mention={<MentionDemonstration t={t} />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-6">
          <Carte>
            <ContenuCarte className="flex flex-col gap-4">
              <Badge variante="succes" avecPoint className="self-start">{textes.active}</Badge>
              <div className="flex flex-col gap-1.5">
                <p className="text-label text-fg-secondary">{textes.adresse}</p>
                <p dir="ltr" className="flex items-center gap-2 rounded-control bg-secondary px-3 py-2.5 text-body text-fg">
                  <Link2 aria-hidden="true" className="size-4 shrink-0 text-fg-muted" />
                  <span className="truncate">{adresse}</span>
                </p>
              </div>
            </ContenuCarte>
          </Carte>
          <Carte>
            <EnteteCarte><TitreCarte className="text-section-title">{textes.regles}</TitreCarte></EnteteCarte>
            <ContenuCarte>
              <ul className="flex flex-col gap-3">
                {regles.map(({ icone: Icone, texte }) => (
                  <li key={texte} className="flex items-start gap-3 text-body text-fg">
                    <Icone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                    {texte}
                  </li>
                ))}
              </ul>
            </ContenuCarte>
          </Carte>
        </div>

        <section aria-label={textes.apercu} className="flex flex-col gap-3">
          <p className="text-label text-fg-secondary">{textes.apercu}</p>
          {/* Aperçu non interactif : le vrai parcours de réservation sera une page publique. */}
          <div inert className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
            <div className="flex items-center gap-3 bg-nuit px-5 py-4 text-primary-foreground">
              <Avatar nom={nomOrganisation} forme="carre" className="bg-primary-foreground text-nuit" />
              <p className="text-card-title">{nomOrganisation}</p>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <p className="text-label text-fg">{textes.choisirService}</p>
              <ul className="flex flex-col gap-2">
                {enLigne.map((service, index) => (
                  <li key={service.id} className={`flex items-center gap-3 rounded-control border px-3 py-2.5 ${index === 0 ? "border-primary bg-primary-subtle" : "border-border"}`}>
                    {index === 0 && <CircleCheck aria-hidden="true" className="size-4 text-primary" />}
                    <span className="min-w-0 flex-1 truncate text-label text-fg">{service.nom}</span>
                    <span className="text-helper tabular-nums text-fg-secondary">{formaterDuree(service.duree_minutes, t.apercu.unites)}</span>
                    <span className="text-helper tabular-nums text-fg">{formaterMontant(service.prix_mad, langue)}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-2 flex h-11 items-center justify-center rounded-control bg-primary text-label text-primary-foreground">{textes.reserver}</span>
            </div>
          </div>
        </section>
      </div>
    </ConteneurPage>
  );
}
