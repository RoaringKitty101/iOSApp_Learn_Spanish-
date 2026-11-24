import React from 'react';
import { Play, Volume2, Sparkles, CheckCircle2, ChevronRight, MessageSquareHeart, Layers, Target, HelpCircle } from 'lucide-react';
import { UserProgress, DayLesson, TabType, SupportedLanguage } from '../types';
import { speakText, playHapticSound } from '../utils/audio';
import { getLessonTitle } from '../utils/langHelper';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { LanguageSelector } from './LanguageSelector';

interface TodayViewProps {
  progress: UserProgress;
  todayLesson: DayLesson;
  onOpenLesson: (day: number) => void;
  onNavigateTab: (tab: TabType) => void;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onOpenFeaturesGuide?: () => void;
}

const SPANISH_PROVERBS = [
  { target: 'Poco a poco se anda lejos.', en: 'Little by little one travels far.' },
  { target: 'Querer es poder.', en: 'Where there is a will, there is a way.' },
  { target: 'La práctica hace al maestro.', en: 'Practice makes perfect.' },
  { target: 'El que lee mucho y anda mucho, ve mucho y sabe mucho.', en: 'He who reads and travels much, sees and knows much.' },
  { target: 'Al mal tiempo, buena cara.', en: 'In bad times, keep a brave and hopeful spirit.' },
];

const GERMAN_PROVERBS = [
  { target: 'Übung macht den Meister.', en: 'Practice makes perfect (Practice makes the master).' },
  { target: 'Aller Anfang ist schwer.', en: 'Every beginning is difficult.' },
  { target: 'Morgenstund hat Gold im Mund.', en: 'The early bird catches the worm.' },
  { target: 'Wer rastet, der rostet.', en: 'If you rest, you rust.' },
  { target: 'Ende gut, alles gut.', en: 'All\'s well that ends well.' },
];

