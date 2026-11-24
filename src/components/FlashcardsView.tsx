import React, { useState } from 'react';
import { Volume2, RotateCw, CheckCircle2, Star } from 'lucide-react';
import { UserProgress, SupportedLanguage } from '../types';
import { getAllCurriculumVocabulary, DayVocabularyItem } from '../data/curriculum';
import { speakText, playHapticSound } from '../utils/audio';
import { getTargetText, getTargetExample } from '../utils/langHelper';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { LanguageSelector } from './LanguageSelector';

interface FlashcardsViewProps {
  progress: UserProgress;
  onToggleBookmark: (vocabId: string) => void;
  onMarkMastered: (vocabId: string) => void;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

type FilterMode = 'all' | 'today' | 'bookmarked';

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  progress,
  onToggleBookmark,
  onMarkMastered,
  onSelectLanguage,
}) => {
  const [filterMode, setFilterMode] = useState<FilterMode>('today');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const currentLang = SUPPORTED_LANGUAGES[progress.language] || SUPPORTED_LANGUAGES.es;
  const allVocab = getAllCurriculumVocabulary(progress.language);

  // Filter items
  let filteredCards: DayVocabularyItem[] = allVocab;
  if (filterMode === 'today') {
    filteredCards = allVocab.filter((v) => v.day === progress.currentDay);
  } else if (filterMode === 'bookmarked') {
    filteredCards = allVocab.filter((v) => progress.bookmarkedVocab.includes(v.id));
  }

  // Fallback to all if empty
  if (filteredCards.length === 0) {
    filteredCards = allVocab.slice(0, 10);
  }

  const activeCard: DayVocabularyItem = filteredCards[currentIndex % filteredCards.length] || allVocab[0];
  const isBookmarked = progress.bookmarkedVocab.includes(activeCard.id);

  const targetWord = getTargetText(activeCard, progress.language);
  const targetExample = getTargetExample(activeCard, progress.language);

  const handleFlip = () => {
    playHapticSound('flip');
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    playHapticSound('tap');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handleMaster = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('success');
    onMarkMastered(activeCard.id);
    handleNext();
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('tap');
    speakText(targetWord, {
      lang: progress.language,
      dialect: progress.dialectPreference,
      rate: progress.speechRate,
    });
  };

  return (
    <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-4 pt-3 pb-8 flex flex-col justify-between space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#007AFF]">
              Spaced Repetition
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
              {currentLang.name} 3D Cards
            </h1>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <LanguageSelector
              progress={progress}
              onSelectLanguage={onSelectLanguage}
              variant="pill"
            />
            <span className="text-xs font-bold text-slate-400">
              {currentIndex + 1} of {filteredCards.length}
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 mt-3 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl select-none">
          <button
            id="filter-cards-today-btn"
            onClick={() => {
              playHapticSound('tap');
              setFilterMode('today');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filterMode === 'today'
                ? 'bg-white dark:bg-[#1c1c1e] text-[#007AFF] shadow-2xs'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Day {progress.currentDay}
          </button>

          <button
            id="filter-cards-all-btn"
            onClick={() => {
              playHapticSound('tap');
              setFilterMode('all');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-white dark:bg-[#1c1c1e] text-[#007AFF] shadow-2xs'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            All ({allVocab.length})
          </button>

          <button
            id="filter-cards-bookmarked-btn"
            onClick={() => {
              playHapticSound('tap');
              setFilterMode('bookmarked');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
              filterMode === 'bookmarked'
                ? 'bg-white dark:bg-[#1c1c1e] text-amber-500 shadow-2xs'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Starred ({progress.bookmarkedVocab.length})</span>
          </button>
        </div>
      </div>

      {/* 3D Flashcard Container */}
      <div
        id="flashcard-flip-container"
        onClick={handleFlip}
        className="w-full h-80 relative select-none cursor-pointer perspective-1000 my-auto"
      >
        <div
          className={`w-full h-full relative transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT OF CARD */}
          <div className="absolute inset-0 w-full h-full rounded-3xl bg-white dark:bg-[#1c1c1e] border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between shadow-xl backface-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#007AFF] bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span>{currentLang.flag}</span>
                <span>Day {activeCard.day} • {activeCard.dayTitle}</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  id="bookmark-card-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(activeCard.id);
                  }}
                  className={`p-1.5 rounded-full cursor-pointer ${
                    isBookmarked ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500'
                  }`}
                  aria-label="Star card"
                >
                  <Star className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button
                  id="speak-card-front-btn"
                  onClick={handleSpeak}
                  className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#007AFF] hover:bg-blue-100 transition-colors cursor-pointer"
                  title="Listen to pronunciation"
                  aria-label="Listen to pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-center my-auto space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {targetWord}
              </h2>
              <p className="text-xs font-mono text-slate-400">
                [{activeCard.phonetic}]
              </p>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Tap to reveal English meaning</span>
            </div>
          </div>

          {/* BACK OF CARD */}
          <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 flex flex-col justify-between shadow-xl rotate-y-180 backface-hidden border border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                Meaning & Context
              </span>
              <button
                id="speak-card-back-btn"
                onClick={handleSpeak}
                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                title="Listen to pronunciation"
                aria-label="Listen to pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center my-auto space-y-3">
              <h2 className="text-xl font-black text-sky-200 leading-tight">
                {activeCard.en}
              </h2>
              <div className="pt-2 border-t border-white/15 text-left text-xs space-y-1">
                <p className="text-slate-200 font-medium">"{targetExample}"</p>
                <p className="text-slate-400 text-[11px] italic">{activeCard.exampleEn}</p>
              </div>
              {activeCard.tip && (
                <p className="text-[11px] bg-white/10 p-2 rounded-xl text-amber-200 text-left">
                  💡 {activeCard.tip}
                </p>
              )}
            </div>

            <div className="text-center text-[10px] text-slate-400 font-medium">
              Tap to flip back
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          id="flashcard-review-later-btn"
          onClick={handleNext}
          className="py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          Review Later
        </button>

        <button
          id="flashcard-master-btn"
          onClick={handleMaster}
          className="py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/25 hover:bg-emerald-700 transition-colors cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>I Got It!</span>
        </button>
      </div>
    </div>
  );
};
