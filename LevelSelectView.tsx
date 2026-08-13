import React from 'react';
import { Level, TestAttempt } from '../types';
import { Award, CheckCircle2, Lock, Play, Star, ArrowRight } from 'lucide-react';

interface LevelSelectViewProps {
  levels: Level[];
  unlockedLevel: number;
  attempts: TestAttempt[];
  onSelectLevel: (level: Level) => void;
  setCurrentTab: (tab: string) => void;
}

export const LevelSelectView: React.FC<LevelSelectViewProps> = ({
  levels,
  unlockedLevel,
  attempts,
  onSelectLevel,
  setCurrentTab,
}) => {
  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 text-xs font-semibold uppercase tracking-wider">
            Academy Examinations
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Select Examination Level</h1>
          <p className="text-blue-100 text-sm max-w-xl">
            Progress through graded difficulty tiers. Score 70% or higher on 80 questions within 3 minutes to unlock subsequent tiers.
          </p>
        </div>
        <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <Award className="w-10 h-10 text-amber-300" />
          <div>
            <div className="text-xs text-blue-200">Current Status</div>
            <div className="text-lg font-bold">Level {unlockedLevel} Unlocked</div>
          </div>
        </div>
      </div>

      {/* Level Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level) => {
          const isUnlocked = level.id <= unlockedLevel;
          const levelAttempts = attempts.filter((a) => a.levelId === level.id);
          const bestAttempt = levelAttempts.length > 0
            ? levelAttempts.reduce((best, curr) => curr.scorePct > best.scorePct ? curr : best, levelAttempts[0])
            : null;

          return (
            <div
              key={level.id}
              className={`rounded-3xl border p-6 flex flex-col justify-between transition-all ${
                isUnlocked
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500'
                  : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 opacity-80'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isUnlocked
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    Level {level.id}
                  </span>
                  {isUnlocked ? (
                    <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Unlocked</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-slate-400 text-xs font-semibold">
                      <Lock className="w-4 h-4" />
                      <span>Locked</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{level.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{level.description}</p>
                </div>

                {/* Level details specs */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center text-xs">
                  <div>
                    <span className="block text-slate-400">Rows</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{level.rows}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400">Time</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{Math.floor(level.timeLimitSeconds / 60)} Mins</span>
                  </div>
                  <div>
                    <span className="block text-slate-400">Pass Req</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{level.passingPct}%</span>
                  </div>
                </div>

                {/* Best score badge if attempted */}
                {bestAttempt && (
                  <div className={`p-3 rounded-xl text-xs flex items-center justify-between ${
                    bestAttempt.passed ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                  }`}>
                    <span className="font-medium flex items-center space-x-1.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>Best Score: {bestAttempt.scorePct.toFixed(1)}%</span>
                    </span>
                    <span className="font-bold">{bestAttempt.passed ? 'Passed' : 'Failed'}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={!isUnlocked}
                  onClick={() => onSelectLevel(level)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 transition-all ${
                    isUnlocked
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>{bestAttempt ? 'Retake Exam' : 'Start Exam'}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Complete Level {level.id - 1} First</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
