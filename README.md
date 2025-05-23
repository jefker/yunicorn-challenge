# Social Selling Next.js + Sanity Challenge Repository

This is a comprehensive learning repository that demonstrates how to build modern web applications using Next.js 14 and Sanity CMS. It's designed as an educational resource for new developers to understand production-ready patterns and best practices.

## 🎯 Purpose

This repository serves as a **practical learning tool** for developers to understand:
- Modern Next.js development with App Router
- Headless CMS integration with Sanity
- Real-world component architecture
- Performance optimization techniques
- TypeScript in a production environment

## 🚀 Quick Start Guide

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start
```

**Access Points:**
- Site: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

### Available Scripts

```bash
pnpm dev              # Start development server
pnpm dev-turbo        # Start dev server with Turbo mode
pnpm build            # Production build
pnpm build-w-imgs     # Production build with image optimization
pnpm start            # Run production server (port 4000)
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type checking
```

## 🏗️ Core Architecture

### Technology Stack

- **Frontend**: Next.js 14 with App Router and Server Components
- **CMS**: Sanity with live preview and draft mode
- **Styling**: Tailwind CSS + SCSS modules
- **Language**: TypeScript throughout
- **Forms**: React Hook Form with Zod validation
- **Animation**: Framer Motion + GSAP
- **Package Manager**: pnpm (enforced via preinstall script)

### Key Architectural Patterns

#### 1. Template-Based Page System
All pages follow a consistent template pattern that connects Sanity schemas to React components:

```
Sanity Schema → GROQ Query → TypeScript Interface → React Component
```

#### 2. Dynamic Routing
- Single catch-all route: `/app/[[...slug]]/page.tsx`
- All content fetched dynamically from Sanity based on URL slug
- SEO metadata generated per page

#### 3. Component Architecture
```
components/
├── global/          # Reusable UI components
├── pages/           # Page-specific layouts  
└── ui/              # Base shadcn/ui components
```

## 📚 Working With Pages

### Understanding the Template Pattern

Each page in this system consists of **four interconnected parts**:

1. **Sanity Schema** (`/sanity/pages/PageXxxTemplate.tsx`)
2. **React Component** (`/components/pages/PageXxxJSX.tsx`)
3. **Registry Entry** (`/sanity/pages/index.ts`)
4. **Template Export** (`/sanity/pages/templates.ts`)

### Current Page Types

The repository includes these educational examples:

| Page Type | Purpose | Demonstrates |
|-----------|---------|-------------|
| `pageHome` | Homepage layout | Hero sections, testimonials, complex layouts |
| `pageAboutFounder` | About page | Personal branding, video integration, timeline |
| `pageLegal` | Legal/Terms page | Text-heavy content, rich text handling |
| `pageBlogOverview` | Blog listing | Dynamic content listing, pagination patterns |
| `pageBlogPost` | Individual blog post | Article layout, SEO optimization |

### How to Edit an Existing Page

#### Method 1: Edit Content (via Sanity Studio)

1. Navigate to http://localhost:3000/studio
2. Go to "Dashboard" → "Pages"
3. Select your page and edit content
4. Publish changes (live preview available)

#### Method 2: Edit Layout/Markup (via Code)

1. Identify the page type in Sanity Studio (e.g., "pageHome")
2. Find the corresponding component:
   ```
   /components/pages/PageHomeJSX.tsx
   ```
3. Edit the component to modify layout, styling, or functionality

### How to Create a New Page

Creating a new page requires following the template pattern:

#### Step 1: Create Sanity Schema Template

Create `/sanity/pages/PageExampleTemplate.tsx`:

```typescript
import { PageTemplate, PageTemplateSchema } from "@/sanity/templates";
import PageExampleJSX from "@/components/pages/PageExampleJSX";
import { BasePageQuery, definePageType } from "../globals/PageGlobals";
import { defineField, PortableTextBlock } from "sanity";

export const PageExampleType = definePageType({
  name: 'pageExample',
  title: 'Page Example',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'richtext',
    }),
  ],
})

export interface PageExampleSchema extends PageTemplateSchema {
  heroTitle: string;
  heroText: PortableTextBlock[];
}

export class PageExampleTemplate implements PageTemplate<PageExampleSchema> {
  title: string = 'Example';
  documentType: string = 'pageExample';
  schema: PageExampleSchema | undefined;
  
  query: (id: string) => string = (id: string) => `
    *[_type == "pageExample" && _id == "${id}"][0]{
      _type,
      _id,
      _rev,
      ${BasePageQuery},
      heroTitle,
      heroText,
    }
  `;
  
  component(data: PageExampleSchema): JSX.Element {
    return <PageExampleJSX data={data} />
  }
}

