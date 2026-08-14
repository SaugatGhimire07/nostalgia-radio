"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { loadYouTubeApi } from "@/lib/loadYouTubeApi";
import type { Playlist, Track } from "@/data/types";

const VIDEO_TARGET_ID = "yt-video-target";

export function usePlayerEngine(playlists: Playlist[]) {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  const playerRef = useRef<YT.Player | null>(null);
  // The object returned by `new YT.Player(...)` exists immediately, but its
  // API methods (cueVideoById, playVideo, seekTo, ...) aren't populated
  // until the iframe's internal handshake finishes -- calling them before
  // that throws "is not a function". Gate all player-method calls on this.
  const readyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const consecutiveErrorsRef = useRef(0);

  const playlist = playlists[playlistIndex];
  const track_ = playlist.tracks[trackIndex];

  // Keep the latest track in a ref so the ENDED handler (captured once by
  // the YT.Player at construction time) always sees the current value.
  const trackRef = useRef<Track>(track_);
  trackRef.current = track_;
  const playlistRef = useRef<Playlist>(playlist);
  playlistRef.current = playlist;

  const goToTrack = useCallback(
    (nextIndex: number, opts: { autoplay: boolean }) => {
      const list = playlistRef.current.tracks;
      const wrapped = (nextIndex + list.length) % list.length;
      setTrackIndex(wrapped);
      setCurrentTime(0);
      setDuration(list[wrapped].duration);

      const player = playerRef.current;
      if (!player || !readyRef.current) return;
      if (opts.autoplay) {
        player.loadVideoById(list[wrapped].videoId);
      } else {
        player.cueVideoById(list[wrapped].videoId);
      }
    },
    [],
  );

  const handleError = useCallback(
    (code: number) => {
      const badTrack = trackRef.current;
      console.warn(
        `[player] video failed to load (code ${code}) -- videoId: ${badTrack.videoId}`,
      );
      track("player_error", { code, videoId: badTrack.videoId });

      consecutiveErrorsRef.current += 1;
      if (consecutiveErrorsRef.current >= playlistRef.current.tracks.length) {
        // Every track in this playlist has now failed in a row -- stop
        // instead of skip-looping forever.
        console.warn("[player] every track in this playlist failed to load -- stopping");
        setIsPlaying(false);
        return;
      }

      // The current track is unplayable -- skip forward and keep the radio going.
      goToTrack(
        playlistRef.current.tracks.findIndex((t) => t.id === badTrack.id) + 1,
        { autoplay: true },
      );
    },
    [goToTrack],
  );

  // Create the player exactly once. Track/playlist switches after this
  // reuse the same YT.Player via loadVideoById/cueVideoById rather than
  // tearing it down, so playback survives layout changes cleanly.
  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then((YTApi) => {
      if (cancelled) return;
      const initialTrack = trackRef.current;

      playerRef.current = new YTApi.Player(VIDEO_TARGET_ID, {
        videoId: initialTrack.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            setReady(true);
            // The user may have switched tracks/playlists while the player
            // was still loading -- those calls were skipped, so sync now.
            if (trackRef.current.videoId !== initialTrack.videoId) {
              playerRef.current?.cueVideoById(trackRef.current.videoId);
            }
            setDuration(playerRef.current?.getDuration() || initialTrack.duration);
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              playerRef.current?.playVideo();
            }
          },
          onStateChange: (event) => {
            if (event.data === YTApi.PlayerState.PLAYING) {
              consecutiveErrorsRef.current = 0;
              setIsPlaying(true);
              setDuration(playerRef.current?.getDuration() || trackRef.current.duration);
            } else if (event.data === YTApi.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === YTApi.PlayerState.ENDED) {
              const list = playlistRef.current.tracks;
              const currentIdx = list.findIndex((t) => t.id === trackRef.current.id);
              goToTrack(currentIdx + 1, { autoplay: true });
            }
          },
          onError: (event) => handleError(event.data),
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // Intentionally run once: track/playlist changes are driven imperatively.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll playback position while playing -- the API only pushes state
  // transitions, not a ticking clock.
  useEffect(() => {
    if (isPlaying) {
      pollRef.current = setInterval(() => {
        const player = playerRef.current;
        if (player) setCurrentTime(player.getCurrentTime() || 0);
      }, 500);
    } else if (pollRef.current) {
      clearInterval(pollRef.current);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player || !readyRef.current) {
      // API/player still loading -- remember the intent so onReady can
      // honour it. Never gate the button itself on readiness.
      pendingPlayRef.current = true;
      return;
    }
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }, [isPlaying]);

  const next = useCallback(() => {
    consecutiveErrorsRef.current = 0;
    const list = playlistRef.current.tracks;
    const currentIdx = list.findIndex((t) => t.id === trackRef.current.id);
    goToTrack(currentIdx + 1, { autoplay: isPlaying });
  }, [goToTrack, isPlaying]);

  const prev = useCallback(() => {
    consecutiveErrorsRef.current = 0;
    const list = playlistRef.current.tracks;
    const currentIdx = list.findIndex((t) => t.id === trackRef.current.id);
    goToTrack(currentIdx - 1, { autoplay: isPlaying });
  }, [goToTrack, isPlaying]);

  const seek = useCallback((seconds: number) => {
    if (readyRef.current) {
      playerRef.current?.seekTo(seconds, true);
    }
    setCurrentTime(seconds);
  }, []);

  const switchPlaylist = useCallback(
    (nextPlaylistIndex: number) => {
      if (nextPlaylistIndex === playlistIndex) return;
      consecutiveErrorsRef.current = 0;
      setPlaylistIndex(nextPlaylistIndex);
      setTrackIndex(0);
      setCurrentTime(0);
      const nextList = playlists[nextPlaylistIndex].tracks;
      setDuration(nextList[0].duration);
      const player = playerRef.current;
      if (!player || !readyRef.current) return;
      if (isPlaying) {
        player.loadVideoById(nextList[0].videoId);
      } else {
        player.cueVideoById(nextList[0].videoId);
      }
    },
    [playlistIndex, playlists, isPlaying],
  );

  return {
    videoTargetId: VIDEO_TARGET_ID,
    playlists,
    playlist,
    playlistIndex,
    track: track_,
    trackIndex,
    isPlaying,
    currentTime,
    duration: duration || track_.duration,
    ready,
    togglePlay,
    next,
    prev,
    seek,
    switchPlaylist,
  };
}

export type PlayerEngine = ReturnType<typeof usePlayerEngine>;
