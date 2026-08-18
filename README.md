# Nostalgia Radio 🇳🇵

**Live:** [nostalgia-radio-alpha.vercel.app](https://nostalgia-radio-alpha.vercel.app)

A nostalgic Nepali music radio web application designed to bring the feeling of old Kathmandu/Nepalese streets, local shops, traditional architecture, and classic Nepali music into a modern web experience.

The project combines a cinematic visual experience with a custom music player, Nepali-inspired typography, ambient styling, and curated listening modes.

## ✨ Features

- 🎵 **Nostalgic Nepali Radio Experience**
  - Curated Nepali songs and devotional melodies.
  - Multiple listening modes such as **Golden Hour**, **Old Cassette**, and **Devotional Melody**.

- ▶️ **Custom Music Player**
  - Play/pause controls.
  - Previous/next track controls.
  - Seek/progress bar.
  - Current track title, artist, artwork, and playback progress.
  - Desktop and mobile player components.

- 🏔️ **Nepal-Inspired Visual Design**
  - Full-screen cinematic background.
  - Traditional Nepali architecture, prayer flags, mountains, local shops, and street-life inspired visuals.
  - Warm, nostalgic glassmorphism UI.

- 🕰️ **Live Clock**
  - Displays the current time as part of the radio experience.

- 👥 **Listener Count**
  - Displays the number of people currently listening.

- 📱 **Responsive Design**
  - Dedicated desktop and mobile player components.
  - Responsive layout for different screen sizes.

- 🎨 **Atmospheric UI**
  - Grain/noise overlay.
  - Glass-style player controls.
  - Minimal navigation and social links.
  - Large Devanagari hero typography.

- ▶️ **YouTube Integration**
  - Includes a YouTube API loader for sourcing/playing music.

## 🛠️ Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **CSS**
- **YouTube API**
- **Custom React hooks**
- **Responsive UI / Glassmorphism**

## 📁 Project Structure

```text
nostalgia-radio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── player/
│   │   ├── DesktopPlayer.tsx
│   │   ├── MobilePlayer.tsx
│   │   ├── PlayerRoot.tsx
│   │   ├── PlaylistTabs.tsx
│   │   ├── SeekBar.tsx
│   │   ├── TransportDesktop.tsx
│   │   ├── TransportMobile.tsx
│   │   ├── Vinyl.tsx
│   │   ├── formatTime.ts
│   │   ├── glass.ts
│   │   ├── icons.tsx
│   │   └── usePlayerEngine.ts
│   │
│   ├── Clock.tsx
│   ├── GrainOverlay.tsx
│   ├── Hero.tsx
│   ├── HeroBackground.tsx
│   ├── ListenerCount.tsx
│   ├── SocialLinks.tsx
│   └── TopRow.tsx
│
├── data/
│   ├── tracks.ts
│   └── types.ts
│
├── lib/
│   └── loadYouTubeApi.ts
│
├── types/
│   └── youtube.d.ts
│
├── public/
│   └── bg/
│       ├── scene-tall.png
│       └── scene-wide.png
│
├── package.json
└── README.md
```

## 🎧 Player Architecture

The music player is separated into smaller reusable components rather than keeping the entire player inside one large component.

```text
PlayerRoot
│
├── PlaylistTabs
│
├── DesktopPlayer
│   ├── Vinyl
│   ├── SeekBar
│   └── TransportDesktop
│
└── MobilePlayer
    ├── SeekBar
    └── TransportMobile
```

The `usePlayerEngine.ts` hook handles the core playback logic, while the UI components are responsible for presenting the player on different screen sizes.

## 🎼 Track Data

Music information is separated into the `data/` directory.

```text
data/
├── tracks.ts
└── types.ts
```

This makes it easier to add, remove, or organize songs without changing the player interface.

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

Only add a video you hold the rights to, or that's the rights holder's own YouTube upload with embedding enabled.

## 🖥️ Running Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd nostalgia-radio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the application

Visit:

```text
http://localhost:3000
```

## 🎨 Design Inspiration

The visual direction is inspired by the feeling of listening to an old Nepali cassette or radio while walking through a traditional Nepalese neighborhood.

The design intentionally combines:

- Traditional Nepali architecture
- Prayer flags
- Himalayan scenery
- Local markets and street life
- Devanagari typography
- Warm cinematic lighting
- Vintage music-player elements
- Modern glassmorphism

The goal is not simply to create a music player, but to make the website feel like a **digital memory of Nepal**.

## 📸 Preview

Add a screenshot of the application here:

```md
![Nostalgia Radio Preview](./preview.png)
```

## 🚀 Future Improvements

Potential improvements include:

- [ ] Add more curated Nepali playlists.
- [ ] Add real-time listener statistics.
- [ ] Add volume and mute controls.
- [ ] Add a queue/history system.
- [ ] Add song search.
- [ ] Add favorites/bookmarks.
- [ ] Improve mobile playback controls.
- [ ] Add persistent playback between page navigation.
- [ ] Add richer album artwork and track metadata.
- [ ] Add an optional dark/low-light listening mode.
- [x] Deploy the application for public listening.

## 👨‍💻 About the Project

**Nostalgia Radio** is a personal frontend project exploring how music, visual storytelling, and interaction design can be combined into a memorable web experience.

Built with **Next.js, React, TypeScript, and custom UI components**, with a focus on responsive design, component architecture, and an immersive Nepal-inspired visual identity.

---

Made with ❤️ and nostalgia for Nepal 🇳🇵

