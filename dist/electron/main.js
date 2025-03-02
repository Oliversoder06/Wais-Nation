"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
let mainWindow = null;
let miniWindow = null;
let currentTrackGlobal = null; // Store the current track
function createMainWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    mainWindow.loadURL("http://localhost:3000");
}
function createMiniWindow(track) {
    // Store the track globally so that it can be requested later.
    currentTrackGlobal = track;
    miniWindow = new electron_1.BrowserWindow({
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
        console.log("[Main] Mini window finished loading, sending current track:", track);
        miniWindow === null || miniWindow === void 0 ? void 0 : miniWindow.webContents.send("update-track", track);
    });
}
electron_1.app.whenReady().then(() => {
    createMainWindow();
    electron_1.ipcMain.on("open-mini-player", (event, track) => {
        console.log("[Main] Received open-mini-player request with track:", track);
        createMiniWindow(track);
    });
    electron_1.ipcMain.on("update-track", (event, track) => {
        console.log("[Main] Received update-track from main window with track:", track);
        // Update global track so mini player can request it later.
        currentTrackGlobal = track;
        if (miniWindow) {
            console.log("[Main] Forwarding track update to mini window");
            miniWindow.webContents.send("update-track", track);
        }
        else {
            console.log("[Main] No mini window to send update to");
        }
    });
    electron_1.ipcMain.on("get-current-track", (event) => {
        console.log("[Main] get-current-track received");
        if (currentTrackGlobal) {
            event.sender.send("update-track", currentTrackGlobal);
        }
    });
    electron_1.ipcMain.on("window-close", () => {
        console.log("[Main] window-close received");
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.close();
    });
    electron_1.ipcMain.on("window-minimize", () => {
        console.log("[Main] window-minimize received");
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.minimize();
    });
    electron_1.ipcMain.on("window-toggle-maximize", () => {
        console.log("[Main] window-toggle-maximize received");
        if (mainWindow) {
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize();
            }
            else {
                mainWindow.maximize();
            }
        }
    });
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createMainWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
