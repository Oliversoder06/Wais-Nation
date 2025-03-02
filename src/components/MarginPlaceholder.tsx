"use client";
import React, { useEffect, useState } from "react";

const MarginPlaceholder: React.FC = () => {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.myElectron) {
      setIsElectron(true);
    }
  }, []);

  return <div className={isElectron ? "mt-[48px]" : "mt-0"} />;
};

export default MarginPlaceholder;
