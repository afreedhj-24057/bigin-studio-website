# Theme notes — Bigin Studio landing page

Source of truth: `../bigin-studio/styles.css` (read-only). The app has a **single light theme**
(no dark mode, no `prefers-color-scheme`, no theme switcher).

## Dark theme + toggle (added later — not from the app)
Because the app defines no dark theme, the dark palette on this page is **derived, not inherited**:
surface `#182126` and text `#e9f2ef` come from the app's `.output` panel; `--bg #111618`, `--line #2a363c`,
`--line-strong #3b4a51`, `--muted #9fb0ab`, `--mint-50/100`, `--brand-ink #5fd08d` and the dark shadows are
new values. `--brand`, `--brand-hover`, `--accent-cyan`, radii and fonts are unchanged.
- Default is **System** (follows `prefers-color-scheme`, updates live). The header button cycles
  System → Light → Dark; an explicit choice is saved in `localStorage` (`bs-theme`), System clears it.
- Implemented as `:root[data-theme="dark"]` + a `prefers-color-scheme` media query for the no-choice case.
  An inline `<head>` script applies a saved choice before first paint (no flash).

## Tokens reused verbatim from the app `:root`
`--ink #182126`, `--muted #6b767c`, `--line #dfe6e2`, `--line-strong #c9d3cf`, `--bg #f5f8f6`,
`--surface #fff`, `--brand #25a45a`, `--brand-hover #1e8f4d`, `--brand-ink #1a7a43`,
`--mint-50 #f1faf5`, `--mint-100 #dff3e7`, `--mint-glow`, `--accent-cyan #1fb6c9`,
`--radius 8px`, `--radius-lg 12px`, `--shadow-sm/md`, `--ease .16s ease`, spacing scale 4–48px.

## Component mapping
| Landing element | App origin |
|---|---|
| Nav bar (78px, translucent white, 1px line) + brand lockup (logo · separator · "Bigin" + underlined cyan "Studio") | `.topbar`, `.brand*` |
| Buttons (44px, 8px radius, 600 weight, green fill, hover darkens + green shadow); ghost = `.button.secondary` | `.button` |
| Hero (mint gradient + radial glow, `-.04em` tracking, green `em` accent) | `.hero`, `.hero h1 em` |
| Cards / download cards (white, 1px line, 12px radius, hover → green border + lift) | `.project-card`, `.panel` |
| Kicker labels (11px, .14em tracking, `--brand-ink`) | `.kicker` |
| Pills / chips | `.count` |
| Dark code/terminal blocks (`#182126`, `#dbe5e3`, `#bbd1ca`) | `.output` panel |
| Focus ring (2px cyan, 2px offset) | `.button:focus-visible` |
| Font: Zoho Puvi 300–700 (copied from `bigin-studio/assets/fonts`), logo `bigin-logo.png` | app assets |

## Assumptions / deviations (not silently invented)
- **Font weights**: only 300/400/500/600/700 of Zoho Puvi are bundled (app has 100–950); the page uses nothing heavier than 700.
- **Mono font**: `ui-monospace, SFMono-Regular, Menlo, monospace` — same stack as the app's `.output pre`.
- **Terminal accents** (`#6fd9a0`, `#3ccf7c`, `#7f9a93`, `#8fa8a1`): the app defines no terminal accent colours on its `.output` panel; these are lighter tints of `--brand` chosen for legibility on `#182126`.
- **Git status letters** in the mockup: `M` uses `#a9740a` (amber), not an app token; `A` uses `--brand-ink`.
- **Contrast**: white text on `--brand #25a45a` is ≈3.1:1 (below WCAG AA for small text). It is kept because it is the app's actual button colour; text links, kickers and chips use `--brand-ink` (≈5.4:1). Darken `.btn` to `--brand-ink` if strict AA is required.
- **Layout** is marketing-style (centered hero, sections), not a copy of the app's dashboard; the hero mockup is a simplified light illustration of the app UI.
- Page-only values with no app equivalent: `--maxw 1160px` container, `--warn` (unused badge amber), section paddings, mobile breakpoints.
- No Catalyst content is included; `bigin-studio/` was not modified.
