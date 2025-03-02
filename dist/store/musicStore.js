"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMusicStore = void 0;
const zustand_1 = require("zustand");
exports.useMusicStore = (0, zustand_1.create)((set) => ({
    currentTrack: null,
    queue: [],
    history: [],
    isPlaying: false,
    playbackPosition: 0, // default starting at 0 seconds
    volume: 50, // default volume level
    playTrack: (track) => set((state) => ({
        history: state.currentTrack
            ? [state.currentTrack, ...state.history]
            : state.history,
        currentTrack: track, // ✅ This should now have all correct details
        queue: state.queue.filter((t) => t.id !== track.id),
        isPlaying: true, // ✅ Ensure it's marked as playing
    })),
    playNext: () => set((state) => {
        if (state.queue.length === 0)
            return state;
        const nextTrack = state.queue[0];
        return {
            history: state.currentTrack
                ? [state.currentTrack, ...state.history]
                : state.history,
            currentTrack: nextTrack,
            queue: state.queue.slice(1),
            isPlaying: true,
            playbackPosition: 0,
        };
    }),
    playPrevious: () => set((state) => {
        if (state.history.length === 0)
            return state;
        const previousTrack = state.history[0];
        return {
            currentTrack: previousTrack,
            history: state.history.slice(1),
            queue: [state.currentTrack, ...state.queue],
            isPlaying: true,
            playbackPosition: 0,
        };
    }),
    addToQueue: (track) => set((state) => ({
        queue: [...state.queue, track],
    })),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    // NEW: Set the current playback position (in seconds)
    setPlaybackPosition: (position) => set({ playbackPosition: position }),
    // NEW: Set the volume level
    setVolume: (vol) => set({ volume: vol }),
}));
