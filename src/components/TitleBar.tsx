// TitleBar.tsx
"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdClose, MdMinimize, MdFullscreen } from "react-icons/md";

const TitleBar: React.FC = () => {
  const [isElectron, setIsElectron] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.myElectron) {
      setIsElectron(true);
    }
  }, []);

  // If not in Electron, return null (render nothing)
  if (!isElectron) {
    return null;
  }

  const handleClose = () => {
    if (window.myElectron) {
      window.myElectron.closeWindow();
    }
  };

  const handleMinimize = () => {
    if (window.myElectron) {
      window.myElectron.minimizeWindow();
    }
  };

  const handleToggleMaximize = () => {
    if (window.myElectron) {
      window.myElectron.toggleMaximizeWindow();
    }
  };

  return (
    <div
      className={`flex px-4 items-center ${
        pathname === "/miniplayer" ? "justify-center" : "justify-between"
      } draggable bg-background text-white h-12`}
    >
      <div>
        {pathname === "/miniplayer" ? (
          <div className="w-full flex items-center justify-center">
            <img
              src="/icons/dragdots.svg"
              alt="Drag dots icon"
              width={40}
              height={40}
              className="rotate-90"
            />
          </div>
        ) : (
          "Settings"
        )}
      </div>
      {pathname !== "/miniplayer" && (
        <div className="flex gap-2 no-drag">
          <button onClick={handleMinimize}>
            <MdMinimize size={24} />
          </button>
          <button onClick={handleToggleMaximize}>
            <MdFullscreen size={24} />
          </button>
          <button onClick={handleClose}>
            <MdClose size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TitleBar;
