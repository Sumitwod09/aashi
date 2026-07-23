"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Volume2, VolumeX, Zap, X } from "lucide-react";

interface HeaderProps {
  xp: number;
  streak?: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReset: () => void;
}

export function Header({
  xp,
  soundEnabled,
  onToggleSound,
  onReset
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 max-w-md mx-auto">
      <div className="glass-panel rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-sm border border-white/80">
        {/* Menu Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors relative"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </motion.button>

        {/* Brand & XP Counter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-xs shadow-md shadow-indigo-200">
            <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
            <span>{xp} XP</span>
          </div>
        </div>

        {/* Action Icon Group - ONLY Sound Toggle Button */}
        <div className="flex items-center gap-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onToggleSound}
            className="p-2.5 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-colors relative"
            title={soundEnabled ? "Pause background music" : "Play background music"}
            aria-label="Toggle background music"
          >
            {soundEnabled ? (
              <div className="relative flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-indigo-600 animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-ping" />
              </div>
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Menu Popover */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute left-4 top-16 z-50 w-64 glass-panel rounded-2xl p-4 shadow-xl border border-white/80"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">PulseQuest Menu</span>
              <button
                onClick={() => setShowMenu(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => {
                  onReset();
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                Restart Game 🔄
              </button>
              <button
                onClick={() => {
                  onToggleSound();
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center justify-between"
              >
                <span>Background Music</span>
                <span className="text-indigo-600 font-bold">{soundEnabled ? 'PLAYING' : 'PAUSED'}</span>
              </button>
              <div className="pt-2 mt-2 border-t border-slate-100 text-[11px] text-slate-400">
                🎵 Shawn Mendes — When You're Ready
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
