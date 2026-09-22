export type TabType = 'today' | 'curriculum' | 'flashcards' | 'tutor' | 'profile';

export type CEFRLevel = 'A1' | 'A2' | 'B1';

export interface VocabularyItem {
  id: string;
  es: string;
  en: string;
  phonetic: string;
  category?: string;
  exampleEs: string;
  exampleEn: string;
  tip?: string;
}

export interface GrammarExample {
  es: string;
  en: string;
  highlight?: string;
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
  textEs: string;
  textEn: string;
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
  titleEs: string;
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
}

export interface UserProgress {
  completedDays: number[];
  currentDay: number;
  streak: number;
  lastActiveDate: string;
  lastCompletedDate?: string;
  masteredVocab: string[];
  bookmarkedVocab: string[];
  quizScores: Record<number, number>; // day -> score percent
  totalMinutesPracticed: number;
  dialectPreference: 'es-ES' | 'es-MX';
  speechRate: number; // 0.8 to 1.2
  dailyReminderEnabled?: boolean;
  dailyReminderTime?: string; // 'HH:MM' (default '20:00' for 8 PM)
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  translation?: string;
  grammarFeedback?: string;
  timestamp: number;
}
