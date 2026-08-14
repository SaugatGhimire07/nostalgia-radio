import { HeroBackground } from "@/components/HeroBackground";
import { GrainOverlay } from "@/components/GrainOverlay";
import { TopRow } from "@/components/TopRow";
import { Hero } from "@/components/Hero";
import { PlayerRoot } from "@/components/player/PlayerRoot";
import { playlists } from "@/data/tracks";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      <HeroBackground />
      <GrainOverlay />
      <TopRow />
      <Hero />

      <div className="safe-b fixed z-20 flex w-full justify-center">
        <PlayerRoot playlists={playlists} />
      </div>
    </main>
  );
}
