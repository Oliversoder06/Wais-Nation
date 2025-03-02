// MainContainer.tsx
"use client";
import React, { useEffect, useState } from "react";

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.myElectron) {
      setIsElectron(true);
    }
  }, []);

  // Use different height classes based on the environment.
  const heightClass = isElectron
    ? "h-[calc(100vh-73px)]"
    : "h-[calc(100vh-25px)]";

  return (
    <main
      className={`md:ml-[144px] xl:w-[calc(100%-508px)] md:w-[calc(100%-144px)] ${heightClass} md:pt-[64px] md:px-[8px] pb-[75px]`}
    >
      <div className="md:bg-secondary rounded-lg h-full w-full md:overflow-y-auto scrollbar">
        {children}
      </div>
    </main>
  );
};

export default MainContainer;
