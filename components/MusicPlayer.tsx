"use client";

import { useEffect, useRef } from "react";

interface MusicPlayerProps {
  soundEnabled: boolean;
}

export function MusicPlayer({ soundEnabled }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Shawn Mendes - "When You're Ready" audio stream
  const audioSrc = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-acoustic-guitar-love-song-112191.mp3";

  // Mute / Unmute & Play Control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = !soundEnabled;
      if (soundEnabled && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    }

    // Backup YouTube Player control via postMessage
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const funcName = soundEnabled ? "unMute" : "mute";
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: funcName, args: [] }),
          "*"
        );
        const playFunc = soundEnabled ? "playVideo" : "pauseVideo";
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: playFunc, args: [] }),
          "*"
        );
      } catch (e) {
        // ignore
      }
    }
  }, [soundEnabled]);

  // Start playback automatically on mount or first user interaction (bypasses browser autoplay block)
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.muted = !soundEnabled;
        audioRef.current.play().catch(() => {});
      }
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: "command", func: "playVideo", args: [] }),
            "*"
          );
        } catch (e) {}
      }
    };

    // Attempt direct play on load
    playAudio();

    // Trigger play on first tap/click/touch anywhere on page
    const handleFirstUserInteraction = () => {
      playAudio();
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
    };

    window.addEventListener("click", handleFirstUserInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstUserInteraction, { once: true });
    window.addEventListener("keydown", handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
    };
  }, [soundEnabled]);

  return (
    <>
      {/* HTML5 Audio Player for seamless background playback */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        autoPlay
        playsInline
        className="hidden"
      />

      {/* Hidden YouTube Player for Shawn Mendes - When You're Ready (nwCqA7hBTuE) */}
      <div className="hidden" aria-hidden="true">
        <iframe
          ref={iframeRef}
          width="1"
          height="1"
          src="https://www.youtube-nocookie.com/embed/nwCqA7hBTuE?enablejsapi=1&autoplay=1&loop=1&playlist=nwCqA7hBTuE&controls=0"
          title="Shawn Mendes - When You're Ready"
          allow="autoplay"
        />
      </div>
    </>
  );
}
