"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { setDone } from "@/lib/progress";

type Slide = { title: string; body: string; big?: string; image?: string };

const SLIDES: Slide[] = [
  { title: "Relationship Wrapped", body: "A highly scientific recap of us.", big: "2026", image: "/photos/wrapped/01.jpeg" },
  { title: "First Tree!", body: "Our first big Christmas tree at our new place!", big: "🎄", image: "/photos/wrapped/02.jpeg" },
  { title: "Big Beanits", body: "Using your beanits.", big: "🫶", image: "/photos/wrapped/03.jpeg" },
  { title: "KITTIES", body: "Cayuts ZOI ZOI ZOI", big: "🐈", image: "/photos/wrapped/cats.jpeg" },
  { title: "MARRIED!!", body: "WE GOT MEOWIED!", big: "YAY YAY YAY!!!!!", image: "/photos/wrapped/05.jpeg" },
  { title: "Final Slide", body: "This unlocks something on the main menu.", big: "🔓" },
];

export default function WrappedPage() {
  const [i, setI] = useState(0);
  const slide = useMemo(() => SLIDES[i], [i]);

  const isFirst = i === 0;
  const isLast = i === SLIDES.length - 1;

  return (
    <main className="min-svh pt-safe pb-safe paper-grain px-4 sm:px-6 py-8 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm underline opacity-80 hover:opacity-100">
          ← Back to menu
        </Link>

        <div className="mt-5 polaroid p-5 sm:p-6">
          <div className="text-xs uppercase tracking-[0.3em] opacity-70">Wrapped</div>
          <h1 className="handwriting text-3xl sm:text-4xl mt-2">Our year in review 🎧</h1>

          <div className="mt-5 polaroid-photo overflow-hidden">
            {slide.image ? (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 92vw, 640px"
                  priority={i === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,transparent_55%,rgba(0,0,0,0.14))]" />
              </div>
            ) : null}

            <div className="p-5 sm:p-6 text-center">
              <div className="text-[11px] uppercase tracking-[0.35em] opacity-70">{slide.title}</div>
              {slide.big ? <div className="mt-3 handwriting text-6xl">{slide.big}</div> : null}
              <p className="mt-4 text-lg handwriting">{slide.body}</p>
            </div>
          </div>

          {/* Dots (big tap targets) */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={[
                  "h-3 rounded-full transition",
                  idx === i ? "w-9 bg-black/70" : "w-3 bg-black/20 active:bg-black/35",
                ].join(" ")}
                aria-label={`Go to slide ${idx + 1}`}
                type="button"
              />
            ))}
          </div>

          {/* Controls: full width on mobile */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => setI((x) => Math.max(0, x - 1))}
              className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-white/75 active:scale-[0.99] disabled:opacity-50"
              disabled={isFirst}
              type="button"
            >
              ← Back
            </button>

            {!isLast ? (
              <button
                onClick={() => setI((x) => Math.min(SLIDES.length - 1, x + 1))}
                className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-white active:scale-[0.99]"
                type="button"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => setDone("wrapped")}
                className="w-full px-4 py-3 rounded-2xl border border-black/10 bg-white active:scale-[0.99]"
                type="button"
              >
                Mark completed ✅
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}