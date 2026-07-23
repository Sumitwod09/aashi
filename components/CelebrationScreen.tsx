"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, Zap, CheckCircle2, RotateCcw, Award, Sparkles, Heart, Smile } from "lucide-react";
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
  const lastQuestionId = QUESTIONS[QUESTIONS.length - 1]?.id || 27;
  const finalAnswer = userAnswers[lastQuestionId] || "";

  // Check if she clicked NO / Let just be friends
  const isNoAnswer =
    finalAnswer.trim().toUpperCase() === "NO" ||
    finalAnswer.toLowerCase().includes("friends");

  useEffect(() => {
    // Only fire confetti if she did NOT select NO!
    if (!isNoAnswer) {
      const count = 250;
      const defaults = { origin: { y: 0.7 } };

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
    }
  }, [isNoAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative z-20 w-full max-w-md mx-auto my-auto px-4 py-2"
    >
      <div
        className={`glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 border ${
          isNoAnswer
            ? "border-slate-200 bg-gradient-to-b from-white/95 via-slate-50/40 to-white/95"
            : "border-pink-200 bg-gradient-to-b from-white/95 via-pink-50/30 to-white/95"
        }`}
      >
        {/* Animated Header Icon */}
        <div className="relative inline-block">
          <div
            className={`absolute -inset-4 rounded-full opacity-40 blur-lg animate-pulse ${
              isNoAnswer
                ? "bg-gradient-to-r from-slate-400 via-indigo-400 to-blue-400"
                : "bg-gradient-to-r from-pink-400 via-rose-500 to-indigo-500"
            }`}
          />
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className={`relative w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl border-2 border-white mx-auto ${
              isNoAnswer
                ? "bg-gradient-to-tr from-indigo-500 to-slate-700"
                : "bg-gradient-to-tr from-pink-500 to-rose-400"
            }`}
          >
            {isNoAnswer ? (
              <Smile className="w-10 h-10 stroke-[2]" />
            ) : (
              <Heart className="w-10 h-10 fill-white stroke-[2]" />
            )}
          </motion.div>
        </div>

        {/* Header Text */}
        <div className="space-y-1.5">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs border ${
              isNoAnswer
                ? "bg-slate-100 text-slate-700 border-slate-200"
                : "bg-pink-100 text-pink-700 border-pink-200"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isNoAnswer ? "Thank You For Your Time" : "Quest Victory Unlocked!"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isNoAnswer ? "Thank You! 🙏" : "Level Complete! 🎉"}
          </h1>
        </div>

        {/* CONDITIONALLY RENDERED BANNERS */}
        {isNoAnswer ? (
          /* FORMAL THANK YOU NOTE & BEST ADVICE */
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-900 text-white shadow-lg space-y-2 text-left">
            <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-300 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>A Personal Note & Advice</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-200">
              Thank you so much for taking the time to share your honest thoughts! Here's the best advice: <span className="font-semibold text-white">Always stay true to who you are, keep growing, and chase what makes your soul happy.</span>
            </p>
            <div className="pt-1 text-xs font-bold text-pink-300 border-t border-slate-700/60 mt-1">
              "I am always here for you whenever you need." 💙
            </div>
          </div>
        ) : (
          /* PANI PURI BEACH DATE PROPOSAL */
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 text-white shadow-lg space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-pink-100 flex items-center justify-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Beach Date Invitation 💌</span>
            </div>
            <div className="text-base sm:text-lg font-extrabold leading-snug">
              So... when are we going on a Pani Puri date at the beach? 🏖️😋✨
            </div>
            <p className="text-xs text-pink-100/90 pt-0.5">
              Crispy pani puri, beach waves, and endless smiles await! 🌊💖
            </p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-indigo-600 font-bold text-base sm:text-lg">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{xp} XP</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Total Earned</span>
          </div>

          <div className="p-3 rounded-2xl bg-pink-50/80 border border-pink-100 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-pink-600 font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 text-pink-500" />
              <span>Quest Legend</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Unlocked Rank</span>
          </div>
        </div>

        {/* Answer Summary Card */}
        <div className="text-left space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 uppercase">
            <span>Quest Summary</span>
            <span className="flex items-center gap-1 text-indigo-600">
              <Sparkles className="w-3 h-3" />
              {QUESTIONS.length} Cards Cleared
            </span>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
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
                  className="p-2.5 rounded-xl bg-white/80 border border-slate-100 text-xs space-y-1"
                >
                  <div className="font-semibold text-slate-700 flex items-center justify-between">
                    <span className="truncate">{q.subtitle}: {q.title}</span>
                  </div>
                  <p className="text-indigo-600 font-medium bg-indigo-50/70 px-2 py-0.5 rounded-lg border border-indigo-100/60 break-words text-[11px]">
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
            <span>Play Again 🔄</span>
          </motion.button>
        </div>

        <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
          Made with {isNoAnswer ? "💙" : <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />} Next.js & SheetDB
        </p>
      </div>
    </motion.div>
  );
}
