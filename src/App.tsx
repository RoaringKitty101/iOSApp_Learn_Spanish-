import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { TabType, UserProgress, DayLesson } from './types';
import { loadUserProgress, saveUserProgress, resetUserProgress } from './utils/storage';
import { getLessonByDay, allCurriculumLessons } from './data/curriculum';
import { IOSStatusBar } from './components/IOSStatusBar';
import { IOSTabBar } from './components/IOSTabBar';
import { TodayView } from './components/TodayView';
import { CurriculumRoadmapView } from './components/CurriculumRoadmapView';
import { FlashcardsView } from './components/FlashcardsView';
import { AITutorView } from './components/AITutorView';
import { ProfileView } from './components/ProfileView';
import { LessonDetailModal } from './components/LessonDetailModal';
import { playHapticSound } from './utils/audio';

export function App() {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [activeLessonDay, setActiveLessonDay] = useState<number | null>(null);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  // Sync progress changes to localStorage
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  const currentDayLesson: DayLesson = getLessonByDay(progress.currentDay);

  const handleOpenLesson = (dayNumber: number) => {
    setActiveLessonDay(dayNumber);
  };

  const handleCompleteLesson = (dayNumber: number, scorePercent: number) => {
    setProgress((prev) => {
      const alreadyCompleted = prev.completedDays.includes(dayNumber);
      const newCompleted = alreadyCompleted
        ? prev.completedDays
        : [...prev.completedDays, dayNumber].sort((a, b) => a - b);

      // Advance current day if we completed the current one up to day 30
      const nextDay = dayNumber === prev.currentDay && dayNumber < 30 ? dayNumber + 1 : prev.currentDay;

      return {
        ...prev,
        completedDays: newCompleted,
        currentDay: nextDay,
        quizScores: {
          ...prev.quizScores,
          [dayNumber]: Math.max(prev.quizScores[dayNumber] || 0, scorePercent),
        },
        totalMinutesPracticed: prev.totalMinutesPracticed + 10,
      };
    });
  };

  const handleToggleBookmark = (vocabId: string) => {
    playHapticSound('tap');
    setProgress((prev) => {
      const exists = prev.bookmarkedVocab.includes(vocabId);
      return {
        ...prev,
        bookmarkedVocab: exists
          ? prev.bookmarkedVocab.filter((id) => id !== vocabId)
          : [...prev.bookmarkedVocab, vocabId],
      };
    });
  };

  const handleMarkMastered = (vocabId: string) => {
    setProgress((prev) => {
      if (prev.masteredVocab.includes(vocabId)) return prev;
      return {
        ...prev,
        masteredVocab: [...prev.masteredVocab, vocabId],
      };
    });
  };

  const handleUpdateProgress = (newValues: Partial<UserProgress>) => {
    setProgress((prev) => ({ ...prev, ...newValues }));
  };

  const handleResetProgress = () => {
    const res = resetUserProgress();
    setProgress(res);
    setActiveTab('today');
  };

  return (
    <div className="min-h-screen bg-[#E5E5EA] dark:bg-[#0c0d12] flex flex-col items-center justify-center p-0 sm:p-4 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#007AFF] selection:text-white">
      {/* Top Device View Mode Switcher (visible on desktop) */}
      <header className="hidden sm:flex items-center justify-between w-full max-w-sm mb-2 px-2 text-xs font-semibold text-slate-500 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Aprende: Español iOS</span>
        </div>
        <button
          onClick={() => setIsPhoneFrame(!isPhoneFrame)}
          className="flex items-center gap-1.5 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-300 dark:border-slate-700 transition-colors shadow-2xs"
        >
          {isPhoneFrame ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>Pantalla Completa</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>Chasis iPhone</span>
            </>
          )}
        </button>
      </header>

      {/* Main Container (iPhone Chassis or Fluid) */}
      <div
        className={`w-full transition-all duration-300 flex flex-col overflow-hidden bg-[#F2F2F7] dark:bg-[#121318] ${
          isPhoneFrame
            ? 'sm:max-w-[400px] sm:h-[844px] sm:rounded-[52px] sm:border-[10px] sm:border-slate-900 sm:dark:border-[#2c2d33] sm:shadow-2xl sm:shadow-black/35 relative'
            : 'max-w-2xl h-screen sm:h-[90vh] sm:rounded-3xl sm:border border-slate-300 dark:border-slate-800 shadow-xl'
        }`}
      >
        {/* iOS Status Bar with Dynamic Island */}
        <IOSStatusBar
          currentDay={progress.currentDay}
          streak={progress.streak}
        />

        {/* Content View Switching */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {activeTab === 'today' && (
            <TodayView
              progress={progress}
              todayLesson={currentDayLesson}
              onOpenLesson={handleOpenLesson}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'curriculum' && (
            <CurriculumRoadmapView
              progress={progress}
              onOpenLesson={handleOpenLesson}
            />
          )}

          {activeTab === 'flashcards' && (
            <FlashcardsView
              progress={progress}
              onToggleBookmark={handleToggleBookmark}
              onMarkMastered={handleMarkMastered}
            />
          )}

          {activeTab === 'tutor' && (
            <AITutorView progress={progress} />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onResetProgress={handleResetProgress}
            />
          )}
        </main>

        {/* iOS Frosted Glass Tab Bar */}
        <IOSTabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          uncompletedCardsCount={30 - progress.completedDays.length}
        />

        {/* Active Lesson Modal */}
        {activeLessonDay !== null && (
          <LessonDetailModal
            lesson={getLessonByDay(activeLessonDay)}
            progress={progress}
            onClose={() => setActiveLessonDay(null)}
            onCompleteLesson={handleCompleteLesson}
            onToggleBookmark={handleToggleBookmark}
          />
        )}
      </div>
    </div>
  );
}

export default App;
