'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TOOLS, toolHref, type ToolView } from '@/lib/tools';
import ToolIcon from './ToolIcon';

export default function ToolsBrowser() {
  const pathname = usePathname();
  const [view, setView] = useState<ToolView>('card');

  // Cards render on the server; restore a ?view=list preference after mount.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('view') === 'list') setView('list');
  }, []);

  const choose = (v: ToolView) => {
    setView(v);
    window.history.replaceState(null, '', v === 'list' ? '?view=list' : pathname);
  };

  return (
    <>
      <div className="toolbar">
        <p className="toolbar__count">{TOOLS.length} tools</p>
        <div className="vtoggle" role="group" aria-label="Display mode">
          <button type="button" className={'vtoggle__btn' + (view === 'card' ? ' is-active' : '')} aria-pressed={view === 'card'} title="Card View" aria-label="Card View" onClick={() => choose('card')}>
            <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><rect x="3.500" y="3.500" width="7" height="7" rx="1.500" /><rect x="13.500" y="3.500" width="7" height="7" rx="1.500" /><rect x="3.500" y="13.500" width="7" height="7" rx="1.500" /><rect x="13.500" y="13.500" width="7" height="7" rx="1.500" /></svg>
          </button>
          <button type="button" className={'vtoggle__btn' + (view === 'list' ? ' is-active' : '')} aria-pressed={view === 'list'} title="List View" aria-label="List View" onClick={() => choose('list')}>
            <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 6.500h16M4 12h16M4 17.500h16" /></svg>
          </button>
        </div>
      </div>
      <ul className={'tools' + (view === 'list' ? ' tools--list' : '')} id="tools">
        {TOOLS.map((t) => (
          <li key={t.id}>
            <Link className="tool" href={toolHref(t.id, view)}>
              <span className="tool__icon"><ToolIcon tool={t} /></span>
              <span className="tool__body"><span className="tool__name">{t.name}</span><span className="tool__desc">{t.description}</span></span>
              <span className="tool__cat">{t.category}</span>
              <svg className="tool-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
