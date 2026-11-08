import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Sans_Arabic } from "next/font/google";
import { COULEUR_THEME_NAVIGATEUR, NOM_APPLICATION } from "@/constants";
import { DIRECTION_TEXTE, LANGUES } from "@/i18n/config";
import { FournisseurTraductions } from "@/i18n/FournisseurTraductions";
import { obtenirTraductions } from "@/i18n/serveur";
import "../globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const plexArabe = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabe",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export async function generateStaticParams() {
  return LANGUES.map((langue) => ({ langue }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await obtenirTraductions();
  return {
    title: { template: `%s | ${NOM_APPLICATION}`, default: NOM_APPLICATION },
    description: t.metadonnees.description,
  };
}

export const viewport: Viewport = {
  themeColor: COULEUR_THEME_NAVIGATEUR,
  colorScheme: "light",
};

export default async function MiseEnPageRacine({ children }: LayoutProps<"/[langue]">) {
  const { langue } = await obtenirTraductions();

  return (
    <html
      lang={langue}
      dir={DIRECTION_TEXTE[langue]}
      className={`${geist.variable} ${plexArabe.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <FournisseurTraductions langue={langue}>{children}</FournisseurTraductions>
      </body>
    </html>
  );
}
