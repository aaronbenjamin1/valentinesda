"use client";

export default function DeskHeader() {
  return (
    <div>
      <div className="text-[11px] sm:text-xs uppercase tracking-[0.35em] opacity-70">
        A Valentine Mini Game for my Fifi
      </div>

      <h1 className="handwriting text-[40px] sm:text-5xl mt-2 leading-[0.95]">
        <span className="scribble">Choose</span> your adventure{" "}
        <span className="align-middle">💌</span>
      </h1>

      <p className="mt-3 text-sm sm:text-base opacity-80 max-w-[62ch]">
        Three mini experiences. One final unlock.
      </p>
    </div>
  );
}