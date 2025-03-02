import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

interface Track {
  title: string;
  artist: string;
  videoId: string;
}

let mainWindow: BrowserWindow | null = null;
let miniWindow: BrowserWindow | null = null;
let currentTrackGlobal: Track | null = null; // Store the current track

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL("http://localhost:3000");
}

function createMiniWindow(track: Track) {
  // Store the track globally so that it can be requested later.
  currentTrackGlobal = track;

  miniWindow = new BrowserWindow({
    width: 400,
    height: 200,
    minWidth: 300, // Minimum width of 300px
    maxWidth: 500, // Maximum width of 500px
    minHeight: 175, // Minimum height of 150px
    maxHeight: 250, // Maximum height of 250px
    alwaysOnTop: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  miniWindow.loadURL("http://localhost:3000/miniplayer");

  miniWindow.webContents.on("did-finish-load", () => {
    console.log(
      "[Main] Mini window finished loading, sending current track:",
      track
    );
    miniWindow?.webContents.send("update-track", track);
  });
}

app.whenReady().then(() => {
  createMainWindow();

  ipcMain.on("open-mini-player", (event, track: Track) => {
    console.log("[Main] Received open-mini-player request with track:", track);
    createMiniWindow(track);
  });

  ipcMain.on("update-track", (event, track: Track) => {
    console.log(
      "[Main] Received update-track from main window with track:",
      track
    );
    // Update global track so mini player can request it later.
    currentTrackGlobal = track;
    if (miniWindow) {
      console.log("[Main] Forwarding track update to mini window");
      miniWindow.webContents.send("update-track", track);
    } else {
      console.log("[Main] No mini window to send update to");
    }
  });

  ipcMain.on("get-current-track", (event) => {
    console.log("[Main] get-current-track received");
    if (currentTrackGlobal) {
      event.sender.send("update-track", currentTrackGlobal);
    }
  });

  ipcMain.on("window-close", () => {
    console.log("[Main] window-close received");
    mainWindow?.close();
  });

  ipcMain.on("window-minimize", () => {
    console.log("[Main] window-minimize received");
    mainWindow?.minimize();
  });

  ipcMain.on("window-toggle-maximize", () => {
    console.log("[Main] window-toggle-maximize received");
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
