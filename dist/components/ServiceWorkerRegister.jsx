"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceWorkerRegister;
const react_1 = require("react");
function ServiceWorkerRegister() {
    (0, react_1.useEffect)(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("/sw.js");
            }, { passive: true });
        }
    }, []);
    return null; // No UI element, just runs in the background
}
