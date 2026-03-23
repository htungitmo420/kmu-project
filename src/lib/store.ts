import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FIOParseResult } from './fio-parser';

export type HistoryEntry = FIOParseResult & {
  timestamp: number;
};

interface AppState {
  history: HistoryEntry[];
  currentResult: HistoryEntry | null;
  addHistory: (entry: FIOParseResult) => void;
  removeHistoryItem: (timestamp: number) => void;
  clearHistory: () => void;
  setCurrentResult: (entry: HistoryEntry | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      history: [],
      currentResult: null,
      addHistory: (entry) =>
        set((state) => {
          // Keep only the last 10 entries and avoid exact consecutive duplicates
          const isDuplicate = state.history.length > 0 && state.history[0].original === entry.original;
          if (isDuplicate) {
            return { currentResult: state.history[0] };
          }

          const newEntry: HistoryEntry = { ...entry, timestamp: Date.now() };
          const newHistory = [newEntry, ...state.history].slice(0, 10);
          return { history: newHistory, currentResult: newEntry };
        }),
      removeHistoryItem: (timestamp) =>
        set((state) => ({
          history: state.history.filter((item) => item.timestamp !== timestamp),
          currentResult: state.currentResult?.timestamp === timestamp ? null : state.currentResult,
        })),
      clearHistory: () => set({ history: [], currentResult: null }),
      setCurrentResult: (entry) => set({ currentResult: entry }),
    }),
    {
      name: 'fio-parser-history', 
      partialize: (state) => ({ history: state.history }), // Don't persist currentResult
    }
  )
);
