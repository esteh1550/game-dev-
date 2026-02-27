import { useState, useMemo } from 'react';
import { getComboRating, Rating } from '../data/gameData';
import { Search, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ComboFinderProps {
  ownedGenres: string[];
  ownedTypes: string[];
  openInventory: () => void;
}

export default function ComboFinder({ ownedGenres, ownedTypes, openInventory }: ComboFinderProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  const rating = useMemo(() => {
    if (!selectedGenre || !selectedType) return null;
    return getComboRating(selectedGenre, selectedType);
  }, [selectedGenre, selectedType]);

  const reset = () => {
    setSelectedGenre('');
    setSelectedType('');
  };

  const getRatingColor = (r: Rating) => {
    switch (r) {
      case 'Amazing!': return 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-emerald-200 dark:shadow-emerald-900/50';
      case 'Creative': return 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-orange-200 dark:shadow-orange-900/50';
      default: return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700';
    }
  };

  const getRatingIcon = (r: Rating) => {
    switch (r) {
      case 'Amazing!': return <Sparkles className="w-8 h-8 animate-pulse" />;
      case 'Creative': return <div className="text-2xl">💡</div>;
      default: return <div className="text-2xl">🤔</div>;
    }
  };

  if (ownedGenres.length === 0 && ownedTypes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Inventory Empty</h3>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mb-6">
          Please check off your unlocked Genres and Types in the Inventory menu to start finding combos.
        </p>
        <button 
          onClick={openInventory}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
        >
          Open Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Genre Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Select Genre
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-zinc-400" />
            </div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none transition-shadow shadow-sm group-hover:shadow-md"
            >
              <option value="">Choose a Genre...</option>
              {ownedGenres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <div className="border-l border-zinc-300 dark:border-zinc-700 h-4 mx-2"></div>
              <span className="text-xs text-zinc-400">{ownedGenres.length}</span>
            </div>
          </div>
        </div>

        {/* Type Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Select Type
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-zinc-400" />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none appearance-none transition-shadow shadow-sm group-hover:shadow-md"
            >
              <option value="">Choose a Type...</option>
              {ownedTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <div className="border-l border-zinc-300 dark:border-zinc-700 h-4 mx-2"></div>
              <span className="text-xs text-zinc-400">{ownedTypes.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Result Display */}
      <AnimatePresence mode="wait">
        {selectedGenre && selectedType ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`relative overflow-hidden rounded-2xl p-8 text-center shadow-xl ${getRatingColor(rating!)}`}
          >
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-full shadow-inner">
                {getRatingIcon(rating!)}
              </div>
              <div>
                <h2 className="text-4xl font-bold tracking-tight mb-2">{rating}</h2>
                <p className="text-lg opacity-90 font-medium">
                  {selectedGenre} + {selectedType}
                </p>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-black rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-8 text-center"
          >
            <p className="text-zinc-400 dark:text-zinc-500">
              Select a Genre and Type to see the combination rating.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex justify-center">
        <button
          onClick={reset}
          disabled={!selectedGenre && !selectedType}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className="w-4 h-4" />
          Reset Selection
        </button>
      </div>
    </div>
  );
}
