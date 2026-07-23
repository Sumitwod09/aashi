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
    const count = 250;
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
      spread: 30,
      startVelocity: 60,
      colors: ['#6366f1', '#ec4899', '#f97316', '#f43f5e']
    });
    fire(0.2, {
      spread: 70,
      colors: ['#a855f7', '#3b82f6', '#10b981']
    });
    fire(0.35, {
      spread: 110,
      decay: 0.91,
      scalar: 0.9
    });
    fire(0.1, {
      spread: 140,
      startVelocity: 30,
      decay: 0.92,
      colors: ['#fbbf24', '#f43f5e', '#ec4899']
    });
  }, []);

  const lastQuestionId = QUESTIONS[QUESTIONS.length - 1]?.id || 19;
  const finalAnswer = userAnswers[lastQuestionId] || "Yes! 💖";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative z-20 w-full max-w-md mx-auto my-auto px-4 py-2"
    >
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200 text-center space-y-6 bg-gradient-to-b from-white/95 via-pink-50/30 to-white/95">
        {/* Animated Heart/Trophy Icon & Glow */}
        <div className="relative inline-block">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-400 via-rose-500 to-indigo-500 opacity-40 blur-lg animate-pulse" />
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-xl border-2 border-white mx-auto"
          >
            <Heart className="w-10 h-10 fill-white stroke-[2]" />
          </motion.div>
        </div>

        {/* Header Text */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-bold text-xs border border-pink-200">
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

        {/* Final "Do you like me?" Result Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 text-white shadow-lg space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-pink-100">
            Final Question Answered 💌
          </div>
          <div className="text-lg font-bold">
            "Do you like me?" → <span className="underline decoration-wavy underline-offset-4">{finalAnswer}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
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
        <div className="text-left space-y-3 pt-1">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 uppercase">
            <span>Response Summary</span>
            <span className="flex items-center gap-1 text-indigo-600">
              <Sparkles className="w-3 h-3" />
              {QUESTIONS.length} Answered
            </span>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {QUESTIONS.map((q) => {
              const rawAnswer = userAnswers[q.id] || "";
              let formattedAnswer = rawAnswer;

              if (q.type === "multi-choice") {
                try {
                  const arr = JSON.parse(rawAnswer);
                  if (Array.isArray(arr)) {
                    formattedAnswer = arr.join(", ");
                  }
                } catch {
                  formattedAnswer = rawAnswer;
                }
              }

              return (
                <div
                  key={q.id}
                  className="p-3 rounded-xl bg-white/80 border border-slate-100 text-xs space-y-1"
                >
                  <div className="font-semibold text-slate-700 flex items-center justify-between">
                    <span className="truncate">{q.subtitle}: {q.title}</span>
                  </div>
                  <p className="text-indigo-600 font-medium bg-indigo-50/70 px-2.5 py-1 rounded-lg border border-indigo-100/60 break-words">
                    {formattedAnswer || "No response"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1">
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
