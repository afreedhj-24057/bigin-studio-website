'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Page-wide behaviour that works on server-rendered markup:
 *  - smooth in-page anchor scrolling (offset is handled by CSS scroll-padding-top)
 *  - scroll-reveal for `.reveal` elements, with sibling stagger
 */
export default function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href') ?? '';
      if (id.length < 2) return;
      const target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      history.pushState(null, '', id);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduce) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
    document.querySelectorAll('.grid, .bento, .timeline, .downloads, .hero__inner').forEach((group) => {
      group.querySelectorAll<HTMLElement>(':scope > .reveal').forEach((el, i) => el.style.setProperty('--d', i * 70 + 'ms'));
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
