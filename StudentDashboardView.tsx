import React from 'react';
import { TestAttempt, Level, UserAccount, Achievement } from '../types';
import { BarChart3, Award, CheckCircle2, XCircle, Clock, Calendar, Star, ArrowRight, Trophy, Zap, Target, ShieldCheck } from 'lucide-react';

interface StudentDashboardViewProps {
  currentUser: UserAccount | null;
  attempts: TestAttempt[];
  levels: Level[];
  unlockedLevel: number;
  setCurrentTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  currentUser,
  attempts,
  levels,
  unlockedLevel,
  setCurrentTab,
  onOpenAuth,
}) => {
  const totalTests = attempts.length;
  const passedTests = attempts.filter((a) => a.passed).length;
  const avgScore = totalTests > 0 ? attempts.reduce((acc, a) => acc + a.scorePct, 0) / totalTests : 0;
  const avgAccuracy = totalTests > 0
    ? attempts.reduce((acc, a) => acc + (a.correctCount / a.totalQuestions) * 100, 0) / totalTests
    : 0;

  // Compute Achievements
  const achievements: Achievement[] = [
    {
      id: 'first_exam',
      title: 'First Step',
      description: 'Complete your first abacus examination.',
      icon: '🎯',
      unlocked: totalTests >= 1,
      progress: { current: Math.min(totalTests, 1), target: 1 },
    },
    {
      id: 'exam_master_5',
      title: 'Diligent Scholar',
      description: 'Complete 5 examination attempts.',
      icon: '📚',
      unlocked: totalTests >= 5,
      progress: { current: Math.min(totalTests, 5), target: 5 },
    },
    {
      id: 'level_3_unlock',
      title: 'Intermediate Soroban',
      description: 'Reach and unlock Level 3.',
      icon: '⚡',
      unlocked: unlockedLevel >= 3,
    },
    {
      id: 'level_5_unlock',
      title: 'Abacus Prodigy',
      description: 'Reach and unlock Level 5.',
      icon: '🏆',
      unlocked: unlockedLevel >= 5,
    },
    {
      id: 'perfect_score',
      title: 'Perfectionist',
      description: 'Score 100% accuracy on any exam.',
      icon: '⭐',
      unlocked: attempts.some((a) => a.scorePct === 100),
    },
    {
      id: 'speed_demon',
      title: 'Lightning Speed',
      description: 'Finish an exam in under 60 seconds with 70%+ score.',
      icon: '🚀',
      unlocked: attempts.some((a) => a.passed && a.timeUsedSeconds <= 60),
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 text-xs font-semibold uppercase tracking-wider">
            Student Analytics & Badges
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {currentUser ? `${currentUser.name}'s Dashboard` : 'Student Performance Dashboard'}
          </h1>
          <p className="text-blue-100 text-sm max-w-xl">
            {currentUser ? `Signed in as ${currentUser.email}. All test records and achievements are saved to your account.` : 'Sign in to track your personal examination history across devices.'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {!currentUser && (
            <button
              onClick={onOpenAuth}
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm shadow-md transition-all"
            >
              Sign In / Register
            </button>
          )}
          <button
            onClick={() => setCurrentTab('levels')}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-sm transition-all"
          >
            <span>Take New Exam</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Unlocked Level</span>
          <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">Level {unlockedLevel} / {levels.length}</div>
          <p className="text-xs text-slate-500">Keep passing exams to unlock higher tiers.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Examinations</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{totalTests}</div>
          <p className="text-xs text-slate-500">Completed 80-question tests.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Accuracy</span>
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{avgAccuracy.toFixed(1)}%</div>
          <p className="text-xs text-slate-500">Correct answers ratio.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Passed Exams</span>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{passedTests}</div>
          <p className="text-xs text-slate-500">Score &gt;= 70% achieved.</p>
        </div>
      </div>

      {/* Achievement Tracker Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Achievement & Badges Tracker</span>
            </h3>
            <p className="text-xs text-slate-500">Unlock trophies as you progress through your abacus mastery journey.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-bold">
            {achievements.filter(a => a.unlocked).length} / {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border flex items-start space-x-4 transition-all ${
                ach.unlocked
                  ? 'bg-gradient-to-br from-amber-50/50 to-blue-50/50 dark:from-amber-950/20 dark:to-blue-950/20 border-amber-200 dark:border-amber-900/50 shadow-sm'
                  : 'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className="text-3xl p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm shrink-0">
                {ach.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{ach.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ach.unlocked ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                  }`}>
                    {ach.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Examination History List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Exam Attempt History & Results</h3>
            <p className="text-xs text-slate-500">Detailed breakdown of all test scores, accuracy rates, and time used.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold">
            {attempts.length} Total Attempts
          </span>
        </div>

        {attempts.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg">No Examination Attempts Yet</h4>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Select a level and take your first 80-question examination to populate your performance records.
            </p>
            <button
              onClick={() => setCurrentTab('levels')}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md"
            >
              Start First Exam
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {attempts.slice().reverse().map((att) => {
              const accuracy = (att.correctCount / att.totalQuestions) * 100;
              return (
                <div
                  key={att.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-500 transition-all bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        att.passed ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {att.passed ? 'Passed' : 'Failed'}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white text-base">{att.levelTitle}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{att.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Time: {Math.floor(att.timeUsedSeconds / 60)}m {att.timeUsedSeconds % 60}s</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Accuracy</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                        {accuracy.toFixed(1)}% ({att.correctCount}/{att.totalQuestions})
                      </div>
                    </div>

                    <div className={`px-4 py-2 rounded-2xl font-mono font-extrabold text-lg ${
                      att.passed ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {att.scorePct.toFixed(1)}%
                    </div>
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
