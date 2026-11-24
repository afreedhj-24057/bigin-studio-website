'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';

/** Link back to /ui-tools that preserves the ?view=list choice. */
export default function ToolsLink({ className, id, children }: { className?: string; id?: string; children: ReactNode }) {
  const [list, setList] = useState(false);
  useEffect(() => {
    setList(new URLSearchParams(window.location.search).get('view') === 'list');
  }, []);
  return <Link className={className} id={id} href={list ? '/ui-tools?view=list' : '/ui-tools'}>{children}</Link>;
}
