import React, { useState } from 'react';
import { Level, TestAttempt, AdminCustomQuestion } from '../types';
import { Settings, Plus, Edit, Trash2, ShieldCheck, Award, BarChart3, CheckCircle2, X } from 'lucide-react';

interface AdminViewProps {
  levels: Level[];
  setLevels: React.Dispatch<React.SetStateAction<Level[]>>;
  attempts: TestAttempt[];
  customQuestions: AdminCustomQuestion[];
  setCustomQuestions: React.Dispatch<React.SetStateAction<AdminCustomQuestion[]>>;
}

export const AdminView: React.FC<AdminViewProps> = ({
  levels,
  setLevels,
  attempts,
  customQuestions,
  setCustomQuestions,
}) => {
  const [activeTab, setActiveTab] = useState<'levels' | 'questions' | 'results'>('levels');
  const [editingLevel, setEditingLevel] = useState<Level | null>(null);
  const [showLevelModal, setShowLevelModal] = useState(false);

  // New level form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDigits, setNewDigits] = useState(1);
  const [newRows, setNewRows] = useState(5);
  const [newMin, setNewMin] = useState(1);
  const [newMax, setNewMax] = useState(9);
  const [newTime, setNewTime] = useState(180);

  const handleSaveLevel = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLevel) {
      setLevels(levels.map(l => l.id === editingLevel.id ? {
        ...l,
        title: newTitle,
        description: newDesc,
        digits: newDigits,
        rows: newRows,
        minVal: newMin,
        maxVal: newMax,
        timeLimitSeconds: newTime,
      } : l));
    } else {
      const newL: Level = {
        id: levels.length + 1,
        title: newTitle || `Level ${levels.length + 1}`,
        description: newDesc || 'Custom admin configured level.',
        digits: newDigits,
        rows: newRows,
        minVal: newMin,
        maxVal: newMax,
        allowNegative: true,
        timeLimitSeconds: newTime,
        passingPct: 70,
      };
      setLevels([...levels, newL]);
    }
    setShowLevelModal(false);
    setEditingLevel(null);
    setNewTitle('');
    setNewDesc('');
  };

  const handleDeleteLevel = (id: number) => {
    if (window.confirm('Are you sure you want to delete this level?')) {
      setLevels(levels.filter(l => l.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            Administrator Portal
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Admin Management Console</h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Configure examination levels, customize question parameters, and review student attempt logs.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
          <button
            onClick={() => setActiveTab('levels')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'levels' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Levels ({levels.length})
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'questions' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Custom Qs ({customQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'results' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Student Results ({attempts.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Manage Levels */}
      {activeTab === 'levels' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Manage Levels</h3>
              <p className="text-xs text-slate-500">Add, edit, or remove progressive examination levels.</p>
            </div>
            <button
              onClick={() => {
                setEditingLevel(null);
                setNewTitle('');
                setNewDesc('');
                setNewDigits(1);
                setNewRows(5);
                setShowLevelModal(true);
              }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Level</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {levels.map((level) => (
              <div
                key={level.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs font-bold">
                      Level {level.id}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingLevel(level);
                          setNewTitle(level.title);
                          setNewDesc(level.description);
                          setNewDigits(level.digits);
                          setNewRows(level.rows);
                          setNewMin(level.minVal);
                          setNewMax(level.maxVal);
                          setNewTime(level.timeLimitSeconds);
                          setShowLevelModal(true);
                        }}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-600 dark:text-slate-300"
                        title="Edit Level"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLevel(level.id)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 text-rose-600"
                        title="Delete Level"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">{level.title}</h4>
                  <p className="text-xs text-slate-500">{level.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-center text-xs">
                  <div>
                    <span className="block text-slate-400">Rows</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{level.rows}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400">Range</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{level.minVal}-{level.maxVal}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400">Time</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{Math.floor(level.timeLimitSeconds / 60)}m</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Custom Questions */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Manual Question Management</h3>
              <p className="text-xs text-slate-500">Manually add specific custom arithmetic sequences for exams.</p>
            </div>
            <button
              onClick={() => {
                const numStr = prompt("Enter 5 comma-separated numbers (e.g., 5, 12, -3, 8, 4):");
                if (numStr) {
                  const nums = numStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
                  if (nums.length === 5) {
                    const sum = nums.reduce((a, b) => a + b, 0);
                    const newCQ: AdminCustomQuestion = {
                      id: `cq-${Date.now()}`,
                      levelId: 1,
                      numbers: nums,
                      correctAnswer: sum,
                    };
                    setCustomQuestions([...customQuestions, newCQ]);
                  } else {
                    alert('Please provide exactly 5 valid numbers.');
                  }
                }
              }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Question</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            {customQuestions.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No custom manual questions added yet. Use algorithm generation or add manual sequences.
              </div>
            ) : (
              <div className="space-y-3">
                {customQuestions.map((cq) => (
                  <div key={cq.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Level {cq.levelId} Custom Q</span>
                      <div className="font-mono text-slate-800 dark:text-slate-200 text-sm">
                        {cq.numbers.join(' + ')} = <strong className="text-slate-900 dark:text-white">{cq.correctAnswer}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => setCustomQuestions(customQuestions.filter(x => x.id !== cq.id))}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Student Results */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">All Student Examination Results</h3>
            <p className="text-xs text-slate-500">Comprehensive audit log of all completed test attempts.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            {attempts.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No student results recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {attempts.map((att) => (
                  <div key={att.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${att.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {att.passed ? 'Passed' : 'Failed'}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">{att.levelTitle}</span>
                      </div>
                      <span className="text-xs text-slate-400">{att.date}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Score</div>
                        <div className="font-bold font-mono text-slate-800 dark:text-slate-200">{att.scorePct.toFixed(1)}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Correct</div>
                        <div className="font-bold font-mono text-emerald-600">{att.correctCount}/80</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add/Edit Level Modal */}
      {showLevelModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingLevel ? 'Edit Examination Level' : 'Create New Examination Level'}
              </h3>
              <button onClick={() => setShowLevelModal(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLevel} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Level Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Level 9: Master Speed"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Brief description of the difficulty..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Min Number</label>
                  <input
                    type="number"
                    value={newMin}
                    onChange={(e) => setNewMin(parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Max Number</label>
                  <input
                    type="number"
                    value={newMax}
                    onChange={(e) => setNewMax(parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Rows (Default 5)</label>
                  <input
                    type="number"
                    value={newRows}
                    onChange={(e) => setNewRows(parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Time Limit (Seconds)</label>
                  <input
                    type="number"
                    value={newTime}
                    onChange={(e) => setNewTime(parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLevelModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md"
                >
                  Save Level
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
