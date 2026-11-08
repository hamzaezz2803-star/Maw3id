import { getModuleMetadata, ModulePlaceholder } from "@/components/layout/ModulePlaceholder";

export const metadata = getModuleMetadata("reports");

export default function Page() {
  return <ModulePlaceholder moduleId="reports" />;
}
