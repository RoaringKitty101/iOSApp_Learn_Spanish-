import React, { useState } from 'react';
import { X, Volume2, Star, CheckCircle, BookOpen, MessageCircle, HelpCircle, Trophy, Sparkles, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DayLesson, UserProgress, VocabularyItem, QuizQuestion } from '../types';
import { speakText, playHapticSound } from '../utils/audio';
import { getLessonTitle, getTargetText, getTargetExample, getDialogueLineText } from '../utils/langHelper';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface LessonDetailModalProps {
  lesson: DayLesson;
  progress: UserProgress;
  onClose: () => void;
  onCompleteLesson: (day: number, scorePercent: number) => void;
  onToggleBookmark: (vocabId: string) => void;
}

type LessonTab = 'vocab' | 'grammar' | 'dialogue' | 'quiz' | 'completed';

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  progress,
  onClose,
  onCompleteLesson,
  onToggleBookmark,
}) => {
  const [currentTab, setCurrentTab] = useState<LessonTab>('vocab');
  const [activeSpeechText, setActiveSpeechText] = useState<string | null>(null);

  const currentLang = SUPPORTED_LANGUAGES[progress.language] || SUPPORTED_LANGUAGES.es;
  const lessonTitle = getLessonTitle(lesson, progress.language);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [quizScorePercent, setQuizScorePercent] = useState<number>(100);

  const isBookmarked = (id: string) => progress.bookmarkedVocab.includes(id);

  const handleSpeak = (text: string) => {
    playHapticSound('tap');
    setActiveSpeechText(text);
    speakText(text, {
      lang: progress.language,
      dialect: progress.dialectPreference,
      rate: progress.speechRate,
      onEnd: () => setActiveSpeechText(null),
    });
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (submittedQuiz) return;
    playHapticSound('tap');
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (submittedQuiz) return;
    setSubmittedQuiz(true);

    let correctCount = 0;
    lesson.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / Math.max(lesson.quiz.length, 1)) * 100);
    setQuizScorePercent(score);

    if (score >= 50) {
      playHapticSound('complete');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      setCurrentTab('completed');
      onCompleteLesson(lesson.day, score);
    } else {
      playHapticSound('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#F2F2F7] dark:bg-[#121318] w-full max-w-lg mx-auto h-[92vh] rounded-t-[36px] flex flex-col overflow-hidden shadow-2xl border-t border-white/20">
        {/* iOS Grab bar & Close button */}
        <div className="pt-3 pb-2 px-6 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-md">
          <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2.5" />

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#007AFF] flex items-center gap-1">
              <span>{currentLang.flag}</span>
              <span>Day {lesson.day} • {lesson.cefr} • Week {lesson.week}</span>
            </span>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
              {lesson.titleEn}
            </h2>
            <p className="text-[11px] font-semibold text-[#007AFF] flex items-center gap-1 mt-0.5">
              <span>{lessonTitle}</span>
            </p>
          </div>

          <button
            id="close-lesson-modal-btn"
            onClick={() => {
              playHapticSound('tap');
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Close lesson"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Step Tabs Navigation */}
        <div className="flex items-center justify-around px-2 py-1.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 select-none">
          {[
            { id: 'vocab' as LessonTab, label: 'Vocabulary', icon: BookOpen },
            { id: 'grammar' as LessonTab, label: 'Grammar', icon: Sparkles },
            { id: 'dialogue' as LessonTab, label: 'Dialogue', icon: MessageCircle },
            { id: 'quiz' as LessonTab, label: 'Quiz', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`lesson-step-tab-${tab.id}`}
                onClick={() => {
                  playHapticSound('tap');
                  setCurrentTab(tab.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-[#1c1c1e] text-[#007AFF] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: VOCABULARY */}
          {currentTab === 'vocab' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {lesson.vocabulary.length} Core Expressions
                </span>
                <span className="text-[11px] text-slate-400">Tap speaker for audio</span>
              </div>

              {lesson.vocabulary.map((vocab: VocabularyItem) => {
                const targetWord = getTargetText(vocab, progress.language);
                const targetEx = getTargetExample(vocab, progress.language);

                return (
                  <div
                    key={vocab.id}
                    className="bg-white dark:bg-[#1c1c1e] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2.5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                          {targetWord}
                        </h3>
                        <p className="text-xs font-semibold text-[#007AFF] mt-0.5">
                          {vocab.en}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          [{vocab.phonetic}]
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onToggleBookmark(vocab.id)}
                          className={`p-2 rounded-xl transition-colors cursor-pointer ${
                            isBookmarked(vocab.id)
                              ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                              : 'text-slate-400 hover:text-slate-600 bg-slate-100 dark:bg-slate-800'
                          }`}
                          title="Bookmark word"
                          aria-label="Bookmark word"
                        >
                          <Star className={`w-4 h-4 ${isBookmarked(vocab.id) ? 'fill-current' : ''}`} />
                        </button>

                        <button
                          onClick={() => handleSpeak(targetWord)}
                          className={`p-2 rounded-xl transition-all cursor-pointer ${
                            activeSpeechText === targetWord
                              ? 'bg-[#007AFF] text-white scale-105'
                              : 'bg-blue-50 dark:bg-blue-950/50 text-[#007AFF] hover:bg-blue-100 dark:hover:bg-blue-900/50'
                          }`}
                          title="Listen to pronunciation"
                          aria-label="Listen to pronunciation"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Context sentence */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        "{targetEx}"
                      </p>
                      <p className="text-slate-400 text-[11px] italic mt-0.5">
                        {vocab.exampleEn}
                      </p>
                    </div>

                    {vocab.tip && (
                      <div className="bg-amber-50/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-[11px] p-2 rounded-xl font-medium">
                        💡 <strong>Native Tip:</strong> {vocab.tip}
                      </div>
                    )}
                  </div>
                );
              })}

              <button
                id="lesson-next-to-grammar-btn"
                onClick={() => {
                  playHapticSound('tap');
                  setCurrentTab('grammar');
                }}
                className="w-full mt-4 py-3 rounded-2xl bg-[#007AFF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-colors cursor-pointer"
              >
                <span>Next: Express Grammar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 2: GRAMMAR BITE */}
          {currentTab === 'grammar' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1c1c1e] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Key Concept
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {lesson.grammar.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {lesson.grammar.rule}
                </p>

                {lesson.grammar.proTip && (
                  <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 p-3 rounded-xl text-purple-900 dark:text-purple-200 text-xs font-medium">
                    ⚡ <strong>Golden Rule:</strong> {lesson.grammar.proTip}
                  </div>
                )}
              </div>

              {/* Grammar Examples */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Practical Examples
                </h4>
                {lesson.grammar.examples.map((eg, i) => {
                  const targetExample = getTargetText(eg, progress.language);

                  return (
                    <div
                      key={i}
                      className="bg-white dark:bg-[#1c1c1e] p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          {targetExample}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {eg.en}
                        </p>
                      </div>
                      <button
                        onClick={() => handleSpeak(targetExample)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#007AFF] hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer"
                        title="Listen to pronunciation"
                        aria-label="Listen to pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                id="lesson-next-to-dialogue-btn"
                onClick={() => {
                  playHapticSound('tap');
                  setCurrentTab('dialogue');
                }}
                className="w-full mt-4 py-3 rounded-2xl bg-[#007AFF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-colors cursor-pointer"
              >
                <span>Next: Context Dialogue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 3: DIALOGUE */}
          {currentTab === 'dialogue' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Live Native Dialogue
                </span>
                <span className="text-[11px] text-slate-400">Hear native interaction in context</span>
              </div>

              <div className="space-y-3">
                {lesson.dialogue.map((line) => {
                  const targetLine = getDialogueLineText(line, progress.language);

                  return (
                    <div
                      key={line.id}
                      className={`flex items-start gap-2.5 ${
                        line.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-sm shadow-2xs shrink-0">
                        {line.avatar}
                      </div>

                      <div
                        className={`max-w-[80%] p-3.5 rounded-2xl border shadow-2xs space-y-1 ${
                          line.role === 'user'
                            ? 'bg-[#007AFF] text-white border-blue-600 rounded-tr-none'
                            : 'bg-white dark:bg-[#1c1c1e] text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-800 rounded-tl-none'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className={`text-[10px] font-bold ${line.role === 'user' ? 'text-sky-200' : 'text-slate-400'}`}>
                            {line.speaker}
                          </span>
                          <button
                            onClick={() => handleSpeak(targetLine)}
                            className={`p-1 rounded-full cursor-pointer ${
                              line.role === 'user'
                                ? 'text-white hover:bg-white/20'
                                : 'text-[#007AFF] hover:bg-blue-50 dark:hover:bg-slate-800'
                            }`}
                            title="Listen"
                            aria-label="Listen"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs font-bold leading-relaxed">{targetLine}</p>
                        <p className={`text-[11px] ${line.role === 'user' ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'}`}>
                          {line.textEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                id="lesson-next-to-quiz-btn"
                onClick={() => {
                  playHapticSound('tap');
                  setCurrentTab('quiz');
                }}
                className="w-full mt-4 py-3 rounded-2xl bg-[#007AFF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-colors cursor-pointer"
              >
                <span>Take Quick Quiz</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 4: QUIZ */}
          {currentTab === 'quiz' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1c1c1e] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Comprehension Check
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                  Showcase what you learned in Day {lesson.day}
                </h3>
              </div>

              {lesson.quiz.map((q: QuizQuestion, index: number) => {
                const selected = selectedAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = isAnswered && selected === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="bg-white dark:bg-[#1c1c1e] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {q.question}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt: string, optIdx: number) => {
                        let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200';

                        if (submittedQuiz) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                          } else if (selected === optIdx) {
                            btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                          }
                        } else if (selected === optIdx) {
                          btnStyle = 'bg-blue-50 dark:bg-blue-950/60 border-[#007AFF] text-[#007AFF] font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizOption(q.id, optIdx)}
                            className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {submittedQuiz && optIdx === q.correctIndex && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <p className={`text-[11px] p-2.5 rounded-xl font-medium ${
                        isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
                      }`}>
                        {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}

              {!submittedQuiz ? (
                <button
                  id="submit-quiz-answers-btn"
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < lesson.quiz.length}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Verify Answers
                </button>
              ) : (
                <button
                  id="view-quiz-results-btn"
                  onClick={() => setCurrentTab('completed')}
                  className="w-full py-3.5 rounded-2xl bg-[#007AFF] text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  View Final Results
                </button>
              )}
            </div>
          )}

          {/* TAB 5: COMPLETED CELEBRATION */}
          {currentTab === 'completed' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-white flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30 animate-bounce">
                <Trophy className="w-10 h-10 text-amber-900" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Lesson Mastered! 🎉
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Day {lesson.day} Completed!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-1">
                  You've added valuable {currentLang.name} vocabulary and grammar to your 30-day streak.
                </p>
              </div>

              <div className="bg-white dark:bg-[#1c1c1e] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-xs mx-auto shadow-2xs flex items-center justify-around">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Accuracy</span>
                  <p className="text-lg font-black text-[#007AFF]">{quizScorePercent}%</p>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Streak</span>
                  <p className="text-lg font-black text-amber-500">🔥 {progress.streak}d</p>
                </div>
              </div>

              <button
                id="back-to-dashboard-btn"
                onClick={() => {
                  playHapticSound('tap');
                  onClose();
                }}
                className="w-full max-w-xs mx-auto py-3.5 rounded-2xl bg-[#007AFF] text-white font-bold text-xs shadow-lg shadow-blue-500/25 hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Back to Daily Plan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
