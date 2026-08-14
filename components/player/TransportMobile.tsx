import { NextIcon, PauseIcon, PlayIcon, PrevIcon } from "./icons";

type TransportMobileProps = {
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
};

export function TransportMobile({
  isPlaying,
  onPrev,
  onNext,
  onTogglePlay,
}: TransportMobileProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous track"
        className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition active:bg-white/15 active:text-white"
      >
        <PrevIcon className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-black shadow-lg transition active:scale-95"
      >
        {isPlaying ? (
          <PauseIcon className="h-6 w-6" />
        ) : (
          <PlayIcon className="ml-0.5 h-6 w-6" />
        )}
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next track"
        className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition active:bg-white/15 active:text-white"
      >
        <NextIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
