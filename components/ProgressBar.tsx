"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  subtitle: string;
  instructions: string;
}

export function ProgressBar({
  currentIndex,
  totalQuestions,
  subtitle,
  instructions,
}: ProgressBarProps) {
  const percentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="w-full space-y-2.5">
      {/* Sleek Segmented & Continuous Progress Indicator */}
      <div className="w-full h-2.5 rounded-full bg-slate-200/80 overflow-hidden relative p-0.5 border border-white/60">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="h-full rounded-full gradient-progress shadow-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>

      {/* Monospace Subtitles & Level Indicator */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-indigo-600 tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100/80 text-[11px] sm:text-xs">
            {subtitle}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold">
            ({currentIndex + 1}/{totalQuestions})
          </span>
        </div>

        <span className="tracking-wider uppercase text-[10px] font-semibold text-slate-400 truncate max-w-[150px] sm:max-w-none text-right">
          {instructions}
        </span>
      </div>
    </div>
  );
}
