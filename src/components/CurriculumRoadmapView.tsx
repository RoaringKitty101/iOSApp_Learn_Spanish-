import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Trophy, Clock } from 'lucide-react';
import { UserProgress, DayLesson, SupportedLanguage } from '../types';
import { getCurriculumPhases, getCurriculumLessons } from '../data/curriculum';
import { playHapticSound } from '../utils/audio';
import { getLessonTitle } from '../utils/langHelper';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { LanguageSelector } from './LanguageSelector';

interface CurriculumRoadmapViewProps {
  progress: UserProgress;
  onOpenLesson: (day: number) => void;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

export const CurriculumRoadmapView: React.FC<CurriculumRoadmapViewProps> = ({
  progress,
  onOpenLesson,
  onSelectLanguage,
}) => {
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const currentLang = SUPPORTED_LANGUAGES[progress.language] || SUPPORTED_LANGUAGES.es;
  const curriculumLessons = getCurriculumLessons(progress.language);
  const curriculumPhases = getCurriculumPhases(progress.language);

  const handleDayClick = (dayNumber: number) => {
    playHapticSound('tap');
    onOpenLesson(dayNumber);
  };

  return (
    <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-4 pt-3 pb-8 space-y-4">
      {/* View Header with Language Switcher */}
      <div className="flex items-start justify-between gap-2 min-w-0">
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#007AFF]">
            Learning Roadmap
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {currentLang.name} 30-Day Plan
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Progressive mastery from beginner (A1) to conversational fluency (B1).
          </p>
        </div>

        <LanguageSelector
          progress={progress}
          onSelectLanguage={onSelectLanguage}
          variant="pill"
        />
      </div>

      {/* Week Selector Chips (iOS Segmented Style) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl select-none">
        {curriculumPhases.map((phase) => {
          const isSelected = activeWeek === phase.week;
          const weekLessons = curriculumLessons.filter((l) => l.week === phase.week);
          const completedInWeek = weekLessons.filter((l) => progress.completedDays.includes(l.day)).length;

          return (
            <button
              key={phase.week}
              id={`curriculum-tab-week-${phase.week}`}
              onClick={() => {
                playHapticSound('tap');
                setActiveWeek(phase.week);
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                isSelected
                  ? 'bg-white dark:bg-[#1c1c1e] text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <span>Week {phase.week}</span>
              <span className="block text-[9px] font-normal opacity-70">
                {completedInWeek}/{weekLessons.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Week Detailed Phase Banner */}
      {(() => {
        const phase = curriculumPhases.find((p) => p.week === activeWeek) || curriculumPhases[0];
        const weekLessons = curriculumLessons.filter((l) => l.week === phase.week);
        const targetPhaseTitle = progress.language === 'de' ? (phase.titleDe || phase.titleTarget) : (phase.titleEs || phase.titleTarget);

        return (
          <div className="space-y-3">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400">
                  {phase.daysRange} • Level {phase.cefr}
                </span>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-slate-200">
                  Week {phase.week}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-white">Week {phase.week}: {phase.titleEn}</h2>
              <p className="text-xs text-sky-300 font-semibold mt-0.5 flex items-center gap-1">
                <span>{currentLang.flag}</span>
                <span>{targetPhaseTitle}</span>
              </p>
              <p className="text-xs text-slate-300 mt-1">{phase.description}</p>
            </div>

            {/* List of Days in this Week */}
            <div className="space-y-2.5">
              {weekLessons.map((lesson: DayLesson) => {
                const isCompleted = progress.completedDays.includes(lesson.day);
                const isCurrent = progress.currentDay === lesson.day;
                const score = progress.quizScores[lesson.day];
                const targetTitle = getLessonTitle(lesson, progress.language);

                return (
                  <div
                    key={lesson.day}
                    id={`roadmap-day-card-${lesson.day}`}
                    onClick={() => handleDayClick(lesson.day)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99] ${
                      isCurrent
                        ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-400 dark:border-blue-700 shadow-2xs'
                        : isCompleted
                        ? 'bg-white dark:bg-[#1c1c1e] border-slate-200/80 dark:border-slate-800'
                        : 'bg-white/60 dark:bg-[#1c1c1e]/60 border-slate-200/60 dark:border-slate-800/60 opacity-90'
                    }`}
                  >
                    {/* Left Day Badge */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm transition-transform group-hover:scale-105 shrink-0 ${
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
                            Day {lesson.day}
                          </span>
                          <span className="text-[10px] text-slate-300 dark:text-slate-600">•</span>
                          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" /> {lesson.durationMinutes}m
                          </span>
                          {lesson.category === 'Milestone' && (
                            <span className="text-[9px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold px-1.5 rounded">
                              Milestone
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
                          {lesson.titleEn}
                        </h3>
                        <p className="text-xs font-semibold text-[#007AFF] line-clamp-1 flex items-center gap-1 mt-0.5">
                          <span className="opacity-80">{currentLang.flag}</span>
                          <span>{targetTitle}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right Action / Score */}
                    <div className="flex items-center gap-2 shrink-0">
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
