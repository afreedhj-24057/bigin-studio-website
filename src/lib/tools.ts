/** Bigin UI Tools — single source of truth for tool data (listing + detail pages). */
export type Tool = {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  usedFor: string;
  helps: string;
  category: string;
  /** Inner SVG markup for a 24×24 stroke icon (trusted, static). */
  icon: string;
  actionLabel: string;
  detailActionLabel: string;
  actionType: 'external' | 'download';
  externalUrl?: string;
  fileUrl?: string;
  fileName?: string;
  installSteps?: string[];
};

const VSIX = '/dist/ux-intellisense-0.1.0.vsix';

export const TOOLS: Tool[] = [
  {
    id: 'bigin-studio',
    name: 'Bigin Studio',
    description: 'macOS desktop workspace for the Bigin client team: project setup, Git, the Lyte dev server and an integrated terminal in one window.',
    detailedDescription: 'Bigin Studio is a macOS desktop workspace for the Bigin client team. It brings project setup, AI development kit provisioning, Git, the Lyte dev server and an integrated terminal together in one window.',
    usedFor: 'Setting up a Bigin project, managing Git, running the Lyte dev server and working in an integrated terminal from a single workspace.',
    helps: 'Gives every Bigin team member the same starting point, instead of a checklist of separate setup steps.',
    category: 'Workspace',
    icon: '<rect x="3" y="4.500" width="18" height="15" rx="2.500"/><path d="m7 10 3 2.500L7 15m5.500 0H17"/>',
    externalUrl: '/',
    actionLabel: 'Open Bigin Studio',
    detailActionLabel: 'Open Bigin Studio',
    actionType: 'external',
  },
  {
    id: 'bigin-components',
    name: 'Bigin Components Hub',
    description: 'Explore and discover reusable UI components available for BiginClient.',
    detailedDescription: 'Bigin Components Hub is a web app for exploring and discovering the reusable UI components available for BiginClient.',
    usedFor: 'Browsing the reusable UI components that are available for BiginClient, so you can find what already exists.',
    helps: 'Gives Bigin team one place to discover reusable components before building UI from scratch.',
    category: 'Components',
    icon: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/>',
    externalUrl: 'https://bigincomponents.onslate.in/',
    actionLabel: 'Open Tool',
    detailActionLabel: 'Open Components Hub',
    actionType: 'external',
  },
  {
    id: 'svg-icons',
    name: 'Bigin SVG Icons Library',
    description: 'Browse and explore the SVG icon collection available for Bigin UI development.',
    detailedDescription: 'Bigin SVG Icons Library is a web app for browsing and exploring the SVG icon collection available for Bigin UI development.',
    usedFor: 'Browsing the SVG icons available for Bigin UI development.',
    helps: 'Lets Bigin team look through the available icon collection in one place instead of searching for icons elsewhere.',
    category: 'Icons',
    icon: '<rect x="3.500" y="3.500" width="7" height="7" rx="1.500"/><rect x="13.500" y="3.500" width="7" height="7" rx="1.500"/><rect x="3.500" y="13.500" width="7" height="7" rx="1.500"/><circle cx="17" cy="17" r="3.500"/>',
    externalUrl: 'https://bigin-icons-library-50042210406.development.catalystappsail.in/#/',
    actionLabel: 'Open Tool',
    detailActionLabel: 'Open SVG Icons Library',
    actionType: 'external',
  },
  {
    id: 'class-hint',
    name: 'Bigin Class Name Hint',
    description: 'Visual Studio Code extension that provides IntelliSense and class-name suggestions to help developers discover and use Bigin CSS classes efficiently.',
    detailedDescription: 'Bigin Class Name Hint is a Visual Studio Code extension that provides IntelliSense and class-name suggestions, helping developers discover and use Bigin CSS classes efficiently. It is published on the Visual Studio Marketplace.',
    usedFor: 'Getting IntelliSense and class-name suggestions for Bigin CSS classes while writing code in Visual Studio Code.',
    helps: 'Helps Bigin team discover and use Bigin CSS classes efficiently, directly from the editor.',
    category: 'Developer Extension',
    icon: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3.500-12-3 14"/>',
    externalUrl: 'https://marketplace.visualstudio.com/items?itemName=Bigin-UI-Team.bigin-class-hints',
    actionLabel: 'View Extension',
    detailActionLabel: 'View VS Code Extension',
    actionType: 'external',
  },
  {
    id: 'table-yields',
    name: 'Table Yields Explorer',
    description: 'Explore and understand table yield configurations and related table structures.',
    detailedDescription: 'Table Yields Explorer is a web app for exploring and understanding table yield configurations and related table structures.',
    usedFor: 'Exploring table yield configurations and the table structures related to them.',
    helps: 'Helps Bigin team understand how table yields and related table structures are configured.',
    category: 'Developer Utility',
    icon: '<rect x="3.500" y="4.500" width="17" height="15" rx="2"/><path d="M3.500 9.500h17M3.500 14.500h17M9.500 9.500v10"/>',
    externalUrl: 'https://bigin-table-yields.onslate.in',
    actionLabel: 'Open Tool',
    detailActionLabel: 'Open Table Yields Explorer',
    actionType: 'external',
  },
  {
    id: 'ux-intellisense',
    name: 'Bigin UX Components IntelliSense',
    description: 'IntelliSense support for Bigin UX components using the supplied extension file.',
    detailedDescription: 'Bigin UX Components IntelliSense is a Visual Studio Code extension, supplied as a .vsix file (ux-intellisense-0.1.0.vsix, version 0.1.0). It provides auto-complete for ux-* Lyte components.',
    usedFor: 'Auto-completing ux-* Lyte components in .html template files: typing <ux- lists the components, typing a space inside a tag lists its props, and hovering a ux-* tag shows its prop table.',
    helps: 'Helps Bigin team find ux-* components and their props without leaving the editor.',
    category: 'Developer Extension',
    icon: '<path d="m12 3 8.500 4.500v9L12 21l-8.500-4.500v-9L12 3z"/><path d="m3.500 7.500 8.500 4.500 8.500-4.500M12 12v9"/>',
    fileUrl: VSIX,
    fileName: 'ux-intellisense-0.1.0.vsix',
    actionLabel: 'Download IntelliSense File',
    detailActionLabel: 'Download IntelliSense File',
    actionType: 'download',
    installSteps: [
      'Open VS Code',
      'Press Cmd+Shift+P and choose Extensions: Install from VSIX…',
      'Select ux-intellisense-0.1.0.vsix',
      'Reload Window',
    ],
  },
];

export const getTool = (id: string) => TOOLS.find((t) => t.id === id);
export type ToolView = 'card' | 'list';
export const toolHref = (id: string, view: ToolView) => `/ui-tools/${encodeURIComponent(id)}${view === 'list' ? '?view=list' : ''}`;
