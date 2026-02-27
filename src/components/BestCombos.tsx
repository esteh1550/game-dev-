import { useState, useMemo } from 'react';
import { AMAZING_COMBOS } from '../data/gameData';
import { Sparkles, Trophy, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface BestCombosProps {
  ownedGenres: string[];
  ownedTypes: string[];
}

export default function BestCombos({ ownedGenres, ownedTypes }: BestCombosProps) {
  const [showResults, setShowResults] = useState(false);

  const bestCombos = useMemo(() => {
    const combos: { genre: string; type: string }[] = [];
    
    ownedGenres.forEach(genre => {
      const amazingTypes = AMAZING_COMBOS[genre] || [];
      amazingTypes.forEach(type => {
        if (ownedTypes.includes(type)) {
          combos.push({ genre, type });
        }
      });
    });

    return combos;
  }, [ownedGenres, ownedTypes]);

  if (!showResults) {
    return (
      <div className="mt-12 text-center">
        <button
          onClick={() => setShowResults(true)}
          disabled={ownedGenres.length === 0 || ownedTypes.length === 0}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold text-lg shadow-xl shadow-zinc-200 dark:shadow-zinc-900/50 hover:transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Find My Best Combos
          <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
        </button>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Scans your inventory for "Amazing!" combinations
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Best Combinations ({bestCombos.length})
        </h3>
        <button 
          onClick={() => setShowResults(false)}
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline"
        >
          Hide Results
        </button>
      </div>

      {bestCombos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bestCombos.map((combo, idx) => (
            <motion.div
              key={`${combo.genre}-${combo.type}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  A+
                </div>
                <div className="text-left">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">{combo.genre}</div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">{combo.type}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-zinc-500">
            No "Amazing!" combinations found with your current inventory. 
            <br />
            Try unlocking more Genres or Types!
          </p>
        </div>
      )}
    </div>
  );
}
