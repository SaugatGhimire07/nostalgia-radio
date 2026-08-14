import { NextIcon, PauseIcon, PlayIcon, PrevIcon } from "./icons";

type TransportDesktopProps = {
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
};

export function TransportDesktop({
  isPlaying,
  onPrev,
  onNext,
  onTogglePlay,
}: TransportDesktopProps) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous track"
        className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
      >
        <PrevIcon className="h-[18px] w-[18px]" />
      </button>

      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        aria-pressed={isPlaying}
        className="grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <PauseIcon className="h-[18px] w-[18px]" />
        ) : (
          <PlayIcon className="h-5 w-5" />
        )}
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next track"
        className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white active:scale-95"
      >
        <NextIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
