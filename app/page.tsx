"use client";

import { useEffect, useMemo, useState } from "react";
import DeskHeader from "@/components/DeskHeader";
import PolaroidCard from "@/components/PolaroidCard";
import { getProgress, isAllDone, resetProgress } from "@/lib/progress";

export default function HomePage() {
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    const onFocus = () => setProgress(getProgress());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const allDone = useMemo(() => isAllDone(progress), [progress]);

  // smaller rotations on mobile prevents “cut off” feelings
  const rot = { a: -3.5, b: 2.2, c: -1.8, d: 2.8 };

  return (
    <main className="relative min-svh pt-safe pb-safe overflow-hidden paper-grain">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-14 relative">
        <DeskHeader />

        {/* Banner */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl border border-black/10 bg-white/70 backdrop-blur">
            <span className="text-lg">📌</span>
            <div className="text-sm opacity-80">
              Complete all 3 to unlock the final page.
            </div>
          </div>

          <button
            onClick={() => {
              resetProgress();
              setProgress(getProgress());
            }}
            className="sm:ml-auto inline-flex items-center justify-center px-4 py-3 rounded-2xl border border-black/10 bg-white/70 hover:bg-white transition text-sm"
            type="button"
          >
            Reset (dev)
          </button>
        </div>

        {/* Desk tray */}
        <div className="mt-6 sm:mt-10 max-w-6xl mx-auto rounded-[26px] sm:rounded-[28px] border border-black/10 bg-white/40 backdrop-blur px-3 sm:px-8 py-5 sm:py-10">
          <div className="edge-fade-overlay">
            {/* BIG vertical room so captions never clip on mobile scrollers */}
            <div className="no-scrollbar flex items-end gap-5 sm:gap-10 overflow-x-auto pb-12 px-1 sm:px-4 snap-x snap-mandatory scroll-px-4 touch-pan-x min-h-[560px]">
              <div className="snap-center shrink-0">
                <PolaroidCard
                  title="Escape Room"
                  subtitle="Unlock clues from our memories"
                  href="/escape"
                  rotationDeg={rot.a}
                  done={progress.escape}
                  image="/photos/escape.jpeg"
                />
              </div>

              <div className="snap-center shrink-0">
                <PolaroidCard
                  title="Love Story"
                  subtitle="Choose-your-own chaos"
                  href="/story"
                  rotationDeg={rot.b}
                  done={progress.story}
                  image="/photos/story.jpeg"
                />
              </div>

              <div className="snap-center shrink-0">
                <PolaroidCard
                  title="Wrapped"
                  subtitle="Stats + moments + pics"
                  href="/wrapped"
                  rotationDeg={rot.c}
                  done={progress.wrapped}
                  image="/photos/wrapped.jpg"
                />
              </div>

              <div className="snap-center shrink-0">
                <PolaroidCard
                  title="Final Unlock"
                  subtitle="No peeking 😈"
                  href="/final"
                  rotationDeg={rot.d}
                  locked={!allDone}
                  stamp={allDone ? "UNLOCKED" : "LOCKED"}
                  image="/photos/final.jpeg"
                />
              </div>
            </div>
          </div>

          <div className="hidden sm:block text-xs opacity-60 mt-1">
            Tip: swipe / shift+mousewheel to scroll.
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center text-sm opacity-70">
          Made with mild emotional risk and strong vibes.
        </div>
      </div>
    </main>
  );
}