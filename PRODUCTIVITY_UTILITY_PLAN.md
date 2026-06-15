# Universal Productivity Utility: Implementation Plan

## Vision

Transform the current unit converter into a magic-feeling, keyboard-first "universal productivity utility". It will act as a frictionless intelligence layer for developers, creators, and professionals, transitioning from a basic calculator to an everyday workspace application (similar to Raycast, Notion, or Linear).

## 1. UI/UX Design Principles

### Keyboard-First Command Palette (⌘+K)
- **Global Invocation:** A floating, instantly accessible command bar (`Cmd+K` or `/`) that acts as the primary interface.
- **Frictionless Entry:** No need to select categories first. Users type naturally (e.g., "5'11 to cm", "100 usd in inr", "#FF5733 to rgb").
- **Live Preview:** Results appear instantly as the user types, with visual feedback (rulers for length, color swatches for hex codes).
- **Shortcuts:** `Space` to swap units, `Cmd+C` to copy, `Enter` to open detailed view, `Arrow` keys for history.

### Visual & Interactive Feedback
- **Visual Converters:** E.g., showing a literal color swatch for Hex->RGB, a visual ruler for inches->cm, or aspect ratio boxes for screen dimensions.
- **Formula Intelligence:** Display the underlying formula, explanation, and derivation below the result.
- **Theme System:** High-contrast Dark Mode, Minimal Light Mode, Hacker/Terminal Mode, and Neon Mode.

### Workspace Mode
- **Dashboard:** Side-by-side or grid layout for multiple conversions.
- **Pinning:** Pin specific converters (e.g., a live JSON size estimator next to a px-to-rem converter).

---

## 2. Architecture & Data Models

### Data Model: Workspaces & History
```typescript
interface ConversionHistoryItem {
  id: string;
  query: string; // e.g. "12 px to rem"
  fromValue: number | string;
  fromUnit: string;
  toValue: number | string;
  toUnit: string;
  timestamp: number;
  category: string;
}

interface Workspace {
  id: string;
  name: string;
  pinnedConversions: string[]; // IDs of specific conversion setups
  theme: 'dark' | 'light' | 'hacker' | 'neon';
}

// LocalStorage or IndexedDB for persistence
const storage = {
  history: ConversionHistoryItem[],
  workspaces: Workspace[],
  favorites: string[],
};
```

### NLP Parsing Engine (Pseudo-code)
```typescript
function parseNaturalLanguage(query: string): ConversionIntent | null {
  const normalized = query.toLowerCase().trim();

  // Regex matchers for patterns
  const numberRegex = /[\d.,]+/;
  const unitRegex = /[a-zA-Z%'"$]+/;

  // Example pattern: "5'11 to cm"
  if (isHeightPattern(normalized)) {
    return parseHeight(normalized);
  }

  // Example pattern: "100 usd in inr" or "100usd to inr"
  const match = normalized.match(/^([\d.,]+)\s*([a-z]+)\s*(?:to|in)\s*([a-z]+)$/);
  if (match) {
    const [, value, fromUnit, toUnit] = match;
    return {
      value: parseFloat(value),
      fromUnit: resolveUnitAlias(fromUnit),
      toUnit: resolveUnitAlias(toUnit)
    };
  }

  return null;
}
```

### Smart Suggestions Engine
```typescript
function getSuggestions(intent: ConversionIntent): Suggestion[] {
  const suggestions = [];

  if (intent.fromUnit === 'px' && intent.toUnit === 'rem') {
    suggestions.push({ type: 'action', label: 'Generate Tailwind Config' });
    suggestions.push({ type: 'related', label: 'View viewport scaling rules' });
  }

  if (intent.category === 'color') {
    suggestions.push({ type: 'action', label: 'Generate matching color palette' });
  }

  return suggestions;
}
```

---

## 3. Offline/PWA Setup

### Next.js PWA Implementation
- Use `next-pwa` (or custom Service Worker) configured for static export (`output: export`).
- **Manifest (`public/manifest.json`):** Define icons, theme colors, display mode (`standalone` or `minimal-ui`).
- **Service Worker (`worker.js`):** Cache all static assets (HTML, CSS, JS), unit JSON files, and WASM modules (if any).
- **Offline Strategy:** Cache-first for core assets, Network-first for dynamic updates (though mostly offline-first).

---

## 4. Programmatic SEO Architecture

### Expanding `generateStaticParams`
- Combine categories and generate thousands of paths using a node script that iterates over all valid pairs in `units.json`.
- **URL Structure:** `/convert/[from]-to-[to]` (e.g., `/convert/px-to-rem`).
- **Metadata:** Dynamic titles ("Convert PX to REM instantly") and descriptions based on the specific pair.
- **JSON-LD:** Inject `FAQPage` schema (e.g., "How many pixels in 1 rem?").
- **Content:** Auto-generate comparison tables and formula explanations for each page.

---

## 5. Phased Roadmap

### Phase 1: Core UX & Intelligence (Highest ROI)
- **Natural Language Parsing:** Implement the regex/rules engine to parse free-text inputs.
- **Command Palette (⌘+K):** Build the global floating search bar overlay.
- **Keyboard-First Navigation:** Add shortcuts (`/`, `Space`, `Cmd+C`).

### Phase 2: Developer Suite & Expansion
- **Developer Units:** Add PX ↔ REM, Hex ↔ RGB ↔ HSL, Viewport calculators.
- **Visual Widgets:** Implement color swatches and rulers.
- **Smart Suggestions:** Add contextual recommendations post-conversion.

### Phase 3: Retention & Offline (PWA)
- **Offline Mode:** Implement Service Worker and PWA manifest.
- **History & Favorites:** Persist recent queries in `localStorage`.
- **Formula Explorer:** Add the visual formula layer beneath results.

### Phase 4: Scale & Ecosystem
- **Programmatic SEO:** Expand the unit definitions and auto-generate 1,000+ landing pages.
- **Workspace Mode:** Dashboard layout for multiple pinned conversions.
- **Theme System:** Add Dark, Hacker, and Neon modes.
- **Browser Extension Prep:** Refactor core logic into an isolated package for future extension use.
