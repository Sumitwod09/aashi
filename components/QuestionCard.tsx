"use client";

import { motion } from "framer-motion";
import { Check, ArrowLeft, ArrowRight, Sparkles, Send, Loader2 } from "lucide-react";
import { Question } from "@/data/questions";
import { ProgressBar } from "./ProgressBar";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: string;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  direction: number; // 1 for next, -1 for back
  isLastQuestion: boolean;
  isSubmitting: boolean;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onBack,
  onSubmit,
  direction,
  isLastQuestion,
  isSubmitting,
}: QuestionCardProps) {
  const isAnswered = selectedAnswer.trim().length > 0;

  // Slide & Fade Framer Motion Variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95,
      rotate: dir > 0 ? 2 : -2,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95,
      rotate: dir < 0 ? 2 : -2,
      transition: {
        duration: 0.2,
      },
    }),
  };

  return (
    <div className="relative w-full max-w-md mx-auto my-auto px-4 py-2">
      {/* Card Stack Background Rotated Cards (Visual Layering) */}
      <div className="absolute inset-x-7 top-4 bottom-2 stacked-card-2 rounded-3xl pointer-events-none z-0" />
      <div className="absolute inset-x-6 top-3 bottom-3 stacked-card-1 rounded-3xl pointer-events-none z-10" />

      {/* Main Active Card */}
      <motion.div
        key={question.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className="relative z-20 glass-panel rounded-3xl p-6 sm:p-7 shadow-xl shadow-indigo-100/50 border border-white/90 flex flex-col justify-between min-h-[440px]"
      >
        {/* Top Progress Bar & Monospace Subtitle */}
        <div className="space-y-5">
          <ProgressBar
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            subtitle={question.subtitle}
            instructions={question.instructions}
          />

          {/* Question Title */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-snug">
              {question.title}
            </h2>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Earn +{question.xpPoints} XP on completion</span>
            </p>
          </div>

          {/* Choice Components */}
          <div className="pt-2">
            {question.type === "single-choice" && question.options && (
              <div className="space-y-3">
                {question.options.map((option) => {
                  const isSelected = selectedAnswer === option.label;

                  return (
                    <motion.button
                      key={option.id}
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => onSelectAnswer(option.label)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 flex items-start gap-3.5 border relative ${
                        isSelected
                          ? "bg-gradient-to-r from-indigo-50/90 to-purple-50/90 border-indigo-500 shadow-md ring-2 ring-indigo-500/20"
                          : "bg-white/80 hover:bg-slate-50 border-slate-200/80 hover:border-slate-300"
                      }`}
                    >
                      {/* Radio Circle Icon */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 border ${
                          isSelected
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </motion.div>
                        )}
                      </div>

                      {/* Option Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-lg leading-none">{option.emoji}</span>
                          <span
                            className={`font-semibold text-sm ${
                              isSelected ? "text-indigo-950" : "text-slate-700"
                            }`}
                          >
                            {option.label}
                          </span>
                        </div>
                        {option.description && (
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Text Box Input for Open-ended Questions */}
            {question.type === "text-input" && (
              <div className="space-y-2">
                <div className="relative">
                  <textarea
                    rows={4}
                    value={selectedAnswer}
                    onChange={(e) => onSelectAnswer(e.target.value)}
                    placeholder={question.placeholder}
                    className="w-full p-4 text-sm bg-white/90 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400 resize-none shadow-inner"
                  />
                  <div className="absolute bottom-3 right-3 text-[11px] font-mono text-slate-400">
                    {selectedAnswer.length} chars
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer Navigation Controls */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all border ${
              currentIndex === 0
                ? "opacity-0 pointer-events-none"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </motion.button>

          {isLastQuestion ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onSubmit}
              disabled={!isAnswered || isSubmitting}
              className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all ${
                isAnswered && !isSubmitting
                  ? "bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600 hover:opacity-95 shadow-pink-200"
                  : "bg-slate-300 cursor-not-allowed shadow-none"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Complete & Submit</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              disabled={!isAnswered}
              className={`px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2 shadow-md transition-all ${
                isAnswered
                  ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                  : "bg-slate-300 cursor-not-allowed shadow-none"
              }`}
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
