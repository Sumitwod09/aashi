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

  // Full API Endpoint URL or SheetDB API ID fallback
  const apiEndpoint =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NEXT_PUBLIC_SHEETDB_API_ID
      ? `https://sheetdb.io/api/v1/${process.env.NEXT_PUBLIC_SHEETDB_API_ID}`
      : `https://sheetdb.io/api/v1/58f07ea4d42e0`);

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

  // Asynchronous fetch to API Endpoint URL on final card click
  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    playSound('click', soundEnabled);

    try {
      // Build payload object: { created_at: "ISO_STRING", q1: "...", q2: "..." }
      const rowData: Record<string, string> = {
        created_at: new Date().toISOString(),
        total_xp: `${xp} XP`,
      };

      QUESTIONS.forEach((q) => {
        const raw = userAnswers[q.id] || "";
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

        rowData[`q${q.id}`] = displayAnswer || "N/A";
      });

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [rowData],
        }),
      });

      let data: Record<string, unknown> = {};
      try {
        data = await response.json();
      } catch {
        // Handle non-JSON or plain OK responses
      }

      if (response.ok || data?.created || data?.success) {
        setIsSubmitted(true);
        playSound('success', soundEnabled);
      } else {
        console.warn("API response warning:", data);
        // Fallback grace to victory view
        setIsSubmitted(true);
        playSound('success', soundEnabled);
      }
    } catch (error) {
      console.error("API connection error:", error);
      // Graceful fallback to completion screen
      setIsSubmitted(true);
      playSound('success', soundEnabled);
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
              onSubmit={handleSubmit}
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
