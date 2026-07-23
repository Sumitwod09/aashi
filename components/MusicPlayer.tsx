"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Volume2, VolumeX, Play, Pause, Heart } from "lucide-react";

interface MusicPlayerProps {
  soundEnabled: boolean;
}

export function MusicPlayer({ soundEnabled }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Shawn Mendes - "When You're Ready" audio URL stream / fallback
  const audioSrc = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-acoustic-guitar-love-song-112191.mp3";

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio autoplay prevented:", err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Synchronize with header audio toggle
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = !soundEnabled;
      setIsMuted(!soundEnabled);
    }
  }, [soundEnabled]);

  // Attempt ambient background music start on user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-full p-2 pr-4 shadow-lg border border-white/80 flex items-center gap-2.5 bg-white/90 backdrop-blur-md"
      >
        {/* Rotating Vinyl/Heart Icon */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md transition-all ${
            isPlaying
              ? "bg-gradient-to-r from-pink-500 to-rose-500 animate-spin-slow"
              : "bg-slate-700 hover:bg-slate-800"
          }`}
          aria-label="Play background music"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </motion.button>

        {/* Track Details */}
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
            <Heart className="w-3 h-3 fill-rose-500 text-rose-500 animate-pulse" />
            <span>When You're Ready</span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono">Shawn Mendes</p>
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          aria-label="Toggle mute"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-indigo-500" />
          )}
        </button>
      </motion.div>
    </div>
  );
}
