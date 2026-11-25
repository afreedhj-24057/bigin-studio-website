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
  lib/                 release.ts (release/update data), tools.ts (UI tools data), ai-agents/ (AI Agent Setup)
  styles/              styles.css, ui-tools.css
public/
  assets/              Images, setup video, Zoho Puvi fonts
  dist/                Downloadable installers (.dmg) and the UX IntelliSense .vsix
  updates/             production.json, the release/update manifest
```

## AI Agent Setup

The landing page has a **Set up Bigin Studio with your AI agent** subsection of the Setup guide (`#agent-setup`). It lets a user hand the installation of the Bigin Studio desktop app to Claude Code. Claude Code is the only agent for now.

Code lives in `src/lib/ai-agents/`, kept separate on purpose:

| File | Concern |
| ---- | ------- |
| `agents.ts` | Agent configuration (name, CTA, launch URL builder). Add new agents here. |
| `install-prompt.ts` | The installation prompt text. Edit the wording here only. |
| `prepare.ts` | Prompt preparation and length check. |
| `launch.ts` | Clipboard copy and the OS launch attempt. |
| `fallback.ts` | The messages shown for each outcome. |

The UI is `src/components/sections/AiAgentSetup.tsx`.

### How the handoff works

When the user clicks **Continue with Claude** on a Mac:

1. The prompt is prepared and copied to the clipboard.
2. The browser opens `claude://code/new?q=<encoded prompt>`. This is the Claude desktop app's documented new-session link, and `q` pre-fills the prompt box. The prompt is **never sent automatically**. The user reads it and presses Enter.
3. The page shows what to do next. It never claims Claude is running the prompt.

### Limitations and fallback

- A browser cannot tell whether a custom URL scheme has a handler. The page treats the handoff as launched only if the page loses focus within about 2.5 seconds. Otherwise it says Claude did not respond, offers a **Get Claude Code** link and tells the user to open Claude and paste the copied prompt (the prompt is also shown in a box when the clipboard is blocked).
- Some browsers show an "Open Claude?" dialog the user must allow.
- On Windows, Linux and mobile the page does not try to launch anything, because Bigin Studio is macOS only. It copies the prompt and explains that.
- The `claude://code/new` link is documented for SSH sessions, where `q` is a listed parameter. Plain `q` use is not separately documented, so if the prompt box is empty after opening, the user pastes the clipboard copy. The terminal link `claude-cli://open?q=` is documented but opens a terminal and only works after Claude Code has registered its handler, so it is not used.
- The website never runs shell commands.

### What Claude may and may not do

Allowed, with the user's approval: inspect the Mac, check prerequisites, download the installer from the official site, install into `/Applications`, launch the app and help set the user name, default repository URL and project root folder.

Forbidden by the prompt: cloning repositories, creating BiginClient projects, creating or checking out branches, installing Bower dependencies for a project, running the Lyte server, modifying existing projects and publishing releases or tags. It also never asks for passwords or tokens in chat. Project creation stays a manual step inside Bigin Studio.

## Releases and downloads

Installers are served from `public/dist/`, and the version metadata is in `public/updates/production.json`. To publish a new release, add the new binaries to `public/dist/`, update `production.json`, and rebuild.

## Theming

The site follows the Bigin Studio app's light palette and adds a derived dark theme. The default is System, and the header button cycles System, Light and Dark. See [THEME-NOTES.md](THEME-NOTES.md) for the design tokens and how the theme works.

## Further reading

- [BIGIN-STUDIO-FEATURES.md](BIGIN-STUDIO-FEATURES.md): features, installation and user guide for the app (v0.1.0)
- [THEME-NOTES.md](THEME-NOTES.md): theme and design token notes
