// REMINDER: Add NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec inside your .env.local file

"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { QuestionCard } from "@/components/QuestionCard";
import { CelebrationScreen } from "@/components/CelebrationScreen";
import { MusicPlayer } from "@/components/MusicPlayer";
import { QUESTIONS } from "@/data/questions";

// Web Audio API Sound Synthesizer disabled to preserve studio music quality
function playSound(_type: 'click' | 'next' | 'success', _soundEnabled: boolean) {
  // Pure music audio playback only
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [xp, setXp] = useState(0);
  const [streak] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Google Apps Script / Stein HQ / SheetDB Endpoint URL
  const scriptUrl =
    process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
    process.env.NEXT_PUBLIC_STEINHQ_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

  const currentQuestion = QUESTIONS[currentIndex];
  const currentRawAnswer = userAnswers[currentQuestion.id] || "";

  // Calculate XP total
  const recalculateXp = (updated: Record<number, string>) => {
    let totalXp = 0;
    QUESTIONS.forEach((q) => {
      const val = updated[q.id];
      if (val) {
        if (q.type === "multi-choice") {
          try {
            const arr = JSON.parse(val);
            if (Array.isArray(arr) && arr.length > 0) {
              totalXp += q.xpPoints;
            }
          } catch {
            if (val.trim().length > 0) totalXp += q.xpPoints;
          }
        } else if (val.trim().length > 0) {
          totalXp += q.xpPoints;
        }
      }
    });
    setXp(totalXp);
  };

  // Checkbox option toggle
  const handleToggleMultiOption = (optionLabel: string) => {
    playSound('click', soundEnabled);
    let currentArray: string[] = [];
    try {
      currentArray = currentRawAnswer ? JSON.parse(currentRawAnswer) : [];
    } catch {
      currentArray = currentRawAnswer ? currentRawAnswer.split(", ") : [];
    }

    let updatedArray: string[];
    if (currentArray.includes(optionLabel)) {
      updatedArray = currentArray.filter((item) => item !== optionLabel);
    } else {
      updatedArray = [...currentArray, optionLabel];
    }

    const updated = {
      ...userAnswers,
      [currentQuestion.id]: JSON.stringify(updatedArray),
    };
    setUserAnswers(updated);
    recalculateXp(updated);
  };

  // Radio option select
  const handleSelectSingleOption = (optionLabel: string) => {
    playSound('click', soundEnabled);
    const updated = { ...userAnswers, [currentQuestion.id]: optionLabel };
    setUserAnswers(updated);
    recalculateXp(updated);
  };

  // Text change
  const handleTextChange = (text: string) => {
    const updated = { ...userAnswers, [currentQuestion.id]: text };
    setUserAnswers(updated);
    recalculateXp(updated);
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      playSound('next', soundEnabled);
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      playSound('next', soundEnabled);
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    playSound('click', soundEnabled);
    setCurrentIndex(0);
    setUserAnswers({});
    setXp(0);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setDirection(1);
  };

  // Asynchronous final submission logic for Google Apps Script / Google Sheets
  const handleFinalSubmit = async (answers: Record<number, string>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Build payload mapping q1, q2, ..., q27
      const payload: Record<string, string> = {
        created_at: new Date().toISOString(),
        total_xp: `${xp} XP`,
      };

      QUESTIONS.forEach((q) => {
        const raw = answers[q.id] || "";
        let displayAnswer = raw;

        if (q.type === "multi-choice") {
          try {
            const arr = JSON.parse(raw);
            if (Array.isArray(arr)) {
              displayAnswer = arr.join(", ");
            }
          } catch {
            displayAnswer = raw;
          }
        }

        const cleanAnswer = displayAnswer || "N/A";
        payload[`q${q.id}`] = cleanAnswer;
        payload[q.title] = cleanAnswer;
      });

      // MUST use Content-Type: "text/plain;charset=utf-8" to prevent CORS preflight issues with Google Apps Script
      const isSteinHq = scriptUrl.includes("steinhq.com");
      const requestBody = isSteinHq ? JSON.stringify([payload]) : JSON.stringify(payload);

      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: requestBody,
      });

      let responseData: Record<string, unknown> = {};
      try {
        responseData = await response.json();
      } catch {
        // Plain text / redirect OK response from Apps Script
      }

      if (response.ok || responseData?.status === "success" || responseData?.result === "success" || responseData?.created) {
        setIsSubmitted(true);
      } else {
        console.warn("Submission response notice:", responseData);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Google Script submission error:", error);
      // Fallback grace to celebration screen so user experience is smooth
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-between py-2 sm:py-6 selection:bg-indigo-500 selection:text-white">
      {/* Header Bar */}
      <Header
        xp={xp}
        streak={streak}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onReset={handleReset}
      />

      {/* Main Card Container */}
      <div className="flex-1 flex flex-col justify-center items-center py-4 w-full">
        <AnimatePresence mode="wait" custom={direction}>
          {!isSubmitted ? (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={QUESTIONS.length}
              selectedAnswer={currentRawAnswer}
              onToggleMultiOption={handleToggleMultiOption}
              onSelectSingleOption={handleSelectSingleOption}
              onTextChange={handleTextChange}
              onNext={handleNext}
              onBack={handleBack}
              onSubmit={() => handleFinalSubmit(userAnswers)}
              direction={direction}
              isLastQuestion={currentIndex === QUESTIONS.length - 1}
              isSubmitting={isSubmitting}
            />
          ) : (
            <CelebrationScreen
              key="celebration"
              userAnswers={userAnswers}
              xp={xp}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Background Music Player */}
      <MusicPlayer soundEnabled={soundEnabled} />

      {/* Footer */}
      <footer className="w-full text-center py-3 text-xs text-slate-400 font-mono">
        <span>PulseQuest Interactive Game • Next.js</span>
      </footer>
    </main>
  );
}
