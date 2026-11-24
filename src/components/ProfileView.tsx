import React, { useState } from 'react';
import { Award, Flame, BookCheck, Volume2, Star, Settings, RotateCcw, Download, CheckCircle, CheckCircle2, Sparkles, Bell, Clock, Globe, Target, Plus, HelpCircle, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProgress, SupportedLanguage } from '../types';
import { getAllCurriculumVocabulary } from '../data/curriculum';
import { speakText, playHapticSound } from '../utils/audio';
import { getTargetText } from '../utils/langHelper';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { LanguageSelector } from './LanguageSelector';
import { StatsSection } from './StatsSection';

interface ProfileViewProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: Partial<UserProgress>) => void;
  onResetProgress: () => void;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onTriggerTestReminder?: () => void;
  onAddStudyMinutes?: (minutes: number) => void;
  onNavigateTab?: (tab: any) => void;
  onOpenFeaturesGuide?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  progress,
  onUpdateProgress,
  onResetProgress,
  onSelectLanguage,
  onTriggerTestReminder,
  onAddStudyMinutes,
  onNavigateTab,
  onOpenFeaturesGuide,
}) => {
  const currentLang = SUPPORTED_LANGUAGES[progress.language] || SUPPORTED_LANGUAGES.es;
  const isGerman = progress.language === 'de';

  const [userName, setUserName] = useState(`${currentLang.name} Learner`);
  const [showCertificate, setShowCertificate] = useState(false);

  const completedCount = progress.completedDays.length;
  const percentComplete = Math.round((completedCount / 30) * 100);

  // CEFR Calculation
  let currentLevel = 'A1 Beginner';
  if (completedCount >= 22) currentLevel = 'B1 Intermediate Fluency';
  else if (completedCount >= 10) currentLevel = 'A2 Elementary';

  const allVocab = getAllCurriculumVocabulary(progress.language);
  const bookmarkedItems = allVocab.filter((v) =>
    progress.bookmarkedVocab.includes(v.id)
  );

  const handleSpeak = (text: string) => {
    playHapticSound('tap');
    speakText(text, {
      lang: progress.language,
      dialect: progress.dialectPreference,
      rate: progress.speechRate,
    });
  };

  const handleOpenCertificate = () => {
    playHapticSound('complete');
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
    });
    setShowCertificate(true);
  };

  // Daily Study Goal and Progress Tracker
  const dailyGoal = progress.dailyStudyGoalMinutes || 10;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayMinutes = progress.dailyMinutesDate === todayStr ? (progress.dailyMinutesToday || 0) : 0;
  const goalPercent = Math.min(100, Math.round((todayMinutes / dailyGoal) * 100));
  const isGoalReached = todayMinutes >= dailyGoal;

  const handleSetDailyGoal = (mins: number) => {
    playHapticSound('tap');
    onUpdateProgress({ dailyStudyGoalMinutes: mins });
  };

  const handleLogFiveMinutes = () => {
    const nextMinutes = todayMinutes + 5;
    const willReach = nextMinutes >= dailyGoal && todayMinutes < dailyGoal;

    if (onAddStudyMinutes) {
      onAddStudyMinutes(5);
    } else {
      const newHistory = {
        ...(progress.dailyMinutesHistory || {}),
        [todayStr]: nextMinutes,
      };
      onUpdateProgress({
        dailyMinutesDate: todayStr,
        dailyMinutesToday: nextMinutes,
        dailyMinutesHistory: newHistory,
        totalMinutesPracticed: (progress.totalMinutesPracticed || 0) + 5,
      });
      playHapticSound('tap');
    }

    if (willReach) {
      playHapticSound('complete');
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.55 },
      });
    }
  };

  const handleResetTodayMinutes = () => {
    playHapticSound('tap');
    const newHistory = {
      ...(progress.dailyMinutesHistory || {}),
      [todayStr]: 0,
    };
    onUpdateProgress({
      dailyMinutesDate: todayStr,
      dailyMinutesToday: 0,
      dailyMinutesHistory: newHistory,
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-8 space-y-4">
      {/* Header Profile card */}
      <div className="bg-white dark:bg-[#1c1c1e] p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 flex-1">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#007AFF] to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-blue-500/25 shrink-0">
            {currentLang.flag}
          </div>
          <div className="flex-1 min-w-0">
            <input
              id="profile-user-name-input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-base font-extrabold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#007AFF] outline-hidden px-0.5 w-full"
              placeholder="Your Name"
            />
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-[11px] font-bold text-[#007AFF] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                {currentLevel}
              </span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                🔥 {progress.streak} {progress.streak === 1 ? 'day' : 'days'}
              </span>
            </div>
          </div>
        </div>

        <LanguageSelector
          progress={progress}
          onSelectLanguage={onSelectLanguage}
          variant="pill"
        />
      </div>

      {/* Language Track Switcher Card */}
      <div className="bg-white dark:bg-[#1c1c1e] p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#007AFF]" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Active Language Track
            </h3>
          </div>
          <span className="text-[10px] font-bold text-slate-400">Switch anytime</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(['de', 'es'] as SupportedLanguage[]).map((langKey) => {
            const lang = SUPPORTED_LANGUAGES[langKey];
            const isSelected = progress.language === langKey;
            const courseData = progress.courses?.[langKey];
            const cCount = courseData ? courseData.completedDays.length : (isSelected ? progress.completedDays.length : 0);

            return (
              <button
                key={langKey}
                id={`profile-lang-card-${langKey}`}
                onClick={() => {
                  playHapticSound('tap');
                  onSelectLanguage(langKey);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50/70 dark:bg-blue-950/40 border-[#007AFF] shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {lang.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {cCount}/30 Days
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#007AFF]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Study Goal & Today's Progress Tracker */}
      <div className="bg-white dark:bg-[#1c1c1e] p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-2xs transition-colors ${
              isGoalReached
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                : 'bg-blue-500/15 text-[#007AFF]'
            }`}>
              <Target className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Daily Study Goal
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Target minutes & daily progress consistency
              </p>
            </div>
          </div>

          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
            isGoalReached
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
              : 'bg-blue-50 dark:bg-blue-950/60 text-[#007AFF] border-blue-200 dark:border-blue-800'
          }`}>
            {todayMinutes} / {dailyGoal} min
          </span>
        </div>

        {/* Goal Preset Selector Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
            <span>Choose Daily Target:</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              {dailyGoal === 5 && '⚡ Casual (5 min)'}
              {dailyGoal === 10 && '🎯 Standard (10 min • Recommended)'}
              {dailyGoal === 15 && '🚀 Focused (15 min)'}
              {dailyGoal === 20 && '🔥 Intensive (20 min)'}
              {![5, 10, 15, 20].includes(dailyGoal) && `Custom (${dailyGoal} min)`}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {[
              { mins: 5, label: '5 min', tier: 'Casual' },
              { mins: 10, label: '10 min', tier: 'Standard' },
              { mins: 15, label: '15 min', tier: 'Focused' },
              { mins: 20, label: '20 min', tier: 'Intensive' },
            ].map((preset) => {
              const isSelected = dailyGoal === preset.mins;
              return (
                <button
                  key={preset.mins}
                  id={`goal-preset-${preset.mins}-btn`}
                  onClick={() => handleSetDailyGoal(preset.mins)}
                  className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-[#007AFF] text-[#007AFF] shadow-2xs font-bold ring-1 ring-[#007AFF]/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <span className="block text-xs leading-none font-bold">{preset.label}</span>
                  <span className="block text-[9px] mt-0.5 opacity-70 font-medium">{preset.tier}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress Tracker Card & Animated Bar */}
        <div className="p-3.5 bg-slate-50/80 dark:bg-slate-800/40 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>Today's Progress</span>
              {isGoalReached && (
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3 stroke-[2.5]" /> Goal Met
                </span>
              )}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-[#007AFF] font-mono">
                {todayMinutes}m
              </span>
              <span className="text-slate-400">/</span>
              <span className="font-semibold text-slate-500 font-mono">
                {dailyGoal}m
              </span>
              <span className="text-[11px] font-bold text-slate-400 ml-1">
                ({goalPercent}%)
              </span>
            </div>
          </div>

          {/* Progress Track with animated glowing fill */}
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                isGoalReached
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600'
              }`}
              style={{ width: `${Math.min(100, Math.max(goalPercent, todayMinutes > 0 ? 5 : 0))}%` }}
            />
          </div>

          {/* Motivation / Status Feedback */}
          <div className="flex items-center justify-between pt-0.5">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              {isGoalReached
                ? `🎉 Fantastic effort! You've reached your ${dailyGoal}-minute daily study goal today.`
                : `${Math.max(0, dailyGoal - todayMinutes)} minutes remaining today to hit your goal.`}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
            <button
              id="log-study-minutes-btn"
              onClick={handleLogFiveMinutes}
              className="flex-1 py-1.5 px-2.5 rounded-xl bg-white dark:bg-[#1c1c1e] hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>Log +5m Study</span>
            </button>

            {onNavigateTab && (
              <button
                id="jump-to-study-lesson-btn"
                onClick={() => {
                  playHapticSound('tap');
                  onNavigateTab('today');
                }}
                className="py-1.5 px-3.5 rounded-xl bg-[#007AFF] hover:bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs cursor-pointer active:scale-95"
              >
                <span>Study Now</span>
              </button>
            )}

            {todayMinutes > 0 && (
              <button
                id="reset-today-minutes-btn"
                onClick={handleResetTodayMinutes}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                title="Reset today's study minutes (for testing)"
                aria-label="Reset today's minutes"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mastery Stats Bento */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white dark:bg-[#1c1c1e] p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Days
          </span>
          <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {completedCount}/30
          </p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
            {percentComplete}% goal
          </span>
        </div>

        <div className="bg-white dark:bg-[#1c1c1e] p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Mastered
          </span>
          <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {progress.masteredVocab.length}
          </p>
          <span className="text-[10px] text-blue-500 font-bold">Words</span>
        </div>

        <div className="bg-white dark:bg-[#1c1c1e] p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Starred
          </span>
          <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {progress.bookmarkedVocab.length}
          </p>
          <span className="text-[10px] text-amber-500 font-bold">Favorites</span>
        </div>
      </div>

      {/* 30-Day Progress & Study-Time Analytics (Recharts) */}
      <StatsSection progress={progress} />

      {/* Fluency Certificate CTA */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-300 dark:border-amber-700/50 p-4 rounded-3xl flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Official B1 Certificate
          </span>
          <h3 className="text-sm font-extrabold text-amber-950 dark:text-amber-100">
            {currentLang.name} 30-Day Diploma
          </h3>
          <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
            {completedCount >= 30
              ? 'You completed all 30 days! Your diploma is ready.'
              : `You have completed ${completedCount} of 30 days. You can preview or view your certificate.`}
          </p>
        </div>

        <button
          id="view-certificate-btn"
          onClick={handleOpenCertificate}
          className="shrink-0 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/25 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>View</span>
        </button>
      </div>

      {/* App Features & Guide Card */}
      {onOpenFeaturesGuide && (
        <button
          id="profile-open-features-guide-btn"
          onClick={() => {
            playHapticSound('tap');
            onOpenFeaturesGuide();
          }}
          className="w-full text-left bg-white dark:bg-[#1c1c1e] hover:border-[#007AFF]/50 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3 transition-colors cursor-pointer group active:scale-[0.99]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/12 text-[#007AFF] flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                App Guide · 8 Core Features
              </p>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                App Features & How It Works
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                30-day plan, 3D cards, AI tutor, goals & offline PWA
              </p>
            </div>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold text-[#007AFF] whitespace-nowrap">
            <span>Explore</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>
      )}

      {/* Settings: Dialect & Speed */}
      <div className="bg-white dark:bg-[#1c1c1e] p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Audio & Speech Settings
          </h3>
        </div>

        {/* Dialect Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Pronunciation Dialect:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(isGerman
              ? [
                  { id: 'de-DE', label: 'Germany (Hochdeutsch)', flag: '🇩🇪' },
                  { id: 'de-AT', label: 'Austria / Swiss', flag: '🇦🇹' },
                ]
              : [
                  { id: 'es-ES', label: 'Spain (Castilian)', flag: '🇪🇸' },
                  { id: 'es-MX', label: 'Mexico / LatAm', flag: '🇲🇽' },
                ]
            ).map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  playHapticSound('tap');
                  onUpdateProgress({ dialectPreference: d.id });
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  progress.dialectPreference === d.id
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-[#007AFF] text-[#007AFF]'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{d.flag}</span>
                <span>{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Speech Speed slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-600 dark:text-slate-400">Audio Speech Rate:</span>
            <span className="font-bold text-[#007AFF]">{progress.speechRate}x</span>
          </div>
          <input
            id="profile-speech-rate-slider"
            type="range"
            min="0.7"
            max="1.1"
            step="0.05"
            value={progress.speechRate}
            onChange={(e) => onUpdateProgress({ speechRate: parseFloat(e.target.value) })}
            className="w-full accent-[#007AFF]"
          />
        </div>
      </div>

      {/* Daily Reminder Notification Setting */}
      <div className="bg-white dark:bg-[#1c1c1e] p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Daily Lesson Reminder
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                On-screen notification to protect your streak 🔥
              </p>
            </div>
          </div>

          {/* iOS Toggle Switch */}
          <button
            id="toggle-daily-reminder-btn"
            onClick={() => {
              playHapticSound('tap');
              const nextState = progress.dailyReminderEnabled === false ? true : false;
              onUpdateProgress({ dailyReminderEnabled: nextState });
            }}
            className={`w-12 h-6.5 rounded-full transition-colors relative flex items-center px-0.5 cursor-pointer ${
              progress.dailyReminderEnabled !== false
                ? 'bg-[#34C759]'
                : 'bg-slate-300 dark:bg-slate-700'
            }`}
            aria-label="Toggle daily reminder"
          >
            <div
              className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform ${
                progress.dailyReminderEnabled !== false ? 'translate-x-5.5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {progress.dailyReminderEnabled !== false && (
          <div className="space-y-3 pt-1 border-t border-slate-100 dark:border-slate-800/80">
            {/* Time Picker */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Reminder Time:
                </span>
              </div>

              <input
                id="daily-reminder-time-input"
                type="time"
                value={progress.dailyReminderTime || '20:00'}
                onChange={(e) => {
                  playHapticSound('tap');
                  onUpdateProgress({ dailyReminderTime: e.target.value });
                }}
                className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-2.5 py-1 rounded-xl text-xs font-bold font-mono border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-[#007AFF]"
              />
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: '7:00 PM', value: '19:00' },
                { label: '8:00 PM (Default)', value: '20:00' },
                { label: '9:00 PM', value: '21:00' },
              ].map((preset) => {
                const isSelected = (progress.dailyReminderTime || '20:00') === preset.value;
                return (
                  <button
                    key={preset.value}
                    id={`reminder-preset-${preset.value.replace(':', '')}`}
                    onClick={() => {
                      playHapticSound('tap');
                      onUpdateProgress({ dailyReminderTime: preset.value });
                    }}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-800 dark:text-amber-300'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            <div className="p-2.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200 flex items-start justify-between gap-2">
              <p className="leading-snug">
                If you haven't completed your <strong>Day {progress.currentDay}</strong> goal by{' '}
                <strong>{progress.dailyReminderTime || '20:00'}</strong>, an on-screen toast reminder will encourage you to finish your lesson.
              </p>
              {onTriggerTestReminder && (
                <button
                  id="test-reminder-toast-btn"
                  onClick={() => {
                    playHapticSound('tap');
                    onTriggerTestReminder();
                  }}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-[10px] shrink-0 shadow-2xs transition-colors cursor-pointer"
                >
                  Test
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bookmarked Vocabulary List */}
      <div className="bg-white dark:bg-[#1c1c1e] p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-current" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Starred {currentLang.name} Vocabulary ({bookmarkedItems.length})
            </h3>
          </div>
        </div>

        {bookmarkedItems.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2 text-center">
            No starred words yet. Tap the star icon on any card or lesson to save it here.
          </p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {bookmarkedItems.map((item) => {
              const targetWord = getTargetText(item, progress.language);

              return (
                <div
                  key={item.id}
                  className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-700/60"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{targetWord}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.en}</p>
                  </div>
                  <button
                    onClick={() => handleSpeak(targetWord)}
                    className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#007AFF] hover:bg-blue-100 transition-colors cursor-pointer"
                    title="Listen to pronunciation"
                    aria-label="Listen to pronunciation"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reset Progress Button */}
      <div className="pt-2 text-center">
        <button
          id="reset-progress-btn"
          onClick={() => {
            if (confirm(`Are you sure you want to reset your 30-day ${currentLang.name} progress?`)) {
              playHapticSound('tap');
              onResetProgress();
            }
          }}
          className="text-xs text-rose-500 hover:text-rose-700 font-semibold inline-flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset {currentLang.name} Study Progress</span>
        </button>
      </div>

      {/* Official Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fffdfa] text-slate-900 max-w-sm w-full rounded-3xl p-6 border-4 border-amber-500 shadow-2xl relative space-y-4">
            <button
              id="close-certificate-modal-btn"
              onClick={() => setShowCertificate(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 text-lg font-bold w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700">
                Certificate of Language Proficiency
              </span>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Lingua30: {currentLang.name} in 30 Days
              </h2>
              <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mt-1" />
            </div>

            <div className="text-center py-2 space-y-2">
              <p className="text-xs text-slate-600">This certifies with distinction that:</p>
              <h3 className="text-lg font-black text-[#007AFF] border-b-2 border-slate-200 pb-1">
                {userName || 'Student'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                has successfully completed the 30-day intensive curriculum, attaining{' '}
                <strong>B1 (Common European Framework of Reference)</strong> proficiency in comprehension, conversation, and practical grammar.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-amber-200 text-center">
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold">Date</span>
                <p className="text-xs font-bold text-slate-700">
                  {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-700 font-extrabold text-[10px] uppercase shadow-xs">
                ★ Seal ★
              </div>
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold">Tutor</span>
                <p className="text-xs font-bold text-slate-700">{currentLang.tutorName}</p>
              </div>
            </div>

            <button
              id="download-certificate-btn"
              onClick={() => {
                playHapticSound('tap');
                alert('Certificate ready! You can take a screenshot on your iOS device to share your achievement.');
              }}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Save / Share Certificate</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
