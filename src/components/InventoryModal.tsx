import { useState, useEffect, useMemo } from 'react';
import { ALL_GENRES, ALL_TYPES } from '../data/gameData';
import { X, Check, Trash2, CheckSquare, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownedGenres: string[];
  setOwnedGenres: (genres: string[]) => void;
  ownedTypes: string[];
  setOwnedTypes: (types: string[]) => void;
}

export default function InventoryModal({
  isOpen,
  onClose,
  ownedGenres,
  setOwnedGenres,
  ownedTypes,
  setOwnedTypes
}: InventoryModalProps) {
  const [activeTab, setActiveTab] = useState<'genres' | 'types'>('genres');
  const [searchQuery, setSearchQuery] = useState('');

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset search when tab changes
  useEffect(() => {
    setSearchQuery('');
  }, [activeTab]);

  const toggleGenre = (genre: string) => {
    if (ownedGenres.includes(genre)) {
      setOwnedGenres(ownedGenres.filter(g => g !== genre));
    } else {
      setOwnedGenres([...ownedGenres, genre]);
    }
  };

  const toggleType = (type: string) => {
    if (ownedTypes.includes(type)) {
      setOwnedTypes(ownedTypes.filter(t => t !== type));
    } else {
      setOwnedTypes([...ownedTypes, type]);
    }
  };

  const selectAll = () => {
    if (activeTab === 'genres') {
      setOwnedGenres([...ALL_GENRES]);
    } else {
      setOwnedTypes([...ALL_TYPES]);
    }
  };

  const clearAll = () => {
    if (activeTab === 'genres') {
      setOwnedGenres([]);
    } else {
      setOwnedTypes([]);
    }
  };

  const filteredItems = useMemo(() => {
    const items = activeTab === 'genres' ? ALL_GENRES : ALL_TYPES;
    if (!searchQuery) return items;
    return items.filter(item => 
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-indigo-500" />
              Inventory
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Check off the items you've unlocked in the game.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-zinc-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab('genres')}
            className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
              activeTab === 'genres' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Genres ({ownedGenres.length}/{ALL_GENRES.length})
            {activeTab === 'genres' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('types')}
            className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
              activeTab === 'types' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            Types ({ownedTypes.length}/{ALL_TYPES.length})
            {activeTab === 'types' && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>
        </div>

        {/* Actions & Search */}
        <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              {activeTab === 'genres' ? 'Manage Genres' : 'Manage Types'}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={selectAll}
                className="px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Select All
              </button>
              <button 
                onClick={clearAll}
                className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 bg-zinc-50 dark:bg-zinc-950/50">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {activeTab === 'genres' ? (
              filteredItems.map(genre => (
                <label 
                  key={genre}
                  className={`
                    relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
                    ${ownedGenres.includes(genre) 
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 shadow-sm' 
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 opacity-70 hover:opacity-100'}
                  `}
                >
                  <div className={`
                    w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0
                    ${ownedGenres.includes(genre)
                      ? 'bg-indigo-500 border-indigo-500 text-white'
                      : 'border-zinc-300 dark:border-zinc-600 bg-transparent'}
                  `}>
                    {ownedGenres.includes(genre) && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={ownedGenres.includes(genre)}
                    onChange={() => toggleGenre(genre)}
                  />
                  <span className={`text-sm font-medium truncate ${ownedGenres.includes(genre) ? 'text-indigo-900 dark:text-indigo-100' : 'text-zinc-600 dark:text-zinc-400'}`}>
                    {genre}
                  </span>
                </label>
              ))
            ) : (
              filteredItems.map(type => (
                <label 
                  key={type}
                  className={`
                    relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
                    ${ownedTypes.includes(type) 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 shadow-sm' 
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 opacity-70 hover:opacity-100'}
                  `}
                >
                  <div className={`
                    w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0
                    ${ownedTypes.includes(type)
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-zinc-300 dark:border-zinc-600 bg-transparent'}
                  `}>
                    {ownedTypes.includes(type) && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={ownedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                  />
                  <span className={`text-sm font-medium truncate ${ownedTypes.includes(type) ? 'text-emerald-900 dark:text-emerald-100' : 'text-zinc-600 dark:text-zinc-400'}`}>
                    {type}
                  </span>
                </label>
              ))
            )}
            
            {filteredItems.length === 0 && (
              <div className="col-span-full py-8 text-center text-zinc-500 dark:text-zinc-400">
                No items found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
