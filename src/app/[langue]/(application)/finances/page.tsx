import { genererMetadonneesModule, ModuleAVenir } from "@/components/mise-en-page/ModuleAVenir";

export function generateMetadata() {
  return genererMetadonneesModule("finances");
}

export default function Page() {
  return <ModuleAVenir idModule="finances" />;
}
