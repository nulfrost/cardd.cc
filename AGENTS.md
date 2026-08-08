# cardd

SVG badge service for npm package authors, deployed to Cloudflare Workers.

## Stack

- **Runtime:** Cloudflare Workers (via Wrangler)
- **Framework:** Hono (SSR, routing)
- **Rendering:** satori (JSX → SVG)
- **Caching:** KV — full URL key, 1hr TTL, check-first
- **Fonts:** Datatype (bundled), Google Fonts (fetched on-demand → KV cache)
- **Package manager:** pnpm

## Routes

| Route | Example | Source |
|---|---|---|
| `/badge/*` | `/badge/license-MIT?bg=555` | Static label\|value |
| `/npm/v/:pkg` | `/npm/v/express` | registry.npmjs.org |
| `/npm/d/:pkg` | `/npm/d/express` | api.npmjs.org |
| `/fonts/Datatype-Regular.ttf` | (internal) | Bundled font asset |
| `/` | Landing page | Inline HTML |

Static badges use the path segment after `/badge/`, splitting on the first `-` to separate label from value.

## CSS customization (query params)

| Param | Example | Default |
|---|---|---|
| `bg` | `bg=2ea44f` | `#2d2d2e` |
| `color` | `color=fff` | `#fff` |
| `radius` | `radius=8` | `4` |
| `border` | `border=2+solid+333` | none |
| `borderColor` | `borderColor=f00` | `#2d2d2e` |
| `font` | `font=Inter` | `Datatype` |

Plus `+` is used as the border shorthand delimiter. Hex values omit `#`.

## Design decisions

- **Single background, pipe separator** — ASCII-aesthetic label|value layout, not shields.io's two-tone split.
- **satori over manual SVG** — Enables JSX-based layouts with flexbox, dynamic text measurement, and arbitrary CSS without manual character-width heuristics.
- **Datatype bundled, Google Fonts fetched** — Datatype is a GitHub-hosted font not served by the Google Fonts CSS API, so it's imported as a binary module (configured via `rules` in `wrangler.json`). Other fonts fetch from Google Fonts on-demand and cache in KV for 30 days.
- **KV caching by full URL** — SVGs are cached including query params. 1hr TTL. Check-first strategy. No stale-while-revalidate yet.
- **Error handling** — Stale KV entries are served if they exist. Otherwise descriptive error badges render (e.g. `pkg | not found`, `npm | timeout`).
- **`moduleResolution: "Node16"`** — Required for proper ESM module resolution with `.js` extension imports mapping to `.ts` source files.

## Project structure

```
src/
├── index.ts            # Hono app, landing page, font route
├── renderer.tsx        # satori JSX badge component + render functions
├── types.d.ts          # TypeScript declarations for .ttf imports
├── routes/
│   └── npm.ts          # static, version, downloads handlers
└── utils/
    ├── cache.ts        # KV read/write wrapper
    ├── css.ts          # URL query param → BadgeCSS parsing
    └── fonts.ts        # Font loading (bundled Datatype + Google Fonts)
fonts/
└── Datatype-Regular.ttf

wrangler.json           # Worker config, KV bindings, module rules
tsconfig.json
```

## KV namespaces

| Namespace | ID | Purpose |
|---|---|---|
| `cardd-cache` | `6cc8e4b4...` | Production |
| `cardd-cache-preview` | `5bb93eee...` | Preview / `wrangler dev` |

## Commands

```
pnpm dev          # wrangler dev
pnpm deploy       # wrangler deploy
pnpm typecheck    # tsc --noEmit
```
