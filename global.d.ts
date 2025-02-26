declare global {
  namespace YT {
    class Player {
      getIframe() {
        throw new Error("Method not implemented.");
      }
      seekTo(newTime: number, arg1: boolean) {
        throw new Error("Method not implemented.");
      }
      getCurrentTime(): number {
        throw new Error("Method not implemented.");
      }
      loadVideoById(videoId: string) {
        throw new Error("Method not implemented.");
      }
      setVolume(volume: number) {
        throw new Error("Method not implemented.");
      }
      playVideo(): void;
      pauseVideo(): void;
    }

    interface PlayerEvent {
      target: Player;
    }
  }
}

export {};
