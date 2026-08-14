import type { Playlist } from "@/data/types";
import { GLASS } from "./glass";

type PlaylistTabsProps = {
  playlists: Playlist[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function PlaylistTabs({ playlists, activeIndex, onSelect }: PlaylistTabsProps) {
  return (
    <div className={`mb-3 flex w-full items-center gap-2 rounded-full p-1.5 ${GLASS}`}>
      {playlists.map((playlist, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={playlist.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-pressed={active}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-3 py-2 transition ${
              active
                ? "bg-white text-black shadow-lg"
                : "text-white/70 hover:bg-white/15 hover:text-white"
            }`}
          >
            <span className="text-[13px] font-semibold leading-tight">{playlist.name}</span>
            <span
              className={`text-[12px] leading-tight ${
                active ? "text-black/60" : "text-white/50"
              }`}
            >
              {playlist.nameNe}
            </span>
          </button>
        );
      })}
    </div>
  );
}
