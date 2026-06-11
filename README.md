# Diagram Digest UI — InfoSewer Explainer

> _README added by Robert Dickinson via Comet._

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-000000?logo=shadcnui&logoColor=white)

## About

**Diagram Digest UI** is an interactive, diagram-driven explainer focused on **InfoSewer** workflows and modeling concepts. It presents content through tabbed pages and visual diagrams that break down InfoSewer processes into digestible, navigable pieces.

It is part of the SWMMEnablement collection and is built on a modern Vite + React + TypeScript frontend styled with Tailwind CSS and shadcn/ui.

## What's Inside

| Area | Description |
| --- | --- |
| `src/components/diagrams/` | Interactive diagram components for InfoSewer concepts |
| `src/components/NavLink.tsx` | In-app navigation links |
| `src/components/ui/` | shadcn/ui reusable UI primitives |
| `src/pages/` | Tabbed application page views |
| `src/hooks/`, `src/lib/` | Custom React hooks and utilities |
| `public/` | Static assets |
| `InfoSewer-App-Handover.md`, `InfoSewer-AI-Context.md`, `InfoSewer-Tab-Migration.md` | Project handover and context notes |

## Tech Stack

| Layer | Technology |
| --- | --- |
| Language | TypeScript |
| Framework | React |
| Build tool | Vite |
| Styling | Tailwind CSS |
| UI components | shadcn/ui |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/SWMMEnablement/diagram-digest-ui.git
cd diagram-digest-ui

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open the local URL printed by Vite (typically http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## License

No license file is currently included. Contact the SWMMEnablement organization regarding reuse.
