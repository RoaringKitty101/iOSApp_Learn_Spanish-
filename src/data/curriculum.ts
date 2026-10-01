import { week1Lessons } from './week1';
import { week2Lessons } from './week2';
import { week3Lessons } from './week3';
import { week4Lessons } from './week4';

import { germanWeek1Lessons } from './germanWeek1';
import { germanWeek2Lessons } from './germanWeek2';
import { germanWeek3Lessons } from './germanWeek3';
import { germanWeek4Lessons } from './germanWeek4';

import { DayLesson, VocabularyItem, SupportedLanguage } from '../types';
import { getLessonTitle } from '../utils/langHelper';

export const spanishCurriculumLessons: DayLesson[] = [
  ...week1Lessons,
  ...week2Lessons,
  ...week3Lessons,
  ...week4Lessons,
];

export const germanCurriculumLessons: DayLesson[] = [
  ...germanWeek1Lessons,
  ...germanWeek2Lessons,
  ...germanWeek3Lessons,
  ...germanWeek4Lessons,
];

// Backwards compatibility default
export const allCurriculumLessons: DayLesson[] = spanishCurriculumLessons;

export function getCurriculumLessons(lang: SupportedLanguage = 'es'): DayLesson[] {
  return lang === 'de' ? germanCurriculumLessons : spanishCurriculumLessons;
}

export interface PhaseInfo {
  week: number;
  titleTarget: string;
  titleEn: string;
  titleEs?: string;
  titleDe?: string;
  daysRange: string;
  startDay: number;
  endDay: number;
  cefr: string;
  accentColor: string;
  description: string;
}

export const SPANISH_CURRICULUM_PHASES: PhaseInfo[] = [
  {
    week: 1,
    titleTarget: 'Supervivencia Esencial',
    titleEs: 'Supervivencia Esencial',
    titleEn: 'Survival & First Steps',
    daysRange: 'Days 1 - 7',
    startDay: 1,
    endDay: 7,
    cefr: 'A1',
    accentColor: '#007AFF', // iOS System Blue
    description: 'Greetings, numbers, restaurant ordering, directions, and hotel check-in.',
  },
  {
    week: 2,
    titleTarget: 'Vida Diaria y Fundamentos',
    titleEs: 'Vida Diaria y Fundamentos',
    titleEn: 'Daily Life & Routines',
    daysRange: 'Days 8 - 14',
    startDay: 8,
    endDay: 14,
    cefr: 'A1 / A2',
    accentColor: '#34C759', // iOS System Green
    description: 'Family, reflexive morning routine, weather, likes/dislikes (gustar), and home.',
  },
  {
    week: 3,
    titleTarget: 'Acción, Pasado y Práctica',
    titleEs: 'Acción, Pasado y Práctica',
    titleEn: 'Action & Narrating the Past',
    daysRange: 'Days 15 - 21',
    startDay: 15,
    endDay: 21,
    cefr: 'A2 / B1',
    accentColor: '#FF9500', // iOS System Orange
    description: 'Preterite, imperfect, near future, healthcare, and giving personal opinions.',
  },
  {
    week: 4,
    titleTarget: 'Fluidez Real y Graduación',
    titleEs: 'Fluidez Real y Graduación',
    titleEn: 'Fluency & Native Mastery',
    daysRange: 'Days 22 - 30',
    startDay: 22,
    endDay: 30,
    cefr: 'B1',
    accentColor: '#AF52DE', // iOS System Purple
    description: 'Subjunctive triggers, colloquial idioms, emergencies, dialects, and graduation.',
  },
];

export const GERMAN_CURRICULUM_PHASES: PhaseInfo[] = [
  {
    week: 1,
    titleTarget: 'Überleben & Erste Schritte',
    titleDe: 'Überleben & Erste Schritte',
    titleEn: 'Survival & First Steps',
    daysRange: 'Days 1 - 7',
    startDay: 1,
    endDay: 7,
    cefr: 'A1',
    accentColor: '#007AFF', // iOS System Blue
    description: 'Greetings, numbers, ordering at the bakery/café, directions, hotel, and the V2 word order.',
  },
  {
    week: 2,
    titleTarget: 'Alltag & Fundamente',
    titleDe: 'Alltag & Fundamente',
    titleEn: 'Daily Life & Grammar Foundations',
    daysRange: 'Days 8 - 14',
    startDay: 8,
    endDay: 14,
    cefr: 'A1 / A2',
    accentColor: '#34C759', // iOS System Green
    description: 'Der/Die/Das genders, family, separable verbs, culinary culture, housing, and the accusative case.',
  },
  {
    week: 3,
    titleTarget: 'Aktion, Perfekt & Reisen',
    titleDe: 'Aktion, Perfekt & Reisen',
    titleEn: 'Action, Past Tense & Travel',
    daysRange: 'Days 15 - 21',
    startDay: 15,
    endDay: 21,
    cefr: 'A2',
    accentColor: '#FF9500', // iOS System Orange
    description: 'Modal verbs (können/müssen), spoken Perfekt with haben/sein, Deutsche Bahn train travel, doctor visits, and weather.',
  },
  {
    week: 4,
    titleTarget: 'Fluenz & B1-Graduierung',
    titleDe: 'Fluenz & B1-Graduierung',
    titleEn: 'Fluency & Native Mastery',
    daysRange: 'Days 22 - 30',
    startDay: 22,
    endDay: 30,
    cefr: 'B1',
    accentColor: '#AF52DE', // iOS System Purple
    description: 'Subordinate clauses (weil/dass/obwohl), Berlin nightlife, debates, idioms, Biergarten etiquette, dialects, and B1 graduation.',
  },
];

export const CURRICULUM_PHASES = SPANISH_CURRICULUM_PHASES;

export function getCurriculumPhases(lang: SupportedLanguage = 'es'): PhaseInfo[] {
  return lang === 'de' ? GERMAN_CURRICULUM_PHASES : SPANISH_CURRICULUM_PHASES;
}

export function getLessonByDay(day: number, lang: SupportedLanguage = 'es'): DayLesson {
  const lessons = getCurriculumLessons(lang);
  const found = lessons.find((l) => l.day === day);
  return found || lessons[0];
}

export interface DayVocabularyItem extends VocabularyItem {
  day: number;
  dayTitle: string;
}

export function getAllCurriculumVocabulary(lang: SupportedLanguage = 'es'): DayVocabularyItem[] {
  const lessons = getCurriculumLessons(lang);
  return lessons.flatMap((lesson) =>
    lesson.vocabulary.map((vocab) => ({
      ...vocab,
      day: lesson.day,
      dayTitle: getLessonTitle(lesson, lang),
    }))
  );
}

// Backwards compatibility export
export const allCurriculumVocabulary: DayVocabularyItem[] = getAllCurriculumVocabulary('es');
