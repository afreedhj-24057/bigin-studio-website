'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export type AccordionItem = { btnId: string; panelId: string; title: ReactNode; body: ReactNode };

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Item({ item, open, onToggle, onKeyDown, btnRef }: {
  item: AccordionItem; open: boolean; onToggle: () => void; onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  btnRef: (el: HTMLButtonElement | null) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Height animation, ported from the original script (hidden is only ever set imperatively after first paint).
  useEffect(() => {
    const p = panelRef.current;
    if (!p) return;
    if (first.current) { first.current = false; return; }
    if (prefersReducedMotion()) { p.hidden = !open; p.style.height = ''; return; }
    if (open) {
      p.hidden = false;
      p.style.height = '0px';
      void p.offsetHeight;
      p.style.height = p.scrollHeight + 'px';
      const done = () => { p.style.height = ''; p.removeEventListener('transitionend', done); };
      p.addEventListener('transitionend', done);
    } else {
      p.style.height = p.scrollHeight + 'px';
      void p.offsetHeight;
      p.style.height = '0px';
      const hide = () => { if (p.previousElementSibling?.querySelector('button')?.getAttribute('aria-expanded') === 'false') p.hidden = true; p.removeEventListener('transitionend', hide); };
      p.addEventListener('transitionend', hide);
    }
  }, [open]);

  return (
    <div className={'acc__item' + (open ? ' is-open' : '')}>
      <h3 className="acc__h">
        <button ref={btnRef} className="acc__btn" type="button" aria-expanded={open} aria-controls={item.panelId} id={item.btnId} onClick={onToggle} onKeyDown={onKeyDown}>
          {item.title}
          <svg className="ico" aria-hidden="true"><use href="#i-chevron" /></svg>
        </button>
      </h3>
      <div ref={panelRef} className="acc__panel" id={item.panelId} role="region" aria-labelledby={item.btnId} hidden>
        <div className="acc__inner">{item.body}</div>
      </div>
    </div>
  );
}

/** Single-open accordion. `openOnLink`: clicking a#<href> opens the first item (used by "installation steps" links). */
export default function Accordion({ items, single = false, openOnLink }: { items: AccordionItem[]; single?: boolean; openOnLink?: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!openOnLink) return;
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest(`a[href="${openOnLink}"]`)) setOpenIdx(0);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [openOnLink]);

  const onKeyDown = (i: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    const n = items.length;
    let t: number | null = null;
    if (e.key === 'ArrowDown') t = (i + 1) % n;
    else if (e.key === 'ArrowUp') t = (i - 1 + n) % n;
    else if (e.key === 'Home') t = 0;
    else if (e.key === 'End') t = n - 1;
    if (t !== null) { e.preventDefault(); btns.current[t]?.focus(); }
  };

  return (
    <div className={'acc reveal' + (single ? ' acc--single' : '')}>
      {items.map((it, i) => (
        <Item key={it.btnId} item={it} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          onKeyDown={onKeyDown(i)} btnRef={(el) => { btns.current[i] = el; }} />
      ))}
    </div>
  );
}
