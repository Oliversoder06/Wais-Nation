import { create } from "zustand";

type Track = {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  videoId: string; // YouTube Video ID
};

type PlayerState = {
  currentTrack: Track | null;
  queue: Track[];
  history: Track[];
  isPlaying: boolean;

  playTrack: (track: Track) => void;
  playNext: () => void;
  playPrevious: () => void;
  addToQueue: (track: Track) => void;
  togglePlay: () => void;
};

export const useMusicStore = create<PlayerState>((set) => ({
  currentTrack: null,
  queue: [],
  history: [],
  isPlaying: false,

  playTrack: (track) =>
    set((state) => ({
      history: state.currentTrack
        ? [state.currentTrack, ...state.history]
        : state.history,
      currentTrack: track,
      queue: state.queue.filter((t) => t.id !== track.id), // Remove from queue if present
      isPlaying: true,
    })),

  playNext: () =>
    set((state) => {
      if (state.queue.length === 0) return state;
      const nextTrack = state.queue[0];
      return {
        history: state.currentTrack
          ? [state.currentTrack, ...state.history]
          : state.history,
        currentTrack: nextTrack,
        queue: state.queue.slice(1),
        isPlaying: true,
      };
    }),

  playPrevious: () =>
    set((state) => {
      if (state.history.length === 0) return state;
      const previousTrack = state.history[0];
      return {
        currentTrack: previousTrack,
        history: state.history.slice(1),
        queue: [state.currentTrack!, ...state.queue],
        isPlaying: true,
      };
    }),

  addToQueue: (track) =>
    set((state) => ({
      queue: [...state.queue, track],
    })),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
