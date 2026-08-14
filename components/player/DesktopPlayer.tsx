import { GLASS } from "./glass";
import { Vinyl } from "./Vinyl";
import { SeekBar } from "./SeekBar";
import { TransportDesktop } from "./TransportDesktop";
import { formatTime } from "./formatTime";

type DesktopPlayerProps = {
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

export function DesktopPlayer({
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
}: DesktopPlayerProps) {
  return (
    <div
      className={`group relative hidden items-center gap-4 rounded-full p-3 pr-5 sm:flex sm:w-full ${GLASS}`}
    >
      <Vinyl thumbnailUrl={thumbnailUrl} isPlaying={isPlaying} size={80} spindleSize={12} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-white drop-shadow-sm">{title}</p>
        <p className="truncate text-[13px] text-white/70">{artist}</p>

        <div>
          <SeekBar currentTime={currentTime} duration={duration} onSeek={onSeek} />
          <div className="text-left text-[11px] tabular-nums text-white/60 font-mono-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>

      <TransportDesktop
        isPlaying={isPlaying}
        onPrev={onPrev}
        onNext={onNext}
        onTogglePlay={onTogglePlay}
      />
    </div>
  );
}
