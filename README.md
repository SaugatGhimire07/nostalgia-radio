# Nostalgia Radio

A single-page jukebox: a spinning vinyl playing real YouTube uploads through a
custom glass-pill / stacked-card player, set against a scene that swaps
between a wide and a tall composition depending on device orientation.

## Getting it running

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Before you ship this

**1. Drop in your real background art.**
`public/bg/scene-wide.png` and `public/bg/scene-tall.png` right now are
placeholder gradients I generated just so the layout renders. Replace them
with your two separately-composed images (landscape and portrait) — same
filenames, same folder.

**2. Add your tracks.**
`data/tracks.ts` ships with three placeholder playlists and no real songs —
every `videoId` is the literal string `REPLACE_WITH_VIDEO_ID`, which will
correctly fail to load and get skipped by the error handler. Open the file
and swap in your own tracks. Only add a video if you hold the rights to it,
or it's the rights holder's own YouTube upload with embedding enabled.
Each track is a one-line object:

```ts
{
  id: "unique-slug",
  title: "Song title",
  artist: "Performing artist",
  film: "Film / album",
  year: 1975,
  duration: 245,           // seconds, shown until playback reports the real value
  videoId: "XXXXXXXXXXX",  // the 11-character id from the YouTube URL
}
```

**3. Point the social links somewhere real.**
`components/SocialLinks.tsx` has three placeholder `href="#"` entries.

**4. Wire up analytics.**
`@vercel/analytics` and `@vercel/speed-insights` are already mounted in
`app/layout.tsx`. They report automatically once the site is deployed to
Vercel — nothing else to configure. The player also fires a custom
`player_error` event (with the failing `videoId` and YouTube's error code)
any time a video can't load, so you can see dead links in your Vercel
Analytics dashboard.

## How playback works

There are no audio files — `components/player/usePlayerEngine.ts` loads the
YouTube IFrame Player API once and drives a **single** `YT.Player` instance
for the whole page. The live iframe is the vinyl's cover art (cropped to a
circle with CSS, never hidden), and it's re-parented via a React portal
between the desktop pill and mobile card layouts, so switching layouts
mid-song never interrupts playback or spins up a second, invisible player.

- `onStateChange` drives the UI (play/pause state, track-end auto-advance).
- `onError` skips to the next track automatically and logs a
  `player_error` analytics event — videos do get taken down or have
  embedding disabled after you ship, and the radio should keep playing
  through it.

## Project structure

```
app/            route, layout, global styles/theme tokens
components/     background, grain, clock/listener/social row
components/player/  the whole player: engine hook, desktop + mobile layouts
data/           track/playlist data and types
lib/            YouTube IFrame API loader
types/          ambient YT.* type declarations
```
