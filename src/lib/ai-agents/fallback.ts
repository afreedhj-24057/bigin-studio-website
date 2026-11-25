import type { AvailableAgent } from './agents';

export type HandoffInput = { mac: boolean; copied: boolean; launched: boolean };
export type HandoffResult = {
  tone: 'success' | 'warning';
  title: string;
  steps: string[];
  /** Show the prompt in a selectable box so it can be copied by hand. */
  showManualCopy: boolean;
  /** Show a link to download the agent app. */
  showInstallLink: boolean;
};

/** Turns what actually happened into honest, actionable guidance. Never claims Claude is running the prompt. */
export function describeOutcome(agent: AvailableAgent, { mac, copied, launched }: HandoffInput): HandoffResult {
  if (!mac) {
    return {
      tone: 'warning',
      title: `${agent.name} setup is for macOS`,
      steps: [
        'Bigin Studio runs on macOS only, so open this page on your Mac to continue.',
        copied ? 'The prompt was copied to your clipboard in case you want to use it on a Mac.' : 'You can copy the prompt below to use on a Mac.',
      ],
      showManualCopy: !copied,
      showInstallLink: false,
    };
  }
  if (launched) {
    return {
      tone: 'success',
      title: copied ? 'Prompt copied. Your Mac was asked to open Claude.' : 'Your Mac was asked to open Claude.',
      steps: [
        'If Claude opened with the setup prompt in the message box, read it, then press Enter to send it.',
        copied
          ? 'If the box is empty, start a new Claude Code session and paste (⌘V). The prompt is on your clipboard.'
          : 'If the box is empty, copy the prompt below and paste it into a new Claude Code session.',
        'Claude asks for your approval before it installs anything. Nothing runs until you send the prompt.',
      ],
      showManualCopy: !copied,
      showInstallLink: false,
    };
  }
  return {
    tone: 'warning',
    title: copied ? 'Prompt copied, but Claude did not respond' : 'Could not open Claude or copy the prompt',
    steps: [
      'Your browser gave no sign that Claude opened. It may not be installed, or the browser may be waiting for you to allow it to open Claude.',
      'If Claude is installed, open it manually and start a new Claude Code session.',
      copied ? 'Paste the prompt (⌘V) and press Enter.' : 'Copy the prompt below, paste it into the session and press Enter.',
      'If Claude is not installed, download it first, then come back and use this button again.',
    ],
    showManualCopy: !copied,
    showInstallLink: true,
  };
}
