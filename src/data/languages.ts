import { LanguageMeta, SupportedLanguage } from '../types';

export type { SupportedLanguage, LanguageMeta };

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageMeta> = {
  es: {
    id: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    appTitle: 'Learn Spanish',
    courseTitle: 'Learn Spanish in 30 Days',
    tutorName: 'Sofía',
    tutorRole: 'Native Spanish Conversational Coach',
    tutorAvatar: '👩🏽‍🏫',
    defaultVoice: 'es-ES',
    dialects: [
      { id: 'es-ES', label: 'Spain (Castilian)', flag: '🇪🇸', locale: 'es-ES' },
      { id: 'es-MX', label: 'Mexico / Latin America', flag: '🇲🇽', locale: 'es-MX' },
    ],
    accentColor: '#007AFF',
    cefrRange: 'A1 → B1 Fluency',
    description: 'Master everyday Spanish: travel, conversation, dining, culture, and grammar with confidence.',
  },
  de: {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    appTitle: 'Learn German',
    courseTitle: 'Learn German in 30 Days',
    tutorName: 'Lukas',
    tutorRole: 'Native German Conversational Coach',
    tutorAvatar: '👨🏼‍🏫',
    defaultVoice: 'de-DE',
    dialects: [
      { id: 'de-DE', label: 'Germany (Standard Hochdeutsch)', flag: '🇩🇪', locale: 'de-DE' },
      { id: 'de-AT', label: 'Austria (Österreich)', flag: '🇦🇹', locale: 'de-AT' },
      { id: 'de-CH', label: 'Switzerland (Schweizerdeutsch)', flag: '🇨🇭', locale: 'de-CH' },
    ],
    accentColor: '#E11D48', // Rich rose/crimson or Germany gold
    cefrRange: 'A1 → B1 Fluency',
    description: 'Master practical German: der/die/das, ordering Bier & Brezeln, Deutsche Bahn, work, and modal verbs.',
  },
};
