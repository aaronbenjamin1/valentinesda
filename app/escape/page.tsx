"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { setDone } from "@/lib/progress";

const ANSWER_1 = "starbucks"; // TODO: change
const ANSWER_2 = "cats"; // TODO: change

export default function EscapeRoomPage() {
  const [step, setStep] = useState(1);
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const input1Ref = useRef<HTMLInputElement | null>(null);
  const input2Ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => setMsg(null), [step]);

  useEffect(() => {
    // focus the relevant input for mobile convenience
    if (step === 1) input1Ref.current?.focus();
    if (step === 2) input2Ref.current?.focus();
  }, [step]);

  const norm = (s: string) => s.trim().toLowerCase();

  function tryStep1() {
    if (norm(a1) === norm(ANSWER_1)) setStep(2);
    else setMsg("Nope 😈 Hint: think about *our* first date.");
  }

  function tryStep2() {
    if (norm(a2) === norm(ANSWER_2)) {
      setDone("escape");
      setStep(3);
    } else {
      setMsg("Close… or not. Hint: tiny furry roommate energy.");
    }
  }

  return (
    <main className="min-svh pt-safe pb-safe paper-grain px-4 sm:px-6 py-8 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm underline opacity-80 hover:opacity-100">
          ← Back to menu
        </Link>

        <div className="mt-5 sm:mt-6 polaroid p-5 sm:p-6">
          <div className="text-xs uppercase tracking-[0.3em] opacity-70">
            Escape Room
          </div>
          <h1 className="handwriting text-3xl sm:text-4xl mt-2">
            Unlock the invite 🔐
          </h1>
          <p className="mt-2 opacity-80">
            Two quick locks. Be honest, you like this.
          </p>

          <div className="mt-5 sm:mt-6 border-t border-black/10 pt-5 sm:pt-6">
            {step === 1 && (
              <div>
                <div className="handwriting text-xl">Lock 1</div>
                <p className="mt-2 opacity-80">Where was our first date?</p>

                <input
                  ref={input1Ref}
                  value={a1}
                  onChange={(e) => setA1(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") tryStep1();
                  }}
                  className="mt-3 w-full px-4 py-3 rounded-2xl border border-black/10 bg-white/70 outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="type the answer…"
                  inputMode="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  enterKeyHint="done"
                />

                <button
                  onClick={tryStep1}
                  className="mt-4 w-full sm:w-auto px-4 py-3 rounded-2xl border border-black/10 bg-white hover:bg-white/90 transition active:scale-[0.99]"
                  type="button"
                >
                  Submit →
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="handwriting text-xl">Lock 2</div>
                <p className="mt-2 opacity-80">What creatures run our house?</p>

                <input
                  ref={input2Ref}
                  value={a2}
                  onChange={(e) => setA2(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") tryStep2();
                  }}
                  className="mt-3 w-full px-4 py-3 rounded-2xl border border-black/10 bg-white/70 outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="one word is fine…"
                  inputMode="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  enterKeyHint="done"
                />

                <button
                  onClick={tryStep2}
                  className="mt-4 w-full sm:w-auto px-4 py-3 rounded-2xl border border-black/10 bg-white hover:bg-white/90 transition active:scale-[0.99]"
                  type="button"
                >
                  Unlock →
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <div className="handwriting text-2xl sm:text-3xl">Unlocked ✅</div>
                <p className="mt-2 opacity-80">
                  Okay smarty. Go back and pick another card.
                </p>

                <Link
                  href="/"
                  className="inline-flex mt-5 w-full sm:w-auto justify-center px-4 py-3 rounded-2xl border border-black/10 bg-white hover:bg-white/90 transition active:scale-[0.99]"
                >
                  Back to menu
                </Link>
              </div>
            )}

            {msg && (
              <div className="mt-4 px-4 py-3 rounded-2xl border border-black/10 bg-white/60">
                {msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}