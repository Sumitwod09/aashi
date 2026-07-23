"use client";

import { useEffect, useRef } from "react";

interface MusicPlayerProps {
  soundEnabled: boolean;
}

export function MusicPlayer({ soundEnabled }: MusicPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Send command to single YouTube Player for Shawn Mendes - "When You're Ready" (nwCqA7hBTuE)
  useEffect(() => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;

    try {
      const funcName = soundEnabled ? "playVideo" : "pauseVideo";
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: funcName, args: [] }),
        "*"
      );

      const muteFunc = soundEnabled ? "unMute" : "mute";
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: muteFunc, args: [] }),
        "*"
      );
    } catch (e) {
      console.warn("YouTube player command error:", e);
    }
  }, [soundEnabled]);

  // Start playback automatically on mount or first screen interaction
  useEffect(() => {
    const startPlayback = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          if (soundEnabled) {
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "unMute", args: [] }),
              "*"
            );
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "playVideo", args: [] }),
              "*"
            );
          }
        } catch (e) {}
      }
    };

    // Initial load attempt
    startPlayback();

    // First user touch/click listener to bypass browser autoplay restrictions
    const handleUserInteraction = () => {
      startPlayback();
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction, { once: true });
    window.addEventListener("touchstart", handleUserInteraction, { once: true });
    window.addEventListener("keydown", handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [soundEnabled]);

  return (
    <div className="hidden" aria-hidden="true">
      {/* ONLY ONE Single Audio Source: Shawn Mendes - When You're Ready (nwCqA7hBTuE) */}
      <iframe
        ref={iframeRef}
        width="1"
        height="1"
        src="https://www.youtube-nocookie.com/embed/nwCqA7hBTuE?enablejsapi=1&autoplay=1&loop=1&playlist=nwCqA7hBTuE&controls=0&origin=http://localhost:3000"
        title="Shawn Mendes - When You're Ready"
        allow="autoplay"
      />
    </div>
  );
}
