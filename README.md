# UnitConverter

A fast, visual, SEO-first unit converter that helps people compare, understand, and reuse conversions instantly.

Built completely static-first as a micro-SaaS utility.

## Features

- **Instant Visual Conversion:** Zero-latency math using pre-calculated conversion factors and specific formulas (like Celsius to Fahrenheit).
- **Programmatic SEO Paths:** Over 100 uniquely pre-rendered static routes representing popular pairs (e.g., `/convert/cm-to-inches`).
- **SEO & Canonical URLs:** URL state synchronization meaning `?value=10` updates instantly on client without ruining the main canonical canonical path for crawlers.
- **Microdata & JSON-LD:** Every pair route automatically generates Google-friendly `WebApplication` and `FAQPage` markup schema.
- **Copy & Share Links:** Easy 1-click sharing of the URL's exact state.
- **Content System:** Uses `@next/mdx` to serve robust SEO cheat-sheet guides alongside standard app components.
- **100% Static Export:** Highly optimized zero-backend configuration designed for extremely cheap, scalable deployments on Vercel or similar CDNs.

## Tech Stack

- **Framework:** Next.js 15 (App Router, `output: export`)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Testing:** Playwright E2E integration verification
- **Deployment:** Vercel

## Structure

- `src/lib/conversion.ts`: Abstraction that bridges the gap between base conversion factors (`units.json`) and specific formula overrides (Temperature).
- `src/data/`: Simple offline JSON stores acting as the CMS for unit definitions and generating the programmatic pair configurations.
- `src/app/convert/[slug]/page.tsx`: Dynamically generates the 100+ unique unit permutation pages, generating `generateStaticParams`, structured JSON-LD schemas, and `generateMetadata`.
- `content/guides/`: MDX-driven reference pages.

## Getting Started

First, install the packages:
`npm install`

Run the local development server:
`npm run dev`

Build for production (Static Export):
`npm run build`

## Running Verification Tests

Playwright E2E visual/behavioral tests:
`npx playwright test`
