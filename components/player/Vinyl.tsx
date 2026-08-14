type VinylProps = {
  thumbnailUrl: string;
  isPlaying: boolean;
  size: number;
  spindleSize: number;
};

export function Vinyl({ thumbnailUrl, isPlaying, size, spindleSize }: VinylProps) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="h-full w-full overflow-hidden rounded-full shadow-lg ring-1 ring-white/20"
        style={{
          animation: "var(--animate-spin-slow)",
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      >
        <img
          src={thumbnailUrl}
          alt=""
          draggable={false}
          className="block h-full w-full scale-125 object-cover"
        />
      </div>
      {/* spindle hole */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40"
        style={{ width: spindleSize, height: spindleSize }}
      />
    </div>
  );
}
