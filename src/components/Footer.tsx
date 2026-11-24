import Link from 'next/link';
import { Brand } from './Header';
import { TOOLS } from '@/lib/tools';
import { ReleaseVersion } from './ReleaseProvider';

export default function Footer({ variant = 'home' }: { variant?: 'home' | 'tools' }) {
  const home = variant === 'home';
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Brand href={home ? '#overview' : '/'} />
            <p>A development workspace built for the Bigin client team.</p>
          </div>
          <nav className="footer__nav" aria-label="Footer">
            {home ? (
              <>
                <a href="#overview">Overview</a>
                <a href="#why">Why Bigin Studio</a>
                <a href="#features">Features</a>
                <a href="#how-it-works">How it works</a>
                <a href="#ai">AI development</a>
                <a href="#installation">Installation</a>
                <a href="#faq">FAQ</a>
                <Link href="/ui-tools">UI Tools</Link>
              </>
            ) : (
              TOOLS.map((t) => <Link key={t.id} href={`/ui-tools/${t.id}`}>{t.name}</Link>)
            )}
          </nav>
        </div>
        <div className="footer__bottom">
          <span>Crafted with care by Bigin UI Team.</span>
          {home && <span><ReleaseVersion prefix="Version " /></span>}
        </div>
      </div>
    </footer>
  );
}
