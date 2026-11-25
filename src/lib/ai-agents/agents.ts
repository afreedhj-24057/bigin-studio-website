/** Agent configuration. Add a new agent by adding an entry here (and a launcher in launch.ts). */
export type AgentId = 'claude' | 'copilot';

type AgentBase = { id: AgentId; name: string; description: string; cta: string };

/** An agent that can be launched today. */
export type AvailableAgent = AgentBase & {
  status: 'available';
  /** Builds the URL that asks the OS to open the agent with the prompt pre-filled. */
  buildLaunchUrl: (prompt: string) => string;
  /** Where to get the app if it is not installed. */
  installUrl: string;
};

/** Listed in the UI but disabled: no launcher exists yet. */
export type UpcomingAgent = AgentBase & { status: 'coming-soon' };

export type AgentConfig = AvailableAgent | UpcomingAgent;

export const AGENTS: AgentConfig[] = [
  {
    id: 'claude',
    name: 'Claude Code',
    description: 'AI-powered installation and configuration.',
    status: 'available',
    cta: 'Continue with Claude',
    // Documented in the Claude Code desktop docs: claude://code/new opens the new-session
    // page and `q` is URL-encoded text for the prompt box. Desktop never sends it automatically.
    buildLaunchUrl: (prompt) => `claude://code/new?q=${encodeURIComponent(prompt)}`,
    installUrl: 'https://claude.ai/download',
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    description: 'AI-powered installation and configuration.',
    status: 'coming-soon',
    cta: 'Coming soon',
  },
];
