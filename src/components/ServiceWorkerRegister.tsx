"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener(
        "load",
        () => {
          navigator.serviceWorker.register("/sw.js");
        },
        { passive: true }
      );
    }
  }, []);

  return null; // No UI element, just runs in the background
}