export default PageExampleTemplate;
```

#### Step 2: Create React Component

Create `/components/pages/PageExampleJSX.tsx`:

```typescript
import React from "react";
import { PageExampleSchema } from "@/sanity/pages/PageExampleTemplate";
import { PortableText } from "@portabletext/react";
import { richTextComponent } from "@/sanity/sanityPortableText";
import Header from "@/components/global/partials/Header";
import Footer from "@/components/global/partials/Footer";

export default function PageExampleJSX({ data }: { data: PageExampleSchema }) {
  return (
    <>
      <Header
        data={data.settings?.header}
        headerType={data.settings?.headerType}
        style={data.settings?.headerStyle}
      />
      
      <main>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">{data.heroTitle}</h1>
            <div className="prose">
              <PortableText
                value={data.heroText}
                components={richTextComponent}
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer data={data.settings?.footer} />
    </>
  );
}
```

#### Step 3: Register the New Page Type

Add to `/sanity/pages/index.ts`:

```typescript
import { PageExampleTemplate, PageExampleType } from "@/sanity/pages/PageExampleTemplate";

export const PageTypes = [
  // ... existing types
  PageExampleType,
];

export const PageTemplates: AvailablePageTemplates[] = [
  // ... existing templates
  {
    documentType: "pageExample",
    template: new PageExampleTemplate(),
  },
];
```

Add to `/sanity/pages/templates.ts`:

```typescript
export const PageTemplates: AvailablePageTemplates[] = [
  // ... existing templates
  {
    documentType: "pageExample",
  },
];
```

#### Step 4: Create Page in Sanity Studio

1. Restart your development server (`pnpm dev`)
2. Go to http://localhost:3000/studio
3. Navigate to "Dashboard" → "Pages"
4. Click "Create new document" → Select "Page Example"
5. Fill in content and **set slug with leading slash** (e.g., `/example`)
6. Publish the document

## 🛠️ Technical Deep Dive

### Project Structure

```
├── app/                          # Next.js App Router
│   ├── [[...slug]]/             # Dynamic catch-all route
│   │   ├── page.tsx             # Main page handler with SSR
│   │   └── layout.tsx           # Layout wrapper
│   ├── studio/                  # Sanity Studio route
│   ├── api/                     # API routes
│   │   ├── draft/               # Draft mode handling
│   │   ├── disable-draft/       # Disable draft mode
│   │   └── og/[path]/           # OpenGraph image generation
│   └── layout.tsx               # Root layout
│
├── components/                   # React components
│   ├── global/                  # Reusable components
│   │   ├── partials/            # Header, Footer, Forms
│   │   ├── performance-graph/   # Chart components
│   │   ├── popupVideoLayout/    # Video player components
│   │   └── [various].tsx        # UI components
│   ├── pages/                   # Page-specific components
│   │   ├── PageHomeJSX.tsx
│   │   ├── PageAboutFounderJSX.tsx
│   │   └── [others].tsx
│   └── ui/                      # shadcn/ui base components
│
├── sanity/                      # Sanity CMS configuration
│   ├── pages/                   # Page template definitions
│   │   ├── PageHomeTemplate.tsx
│   │   ├── index.ts             # Template registry
│   │   └── templates.ts         # Export definitions
│   ├── globals/                 # Global component schemas
│   │   ├── PageGlobals.ts       # Base page fields
│   │   ├── Header.ts            # Header configuration
│   │   ├── Footer.ts            # Footer configuration
│   │   ├── Forms.ts             # Form schemas
│   │   └── [others].ts
│   ├── lib/                     # Sanity utilities
│   │   ├── client.ts            # Sanity client configuration
│   │   ├── types.ts             # Generated types
│   │   └── definitions.ts       # Shared schemas
│   └── schema.ts                # Main schema export
│
├── helpers/                     # Utility functions
│   ├── formHandler.ts           # Generic form submission
│   ├── hubspot.ts               # [REMOVED] Business-specific
│   ├── segoe-ui.ts              # Font configuration
│   └── utilFunctions.tsx        # Shared utilities
│
├── lib/                         # Libraries
│   ├── utils.ts                 # General utilities
│   └── utilHooks.tsx            # Custom React hooks
│
├── scss/                        # SCSS styling
│   ├── global/                  # Global styles
│   └── studio/                  # Studio-specific styles
│
├── shadcn/ui/                   # shadcn/ui components
└── public/                      # Static assets
```

### Environment Variables

Required for full functionality:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
SANITY_API_READ_TOKEN=your_read_token

# Optional: Draft mode and preview
NEXT_PUBLIC_SANITY_API_WRITE_TOKEN=your_write_token
SANITY_REVALIDATE_SECRET=your_secret

# Optional: Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host
```

