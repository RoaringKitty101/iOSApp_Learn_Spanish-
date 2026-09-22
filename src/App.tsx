import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Flame } from 'lucide-react';
import { TabType, UserProgress, DayLesson } from './types';
import { loadUserProgress, saveUserProgress, resetUserProgress, calculateStreakOnLessonCompletion } from './utils/storage';
import { getLessonByDay, allCurriculumLessons } from './data/curriculum';
import { IOSStatusBar } from './components/IOSStatusBar';
import { IOSTabBar } from './components/IOSTabBar';
import { TodayView } from './components/TodayView';
import { CurriculumRoadmapView } from './components/CurriculumRoadmapView';
import { FlashcardsView } from './components/FlashcardsView';
import { AITutorView } from './components/AITutorView';
import { ProfileView } from './components/ProfileView';
import { LessonDetailModal } from './components/LessonDetailModal';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { OfflineIndicator } from './components/OfflineIndicator';
import { DailyReminderToast } from './components/DailyReminderToast';
import { playHapticSound } from './utils/audio';

export function App() {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [activeLessonDay, setActiveLessonDay] = useState<number | null>(null);
  const [testReminderTimestamp, setTestReminderTimestamp] = useState<number | undefined>(undefined);

  // Default to phone frame on desktop, but full edge-to-edge on mobile/iPhone
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 640 || /iphone|ipad|ipod|android/i.test(navigator.userAgent);
      return !isMobile;
    }
    return true;
  });

  // Sync progress changes to localStorage
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  // Service Worker auto-update registration
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration note:', err);
      });
    }
  }, []);

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

      // Calculate streak: increase on lesson completion and track lastCompletedDate
      const streakCalc = calculateStreakOnLessonCompletion(prev.streak, prev.lastCompletedDate);

      return {
        ...prev,
        completedDays: newCompleted,
        currentDay: nextDay,
        streak: streakCalc.streak,
        lastCompletedDate: streakCalc.lastCompletedDate,
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
      {/* Offline Status Badge */}
      <OfflineIndicator />

      {/* Top Device View Mode Switcher (visible on desktop) */}
      <header className="hidden sm:flex items-center justify-between w-full max-w-sm mb-2 px-2 text-xs font-semibold text-slate-500 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Aprende: Web App iOS</span>
          {/* Small Fire Icon Streak in Desktop Header */}
          <div className="flex items-center gap-1 bg-amber-500/15 dark:bg-amber-400/15 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-bold text-[10px] ml-1 shadow-2xs">
            <Flame className={`w-3 h-3 ${progress.streak > 0 ? 'fill-orange-500 text-amber-500 animate-pulse' : 'text-slate-400'}`} />
            <span>{progress.streak} {progress.streak === 1 ? 'día' : 'días'}</span>
          </div>
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

      {/* Main Container (iPhone Chassis or Edge-to-Edge Fluid) */}
      <div
        className={`w-full transition-all duration-300 flex flex-col overflow-hidden bg-[#F2F2F7] dark:bg-[#121318] ${
          isPhoneFrame
            ? 'sm:max-w-[400px] sm:h-[844px] sm:rounded-[52px] sm:border-[10px] sm:border-slate-900 sm:dark:border-[#2c2d33] sm:shadow-2xl sm:shadow-black/35 relative'
            : 'max-w-2xl h-screen sm:h-[90vh] sm:rounded-3xl sm:border border-slate-300 dark:border-slate-800 shadow-xl'
        }`}
      >
        {/* iOS Status Bar with Dynamic Island and Fire Streak in Header */}
        <IOSStatusBar
          currentDay={progress.currentDay}
          streak={progress.streak}
          lastCompletedDate={progress.lastCompletedDate}
        />

        {/* Daily Reminder Push Toast Notification */}
        <DailyReminderToast
          progress={progress}
          onOpenLesson={handleOpenLesson}
          triggerTest={testReminderTimestamp}
        />

        {/* In-App PWA Install & iPhone Access Banner */}
        <PWAInstallBanner />

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
              onTriggerTestReminder={() => setTestReminderTimestamp(Date.now())}
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
