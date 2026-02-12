# InfoSewer – Wastewater Collection System Modeling App

## Handover Document

**App Name:** InfoSewer  
**Tagline:** Wastewater Collection System Modeling  
**Published URL:** https://diagram-digest-ui.lovable.app  
**Source Repository:** https://lovable.dev/projects/5f5147f8-3639-4983-8368-9180831b647d  
**Last Updated:** 2026-02-12  
**Rendering:** Client-side rendered (CSR) React + Vite (no SSR/SSG)

---

## 1. Purpose & Overview

InfoSewer is a **visual educational tool** for understanding wastewater collection system modeling. It showcases the architecture, network components, hydraulic simulation workflows, and data integration capabilities of the InfoSewer software platform (which integrates with ArcGIS in the real world).

The app is entirely **frontend-only** — no backend, no database, no authentication. All data is hardcoded/in-memory. It serves as an interactive reference and learning tool for civil/environmental engineers.

---

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | ^18.3.1 |
| Build Tool | Vite | latest |
| Language | TypeScript | strict |
| Styling | Tailwind CSS + CSS Variables (HSL design tokens) | latest |
| UI Components | shadcn/ui (Radix primitives) | default style |
| 3D Rendering | Three.js + @react-three/fiber + @react-three/drei | three ^0.160.1, fiber ^8.18.0 |
| Charts | Recharts | ^2.15.4 |
| Routing | react-router-dom | ^6.30.1 |
| State | React useState/useEffect (no external state management) | — |
| Icons | lucide-react | ^0.462.0 |
| Animations | CSS keyframes + Three.js useFrame | — |

### Key Dependencies
- `@react-three/fiber` & `@react-three/drei` — 3D sewer network visualization
- `recharts` — (available but not heavily used in current views)
- `class-variance-authority` + `tailwind-merge` — component variant system
- `tailwindcss-animate` — animation utilities

---

## 3. Design System

### Color Tokens (HSL, defined in `src/index.css`)

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--primary` | 200 95% 45% (cyan-blue) | 200 95% 55% | Main brand, links, active states |
| `--secondary` | 180 70% 50% (teal) | 180 60% 45% | Secondary actions, EPS sections |
| `--accent` | 195 85% 55% (light cyan) | 195 75% 50% | Highlights, pipe elements |
| `--background` | 210 20% 98% | 215 30% 8% | Page background |
| `--foreground` | 215 25% 15% | 210 20% 95% | Primary text |
| `--muted` | 210 20% 92% | 215 25% 16% | Subtle backgrounds |
| `--muted-foreground` | 215 15% 40% | 215 15% 60% | Secondary text |

### Custom Design Tokens
- `--gradient-primary`: 135° gradient from primary to teal
- `--gradient-hero`: Vertical page background gradient
- `--shadow-soft` / `--shadow-medium`: Blue-tinted box shadows
- `--transition-smooth`: 0.3s cubic-bezier easing

### Tailwind Extensions (in `tailwind.config.ts`)
- `bg-gradient-primary`, `bg-gradient-hero` — mapped to CSS custom properties
- `shadow-soft`, `shadow-medium` — custom shadow classes
- `primary-light`, `primary-dark` — extended primary palette

### Critical Rule
**Never use raw color classes** (e.g., `text-white`, `bg-black`) in components. Always use semantic tokens (`text-foreground`, `bg-card`, `text-primary`, etc.). Both light and dark modes are supported.

---

## 4. Project Structure

```
src/
├── main.tsx                          # Entry point
├── App.tsx                           # Router setup (BrowserRouter)
├── App.css                           # (minimal)
├── index.css                         # Design system tokens + animations
├── vite-env.d.ts                     # Vite type declarations
├── lib/
│   └── utils.ts                      # cn() utility (clsx + tailwind-merge)
├── hooks/
│   ├── use-mobile.tsx                # Mobile breakpoint detection
│   └── use-toast.ts                  # Toast notification hook
├── pages/
│   ├── Index.tsx                     # Main page (single-page app)
│   └── NotFound.tsx                  # 404 catch-all
├── components/
│   ├── NavLink.tsx                   # React Router NavLink wrapper
│   ├── ui/                           # ~50 shadcn/ui components (accordion, badge, button, card, dialog, etc.)
│   └── diagrams/                     # Core application components
│       ├── InteractiveNetwork.tsx     # 2D clickable network diagram
│       ├── NetworkComponents.tsx      # Component type reference cards
│       ├── SystemArchitecture.tsx     # Architecture flow diagram
│       ├── SimulationWorkflow.tsx     # Steady-state vs EPS workflow
│       ├── DataIntegration.tsx        # GIS/DB/Office integration diagram
│       ├── ProjectStructure.tsx       # File structure visualization
│       ├── HydraulicProcess.tsx       # Hydraulic calculation methodology
│       ├── TechnicalGlossary.tsx      # Interactive glossary + calculators
│       ├── Network3D.tsx             # 3D Three.js visualization (main feature)
│       └── CrossSectionView.tsx      # SVG pipe cross-section view
```

---

## 5. Routing

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Index` | Main (and only real) page |
| `*` | `NotFound` | Catch-all 404 |

