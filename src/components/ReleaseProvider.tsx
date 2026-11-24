'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchRelease, type ReleaseState } from '@/lib/release';

const ReleaseContext = createContext<ReleaseState>({ status: 'loading' });

/** Fetches the production manifest once in the browser and shares it with the page. */
export default function ReleaseProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ReleaseState>({ status: 'loading' });
  useEffect(() => {
    const ac = new AbortController();
    fetchRelease(ac.signal).then((s) => { if (!ac.signal.aborted) setState(s); });
    return () => ac.abort();
  }, []);
  return <ReleaseContext.Provider value={state}>{children}</ReleaseContext.Provider>;
}

export const useRelease = () => useContext(ReleaseContext);

/** Inline version label; `fallback` is shown until/unless a published release exists. */
export function ReleaseVersion({ prefix = '', fallback = '' }: { prefix?: string; fallback?: string }) {
  const r = useRelease();
  return <>{r.status === 'published' ? `${prefix}${r.release.version}` : fallback}</>;
}
