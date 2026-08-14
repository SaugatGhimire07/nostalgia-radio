"use client";

import { useRef, useState } from "react";

type SeekBarProps = {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
};

export function SeekBar({ currentTime, duration, onSeek }: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragRatio, setDragRatio] = useState<number | null>(null);

  const safeDuration = duration > 0 ? duration : 1;
  const ratio = dragRatio ?? Math.min(1, Math.max(0, currentTime / safeDuration));

  function ratioFromPointer(clientX: number) {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const nextRatio = ratioFromPointer(e.clientX);
    setDragRatio(nextRatio);
    onSeek(nextRatio * safeDuration);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (dragRatio === null) return;
    const nextRatio = ratioFromPointer(e.clientX);
    setDragRatio(nextRatio);
    onSeek(nextRatio * safeDuration);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragRatio(null);
  }

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.round(safeDuration)}
      aria-valuenow={Math.round(ratio * safeDuration)}
      className="group relative flex h-6 w-full touch-none items-center"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/20">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-white/90"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
      <div
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white opacity-0 shadow transition-opacity duration-150 group-hover:opacity-100"
        style={{ left: `${ratio * 100}%` }}
      />
    </div>
  );
}
