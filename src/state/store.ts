import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Settings = {
  sound: boolean;
  music: boolean;
  haptics: boolean;
};

export type LevelResult = {
  stars: number;
  bestTimeMs?: number;
};

type GameState = {
  coins: number;
  results: Record<number, LevelResult>;
  settings: Settings;
  hydrated: boolean;

  completeLevel: (id: number, stars: number, coins: number, timeMs?: number) => void;
  setSetting: (key: keyof Settings, value: boolean) => void;
  resetProgress: () => void;
};

const defaultSettings: Settings = { sound: true, music: true, haptics: true };

export const useGame = create<GameState>()(
  persist(
    (set) => ({
      coins: 0,
      results: {},
      settings: defaultSettings,
      hydrated: false,

      completeLevel: (id, stars, coins, timeMs) =>
        set((s) => {
          const prev = s.results[id];
          const best =
            prev?.bestTimeMs !== undefined && timeMs !== undefined
              ? Math.min(prev.bestTimeMs, timeMs)
              : (timeMs ?? prev?.bestTimeMs);
          return {
            coins: s.coins + coins,
            results: {
              ...s.results,
              [id]: { stars: Math.max(stars, prev?.stars ?? 0), bestTimeMs: best },
            },
          };
        }),

      setSetting: (key, value) => set((s) => ({ settings: { ...s.settings, [key]: value } })),

      resetProgress: () => set({ coins: 0, results: {} }),
    }),
    {
      name: 'phonetidy-save',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ coins, results, settings }) => ({ coins, results, settings }),
      onRehydrateStorage: () => () => useGame.setState({ hydrated: true }),
    },
  ),
);

// Highest level the player may start: one past the furthest completed level.
export function highestUnlocked(results: Record<number, LevelResult>): number {
  const done = Object.keys(results).map(Number);
  return done.length ? Math.max(...done) + 1 : 1;
}
