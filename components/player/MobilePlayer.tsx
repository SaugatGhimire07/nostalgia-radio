import { GLASS } from "./glass";
import { Vinyl } from "./Vinyl";
import { SeekBar } from "./SeekBar";
import { TransportMobile } from "./TransportMobile";
import { formatTime } from "./formatTime";

type MobilePlayerProps = {
  thumbnailUrl: string;
  title: string;
  artist: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
};

export function MobilePlayer({
  thumbnailUrl,
  title,
  artist,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
}: MobilePlayerProps) {
  return (
    <div className={`flex w-full flex-col gap-3 rounded-[26px] p-4 sm:hidden ${GLASS}`}>
      {/* row 1 -- vinyl + title/artist */}
      <div className="flex items-center gap-3">
        <Vinyl thumbnailUrl={thumbnailUrl} isPlaying={isPlaying} size={64} spindleSize={10} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-white">{title}</p>
          <p className="truncate text-[12.5px] text-white/70">{artist}</p>
        </div>
      </div>

      {/* row 2 -- seek bar */}
      <SeekBar currentTime={currentTime} duration={duration} onSeek={onSeek} />

      {/* row 3 -- time left, transport centred */}
      <div className="grid grid-cols-3 items-center">
        <div className="text-[11px] text-white/60 font-mono-nums">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <div className="flex justify-center">
          <TransportMobile
            isPlaying={isPlaying}
            onPrev={onPrev}
            onNext={onNext}
            onTogglePlay={onTogglePlay}
          />
        </div>
        <div />
      </div>
    </div>
  );
}
