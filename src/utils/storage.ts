import { UserProgress, SupportedLanguage, CourseData } from '../types';

const STORAGE_KEY = 'aprende_spanish_ios_progress_v1';

const getTodayString = (): string => new Date().toISOString().split('T')[0];

const DEFAULT_PROGRESS: UserProgress = {
  language: 'es',
  completedDays: [],
  currentDay: 1,
  streak: 0,
  lastActiveDate: getTodayString(),
  lastCompletedDate: undefined,
  masteredVocab: [],
  bookmarkedVocab: ['w1d1_1', 'w1d3_1', 'w4d25_1'],
  quizScores: {},
  totalMinutesPracticed: 0,
  dailyStudyGoalMinutes: 10,
  dailyMinutesToday: 0,
  dailyMinutesDate: getTodayString(),
  dailyMinutesHistory: {},
  dialectPreference: 'es-ES',
  speechRate: 0.9,
  dailyReminderEnabled: true,
  dailyReminderTime: '20:00',
  courses: {
    es: {
      completedDays: [],
      currentDay: 1,
      quizScores: {},
      bookmarkedVocab: ['w1d1_1', 'w1d3_1', 'w4d25_1'],
      masteredVocab: [],
      totalMinutesPracticed: 0,
    },
    de: {
      completedDays: [],
      currentDay: 1,
      quizScores: {},
      bookmarkedVocab: ['g_w1d1_1', 'g_w1d3_1', 'g_w1d7_1'],
      masteredVocab: [],
      totalMinutesPracticed: 0,
    },
  },
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

    // If day changed, reset today's minutes while preserving history
    const isSameDay = parsed.dailyMinutesDate === today;
    const dailyMinutesToday = isSameDay ? (parsed.dailyMinutesToday ?? (parsed.lastCompletedDate === today ? 10 : 0)) : 0;

    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      streak: effectiveStreak,
      lastActiveDate: today,
      dailyMinutesDate: today,
      dailyMinutesToday,
      dailyStudyGoalMinutes: parsed.dailyStudyGoalMinutes || 10,
      dailyMinutesHistory: parsed.dailyMinutesHistory || {},
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

export function switchLanguageInProgress(prev: UserProgress, targetLang: SupportedLanguage): UserProgress {
  if (prev.language === targetLang) return prev;

  const currentCourseSnapshot: CourseData = {
    completedDays: prev.completedDays,
    currentDay: prev.currentDay,
    quizScores: prev.quizScores,
    bookmarkedVocab: prev.bookmarkedVocab,
    masteredVocab: prev.masteredVocab,
    totalMinutesPracticed: prev.totalMinutesPracticed,
  };

  const updatedCourses = {
    ...prev.courses,
    [prev.language]: currentCourseSnapshot,
  };

  const targetCourseData: CourseData = updatedCourses[targetLang] || {
    completedDays: [],
    currentDay: 1,
    quizScores: {},
    bookmarkedVocab: targetLang === 'de' ? ['g_w1d1_1', 'g_w1d3_1', 'g_w1d7_1'] : ['w1d1_1', 'w1d3_1', 'w4d25_1'],
    masteredVocab: [],
    totalMinutesPracticed: 0,
  };

  return {
    ...prev,
    language: targetLang,
    dialectPreference: targetLang === 'de' ? 'de-DE' : 'es-ES',
    completedDays: targetCourseData.completedDays,
    currentDay: targetCourseData.currentDay,
    quizScores: targetCourseData.quizScores,
    bookmarkedVocab: targetCourseData.bookmarkedVocab,
    masteredVocab: targetCourseData.masteredVocab,
    totalMinutesPracticed: targetCourseData.totalMinutesPracticed,
    courses: {
      ...updatedCourses,
      [targetLang]: targetCourseData,
    },
  };
}

export function getTodayStudyMinutes(progress: UserProgress): number {
  const today = getTodayString();
  if (progress.dailyMinutesDate === today) {
    return progress.dailyMinutesToday || 0;
  }
  return 0;
}

export function addStudyMinutes(progress: UserProgress, minutesToAdd: number): UserProgress {
  const today = getTodayString();
  const currentTodayMinutes = progress.dailyMinutesDate === today ? (progress.dailyMinutesToday || 0) : 0;
  const newTodayMinutes = currentTodayMinutes + minutesToAdd;
  const newHistory = {
    ...(progress.dailyMinutesHistory || {}),
    [today]: newTodayMinutes,
  };

  const currentCourse = progress.courses?.[progress.language] || {
    completedDays: progress.completedDays,
    currentDay: progress.currentDay,
    quizScores: progress.quizScores,
    bookmarkedVocab: progress.bookmarkedVocab,
    masteredVocab: progress.masteredVocab,
    totalMinutesPracticed: progress.totalMinutesPracticed,
  };

  return {
    ...progress,
    totalMinutesPracticed: (progress.totalMinutesPracticed || 0) + minutesToAdd,
    dailyMinutesDate: today,
    dailyMinutesToday: newTodayMinutes,
    dailyMinutesHistory: newHistory,
    courses: {
      ...progress.courses,
      [progress.language]: {
        ...currentCourse,
        totalMinutesPracticed: (currentCourse.totalMinutesPracticed || 0) + minutesToAdd,
      },
    },
  };
}


