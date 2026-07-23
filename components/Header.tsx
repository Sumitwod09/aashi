"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Bell, MessageSquare, Volume2, VolumeX, Flame, Zap, Sparkles, X } from "lucide-react";

interface HeaderProps {
  xp: number;
  streak: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReset: () => void;
}

export function Header({
  xp,
  streak,
  soundEnabled,
  onToggleSound,
  onReset
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(true);
  const [unreadChat, setUnreadChat] = useState(true);

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 max-w-md mx-auto">
      <div className="glass-panel rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-sm border border-white/80">
        {/* Menu Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            setShowMenu(!showMenu);
            setShowNotifications(false);
            setShowChat(false);
          }}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors relative"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </motion.button>

        {/* Brand & XP Counter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-xs shadow-md shadow-indigo-200">
            <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
            <span>{xp} XP</span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 font-bold text-xs border border-orange-200">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span>{streak}d</span>
          </div>
        </div>

        {/* Action Icon Group */}
        <div className="flex items-center gap-1">
          {/* Audio Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onToggleSound}
            className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            aria-label="Toggle audio"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-indigo-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </motion.button>

          {/* Chat Bubble with Red Dot */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                setShowChat(!showChat);
                setShowNotifications(false);
                setShowMenu(false);
                setUnreadChat(false);
              }}
              className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors relative"
              aria-label="Community Chat"
            >
              <MessageSquare className="w-4 h-4" />
              {unreadChat && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white animate-ping" />
              )}
              {unreadChat && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white" />
              )}
            </motion.button>
          </div>

          {/* Notifications Bell with Red Dot */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowChat(false);
                setShowMenu(false);
                setUnreadNotifications(false);
              }}
              className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
              {unreadNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Popovers */}
      <AnimatePresence>
        {/* Notifications Popover */}
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-4 top-16 z-50 w-72 glass-panel rounded-2xl p-4 shadow-xl border border-white/80"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800 uppercase tracking-wider">
                <Bell className="w-3.5 h-3.5 text-indigo-500" />
                <span>Notifications</span>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-indigo-900">Welcome to PulseQuest! ✨</p>
                  <p className="text-slate-500 text-[11px]">Earn XP on every card completed. Unlock your badge at the final level.</p>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <p className="font-medium text-slate-700">Daily Streak Active ⚡</p>
                <p className="text-slate-400 text-[11px]">3-day streak boost unlocked!</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Chat Popover */}
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-4 top-16 z-50 w-72 glass-panel rounded-2xl p-4 shadow-xl border border-white/80"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800 uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5 text-pink-500" />
                <span>Live Vibe Feed</span>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-xl bg-pink-50/80 border border-pink-100">
                <span className="font-bold text-pink-700">@Alex:</span>
                <span className="text-slate-600 ml-1">Ramen is definitely the ultimate comfort meal! 🍜</span>
              </div>
              <div className="p-2 rounded-xl bg-indigo-50/80 border border-indigo-100">
                <span className="font-bold text-indigo-700">@Maya:</span>
                <span className="text-slate-600 ml-1">The final question is so cute! 💖</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Menu Popover */}
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
                <span>Sound Effects</span>
                <span className="text-slate-400 font-normal">{soundEnabled ? 'ON' : 'OFF'}</span>
              </button>
              <div className="pt-2 mt-2 border-t border-slate-100 text-[11px] text-slate-400">
                PulseQuest v2.0 • SheetDB Powered
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
