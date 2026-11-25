'use client';

import { useEffect, useRef } from 'react';
import type { Tool } from '@/lib/tools';
import ToolIcon from './ToolIcon';

/** Modal with a tool's full details. Uses the native <dialog> for focus trap, Esc and backdrop. */
export default function ToolDialog({ tool, onClose }: { tool: Tool | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (tool && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
    if (!tool && d.open) d.close();
    return () => { document.documentElement.style.overflow = ''; };
  }, [tool]);

  return (
    <dialog
      ref={ref}
      className="tdialog"
      aria-labelledby="tdialog-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
    >
      {tool && (
        <article className="detail">
          <button type="button" className="tdialog__close" aria-label="Close" onClick={() => ref.current?.close()}>
            <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <header className="dhead">
            <span className="dhead__icon"><ToolIcon tool={tool} /></span>
            <div><span className="tool__cat">{tool.category}</span><h2 id="tdialog-title" className="tdialog__title">{tool.name}</h2></div>
          </header>
          <p className="dlead">{tool.detailedDescription}</p>
          <div className="dgrid">
            <section className="dsec"><h3>What it’s used for</h3><p>{tool.usedFor}</p></section>
            <section className="dsec"><h3>How it helps Bigin team</h3><p>{tool.helps}</p></section>
          </div>
          {tool.installSteps && (
            <section className="dsec">
              <h3>Installing the file</h3>
              <p className="dnote">Steps from the extension’s bundled README:</p>
              <ol className="steps">{tool.installSteps.map((s) => <li key={s}>{s}</li>)}</ol>
            </section>
          )}
          <div className="dactions">
            {tool.actionType === 'download' ? (
              <a className="btn btn--primary btn--lg" href={tool.fileUrl} download={tool.fileName}>
                <svg className="ico" aria-hidden="true"><use href="#i-download" /></svg>{tool.detailActionLabel}
              </a>
            ) : tool.externalUrl?.startsWith('/') ? (
              <a className="btn btn--primary btn--lg" href={tool.externalUrl}>
                {tool.detailActionLabel}<svg className="ico" aria-hidden="true"><use href="#i-external" /></svg>
              </a>
            ) : (
              <a className="btn btn--primary btn--lg" href={tool.externalUrl} target="_blank" rel="noopener noreferrer">
                {tool.detailActionLabel}<svg className="ico" aria-hidden="true"><use href="#i-external" /></svg><span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            <button type="button" className="back" onClick={() => ref.current?.close()}>
              <svg className="tool-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
              Back to UI Tools
            </button>
          </div>
        </article>
      )}
    </dialog>
  );
}
