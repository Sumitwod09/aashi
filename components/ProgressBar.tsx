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
  return (
    <div className="w-full space-y-3">
      {/* Segmented Dash Progress Bar */}
      <div className="flex items-center gap-1.5 w-full">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={index}
              className="h-2 flex-1 rounded-full bg-slate-200/80 overflow-hidden relative"
            >
              {(isCompleted || isCurrent) && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isCompleted || isCurrent ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`h-full w-full rounded-full origin-left ${
                    isCurrent
                      ? "gradient-progress shadow-sm animate-pulse"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Monospace Subtitles */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
        <span className="font-bold text-indigo-600 tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
          {subtitle}
        </span>
        <span className="tracking-widest uppercase text-[10px] font-semibold text-slate-400">
          {instructions}
        </span>
      </div>
    </div>
  );
}
