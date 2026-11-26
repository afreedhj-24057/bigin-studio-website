'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const MODES = ['system', 'light', 'dark'] as const;
type Mode = (typeof MODES)[number];
const THEME_KEY = 'bs-theme';

const HOME_LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#agent-setup', label: 'AI setup' },
  { href: '#installation', label: 'Manual setup' },
];

function storedMode(): Mode {
  try { const t = localStorage.getItem(THEME_KEY); return t === 'light' || t === 'dark' ? t : 'system'; } catch { return 'system'; }
}

function Brand({ href, label }: { href: string; label?: string }) {
  const inner = (
    <>
      <img className="brand__mark" src="/assets/images/bigin-logo.png" alt="" aria-hidden="true" width={30} height={30} />
      <span className="brand__sep" aria-hidden="true" />
      <span className="brand__name"><span>Bigin</span><span className="brand__studio">Studio</span></span>
    </>
  );
  return href.startsWith('#')
    ? <a className="brand" href={href} aria-label={label}>{inner}</a>
    : <Link className="brand" href={href} aria-label={label}>{inner}</Link>;
}

export { Brand };

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mode, setMode] = useState<Mode>('system');
  const [activeId, setActiveId] = useState<string | null>(null);

  /* Theme: system (default) -> light -> dark */
  const applyMode = useCallback((m: Mode) => {
    const root = document.documentElement;
    if (m === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', m);
    const dark = m === 'dark' || (m === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#111618' : '#25a45a');
    setMode(m);
  }, []);

  useEffect(() => {
    applyMode(storedMode());
    const dq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (storedMode() === 'system') applyMode('system'); };
    dq.addEventListener('change', onChange);
    return () => dq.removeEventListener('change', onChange);
  }, [applyMode]);

  const cycleTheme = () => {
    const next = MODES[(MODES.indexOf(storedMode()) + 1) % 3];
    try { if (next === 'system') localStorage.removeItem(THEME_KEY); else localStorage.setItem(THEME_KEY, next); } catch {}
    applyMode(next);
  };

  /* Mobile menu: Escape, outside click, route/hash change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) { setMenuOpen(false); navRef.current?.querySelector<HTMLElement>('.nav__toggle')?.focus(); }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element;
      if (!navRef.current?.contains(t) || t.closest('.nav__links a')) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, [menuOpen]);

  /* Nav background + active link on scroll */
  useEffect(() => {
    const ids = isHome ? HOME_LINKS.map((l) => l.href.slice(1)) : [];
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (!ids.length) return;
      const line = window.scrollY + window.innerHeight * 0.35;
      let current: string | null = null;
      ids.forEach((id) => { const el = document.getElementById(id); if (el && el.offsetTop <= line) current = id; });
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [isHome]);

  const onToolsPage = pathname.startsWith('/ui-tools');
  const nextMode = MODES[(MODES.indexOf(mode) + 1) % 3];

  return (
    <header className={'nav' + (scrolled ? ' is-scrolled' : '') + (menuOpen ? ' is-open' : '')} id="top" ref={navRef}>
      <div className="container nav__inner">
        {isHome ? <Brand href="#overview" label="Bigin Studio — back to top" /> : <Brand href="/" label="Bigin Studio — home" />}
        <div className="nav__right">
          <nav className="nav__links" id="site-nav" aria-label="Primary">
            {isHome ? (
              <>
                {HOME_LINKS.map((l) => {
                  const on = activeId === l.href.slice(1);
                  return <a key={l.href} href={l.href} className={on ? 'is-active' : undefined} aria-current={on ? 'true' : undefined}>{l.label}</a>;
                })}
                <Link href="/ui-tools">UI Tools</Link>
                <a className="btn btn--primary btn--sm nav__cta" href="#downloads">
                  <svg className="ico" aria-hidden="true"><use href="#i-download" /></svg>Download
                </a>
              </>
            ) : (
              <>
                <Link href="/">Home</Link>
                <Link href="/ui-tools" className={onToolsPage ? 'is-active' : undefined} aria-current={onToolsPage ? 'page' : undefined}>UI Tools</Link>
              </>
            )}
          </nav>
          <button className="theme-toggle" type="button" data-mode={mode} aria-label={`Theme: ${mode}. Click to switch to ${nextMode}.`} title={`Theme: ${mode}`} onClick={cycleTheme}>
            <svg className="ico ico--system" aria-hidden="true"><use href="#i-system" /></svg>
            <svg className="ico ico--light" aria-hidden="true"><use href="#i-sun" /></svg>
            <svg className="ico ico--dark" aria-hidden="true"><use href="#i-moon" /></svg>
          </button>
          <button className="nav__toggle" type="button" aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((o) => !o)}>
            <svg className="ico ico--menu" aria-hidden="true"><use href="#i-menu" /></svg>
            <svg className="ico ico--close" aria-hidden="true"><use href="#i-close" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
