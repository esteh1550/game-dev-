import { useState, useMemo } from 'react';
import { getComboRating, Rating } from '../data/gameData';
import { Sparkles, Trophy, ChevronRight, ListFilter, AlertTriangle, ThumbsUp, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';

interface AllCombosProps {
  ownedGenres: string[];
  ownedTypes: string[];
}

export default function AllCombos({ ownedGenres, ownedTypes }: AllCombosProps) {
  const [showResults, setShowResults] = useState(false);
  const [filter, setFilter] = useState<Rating | 'All'>('All');

  const allCombos = useMemo(() => {
    const combos: { genre: string; type: string; rating: Rating }[] = [];
    
    ownedGenres.forEach(genre => {
      ownedTypes.forEach(type => {
        const rating = getComboRating(genre, type);
        combos.push({ genre, type, rating });
      });
    });

    // Sort by rating priority
    const ratingPriority: Record<Rating, number> = {
      "Amazing!": 0,
      "Creative": 1,
      "Not Bad": 2,
      "Hmm...": 3,
      "Not Good": 4
    };

    return combos.sort((a, b) => ratingPriority[a.rating] - ratingPriority[b.rating]);
  }, [ownedGenres, ownedTypes]);

  const filteredCombos = useMemo(() => {
    if (filter === 'All') return allCombos;
    return allCombos.filter(c => c.rating === filter);
  }, [allCombos, filter]);

  const getRatingStyle = (r: Rating) => {
    switch (r) {
      case 'Amazing!': return {
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        border: 'border-emerald-100 dark:border-emerald-800',
        text: 'text-emerald-700 dark:text-emerald-300',
        icon: <Sparkles className="w-4 h-4" />
      };
      case 'Creative': return {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-100 dark:border-amber-800',
        text: 'text-amber-700 dark:text-amber-300',
        icon: <Lightbulb className="w-4 h-4" />
      };
      case 'Not Bad': return {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-100 dark:border-blue-800',
        text: 'text-blue-700 dark:text-blue-300',
        icon: <ThumbsUp className="w-4 h-4" />
      };
      case 'Hmm...': return {
        bg: 'bg-zinc-100 dark:bg-zinc-800',
        border: 'border-zinc-200 dark:border-zinc-700',
        text: 'text-zinc-600 dark:text-zinc-400',
        icon: <span className="text-lg leading-none">🤔</span>
      };
      case 'Not Good': return {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-100 dark:border-red-800',
        text: 'text-red-700 dark:text-red-300',
        icon: <AlertTriangle className="w-4 h-4" />
      };
    }
  };

  if (!showResults) {
    return (
      <div className="mt-12 text-center">
        <button
          onClick={() => setShowResults(true)}
          disabled={ownedGenres.length === 0 || ownedTypes.length === 0}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold text-lg shadow-xl shadow-zinc-200 dark:shadow-zinc-900/50 hover:transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <ListFilter className="w-5 h-5" />
          Show All Possible Combos
          <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
        </button>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Scans your inventory for all {ownedGenres.length * ownedTypes.length} possible combinations
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-indigo-500" />
          All Combinations ({filteredCombos.length})
        </h3>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {(['All', 'Amazing!', 'Creative', 'Not Bad', 'Hmm...', 'Not Good'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filter === r 
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {r}
            </button>
          ))}
          <button 
            onClick={() => setShowResults(false)}
            className="ml-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline whitespace-nowrap"
          >
            Hide
          </button>
        </div>
      </div>

      {filteredCombos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCombos.map((combo, idx) => {
            const style = getRatingStyle(combo.rating);
            return (
              <motion.div
                key={`${combo.genre}-${combo.type}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.03, 0.5) }} // Cap delay for large lists
                className={`border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group bg-white dark:bg-zinc-900 ${style.border}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${style.bg} ${style.text}`}>
                    {style.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">{combo.genre}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">{combo.type}</div>
                  </div>
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-md ${style.bg} ${style.text}`}>
                  {combo.rating}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-zinc-500">
            No combinations found with this filter.
          </p>
        </div>
      )}
    </div>
  );
}
