import React, { useState } from 'react';
import { TestAttempt, Level, Question } from '../types';
import { Award, CheckCircle2, XCircle, Clock, RotateCcw, ArrowRight, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface ResultViewProps {
  attempt: TestAttempt;
  level: Level;
  questions: Question[];
  onRetry: () => void;
  onNextLevel: () => void;
  onReturnHome: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  attempt,
  level,
  questions,
  onRetry,
  onNextLevel,
  onReturnHome,
}) => {
  const [showReview, setShowReview] = useState(false);

  const formatTimeUsed = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      
      {/* Result Banner Card */}
      <div className={`rounded-3xl p-8 md:p-12 text-center text-white shadow-xl space-y-6 ${
        attempt.passed
          ? 'bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800'
          : 'bg-gradient-to-br from-rose-600 via-pink-600 to-rose-800'
      }`}>
        <div className="w-20 h-20 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
          {attempt.passed ? <Award className="w-10 h-10 text-amber-300" /> : <XCircle className="w-10 h-10" />}
        </div>

        <div className="space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
            {attempt.passed ? 'Examination Passed Successfully' : 'Examination Failed - Try Again'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {attempt.scorePct.toFixed(1)}% Score
          </h1>
          <p className="text-white/80 text-sm max-w-md mx-auto">
            {attempt.passed
              ? `Congratulations! You scored above the 70% threshold and unlocked Level ${level.id + 1}.`
              : `You needed 70% to pass Level ${level.id}. Review your mistakes and retry to master this level.`}
          </p>
        </div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
            <span className="block text-xs text-white/70">Total Questions</span>
            <span className="text-2xl font-bold">{attempt.totalQuestions}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
            <span className="block text-xs text-emerald-200">Correct Answers</span>
            <span className="text-2xl font-bold text-emerald-300">{attempt.correctCount}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
            <span className="block text-xs text-rose-200">Wrong Answers</span>
            <span className="text-2xl font-bold text-rose-300">{attempt.wrongCount}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
            <span className="block text-xs text-white/70">Time Used</span>
            <span className="text-2xl font-bold">{formatTimeUsed(attempt.timeUsedSeconds)}</span>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-sm shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry Exam</span>
        </button>

        {attempt.passed && (
          <button
            onClick={onNextLevel}
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 transition-all"
          >
            <span>Next Level</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={onReturnHome}
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all"
        >
          <span>Return to Dashboard</span>
        </button>
      </div>

      {/* Detailed Question Review Toggle */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <button
          onClick={() => setShowReview(!showReview)}
          className="w-full flex items-center justify-between font-bold text-slate-900 dark:text-white text-lg"
        >
          <span>Review All {questions.length} Questions</span>
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 text-sm">
            <span>{showReview ? 'Hide Details' : 'View Details'}</span>
            {showReview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {showReview && (
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {questions.map((q, idx) => {
              const userChosen = attempt.userAnswers[idx];
              const isCorrect = userChosen === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isCorrect
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                      : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        Q#{idx + 1}
                      </span>
                      {isCorrect ? (
                        <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center space-x-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-mono text-slate-700 dark:text-slate-300">
                      {q.numbers.join(' + ')} = <strong className="text-slate-900 dark:text-white">{q.correctAnswer}</strong>
                    </div>
                  </div>

                  <div className="text-xs sm:text-right space-y-1 font-mono">
                    <div>Your Answer: <strong className={isCorrect ? 'text-emerald-600' : 'text-rose-600'}>{userChosen !== undefined ? userChosen : 'Unanswered'}</strong></div>
                    <div>Correct Answer: <strong className="text-emerald-600">{q.correctAnswer}</strong></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
