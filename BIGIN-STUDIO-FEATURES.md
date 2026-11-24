# Bigin Studio: Features, Installation and User Guide

Version described: **0.1.0**. This document is based on inspection of the source code (main process, renderer, `lib/` managers, packaging configuration and the bundled AI kit), not on assumptions.

**Status labels used throughout**

| Label | Meaning |
| --- | --- |
| **Implemented** | Works end to end in the current code. |
| **Partial** | Works, but with a clear limitation described next to it. |
| **Hidden** | Built in the code but not reachable from the current UI. |
| **Not available** | Not present in the code. Listed so nobody expects it. |

---

## 1. Introduction

Bigin Studio is a desktop application for the Bigin client team. It replaces a long manual checklist (clone the repository, check out a branch, set up AI tooling, install dependencies, start the dev server, open an editor and a terminal) with one guided workflow in a single window.

This document explains what the app does, how to install it on a Mac, how to use it, and where its limits are.

> **Scope note.** The app also contains a Catalyst deployment feature. As requested, it is intentionally not covered here.

---

## 2. What is Bigin Studio?

Bigin Studio is a macOS-first desktop app built with Electron. It targets developers who work on the **Bigin web client** (the Lyte-based front end in the `webapps/BiginClient` folder of the internal repository).

It is a workspace launcher and control panel. It does not edit code itself. It prepares a project, runs the tools around it, and hands you off to your editor.

**Primary purpose:** get a developer from "nothing on disk" to "running Bigin web client with AI assistance configured" with a minimum of manual steps, and keep daily Git and dev-server tasks in one place.

**Intended audience:** members of the Bigin client team who have access to the internal Git repository.

**What makes it useful for the Bigin client team**

- One repeatable setup path, so every team member gets the same project layout and the same AI configuration.
- The AI development kit (rules and component skills for the Bigin front end) is installed automatically.
- The Lyte dev server, a terminal and Git controls sit on one screen.
- Cancellation, error messages and cleanup are built into project creation, so a failed setup does not leave a half-created folder behind.

**Overall workflow**

```
Install app  ->  Set repository URL (Settings)  ->  Set up a new project
   (pick branch or create new branch, name it)
        |
        v
 Verify repo access -> Clone / check out -> Install AI kit -> Install Bower deps
        |
        v
 Workspace ready -> Dashboard: Start server | Terminal | Git | Open in editor
```

---

## 3. Problems it solves

| Problem | How Bigin Studio addresses it |
| --- | --- |
| Setting up the project by hand is slow and error-prone | A single guided "Set up a new project" flow with a step-by-step progress view |
| Starting a feature branch requires several Git commands | "Create a new branch" mode creates the branch from a base branch and names the folder after it |
| AI tools need project rules and skills copied in | The bundled `ai-dev` kit is extracted and linked automatically |
| Tools installed with Homebrew or nvm are not found when an app is launched from Finder | The app reads your login shell's `PATH` at startup and uses it |
| Dependency installs can hang or fail on authentication | Bower install is cancellable, skippable, and prompts for a build token only when needed |
| Leftover processes after closing a project | Terminals and servers started by the app are tracked and stopped when you go back or quit |
| Jumping between Terminal, editor and Git client | One dashboard with a terminal, Git panel and an "Open in" menu |

---

## 4. Key Features

### 4.1 Feature classification

| Category | Features |
| --- | --- |
| **Core Features** | Guided project creation pipeline; splash screen and startup; environment check; safe shutdown |
| **Development Features** | Bower dependency install; Lyte dev server control; integrated terminal; automatic detection of `dev`/`start`/`watch` scripts; "Open in" menu (VS Code, Terminal, Claude, Finder) |
| **Git & Version Control** | Repository access check; branch listing; create-new-branch mode; status; stage/unstage per file; commit; commit and push; pull (fast-forward only); push; incoming/outgoing counters; Git output log |
| **AI-Powered Development** | Automatic provisioning of the `ai-dev` kit (rules plus 147 component skills and 18 domain skills); setup for Claude Code, Cursor, Codex and GitHub Copilot; "Open in Claude" |
| **Project Management** | Recent projects (up to 9); open an existing Git folder; configurable project root; default repository URL; remove from recents |
| **Productivity & Convenience** | Searchable branch picker with keyboard navigation; toasts and inline errors; confirmation dialogs; terminal search and clear shortcuts; clickable terminal links; DevTools shortcut |

