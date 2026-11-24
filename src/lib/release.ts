/**
 * Release service — the manifest at /updates/production.json is the single source of truth
 * for production release info. Nothing about versions or download URLs is hardcoded elsewhere.
 */
export const MANIFEST_URL = '/updates/production.json';

export type PlatformId = 'mac-arm64' | 'mac-x64';
export const PLATFORM_IDS: PlatformId[] = ['mac-arm64', 'mac-x64'];

export type PlatformRelease = {
  available: boolean;
  url: string | null;
  fileName: string | null;
  sha256: string | null;
  size: number | null;
};

export type PublishedRelease = {
  version: string;
  tag: string;
  releaseDate: string;
  updateType: string;
  minimumRequiredVersion: string | null;
  releaseNotes: string[];
  platforms: Record<PlatformId, PlatformRelease>;
};

export type ReleaseState =
  | { status: 'loading' }
  | { status: 'unavailable' } // valid manifest, but no published production release
  | { status: 'error'; reason: 'network' | 'invalid' }
  | { status: 'published'; release: PublishedRelease };

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const str = (v: unknown): string | null => (typeof v === 'string' && v.trim() ? v.trim() : null);

/** Only https URLs are accepted as download targets (blocks javascript:, data:, http:). */
const safeUrl = (v: unknown): string | null => {
  const s = str(v);
  if (!s) return null;
  try { return new URL(s).protocol === 'https:' ? s : null; } catch { return null; }
};

function parsePlatform(v: unknown): PlatformRelease {
  const none: PlatformRelease = { available: false, url: null, fileName: null, sha256: null, size: null };
  if (!isObj(v) || v.available !== true) return none;
  const url = safeUrl(v.url);
  if (!url) return none; // flagged available but no usable URL: treat as unavailable
  return {
    available: true,
    url,
    fileName: str(v.fileName),
    sha256: str(v.sha256),
    size: typeof v.size === 'number' && v.size > 0 ? v.size : null,
  };
}

/** Validates raw manifest JSON. Never throws. */
export function parseManifest(raw: unknown): ReleaseState {
  if (!isObj(raw) || !isObj(raw.platforms)) return { status: 'error', reason: 'invalid' };
  if (raw.status !== 'published' || raw.available !== true) return { status: 'unavailable' };

  const version = str(raw.version);
  const tag = str(raw.tag);
  const releaseDate = str(raw.releaseDate);
  const updateType = str(raw.updateType);
  if (!version || !tag || !releaseDate || !updateType) return { status: 'error', reason: 'invalid' };

  const notes = Array.isArray(raw.releaseNotes) ? raw.releaseNotes : raw.releaseNotes == null ? [] : [raw.releaseNotes];
  const platforms = { 'mac-arm64': parsePlatform(raw.platforms['mac-arm64']), 'mac-x64': parsePlatform(raw.platforms['mac-x64']) };
  if (!platforms['mac-arm64'].available && !platforms['mac-x64'].available) return { status: 'unavailable' };

  return {
    status: 'published',
    release: {
      version, tag, releaseDate, updateType,
      minimumRequiredVersion: str(raw.minimumRequiredVersion),
      releaseNotes: notes.map(str).filter((n): n is string => n !== null),
      platforms,
    },
  };
}

/** Fetches and validates the manifest. Never throws; failures become an `error` state. */
export async function fetchRelease(signal?: AbortSignal): Promise<ReleaseState> {
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), 8000);
  signal?.addEventListener('abort', () => timeout.abort());
  try {
    const res = await fetch(MANIFEST_URL, { cache: 'no-store', signal: timeout.signal });
    if (!res.ok) return { status: 'error', reason: 'network' };
    let json: unknown;
    try { json = await res.json(); } catch { return { status: 'error', reason: 'invalid' }; }
    return parseManifest(json);
  } catch {
    return { status: 'error', reason: 'network' };
  } finally {
    clearTimeout(timer);
  }
}

export const formatSize = (bytes: number | null) => (bytes ? `${Math.round(bytes / 1_000_000)} MB` : null);
