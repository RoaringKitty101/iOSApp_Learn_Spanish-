import React, { useState } from 'react';
import { ChevronDown, Check, Globe, Sparkles, BookOpen, X } from 'lucide-react';
import { SupportedLanguage, UserProgress } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { playHapticSound } from '../utils/audio';

interface LanguageSelectorProps {
  progress: UserProgress;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  variant?: 'pill' | 'header' | 'button';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  progress,
  onSelectLanguage,
  variant = 'pill',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = SUPPORTED_LANGUAGES[progress.language] || SUPPORTED_LANGUAGES.es;

  const handleSelect = (langKey: SupportedLanguage) => {
    playHapticSound('success');
    onSelectLanguage(langKey);
    setIsOpen(false);
  };

  const getLanguageStats = (langKey: SupportedLanguage) => {
    const courseData = progress.courses?.[langKey];
    const completedCount = courseData ? courseData.completedDays.length : (progress.language === langKey ? progress.completedDays.length : 0);
    const curDay = courseData ? courseData.currentDay : (progress.language === langKey ? progress.currentDay : 1);
    const percent = Math.round((completedCount / 30) * 100);
    return { completedCount, curDay, percent };
  };

  return (
    <>
      {/* Pill trigger */}
      {variant === 'pill' ? (
        <button
          id="language-selector-pill-btn"
          onClick={() => {
            playHapticSound('tap');
            setIsOpen(true);
          }}
          className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs transition-all active:scale-95"
          title="Switch learning language"
          aria-label="Switch learning language"
        >
          <span className="text-base leading-none">{currentLang.flag}</span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#007AFF] transition-colors">
            {currentLang.name}
          </span>
          <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform group-hover:translate-y-0.5" />
        </button>
      ) : (
        <button
          id="language-selector-header-btn"
          onClick={() => {
            playHapticSound('tap');
            setIsOpen(true);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:border-[#007AFF]/50 transition-all active:scale-98"
        >
          <span className="text-lg">{currentLang.flag}</span>
          <div className="text-left">
            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Learning</span>
            <span className="font-bold text-slate-900 dark:text-white">{currentLang.name}</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
        </button>
      )}

      {/* Language Selection Modal / Action Sheet */}
      {isOpen && (
        <div
          id="language-selection-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            id="language-selection-modal-content"
            className="w-full max-w-sm rounded-[32px] bg-[#F2F2F7] dark:bg-[#1c1c1e] p-5 border border-white/20 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-[#007AFF] flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Select Course Language
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Switch between 30-day immersion tracks
                  </p>
                </div>
              </div>
              <button
                id="close-language-modal-btn"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Language Cards */}
            <div className="space-y-2.5">
              {(Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[]).map((langKey) => {
                const lang = SUPPORTED_LANGUAGES[langKey];
                const isSelected = progress.language === langKey;
                const stats = getLanguageStats(langKey);

                return (
                  <div
                    key={langKey}
                    id={`select-language-card-${langKey}`}
                    onClick={() => handleSelect(langKey)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelect(langKey);
                      }
                    }}
                    className={`relative w-full p-3.5 rounded-2xl text-left transition-all cursor-pointer border flex items-center justify-between group ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800/90 border-[#007AFF] shadow-md shadow-blue-500/10 ring-2 ring-[#007AFF]/20'
                        : 'bg-white/70 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border-slate-200/90 dark:border-slate-700/80 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-2xl shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                        {lang.flag}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {lang.name}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400">
                            ({lang.nativeName})
                          </span>
                          {isSelected && (
                            <span className="px-1.5 py-0.5 rounded-full bg-blue-500/10 text-[#007AFF] text-[10px] font-bold">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {lang.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300">
                            <BookOpen className="w-3 h-3 text-[#007AFF]" />
                            Day {stats.curDay} / 30
                          </span>
                          <span>•</span>
                          <span>{stats.completedCount} completed ({stats.percent}%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 pl-2">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-[#007AFF] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-[#007AFF]/50 transition-colors" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Tip */}
            <div className="p-3 bg-blue-50/80 dark:bg-blue-950/20 rounded-2xl border border-blue-200/60 dark:border-blue-800/40 text-[11px] text-blue-900 dark:text-blue-200 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>Progress is saved independently:</strong> Your streak is shared globally, while your day progress, quiz scores, and flashcards remain preserved for each language.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
