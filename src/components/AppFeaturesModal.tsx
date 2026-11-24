import React, { useState } from 'react';
import {
  X,
  Globe,
  CalendarCheck,
  Map,
  BookOpen,
  Layers,
  Bot,
  BarChart3,
  Smartphone,
  ChevronRight,
} from 'lucide-react';
import { TabType, UserProgress } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { playHapticSound } from '../utils/audio';

interface AppFeaturesModalProps {
  progress: UserProgress;
  onClose: () => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenLesson: (day: number) => void;
}

type FeatureCategory = 'all' | 'learn' | 'practice' | 'tools';

interface FeatureGuideItem {
  id: string;
  category: Exclude<FeatureCategory, 'all'>;
  number: string;
  title: string;
  meta: string;
  summary: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
  iconStyle: string;
  actionLabel?: string;
  actionType?: 'tab' | 'lesson';
  targetTab?: TabType;
}

export const AppFeaturesModal: React.FC<AppFeaturesModalProps> = ({
  progress,
  onClose,
  onNavigateTab,
  onOpenLesson,
}) => {
  const [activeFilter, setActiveFilter] = useState<FeatureCategory>('all');
  const currentLang = SUPPORTED_LANGUAGES[progress.language] || SUPPORTED_LANGUAGES.es;

  const features: FeatureGuideItem[] = [
    {
      id: 'multi-language',
      category: 'learn',
      number: '01',
      title: 'Spanish & German 30-Day Tracks',
      meta: 'English Interface · Independent Progress',
      summary:
        'Built specifically for English speakers. Switch between Learn Spanish and Learn German at any time without losing your place.',
      highlights: [
        'All controls, grammar notes, and lesson headings in clear English',
        'Separate saved progress, quiz scores, and flashcards per language',
        'Global daily streak shared across both tracks',
      ],
      icon: Globe,
      iconStyle: 'bg-blue-500/12 text-[#007AFF]',
      actionLabel: 'Switch Track',
      actionType: 'tab',
      targetTab: 'profile',
    },
    {
      id: 'daily-dashboard',
      category: 'learn',
      number: '02',
      title: 'Daily Learning Dashboard',
      meta: 'Today Tab · Milestones & Proverbs',
      summary:
        'Start every session with your current day card, milestone progress bar, and a native proverb with audio.',
      highlights: [
        'Hero lesson card showing CEFR level (A1 to B1) and study time',
        'Quick-jump milestone ribbon for Days 1, 7, 14, 21, and 30',
        'Daily proverb with native pronunciation and English translation',
      ],
      icon: CalendarCheck,
      iconStyle: 'bg-indigo-500/12 text-indigo-600 dark:text-indigo-400',
      actionLabel: 'Open Today',
      actionType: 'tab',
      targetTab: 'today',
    },
    {
      id: 'roadmap',
      category: 'learn',
      number: '03',
      title: '30-Day Curriculum Roadmap',
      meta: '30 Days Tab · 4 Structured Weeks',
      summary:
        'Follow a clear four-week journey from first-day survival phrases to B1 conversational fluency.',
      highlights: [
        'Week 1 (A1 Survival) through Week 4 (B1 Fluency & Graduation)',
        'Completion tracking, milestone markers, and best quiz scores per day',
        'Open any lesson in any week whenever you want to review or jump ahead',
      ],
      icon: Map,
      iconStyle: 'bg-sky-500/12 text-sky-600 dark:text-sky-400',
      actionLabel: 'View Plan',
      actionType: 'tab',
      targetTab: 'curriculum',
    },
    {
      id: 'interactive-lessons',
      category: 'learn',
      number: '04',
      title: '4-Step Interactive Lessons',
      meta: `Day ${progress.currentDay} · Vocab, Grammar, Dialogue, Quiz`,
      summary:
        'Every daily lesson combines four focused micro-steps designed to be completed in about 10 minutes.',
      highlights: [
        'Core vocabulary with phonetic guides, native tips, audio, and starring',
        'Express grammar rules with real-world audio examples',
        'Native two-way dialogues followed by an instant-feedback quiz',
      ],
      icon: BookOpen,
      iconStyle: 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400',
      actionLabel: `Start Day ${progress.currentDay}`,
      actionType: 'lesson',
    },
    {
      id: 'flashcards',
      category: 'practice',
      number: '05',
      title: '3D Spaced-Repetition Flashcards',
      meta: 'Cards Tab · 150+ Native Phrases',
      summary:
        'Reinforce long-term memory with tactile 3D flip cards featuring context sentences and native audio on both sides.',
      highlights: [
        'Filter decks by Current Day, All Vocabulary, or Starred Favorites',
        'Mark phrases as mastered ("I Got It!") or queue to review later',
        'Tap anywhere to flip between target phrase and English meaning',
      ],
      icon: Layers,
      iconStyle: 'bg-teal-500/12 text-teal-600 dark:text-teal-400',
      actionLabel: 'Practice Cards',
      actionType: 'tab',
      targetTab: 'flashcards',
    },
    {
      id: 'ai-tutor',
      category: 'practice',
      number: '06',
      title: 'AI Conversational Tutor',
      meta: `AI Tutor Tab · ${currentLang.tutorName} (${currentLang.name})`,
      summary:
        'Practice real conversations without pressure with Sofía (Spanish) or Lukas (German), tailored to your current day.',
      highlights: [
        'Natural target-language replies with English translations shown below',
        'Gentle grammar, gender, and word-order feedback on your sentences',
        'Voice microphone input, automatic audio replies, and starter topics',
      ],
      icon: Bot,
      iconStyle: 'bg-purple-500/12 text-purple-600 dark:text-purple-400',
      actionLabel: `Chat with ${currentLang.tutorName}`,
      actionType: 'tab',
      targetTab: 'tutor',
    },
    {
      id: 'goals-analytics',
      category: 'tools',
      number: '07',
      title: 'Daily Study Goals, Analytics & Certificate',
      meta: 'Stats Tab · Progress & Settings',
      summary:
        'Stay consistent with customizable minute targets, interactive progress charts, dialect controls, and a B1 diploma.',
      highlights: [
        'Set 5m, 10m, 15m, or 20m daily goals and track today’s completion bar',
        '30-day cumulative progress curve and weekly study breakdown charts',
        'Regional dialect selector, speech speed slider (0.7x–1.1x), and B1 certificate',
      ],
      icon: BarChart3,
      iconStyle: 'bg-amber-500/12 text-amber-600 dark:text-amber-400',
      actionLabel: 'Open Stats',
      actionType: 'tab',
      targetTab: 'profile',
    },
    {
      id: 'pwa-offline',
      category: 'tools',
      number: '08',
      title: 'Streaks, Reminders & Offline PWA',
      meta: 'iPhone & Tablet Ready · Works Offline',
      summary:
        'Install Lingua30 directly on your Home Screen for fullscreen practice, streak protection, and offline lesson access.',
      highlights: [
        'Daily streak tracker with Dynamic Island status and streak details',
        'Customizable daily study reminder notifications (default 8:00 PM)',
        'Offline caching banner and camera-ready QR code for mobile setup',
      ],
      icon: Smartphone,
      iconStyle: 'bg-slate-500/12 text-slate-700 dark:text-slate-300',
    },
  ];

  const filteredFeatures =
    activeFilter === 'all'
      ? features
      : features.filter((item) => item.category === activeFilter);

  const handleFeatureAction = (item: FeatureGuideItem) => {
    playHapticSound('tap');
    onClose();
    if (item.actionType === 'lesson') {
      onOpenLesson(progress.currentDay);
    } else if (item.actionType === 'tab' && item.targetTab) {
      onNavigateTab(item.targetTab);
    }
  };

  return (
    <div
      id="app-features-modal-backdrop"
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => {
        playHapticSound('tap');
        onClose();
      }}
    >
      <div
        id="app-features-modal-sheet"
        className="bg-[#F2F2F7] dark:bg-[#121318] w-full max-w-lg mx-auto h-[90dvh] max-h-[90dvh] rounded-t-[32px] flex flex-col overflow-hidden shadow-2xl border-t border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle & Header */}
        <div className="pt-3 pb-3 px-5 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-[#1c1c1e]/85 backdrop-blur-md">
          <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3" />

          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold text-[#007AFF]">
                Lingua30 Guide · 8 Core Capabilities
              </p>
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-snug">
                App Features & How It Works
              </h2>
            </div>

            <button
              id="close-features-guide-btn"
              onClick={() => {
                playHapticSound('tap');
                onClose();
              }}
              className="min-w-[44px] min-h-[44px] -mr-2 -mt-1 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close features guide"
            >
              <span className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800 flex items-center justify-center">
                <X className="w-4 h-4 stroke-[2.5]" />
              </span>
            </button>
          </div>

          {/* Interactive Category Filter */}
          <div
            role="tablist"
            aria-label="Filter app features"
            className="grid grid-cols-4 gap-1 mt-3 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl select-none"
          >
            {[
              { id: 'all' as FeatureCategory, label: 'All (8)' },
              { id: 'learn' as FeatureCategory, label: 'Learn' },
              { id: 'practice' as FeatureCategory, label: 'Practice' },
              { id: 'tools' as FeatureCategory, label: 'Tools' },
            ].map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`features-filter-${tab.id}-btn`}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    playHapticSound('tap');
                    setActiveFilter(tab.id);
                  }}
                  className={`min-h-[36px] px-2 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#2c2c2e] text-[#007AFF] shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Feature List */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-4">
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/90 overflow-hidden shadow-2xs">
            {filteredFeatures.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${item.iconStyle}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          <span className="font-mono tabular-nums text-slate-400 dark:text-slate-500 mr-1.5">
                            {item.number}.
                          </span>
                          {item.meta}
                        </p>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-[52px]">
                    {item.summary}
                  </p>

                  <ul className="space-y-1 pl-[52px] text-[11px] text-slate-500 dark:text-slate-400">
                    {item.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-snug">
                        <span
                          aria-hidden="true"
                          className="text-[#007AFF] font-bold select-none"
                        >
                          ·
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {item.actionLabel && (
                    <div className="pl-[52px] pt-1">
                      <button
                        id={`feature-try-${item.id}-btn`}
                        onClick={() => handleFeatureAction(item)}
                        className="inline-flex items-center gap-1 min-h-[36px] px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-xs font-bold text-[#007AFF] transition-colors whitespace-nowrap cursor-pointer active:scale-[0.98]"
                      >
                        <span>{item.actionLabel}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky Bottom CTA */}
        <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shrink-0 bg-white/90 dark:bg-[#1c1c1e]/90 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800">
          <button
            id="done-features-guide-btn"
            onClick={() => {
              playHapticSound('tap');
              onClose();
            }}
            className="w-full min-h-[44px] py-3 px-4 rounded-2xl bg-[#007AFF] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-colors cursor-pointer active:scale-[0.99]"
          >
            Back to Learning
          </button>
        </div>
      </div>
    </div>
  );
};
