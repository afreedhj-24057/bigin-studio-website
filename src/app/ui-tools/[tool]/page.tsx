import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import ToolIcon from '@/components/ToolIcon';
import ToolsLink from '@/components/ToolsLink';
import { TOOLS, getTool } from '@/lib/tools';

export const dynamicParams = false;
export const generateStaticParams = () => TOOLS.map((t) => ({ tool: t.id }));

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const tool = getTool((await params).tool);
  return tool
    ? { title: `${tool.name} — Bigin UI Tools`, description: tool.description }
    : { title: 'Tool not found — Bigin UI Tools' };
}

const Back = () => (
  <ToolsLink className="back">
    <svg className="tool-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
    Back to UI Tools
  </ToolsLink>
);

export default async function ToolDetail({ params }: { params: Promise<{ tool: string }> }) {
  const tool = getTool((await params).tool);
  if (!tool) notFound();

  return (
    <>
      <main id="main">
        <div className="container detail-wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li><a href="/">Home</a></li>
              <li><ToolsLink id="crumb-tools">UI Tools</ToolsLink></li>
              <li aria-current="page">{tool.name}</li>
            </ol>
          </nav>
          <article className="detail">
            <header className="dhead">
              <span className="dhead__icon"><ToolIcon tool={tool} /></span>
              <div><span className="tool__cat">{tool.category}</span><h1>{tool.name}</h1></div>
            </header>
            <p className="dlead">{tool.detailedDescription}</p>
            <div className="dgrid">
              <section className="dsec"><h2>What it’s used for</h2><p>{tool.usedFor}</p></section>
              <section className="dsec"><h2>How it helps Bigin team</h2><p>{tool.helps}</p></section>
            </div>
            {tool.installSteps && (
              <section className="dsec">
                <h2>Installing the file</h2>
                <p className="dnote">Steps from the extension’s bundled README:</p>
                <ol className="steps">{tool.installSteps.map((s) => <li key={s}>{s}</li>)}</ol>
              </section>
            )}
            <div className="dactions">
              {tool.actionType === 'download' ? (
                <a className="btn btn--primary btn--lg" href={tool.fileUrl} download={tool.fileName}>
                  <svg className="ico" aria-hidden="true"><use href="#i-download" /></svg>{tool.detailActionLabel}
                </a>
              ) : tool.externalUrl?.startsWith('/') ? (
                <a className="btn btn--primary btn--lg" href={tool.externalUrl}>
                  {tool.detailActionLabel}<svg className="ico" aria-hidden="true"><use href="#i-external" /></svg>
                </a>
              ) : (
                <a className="btn btn--primary btn--lg" href={tool.externalUrl} target="_blank" rel="noopener noreferrer">
                  {tool.detailActionLabel}<svg className="ico" aria-hidden="true"><use href="#i-external" /></svg><span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              <Back />
            </div>
          </article>
        </div>
      </main>
      <Footer variant="tools" />
    </>
  );
}
