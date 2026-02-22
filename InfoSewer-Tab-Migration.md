# InfoSewer – Tab Migration Guide

**Purpose:** Drop the entire InfoSewer app into another Lovable project as a single tab/page.

---

## 1. Required Dependencies

```bash
# 3D visualization (only needed if keeping the 3D View tab)
@react-three/fiber ^8.18.0
@react-three/drei ^9.122.0
three ^0.160.1

# UI (shadcn/ui — already present in most Lovable projects)
@radix-ui/react-tabs
@radix-ui/react-accordion
@radix-ui/react-popover
@radix-ui/react-slider
@radix-ui/react-select
@radix-ui/react-dialog
@radix-ui/react-scroll-area
@radix-ui/react-progress

# Icons & utilities (likely already installed)
lucide-react
class-variance-authority
tailwind-merge
clsx
recharts
```

---

## 2. Files to Copy

### Core Component (the entire tab)
```
src/pages/Index.tsx                          → use as your tab content component
```

### All Diagram Components (copy entire folder)
```
src/components/diagrams/
├── InteractiveNetwork.tsx     # 2D clickable sewer network
├── TechnicalGlossary.tsx      # Glossary + 3 calculators (~503 lines)
├── SystemArchitecture.tsx     # Architecture flow diagram
├── NetworkComponents.tsx      # Component reference cards
├── SimulationWorkflow.tsx     # Steady-state vs EPS comparison
├── DataIntegration.tsx        # GIS/DB integration diagram
├── ProjectStructure.tsx       # File tree visualization
├── HydraulicProcess.tsx       # Hydraulic calculation methodology
├── Network3D.tsx              # 3D Three.js visualization (~1249 lines)
└── CrossSectionView.tsx       # SVG pipe cross-section (used by Network3D)
```

### Required shadcn/ui Components

These must exist in your target project's `src/components/ui/`:
```
accordion.tsx, badge.tsx, button.tsx, card.tsx, dialog.tsx,
input.tsx, label.tsx, popover.tsx, progress.tsx, scroll-area.tsx,
select.tsx, separator.tsx, slider.tsx, table.tsx, tabs.tsx,
alert.tsx, tooltip.tsx
```

Most Lovable projects already have these. If missing, run `npx shadcn-ui@latest add <component>`.

### Utility
```
src/lib/utils.ts              # cn() function — likely already exists
```

---

## 3. Design Tokens Required

Add these to your target project's `src/index.css` inside `:root` (skip any that already exist):

```css
:root {
  /* Primary palette (cyan-blue) */
  --primary: 200 95% 45%;
  --primary-foreground: 0 0% 100%;

  /* Secondary (teal) */
  --secondary: 180 70% 50%;
  --secondary-foreground: 0 0% 100%;

  /* Accent (light cyan) */
  --accent: 195 85% 55%;
  --accent-foreground: 215 25% 15%;

  /* Backgrounds */
  --background: 210 20% 98%;
  --foreground: 215 25% 15%;
  --card: 0 0% 100%;
  --card-foreground: 215 25% 15%;
  --muted: 210 20% 92%;
  --muted-foreground: 215 15% 40%;
  --border: 210 20% 88%;

  /* Custom tokens used by InfoSewer components */
  --gradient-primary: linear-gradient(135deg, hsl(200 95% 45%), hsl(180 70% 50%));
  --gradient-hero: linear-gradient(180deg, hsl(210 20% 98%) 0%, hsl(210 25% 95%) 100%);
  --shadow-soft: 0 2px 10px -2px hsl(200 95% 45% / 0.08);
  --shadow-medium: 0 4px 20px -4px hsl(200 95% 45% / 0.12);
  --transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark {
  --primary: 200 95% 55%;
  --secondary: 180 60% 45%;
  --accent: 195 75% 50%;
  --background: 215 30% 8%;
  --foreground: 210 20% 95%;
  --card: 215 28% 12%;
  --card-foreground: 210 20% 95%;
  --muted: 215 25% 16%;
  --muted-foreground: 215 15% 60%;
  --border: 215 25% 20%;
}
```

### Tailwind Config Extensions

Add to `tailwind.config.ts` → `theme.extend`:
```ts
backgroundImage: {
  'gradient-primary': 'var(--gradient-primary)',
  'gradient-hero': 'var(--gradient-hero)',
},
boxShadow: {
  'soft': 'var(--shadow-soft)',
  'medium': 'var(--shadow-medium)',
},
colors: {
  'primary-light': 'hsl(200 95% 65%)',
  'primary-dark': 'hsl(200 95% 35%)',
},
```

