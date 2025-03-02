export {};

declare global {
  interface Track {
    title: string;
    artist: string;
    videoId: string;
  }

  interface MyElectronAPI {
    openMiniPlayer(track: Track): void;
    updateTrack(track: Track): void;
    onUpdateTrack(callback: (track: Track) => void): void;
    on(channel: string, callback: (data: unknown) => void): void;
    send(channel: string, data?: unknown): void;
    closeWindow(): void;
    minimizeWindow(): void;
    toggleMaximizeWindow(): void;
  }

  interface Window {
    myElectron?: MyElectronAPI;
  }
}