This is effectively a **single-page application** with tab-based navigation within the Index page.

---

## 6. Feature Tabs (Index Page)

The main page uses a `Tabs` component with 9 tabs:

### Tab 1: Interactive Network (`InteractiveNetwork.tsx`)
- **2D clickable sewer network diagram** with Popover tooltips
- Components: Inlet Manhole → Gravity Main (350ft) → Junction Manhole → Gravity Main (280ft) → Wet Well → Pump → Force Main (1,200ft) → Outlet
- **Animate Flow** button toggles CSS-animated flow particles along pipes
- Each component shows detailed specs on click (elevation, diameter, material, slope, Manning's n, flow rates)
- Legend showing node types and flow types (gravity vs pressurized)

### Tab 2: Technical Glossary (`TechnicalGlossary.tsx`, ~503 lines)
- **Accordion-based** interactive glossary with 6+ terms
- **Three functional calculators:**
  1. **Manning's Equation Calculator** — inputs: Manning's n, hydraulic radius, slope → outputs: velocity (ft/s)
  2. **HGL Calculator** — inputs: elevation, pressure (psi) → outputs: HGL (ft), with visual piezometer diagram
  3. **d/D Ratio Calculator** — inputs: flow depth, pipe diameter → outputs: d/D ratio, flow capacity %, status indicator (optimal range 0.5–0.8)
- Reference tables for Manning's roughness coefficients (PVC, concrete, clay, cast iron)
- Additional terms: Infiltration/Inflow (I/I), Surcharge, Peaking Factor (with visual examples)

### Tab 3: System Architecture (`SystemArchitecture.tsx`)
- 3-layer architecture flow: User Interface (ArcGIS) → Processing Engine (Hydraulic Solver) → Data Storage
- Four capability cards: Master Planning, Flow Assessment, System Design, Operational Studies

### Tab 4: Network Components (`NetworkComponents.tsx`)
- Four component type cards with icons, sub-types, and descriptions:
  - **Manholes** (Normal, Chamber, Outlet)
  - **Wet Wells** (Storage, Lift Station)
  - **Pipes** (Gravity Main, Force Main)
  - **Pumps** (Submersible, Dry Pit)
- Component connectivity diagram showing typical flow path

### Tab 5: Simulation Workflow (`SimulationWorkflow.tsx`)
- Side-by-side comparison of two simulation modes:
  1. **Steady-State Analysis** — 4-step workflow (Define Network → Set Loads → Run → Analyze)
  2. **Extended Period Simulation (EPS)** — 4-step workflow (Configure Time → Apply Patterns → Execute → Review)
- Output comparison table and "Best For" use cases

### Tab 6: Data Integration (`DataIntegration.tsx`)
- Hub-and-spoke diagram: InfoSewer Core ↔ GIS Systems / Databases / Office Tools
- Import capabilities: Import Manager, GIS Gateway, ODBC Exchange
- Export capabilities: Model Results, Network Data, Reports & Graphs
- Integration benefits summary

### Tab 7: Project Structure (`ProjectStructure.tsx`)
- File tree visualization of InfoSewer project organization:
  - `ProjectName.MXD` — ArcMap network schematic
  - `ProjectName.IEDB/` — Database directory (attributes, parameters, scenarios, contours, annotations, maps)
  - `ProjectName.OUT/` — Simulation results (binary, output sources, time-series)
- Scenario management: Base Scenario, Custom Scenarios, Result Comparison

### Tab 8: Hydraulic Process (`HydraulicProcess.tsx`)
- Input parameters: Flow Characteristics, Pipe Properties, Boundary Conditions
- 5-step calculation process: Flow Accumulation → Normal Depth (Manning's) → Velocity → HGL Profile → Capacity Assessment
- Output parameter tables for Pipes, Nodes, and Pumps
- Core hydraulic equations: Manning's, Continuity, Energy, Capacity Ratio (with formulas)

### Tab 9: 3D View (`Network3D.tsx`, ~1249 lines — largest component)
- **Full 3D visualization** using Three.js (@react-three/fiber)
- **Network elements:**
  - 5 manholes (MH-1 through MH-5) with elevation data (100m down to 80m)
  - 4 pipes (P-1 through P-4) with increasing diameters (0.3m to 0.45m)
  - Animated flow particles along pipes
  - Water surface profile lines (dashed)
  - Velocity labels at pipe midpoints
- **Interactive controls:**
  - Orbit controls (rotate, zoom, pan)
  - Click manholes/pipes for detail panels
  - Manual flow rate slider (0–10 m³/s)
  - Play/Pause animation toggle
- **Storm Event Simulation System:**
  - Preset storms: 2-year, 5-year, 10-year, 25-year, 100-year return periods
  - Custom storm with adjustable duration (10–180s) and peak rainfall (2–20 mm/h)
  - Modified triangular/curved hydrograph pattern with configurable:
    - Time to peak (fraction of duration)
    - Recession factor (controls falling limb steepness)
  - Real-time display: time elapsed, rainfall intensity, flow rate, peak flow, accumulated volume
  - Progress bar with storm-specific color coding
  - **Capacity warnings** when flow exceeds pipe capacity (Manning's equation)
- **Storm History System:**
  - Automatic recording of completed storms (up to 20 records)
  - History dialog with table view (pattern, duration, peak flow, volume, warnings)
  - **Replay** any historical storm event
  - Delete individual records or clear all
  - Partial storm recording (>10% completion)
- **Pipe Cross-Section View** (`CrossSectionView.tsx`):
  - SVG-based circular pipe cross-section showing water level
  - Velocity profile visualization (1/7 power law)
  - Manning's roughness elements on pipe wall
  - Properties display: flow depth, velocity, Manning's n, hydraulic radius

#### Key Hydraulic Functions (in Network3D.tsx)
```typescript
// Manning's equation velocity calculation
calculateVelocity(diameter, slope, flowRate, manningN = 0.013)

// Pipe capacity using Manning's equation (full pipe)
calculatePipeCapacity(diameter, slope, manningN = 0.013)

// Storm intensity with configurable hydrograph shape
getStormIntensity(timeElapsed, stormDuration, peakIntensity, timeToPeak, recessionFactor)

// Rational method: rainfall to flow rate
rainfallToFlowRate(intensity, catchmentArea = 1.0, runoffCoeff = 0.7)
```

---

## 7. Animation System

### CSS Animations (defined in `src/index.css`)
- `flow-1` and `flow-2`: Horizontal particle animations for 2D pipe flow (2s infinite, second delayed by 1s)
- Applied via `.animate-flow-1` and `.animate-flow-2` classes

### Three.js Animations (in Network3D.tsx)
- `useFrame` hook drives real-time particle movement along pipes
- Particle velocity scaled by Manning's equation output
- Slight Y-axis wobble (`sin(progress * 4π) * 0.05`) for realism
- Storm simulation driven by `setInterval` at 100ms increments

---

## 8. Data Model

All data is **hardcoded** — there is no backend or API.

### Interactive Network (2D)
```typescript
componentDetails = {
  manhole1: { title, type, specs[], description }  // Inlet
  pipe1: { title, type, specs[], description }      // 350ft gravity main
  manhole2: { ... }                                  // Junction
  pipe2: { ... }                                     // 280ft gravity main
  wetwell: { ... }                                   // Lift station
  pump: { ... }                                      // 500 GPM submersible
  pipe3: { ... }                                     // 1200ft force main
  outlet: { ... }                                    // Discharge point
}
```

### 3D Network
```typescript
interface ManholeData {
  id: string;           // "MH-1" through "MH-5"
  position: [x, y, z];  // 3D coordinates
  elevation: number;     // 80–100m
  depth: number;         // 3–5m
  label: string;
}

interface PipeData {
  id: string;       // "P-1" through "P-4"
  from: string;     // upstream manhole ID
  to: string;       // downstream manhole ID
  diameter: number; // 0.3–0.45m
  slope: number;    // 0.5%
}

interface StormPattern {
  id: string;            // "2-year", "5-year", etc.
  name: string;
  peakIntensity: number; // mm/hr
  duration: number;      // seconds
  timeToPeak: number;    // fraction 0–1
  recessionFactor: number;
  color: string;         // hex color
}

interface StormHistoryRecord {
  id: string;
  timestamp: Date;
  patternId: string;
  duration: number;
  peakIntensity: number;
  peakFlow: number;
  totalVolume: number;
  capacityWarnings: string[];
  maxCapacityExceeded: boolean;
}
```

---

## 9. Domain Knowledge

### Manning's Equation (US Customary)
```
V = (1.49/n) × R^(2/3) × S^(1/2)
```
- **V** = velocity (ft/s)
- **n** = Manning's roughness coefficient (dimensionless)
- **R** = hydraulic radius (ft) = wetted area / wetted perimeter
- **S** = slope (ft/ft)

### Common Roughness Coefficients
| Material | Manning's n |
|----------|------------|
| PVC | 0.009–0.013 |
| Concrete | 0.011–0.015 |
| Clay | 0.011–0.014 |
| Cast Iron | 0.012–0.015 |

### Key Concepts
- **HGL (Hydraulic Grade Line)**: Elevation + Pressure Head. Shows height water would rise in a piezometer.
- **d/D Ratio**: Flow depth / pipe diameter. Optimal design range: 0.5–0.8.
- **Infiltration/Inflow (I/I)**: Groundwater entering system through defects (infiltration) or direct connections (inflow).
- **Surcharge**: When flow exceeds pipe capacity, water rises above crown causing pressurized flow.
- **Peaking Factor**: Ratio of peak to average flow (typically 2.5–4.0).
- **Rational Method**: Q = C × I × A (runoff coefficient × rainfall intensity × catchment area).

### InfoSewer Project File Structure
- `.MXD` — ArcMap network schematic
- `.IEDB/` — Database directory (dBASE format .DBF files)
- `.OUT/` — Binary simulation results
- Subdirectories: CONTOURS/, ANNOTATION/, MAP/

---

## 10. Build & Development

```bash
# Install dependencies
npm install

# Start dev server (port 8080)
npm run dev

# Build for production
npm run build
```

### Vite Configuration (`vite.config.ts`)
- Server: `host: "::"`, `port: 8080`
- Path alias: `@` → `./src`
- Plugin: `@vitejs/plugin-react-swc`
- Dev-only: `lovable-tagger` for component tagging

### TypeScript Configuration
- Strict mode enabled
- Path mapping: `@/*` → `src/*`

---

## 11. Known Limitations

1. **Client-side only** — Cannot be read by AI models or crawlers that don't execute JavaScript
2. **No backend** — All data is hardcoded; no persistence, no user accounts
3. **No SSR/SSG** — Platform limitation (Lovable only supports CSR React/Vite)
4. **3D performance** — Network3D.tsx is ~1250 lines; complex Three.js scenes may be heavy on low-end devices
5. **No responsive 3D** — 3D canvas may not scale well on very small mobile screens
6. **No tests** — No unit or integration tests exist
7. **Simplified hydraulics** — Manning's equation calculations assume half-full pipes; real hydraulics are more complex

---

## 12. Potential Enhancements

- Add SEO meta tags and Open Graph data for link previews
- Create a static HTML summary for AI model consumption
- Add more network topologies (branched, looped networks)
- Implement actual partially-full pipe hydraulics (iterative depth solver)
- Add unit tests for hydraulic calculation functions
- Export simulation results as CSV/PDF
- Add dark mode toggle in the UI
- Implement actual diurnal flow patterns with time-series charts
- Add map-based visualization (Leaflet/Mapbox integration)

---

## 13. Component Dependency Graph

```
Index.tsx
├── SystemArchitecture.tsx     (standalone)
├── NetworkComponents.tsx      (standalone)
├── SimulationWorkflow.tsx     (standalone)
├── DataIntegration.tsx        (standalone)
├── ProjectStructure.tsx       (standalone)
├── HydraulicProcess.tsx       (standalone)
├── InteractiveNetwork.tsx     (standalone, uses Popover)
├── TechnicalGlossary.tsx      (standalone, uses Accordion + Input)
└── Network3D.tsx              (complex)
    └── CrossSectionView.tsx   (SVG pipe cross-section)
```

All diagram components are **independent** and can be extracted/reused individually, except Network3D which depends on CrossSectionView.

---

## 14. shadcn/ui Components Used

The project includes ~50 shadcn/ui components in `src/components/ui/`. The following are actively used by the diagram components:

- `Card` — Every diagram tab wrapper
- `Badge` — Labels in 3D view
- `Accordion` — Technical Glossary
- `Popover` — Interactive Network tooltips
- `Input` / `Label` — Calculator inputs
- `Slider` — Flow rate and storm parameter controls
- `Button` — Storm controls, actions
- `Alert` — Capacity warnings
- `Select` — Storm pattern selection
- `Dialog` — Storm history viewer
- `Table` — History records display
- `ScrollArea` — Scrollable history list
- `Tabs` — Main page navigation

---

*End of handover document.*
