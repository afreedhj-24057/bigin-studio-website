import type { AvailableAgent } from './agents';

/** Copies text to the clipboard. Returns false (never throws) if the browser refuses. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* fall through to the legacy path */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

export function isMac(): boolean {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const p = nav.userAgentData?.platform || navigator.platform || '';
  // iPadOS reports "MacIntel" but has touch points; it cannot run the Mac app.
  return /mac/i.test(p) && navigator.maxTouchPoints < 2;
}

/**
 * Asks the OS to open the agent via its URL scheme. Browsers do not say whether a custom
 * scheme has a handler, so this resolves `true` only when the page visibly lost focus
 * (an app took over or the browser showed its "Open app?" prompt) within the timeout.
 * `false` means "no sign of a launch", not proof that it failed.
 */
export function openAgent(agent: AvailableAgent, prompt: string, timeoutMs = 2500): Promise<boolean> {
  return new Promise((resolve) => {
    let done = false;
    const finish = (signalled: boolean) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      window.removeEventListener('blur', onSignal);
      window.removeEventListener('pagehide', onSignal);
      document.removeEventListener('visibilitychange', onVis);
      resolve(signalled);
    };
    const onSignal = () => finish(true);
    const onVis = () => { if (document.hidden) finish(true); };
    const timer = setTimeout(() => finish(false), timeoutMs);
    window.addEventListener('blur', onSignal);
    window.addEventListener('pagehide', onSignal);
    document.addEventListener('visibilitychange', onVis);
    try {
      const a = document.createElement('a');
      a.href = agent.buildLaunchUrl(prompt);
      a.rel = 'noopener';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      finish(false);
    }
  });
}
