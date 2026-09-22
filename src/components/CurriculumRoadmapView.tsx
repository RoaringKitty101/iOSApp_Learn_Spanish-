import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Sparkles, Trophy, BookOpen, Clock } from 'lucide-react';
import { UserProgress, DayLesson } from '../types';
import { CURRICULUM_PHASES, allCurriculumLessons } from '../data/curriculum';
import { playHapticSound } from '../utils/audio';

interface CurriculumRoadmapViewProps {
  progress: UserProgress;
  onOpenLesson: (day: number) => void;
}

export const CurriculumRoadmapView: React.FC<CurriculumRoadmapViewProps> = ({
  progress,
  onOpenLesson,
}) => {
  const [activeWeek, setActiveWeek] = useState<number>(1);

  const handleDayClick = (dayNumber: number) => {
    playHapticSound('tap');
    onOpenLesson(dayNumber);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-8 space-y-4">
      {/* View Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#007AFF]">
          Ruta de Aprendizaje
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Plan de 30 Días
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Estructura progresiva desde principiante (A1) hasta conversación fluida (B1).
        </p>
      </div>

      {/* Week Selector Chips (iOS Segmented Style) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl select-none">
        {CURRICULUM_PHASES.map((phase) => {
          const isSelected = activeWeek === phase.week;
          const weekLessons = allCurriculumLessons.filter((l) => l.week === phase.week);
          const completedInWeek = weekLessons.filter((l) => progress.completedDays.includes(l.day)).length;

          return (
            <button
              key={phase.week}
              onClick={() => {
                playHapticSound('tap');
                setActiveWeek(phase.week);
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                isSelected
                  ? 'bg-white dark:bg-[#1c1c1e] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <span>Sem. {phase.week}</span>
              <span className="block text-[9px] font-normal opacity-70">
                {completedInWeek}/{weekLessons.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Week Detailed Phase Banner */}
      {(() => {
        const phase = CURRICULUM_PHASES.find((p) => p.week === activeWeek) || CURRICULUM_PHASES[0];
        const weekLessons = allCurriculumLessons.filter((l) => l.week === phase.week);

        return (
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400">
                  {phase.daysRange} • Nivel {phase.cefr}
                </span>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-slate-200">
                  Semana {phase.week}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-white">{phase.titleEs}</h2>
              <p className="text-xs text-slate-300 mt-1">{phase.description}</p>
            </div>

            {/* List of Days in this Week */}
            <div className="space-y-2.5">
              {weekLessons.map((lesson: DayLesson) => {
                const isCompleted = progress.completedDays.includes(lesson.day);
                const isCurrent = progress.currentDay === lesson.day;
                const score = progress.quizScores[lesson.day];

                return (
                  <div
                    key={lesson.day}
                    onClick={() => handleDayClick(lesson.day)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99] ${
                      isCurrent
                        ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-400 dark:border-blue-700 shadow-xs'
                        : isCompleted
                        ? 'bg-white dark:bg-[#1c1c1e] border-slate-200/80 dark:border-slate-800'
                        : 'bg-white/60 dark:bg-[#1c1c1e]/60 border-slate-200/60 dark:border-slate-800/60 opacity-90'
                    }`}
                  >
                    {/* Left Day Badge */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm transition-transform group-hover:scale-105 ${
                          isCompleted
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : isCurrent
                            ? 'bg-[#007AFF] text-white shadow-md shadow-blue-500/20'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-white stroke-[2.5]" />
                        ) : lesson.day === 30 ? (
                          <Trophy className="w-5 h-5 text-amber-400" />
                        ) : (
                          lesson.day
                        )}
                      </div>

                      {/* Day Metadata */}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            Día {lesson.day}
                          </span>
                          <span className="text-[10px] text-slate-300 dark:text-slate-600">•</span>
                          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" /> {lesson.durationMinutes}m
                          </span>
                          {lesson.category === 'Milestone' && (
                            <span className="text-[9px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold px-1.5 rounded">
                              Hito
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
                          {lesson.titleEs}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {lesson.titleEn}
                        </p>
                      </div>
                    </div>

                    {/* Right Action / Score */}
                    <div className="flex items-center gap-2">
                      {score !== undefined && (
                        <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          {score}%
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
};
