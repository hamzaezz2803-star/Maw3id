import { genererMetadonneesModule, ModuleAVenir } from "@/components/mise-en-page/ModuleAVenir";

export function generateMetadata() {
  return genererMetadonneesModule("equipe");
}

export default function Page() {
  return <ModuleAVenir idModule="equipe" />;
}
