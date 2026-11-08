"use client";

import { useState } from "react";
import { Bouton } from "@/components/ui/Bouton";
import { ChampTexte } from "@/components/ui/ChampTexte";
import { Modale } from "@/components/ui/Modale";
import { Pagination } from "@/components/ui/Pagination";
import { useTraductions } from "@/i18n/FournisseurTraductions";

const NOMBRE_PAGES_DEMONSTRATION = 12;

export function DemonstrationModale() {
  const { t } = useTraductions();
  const textes = t.systemeDesign.superpositions;
  const [estOuverte, setEstOuverte] = useState(false);
  const fermer = () => setEstOuverte(false);

  return (
    <>
      <Bouton variante="contour" onClick={() => setEstOuverte(true)}>
        {textes.ouvrirModale}
      </Bouton>
      <Modale
        ouverte={estOuverte}
        surFermeture={fermer}
        titre={textes.modaleTitre}
        description={textes.modaleDescription}
        pied={
          <>
            <Bouton variante="contour" onClick={fermer}>
              {textes.annuler}
            </Bouton>
            <Bouton onClick={fermer}>{textes.enregistrerService}</Bouton>
          </>
        }
      >
        <ChampTexte libelle={textes.nomService} placeholder={textes.nomServiceExemple} />
      </Modale>
    </>
  );
}

export function DemonstrationPagination() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} nombrePages={NOMBRE_PAGES_DEMONSTRATION} surChangementPage={setPage} />;
}
