export type ProgressKey = "escape" | "story" | "wrapped";

const STORAGE_KEY = "valentine_progress_v1";

export function getProgress(): Record<ProgressKey, boolean> {
  if (typeof window === "undefined") return { escape: false, story: false, wrapped: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { escape: false, story: false, wrapped: false };
    const parsed = JSON.parse(raw);
    return {
      escape: Boolean(parsed.escape),
      story: Boolean(parsed.story),
      wrapped: Boolean(parsed.wrapped),
    };
  } catch {
    return { escape: false, story: false, wrapped: false };
  }
}

export function setDone(key: ProgressKey) {
  const p = getProgress();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...p, [key]: true }));
}

export function resetProgress() {
  if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
}

export function isAllDone(p: Record<ProgressKey, boolean>) {
  return Boolean(p.escape && p.story && p.wrapped);
}