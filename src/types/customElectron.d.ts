export {};

declare global {
  /**
   * Represents a track in your application.
   */
  interface Track {
    title: string;
    artist: string;
    videoId: string;
  }

  /**
   * Represents the custom Electron IPC API exposed to the renderer.
   */
  interface MyElectronAPI {
    openMiniPlayer(track: Track): void;
    onUpdateTrack(callback: (track: Track) => void): void;
    on(channel: string, callback: (data: unknown) => void): void;
    send(channel: string, data?: unknown): void;
    updateTrack?(track: Track): void;
  }

  /**
   * Augments the global Window object with our custom API.
   */
  interface Window {
    myElectron?: MyElectronAPI;
  }
}