### 4.2 Implementation status at a glance

| Feature | Status |
| --- | --- |
| Create project from an existing branch | Implemented |
| Create project on a new branch | Implemented (branch is created locally; see limitation in 5.2) |
| Update an existing project folder to a branch | Implemented |
| Cancel project creation | Implemented (unavailable once an existing project is being modified) |
| AI kit provisioning | Implemented |
| Bower install, skip and token retry | Implemented |
| Open an existing Git folder | Implemented |
| Recent projects | Implemented |
| Settings (user name, default repository, project root) | Implemented |
| Lyte dev server start, stop, status | Implemented |
| Integrated terminal (primary) | Implemented |
| Additional terminals ("New terminal") | **Hidden** (built, but the button is hidden by CSS) |
| Git status, stage, unstage, commit, pull, push | Implemented |
| Git stash | **Not available** |
| Switch branch inside an open project | **Not available** |
| OpenCode integration | **Not available** (no reference to OpenCode exists in the code) |
| Open in editors other than VS Code | **Not available** |
| Windows and Linux support | **Partial** (build targets configured, not verified; several actions are macOS-only) |

---

## 5. Detailed Feature Explanations

### 5.1 Startup, environment check and window

**Status: Implemented**

- **What it does:** shows a splash window, then the main window. Only one instance of the app can run; opening it again focuses the existing window.
- **Internally:**
  - On macOS the app launches your login shell once to read its `PATH` and merges it into its own. Every action waits for this, so `git`, `bower`, `lyte` and `npm` are found even when the app is started from Finder or the Dock.
  - After the welcome screen appears, an advisory environment check runs `--version` on Git, Bower, Lyte, npm, Bash and unzip.
  - If a **required** item is missing (Git, a terminal shell, the app runtime), an "Environment setup needed" banner is shown. Missing optional tools do not show a banner.
- **Partial detail:** the check result is stored when it finishes, and the banner appears the next time a screen is drawn. It does not interrupt what you are doing.

### 5.2 Creating a project

**Status: Implemented**

This is the main feature. It has two modes, chosen with radio buttons on the **Create project** screen.

| Mode | You provide | Result |
| --- | --- | --- |
| **Use an existing branch** | A folder name and a branch from the list | A folder named after your input (cleaned of unsafe characters) containing that branch |
| **Create a new branch** | A new branch name and a base branch | A new branch created from the base branch. The branch name is also used as the project name and folder name |

**How users interact**

1. On the welcome screen, click **Set up a new project**.
2. The app loads the branch list from the default repository (set in Settings).
3. Pick a branch in the searchable dropdown (type to filter, arrow keys and Enter to choose). The repository's default branch is pre-selected.
4. Enter the folder name (or new branch name) and click **Create project**. The button stays disabled until everything required is filled in.

**What happens internally (in order)**

1. **Validation.** The repository host must be one of the allowed internal hosts. The new branch name is checked with Git's own naming rules. The destination folder is computed inside the project root and checked.
2. **Access check.** `git ls-remote` confirms you can reach the repository with your existing credentials.
3. **Clone or update.**
   - Folder does not exist: a single-branch clone of the chosen branch.
   - Folder already exists and is a Git repo with the same remote: the app refuses if there are uncommitted changes, otherwise fetches and checks out the branch (`checkout -B branch origin/branch`).
   - Folder exists but is not a Git repo, or belongs to a different repository: creation stops with an error.
   - New-branch mode: fails if the branch name already exists on the remote or locally, or if the folder already exists.
4. **AI setup** (see 5.6).
5. **Bower install** (see 5.4).
6. The project is saved to the recent list and a **Workspace ready** screen appears. It continues to the dashboard automatically after 10 seconds, or immediately with **Continue**.

