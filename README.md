# The AI Builder's Handbook

A senior-engineered guide to full-stack development with AI. Not a tutorial — a production-grade reference for developers who want to build real systems, not prototype toys.

**Built by CyderCoder. Designed for builders.**

---

## Project Structure

```
fullstackplaybook/
│
├── content/                              # All handbook chapters (MDX)
│   ├── part-2-ai-foundations.mdx         # LLMs, Tokens, Embeddings, RAG, MCP, Agents
│   ├── part-3-framework-thinking.mdx     # JS Tax, SSR/SSG/ISR/PPR, Astro vs Next.js
│   ├── part-4-ai-workflow.mdx            # Multi-tool orchestration, scaffold vs handoff
│   ├── part-5-production-and-ops.mdx     # .env security, CI/CD, Docker, logging
│   ├── part-10-design-systems.mdx        # Typography, color, Bento grids, Three.js, GSAP
│   └── part-search-integration.mdx       # Pagefind setup, command palette component
│
├── index.html                            # Static shell (standalone, non-Astro preview)
├── astro.config.mjs                      # Astro site configuration
├── package.json                          # Dependencies and build scripts
├── .gitignore                            # Ignored files
├── .env.example                          # Environment template
└── README.md                             # This file
```

---

## Content Index

| Part | Title | Topics | Difficulty |
|------|-------|--------|------------|
| **II** | AI Foundations | LLMs, Tokens, Tokenization, Context Window, Embeddings, RAG, MCP, Temperature, Top P, Function Calling, Agents, Reasoning Models | Foundational |
| **III** | Framework Thinking | JavaScript Tax, SSG, ISR, SSR, PPR, CSR, Astro Islands, Next.js App Router, Server Components, Core Web Vitals | Senior |
| **IV** | The AI Workflow | Vibe Coding Myth, Five Levels of AI Tooling, Multi-Tool Lifecycle, Spec-First Building, Anti-Patterns | Senior |
| **V** | Production & Operations | Environment Variables, CI/CD Pipelines, Docker, Rate Limiting, Structured Logging, Migrations, Incident Response | Senior |
| **X** | Design Systems & Motion | Typography Scale, Color System, Bento Grid, Three.js, GSAP, Skeleton States, Component Anatomy | Senior |
| **Addendum** | Search Integration | Pagefind Setup, Content Targeting, Command Palette, Keyboard Navigation | Senior |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Astro development server (no search index) |
| `npm run build` | Build static site + generate Pagefind search index |
| `npm run preview` | Serve the production build locally |
| `npm run search:dev` | Serve the production build locally (alias for `preview`). **Requires `npm run build` first.** |
| `npm run check` | Run Astro TypeScript type-checker |

> **Windows note:** The Pagefind binary requires the [MSVC C++ Runtime](https://aka.ms/vs/17/release/vc_redist.x64.exe).
> If the runtime is missing, `npm run build` completes without a search index (local dev only).
> The index is always built in CI/CD (Linux), so search works in production.

---



### Prerequisites

- **Node.js** 20+ (`node --version`)
- **pnpm** 9+ (`pnpm --version`) — or npm/yarn
- **Git**

### Setup

```bash
# Clone the repository
git clone https://github.com/javex-12/AI-Full-Stack-Playbook.git
cd fullstackplaybook

# Install dependencies
pnpm install

# Start development server
pnpm dev
# → Opens at http://localhost:4321
```

### Build for Production

```bash
# Build static site + generate search index
pnpm build

# Output in dist/ directory
# Search index in dist/pagefind/

# Preview the production build locally
npx serve dist
# Or use Pagefind's local server with search
pnpm search:dev
# → Opens at http://localhost:1414
```

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments on every push to `main`.

### Netlify

```bash
# Build command
pnpm build

# Publish directory
dist

# Install command
pnpm install
```

### Cloudflare Pages

```bash
# Build command
pnpm build

# Build output directory
dist

# Node.js version
20
```

### Static Hosting (Any)

The output is pure static HTML/CSS/JS. Upload the `dist/` directory to any static host:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Surge.sh (`surge dist`)

---

## Adding New Chapters

1. Create a new `.mdx` file in `content/`:

```markdown
---
title: "Your Chapter Title"
part: 6
section: "Your Section"
keywords: ["keyword1", "keyword2"]
difficulty: "Senior"
lastUpdated: "2026-07-11"
---

## 01. Section Heading

Your content here...
```

2. Follow the existing formatting patterns:
   - Section numbers: `## 01.`, `## 02.`, etc.
   - Callouts: `> **Label:** Content`
   - Code blocks: triple backticks with language identifier
   - Tables: standard markdown table syntax
   - Senior Moves: numbered list after major sections

3. Build to regenerate the search index:

```bash
pnpm build
```

---

## Search

Search is powered by **Pagefind** — a static search library that runs entirely in the browser. No server required.

- Search index is generated at build time (`pnpm build`)
- Loads ~30KB of WASM on first search interaction
- Supports keyboard navigation (Cmd+K to open, arrows to navigate)
- Results include highlighted excerpts with context

Test search locally:

```bash
pnpm build && pnpm search:dev
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Astro | Static-first, zero JS by default |
| Content | MDX | Markdown with component support |
| Search | Pagefind | Static full-text search (Rust/WASM) |
| Styling | Custom CSS | Design system with CSS custom properties |
| Deployment | Vercel / Any static host | Zero-config deployment |

---

## Design System

The handbook uses a custom dark editorial design system:

- **Background:** `#0a0f0d` (organic near-black, never pure black)
- **Accent:** `#3ad29f` (aqua glow for actions and focus)
- **Typography:** Inter (sans-serif) + JetBrains Mono (code)
- **Layout:** 12-column Bento grid with intentional whitespace
- **Motion:** Physics-aware easing, staggered reveals, skeleton states

---

## License

Built with purpose. Use freely for educational and commercial projects.

**CyderCoder — The AI Full-Stack Playbook**
