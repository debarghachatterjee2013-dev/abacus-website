import React, { useState } from 'react';
import { Calculator, RotateCcw, Sparkles } from 'lucide-react';

interface RodState {
  upperActive: boolean; // true if upper bead is moved down (value = 5)
  lowerActiveCount: number; // 0 to 4 lower beads moved up (value = 1 each)
}

export const AbacusSimulator: React.FC = () => {
  const numRods = 7; // 7 rods (Millions down to Units)
  const [rods, setRods] = useState<RodState[]>(
    Array.from({ length: numRods }, () => ({ upperActive: false, lowerActiveCount: 0 }))
  );

  const calculateTotal = () => {
    let total = 0;
    rods.forEach((rod, index) => {
      const power = numRods - 1 - index;
      const placeValue = Math.pow(10, power);
      const rodVal = (rod.upperActive ? 5 : 0) + rod.lowerActiveCount;
      total += rodVal * placeValue;
    });
    return total;
  };

  const handleToggleUpper = (rodIndex: number) => {
    const updated = [...rods];
    updated[rodIndex] = {
      ...updated[rodIndex],
      upperActive: !updated[rodIndex].upperActive,
    };
    setRods(updated);
  };

  const handleLowerClick = (rodIndex: number, clickedBeadIndex: number) => {
    // clickedBeadIndex is 0 to 3 (from top to bottom of lower deck)
    // If clicking bead i, we set active count to clickedBeadIndex + 1 (or toggle if already that count)
    const currentCount = rods[rodIndex].lowerActiveCount;
    const newCount = currentCount === clickedBeadIndex + 1 ? clickedBeadIndex : clickedBeadIndex + 1;

    const updated = [...rods];
    updated[rodIndex] = {
      ...updated[rodIndex],
      lowerActiveCount: newCount,
    };
    setRods(updated);
  };

  const handleReset = () => {
    setRods(
      Array.from({ length: numRods }, () => ({ upperActive: false, lowerActiveCount: 0 }))
    );
  };

  const placeValues = ['1,000,000', '100,000', '10,000', '1,000', '100', '10', '1'];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 text-xs font-semibold uppercase tracking-wider">
            Interactive Soroban
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Virtual Abacus Practice</h1>
          <p className="text-blue-100 text-sm max-w-lg">
            Click on upper beads (Heaven beads = 5) and lower beads (Earth beads = 1) to simulate physical soroban bead manipulation.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-sm transition-all shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Abacus</span>
        </button>
      </div>

      {/* Display Total Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm text-center space-y-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">Current Soroban Value</span>
        <div className="text-5xl sm:text-6xl font-extrabold font-mono text-blue-600 dark:text-blue-400 tracking-wider">
          {calculateTotal().toLocaleString()}
        </div>
        <p className="text-xs text-slate-500">Manipulate beads below to calculate instantly.</p>
      </div>

      {/* Abacus Soroban Frame */}
      <div className="bg-amber-950 dark:bg-slate-950 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-900 dark:border-slate-800 relative">
        
        {/* Beam bar separating upper and lower decks */}
        <div className="absolute top-[38%] left-0 right-0 h-4 bg-amber-800 dark:bg-slate-800 border-y-2 border-amber-900 shadow-md flex items-center justify-around px-8">
          {Array.from({ length: numRods }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-amber-400 dark:bg-blue-400 shadow-sm" />
          ))}
        </div>

        <div className="grid grid-cols-7 gap-3 sm:gap-6 relative z-10">
          {rods.map((rod, rodIdx) => {
            const rodVal = (rod.upperActive ? 5 : 0) + rod.lowerActiveCount;

            return (
              <div key={rodIdx} className="flex flex-col items-center space-y-3 relative">
                
                {/* Vertical wire */}
                <div className="absolute top-0 bottom-0 w-1 bg-amber-900/60 dark:bg-slate-800 z-0" />

                {/* Place value label */}
                <div className="text-[10px] font-mono text-amber-200/80 bg-amber-900/80 dark:bg-slate-800 px-1.5 py-0.5 rounded z-20">
                  {placeValues[rodIdx]}
                </div>

                {/* Upper Deck (Heaven beads: 1 bead, value 5) */}
                <div className="h-24 w-full flex flex-col justify-start items-center relative z-10 pt-2">
                  <button
                    onClick={() => handleToggleUpper(rodIdx)}
                    className={`w-10 sm:w-12 h-7 rounded-full shadow-md transition-all transform ${
                      rod.upperActive
                        ? 'translate-y-8 bg-amber-200 dark:bg-blue-400 border-2 border-amber-400'
                        : 'translate-y-0 bg-amber-700 dark:bg-slate-700 border-2 border-amber-600'
                    } hover:scale-105 active:scale-95`}
                    title="Heaven Bead (5)"
                  />
                </div>

                {/* Spacer for Beam */}
                <div className="h-6" />

                {/* Lower Deck (Earth beads: 4 beads, value 1 each) */}
                <div className="h-44 w-full flex flex-col items-center relative z-10 pb-2 space-y-1">
                  {Array.from({ length: 4 }).map((_, beadIdx) => {
                    // beadIdx 0 is top-most lower bead
                    // If lowerActiveCount > beadIdx, this bead is pushed UP toward the beam
                    const isActive = rod.lowerActiveCount > beadIdx;

                    return (
                      <button
                        key={beadIdx}
                        onClick={() => handleLowerClick(rodIdx, beadIdx)}
                        className={`w-10 sm:w-12 h-7 rounded-full shadow-md transition-all transform ${
                          isActive
                            ? '-translate-y-6 bg-amber-200 dark:bg-blue-400 border-2 border-amber-400'
                            : 'translate-y-0 bg-amber-700 dark:bg-slate-700 border-2 border-amber-600'
                        } hover:scale-105 active:scale-95`}
                        title={`Earth Bead (${beadIdx + 1})`}
                      />
                    );
                  })}
                </div>

                {/* Rod value badge */}
                <div className="text-xs font-mono font-bold text-amber-300 dark:text-blue-400 bg-amber-900/90 dark:bg-slate-800 px-2 py-1 rounded-xl z-20">
                  {rodVal}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Guide notes */}
      <div className="bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-slate-800 rounded-3xl p-6 text-sm text-slate-700 dark:text-slate-300 space-y-2">
        <h3 className="font-bold text-blue-900 dark:text-blue-300 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Soroban Bead Rules:</span>
        </h3>
        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <li><strong>Heaven Bead (Upper):</strong> Worth <strong className="text-blue-600">5</strong> units when moved down toward the center beam.</li>
          <li><strong>Earth Beads (Lower):</strong> Each of the 4 beads is worth <strong className="text-blue-600">1</strong> unit when moved up toward the center beam.</li>
          <li>Click any bead to slide it up or down instantly.</li>
        </ul>
      </div>

    </div>
  );
};
