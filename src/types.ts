export type TabType = 'today' | 'curriculum' | 'flashcards' | 'tutor' | 'profile';

export type CEFRLevel = 'A1' | 'A2' | 'B1';

export type SupportedLanguage = 'es' | 'de';

export interface LanguageMeta {
  id: SupportedLanguage;
  name: string; // "Spanish" | "German"
  nativeName: string; // "Español" | "Deutsch"
  flag: string; // "🇪🇸" | "🇩🇪"
  appTitle: string; // "Aprende" | "Lerne"
  courseTitle: string; // "Spanish in 30 Days" | "German in 30 Days"
  tutorName: string; // "Sofía" | "Lukas"
  tutorRole: string; // "Madrid / LatAm Native Tutor" | "Berlin Native Coach"
  tutorAvatar: string;
  defaultVoice: string; // 'es-ES' | 'de-DE'
  dialects: { id: string; label: string; flag: string; locale: string }[];
  accentColor: string; // '#007AFF' | '#FF9500' or '#E11D48'
  cefrRange: string;
  description: string;
}

export interface VocabularyItem {
  id: string;
  target?: string;
  en: string;
  phonetic: string;
  category?: string;
  exampleTarget?: string;
  exampleEn: string;
  tip?: string;
  // Language-specific fields:
  es?: string;
  de?: string;
  exampleEs?: string;
  exampleDe?: string;
}

export interface GrammarExample {
  target?: string;
  en: string;
  highlight?: string;
  es?: string;
  de?: string;
}

export interface GrammarBite {
  title: string;
  rule: string;
  examples: GrammarExample[];
  proTip?: string;
}

export interface DialogueLine {
  id: string;
  speaker: string;
  role: 'user' | 'native';
  avatar: string;
  textTarget?: string;
  textEn: string;
  es?: string;
  de?: string;
  textEs?: string;
  textDe?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'listen-select' | 'translate';
  audioPhrase?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DayLesson {
  day: number;
  week: number;
  phaseTitle: string;
  titleTarget?: string;
  titleEn: string;
  subtitle: string;
  category: 'Survival' | 'Conversation' | 'Grammar' | 'Culture' | 'Milestone';
  cefr: CEFRLevel;
  durationMinutes: number;
  iconName: string;
  summary: string;
  vocabulary: VocabularyItem[];
  grammar: GrammarBite;
  dialogue: DialogueLine[];
  quiz: QuizQuestion[];
  titleEs?: string;
  titleDe?: string;
}

export interface CourseData {
  completedDays: number[];
  currentDay: number;
  quizScores: Record<number, number>;
  bookmarkedVocab: string[];
  masteredVocab: string[];
  totalMinutesPracticed: number;
}

export interface UserProgress {
  language: SupportedLanguage;
  completedDays: number[];
  currentDay: number;
  streak: number;
  lastActiveDate: string;
  lastCompletedDate?: string;
  masteredVocab: string[];
  bookmarkedVocab: string[];
  quizScores: Record<number, number>; // day -> score percent
  totalMinutesPracticed: number;
  dailyStudyGoalMinutes?: number; // e.g. 5, 10, 15, 20 (default 10)
  dailyMinutesToday?: number; // minutes studied today
  dailyMinutesDate?: string; // YYYY-MM-DD
  dailyMinutesHistory?: Record<string, number>; // date -> minutes
  dialectPreference: string;
  speechRate: number; // 0.8 to 1.2
  dailyReminderEnabled?: boolean;
  dailyReminderTime?: string; // 'HH:MM' (default '20:00' for 8 PM)
  theme?: 'light' | 'dark';
  courses?: Partial<Record<SupportedLanguage, CourseData>>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  translation?: string;
  grammarFeedback?: string;
  timestamp: number;
}

