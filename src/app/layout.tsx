import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@/styles/styles.css';
import '@/styles/ui-tools.css';
import Header from '@/components/Header';
import IconSprite from '@/components/IconSprite';
import PageEffects from '@/components/PageEffects';
import ReleaseProvider from '@/components/ReleaseProvider';

export const metadata: Metadata = {
  title: 'Bigin Studio — Your Bigin Development Workspace',
  description: 'Bigin Studio is a macOS desktop workspace for the Bigin team: project setup, AI development kit provisioning, Git, the Lyte dev server and an integrated terminal in one window.',
  icons: { icon: '/assets/images/bigin-logo.png' },
  other: { 'color-scheme': 'light dark' },
};

export const viewport: Viewport = { themeColor: '#25a45a' };

// Runs before first paint: enables the `.js` reveal styles and applies a saved theme (no flash).
const themeScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('bs-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">Skip to content</a>
        <IconSprite />
        <ReleaseProvider>
          <Header />
          {children}
        </ReleaseProvider>
        <PageEffects />
      </body>
    </html>
  );
}
