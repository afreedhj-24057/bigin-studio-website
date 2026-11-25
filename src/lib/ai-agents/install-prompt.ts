/**
 * The Bigin Studio installation prompt. This is content only: no UI, no launch logic.
 * Keep it compact. It is also sent in a deep-link URL, so it must stay under PROMPT_MAX_LENGTH
 * (checked in prepare.ts). Edit the wording here; nothing else needs to change.
 */
export const SITE_URL = 'https://bigin-studio.onslate.in/';

export const INSTALL_PROMPT = `Help me install and configure the Bigin Studio desktop app on this Mac. Work step by step and tell me what you are doing.

SOURCE OF TRUTH
Read the whole official site first: ${SITE_URL} (installation, setup guide, FAQ, security). Download only from that site (the release manifest is ${SITE_URL}updates/production.json). Do not use any other source.

STEPS
1. Ask me to confirm I have administrator access on this Mac, which is needed to install apps. Do not inspect my account; just ask and wait for my answer. If I don't have it yet, do not continue and do not try workarounds (no other install folder, no sudo, no permission changes). Wait until I tell you I have admin access (I may need to request it from my IT admin), then continue from step 2.
2. Inspect this Mac: macOS version and whether it is Apple Silicon (arm64) or Intel (x64).
3. Check prerequisites with --version only: Git, Node.js, npm, Bower, and anything else the site lists. Report what is missing. Never install anything without my approval, and explain each install first.
4. Download the installer matching this Mac's architecture from the official site. If the manifest lists a SHA-256, verify it.
5. Install Bigin Studio into /Applications (mount the DMG, copy the app, eject the DMG, delete the downloaded file only if I agree).
6. If macOS blocks the app, use only the steps documented on the site (right-click > Open, or System Settings > Privacy & Security > Open Anyway). Never disable Gatekeeper or run sudo without my explicit approval.
7. Launch Bigin Studio and confirm it opens.
8. Configure its Settings (gear icon). Ask me for each value; do not guess:
   - User Name: my Zoho Corp username, not my display name or full email.
   - Default Repository URL: the default internal Bigin repository URL.
   - Project Root Folder: my preferred folder (default ~/Bigin Studio Projects).
   Guide me through the Settings screen. Only edit the app's config.json if I approve, show the change first, and touch only these three fields.
9. Verify the install and settings, then summarise what was done.

STRICT RULES
- Ask for my approval before installing software or changing system configuration.
- Never ask me to type passwords, tokens or build tokens into this chat. If one is needed, I will enter it myself in the app.
- This is only about installing and configuring the desktop app. Do NOT:
  - clone any Git repository
  - create a BiginClient project (I will do that myself inside Bigin Studio)
  - create or check out Git branches
  - run bower install for a project
  - run the Lyte development server
  - modify any existing repository or project
  - publish releases or create production tags
- If a step needs something forbidden above, stop and tell me instead.`;
