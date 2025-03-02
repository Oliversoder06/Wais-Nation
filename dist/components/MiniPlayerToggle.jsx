"use strict";
// // MiniPlayerToggle.tsx
// "use client";
// import React, { useState } from "react";
// import { MdToggleOff, MdToggleOn } from "react-icons/md";
// const MiniPlayerToggle: React.FC = () => {
//   const [active, setActive] = useState(false);
//   const toggleMiniPlayer = () => {
//     if (active) {
//       // Currently active – close the mini player
//       console.log("[MiniPlayerToggle] Toggling off mini player");
//       if (window.myElectron) {
//         window.myElectron.closeMiniPlayer();
//       }
//       setActive(false);
//     } else {
//       // Currently inactive – open the mini player
//       console.log("[MiniPlayerToggle] Toggling on mini player");
//       // Replace this with your actual track data or logic to get the current track.
//       const dummyTrack = {
//         title: "Dummy Track",
//         artist: "Dummy Artist",
//         videoId: "dQw4w9WgXcQ", // For example, a valid YouTube video ID
//       };
//       if (window.myElectron) {
//         window.myElectron.openMiniPlayer(dummyTrack);
//       } else {
//         // Fallback: open mini player window with query parameters
//         const queryParams = new URLSearchParams(dummyTrack as any).toString();
//         window.open(
//           `/miniplayer?${queryParams}`,
//           "Miniplayer",
//           "width=400,height=200"
//         );
//       }
//       setActive(true);
//     }
//   };
//   return (
//     <button onClick={toggleMiniPlayer} className="focus:outline-none">
//       {active ? (
//         <MdToggleOn size={32} className="text-green-400" />
//       ) : (
//         <MdToggleOff size={32} className="text-gray-400" />
//       )}
//     </button>
//   );
// };
// export default MiniPlayerToggle;
