'use client';

import { useEffect, useRef, useState } from 'react';
import AiToolIcon from '@/components/AiToolIcon';
import { AGENTS, type AvailableAgent, type AgentConfig } from '@/lib/ai-agents/agents';
import { prepareInstallPrompt } from '@/lib/ai-agents/prepare';
import { copyToClipboard, isMac, openAgent } from '@/lib/ai-agents/launch';
import { describeOutcome, type HandoffResult } from '@/lib/ai-agents/fallback';

type Phase = 'idle' | 'preparing' | 'copying' | 'opening' | 'done' | 'error';

const BUSY_LABEL: Partial<Record<Phase, string>> = {
  preparing: 'Preparing setup instructions…',
  copying: 'Copying installation prompt…',
  opening: 'Opening Claude Code…',
};

export default function AiAgentSetup() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [result, setResult] = useState<HandoffResult | null>(null);
  const [prompt, setPrompt] = useState('');
  const busy = useRef(false); // blocks repeat clicks while a handoff is in flight
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; }, []);

  const start = async (agent: AvailableAgent) => {
    if (busy.current) return;
    busy.current = true;
    setResult(null);
    try {
      setPhase('preparing');
      const text = prepareInstallPrompt();
      setPrompt(text);
      const mac = isMac();

      setPhase('copying');
      const copied = await copyToClipboard(text);

      let launched = false;
      if (mac) {
        setPhase('opening');
        launched = await openAgent(agent, text);
      }
      if (!alive.current) return;
      setResult(describeOutcome(agent, { mac, copied, launched }));
      setPhase('done');
    } catch {
      if (!alive.current) return;
      setResult({
        tone: 'warning',
        title: 'Something went wrong preparing the setup',
        steps: ['Reload the page and try again. If it keeps happening, follow the manual installation steps below.'],
        showManualCopy: false,
        showInstallLink: false,
      });
      setPhase('error');
    } finally {
      busy.current = false;
    }
  };

  const working = phase === 'preparing' || phase === 'copying' || phase === 'opening';

  return (
    <section className="section" id="agent-setup" aria-labelledby="agent-setup-title">
     <div className="container">
      <div className="section__head section__head--center reveal">
        <p className="kicker">AI-assisted setup</p>
        <h2 id="agent-setup-title">Set up Bigin Studio with your AI agent</h2>
        <p className="sub">Let your AI coding agent install and configure Bigin Studio on your Mac. Follow a guided setup without manually going through every installation step.</p>
        <p className="hint">Prefer to do it yourself? <a href="#installation">Install manually instead</a>.</p>
      </div>

        <ul className="agents reveal">
          {AGENTS.map((agent) => (
            <li key={agent.id} className="agent" data-agent={agent.id}>
              <div className="agent__head">
                <span className="agent__logo" aria-hidden="true"><AiToolIcon name={agent.id} /></span>
                <div className="agent__txt">
                  <h3>{agent.name}</h3>
                  <p>{agent.description}</p>
                </div>
                <span className={`agent__status${agent.status === 'available' ? '' : ' agent__status--off'}`}>{agent.status === 'available' ? 'Available' : 'Coming soon'}</span>
              </div>
              {agent.status === 'available' ? (
                <>
                  <button type="button" className="btn btn--lg btn--block" onClick={() => start(agent)} aria-disabled={working} data-busy={working || undefined}>
                    {working ? BUSY_LABEL[phase] : agent.cta}
                  </button>
                  <p className="agent__note">Claude asks for your approval before changing anything. It will not create a project or clone any repository.</p>

                  <div className="agent__live" role="status" aria-live="polite">
                    {working && <p className="visually-hidden">{BUSY_LABEL[phase]}</p>}
                    {result && !working && (
                      <div className={`agent__result agent__result--${result.tone}`}>
                        <h4>{result.title}</h4>
                        <ol>{result.steps.map((s) => <li key={s}>{s}</li>)}</ol>
                        {result.showManualCopy && (
                          <textarea className="agent__prompt" readOnly rows={6} value={prompt} aria-label="Installation prompt" onFocus={(e) => e.currentTarget.select()} />
                        )}
                        {result.showInstallLink && (
                          <a className="btn btn--ghost btn--sm" href={agent.installUrl} target="_blank" rel="noopener noreferrer">Get {agent.name}</a>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button type="button" className="btn btn--lg btn--block" disabled>{agent.cta}</button>
                  <p className="agent__note">Not available yet.</p>
                </>
              )}
            </li>
          ))}
        </ul>
     </div>
    </section>
  );
}