### Key Features Explained

#### 1. Live Preview System

The project includes Sanity's live preview system:
- **Draft Mode**: Preview unpublished content
- **Live Queries**: Real-time updates during development
- **Visual Editing**: Direct editing within the preview

#### 2. SEO & Performance

- **Dynamic Metadata**: Generated per page in `generateMetadata()`
- **OpenGraph Images**: Automatically generated at `/api/og/[path]/`
- **Image Optimization**: Next.js Image component with Sanity integration
- **ISR**: Incremental Static Regeneration with 60s revalidation

#### 3. Form Handling

Forms use a generic handler system:
- **Validation**: Zod schemas with React Hook Form
- **Internationalization**: German language defaults (educational example)
- **Extensible**: Easy to integrate with any backend service

#### 4. Animation System

- **Framer Motion**: Component animations and page transitions
- **GSAP**: Complex timeline animations
- **Performance**: Optimized with proper cleanup and lazy loading

## 🎨 Styling System

### Tailwind Configuration

The project uses a custom Tailwind setup with:

```typescript
// Custom color palette (neutral blues)
colors: {
  primary: '#2563eb',      // Blue-600
  secondary: '#1e40af',    // Blue-700  
  tertiary: '#dbeafe',     // Blue-100
  accent: '#3b82f6',       // Blue-500
}

// Typography
fontFamily: {
  sans: ["var(--segoe)", "sans-serif"],
  display: ["Inter", "system-ui", "sans-serif"],
}
```

### SCSS Integration

Complex components use SCSS modules:
- Global styles in `/scss/global/`
- Component-specific styles co-located
- CSS variables for theming

## 🔧 Development Patterns

### Best Practices Demonstrated

#### Component Design
```typescript
// Always use TypeScript interfaces
interface ComponentProps {
  data: SomeSchema;
  className?: string;
}

// Use proper prop destructuring
export default function Component({ data, className }: ComponentProps) {
  // Component logic
}
```

#### Sanity Integration
```typescript
// Use stegaClean for removing preview annotations
import { stegaClean } from "@sanity/client/stega";

const cleanData = stegaClean(rawData);
```

#### Performance Optimization
```typescript
// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

### Common Development Tasks

#### Adding a Global Component

1. Create component in `/components/global/`
2. Add Sanity schema in `/sanity/globals/`
3. Include in page templates as needed
4. Update TypeScript interfaces

#### Modifying Existing Pages

1. **Content changes**: Use Sanity Studio
2. **Layout changes**: Edit React component
3. **Schema changes**: Modify template file and restart dev server
4. **Styling changes**: Update Tailwind classes or SCSS

#### Debugging Tips

- **Live queries**: Check browser network tab for GROQ queries
- **Draft mode**: Use `/api/draft?slug=/your-page` to enable
- **Type errors**: Run `pnpm typecheck` regularly
- **Sanity data**: Inspect `data` props in React DevTools

## 🚀 Deployment

### Build Process

```bash
# Standard build
pnpm build

# Build with image optimization
pnpm build-w-imgs

# Production server
pnpm start
```

### Deployment Platforms

The project is optimized for:
- **Vercel** (recommended for Next.js)
- **Netlify** 
- **Docker** containers
- Traditional **Node.js** hosting

### Performance Considerations

- Static generation with ISR
- Image optimization via Next.js
- Code splitting by pages and components  
- Lazy loading for heavy components
- Optimized bundle size

## 🐛 Troubleshooting

### Common Issues

#### Sanity Connection Issues
```bash
# Check environment variables
echo $NEXT_PUBLIC_SANITY_PROJECT_ID

# Verify API tokens in Sanity dashboard
```

#### TypeScript Errors
```bash
# Run type checking
pnpm typecheck

# Regenerate Sanity types
# (Instructions in sanity.config.tsx)
```

#### Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Styling Issues
```bash
# Rebuild Tailwind
# Check for conflicting CSS

# Verify SCSS compilation
# Check browser DevTools for applied styles
```

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion API](https://www.framer.com/motion/)

### Learning Path
1. **Start with Next.js fundamentals**
2. **Understand React Server Components**
3. **Learn Sanity CMS concepts**
4. **Practice with the template pattern**
5. **Experiment with animations and performance**

---

## 🎯 Project Goals

This repository demonstrates production-ready patterns for:
- ✅ Modern web development workflows
- ✅ Headless CMS integration
- ✅ Performance optimization
- ✅ TypeScript best practices
- ✅ Component architecture
- ✅ SEO and accessibility
- ✅ Form handling and validation
- ✅ Animation and interactivity

**Perfect for developers learning modern web development or teams establishing new project standards.**
