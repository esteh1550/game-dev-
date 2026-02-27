/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Settings2, Gamepad2 } from 'lucide-react';
import ComboFinder from './components/ComboFinder';
import InventoryModal from './components/InventoryModal';
import BestCombos from './components/BestCombos';

export default function App() {
  // Initialize state from localStorage or empty arrays
  const [ownedGenres, setOwnedGenres] = useState<string[]>(() => {
    const saved = localStorage.getItem('gds_owned_genres');
    return saved ? JSON.parse(saved) : [];
  });

  const [ownedTypes, setOwnedTypes] = useState<string[]>(() => {
    const saved = localStorage.getItem('gds_owned_types');
    return saved ? JSON.parse(saved) : [];
  });

  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('gds_owned_genres', JSON.stringify(ownedGenres));
  }, [ownedGenres]);

  useEffect(() => {
    localStorage.setItem('gds_owned_types', JSON.stringify(ownedTypes));
  }, [ownedTypes]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 flex items-center justify-center transform -rotate-3">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Game Dev Story
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                Combo Finder & Inventory
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsInventoryOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl font-semibold shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
          >
            <Settings2 className="w-5 h-5 text-zinc-500 group-hover:text-indigo-600 dark:text-zinc-400 dark:group-hover:text-indigo-400 transition-colors" />
            <span>Manage Inventory</span>
            <span className="ml-1 px-2 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 rounded-md text-zinc-500 dark:text-zinc-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {ownedGenres.length + ownedTypes.length}
            </span>
          </button>
        </header>

        {/* Main Content */}
        <main className="bg-white dark:bg-zinc-900/50 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-black/20 border border-white/50 dark:border-zinc-800 p-6 sm:p-10 backdrop-blur-xl">
          <ComboFinder 
            ownedGenres={ownedGenres} 
            ownedTypes={ownedTypes}
            openInventory={() => setIsInventoryOpen(true)}
          />
          
          <div className="my-10 border-t border-zinc-100 dark:border-zinc-800"></div>
          
          <BestCombos 
            ownedGenres={ownedGenres} 
            ownedTypes={ownedTypes} 
          />
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-zinc-400 dark:text-zinc-600">
          <p>Unofficial tool for Kairosoft's Game Dev Story.</p>
        </footer>
      </div>

      {/* Inventory Modal */}
      <InventoryModal
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        ownedGenres={ownedGenres}
        setOwnedGenres={setOwnedGenres}
        ownedTypes={ownedTypes}
        setOwnedTypes={setOwnedTypes}
      />
    </div>
  );
}
