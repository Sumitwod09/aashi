"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, Zap, CheckCircle2, RotateCcw, Award, Sparkles, Heart } from "lucide-react";
import { QUESTIONS } from "@/data/questions";

interface CelebrationScreenProps {
  userAnswers: Record<number, string>;
  xp: number;
  onReset: () => void;
}

export function CelebrationScreen({
  userAnswers,
  xp,
  onReset,
}: CelebrationScreenProps) {
  useEffect(() => {
    // Fire confetti bursts on trigger
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#6366f1', '#ec4899', '#f97316']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#a855f7', '#3b82f6', '#10b981']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#fbbf24', '#f43f5e']
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative z-20 w-full max-w-md mx-auto my-auto px-4 py-2"
    >
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/90 text-center space-y-6">
        {/* Animated Trophy Icon & Glow */}
        <div className="relative inline-block">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-500 opacity-40 blur-lg animate-pulse" />
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-amber-900 shadow-xl border-2 border-white mx-auto"
          >
            <Trophy className="w-10 h-10 stroke-[2.5]" />
          </motion.div>
        </div>

        {/* Header Text */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Submission Received!</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Level Complete! 🎉
          </h1>
          <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
            Your responses have been successfully submitted via Web3Forms API.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-indigo-600 font-bold text-lg">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{xp} XP</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Total Earned</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-pink-50/80 border border-pink-100 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-pink-600 font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 text-pink-500" />
              <span>Quest Legend</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Unlocked Rank</span>
          </div>
        </div>

        {/* Answer Summary Card */}
        <div className="text-left space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 uppercase">
            <span>Response Summary</span>
            <span className="flex items-center gap-1 text-indigo-600">
              <Sparkles className="w-3 h-3" />
              {QUESTIONS.length} Answered
            </span>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {QUESTIONS.map((q) => (
              <div
                key={q.id}
                className="p-3 rounded-xl bg-white/70 border border-slate-100 text-xs space-y-1"
              >
                <div className="font-semibold text-slate-700 flex items-center justify-between">
                  <span className="truncate">{q.subtitle}: {q.title}</span>
                </div>
                <p className="text-indigo-600 font-medium bg-indigo-50/60 px-2 py-1 rounded-lg border border-indigo-100/50 break-words">
                  "{userAnswers[q.id] || "No response"}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Survey</span>
          </motion.button>
        </div>

        <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
          Made with <Heart className="w-3 h-3 fill-rose-500 text-rose-500" /> Next.js & Web3Forms
        </p>
      </div>
    </motion.div>
  );
}
