declare global {
  namespace YT {
    class Player {
      playVideo(): void;
      pauseVideo(): void;
    }

    interface PlayerEvent {
      target: Player;
    }
  }
}

export {};
