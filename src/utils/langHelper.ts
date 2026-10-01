import { DayLesson, DialogueLine, GrammarExample, VocabularyItem, SupportedLanguage } from '../types';

export function getTargetText(
  item: { target?: string; de?: string; es?: string; titleTarget?: string; titleDe?: string; titleEs?: string; titleEn?: string },
  lang?: SupportedLanguage
): string {
  if (item.titleTarget || item.titleDe || item.titleEs || item.titleEn) {
    if (lang === 'de') return item.titleDe || item.titleTarget || item.titleEs || item.titleEn || '';
    if (lang === 'es') return item.titleEs || item.titleTarget || item.titleDe || item.titleEn || '';
    return item.titleTarget || item.titleDe || item.titleEs || item.titleEn || '';
  }
  if (lang === 'de') {
    return item.de || item.target || item.es || '';
  }
  if (lang === 'es') {
    return item.es || item.target || item.de || '';
  }
  return item.target || item.de || item.es || '';
}

export function getTargetExample(
  item: { exampleTarget?: string; exampleDe?: string; exampleEs?: string },
  lang?: SupportedLanguage
): string {
  if (lang === 'de') {
    return item.exampleDe || item.exampleTarget || item.exampleEs || '';
  }
  if (lang === 'es') {
    return item.exampleEs || item.exampleTarget || item.exampleDe || '';
  }
  return item.exampleTarget || item.exampleDe || item.exampleEs || '';
}

export function getLessonTitle(lesson: DayLesson, lang?: SupportedLanguage): string {
  if (lang === 'de') {
    return lesson.titleDe || lesson.titleTarget || lesson.titleEs || lesson.titleEn;
  }
  if (lang === 'es') {
    return lesson.titleEs || lesson.titleTarget || lesson.titleDe || lesson.titleEn;
  }
  return lesson.titleTarget || lesson.titleDe || lesson.titleEs || lesson.titleEn;
}

export function getDialogueLineText(line: DialogueLine, lang?: SupportedLanguage): string {
  if (lang === 'de') {
    return line.textDe || line.textTarget || line.de || line.textEs || line.es || '';
  }
  if (lang === 'es') {
    return line.textEs || line.textTarget || line.es || line.textDe || line.de || '';
  }
  return line.textTarget || line.textDe || line.textEs || line.de || line.es || '';
}

// Backwards-compatible aliases
export function getVocabTarget(item: VocabularyItem): string {
  return item.target || item.de || item.es || '';
}

export function getVocabExampleTarget(item: VocabularyItem): string {
  return item.exampleTarget || item.exampleDe || item.exampleEs || '';
}

export function getDialogueTextTarget(line: DialogueLine): string {
  return line.textTarget || line.textDe || line.textEs || '';
}

export function getGrammarExampleTarget(ex: GrammarExample): string {
  return ex.target || ex.de || ex.es || '';
}

export function getLessonTitleTarget(lesson: DayLesson): string {
  return lesson.titleTarget || lesson.titleDe || lesson.titleEs || lesson.titleEn;
}