**Progress display:** a checklist of nine steps (repository access, cloned, branch checked out, BiginClient found, AI package copied, AI package extracted, `setup.sh` found, AI setup completed, Bower dependencies ready) with live status text such as clone percentage.

**Cancel behavior**

- A **Cancel** button (with a confirmation dialog) stops all child processes and removes the folder the app created.
- Cancel is turned off once the app starts modifying an **existing** folder, and the screen says so.
- A cancel that cannot fully clean up tells you what failed.

**Limitations**

- A new branch is created **locally** and is not pushed. It has no upstream, so the first **Push** may fail until you set an upstream in the terminal (for example `git push -u origin <branch>`). This follows from the Git commands used; it depends on your Git configuration.
- In new-branch mode, a branch name containing `/` (for example `feature/redesign`) produces a nested folder path under the project root.
- A project is added to Recent projects only after Bower finishes or is skipped. If Bower fails, the folder remains on disk but is not listed.
- Remote cloning, branch listing and authentication could not be exercised in automated tests (see `QA-COVERAGE.md`).

### 5.3 Branch handling

**Status: Implemented for project creation. Not available inside an open project.**

- **Choose an existing branch:** the list comes from `git ls-remote --heads`, sorted alphabetically.
- **Create a new branch:** see 5.2.
- **Switching branches later:** there is no branch switcher on the dashboard. The only in-app way to move an existing folder to another branch is to run **Set up a new project** with the same folder name, which updates that folder (only when it has no uncommitted changes). Otherwise use the terminal.
- The current branch name is shown on the project summary and on recent-project cards.

### 5.4 Bower dependency management

**Status: Implemented**

- **What it does:** installs front-end dependencies listed in `webapps/BiginClient/bower.json`.
- **Internally:**
  - If `bower.json` is missing, the step is marked "Bower configuration not found" and setup continues.
  - If every dependency folder already exists, nothing is installed.
  - Otherwise `bower install --allow-root` runs inside `BiginClient`, using a private cache in the app's data folder.
  - If the manifest points to the internal build server and no token has been given, the app pauses and shows a **Personal Build Token** field with a **Generate Build Token** link.
  - When you submit a token, it is added to the build-server URLs temporarily while Bower runs and the original `bower.json` is restored afterwards, even on failure. The token and user name are removed from any output shown on screen.
- **Skip:** a **Skip** button (with confirmation) abandons the install and finishes setup. Dependencies can then be installed manually.
- **Requirement:** a **User Name** must be saved in Settings before a build token can be used.
- **Failure:** an error is shown with a **Try again** button.

### 5.5 Opening existing projects, recent projects and workspace management

**Status: Implemented**

| Action | Behavior |
| --- | --- |
| **Open a project** | Opens a folder picker. The folder must be a Git repository (contains `.git`). The app reads the remote URL and current branch, saves the project to the recent list, and opens the dashboard. It does **not** run AI setup or Bower for folders opened this way. |
| **Recent project card** | Click to open. Shows name, branch and path (home folder shown as `~`). If the folder no longer exists, an error explains it must be set up again. |
| **Remove from recents** | The **×** on a card removes it from the list only. Nothing is deleted from disk. |
| **Limits** | Up to 9 recent projects, newest first, duplicates merged. The list is saved between launches. |
| **Project root** | New projects are created inside the project root folder. Default: `~/Bigin Studio Projects`. Change it in Settings. |
| **Back to projects** | The arrow on the dashboard returns to the welcome screen. If processes are still running in terminals, a dialog offers **Stop Processes & Go Back**. |

Switching to another project stops and closes the terminals of the previous one and replaces the server state.

### 5.6 AI development integration

**Status: Implemented (configuration provisioning). There is no built-in AI chat or assistant.**

**What is installed.** The app bundles `ai-dev.zip`. During project creation it:

1. Copies the zip into `webapps/BiginClient`.
2. Extracts it, creating an `ai-dev/` folder.
3. Runs `bash ai-dev/setup.sh`.
4. Deletes the copied zip.

The kit contains (verified by listing the bundled archive):

