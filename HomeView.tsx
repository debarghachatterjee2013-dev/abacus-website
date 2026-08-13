import React from 'react';
import { Calculator, Award, Clock, CheckCircle2, ArrowRight, BookOpen, ShieldCheck, Zap } from 'lucide-react';
import { Level } from '../types';

interface HomeViewProps {
  levels: Level[];
  onSelectLevel: (level: Level) => void;
  setCurrentTab: (tab: string) => void;
  unlockedLevel: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  levels,
  onSelectLevel,
  setCurrentTab,
  unlockedLevel,
}) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white p-8 md:p-16 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/30 backdrop-blur-md border border-blue-400/30 text-blue-100 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Professional Soroban & Mental Arithmetic Academy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Master Mental Math with <span className="text-amber-300">Abacus Master</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 font-normal leading-relaxed">
            Enhance concentration, speed, and calculation accuracy through structured progressive levels, rigorous 80-question timed exams, and interactive virtual abacus tools.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setCurrentTab('levels')}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-base shadow-lg shadow-amber-500/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Start Examination</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentTab('abacus')}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-base transition-all"
            >
              <Calculator className="w-5 h-5" />
              <span>Try Virtual Abacus</span>
            </button>
          </div>
        </div>

        {/* Floating badge stats */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-blue-500/30 max-w-3xl">
          <div>
            <div className="text-3xl font-extrabold text-white">80</div>
            <div className="text-sm text-blue-200">Questions Per Exam</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-amber-300">03:00</div>
            <div className="text-sm text-blue-200">Strict Timed Countdown</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">70%</div>
            <div className="text-sm text-blue-200">Passing Requirement</div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Timed Examinations</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Exact 3-minute timed tests simulating professional abacus championship conditions with auto-submit upon expiration.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Progressive Levels</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Unlock advanced levels by scoring 70% or higher. Progress smoothly from 1-digit simple sums to complex multi-digit master tests.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Interactive Soroban</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Practice bead manipulation on our fully functional virtual abacus before taking the exam. Master bead values instantly.
          </p>
        </div>
      </section>

      {/* Quick Level Selector Preview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Available Levels</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Select a level to begin your practice or examination.</p>
          </div>
          <button
            onClick={() => setCurrentTab('levels')}
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline"
          >
            <span>View All Levels</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.slice(0, 4).map((level) => {
            const isUnlocked = level.id <= unlockedLevel;
            return (
              <div
                key={level.id}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500'
                    : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 opacity-75'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      Level {level.id}
                    </span>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <span className="text-xs font-medium text-slate-400">Locked</span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{level.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{level.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">80 Qs • 3 Mins</span>
                  <button
                    disabled={!isUnlocked}
                    onClick={() => onSelectLevel(level)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isUnlocked
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isUnlocked ? 'Start Exam' : 'Locked'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Instructions & About Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-50 dark:bg-slate-900/60 p-8 md:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
            <BookOpen className="w-4 h-4" />
            <span>Examination Guidelines</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How to Ace Abacus Master</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
              <span><strong>80 Questions:</strong> Every examination test contains precisely 80 arithmetic questions with 5 vertical rows of numbers.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
              <span><strong>03:00 Timer:</strong> The countdown starts instantly upon launching the exam. The system auto-submits when time expires.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
              <span><strong>Passing Rule:</strong> Score 70% or higher (at least 56 correct out of 80) to automatically unlock the next level.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</span>
              <span><strong>Multiple Choice:</strong> Choose one correct option among four realistic distractors calculated precisely.</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
            <Calculator className="w-4 h-4" />
            <span>About Abacus & Soroban</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Power of Mental Visualization</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The abacus (Soroban) is an ancient calculating tool that develops incredible mental arithmetic capabilities, right-brain visualization, and sustained focus. By mastering physical bead movements, students eventually visualize the abacus in their mind, solving complex arithmetic faster than calculators.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentTab('abacus')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all"
            >
              Launch Virtual Abacus Simulator
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
