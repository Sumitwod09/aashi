"use client";

import { useEffect, useRef } from "react";

interface MusicPlayerProps {
  soundEnabled: boolean;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState?: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
}

export function MusicPlayer({ soundEnabled }: MusicPlayerProps) {
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player || playerRef.current) return;

      playerRef.current = new window.YT.Player("youtube-player-container", {
        videoId: "nwCqA7hBTuE", // Shawn Mendes - When You're Ready
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: "nwCqA7hBTuE",
          playsinline: 1,
          enablejsapi: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            if (!isMounted) return;
            event.target.setVolume(100);
            if (soundEnabled) {
              event.target.unMute();
              event.target.playVideo();
            } else {
              event.target.mute();
            }
          },
          onStateChange: (event) => {
            // Loop video automatically if it ends
            if (event.data === 0 && playerRef.current) {
              playerRef.current.playVideo();
            }
          },
        },
      });
    };

    // Load YouTube IFrame API script if not already present
    if (!window.YT) {
      const existingScript = document.getElementById("youtube-iframe-api");
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Synchronize Mute / Unmute state when soundEnabled changes
  useEffect(() => {
    if (playerRef.current) {
      try {
        if (soundEnabled) {
          playerRef.current.unMute();
          playerRef.current.playVideo();
        } else {
          playerRef.current.mute();
        }
      } catch (e) {
        console.warn("YouTube player control notice:", e);
      }
    }
  }, [soundEnabled]);

  // Screen interaction trigger to bypass browser autoplay blocks
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (playerRef.current) {
        try {
          if (soundEnabled) {
            playerRef.current.unMute();
            playerRef.current.playVideo();
          }
        } catch (e) {}
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
    };
  }, [soundEnabled]);

  return (
    <div className="fixed -bottom-96 -right-96 opacity-0 pointer-events-none" aria-hidden="true">
      {/* Container where YouTube IFrame Player renders */}
      <div id="youtube-player-container" ref={containerRef} />
    </div>
  );
}
