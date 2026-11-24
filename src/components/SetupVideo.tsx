'use client';

import { useEffect, useRef, useState } from 'react';

const CHAPTERS = [
  { t: 0, label: '00:00', title: 'Administration access' },
  { t: 25, label: '00:25', title: 'Installer files' },
  { t: 52, label: '00:52', title: 'Setup Studio' },
  { t: 127, label: '02:07', title: 'Create project' },
  { t: 202, label: '03:22', title: 'Project dashboard' },
  { t: 277, label: '04:37', title: 'Start development server' },
];

export default function SetupVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(-1);

  const update = (time: number) => {
    let idx = -1;
    CHAPTERS.forEach((c, i) => { if (time >= c.t) idx = i; });
    setActive(idx);
  };

  const seek = (t: number) => {
    const v = video.current;
    if (!v) return;
    const go = () => { v.currentTime = t; update(t); v.play()?.catch(() => {}); };
    if (v.readyState >= 1) go();
    else { v.addEventListener('loadedmetadata', go, { once: true }); v.load(); }
  };

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const on = () => update(v.currentTime);
    v.addEventListener('timeupdate', on);
    v.addEventListener('seeked', on);
    return () => { v.removeEventListener('timeupdate', on); v.removeEventListener('seeked', on); };
  }, []);

  return (
    <div className="guide__media reveal">
      <div className="guide__video">
        <div className="guide__player">
          <video ref={video} id="setup-video" controls playsInline preload="metadata" poster="/assets/images/bigin-studio-setup-poster.jpg" aria-label="Bigin Studio setup walkthrough, silent screen recording">
            <source src="/assets/videos/bigin-studio-setup.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
        <p className="guide__note">This walkthrough is a silent screen recording. Chapter times are approximate.</p>
      </div>
      <nav className="chapters" aria-label="Video chapters">
        <h3 className="chapters__title">Chapters</h3>
        <ol className="chapters__list">
          {CHAPTERS.map((c, i) => (
            <li key={c.t}>
              <button type="button" className={'chapter' + (i === active ? ' is-active' : '')} aria-current={i === active ? 'true' : undefined} onClick={() => seek(c.t)}>
                <span className="chapter__time">{c.label}</span>{c.title}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
