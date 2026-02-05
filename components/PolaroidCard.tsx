"use client";

import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  href: string;
  rotationDeg: number;
  done?: boolean;
  locked?: boolean;
  stamp?: string;
  emoji?: string;
  image?: string;
};

export default function PolaroidCard({
  title,
  subtitle,
  href,
  rotationDeg,
  done,
  locked,
  stamp,
  emoji,
  image,
}: Props) {
  const pill = locked ? "🔒 Locked" : done ? "✅ Done" : "✨ Open";

  const card = (
    <div
      className={[
        // Mobile-first sizing: big, tappable
        "polaroid relative w-[88vw] max-w-[380px] sm:w-[340px] p-4 pb-10",
        // Better touch behavior
        "touch-manipulation select-none",
        // Smooth hover on desktop, subtle press on mobile
        "transition duration-300 will-change-transform",
        locked
          ? "opacity-55"
          : "active:scale-[0.99] hover:-translate-y-2 hover:shadow-[0_40px_120px_rgba(0,0,0,0.22)]",
      ].join(" ")}
      style={{ transform: `rotate(${rotationDeg}deg)` }}
    >
      <div className="tape -top-3 left-1/2 -translate-x-1/2" />

      {/* Photo */}
      <div className="polaroid-photo aspect-[4/3] w-full relative overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 88vw, 340px"
            priority={false}
          />
        ) : (
          <div className="h-full w-full grid place-items-center">
            <div className="text-center px-6">
              <div className="text-[11px] uppercase tracking-[0.35em] opacity-70">
                ValentineOS
              </div>
              <div className="mt-2 handwriting text-3xl">
                {emoji ? <span className="mr-2">{emoji}</span> : null}
                {title}
              </div>
            </div>
          </div>
        )}

        {/* Film vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,transparent_55%,rgba(0,0,0,0.14))]" />
      </div>

      {/* Caption */}
      <div className="pt-4 pb-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="handwriting text-2xl leading-none break-words">
              {title}
            </div>
            <div className="mt-1 text-sm opacity-75 break-words">
              {subtitle}
            </div>
          </div>

          <span className="shrink-0 text-xs px-2.5 py-1 rounded-full border border-black/10 bg-white/75 backdrop-blur">
            {pill}
          </span>
        </div>
      </div>

      {stamp && (
        <div className="absolute right-4 top-14 rotate-[12deg] select-none">
          <div className="px-3 py-1 border-2 border-red-600/60 text-red-700/70 rounded-md font-semibold tracking-wide bg-white/40">
            {stamp}
          </div>
        </div>
      )}
    </div>
  );

  if (locked) return <div className="cursor-not-allowed">{card}</div>;

  return (
    <Link
      href={href}
      className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25"
    >
      {card}
    </Link>
  );
}