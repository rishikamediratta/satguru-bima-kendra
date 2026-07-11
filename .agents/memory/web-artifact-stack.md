---
name: web-artifact-stack
description: What web artifact stack this workspace actually supports, and how to adapt Next.js-style requests.
---

This Replit workspace's `createArtifact` web artifact type is `react-vite` (Vite + React + TypeScript + Tailwind + wouter router + shadcn-style `components/ui`), not Next.js.

**Why:** A user requested a Next.js 15 site; Next.js is not an available artifact kind here, so the build must substitute react-vite as the closest equivalent.

**How to apply:** When a user asks for Next.js (or any framework not offered by artifact creation), tell them upfront you're substituting the closest supported stack, then manually reimplement Next-specific features:
- Metadata API → hardcoded meta/OG/Twitter tags in `index.html` + a reusable `SEOHead` component that updates `document.title`/meta description per route on mount.
- `robots.ts` / `sitemap.ts` → static `public/robots.txt` and `public/sitemap.xml`.
- App Router file-based routing → `wouter`'s `Switch`/`Route` in `App.tsx`.
