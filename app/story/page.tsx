"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { setDone } from "@/lib/progress";

type Node = {
  id: string;
  text: string;
  choices: { label: string; next: string }[];
};

const NODES: Node[] = [
  {
    id: "start",
    text: "You open this link and immediately sense… Aaron is up to something.",
    choices: [
      { label: "Investigate 👀", next: "investigate" },
      { label: "Ignore him (suspicious) 😌", next: "ignore" },
      { label: "Steal snacks 🍪", next: "snacks" },
    ],
  },
  {
    id: "investigate",
    text: "You find evidence: a poorly hidden surprise and maximum nervous energy.",
    choices: [
      { label: "Confront him", next: "confront" },
      { label: "Pretend you saw nothing", next: "pretend" },
    ],
  },
  {
    id: "ignore",
    text: "You ignore him. He becomes 12% more dramatic. Somehow, it works.",
    choices: [
      { label: "Ask what's going on", next: "confront" },
      { label: "Keep ignoring (evil)", next: "pretend" },
    ],
  },
  {
    id: "snacks",
    text: "You steal snacks. He accepts this as one of your love languages.",
    choices: [
      { label: "Offer him one (generous)", next: "pretend" },
      { label: "No sharing (unforgivable)", next: "confront" },
    ],
  },
  {
    id: "confront",
    text: "He blurts out: “I made you something.”",
    choices: [{ label: "Continue", next: "end" }],
  },
  {
    id: "pretend",
    text: "You play it cool. He’s sweating. This is your power.",
    choices: [{ label: "Continue", next: "end" }],
  },
  {
    id: "end",
    text: "Story complete. The final decision is locked behind the other experiences… for now. 💘",
    choices: [],
  },
];

export default function StoryPage() {
  const [current, setCurrent] = useState("start");
  const node = useMemo(() => NODES.find((n) => n.id === current)!, [current]);
  const isEnd = node.id === "end";

  return (
    <main className="min-svh pt-safe pb-safe paper-grain px-4 sm:px-6 py-8 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm underline opacity-80 hover:opacity-100">
          ← Back to menu
        </Link>

        <div className="mt-5 sm:mt-6 polaroid p-5 sm:p-6">
          <div className="text-xs uppercase tracking-[0.3em] opacity-70">
            Love Story
          </div>
          <h1 className="handwriting text-3xl sm:text-4xl mt-2">
            Choose your path 🎮
          </h1>

          <div className="mt-5 sm:mt-6 polaroid-photo p-5 sm:p-6">
            <p className="text-lg sm:text-xl handwriting leading-snug">
              {node.text}
            </p>
          </div>

          <div className="mt-5 sm:mt-6 flex flex-col gap-3">
            {node.choices.map((c) => (
              <button
                key={c.label}
                onClick={() => setCurrent(c.next)}
                className="text-left w-full px-4 py-3 rounded-2xl border border-black/10 bg-white/70 hover:bg-white transition active:scale-[0.99]"
                type="button"
              >
                {c.label}
              </button>
            ))}

            {isEnd && (
              <button
                onClick={() => setDone("story")}
                className="mt-1 w-full px-4 py-3 rounded-2xl border border-black/10 bg-white hover:bg-white/90 transition active:scale-[0.99]"
                type="button"
              >
                Mark as completed ✅
              </button>
            )}

            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrent("start")}
                className="w-full text-sm px-3 py-3 rounded-2xl border border-black/10 bg-white/60 hover:bg-white transition active:scale-[0.99]"
                type="button"
              >
                Restart
              </button>

              <Link
                href="/"
                className="w-full text-sm px-3 py-3 rounded-2xl border border-black/10 bg-white/60 hover:bg-white transition active:scale-[0.99] text-center"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}