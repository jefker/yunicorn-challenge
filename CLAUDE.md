# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This is an **example repository** designed for new employees to learn Next.js + Sanity CMS development patterns. When making changes, prioritize educational value and code clarity over advanced optimizations.

## Commands

**Development:**
- `pnpm dev` or `pnpm dev-turbo` - Start development server
- `pnpm build` - Production build
- `pnpm build-w-imgs` - Production build with image optimization
- `pnpm start` - Start production server (port 4000)
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking

**Package Management:**
- Uses pnpm (enforced via preinstall script) - `pnpm-lock.yaml` file present
- Install dependencies: `pnpm install`

## Architecture Overview

### Next.js + Sanity CMS Integration

**Dynamic Page System:**
- All pages route through `app/[[...slug]]/page.tsx` (catch-all route)
- Page content dynamically fetched from Sanity based on slug
- Page types defined in `/sanity/pages/` with template pattern:
  - `PageXxxTemplate.tsx` (Sanity schema + GROQ query)
  - `PageXxxJSX.tsx` (React component in `/components/pages/`)

**Key Files for New Pages:**
1. Add template to `/sanity/pages/PageXxxTemplate.tsx`
2. Register in `/sanity/pages/index.ts` 
3. Add to `/sanity/templates.ts`
4. Create component in `/components/pages/PageXxxJSX.tsx`

### Sanity Schema & Queries

**Client Setup:**
- Live queries enabled via `sanityFetch()` in `/sanity/lib/client.ts`
- Draft mode support with preview perspective
- TypeScript interfaces generated from schemas

**Global Queries:**
- Base page queries in `/sanity/globals/PageGlobals.ts`
- Reusable fragments for header, footer, SEO data

### Component Structure

- **Pages**: `/components/pages/` - Page-specific layouts
- **Global**: `/components/global/` - Reusable components
- **UI**: `/shadcn/ui/` - Base components (Radix + Tailwind)

### Styling System

**Hybrid Approach:**
- Tailwind CSS for utilities and responsive design
- SCSS modules in `/scss/global/` for complex styles
- Custom fonts: Gestura (display), Segoe UI (body)
- Extended Tailwind config with brand colors/spacing

### TypeScript Integration

- Strict TypeScript throughout
- Generated types from Sanity schemas in `/sanity/lib/types.ts`
- Page data interfaces defined per template

## Development Patterns

**Adding New Components:**
- Follow existing naming: `PageXxxJSX.tsx` for pages
- Include TypeScript interfaces for props
- Use existing global components (Header, Footer) in page layouts

**Sanity Development:**
- Studio accessible at `/studio` route
- Preview mode with live queries for real-time updates
- Schema changes require restart of dev server

**Image Handling:**
- Use Next.js `Image` component with Sanity's `urlFor()` helper
- Image optimization configured via `next-export-optimize-images`

**Performance:**
- Static generation with 60s ISR revalidation
- Tag-based cache invalidation via Sanity webhooks

## Educational Guidelines

When working with this repository:

**Code Quality:**
- Prioritize readability and learning over complexity
- Add clear comments for non-obvious patterns
- Use descriptive variable and function names
- Follow consistent naming conventions

**Best Practices Demonstrated:**
- TypeScript interfaces for all component props
- Proper error handling and loading states
- Responsive design patterns
- SEO-friendly metadata generation
- Image optimization techniques
- Form validation with proper UX

**Learning Opportunities:**
- Template-based page creation workflow
- Sanity schema design and GROQ queries
- Component composition patterns
- Performance optimization strategies
- Modern React patterns (hooks, context, suspense)