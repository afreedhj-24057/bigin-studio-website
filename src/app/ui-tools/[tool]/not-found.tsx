import Link from 'next/link';
import Footer from '@/components/Footer';

export default function ToolNotFound() {
  return (
    <>
      <main id="main">
        <div className="container detail-wrap">
          <article className="detail">
            <div className="notfound">
              <h1>We couldn’t find that tool</h1>
              <p>The tool you’re looking for doesn’t exist or the link is incomplete. Head back to the UI Tools page to see everything available.</p>
              <Link className="back" href="/ui-tools">Back to UI Tools</Link>
            </div>
          </article>
        </div>
      </main>
      <Footer variant="tools" />
    </>
  );
}
