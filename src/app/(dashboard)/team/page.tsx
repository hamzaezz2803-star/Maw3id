import { getModuleMetadata, ModulePlaceholder } from "@/components/layout/ModulePlaceholder";

export const metadata = getModuleMetadata("team");

export default function Page() {
  return <ModulePlaceholder moduleId="team" />;
}
