# apollo-app-ui
This repo is for demo the app to apollo maritime

A clickable demo of the Apollo crew and shore staff apps: React 18, TypeScript, Vite and React Router. All content is demo data from `src/data/`; bracketed values such as `[Clinic name]` are placeholders for real content.

## Run it

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
```

On a desktop browser the mobile apps show in a 390×844 phone frame; on a phone they fill the screen. The web console is a fluid page.

## Screens

| Area | Route |
| --- | --- |
| Sign in (seafarer or shore staff) | `/` |
| Crew · Home | `/crew` |
| Crew · Schedule | `/crew/schedule` |
| Crew · Pre-joining, Training, Joining, Onboard | `/crew/schedule/pre-joining`, `/training`, `/joining`, `/onboard` |
| Crew · Flight details | `/crew/schedule/joining/flight` |
| Crew · Vacancies, About & benefits | `/crew/schedule/vacancies`, `/crew/schedule/company` |
| Crew · Documents, Circulars & rules | `/crew/documents`, `/crew/circulars` |
| Crew · My profile, Talent matrix, Service record | `/crew/profile`, `/crew/profile/talent-matrix`, `/crew/profile/service-record` |
| Shore staff · Today, Approvals, Crew profile | `/staff`, `/staff/approvals`, `/staff/crew` |
| Web console · Crew planning, Flights, Training, Circulars | `/console/planning`, `/console/flights`, `/console/training`, `/console/circulars` |

Route paths live in `src/routes.ts`.

## Code layout

- `src/styles/tokens.css`: colours, type and shadows as CSS custom properties. Use these rather than raw hex values.
- `src/components/ui/`: shared building blocks (`Button`, `Chip`, `Card`/`ListGroup`/`ListRow`, `Accordion`, `SegmentedControl`/`ChoiceChips`, `KeyValueList`/`FactGrid`, `Field`/`SearchField`, `BottomSheet`, `Icon`).
- `src/components/mobile/`: the phone frame, `MobileScreen` with `TitleHeader`/`BackHeader`, and the crew and staff tab bars.
- `src/components/console/`: the web console layout, page header and `DataTable`.
- `src/screens/`: one component and stylesheet per screen.
- `src/data/`: demo data for each app.

Static hosting needs every path to fall back to `index.html`, because routing happens in the browser.
