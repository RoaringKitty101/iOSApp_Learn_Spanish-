import { UserProgress } from '../types';

const STORAGE_KEY = 'aprende_spanish_ios_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  completedDays: [],
  currentDay: 1,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  masteredVocab: [],
  bookmarkedVocab: ['w1d1_1', 'w1d3_1', 'w4d25_1'],
  quizScores: {},
  totalMinutesPracticed: 25,
  dialectPreference: 'es-ES',
  speechRate: 0.9,
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);

    // Calculate streak maintenance
    const today = new Date().toISOString().split('T')[0];
    const lastActive = parsed.lastActiveDate || today;

    let updatedStreak = parsed.streak || 1;
    if (lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastActive === yesterdayStr) {
        // Logged in next consecutive day
        updatedStreak += 1;
      } else {
        // Streak reset if missed more than 1 day
        const diffDays = Math.floor((new Date(today).getTime() - new Date(lastActive).getTime()) / (1000 * 3600 * 24));
        if (diffDays > 1) {
          updatedStreak = 1;
        }
      }
    }

    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      streak: updatedStreak,
      lastActiveDate: today,
    };
  } catch (e) {
    console.error('Error loading progress:', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
}

export function resetUserProgress(): UserProgress {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_PROGRESS;
}
