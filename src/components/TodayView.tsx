import React from 'react';
import { Play, Volume2, Sparkles, CheckCircle2, ChevronRight, MessageSquareHeart, Layers } from 'lucide-react';
import { UserProgress, DayLesson, TabType } from '../types';
import { speakSpanish, playHapticSound } from '../utils/audio';

interface TodayViewProps {
  progress: UserProgress;
  todayLesson: DayLesson;
  onOpenLesson: (day: number) => void;
  onNavigateTab: (tab: TabType) => void;
}

const DAILY_PROVERBS = [
  { es: 'Poco a poco se anda lejos.', en: 'Little by little one walks far.' },
  { es: 'Querer es poder.', en: 'Where there is a will, there is a way.' },
  { es: 'La práctica hace al maestro.', en: 'Practice makes the master.' },
  { es: 'El que lee mucho y anda mucho, ve mucho y sabe mucho.', en: 'He who reads much and walks much, sees much and knows much.' },
  { es: 'Al mal tiempo, buena cara.', en: 'In bad times, put on a brave face.' },
];

export const TodayView: React.FC<TodayViewProps> = ({
  progress,
  todayLesson,
  onOpenLesson,
  onNavigateTab,
}) => {
  const percentComplete = Math.round((progress.completedDays.length / 30) * 100);
  const isCompleted = progress.completedDays.includes(todayLesson.day);
  const proverb = DAILY_PROVERBS[(todayLesson.day - 1) % DAILY_PROVERBS.length];

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('tap');
    speakSpanish(text, { dialect: progress.dialectPreference, rate: progress.speechRate });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-8 space-y-5">
      {/* Top Welcome & Streak Banner */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#007AFF]">
            Acelerador de 30 Días
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Día {todayLesson.day} de 30
          </h1>
        </div>

        {/* Streak Pill */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-xs border ${
          progress.streak > 0
            ? 'bg-gradient-to-r from-amber-500/15 to-orange-500/15 border-amber-500/30'
            : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
        }`}>
          <span className={`text-base ${progress.streak > 0 ? 'animate-pulse' : 'opacity-40 grayscale'}`}>🔥</span>
          <div className="flex flex-col">
            <span className={`text-xs font-bold leading-none ${
              progress.streak > 0 ? 'text-amber-700 dark:text-amber-300' : 'text-slate-500 dark:text-slate-400'
            }`}>
              {progress.streak} {progress.streak === 1 ? 'día' : 'días'}
            </span>
            <span className="text-[9px] text-amber-600/80 dark:text-amber-400/80 font-medium">
              {progress.lastCompletedDate === new Date().toISOString().split('T')[0]
                ? 'Completada hoy'
                : progress.streak > 0
                ? '¡Completa hoy!'
                : 'Inicia tu racha'}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Lesson Card */}
      <div
        onClick={() => onOpenLesson(todayLesson.day)}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#007AFF] via-[#0062D2] to-[#0047A5] text-white p-6 shadow-xl shadow-blue-500/25 cursor-pointer transform transition-all active:scale-[0.98] group"
      >
        {/* Background ambient pattern */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-28 h-28 rounded-full bg-sky-300/15 blur-xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-300" />
              {todayLesson.phaseTitle.split(':')[0]} • {todayLesson.cefr}
            </span>
            <span className="text-xs font-medium text-white/80">
              ⏱️ {todayLesson.durationMinutes} minutos
            </span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white mb-1.5 leading-snug">
            {todayLesson.titleEs}
          </h2>
          <p className="text-sky-100 text-xs font-medium mb-4 line-clamp-2">
            {todayLesson.subtitle}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/15">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" /> Completado
                </span>
              ) : (
                <span className="text-xs font-medium text-sky-100">
                  {todayLesson.vocabulary.length} frases clave + prueba
                </span>
              )}
            </div>

            <button
              onClick={() => onOpenLesson(todayLesson.day)}
              className="inline-flex items-center gap-2 bg-white text-[#007AFF] font-bold text-xs px-4 py-2 rounded-full shadow-md shadow-black/10 group-hover:bg-sky-50 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isCompleted ? 'Repasar Lección' : 'Comenzar Hoy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Milestone Bar */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Progreso Global (Meta 30 Días)
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
                onClick={() => onOpenLesson(milestoneDay)}
                className="flex flex-col items-center gap-1 group"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : isCurrent
                      ? 'ring-2 ring-[#007AFF] bg-blue-50 dark:bg-blue-950/60 text-[#007AFF]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isDone ? '✓' : milestoneDay}
                </div>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">
                  {milestoneDay === 30 ? 'B1 🎓' : `Día ${milestoneDay}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Proverbio / Frase Inspiracional del Día */}
      <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 rounded-2xl p-4 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            Dicho del Día
          </span>
          <p className="text-sm font-bold text-amber-950 dark:text-amber-100 leading-snug">
            "{proverb.es}"
          </p>
          <p className="text-xs text-amber-800/80 dark:text-amber-300/80 italic">
            {proverb.en}
          </p>
        </div>
        <button
          onClick={(e) => handleSpeak(proverb.es, e)}
          className="p-2.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 hover:scale-105 active:scale-95 transition-transform"
          title="Escuchar pronunciación"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigateTab('tutor')}
          className="bg-white dark:bg-[#1c1c1e] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left hover:border-blue-400/50 transition-colors shadow-xs group"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <MessageSquareHeart className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
            Tutor Sofía AI
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Practica conversación real sin presión.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab('flashcards')}
          className="bg-white dark:bg-[#1c1c1e] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left hover:border-blue-400/50 transition-colors shadow-xs group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
            Tarjetas 3D
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Repetición espaciada de 140+ frases.
          </p>
        </button>
      </div>
    </div>
  );
};
