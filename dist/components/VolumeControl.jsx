"use strict";
"use client";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const react_1 = __importStar(require("react"));
const VolumeControl = ({ playerRef, volume, setVolume, currentVideoId, }) => {
    const [lastVolume, setLastVolume] = react_1.default.useState(volume);
    const showSlider = true;
    // Poll until the player is fully ready (i.e. the iframe has a valid src)
    (0, react_1.useEffect)(() => {
        let timeoutId;
        const updateVolumeWhenReady = () => {
            const player = playerRef.current;
            if (player) {
                const iframe = player.getIframe();
                if (iframe && iframe.src) {
                    player.setVolume(volume);
                    return;
                }
            }
            timeoutId = setTimeout(updateVolumeWhenReady, 100);
        };
        updateVolumeWhenReady();
        return () => clearTimeout(timeoutId);
    }, [volume, currentVideoId, playerRef]);
    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value, 10);
        setVolume(newVolume);
        if (playerRef.current) {
            const iframe = playerRef.current.getIframe();
            if (iframe && iframe.src) {
                playerRef.current.setVolume(newVolume);
            }
        }
    };
    const toggleMute = () => {
        if (volume === 0) {
            setVolume(lastVolume);
            if (playerRef.current) {
                const iframe = playerRef.current.getIframe();
                if (iframe && iframe.src) {
                    playerRef.current.setVolume(lastVolume);
                }
            }
        }
        else {
            setLastVolume(volume);
            setVolume(0);
            if (playerRef.current) {
                const iframe = playerRef.current.getIframe();
                if (iframe && iframe.src) {
                    playerRef.current.setVolume(0);
                }
            }
        }
    };
    return (<div className="relative flex items-center justify-center">
      <image_1.default src={volume === 0
            ? "/icons/volumemute.svg"
            : volume > 50
                ? "/icons/volumeup.svg"
                : "/icons/volumedown.svg"} alt="volume" width={24} height={24} className="cursor-pointer hover:opacity-80" onClick={toggleMute}/>
      {showSlider && (<div>
          <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} className="volume-slider y-2 bg-background flex items-center justify-center" style={{ "--progress": `${volume}%` }}/>
        </div>)}
    </div>);
};
exports.default = VolumeControl;
