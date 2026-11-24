import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import ToolsBrowser from '@/components/ToolsBrowser';

export const metadata: Metadata = {
  title: 'Bigin UI Tools — Bigin Studio',
  description: 'Tools and resources for the Bigin client team: components, icons, VS Code extensions and utilities.',
};

export default function UiToolsPage() {
  return (
    <>
      <main id="main">
        <section className="phead" aria-labelledby="page-title">
          <div className="container">
            <p className="eyebrow"><span className="pill">Bigin Client Team</span></p>
            <h1 id="page-title">Bigin UI Tools</h1>
            <p className="lead">Everything you need to build, explore, and work efficiently with Bigin UI components.</p>
          </div>
        </section>
        <section className="tools-wrap" aria-label="Available tools">
          <div className="container">
            <ToolsBrowser />
          </div>
        </section>
      </main>
      <Footer variant="tools" />
    </>
  );
}
