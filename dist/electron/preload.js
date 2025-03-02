"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const api = {
    openMiniPlayer(track) {
        console.log("[Preload] openMiniPlayer called with", track);
        electron_1.ipcRenderer.send("open-mini-player", track);
    },
    updateTrack(track) {
        console.log("[Preload] updateTrack called with", track);
        electron_1.ipcRenderer.send("update-track", track);
    },
    onUpdateTrack(callback) {
        electron_1.ipcRenderer.on("update-track", (event, newTrack) => {
            console.log("[Preload] onUpdateTrack received", newTrack);
            callback(newTrack);
        });
    },
    on(channel, callback) {
        electron_1.ipcRenderer.on(channel, (event, data) => {
            console.log("[Preload] on channel", channel, "received data:", data);
            callback(data);
        });
    },
    send(channel, data) {
        console.log("[Preload] send called on channel:", channel, "with data:", data);
        electron_1.ipcRenderer.send(channel, data);
    },
    closeWindow() {
        console.log("[Preload] closeWindow called");
        electron_1.ipcRenderer.send("window-close");
    },
    minimizeWindow() {
        console.log("[Preload] minimizeWindow called");
        electron_1.ipcRenderer.send("window-minimize");
    },
    toggleMaximizeWindow() {
        console.log("[Preload] toggleMaximizeWindow called");
        electron_1.ipcRenderer.send("window-toggle-maximize");
    },
};
electron_1.contextBridge.exposeInMainWorld("myElectron", api);
