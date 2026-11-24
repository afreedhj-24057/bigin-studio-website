# Bigin Studio Website

Marketing and download site for **Bigin Studio**. It is built with Next.js (App Router), React 19 and TypeScript, and exported as a static site for Zoho Catalyst Slate.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command         | Description                                              |
| --------------- | -------------------------------------------------------- |
| `npm run dev`   | Start the development server                             |
| `npm run build` | Create a production build and static export in `out/`    |
| `npm run start` | Start the Next.js production server                      |

## Deployment

`next.config.mjs` sets `output: 'export'` and `trailingSlash: true`, so `npm run build` writes a fully static site to `out/`. Any static host can serve it, and it is configured for Zoho Catalyst Slate. Image optimization is disabled because it needs a server.

## Project structure

```
src/
  app/                 Routes: / (landing page) and /ui-tools
  components/          Shared components (Header, Footer, Faq, Accordion, ...)
  components/sections/ Landing page sections (Hero, Features, Installation, ...)
  lib/                 release.ts (release/update data), tools.ts (UI tools data)
  styles/              styles.css, ui-tools.css
public/
  assets/              Images, setup video, Zoho Puvi fonts
  dist/                Downloadable installers (.dmg) and the UX IntelliSense .vsix
  updates/             production.json, the release/update manifest
```

## Releases and downloads

Installers are served from `public/dist/`, and the version metadata is in `public/updates/production.json`. To publish a new release, add the new binaries to `public/dist/`, update `production.json`, and rebuild.

## Theming

The site follows the Bigin Studio app's light palette and adds a derived dark theme. The default is System, and the header button cycles System, Light and Dark. See [THEME-NOTES.md](THEME-NOTES.md) for the design tokens and how the theme works.

## Further reading

- [BIGIN-STUDIO-FEATURES.md](BIGIN-STUDIO-FEATURES.md): features, installation and user guide for the app (v0.1.0)
- [THEME-NOTES.md](THEME-NOTES.md): theme and design token notes
