import { week1Lessons } from './week1';
import { week2Lessons } from './week2';
import { week3Lessons } from './week3';
import { week4Lessons } from './week4';
import { DayLesson, VocabularyItem } from '../types';

export const allCurriculumLessons: DayLesson[] = [
  ...week1Lessons,
  ...week2Lessons,
  ...week3Lessons,
  ...week4Lessons,
];

export interface PhaseInfo {
  week: number;
  titleEs: string;
  titleEn: string;
  daysRange: string;
  startDay: number;
  endDay: number;
  cefr: string;
  accentColor: string;
  description: string;
}

export const CURRICULUM_PHASES: PhaseInfo[] = [
  {
    week: 1,
    titleEs: 'Supervivencia Esencial',
    titleEn: 'Survival & First Steps',
    daysRange: 'Días 1 - 7',
    startDay: 1,
    endDay: 7,
    cefr: 'A1',
    accentColor: '#007AFF', // iOS System Blue
    description: 'Saludos, números, restaurante, direcciones y hotel.',
  },
  {
    week: 2,
    titleEs: 'Vida Diaria y Fundamentos',
    titleEn: 'Daily Life & Routines',
    daysRange: 'Días 8 - 14',
    startDay: 8,
    endDay: 14,
    cefr: 'A1 / A2',
    accentColor: '#34C759', // iOS System Green
    description: 'Familia, rutina reflexiva, clima, gustar y el hogar.',
  },
  {
    week: 3,
    titleEs: 'Acción, Pasado y Práctica',
    titleEn: 'Action & Narrating the Past',
    daysRange: 'Días 15 - 21',
    startDay: 15,
    endDay: 21,
    cefr: 'A2 / B1',
    accentColor: '#FF9500', // iOS System Orange
    description: 'Pretérito, imperfecto, futuro cercano, salud y opiniones.',
  },
  {
    week: 4,
    titleEs: 'Fluidez Real y Graduación',
    titleEn: 'Fluency & Native Mastery',
    daysRange: 'Días 22 - 30',
    startDay: 22,
    endDay: 30,
    cefr: 'B1',
    accentColor: '#AF52DE', // iOS System Purple
    description: 'Conectores, modismos, emergencias, dialectos y graduación.',
  },
];

export function getLessonByDay(day: number): DayLesson {
  const found = allCurriculumLessons.find((l) => l.day === day);
  return found || allCurriculumLessons[0];
}

export interface DayVocabularyItem extends VocabularyItem {
  day: number;
  dayTitle: string;
}

export const allCurriculumVocabulary: DayVocabularyItem[] = allCurriculumLessons.flatMap((lesson) =>
  lesson.vocabulary.map((vocab) => ({
    ...vocab,
    day: lesson.day,
    dayTitle: lesson.titleEs,
  }))
);
