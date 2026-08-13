import React, { useState, useEffect } from 'react';
import { Level, Question, TestAttempt } from '../types';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Grid, X } from 'lucide-react';

interface TestViewProps {
  level: Level;
  questions: Question[];
  onFinishTest: (attempt: TestAttempt) => void;
  onCancel: () => void;
}

export const TestView: React.FC<TestViewProps> = ({
  level,
  questions,
  onFinishTest,
  onCancel,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(level.timeLimitSeconds); // 180 seconds (03:00)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGridModal, setShowGridModal] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitting) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest(true); // auto submit on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitting]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionValue: number) => {
    if (isSubmitting) return;
    setUserAnswers({
      ...userAnswers,
      [currentIndex]: optionValue,
    });
  };

  const handleSubmitTest = (autoSubmitted = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    let correctCount = 0;
    let wrongCount = 0;

    questions.forEach((q, idx) => {
      const chosen = userAnswers[idx];
      if (chosen === q.correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const scorePct = (correctCount / questions.length) * 100;
    const timeUsedSeconds = level.timeLimitSeconds - timeLeft;
    const passed = scorePct >= level.passingPct;

    const attempt: TestAttempt = {
      id: `attempt-${Date.now()}`,
      levelId: level.id,
      levelTitle: level.title,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      totalQuestions: questions.length,
      correctCount,
      wrongCount,
      scorePct,
      timeUsedSeconds,
      passed,
      userAnswers,
    };

    onFinishTest(attempt);
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const progressPct = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Top Bar: Timer, Progress & Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Level</span>
            <span className="font-bold text-slate-800 dark:text-white">{level.title}</span>
          </div>

          <button
            onClick={() => setShowGridModal(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200"
          >
            <Grid className="w-4 h-4" />
            <span>{answeredCount}/80 Answered</span>
          </button>
        </div>

        {/* Timer */}
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-mono font-bold text-lg shadow-inner ${
          timeLeft <= 30
            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 animate-pulse'
            : 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
        }`}>
          <Clock className="w-5 h-5 animate-spin-slow" />
          <span>{formatTime(timeLeft)}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to quit the exam? Progress will be lost.')) {
                onCancel();
              }
            }}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Quit
          </button>

          <button
            onClick={() => {
              if (window.confirm(`Are you sure you want to submit your test? (${answeredCount}/80 answered)`)) {
                handleSubmitTest(false);
              }
            }}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-500/20"
          >
            Submit Exam
          </button>
        </div>

      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progressPct)}% Completed</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
        
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase">
            Mental Calculation #{currentIndex + 1}
          </span>
          <p className="text-sm text-slate-500">Perform the following 5 vertical rows:</p>
        </div>

        {/* Vertical Abacus Numbers Display */}
        <div className="max-w-xs mx-auto bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-inner space-y-3 font-mono text-center">
          {currentQ.numbers.map((num, idx) => (
            <div
              key={idx}
              className={`text-2xl sm:text-3xl font-bold tracking-widest ${
                num < 0
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-slate-800 dark:text-slate-100'
              }`}
            >
              {num >= 0 && idx > 0 ? `+${num}` : num}
            </div>
          ))}
          <div className="border-t-2 border-slate-400 dark:border-slate-600 pt-2 text-xs text-slate-400 uppercase font-sans font-semibold tracking-wider">
            Calculate Total
          </div>
        </div>

        {/* Options Grid (4 Multiple Choice Answers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {currentQ.options.map((option, optIdx) => {
            const isSelected = userAnswers[currentIndex] === option;
            const optionLetters = ['A', 'B', 'C', 'D'];

            return (
              <button
                key={optIdx}
                disabled={isSubmitting}
                onClick={() => handleSelectOption(option)}
                className={`p-5 rounded-2xl border text-left flex items-center justify-between transition-all group ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20 scale-[1.01]'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-blue-100 group-hover:text-blue-700'
                  }`}>
                    {optionLetters[optIdx]}
                  </span>
                  <span className="text-xl font-bold font-mono tracking-wide">{option}</span>
                </div>

                {isSelected && <CheckCircle className="w-5 h-5 text-white" />}
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons: Previous / Next */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-semibold text-slate-400">
            {currentIndex + 1} of {questions.length}
          </span>

          <button
            disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className={`inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              currentIndex === questions.length - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Question Grid Modal */}
      {showGridModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-2xl w-full shadow-xl space-y-6 max-h-[85vh] flex flex-col">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Question Navigator</h3>
                <p className="text-xs text-slate-500">Jump directly to any question. Answered questions are highlighted.</p>
              </div>
              <button
                onClick={() => setShowGridModal(false)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 overflow-y-auto p-2">
              {questions.map((_, idx) => {
                const isAnswered = userAnswers[idx] !== undefined;
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowGridModal(false);
                    }}
                    className={`h-10 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white'
                        : isAnswered
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span>Answered ({answeredCount})</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
                  <span>Unanswered ({80 - answeredCount})</span>
                </span>
              </div>
              <button
                onClick={() => setShowGridModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
