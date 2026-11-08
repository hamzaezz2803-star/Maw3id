# Maw3id

Multi-tenant appointment booking and management platform for professional organizations (clinics, law firms, accounting and consulting offices, training centers...).

Current phase: frontend foundation with static mock data. No backend, database or authentication yet.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 (redirects to `/dashboard`). The component gallery lives at `/design-system`.

## Scripts

- `npm run dev`: development server
- `npm run build`: production build
- `npm run lint`: ESLint

## Structure

```text
src/
├── app/
│   ├── (dashboard)/        # Back-office routes sharing the app shell
│   │   ├── layout.tsx      # Loads session context, renders MainLayout
│   │   ├── dashboard/      # Placeholder dashboard
│   │   ├── design-system/  # Tokens and components gallery
│   │   └── <module>/       # Placeholder page per navigation module
│   ├── globals.css         # Design tokens (@theme) and base styles
│   ├── layout.tsx          # Root layout, fonts, metadata
│   └── page.tsx            # Redirects to /dashboard
├── components/
│   ├── layout/             # Sidebar, Navbar, OrganizationSwitcher, PageContainer...
│   ├── ui/                 # Reusable design system components
│   └── design-system/      # Pieces used only by the gallery page
├── config/navigation.ts    # Navigation items, icons and allowed roles
├── constants/              # App constants, role and organization type labels
├── data/mock/              # Fictional data (never imported by UI directly)
├── lib/
│   ├── data/               # Data access layer (swap mocks for the real API here)
│   ├── navigation.ts       # Role filtering and active route helpers
│   └── utils.ts            # cn, initials, date formatting
└── types/                  # Shared domain types
```

## Design system

- Tokens are defined once in `src/app/globals.css` and used through Tailwind utilities: `bg-primary`, `bg-surface`, `border-border`, `text-fg`, `text-fg-secondary`, `rounded-control`, `rounded-card`, `shadow-card`, `text-page-title`, `text-section-title`, `text-card-title`, `text-body`, `text-label`, `text-helper`.
- Components never hardcode colors.
- Dropdowns use the native Popover API with CSS anchor positioning; modals and the mobile drawer use the native `<dialog>`.

## Roles

Navigation items declare their allowed roles (`super_admin`, `organization_admin`, `secretary`, `collaborator`, `client`) in `config/navigation.ts`; the sidebar filters them with `getNavigationForRole`. This is display only: real permissions will be enforced server-side later.