export const TodayView: React.FC<TodayViewProps> = ({
  progress,
  todayLesson,
  onOpenLesson,
  onNavigateTab,
  onSelectLanguage,
  onOpenFeaturesGuide,
}) => {
  const percentComplete = Math.round((progress.completedDays.length / 30) * 100);
  const isCompleted = progress.completedDays.includes(todayLesson.day);
  const currentLang = SUPPORTED_LANGUAGES[progress.language] || SUPPORTED_LANGUAGES.es;

  const proverbList = progress.language === 'de' ? GERMAN_PROVERBS : SPANISH_PROVERBS;
  const proverb = proverbList[(todayLesson.day - 1) % proverbList.length];

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('tap');
    speakText(text, {
      lang: progress.language,
      dialect: progress.dialectPreference,
      rate: progress.speechRate,
    });
  };

  const lessonTitle = getLessonTitle(todayLesson, progress.language);

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-8 space-y-5">
      {/* Top Welcome & Language Selection Bar */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#007AFF]">
              30-Day Accelerator
            </span>
            {/* Embedded Language Switcher Pill */}
            <LanguageSelector
              progress={progress}
              onSelectLanguage={onSelectLanguage}
              variant="pill"
            />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Day {todayLesson.day} of 30
          </h1>
        </div>

        {/* Right Actions: Features Guide Info Button + Streak Pill */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenFeaturesGuide && (
            <button
              id="today-open-features-guide-btn"
              onClick={() => {
                playHapticSound('tap');
                onOpenFeaturesGuide();
              }}
              className="w-10 h-10 rounded-full bg-white dark:bg-[#1c1c1e] border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#007AFF] hover:border-[#007AFF]/40 flex items-center justify-center shadow-2xs transition-colors cursor-pointer active:scale-95"
              title="App Features & Guide"
              aria-label="Open App Features and Guide"
            >
              <HelpCircle className="w-4.5 h-4.5" />
            </button>
          )}

          {/* Streak Pill */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-2xs border shrink-0 ${
              progress.streak > 0
                ? 'bg-gradient-to-r from-amber-500/15 to-orange-500/15 border-amber-500/30'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
            }`}
          >
            <span className={`text-base ${progress.streak > 0 ? 'animate-pulse' : 'opacity-40 grayscale'}`}>
              🔥
            </span>
            <div className="flex flex-col">
              <span
                className={`text-xs font-bold leading-none ${
                  progress.streak > 0
                    ? 'text-amber-700 dark:text-amber-300'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {progress.streak} {progress.streak === 1 ? 'day' : 'days'}
              </span>
              <span className="text-[9px] text-amber-600/80 dark:text-amber-400/80 font-medium">
                {progress.lastCompletedDate === new Date().toISOString().split('T')[0]
                  ? 'Completed today'
                  : progress.streak > 0
                  ? 'Complete today!'
                  : 'Start your streak'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Lesson Card */}
      <div
        id="today-hero-lesson-card"
        onClick={() => onOpenLesson(todayLesson.day)}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#007AFF] via-[#0062D2] to-[#0047A5] text-white p-6 shadow-xl shadow-blue-500/25 cursor-pointer transform transition-all active:scale-[0.98] group"
      >
        {/* Background ambient pattern */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-28 h-28 rounded-full bg-sky-300/15 blur-xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              <span>{currentLang.flag}</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Week {todayLesson.week} • {todayLesson.cefr}</span>
            </span>
            <span className="text-xs font-medium text-white/80">
              ⏱️ {todayLesson.durationMinutes} mins
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white mb-1 leading-snug">
            {todayLesson.titleEn}
          </h2>
          <div className="flex items-center gap-1.5 text-sky-200 text-xs font-semibold mb-2.5">
            <span>{currentLang.flag}</span>
            <span>{lessonTitle}</span>
          </div>
          <p className="text-sky-100 text-xs font-medium mb-4 line-clamp-2">
            {todayLesson.subtitle}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/15">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" /> Completed
                </span>
              ) : (
                <span className="text-xs font-medium text-sky-100">
                  {todayLesson.vocabulary.length} key phrases + quiz
                </span>
              )}
            </div>

            <button
              id="start-today-lesson-btn"
              onClick={() => onOpenLesson(todayLesson.day)}
              className="inline-flex items-center gap-2 bg-white text-[#007AFF] font-bold text-xs px-4 py-2 rounded-full shadow-md shadow-black/10 group-hover:bg-sky-50 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isCompleted ? 'Review Lesson' : 'Start Today'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Milestone Bar */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {currentLang.name} Course Progress (30-Day Goal)
          </span>
          <span className="text-xs font-extrabold text-[#007AFF]">
            {progress.completedDays.length} / 30 ({percentComplete}%)
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(percentComplete, 3)}%` }}
          />
        </div>

        {/* 30 Day Quick Node Ribbon */}
        <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
          {[1, 7, 14, 21, 30].map((milestoneDay) => {
            const isDone = progress.completedDays.includes(milestoneDay);
            const isCurrent = todayLesson.day === milestoneDay;

            return (
              <button
                key={milestoneDay}
                id={`milestone-node-day-${milestoneDay}`}
                onClick={() => onOpenLesson(milestoneDay)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
                title={`Day ${milestoneDay}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : isCurrent
                      ? 'ring-2 ring-[#007AFF] bg-blue-50 dark:bg-blue-950/60 text-[#007AFF]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                  }`}
                >
                  {isDone ? '✓' : milestoneDay}
                </div>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">
                  {milestoneDay === 30 ? 'B1 🎓' : `Day ${milestoneDay}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Daily Study Goal Quick Indicator */}
        {(() => {
          const todayStr = new Date().toISOString().split('T')[0];
          const todayMinutes = progress.dailyMinutesDate === todayStr ? (progress.dailyMinutesToday || 0) : 0;
          const dailyGoal = progress.dailyStudyGoalMinutes || 10;
          const isGoalMet = todayMinutes >= dailyGoal;

          return (
            <div
              id="today-daily-goal-indicator"
              onClick={() => onNavigateTab('profile')}
              className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${
                  isGoalMet
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                    : 'bg-blue-50 dark:bg-blue-950/60 text-[#007AFF]'
                }`}>
                  <Target className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">
                    Daily Goal:
                  </span>
                  <span className="font-bold text-[#007AFF] text-[11px]">
                    {todayMinutes} / {dailyGoal} min
                  </span>
                  {isGoalMet && (
                    <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Met
                    </span>
                  )}
                </div>
              </div>

              <span className="text-[10px] text-slate-400 group-hover:text-[#007AFF] font-medium flex items-center gap-0.5 transition-colors">
                <span>Manage Goal</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          );
        })()}
      </div>

      {/* Quote / Proverb of the Day */}
      <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 rounded-2xl p-4 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{currentLang.flag}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              {currentLang.name} Proverb of the Day
            </span>
          </div>
          <p className="text-sm font-bold text-amber-950 dark:text-amber-100 leading-snug">
            "{proverb.target}"
          </p>
          <p className="text-xs text-amber-800/80 dark:text-amber-300/80 italic">
            {proverb.en}
          </p>
        </div>
        <button
          id="speak-proverb-btn"
          onClick={(e) => handleSpeak(proverb.target, e)}
          className="p-2.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 hover:scale-105 active:scale-95 transition-transform shrink-0"
          title="Listen to native pronunciation"
          aria-label="Listen to pronunciation"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 gap-3">
        <button
          id="nav-to-ai-tutor-btn"
          onClick={() => onNavigateTab('tutor')}
          className="bg-white dark:bg-[#1c1c1e] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left hover:border-blue-400/50 transition-colors shadow-2xs group"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform text-lg">
            {currentLang.tutorAvatar}
          </div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
            {currentLang.tutorName}
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Practice conversational {currentLang.name} without pressure.
          </p>
        </button>

        <button
          id="nav-to-flashcards-btn"
          onClick={() => onNavigateTab('flashcards')}
          className="bg-white dark:bg-[#1c1c1e] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left hover:border-blue-400/50 transition-colors shadow-2xs group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
            3D Flashcards
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Spaced repetition with 150+ {currentLang.name} phrases.
          </p>
        </button>
      </div>
    </div>
  );
};
