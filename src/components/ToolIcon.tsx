import type { Tool } from '@/lib/tools';

export default function ToolIcon({ tool }: { tool: Tool }) {
  return (
    <svg
      className="tool-ico"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: tool.icon }}
    />
  );
}
