import { UserProgress } from '../types';

const STORAGE_KEY = 'aprende_spanish_ios_progress_v1';

const getTodayString = (): string => new Date().toISOString().split('T')[0];

const DEFAULT_PROGRESS: UserProgress = {
  completedDays: [],
  currentDay: 1,
  streak: 0,
  lastActiveDate: getTodayString(),
  lastCompletedDate: undefined,
  masteredVocab: [],
  bookmarkedVocab: ['w1d1_1', 'w1d3_1', 'w4d25_1'],
  quizScores: {},
  totalMinutesPracticed: 0,
  dialectPreference: 'es-ES',
  speechRate: 0.9,
  dailyReminderEnabled: true,
  dailyReminderTime: '20:00',
};

/**
 * Checks if the streak is still valid or has expired due to skipping a day.
 * - Same day as last completion: streak intact.
 * - Completed yesterday: streak intact (pending today's lesson).
 * - Completed 2 or more days ago: user skipped a day -> streak resets to 0.
 */
export function verifyAndCleanStreak(streak: number, lastCompletedDate?: string): number {
  if (!lastCompletedDate || streak <= 0) return 0;

  const today = getTodayString();
  if (lastCompletedDate === today) return streak;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastCompletedDate === yesterdayStr) {
    return streak;
  }

  // Skipped yesterday or longer -> reset streak to 0
  return 0;
}

/**
 * Calculates new streak when a user completes a lesson.
 * - If already completed a lesson today: preserves streak (minimum 1).
 * - If last completed was yesterday: streak increases by 1.
 * - If last completed was before yesterday (skipped day): resets and starts at 1.
 */
export function calculateStreakOnLessonCompletion(
  currentStreak: number,
  lastCompletedDate?: string
): { streak: number; lastCompletedDate: string; streakIncreased: boolean } {
  const today = getTodayString();

  if (lastCompletedDate === today) {
    return {
      streak: Math.max(currentStreak, 1),
      lastCompletedDate: today,
      streakIncreased: false,
    };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastCompletedDate === yesterdayStr) {
    return {
      streak: currentStreak + 1,
      lastCompletedDate: today,
      streakIncreased: true,
    };
  }

  // Skipped a day or brand new user -> resets and starts at 1
  return {
    streak: 1,
    lastCompletedDate: today,
    streakIncreased: true,
  };
}

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);

    const today = getTodayString();
    const effectiveStreak = verifyAndCleanStreak(parsed.streak || 0, parsed.lastCompletedDate);

    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      streak: effectiveStreak,
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
