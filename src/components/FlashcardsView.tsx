import React, { useState } from 'react';
import { Volume2, RotateCw, CheckCircle2, Star, Sparkles, Filter } from 'lucide-react';
import { UserProgress } from '../types';
import { allCurriculumVocabulary, DayVocabularyItem } from '../data/curriculum';
import { speakSpanish, playHapticSound } from '../utils/audio';

interface FlashcardsViewProps {
  progress: UserProgress;
  onToggleBookmark: (vocabId: string) => void;
  onMarkMastered: (vocabId: string) => void;
}

type FilterMode = 'all' | 'today' | 'bookmarked';

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  progress,
  onToggleBookmark,
  onMarkMastered,
}) => {
  const [filterMode, setFilterMode] = useState<FilterMode>('today');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Filter items
  let filteredCards: DayVocabularyItem[] = allCurriculumVocabulary;
  if (filterMode === 'today') {
    filteredCards = allCurriculumVocabulary.filter((v) => v.day === progress.currentDay);
  } else if (filterMode === 'bookmarked') {
    filteredCards = allCurriculumVocabulary.filter((v) => progress.bookmarkedVocab.includes(v.id));
  }

  // Fallback to all if empty
  if (filteredCards.length === 0) {
    filteredCards = allCurriculumVocabulary.slice(0, 10);
  }

  const activeCard: DayVocabularyItem = filteredCards[currentIndex % filteredCards.length] || allCurriculumVocabulary[0];
  const isMastered = progress.masteredVocab.includes(activeCard.id);
  const isBookmarked = progress.bookmarkedVocab.includes(activeCard.id);

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
    speakSpanish(activeCard.es, {
      dialect: progress.dialectPreference,
      rate: progress.speechRate,
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-8 flex flex-col justify-between space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#007AFF]">
              Repetición Espaciada
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Tarjetas 3D
            </h1>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {currentIndex + 1} de {filteredCards.length}
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 mt-3 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl select-none">
          <button
            onClick={() => {
              playHapticSound('tap');
              setFilterMode('today');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all ${
              filterMode === 'today'
                ? 'bg-white dark:bg-[#1c1c1e] text-[#007AFF] shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Día {progress.currentDay}
          </button>

          <button
            onClick={() => {
              playHapticSound('tap');
              setFilterMode('all');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all ${
              filterMode === 'all'
                ? 'bg-white dark:bg-[#1c1c1e] text-[#007AFF] shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Todas (140+)
          </button>

          <button
            onClick={() => {
              playHapticSound('tap');
              setFilterMode('bookmarked');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
              filterMode === 'bookmarked'
                ? 'bg-white dark:bg-[#1c1c1e] text-amber-500 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Favoritas ({progress.bookmarkedVocab.length})</span>
          </button>
        </div>
      </div>

      {/* 3D Flashcard Container */}
      <div
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
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#007AFF] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                Día {activeCard.day} • {activeCard.dayTitle}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(activeCard.id);
                  }}
                  className={`p-1.5 rounded-full ${
                    isBookmarked ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500'
                  }`}
                >
                  <Star className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleSpeak}
                  className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#007AFF] hover:bg-blue-100 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-center my-auto space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {activeCard.es}
              </h2>
              <p className="text-xs font-mono text-slate-400">
                [{activeCard.phonetic}]
              </p>
            </div>

            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Toca para ver significado en inglés</span>
            </div>
          </div>

          {/* BACK OF CARD */}
          <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 flex flex-col justify-between shadow-xl rotate-y-180 backface-hidden border border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                Significado y Contexto
              </span>
              <button
                onClick={handleSpeak}
                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center my-auto space-y-3">
              <h2 className="text-xl font-black text-sky-200 leading-tight">
                {activeCard.en}
              </h2>
              <div className="pt-2 border-t border-white/15 text-left text-xs space-y-1">
                <p className="text-slate-200 font-medium">"{activeCard.exampleEs}"</p>
                <p className="text-slate-400 text-[11px] italic">{activeCard.exampleEn}</p>
              </div>
              {activeCard.tip && (
                <p className="text-[11px] bg-white/10 p-2 rounded-xl text-amber-200 text-left">
                  💡 {activeCard.tip}
                </p>
              )}
            </div>

            <div className="text-center text-[10px] text-slate-400 font-medium">
              Toca para volver a girar
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={handleNext}
          className="py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors"
        >
          Repasar luego
        </button>

        <button
          onClick={handleMaster}
          className="py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/25 hover:bg-emerald-700 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>¡Me la sé!</span>
        </button>
      </div>
    </div>
  );
};
