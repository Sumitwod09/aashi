"use client";

import { useEffect, useRef } from "react";

interface MusicPlayerProps {
  soundEnabled: boolean;
}

export function MusicPlayer({ soundEnabled }: MusicPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Play/Pause YouTube video (Shawn Mendes - When You're Ready: nwCqA7hBTuE) via postMessage
  useEffect(() => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;

    try {
      if (soundEnabled) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: [] }),
          "*"
        );
      } else {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
          "*"
        );
      }
    } catch (e) {
      console.warn("YouTube player command error:", e);
    }
  }, [soundEnabled]);

  return (
    <div className="hidden" aria-hidden="true">
      {/* YouTube Player Embed for Shawn Mendes - When You're Ready */}
      <iframe
        ref={iframeRef}
        width="1"
        height="1"
        src="https://www.youtube-nocookie.com/embed/nwCqA7hBTuE?enablejsapi=1&autoplay=1&loop=1&playlist=nwCqA7hBTuE&controls=0"
        title="Shawn Mendes - When You're Ready"
        allow="autoplay"
      />
    </div>
  );
}
