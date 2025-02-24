declare global {
  namespace YT {
    class Player {
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
