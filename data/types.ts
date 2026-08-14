export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  /** Duration in seconds, shown before playback reports the real value. */
  duration: number;
  /** YouTube video id -- must be a video you have the right to use, or a
   * stream from the rights holder's own channel with embedding enabled. */
  videoId: string;
};

export type Playlist = {
  id: string;
  name: string;
  nameNe: string;
  tracks: Track[];
};
