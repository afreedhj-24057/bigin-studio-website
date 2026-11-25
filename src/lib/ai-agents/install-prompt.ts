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
3. Check prerequisites with --version only: Git, Node.js, npm, Bower, and anything else the site lists. Report what is installed, missing or incompatible. Never install or upgrade anything without my approval, and explain each install first.
4. Download the installer matching this Mac's architecture from the official site. If the manifest lists a SHA-256, verify it and report the version, architecture and result.
5. Install Bigin Studio into /Applications (mount the DMG, copy the app, eject the DMG). Keep the downloaded DMG unless I approve deleting it. If an app is already installed, explain the implications and get my approval before overwriting.
6. If macOS blocks the app, use only the steps documented on the site (right-click > Open, or System Settings > Privacy & Security > Open Anyway). Never disable Gatekeeper or run sudo without my explicit approval.
7. Configure Bigin Studio BEFORE launching it. Do not open the app or use its Settings screen. Find the installed app's actual config.json, show me its exact path and current contents, and set ONLY these three fields, keeping every other field unchanged:
   - userName: read the email configured in Claude Code on this Mac (never expose tokens or credentials). If it is a Zoho corporate email (zohocorp.com or another verified Zoho corporate domain), use the part before the @ (john.doe@zohocorp.com becomes john.doe). Never use the display name or full email. If the email is unavailable or not a Zoho corporate email, stop and ask me for my Zoho username; do not guess.
   - defaultRepositoryUrl: exactly https://zrepository.zohocorpcloud.in/zohocorp/bigin/ignite.git (do not change or normalize it).
   - projectRootFolder: open a native macOS folder picker (for example osascript choose folder) and use the absolute path I choose. If I cancel, use ~/Bigin Studio Projects. Do not create the folder.
   Show a before and after comparison of the three fields and wait for my explicit approval before editing. Then edit, validate the JSON, and read the file again to verify the saved values.
8. Launch Bigin Studio from /Applications, wait for it to initialize, and confirm the main window opens. Report any startup errors without attempting unrelated fixes.
9. Summarise: macOS version and architecture, installed version, checksum result, install location, prerequisite status, config.json path, userName, default repository URL, project root folder, and whether the app launched.

STRICT RULES
- Ask for my approval before installing software, changing system configuration, or editing config.json.
- Never ask me to type passwords, tokens or build tokens into this chat. If one is needed, I will enter it myself in the app.
- This is only about installing and configuring the desktop app. Do NOT:
  - clone any Git repository
  - create a BiginClient project (I will do that myself inside Bigin Studio)
  - create or check out Git branches
  - run bower install for a project
  - run the Lyte development server
  - modify any existing repository or project, or any other file or setting
  - publish releases or create production tags
- If a step needs something forbidden above, stop and tell me instead.`;
