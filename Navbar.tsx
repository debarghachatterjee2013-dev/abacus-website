import React from 'react';
import { Calculator, Award, BarChart3, Home, Settings, Grid, Moon, Sun, User, LogOut, LogIn, ShieldCheck } from 'lucide-react';
import { UserAccount } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  unlockedLevel: number;
  currentUser: UserAccount | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  darkMode,
  setDarkMode,
  unlockedLevel,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  return (
    <header className={`sticky top-0 z-50 transition-colors duration-200 border-b ${
      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
    } shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Title */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Abacus Master
            </span>
            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
              Soroban & Mental Math Academy
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => setCurrentTab('home')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'home'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setCurrentTab('levels')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'levels' || currentTab === 'test'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Exams & Levels</span>
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-bold">
              Up to L{unlockedLevel}
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('abacus')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'abacus'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Virtual Abacus</span>
          </button>

          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'dashboard'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Student Stats & Badges</span>
          </button>

          <button
            onClick={() => setCurrentTab('admin')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'admin'
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>AMP Admin</span>
          </button>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {currentUser ? (
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-800 dark:text-white">{currentUser.name}</span>
                <span className="text-[10px] text-slate-400 truncate max-w-[120px]">{currentUser.email}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-600 dark:text-slate-300 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>

      </div>

      {/* Mobile nav subbar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800 py-2.5 px-2 text-xs font-medium">
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center space-y-1 ${currentTab === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => setCurrentTab('levels')}
          className={`flex flex-col items-center space-y-1 ${currentTab === 'levels' || currentTab === 'test' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}
        >
          <Award className="w-4 h-4" />
          <span>Levels</span>
        </button>
        <button
          onClick={() => setCurrentTab('abacus')}
          className={`flex flex-col items-center space-y-1 ${currentTab === 'abacus' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}
        >
          <Grid className="w-4 h-4" />
          <span>Abacus</span>
        </button>
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`flex flex-col items-center space-y-1 ${currentTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Stats</span>
        </button>
        <button
          onClick={() => setCurrentTab('admin')}
          className={`flex flex-col items-center space-y-1 ${currentTab === 'admin' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>AMP Admin</span>
        </button>
      </div>
    </header>
  );
};
