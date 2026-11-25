'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';

const CHAPTERS = [
  { t: 0, label: '00:00', title: 'Administration access' },
  { t: 25, label: '00:25', title: 'Installer files' },
  { t: 52, label: '00:52', title: 'Setup Studio' },
  { t: 127, label: '02:07', title: 'Create project' },
  { t: 202, label: '03:22', title: 'Project dashboard' },
  { t: 277, label: '04:37', title: 'Start development server' },
];

const IDLE_MS = 2500;

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const fmt = (s: number) => {
  const t = Math.max(0, Math.floor(s || 0));
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
};
const chapterAt = (time: number) => {
  let idx = 0;
  CHAPTERS.forEach((c, i) => { if (time >= c.t) idx = i; });
  return idx;
};

type FsVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

const Ico = ({ d, fill }: { d: string; fill?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const PLAY = 'M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z';
const PAUSE = 'M8 5h2.5v14H8zM13.5 5H16v14h-2.5z';

export default function SetupVideo() {
  const root = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const tip = useRef<HTMLSpanElement>(null);
  const timeText = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const dragging = useRef(false);
  const activeRef = useRef(0);
  const lastSec = useRef(-1);

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [fs, setFs] = useState(false);
  const [canPip, setCanPip] = useState(false);
  const [canFs, setCanFs] = useState(false);

  // Push playback position into CSS variables / DOM text without re-rendering React.
  const sync = useCallback(() => {
    const v = video.current;
    const el = root.current;
    if (!v || !el) return;
    const d = Number.isFinite(v.duration) ? v.duration : 0;
    const t = v.currentTime;
    const idx = chapterAt(t);
    const end = idx + 1 < CHAPTERS.length ? CHAPTERS[idx + 1].t : d;
    const span = end - CHAPTERS[idx].t;
    el.style.setProperty('--p', String(d ? clamp(t / d) : 0));
    el.style.setProperty('--cp', String(span > 0 ? clamp((t - CHAPTERS[idx].t) / span) : 0));
    if (idx !== activeRef.current) { activeRef.current = idx; setActive(idx); }
    const sec = Math.floor(t);
    if (sec !== lastSec.current) {
      lastSec.current = sec;
      if (timeText.current) timeText.current.textContent = fmt(t);
      track.current?.setAttribute('aria-valuenow', String(sec));
      track.current?.setAttribute('aria-valuetext', `${fmt(t)}, ${CHAPTERS[idx].title}`);
    }
  }, []);

  const wake = useCallback(() => {
    const el = player.current;
    const v = video.current;
    if (!el || !v) return;
    el.classList.remove('is-idle');
    clearTimeout(idleTimer.current);
    if (!v.paused) idleTimer.current = setTimeout(() => el.classList.add('is-idle'), IDLE_MS);
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    setMuted(v.muted);
    setDuration(Number.isFinite(v.duration) ? v.duration : 0);
    setCanPip(!!document.pictureInPictureEnabled && !v.disablePictureInPicture);
    setCanFs(!!document.fullscreenEnabled || typeof (v as FsVideo).webkitEnterFullscreen === 'function');
    const onMeta = () => { setDuration(Number.isFinite(v.duration) ? v.duration : 0); sync(); };
    const onPlay = () => { setPlaying(true); setStarted(true); };
    const onPause = () => setPlaying(false);
    const onVol = () => setMuted(v.muted);
    const onFs = () => setFs(document.fullscreenElement === player.current);
    const syncEvents = ['seeking', 'seeked', 'timeupdate'] as const;
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('durationchange', onMeta);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onPause);
    v.addEventListener('volumechange', onVol);
    syncEvents.forEach((e) => v.addEventListener(e, sync));
    document.addEventListener('fullscreenchange', onFs);
    sync();
    return () => {
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('durationchange', onMeta);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onPause);
      v.removeEventListener('volumechange', onVol);
      syncEvents.forEach((e) => v.removeEventListener(e, sync));
      document.removeEventListener('fullscreenchange', onFs);
      clearTimeout(idleTimer.current);
    };
  }, [sync]);

  // Pause when the whole Setup section scrolls out of view (PiP keeps playing on purpose).
  useEffect(() => {
    const target = root.current?.closest('section') ?? root.current;
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => {
      const v = video.current;
      if (entry.isIntersecting || !v || v.paused || document.pictureInPictureElement === v) return;
      v.pause();
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  // Smooth progress: rAF runs only while the video is playing.
  useEffect(() => {
    wake();
    if (!playing) return;
    let raf = requestAnimationFrame(function loop() {
      sync();
      raf = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(raf);
  }, [playing, sync, wake]);

  // On mobile the chapter list is a horizontal strip: keep the active chip in view (without scrolling the page).
  useEffect(() => {
    const ol = list.current;
    const btn = ol?.children[active]?.firstElementChild as HTMLElement | undefined;
    if (!ol || !btn || ol.scrollWidth <= ol.clientWidth) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ol.scrollTo({ left: btn.offsetLeft - (ol.clientWidth - btn.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
  }, [active]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused || v.ended) v.play()?.catch(() => {});
    else v.pause();
  };

  const seekTo = (t: number) => {
    const v = video.current;
    if (!v) return;
    const go = () => { v.currentTime = clamp(t, 0, Number.isFinite(v.duration) ? v.duration : t); sync(); };
    if (v.readyState >= 1) go();
    else {
      v.addEventListener('loadedmetadata', go, { once: true });
      if (v.networkState === 0) v.load();
      sync();
    }
  };

  // Chapter click: seek only; the play/pause state is preserved.
  const seekChapter = (t: number) => {
    const v = video.current;
    seekTo(t);
    if (v && v.ended) v.pause();
  };

  const posFromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return clamp((e.clientX - r.left) / r.width);
  };

  const onTrackDown = (e: PointerEvent<HTMLDivElement>) => {
    const d = video.current?.duration;
    if (!d || !Number.isFinite(d)) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    e.currentTarget.classList.add('is-dragging');
    seekTo(posFromPointer(e) * d);
  };
  const onTrackMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = video.current?.duration;
    if (!d || !Number.isFinite(d)) return;
    const p = posFromPointer(e);
    const el = e.currentTarget;
    el.style.setProperty('--hp', String(p));
    if (tip.current) tip.current.textContent = `${fmt(p * d)} · ${CHAPTERS[chapterAt(p * d)].title}`;
    if (dragging.current) seekTo(p * d);
  };
  const onTrackUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    e.currentTarget.classList.remove('is-dragging');
  };
  const onTrackKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const v = video.current;
    if (!v) return;
    const t = v.currentTime;
    const d = Number.isFinite(v.duration) ? v.duration : 0;
    const cur = chapterAt(t);
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = t + 5;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = t - 5;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = d;
    else if (e.key === 'PageDown') next = CHAPTERS[Math.min(cur + 1, CHAPTERS.length - 1)].t;
    else if (e.key === 'PageUp') next = CHAPTERS[t - CHAPTERS[cur].t > 2 ? cur : Math.max(cur - 1, 0)].t;
    if (next === null) return;
    e.preventDefault();
    seekTo(next);
  };

  const togglePip = () => {
    const v = video.current;
    if (!v) return;
    if (document.pictureInPictureElement) document.exitPictureInPicture().catch(() => {});
    else v.requestPictureInPicture?.().catch(() => {});
  };

  const toggleFs = () => {
    const el = player.current;
    const v = video.current as FsVideo | null;
    if (!el || !v) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else if (document.fullscreenEnabled) el.requestFullscreen().catch(() => {});
    else v.webkitEnterFullscreen?.();
  };

  // State goes in data attributes: the root's className must stay static, because the page's
  // reveal effect adds `is-in` to it and a React className update would wipe that out.
  return (
    <div className="guide__media reveal" ref={root} data-playing={playing} data-started={started}>
      <div className="guide__video">
        <div className="guide__player vp" ref={player} onPointerMove={wake} onPointerDown={wake} onKeyDown={wake} onFocus={wake}>
          <video ref={video} id="setup-video" playsInline preload="metadata" poster="/assets/images/bigin-studio-setup-poster.jpg" aria-label="Bigin Studio setup walkthrough, silent screen recording" onClick={toggle}>
            <source src="/assets/videos/bigin-studio-setup.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>

          <span className="vp__chip" key={active} aria-hidden="true">
            <b>{String(active + 1).padStart(2, '0')}</b>{CHAPTERS[active].title}
          </span>
          <span className="vp__big" aria-hidden="true"><Ico d={PLAY} fill /></span>

          <div className="vp__bar">
            <div
              className="vp__track"
              ref={track}
              role="slider"
              tabIndex={0}
              aria-label="Seek video"
              aria-valuemin={0}
              aria-valuemax={Math.floor(duration)}
              aria-valuenow={0}
              aria-valuetext={`00:00, ${CHAPTERS[0].title}`}
              onPointerDown={onTrackDown}
              onPointerMove={onTrackMove}
              onPointerUp={onTrackUp}
              onPointerCancel={onTrackUp}
              onKeyDown={onTrackKey}
            >
              <span className="vp__rail">
                <i className="vp__fill" />
                {duration > 0 && CHAPTERS.slice(1).map((c) => <i key={c.t} className="vp__tick" style={{ left: `${(c.t / duration) * 100}%` }} />)}
              </span>
              <span className="vp__thumb" />
              <span className="vp__tip" ref={tip} aria-hidden="true" />
            </div>
            <div className="vp__row">
              <button type="button" className="vp__btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
                <span className={'vp__swap' + (playing ? ' is-b' : '')}><Ico d={PLAY} fill /><Ico d={PAUSE} fill /></span>
              </button>
              <span className="vp__time"><span ref={timeText}>00:00</span> / {fmt(duration)}</span>
              <span className="vp__sp" />
              <button type="button" className="vp__btn" onClick={() => { const v = video.current; if (v) v.muted = !v.muted; }} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted}>
                <span className={'vp__swap' + (muted ? ' is-b' : '')}>
                  <Ico d="M11 5 6 9H3v6h3l5 4V5Zm4.5 3.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
                  <Ico d="M11 5 6 9H3v6h3l5 4V5Zm5 4 5 6m0-6-5 6" />
                </span>
              </button>
              {canPip && (
                <button type="button" className="vp__btn" onClick={togglePip} aria-label="Picture in picture">
                  <Ico d="M3 5h18v14H3zM12 12h7v5h-7z" />
                </button>
              )}
              {canFs && (
                <button type="button" className="vp__btn" onClick={toggleFs} aria-label={fs ? 'Exit full screen' : 'Full screen'}>
                  <span className={'vp__swap' + (fs ? ' is-b' : '')}>
                    <Ico d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                    <Ico d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
        <p className="guide__note">This walkthrough is a silent screen recording. Chapter times are approximate.</p>
      </div>

      <nav className="chapters" aria-label="Video chapters">
        <h3 className="chapters__title">Chapters</h3>
        <ol className="chapters__list" ref={list}>
          {CHAPTERS.map((c, i) => {
            const state = i < active ? 'is-done' : i === active ? 'is-active' : 'is-next';
            const end = i + 1 < CHAPTERS.length ? CHAPTERS[i + 1].t : duration;
            return (
              <li key={c.t} className={state}>
                <button type="button" className={'chapter ' + state} aria-current={i === active ? 'step' : undefined} onClick={() => seekChapter(c.t)}>
                  <span className="chapter__ind" aria-hidden="true">
                    <span className="chapter__num">{i + 1}</span>
                    <span className="chapter__check"><Ico d="m6 12.5 4 4 8-9" /></span>
                    <span className="chapter__eq"><i /><i /><i /></span>
                    <span className="chapter__play"><Ico d={PLAY} fill /></span>
                  </span>
                  <span className="chapter__text">
                    <span className="chapter__name">{c.title}</span>
                    <span className="chapter__time">{c.label}</span>
                  </span>
                  {end > c.t && <span className="chapter__len" aria-hidden="true">{fmt(end - c.t)}</span>}
                  {i < active && <span className="visually-hidden">Completed</span>}
                  <span className="chapter__bar" aria-hidden="true"><i /></span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
