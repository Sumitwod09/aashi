"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { QuestionCard } from "@/components/QuestionCard";
import { CelebrationScreen } from "@/components/CelebrationScreen";
import { QUESTIONS } from "@/data/questions";

// Web Audio API Sound Synthesizer (Zero external dependencies)
function playSound(type: 'click' | 'next' | 'success', soundEnabled: boolean) {
  if (!soundEnabled || typeof window === 'undefined') return;

  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'next') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'success') {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.2, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.35);
      });
    }
  } catch {
    // Ignore audio autoplay policies
  }
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

  // Access key with fallback
  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    "0f82e5b7-789a-4f51-b0db-553b6f2f3f72";

  const currentQuestion = QUESTIONS[currentIndex];
  const currentRawAnswer = userAnswers[currentQuestion.id] || "";

  // Helper to re-calculate XP
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

  // Toggle multi-select checkbox option
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

  // Single select radio option
  const handleSelectSingleOption = (optionLabel: string) => {
    playSound('click', soundEnabled);
    const updated = { ...userAnswers, [currentQuestion.id]: optionLabel };
    setUserAnswers(updated);
    recalculateXp(updated);
  };

  // Short/Long Text change
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

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    playSound('click', soundEnabled);

    try {
      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("subject", "PulseQuest Survey Response 💌");
      formData.append("from_name", "PulseQuest App");

      // Format answers nicely for Web3Forms email
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

        formData.append(`${q.subtitle} - ${q.title}`, displayAnswer || "N/A");
      });

      formData.append("Total_XP_Earned", `${xp} XP`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success || response.ok) {
        setIsSubmitted(true);
        playSound('success', soundEnabled);
      } else {
        console.warn("Web3Forms response warning:", data.message);
        setIsSubmitted(true);
        playSound('success', soundEnabled);
      }
    } catch (error) {
      console.error("Web3Forms submission error:", error);
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
        {/* Hidden Input for Web3Forms Access Key */}
        <input type="hidden" name="access_key" value={accessKey} />

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

      {/* Footer */}
      <footer className="w-full text-center py-3 text-xs text-slate-400 font-mono">
        <span>PulseQuest Mobile-First Q&A • Powered by Next.js & Web3Forms</span>
      </footer>
    </main>
  );
}