### CSS Animations

Add to `src/index.css`:
```css
@keyframes flow-1 {
  0% { transform: translateX(-100%); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}
@keyframes flow-2 {
  0% { transform: translateX(-100%); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}
.animate-flow-1 { animation: flow-1 2s infinite; }
.animate-flow-2 { animation: flow-2 2s infinite 1s; }
```

---

## 4. Integration as a Tab

### Option A: Embed the full Index page as a single tab

```tsx
// In your new app's page
import InfoSewerTab from "@/components/InfoSewerTab";

// Inside your Tabs component:
<TabsContent value="infosewer">
  <InfoSewerTab />
</TabsContent>
```

Then create `InfoSewerTab.tsx` by copying the content of `Index.tsx` but **removing** the `<header>` and outer `<div className="min-h-screen bg-gradient-hero">` wrapper — just keep the intro Card + Tabs block inside a fragment.

### Option B: Use individual diagram components directly

Each diagram component is standalone (except `Network3D` which imports `CrossSectionView`). You can import any subset:

```tsx
import InteractiveNetwork from "@/components/diagrams/InteractiveNetwork";
import TechnicalGlossary from "@/components/diagrams/TechnicalGlossary";
import Network3D from "@/components/diagrams/Network3D";

// Use directly in JSX:
<InteractiveNetwork />
<TechnicalGlossary />
<Network3D />
```

---

## 5. Component Independence Matrix

| Component | Standalone? | Dependencies | Lines |
|-----------|------------|--------------|-------|
| InteractiveNetwork | ✅ Yes | Popover, Card, Badge, Button | ~300 |
| TechnicalGlossary | ✅ Yes | Accordion, Input, Label, Card | ~503 |
| SystemArchitecture | ✅ Yes | Card, Badge | ~200 |
| NetworkComponents | ✅ Yes | Card, Badge | ~250 |
| SimulationWorkflow | ✅ Yes | Card, Badge | ~200 |
| DataIntegration | ✅ Yes | Card, Badge | ~200 |
| ProjectStructure | ✅ Yes | Card, Badge | ~200 |
| HydraulicProcess | ✅ Yes | Card, Badge | ~250 |
| Network3D | ⚠️ Needs CrossSectionView | Three.js, Slider, Select, Dialog, Table, ScrollArea, Alert, Button, Badge | ~1249 |
| CrossSectionView | ✅ Yes | (none — pure SVG) | ~150 |

---

## 6. Import Path Adjustments

All components use the `@/` alias (mapped to `src/`). If your target project uses the same alias (standard in Lovable), no changes needed. Otherwise, update imports:

```typescript
// Components use these import patterns:
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import CrossSectionView from "@/components/diagrams/CrossSectionView";
```

---

## 7. What You Can Skip

- **`src/pages/NotFound.tsx`** — 404 page, not needed
- **`src/components/NavLink.tsx`** — router NavLink wrapper, not used by diagrams
- **`src/hooks/use-mobile.tsx`** — not used by diagram components
- **`src/hooks/use-toast.ts`** — not used by diagram components
- **`recharts`** — available but barely used; safe to skip unless extending charts
- **`react-router-dom`** — not needed if embedding as a tab

---

## 8. Quick Migration Checklist

- [ ] Install `@react-three/fiber`, `@react-three/drei`, `three` (if using 3D View)
- [ ] Copy `src/components/diagrams/` folder
- [ ] Verify shadcn/ui components exist (accordion, popover, slider, select, dialog, table, scroll-area, alert)
- [ ] Add custom CSS tokens to `index.css` (gradients, shadows, flow animations)
- [ ] Add Tailwind extensions to `tailwind.config.ts`
- [ ] Create wrapper component (strip header from Index.tsx)
- [ ] Update import paths if alias differs
- [ ] Test each tab renders correctly

---

## 9. Prompt for AI in Target App

Paste this to the AI in your new project:

> I'm adding an InfoSewer wastewater modeling tab to this app. I've copied the `src/components/diagrams/` folder which contains 10 React components. The main entry point is modeled after Index.tsx which uses a Tabs component with 9 sub-tabs. Key dependencies: `@react-three/fiber`, `@react-three/drei`, `three` for the 3D view. All components use shadcn/ui and Tailwind semantic tokens. The design uses cyan-blue primary (`200 95% 45%`), teal secondary, and custom CSS variables for gradients and shadows. Please integrate this as a new tab called "InfoSewer" in the existing navigation.

---

*End of migration guide.*
