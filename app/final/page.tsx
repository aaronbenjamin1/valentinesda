"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { getProgress, isAllDone } from "@/lib/progress";

export default function FinalPage() {
  const [progress, setProgress] = useState(getProgress());

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const unlocked = useMemo(() => isAllDone(progress), [progress]);

  function pop() {
    confetti({ particleCount: 130, spread: 75, origin: { y: 0.7 } });
  }

  return (
    <main className="min-svh pt-safe pb-safe paper-grain px-4 sm:px-6 py-8 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm underline opacity-80 hover:opacity-100">
          ← Back to menu
        </Link>

        <div className="mt-5 polaroid p-5 sm:p-6">
          <div className="text-xs uppercase tracking-[0.3em] opacity-70">Final</div>
          <h1 className="handwriting text-3xl sm:text-4xl mt-2">The final unlock 💘</h1>

          {!unlocked ? (
            <div className="mt-5 polaroid-photo p-6 text-center">
              <div className="handwriting text-6xl">🔒</div>
              <p className="mt-3 handwriting text-xl">Not yet. Finish the other three.</p>
              <p className="mt-2 opacity-80">(Yes, I’m making you do side quests.)</p>

              <Link
                href="/"
                className="inline-flex mt-5 w-full sm:w-auto justify-center px-4 py-3 rounded-2xl border border-black/10 bg-white/80 active:scale-[0.99]"
              >
                Back to menu
              </Link>
            </div>
          ) : (
            <div className="mt-5 polaroid-photo p-6 text-center">
              <div className="text-[11px] uppercase tracking-[0.35em] opacity-70">System Message</div>
              <div className="mt-3 handwriting text-4xl sm:text-5xl leading-[0.95]">
                Will you be my Valentine?
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={pop}
                  className="w-full px-5 py-3 rounded-2xl border border-black/10 bg-white active:scale-[0.99] handwriting text-lg"
                  type="button"
                >
                  Yes 💖
                </button>
                <button
                  onClick={pop}
                  className="w-full px-5 py-3 rounded-2xl border border-black/10 bg-white active:scale-[0.99] handwriting text-lg"
                  type="button"
                >
                  Obviously 💘
                </button>
              </div>

              <p className="mt-5 opacity-80">I hope u like da confetti.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
