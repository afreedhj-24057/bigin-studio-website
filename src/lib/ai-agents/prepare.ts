import { INSTALL_PROMPT } from './install-prompt';

/** Conservative cap: Claude Code's own deep links allow 5,000 characters of prompt. */
export const PROMPT_MAX_LENGTH = 4500;

/** Returns the prompt to hand off. Throws if it is too long to be safely carried in a URL. */
export function prepareInstallPrompt(): string {
  const prompt = INSTALL_PROMPT.trim();
  if (prompt.length > PROMPT_MAX_LENGTH) throw new Error('Installation prompt is too long for a deep link.');
  return prompt;
}
