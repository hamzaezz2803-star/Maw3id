import type { ReactNode } from "react";
import { Carte, ContenuCarte, DescriptionCarte, EnteteCarte, TitreCarte } from "@/components/ui/Carte";

interface ProprietesSectionDemonstration {
  titre: string;
  description?: string;
  children: ReactNode;
}

export function SectionDemonstration({ titre, description, children }: ProprietesSectionDemonstration) {
  return (
    <Carte>
      <EnteteCarte>
        <TitreCarte className="text-section-title">{titre}</TitreCarte>
        {description && <DescriptionCarte>{description}</DescriptionCarte>}
      </EnteteCarte>
      <ContenuCarte>{children}</ContenuCarte>
    </Carte>
  );
}
