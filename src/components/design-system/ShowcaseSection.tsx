import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

interface ShowcaseSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ShowcaseSection({ title, description, children }: ShowcaseSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-section-title">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
