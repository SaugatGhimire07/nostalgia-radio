"use client";

import type { Playlist } from "@/data/types";
import { usePlayerEngine } from "./usePlayerEngine";
import { PlaylistTabs } from "./PlaylistTabs";
import { DesktopPlayer } from "./DesktopPlayer";
import { MobilePlayer } from "./MobilePlayer";

export function PlayerRoot({ playlists }: { playlists: Playlist[] }) {
  const engine = usePlayerEngine(playlists);
  const thumbnailUrl = `https://i.ytimg.com/vi/${engine.track.videoId}/mqdefault.jpg`;

  return (
    <div className="pointer-events-auto w-full max-w-xl px-4">
      <PlaylistTabs
        playlists={engine.playlists}
        activeIndex={engine.playlistIndex}
        onSelect={engine.switchPlaylist}
      />
      <DesktopPlayer
        thumbnailUrl={thumbnailUrl}
        title={engine.track.title}
        artist={engine.track.artist}
        isPlaying={engine.isPlaying}
        currentTime={engine.currentTime}
        duration={engine.duration}
        onTogglePlay={engine.togglePlay}
        onPrev={engine.prev}
        onNext={engine.next}
        onSeek={engine.seek}
      />
      <MobilePlayer
        thumbnailUrl={thumbnailUrl}
        title={engine.track.title}
        artist={engine.track.artist}
        isPlaying={engine.isPlaying}
        currentTime={engine.currentTime}
        duration={engine.duration}
        onTogglePlay={engine.togglePlay}
        onPrev={engine.prev}
        onNext={engine.next}
        onSeek={engine.seek}
      />
      {/* Audio only -- the visible art is the static thumbnail above. */}
      <div id={engine.videoTargetId} className="yt-audio-host" aria-hidden="true" />
    </div>
  );
}
