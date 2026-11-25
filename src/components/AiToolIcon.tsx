const ICONS: Record<string, React.ReactNode> = {
  claude: <path strokeLinecap="round" strokeWidth="2.2" d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />,
  cursor: (
    <g strokeLinejoin="round">
      <path d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4z" />
      <path d="M4 7.4l8 4.6 8-4.6M12 12v9.2" />
    </g>
  ),
  codex: (
    <g strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="15" rx="4" />
      <path d="M7.5 9.5l3 2.5-3 2.5M13 14.5h3.5" />
    </g>
  ),
  copilot: (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10.5C5 7 8 4.5 12 4.5s7 2.5 7 6v4.5c0 2.5-3 4.5-7 4.5s-7-2-7-4.5z" />
      <path d="M9 11.5v2M15 11.5v2M5 11H3.5v3H5M19 11h1.5v3H19" />
    </g>
  ),
};

export default function AiToolIcon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg className="ai-tool__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" focusable="false">
      {ICONS[name]}
    </svg>
  );
}
