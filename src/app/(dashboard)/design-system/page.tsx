import type { Metadata } from "next";
import { CircleHelp, Plus, Settings, Users } from "lucide-react";
import { ModalDemo, PaginationDemo } from "@/components/design-system/InteractiveDemos";
import { ShowcaseSection } from "@/components/design-system/ShowcaseSection";
import { ColorTokens, TypographyScale } from "@/components/design-system/TokenShowcase";
import { PageContainer } from "@/components/layout/PageContainer";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/Dropdown";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { LoadingState, Skeleton } from "@/components/ui/LoadingState";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Textarea } from "@/components/ui/Textarea";
import { Tooltip } from "@/components/ui/Tooltip";
import { SHOWCASE_APPOINTMENTS, SHOWCASE_SERVICE_OPTIONS } from "@/data/mock/showcase";
import { formatDateTime } from "@/lib/utils";

export const metadata: Metadata = { title: "Design System" };

export default function DesignSystemPage() {
  return (
    <PageContainer
      title="Design System"
      description="Tokens and reusable components that every Maw3id module is built from."
      breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Design System" }]}
    >
      <ShowcaseSection title="Colors" description="Defined once as theme tokens in globals.css.">
        <ColorTokens />
      </ShowcaseSection>

      <ShowcaseSection title="Typography">
        <TypographyScale />
      </ShowcaseSection>

      <ShowcaseSection title="Buttons" description="One primary action per screen. Secondary actions use outline or ghost.">
        <div className="flex flex-wrap items-center gap-3">
          <Button><Plus aria-hidden="true" />New appointment</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Delete</Button>
          <Button variant="outline" isLoading>Saving</Button>
          <Button variant="outline" disabled>Disabled</Button>
          <Button variant="outline" size="icon" aria-label="Settings"><Settings aria-hidden="true" /></Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Form controls">
        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Client name" placeholder="e.g. Imane Tazi" required />
          <Input label="Email" type="email" defaultValue="client@example" error="Enter a valid email address." />
          <Select label="Service" placeholder="Select a service" options={SHOWCASE_SERVICE_OPTIONS} helperText="Only active services are listed." />
          <SearchInput label="Search clients" placeholder="Search clients..." containerClassName="self-end" />
          <Textarea label="Internal note" placeholder="Visible to your team only" containerClassName="md:col-span-2" />
          <Checkbox label="Send a confirmation email" description="The client receives the appointment details." defaultChecked />
          <Checkbox label="Unavailable option" disabled />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Badges and avatars" description="Status badges always carry a text label, never color alone.">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            <Badge>Neutral</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success" withDot>Confirmed</Badge>
            <Badge variant="warning" withDot>Pending</Badge>
            <Badge variant="danger" withDot>Cancelled</Badge>
            <Badge variant="info" withDot>Information</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Avatar name="Salma Idrissi" size="sm" />
            <Avatar name="Karim Berrada" />
            <Avatar name="Imane Tazi" size="lg" />
            <Avatar name="Atlas Advisory Group" shape="square" size="lg" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Overlays" description="Modal, dropdown and tooltip.">
        <div className="flex flex-wrap items-center gap-3">
          <ModalDemo />
          <Dropdown align="start" trigger="Open dropdown" triggerClassName="inline-flex h-11 items-center rounded-control border border-border-strong bg-surface px-4 text-label hover:bg-surface-muted sm:h-10">
            <DropdownItem href="/clients"><Users aria-hidden="true" />View clients</DropdownItem>
            <DropdownItem href="/settings"><Settings aria-hidden="true" />Settings</DropdownItem>
            <DropdownSeparator />
            <DropdownItem tone="danger">Remove</DropdownItem>
          </Dropdown>
          <Tooltip content="Opens the help center">
            <Button variant="ghost" size="icon" aria-label="Help"><CircleHelp aria-hidden="true" /></Button>
          </Tooltip>
        </div>
      </ShowcaseSection>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Cards group related content on a white surface.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body text-fg-secondary">Use a header, a content area and an optional footer.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm">Confirm</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Loading state</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <LoadingState label="Loading appointments" className="py-4" />
          </CardContent>
        </Card>
      </div>

      <ShowcaseSection title="Table and pagination">
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-control border border-border">
            <Table>
              <TableCaption>Sample appointments</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Collaborator</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SHOWCASE_APPOINTMENTS.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="whitespace-nowrap font-medium">{row.client_name}</TableCell>
                    <TableCell className="whitespace-nowrap">{row.service_name}</TableCell>
                    <TableCell className="whitespace-nowrap">{row.collaborator_name}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatDateTime(row.starts_at)}</TableCell>
                    <TableCell><Badge variant={row.status_variant} withDot>{row.status_label}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <PaginationDemo />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Empty state">
        <EmptyState
          title="No clients yet"
          description="Clients appear here after their first booking, or you can add one manually."
          action={<Button variant="outline"><Plus aria-hidden="true" />Add a client</Button>}
          className="py-6"
        />
      </ShowcaseSection>
    </PageContainer>
  );
}