- `AGENTS.md`: the rules for AI agents working in BiginClient. It describes the app as a Zoho Lyte application (not React, Vue or Angular), says to look up components instead of guessing, and defines write-access tiers (frozen design-system areas, reviewable feature templates).
- `STANDARDS.md`: code conventions.
- **147** `ux-*` component skills and **18** domain skills (for example store lifecycle, form flow, i18n, permissions and licensing, page resolution).
- Generated references (`COMPONENTS.md`, `component-manifest.json`, `page-map.json`) and helper tools to regenerate and validate them.

**What `setup.sh` does.** It creates links so each AI tool finds the rules where it expects them:

| Tool | Link created |
| --- | --- |
| Claude Code | `CLAUDE.md`, `.claude/skills`, `.claude/skills-domain`, `.claude/settings.local.json` |
| Cursor, Codex and other AGENTS.md tools | `AGENTS.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |

It then adds `ai-dev/` and the links to `.git/info/exclude`, so they stay **local and are never committed**. It does not overwrite a real file already in the repository. It is safe to run again.

**Related feature: Open in Claude.** The "Open in" menu on the dashboard launches the **Claude desktop app** with the `BiginClient` folder (macOS `open -a Claude`).

**Limitations and clarifications**

- **OpenCode is not integrated.** There is no OpenCode code, setting or workflow in Bigin Studio. The `ai-dev` kit configures Claude Code, Cursor, Codex and Copilot only.
- The app does not run the kit's follow-up commands (`npm --prefix ai-dev run docs`, `pagemap`, `validate:skills`). The script prints them as next steps; run them yourself in the terminal.
- AI setup only runs during project creation. It does not run when you open an existing folder.
- You can run any command-line AI tool in the integrated terminal, but that is a general shell capability rather than a Studio feature.
- Requires `bash` and `unzip` on your Mac (both ship with macOS).

### 5.7 Project dashboard

**Status: Implemented**

After a project opens, the dashboard shows:

- **Project summary:** name, branch, location, repository URL.
- **Actions:** Start/Stop server, the **Open in** menu.
- **Version control panel** (left).
- **Processes and Terminal panel** (right).

When a project opens, the app also looks for a `package.json` in the project root or in `webapps/BiginClient`. If it has a `dev`, `start` or `watch` script (checked in that order), the app starts `npm run <script>` in the background automatically. Its output is collected but not shown on the dashboard. This is **Partial** from a user's point of view: it runs, but there is no panel for it. Use the terminal if you need to see or control it.

### 5.8 Lyte development server

**Status: Implemented**

- **What it does:** runs `lyte serve --port <port>` for the project.
- **Interaction:** click **Start server**. The button changes to **Starting…**, then **Stop server**. A status line shows **Live : <port>** once the server responds, or "Still starting… taking longer than expected" after 30 seconds. The server is never stopped just because it is slow.
- **Internally:**
  - Picks the first free port from **3000 to 3005** and re-checks right before launching.
  - Uses `node_modules/.bin/lyte` in the project if present, otherwise `lyte` from `PATH`.
  - Types the command into the primary terminal, so you see the real server output there. The tab is relabelled with the port.
  - Readiness means an HTTP `200`-range answer on `/`. A genuine exit of the process is detected and reported as an error or "stopped".
  - **Stop** interrupts only the process the app started, not other things you ran in that terminal.
- **Errors:** "No available development port found. Ports 3000–3005 are currently in use." and "BiginClient was not found in this project."
- **Note:** the dashboard does not have an "open in browser" button. Terminal output links are clickable, or open the address yourself.

### 5.9 Integrated terminal

**Status: Implemented (primary terminal). Additional terminals: Hidden.**

- **What it does:** a real shell (your `$SHELL`, falling back to zsh, bash or sh) inside the dashboard, started in `webapps/BiginClient`.
- **Features:** colors, 5,000-line scrollback, resize that follows the panel, clickable web links (opened in your default browser; only `http`, `https` and `file` links are allowed), **Cmd/Ctrl+F** to search, **Cmd/Ctrl+K** or the **Clear** button to clear.
- **Primary terminal:** it cannot be closed. It is initially labelled "Live Server" and is also where the Lyte server runs.
- **Extra terminals:** the code supports them (tab per terminal, close with a confirmation if something is running), but the **New terminal** button is currently hidden by a CSS rule, so users cannot reach it. A second terminal is also possible by choosing **Open in Terminal** from the "Open in" menu, which opens macOS Terminal.
- **Cleanup:** closing a terminal, going back to the project list, switching project or quitting the app terminates the processes the app owns.

### 5.10 Opening the project in other applications

**Status: Implemented, macOS only**

The split button on the dashboard defaults to **Open in VS Code**. The arrow next to it opens a menu:

| Option | What happens |
| --- | --- |
| Open in VS Code | Opens `webapps/BiginClient` in Visual Studio Code |
| Open in Terminal | Opens macOS Terminal at `webapps/BiginClient` |
| Open in Claude | Opens the Claude desktop app with `webapps/BiginClient` |
| Open in Finder | Reveals the project root folder |

If the application is not installed you see "Visual Studio Code is not installed." or "Claude is not installed." Other editors (for example Cursor or WebStorm) are **not** offered.

### 5.11 Git integration

**Status: Implemented, with the gaps listed below**

All Git actions run in the project folder using your existing Git credentials. Git is run non-interactively (no password prompts; SSH uses batch mode), so a credential problem produces an error instead of a prompt.

| Capability | How it works |
| --- | --- |
| **Repository detection** | A folder is treated as a project only if it exists and contains `.git`. Every Git action re-checks this. |
| **Status** | Lists changed files in two groups: **Staged Changes** and **Changes**. Untracked files are included. Badges show status such as `M`, `A`, `D`, `??`. |
| **Refresh** | The ↻ button (also run when the dashboard opens and after each action) does `git fetch --prune` and recomputes status. |
| **Sync counters** | ↓ incoming and ↑ outgoing commit counts against the upstream branch. Shows "—" when there is no upstream or the remote cannot be reached. |
| **Stage / Unstage** | **+** or **−** button per file. |
| **Commit** | Needs a non-empty message and at least one staged file. The message box grows as you type. |
| **Commit and Push** | From the arrow menu on the Commit button. If the commit succeeds but the push fails, you are told the commit is saved locally. |
| **Pull** | `git pull --ff-only`. It refuses to create merge commits, so diverged branches must be resolved in the terminal. |
| **Push** | Plain `git push`. |
| **Git Output panel** | A collapsible log of recent Git commands and their output (last 100 entries) with a **Clear** button. Credentials and tokens are masked. |
| **Feedback** | Toast notification for 6 seconds with **View Details** on errors; friendly messages for authentication, conflict, rejected push, network and "nothing to commit". |

**Not available:** stash, discard changes, diff viewer, stage-all, merge or rebase tools, commit history, branch switching or creation from the dashboard. Use the terminal for these.

### 5.12 Settings and preferences

**Status: Implemented.** The gear icon appears on the welcome and setup screens (it is hidden while a project dashboard is open).

| Section | Setting | Behavior |
| --- | --- | --- |
| **User Settings** | User Name | Required (cannot be blank). Used with a build token for Bower authentication. |
| **Project Settings** | Default Repository URL | Must be an allowed internal host. It is **verified against the server before saving**. A blank value clears it. Used for all new projects. |
| **Project Settings** | Project Root Folder | Choose an existing folder with **Browse**, then **Save**. Default is `~/Bigin Studio Projects`. |

Settings are stored in a `config.json` file in the app's data folder and persist across restarts. Press Escape or click outside to close.

**Project-specific configuration:** there is none. The only per-project data kept is its entry in the recent list (name, path, repository URL, branch and last opened time).

### 5.13 Progress, notifications and error handling

**Status: Implemented**

- **Loading and progress:** splash screen on startup; spinner and step checklist during creation; "Starting…/Stopping…" on the server button; disabled and busy states on Git buttons; "Loading branches…" and "Verifying…" labels.
- **Notifications:** in-app toasts for Git, inline error boxes, and confirmation dialogs (cancel creation, skip Bower, stop processes before going back, close a busy terminal). The app does not send macOS system notifications.
- **Errors:** messages are written in plain language for common failures, such as repository not found, authentication failed, network failure, Git not installed, no upstream and port conflicts.
- **Shutdown:** quitting cancels any creation in progress and stops the server and terminals before exit.

### 5.14 Other conveniences

- **DevTools:** Cmd/Ctrl + Alt + I toggles developer tools (useful when reporting bugs).
- **Footer:** "Crafted with care by Bigin Client Team."
- **Data location:** app data (settings, recent projects, Bower cache) lives in the standard macOS app data folder for Bigin Studio, separate from your projects.

---

## 6. Installation Guide

### 6.1 What is the DMG?

A **DMG** is a macOS disk image, a single downloadable file that opens like a drive. Inside is the **Bigin Studio** app, which you drag into **Applications**. You do not need Node.js, npm or the source code to run the packaged app.

### 6.2 Which version do you need?

Two installers are built for every release. Names follow the pattern `Bigin Studio-<version>-<arch>.dmg`.

| Installer | For | Typical Macs |
| --- | --- | --- |
| `...-arm64.dmg` | **Apple Silicon (ARM64)** | M1, M2, M3 and later Macs (roughly 2020 onwards) |
| `...-x64.dmg` | **Intel (x64)** | Older Intel-based Macs |

**How to check your Mac**

- **Apple menu > About This Mac.** If **Chip** shows "Apple M…", download **arm64**. If **Processor** shows "Intel…", download **x64**.
- Or run `uname -m` in Terminal: `arm64` means Apple Silicon, `x86_64` means Intel.

### 6.3 Step-by-step installation

1. Download the correct `.dmg` file from where your team shares it.
2. Double-click the file to open it.
3. Drag **Bigin Studio** into the **Applications** folder.
4. Eject the disk image (right-click the mounted disk > Eject).
5. Open **Applications** and launch **Bigin Studio** (first launch: see 6.4).

### 6.4 macOS security considerations

The build is **ad-hoc signed**. It is not signed with an Apple Developer ID and is not notarized (the build configuration sets no signing identity and uses a script to apply an ad-hoc signature). The result is that macOS Gatekeeper may warn you the first time you open it, especially when the DMG was downloaded from the internet or a chat tool.

If macOS blocks the app:

1. Control-click (right-click) **Bigin Studio** in Applications and choose **Open**, then confirm **Open**.
2. If that is not offered, go to **System Settings > Privacy & Security**, scroll to the message about Bigin Studio and click **Open Anyway**.
3. If macOS says the app is "damaged", remove the download quarantine flag and open it again:
   ```sh
   xattr -dr com.apple.quarantine "/Applications/Bigin Studio.app"
   ```
   Only do this for a copy you received from your team.

These are standard macOS steps; they are not features of the app.

Other points:

- The app uses your existing Git credentials or SSH keys. It does not ask for or store Git passwords.
- Your build token (if requested for Bower) is used for that one install and is not saved in `config.json`.
- The app only talks to the repository you configure, plus whatever tools you run in the terminal.

### 6.5 Initial setup requirements (first launch checklist)

1. **Install the command-line tools the workflow needs** (see section 7).
2. **Make sure Git can reach the internal repository** from Terminal with your own credentials. Bigin Studio cannot prompt for a password.
3. Open Bigin Studio and click the **gear icon**:
   - **Project Settings > Default Repository URL:** enter the repository URL and save. It is verified first.
   - **Project Settings > Project Root Folder:** keep the default or choose another folder.
   - **User Settings > User Name:** set this if you may need a Bower build token.
4. You are ready to click **Set up a new project**.

---

## 7. System Requirements

| Requirement | Detail |
| --- | --- |
| **Operating system** | macOS 11 (Big Sur) or later. This is the minimum set in the build configuration. |
| **Architecture** | Apple Silicon (arm64) or Intel (x64) |
| **Disk space** | Installer is about 100 MB (arm64) or 110 MB (x64) per the build manifest, plus space for the cloned project and Bower components |
| **Network** | Access to the internal Git host and, for Bower, the internal build server |
| **Git** | **Required.** Used for cloning and all Git features. The app shows a banner if it is missing. |
| **Bower** | Needed only if the project has missing Bower dependencies. Optional otherwise. |
| **Lyte CLI** | Needed to use **Start server** (a project-local copy is used first if present). |
| **Node.js and npm** | Needed to run Bower, Lyte and `npm run` scripts. The app bundles its own runtime but does **not** supply these tools for your projects. |
| **Bash and unzip** | Needed for AI setup. Both ship with macOS. |
| **Visual Studio Code** | Optional; needed for **Open in VS Code** |
| **Claude desktop app** | Optional; needed for **Open in Claude** |
| **Shell** | Your login shell, normally zsh |

**Platform notes**

- Windows (NSIS) and Linux (AppImage) targets exist in the build configuration, but they are not verified, and the "Open in…" actions use macOS commands. Treat the app as **macOS only**.
- Tools installed through Homebrew, nvm and similar are found automatically because the app reads your login shell's `PATH`. If a tool still shows as missing, confirm it works in a new Terminal window.

---

## 8. Getting Started

A beginner-friendly walkthrough. Every step below matches the current implementation.

### Step 1: Launch Bigin Studio

Open it from Applications. A splash screen appears, then the **welcome screen** with "Set up a new project", "Open a project" and your recent projects.

### Step 2: One-time configuration

Click the gear icon (top right) and follow section 6.5. Without a default repository URL, **Set up a new project** will show: "No repository is configured. Add and verify the repository URL in Settings > Project Settings."

### Step 3: Create or open a project

- **New project:** click **Set up a new project**.
- **Existing folder:** click **Open a project** and choose a Git repository folder.
- **Used before:** click its card under **Recent projects**.

### Step 4: Choose a branch or create a new one

On the **Create project** screen, under **Project setup**:

- **Use an existing branch:** select the branch from the dropdown, then type a **Folder name**.
- **Create a new branch:** choose the **Base branch**, then type the **New branch name**. This name is also the project and folder name.

If the branch list fails to load, use **Retry**, or check your repository URL in Settings.

### Step 5: Understand project settings

There are no per-project settings. Two global settings affect new projects: the **Default Repository URL** and the **Project Root Folder** (section 5.12).

### Step 6: Initialize the development environment

Click **Create project** and watch the checklist. The app clones, checks out, installs the AI kit and installs Bower dependencies.

- Use **Cancel** if you started by mistake.
- If a **Personal Build Token** field appears, paste your token and click **Install**, or choose **Skip** to continue without installing.
- When you see **Workspace ready**, click **Continue** (or wait 10 seconds).

### Step 7: Start the server

On the dashboard, click **Start server**. Wait for the **Live : <port>** indicator. Check the terminal output if it takes more than a few seconds.

### Step 8: Open the project in a code editor

Click **Open in VS Code**. Use the arrow for Terminal, Claude or Finder.

### Step 9: Use the integrated terminal

The terminal panel on the right already points at `webapps/BiginClient`. Run any command there. Use Cmd+F to search and Cmd+K to clear.

### Step 10: Use Git operations

In the **Version Control** panel:

1. Click **+** beside a file to stage it (**−** to unstage).
2. Type a **Commit message**.
3. Click **Commit**, or use the arrow for **Commit and Push**, **Pull** or **Push**.
4. Click **Git Output** to see exactly what Git ran.
5. Click ↻ to refresh status and the ↓/↑ counters.

### Step 11: Use AI development capabilities

The AI kit is already installed in the project. Open the project with **Open in VS Code** (with Copilot or another AGENTS.md-aware tool) or **Open in Claude**. The rules and skills are picked up from the linked files in the project. To refresh the generated reference files, run in the terminal:

```sh
npm --prefix ai-dev run docs && npm --prefix ai-dev run pagemap && npm --prefix ai-dev run validate:skills
```

### Step 12: Manage recent projects

Return to the welcome screen with the **←** arrow (confirm if prompted to stop running processes). Open any card to resume, or click **×** on a card to remove it from the list.

---

## 9. Complete User Workflow

**Day 1: first-time setup**

```
Install DMG -> first launch (allow in macOS if prompted)
  -> Settings: Default Repository URL (verified), Project Root, User Name
  -> Set up a new project
       -> choose existing branch + folder name
          OR new branch name + base branch
       -> Create project
            1. Verify repository access
            2. Clone or update the project folder
            3. Check out / create the branch
            4. Copy, extract and run the ai-dev kit
            5. Bower install (token prompt / Skip if needed)
       -> Workspace ready -> Dashboard
