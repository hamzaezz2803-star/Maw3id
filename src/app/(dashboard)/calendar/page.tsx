import { getModuleMetadata, ModulePlaceholder } from "@/components/layout/ModulePlaceholder";

export const metadata = getModuleMetadata("calendar");

export default function Page() {
  return <ModulePlaceholder moduleId="calendar" />;
}
