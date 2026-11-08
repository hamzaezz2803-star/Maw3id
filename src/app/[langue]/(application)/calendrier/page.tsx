import { genererMetadonneesModule, ModuleAVenir } from "@/components/mise-en-page/ModuleAVenir";

export function generateMetadata() {
  return genererMetadonneesModule("calendrier");
}

export default function Page() {
  return <ModuleAVenir idModule="calendrier" />;
}