```

**Every day**

```
Open Bigin Studio -> click a Recent project
  -> (services auto-start if the project defines dev/start/watch)
  -> Start server (Lyte, ports 3000-3005) -> wait for "Live : <port>"
  -> Open in VS Code / Claude        -> develop with AI rules in place
  -> Terminal for ad-hoc commands
  -> Version Control: stage -> commit (-> push), pull when ↓ shows incoming
  -> Back arrow (stops running processes after confirmation) or quit
```

**Feature branch workflow**

```
Set up a new project -> "Create a new branch" -> base: your integration branch
  -> new branch name (also the folder name)
  -> work, stage, commit
  -> first push: run  git push -u origin <branch>  in the terminal if Push reports no upstream
```

---

## 10. Frequently Asked Questions

**Does Bigin Studio edit my code?**
No. It prepares projects and runs tools. You edit in VS Code or another editor.

**Is OpenCode supported?**
No. There is no OpenCode integration in the code. The AI kit supports Claude Code, Cursor, Codex and GitHub Copilot through standard rule files. "Open in Claude" launches the Claude desktop app.

**Does Bigin Studio include an AI chat?**
No. It installs AI configuration and launches external tools.

**Is there a Git stash button?**
No. Use `git stash` in the terminal. Note that creating a project in an existing folder refuses to proceed if it has uncommitted changes.

**Can I switch branches from the dashboard?**
No. Use the terminal, or create a separate project for the other branch.

**Why is "Set up a new project" showing a repository error?**
Either no default repository URL is saved, or your Git credentials cannot access it. Set it in **Settings > Project Settings** and make sure `git ls-remote` works for you in Terminal.

**Why can't I enter any repository URL?**
Only the allowed internal repository hosts are accepted. Other hosts are rejected.

**Where are my projects stored?**
In the **Project Root Folder** (default `~/Bigin Studio Projects`). Each project is a normal Git clone you can use outside the app.

**Will the AI files be committed to the repository?**
No. The setup script adds `ai-dev/` and its links to `.git/info/exclude`, which is local to your clone.

**Opening an existing folder did not install the AI kit or Bower dependencies. Why?**
**Open a project** only registers the folder. The AI kit and Bower run during **Set up a new project**. To refresh a folder, run Set up a new project with the same folder name (it must have no uncommitted changes), or run the commands in the terminal.

**My Bower install asks for a build token. Is it stored?**
No. The token is used for that install and the original `bower.json` is restored afterwards. A saved **User Name** is required to use it.

**Start server says no port is available.**
Ports 3000 to 3005 are all in use. Stop whatever is using them, then retry.

**Start server says the server is taking longer than expected.**
This is a warning only. The server keeps running. Check the terminal output; stop it if something is wrong.

**I can't find "New terminal".**
It is built but currently hidden. Use **Open in Terminal** for an extra shell.

**Pull says it failed.**
Pull is fast-forward only. If your branch and the remote have diverged, or you have conflicting local changes, resolve it in the terminal.

**Push says there is no upstream branch.**
This usually happens for a branch created with **Create a new branch**. Run `git push -u origin <branch>` once in the terminal.

**macOS says the app is damaged or from an unidentified developer.**
The build is ad-hoc signed and not notarized. See section 6.4.

**Does it work on Windows or Linux?**
Not supported in practice. Installers can be configured, but they are unverified and several actions need macOS.

**Does it auto-update?**
No. There is no update mechanism in the code. Install a new DMG over the old app.

**What if I quit while something is running?**
The app cancels any project creation in progress and stops the server and terminals it started before it exits.

**Where is app data stored, and can I reset it?**
In the macOS application-support location for Bigin Studio (settings, recent projects list and Bower cache). Removing that folder resets the app and does not touch your projects.
