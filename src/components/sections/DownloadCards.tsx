'use client';

import { useRelease } from '../ReleaseProvider';
import { formatSize, type PlatformId } from '@/lib/release';

const CARDS: { id: PlatformId; chip: string; arch: string; blurb: string; cta: string }[] = [
  { id: 'mac-arm64', chip: 'Apple Silicon', arch: 'ARM64', blurb: 'Compatible with M1, M2, M3 and later Apple Silicon Macs.', cta: 'Download for Apple Silicon' },
  { id: 'mac-x64', chip: 'Intel Mac', arch: 'x64', blurb: 'Compatible with Intel-based Macs.', cta: 'Download for Intel Mac' },
];

/** Starts the download without exposing the URL as a link (GitHub serves the DMG as an attachment, so the page stays put). */
const startDownload = (url: string) => { window.location.assign(url); };

const MESSAGES = {
  loading: 'Checking for the latest release…',
  unavailable: 'The first production release has not been published yet.',
  network: 'Release information could not be loaded. Please try again later.',
  invalid: 'Release information is currently unavailable. Please try again later.',
};

export default function DownloadCards() {
  const state = useRelease();
  const release = state.status === 'published' ? state.release : null;
  const message = state.status === 'published' ? null
    : state.status === 'error' ? MESSAGES[state.reason] : MESSAGES[state.status];

  return (
    <>
      <div className="downloads" id="downloads" aria-busy={state.status === 'loading'}>
        {CARDS.map((c) => {
          const p = release?.platforms[c.id];
          const ready = !!(release && p?.available && p.url);
          const size = p ? formatSize(p.size) : null;
          return (
            <article className="dl reveal" key={c.id}>
              <div className="dl__top">
                <span className="chip">{c.chip}</span>
                <span className="dl__arch">{c.arch}</span>
              </div>
              <h3>{c.chip}</h3>
              <p>{c.blurb}</p>
              <dl className="dl__meta">
                <div><dt>Architecture</dt><dd>{c.arch}</dd></div>
                <div><dt>Version</dt><dd>{ready ? release!.version : '—'}</dd></div>
                <div><dt>Size</dt><dd>{ready && size ? size : '—'}</dd></div>
              </dl>
              <p className="file"><svg className="ico"><use href="#i-box" /></svg><code>{ready && p!.fileName ? p!.fileName : 'Not available yet'}</code></p>
              {ready ? (
                <button type="button" className="btn btn--primary btn--block" onClick={() => startDownload(p!.url!)}>
                  <svg className="ico" aria-hidden="true"><use href="#i-download" /></svg>{c.cta}
                </button>
              ) : (
                <button type="button" className="btn btn--primary btn--block" disabled aria-disabled="true">
                  <svg className="ico" aria-hidden="true"><use href="#i-download" /></svg>{state.status === 'loading' ? 'Checking…' : 'Not available yet'}
                </button>
              )}
            </article>
          );
        })}
      </div>
      {message && <p className="hint release-status" role="status">{message}</p>}
      {release && release.releaseNotes.length > 0 && (
        <section className="release-notes" aria-labelledby="release-notes-title">
          <h3 id="release-notes-title">What’s new in {release.version}</h3>
          <ul>{release.releaseNotes.map((n) => <li key={n}>{n}</li>)}</ul>
        </section>
      )}
    </>
  );
}
