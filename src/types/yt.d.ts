export {};

declare global {
  namespace YT {
    interface Player {
      getIframe(): HTMLIFrameElement;
      seekTo(newTime: number, allowSeekAhead: boolean): void;
      getCurrentTime(): number;
      loadVideoById(videoId: string): void;
      setVolume(volume: number): void;
      playVideo(): void;
      pauseVideo(): void;
    }

    interface PlayerEvent {
      target: Player;
    }
  }
}
