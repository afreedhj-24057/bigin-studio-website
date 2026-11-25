/**
 * The Bigin Studio installation prompt. This is content only: no UI, no launch logic.
 * Keep it compact. It is also sent in a deep-link URL, so it must stay under PROMPT_MAX_LENGTH
 * (checked in prepare.ts). Edit the wording here; nothing else needs to change.
 */
export const SITE_URL = 'https://bigin-studio.onslate.in/';

export const INSTALL_PROMPT = `Help me install and configure the Bigin Studio desktop app on this Mac. Work step by step and explain what you do.

SOURCE OF TRUTH
Read the whole official site first: ${SITE_URL} (install, setup, FAQ, security). Download only from that site (the release manifest is ${SITE_URL}updates/production.json). Do not use any other source.

STEPS
1. Ask me to confirm I have administrator access on this Mac (needed to install apps). Do not inspect my account; just ask and wait. If I don't have it, stop and use no workarounds (no other install folder, no sudo, no permission changes) until I say I have it, then continue from step 2.
2. Inspect this Mac: macOS version and whether it is Apple Silicon (arm64) or Intel (x64).
3. Check prerequisites with --version only: Git, Node.js, npm, Bower, and anything else the site lists. Report what is installed, missing or incompatible. Never install or upgrade anything without my approval; explain why first.
4. Download the installer matching this Mac's architecture from the official site. If the manifest lists a SHA-256, verify it. Report the version and result.
5. Install Bigin Studio into /Applications (mount the DMG, copy the app, eject the DMG). Keep the DMG unless I approve deletion. Get my approval before overwriting an existing install.
6. If macOS blocks the app, use only the steps documented on the site (right-click > Open, or System Settings > Privacy & Security > Open Anyway). Never disable Gatekeeper or run sudo without my explicit approval.
7. Launch Bigin Studio from /Applications, wait for it to initialize, and confirm the main window opens. Report startup errors; no unrelated fixes.
8. Configure Bigin Studio now that it has launched. Do not use its Settings screen. Find the installed app's actual config.json, show me its exact path and current contents, and set ONLY these three fields, keeping every other field unchanged:
   - userName: read the email configured in Claude Code on this Mac. If it is a Zoho corporate email (zohocorp.com or another verified Zoho corporate domain), use the part before the @ (john.doe@zohocorp.com becomes john.doe). Never use the display name or full email. If the email is unavailable or not a Zoho corporate email, stop and ask me for my Zoho username; do not guess.
   - defaultRepositoryUrl: exactly https://zrepository.zohocorpcloud.in/zohocorp/bigin/ignite.git.
   - projectRootFolder: do NOT open a folder picker straight away.
     a) First explain in one or two sentences: this is the parent folder where Bigin Studio creates and stores my projects, each one a separate Git clone in its own subfolder. The default is ~/Bigin Studio Projects. Suggest a dedicated or empty folder.
     b) Then ask me a question I must answer before you continue: "Choose a folder" (open the picker) or "Use the default" (use ~/Bigin Studio Projects, no picker).
     c) Only after I answer "Choose a folder", open a native macOS folder picker (osascript choose folder) whose prompt restates the purpose, e.g. "Choose the folder where Bigin Studio will store your projects".
     d) Use the absolute path I choose, without a trailing slash. If I cancel the picker, tell me and ask again: pick again or use the default. Do not create the folder.
     e) The app may store this under a different key (e.g. projectRoot). Use the key the app actually reads and tell me which one it is.
   Show a before and after comparison of the three fields and wait for my explicit approval before editing. Then edit, validate the JSON, and read the file again to verify the saved values.
9. Summarise: macOS and architecture, installed version, checksum result, install location, prerequisites, config.json path, the three configured values, and whether the app launched.

STRICT RULES
- Ask for my approval before installing software, changing system configuration, or editing config.json.
- Never ask me to type passwords or tokens into this chat; I will enter them in the app myself.
- This is only about installing and configuring the desktop app. Do NOT:
  - clone any Git repository
  - create a BiginClient project (I will do that myself inside Bigin Studio)
  - create or check out Git branches
  - run bower install for a project
  - run the Lyte development server
  - modify any existing repository or project, or any other file or setting
  - publish releases or create tags
- If a step needs something forbidden above, stop and tell me instead.`;
