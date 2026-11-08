import { genererMetadonneesModule, ModuleAVenir } from "@/components/mise-en-page/ModuleAVenir";

export function generateMetadata() {
  return genererMetadonneesModule("rendez-vous");
}

export default function Page() {
  return <ModuleAVenir idModule="rendez-vous" />;
}
