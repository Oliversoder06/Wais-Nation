import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

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

const api: MyElectronAPI = {
  openMiniPlayer(track) {
    console.log("[Preload] openMiniPlayer called with", track);
    ipcRenderer.send("open-mini-player", track);
  },

  updateTrack(track) {
    console.log("[Preload] updateTrack called with", track);
    ipcRenderer.send("update-track", track);
  },

  onUpdateTrack(callback) {
    ipcRenderer.on(
      "update-track",
      (event: IpcRendererEvent, newTrack: Track) => {
        console.log("[Preload] onUpdateTrack received", newTrack);
        callback(newTrack);
      }
    );
  },

  on(channel, callback) {
    ipcRenderer.on(channel, (event: IpcRendererEvent, data: unknown) => {
      console.log("[Preload] on channel", channel, "received data:", data);
      callback(data);
    });
  },

  send(channel, data) {
    console.log(
      "[Preload] send called on channel:",
      channel,
      "with data:",
      data
    );
    ipcRenderer.send(channel, data);
  },

  closeWindow() {
    console.log("[Preload] closeWindow called");
    ipcRenderer.send("window-close");
  },

  minimizeWindow() {
    console.log("[Preload] minimizeWindow called");
    ipcRenderer.send("window-minimize");
  },

  toggleMaximizeWindow() {
    console.log("[Preload] toggleMaximizeWindow called");
    ipcRenderer.send("window-toggle-maximize");
  },
};

contextBridge.exposeInMainWorld("myElectron", api);
