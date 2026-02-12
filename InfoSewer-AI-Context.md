# InfoSewer – AI Context Summary

**App:** InfoSewer – Wastewater Collection System Modeling  
**Stack:** React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui + Three.js  
**Type:** Client-side only (no backend, no auth, no database). All data hardcoded.  
**URL:** https://diagram-digest-ui.lovable.app

---

## Architecture

Single-page app with tab-based navigation. One route (`/`) renders `Index.tsx` with 9 tabs. Each tab is an independent diagram component in `src/components/diagrams/`. Design system uses HSL tokens in `index.css` with semantic Tailwind classes (never raw colors).

## Key Dependencies

- `@react-three/fiber` + `@react-three/drei` + `three` — 3D sewer network visualization
- `recharts` — charting (available, lightly used)
- `lucide-react` — icons
- shadcn/ui (~50 Radix-based components in `src/components/ui/`)

## 9 Feature Tabs

1. **Interactive Network** (`InteractiveNetwork.tsx`) — 2D clickable sewer diagram with animated flow particles and popover tooltips showing specs (elevation, diameter, slope, Manning's n, flow rates)

2. **Technical Glossary** (`TechnicalGlossary.tsx`, ~503 lines) — Accordion glossary + 3 calculators:
   - Manning's Equation: V = (1.49/n) × R^(2/3) × S^(1/2)
   - HGL: elevation + pressure head
   - d/D Ratio: flow depth / pipe diameter (optimal 0.5–0.8)

3. **System Architecture** (`SystemArchitecture.tsx`) — 3-layer diagram: UI (ArcGIS) → Processing Engine → Data Storage + 4 capability cards

4. **Network Components** (`NetworkComponents.tsx`) — Reference cards for manholes, wet wells, pipes, pumps with connectivity diagram

5. **Simulation Workflow** (`SimulationWorkflow.tsx`) — Side-by-side Steady-State vs Extended Period Simulation (EPS) comparison

6. **Data Integration** (`DataIntegration.tsx`) — Hub-spoke diagram showing GIS/DB/Office integrations

7. **Project Structure** (`ProjectStructure.tsx`) — File tree: .MXD (ArcMap), .IEDB/ (database), .OUT/ (results)

8. **Hydraulic Process** (`HydraulicProcess.tsx`) — 5-step calculation workflow + equations (Manning's, Continuity, Energy)

9. **3D View** (`Network3D.tsx`, ~1249 lines — largest component) — Three.js visualization with:
   - 5 manholes (MH-1 to MH-5, elevations 80–100m), 4 pipes with animated flow
   - Orbit controls, click for details, flow rate slider
   - **Storm simulation**: preset storms (2/5/10/25/100-year) + custom storms with triangular hydrograph
   - **Storm history**: record, replay, delete (up to 20 records)
   - **Pipe cross-section** (`CrossSectionView.tsx`): SVG showing water level + velocity profile
   - Capacity warnings via Manning's equation

## Key Data Models

```typescript
// 3D Network
ManholeData { id, position: [x,y,z], elevation, depth, label }
PipeData { id, from, to, diameter, slope }
StormPattern { id, name, peakIntensity, duration, timeToPeak, recessionFactor, color }
StormHistoryRecord { id, timestamp, patternId, duration, peakIntensity, peakFlow, totalVolume, capacityWarnings, maxCapacityExceeded }
```

## Hydraulic Functions (Network3D.tsx)

```typescript
calculateVelocity(diameter, slope, flowRate, manningN = 0.013)
calculatePipeCapacity(diameter, slope, manningN = 0.013)
getStormIntensity(timeElapsed, stormDuration, peakIntensity, timeToPeak, recessionFactor)
rainfallToFlowRate(intensity, catchmentArea = 1.0, runoffCoeff = 0.7)
```

## Design System

| Token | Usage |
|-------|-------|
| `--primary` (cyan-blue) | Brand, links, active states |
| `--secondary` (teal) | Secondary actions |
| `--accent` (light cyan) | Highlights, pipe elements |
| `--background/--foreground` | Page bg/text |
| `--muted/--muted-foreground` | Subtle bg/secondary text |

Custom: `--gradient-primary`, `--gradient-hero`, `--shadow-soft/medium`, `--transition-smooth`

## Component Tree

```
Index.tsx
├── SystemArchitecture (standalone)
├── NetworkComponents (standalone)
├── SimulationWorkflow (standalone)
├── DataIntegration (standalone)
├── ProjectStructure (standalone)
├── HydraulicProcess (standalone)
├── InteractiveNetwork (standalone)
├── TechnicalGlossary (standalone)
└── Network3D (complex)
    └── CrossSectionView
```

## Domain Quick Reference

- **Manning's Equation**: V = (1.49/n) × R^(2/3) × S^(1/2) — velocity from roughness, hydraulic radius, slope
- **Rational Method**: Q = C × I × A — runoff from coefficient × rainfall intensity × catchment area
- **HGL**: Hydraulic Grade Line = Elevation + Pressure Head
- **d/D Ratio**: Flow depth / pipe diameter; design range 0.5–0.8
- **Manning's n**: PVC 0.009–0.013, Concrete 0.011–0.015, Clay 0.011–0.014
- **Surcharge**: Flow exceeds capacity → pressurized flow above pipe crown
- **Peaking Factor**: Peak/average flow ratio, typically 2.5–4.0

## Limitations

- Client-side only (no SSR/SSG) — invisible to non-JS crawlers
- No backend, persistence, or auth
- 3D component (~1250 lines) may lag on low-end devices
- Simplified hydraulics (assumes half-full pipes)
- No tests
