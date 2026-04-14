# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## imdanang App (`artifacts/imdanang/`)

Travel & tourism platform for Da Nang, Vietnam. Running on port 21082 via workflow.

### Tech
- React 19 + Vite, Tailwind CSS 4, Framer Motion, TanStack Query, Wouter routing
- **Google Maps**: loaded via dynamic script tag (`VITE_GOOGLE_MAPS_API_KEY` secret), types from `@types/google.maps`
- Pages: Home, Hotels (`/luu-tru-khach-san`), Hotel Detail, Tourist Map (`/ban-do`), Restaurants, Destinations, Events, Shopping, Transport, AI Assistant

### `/ban-do` (Tourist Map page)
- Dark-themed Google Maps with custom SVG emoji markers
- Left sidebar: 5 category circular icons (Khách sạn, Địa điểm, Ẩm thực, Bãi biển, Món ngon)
- Per-category filter chips (stars/type/city for hotels, cuisine type, district, etc.)
- Search + list/grid toggle + pagination
- "Món ngon địa phương" mode: dish marker → click → show all restaurants serving that dish
- Detail card overlay on map with "Xem chi tiết" button; hotel slug links to `/luu-tru-khach-san/:slug`
