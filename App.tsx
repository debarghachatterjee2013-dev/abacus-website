import React, { useState, useEffect } from 'react';
import { Level, Question, TestAttempt, AdminCustomQuestion, UserAccount } from './types';
import { DEFAULT_LEVELS } from './defaultLevels';
import { generateTestQuestions } from './questionGenerator';
import { Navbar } from './Navbar';
import { HomeView } from './HomeView';
import { LevelSelectView } from './LevelSelectView';
import { TestView } from './TestView';
import { ResultView } from './ResultView';
import { AbacusSimulator } from './AbacusSimulator';
import { StudentDashboardView } from './StudentDashboardView';
import { AdminView } from './AdminView';
import { AuthModal } from './AuthModal';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('abacus_dark_mode') === 'true';
  });

  // Accounts list
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('abacus_accounts');
    if (saved) {
      const parsed: UserAccount[] = JSON.parse(saved);
      // Ensure AMP admin exists
      if (!parsed.some(a => a.isAdmin)) {
        parsed.unshift({
          email: 'admin@abacus.com',
          name: 'AMP Administrator',
          passwordHash: 'admin123',
          unlockedLevel: 5,
          attempts: [],
          createdAt: '2026-08-01',
          isAdmin: true,
        });
      }
      return parsed;
    }
    // Default seed accounts
    return [
      {
        email: 'admin@abacus.com',
        name: 'AMP Administrator',
        passwordHash: 'admin123',
        unlockedLevel: 5,
        attempts: [],
        createdAt: '2026-08-01',
        isAdmin: true,
      },
      {
        email: 'student@abacus.com',
        name: 'Demo Student',
        passwordHash: 'password',
        unlockedLevel: 1,
        attempts: [],
        createdAt: '2026-08-01',
        isAdmin: false,
      },
    ];
  });

  const [currentEmail, setCurrentEmail] = useState<string | null>(() => {
    return localStorage.getItem('abacus_current_email') || 'student@abacus.com';
  });

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const [levels, setLevels] = useState<Level[]>(() => {
    const saved = localStorage.getItem('abacus_levels');
    return saved ? JSON.parse(saved) : DEFAULT_LEVELS;
  });

  const [customQuestions, setCustomQuestions] = useState<AdminCustomQuestion[]>(() => {
    const saved = localStorage.getItem('abacus_custom_qs');
    return saved ? JSON.parse(saved) : [];
  });

  // Active test state
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [lastAttempt, setLastAttempt] = useState<TestAttempt | null>(null);

  // Get current user object
  const currentUser = accounts.find((a) => a.email.toLowerCase() === currentEmail?.toLowerCase()) || accounts[0] || null;

  const unlockedLevel = currentUser ? currentUser.unlockedLevel : 1;
  const attempts = currentUser ? currentUser.attempts : [];

  // Sync dark mode class
  useEffect(() => {
    localStorage.setItem('abacus_dark_mode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Save accounts
  useEffect(() => {
    localStorage.setItem('abacus_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (currentEmail) {
      localStorage.setItem('abacus_current_email', currentEmail);
    } else {
      localStorage.removeItem('abacus_current_email');
    }
  }, [currentEmail]);

  useEffect(() => {
    localStorage.setItem('abacus_levels', JSON.stringify(levels));
  }, [levels]);

  useEffect(() => {
    localStorage.setItem('abacus_custom_qs', JSON.stringify(customQuestions));
  }, [customQuestions]);

  const handleLogin = (user: UserAccount) => {
    setCurrentEmail(user.email);
  };

  const handleLogout = () => {
    setCurrentEmail(null);
    setShowAuthModal(true);
  };

  const updateCurrentUser = (updater: (user: UserAccount) => UserAccount) => {
    if (!currentUser) return;
    const updatedUser = updater(currentUser);
    setAccounts(accounts.map((a) => (a.email.toLowerCase() === updatedUser.email.toLowerCase() ? updatedUser : a)));
  };

  const handleStartExam = (level: Level) => {
    setActiveLevel(level);
    const generated = generateTestQuestions(level, 80);
    setActiveQuestions(generated);
    setCurrentTab('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishTest = (attempt: TestAttempt) => {
    setLastAttempt(attempt);

    updateCurrentUser((user) => {
      const newAttempts = [...user.attempts, attempt];
      let newUnlocked = user.unlockedLevel;
      if (attempt.passed && attempt.levelId === user.unlockedLevel) {
        if (attempt.levelId + 1 <= levels.length) {
          newUnlocked = attempt.levelId + 1;
        }
      }
      return {
        ...user,
        attempts: newAttempts,
        unlockedLevel: newUnlocked,
      };
    });

    setCurrentTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryTest = () => {
    if (activeLevel) {
      handleStartExam(activeLevel);
    } else {
      setCurrentTab('levels');
    }
  };

  const handleNextLevel = () => {
    if (activeLevel) {
      const nextLevelObj = levels.find((l) => l.id === activeLevel.id + 1);
      if (nextLevelObj && nextLevelObj.id <= unlockedLevel) {
        handleStartExam(nextLevelObj);
      } else {
        setCurrentTab('levels');
      }
    } else {
      setCurrentTab('levels');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50/70 text-slate-900'
    }`}>
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        unlockedLevel={unlockedLevel}
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        accounts={accounts}
        setAccounts={setAccounts}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'home' && (
          <HomeView
            levels={levels}
            onSelectLevel={handleStartExam}
            setCurrentTab={setCurrentTab}
            unlockedLevel={unlockedLevel}
          />
        )}

        {currentTab === 'levels' && (
          <LevelSelectView
            levels={levels}
            unlockedLevel={unlockedLevel}
            attempts={attempts}
            onSelectLevel={handleStartExam}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'test' && activeLevel && (
          <TestView
            level={activeLevel}
            questions={activeQuestions}
            onFinishTest={handleFinishTest}
            onCancel={() => setCurrentTab('levels')}
          />
        )}

        {currentTab === 'result' && lastAttempt && activeLevel && (
          <ResultView
            attempt={lastAttempt}
            level={activeLevel}
            questions={activeQuestions}
            onRetry={handleRetryTest}
            onNextLevel={handleNextLevel}
            onReturnHome={() => setCurrentTab('levels')}
          />
        )}

        {currentTab === 'abacus' && <AbacusSimulator />}

        {currentTab === 'dashboard' && (
          <StudentDashboardView
            currentUser={currentUser}
            attempts={attempts}
            levels={levels}
            unlockedLevel={unlockedLevel}
            setCurrentTab={setCurrentTab}
            onOpenAuth={() => setShowAuthModal(true)}
          />
        )}

        {currentTab === 'admin' && (
          currentUser?.isAdmin ? (
            <AdminView
              levels={levels}
              setLevels={setLevels}
              attempts={attempts}
              customQuestions={customQuestions}
              setCustomQuestions={setCustomQuestions}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-inner">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">AMP Admin Access Restricted</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The AMP Admin Management Panel is restricted to authorized administrative accounts only. Please sign in with administrator credentials to access management features.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Sign In with Credentials</span>
                </button>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
}
