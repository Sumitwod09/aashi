"use client";

import { motion } from "framer-motion";
import { Check, ArrowLeft, ArrowRight, Sparkles, Send, Loader2, Heart, CheckSquare, Square } from "lucide-react";
import { Question } from "@/data/questions";
import { ProgressBar } from "./ProgressBar";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: string; // JSON array string for multi-choice, or text string
  onToggleMultiOption: (optionLabel: string) => void;
  onSelectSingleOption: (optionLabel: string) => void;
  onTextChange: (text: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  direction: number;
  isLastQuestion: boolean;
  isSubmitting: boolean;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onToggleMultiOption,
  onSelectSingleOption,
  onTextChange,
  onNext,
  onBack,
  onSubmit,
  direction,
  isLastQuestion,
  isSubmitting,
}: QuestionCardProps) {
  // Parse multi-select answers array
  let selectedArray: string[] = [];
  if (question.type === "multi-choice") {
    try {
      selectedArray = selectedAnswer ? JSON.parse(selectedAnswer) : [];
    } catch {
      selectedArray = selectedAnswer ? selectedAnswer.split(", ") : [];
    }
  }

  const isAnswered =
    question.type === "multi-choice"
      ? selectedArray.length > 0
      : selectedAnswer.trim().length > 0;

  // Variants for slide & fade animations
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

  const isFinalQuestion = question.title.toLowerCase().includes("like me");

  return (
    <div className="relative w-full max-w-md mx-auto my-auto px-4 py-2">
      {/* Visual Stack Background Cards */}
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
        className={`relative z-20 glass-panel rounded-3xl p-6 sm:p-7 shadow-xl border flex flex-col justify-between min-h-[460px] ${
          isFinalQuestion
            ? "border-pink-300 shadow-pink-200/50 bg-gradient-to-b from-white/95 via-pink-50/40 to-white/95"
            : "border-white/90 shadow-indigo-100/50"
        }`}
      >
        {/* Header & Progress */}
        <div className="space-y-5">
          <ProgressBar
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            subtitle={question.subtitle}
            instructions={question.instructions}
          />

          {/* Question Title */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-snug flex items-center gap-2">
              {question.title}
              {isFinalQuestion && (
                <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-bounce inline-block" />
              )}
            </h2>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Earn +{question.xpPoints} XP on completion</span>
            </p>
          </div>

          {/* Interactive Question Inputs */}
          <div className="pt-1">
            {/* MULTI-CHOICE CHECKBOXES */}
            {question.type === "multi-choice" && question.options && (
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {question.options.map((option) => {
                  const isChecked = selectedArray.includes(option.label);

                  return (
                    <motion.button
                      key={option.id}
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => onToggleMultiOption(option.label)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 flex items-start gap-3 border ${
                        isChecked
                          ? "bg-gradient-to-r from-indigo-50 to-pink-50 border-indigo-500 shadow-md ring-2 ring-indigo-500/20"
                          : "bg-white/80 hover:bg-slate-50 border-slate-200/80"
                      }`}
                    >
                      {/* Checkbox Icon */}
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 border ${
                          isChecked
                            ? "bg-gradient-to-br from-indigo-600 to-pink-500 border-indigo-600 text-white shadow-sm"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </motion.div>
                        )}
                      </div>

                      {/* Label & Description */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{option.emoji}</span>
                          <span
                            className={`font-semibold text-sm ${
                              isChecked ? "text-indigo-950 font-bold" : "text-slate-700"
                            }`}
                          >
                            {option.label}
                          </span>
                        </div>
                        {option.description && (
                          <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* SINGLE-CHOICE RADIO CARDS */}
            {question.type === "single-choice" && question.options && (
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {question.options.map((option) => {
                  const isSelected = selectedAnswer === option.label;

                  return (
                    <motion.button
                      key={option.id}
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => onSelectSingleOption(option.label)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 flex items-start gap-3 border ${
                        isSelected
                          ? "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-500 shadow-md ring-2 ring-pink-500/20"
                          : "bg-white/80 hover:bg-slate-50 border-slate-200/80"
                      }`}
                    >
                      {/* Radio Circle Icon */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 border ${
                          isSelected
                            ? "bg-pink-600 border-pink-600 text-white shadow-sm"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </motion.div>
                        )}
                      </div>

                      {/* Label & Description */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{option.emoji}</span>
                          <span
                            className={`font-semibold text-sm ${
                              isSelected ? "text-pink-950 font-bold" : "text-slate-700"
                            }`}
                          >
                            {option.label}
                          </span>
                        </div>
                        {option.description && (
                          <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* SHORT TEXT ONE-LINE INPUT */}
            {question.type === "short-text" && (
              <div className="space-y-2 py-2">
                <div className="relative">
                  <input
                    type="text"
                    value={selectedAnswer}
                    onChange={(e) => onTextChange(e.target.value)}
                    placeholder={question.placeholder}
                    className="w-full px-4 py-3.5 text-sm bg-white/90 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-slate-800 placeholder:text-slate-400 shadow-inner font-medium"
                  />
                  <div className="absolute right-3 top-3.5 text-[11px] font-mono text-slate-400">
                    {selectedAnswer.length} chars
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  💡 Type your answer in a single line and hit Next!
                </p>
              </div>
            )}

            {/* LONG TEXTAREA INPUT */}
            {question.type === "long-text" && (
              <div className="space-y-2">
                <div className="relative">
                  <textarea
                    rows={4}
                    value={selectedAnswer}
                    onChange={(e) => onTextChange(e.target.value)}
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

        {/* Card Footer Navigation Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
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
                  ? "bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 hover:opacity-95 shadow-pink-200 animate-pulse"
                  : "bg-slate-300 cursor-not-allowed shadow-none"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Love...</span>
                </>
              ) : (
                <>
                  <span>Submit Final Answer</span>
                  <Heart className="w-4 h-4 fill-white" />
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
