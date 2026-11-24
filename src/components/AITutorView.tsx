import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, Sparkles, Languages, RefreshCw, Mic, MicOff, CheckCircle2 } from 'lucide-react';
import { UserProgress, ChatMessage, SupportedLanguage } from '../types';
import { speakText, playHapticSound } from '../utils/audio';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { LanguageSelector } from './LanguageSelector';

interface AITutorViewProps {
  progress: UserProgress;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

const GERMAN_STARTER_PROMPTS = [
  { text: 'Hallo Lukas! Wie geht es dir heute?', en: 'Hello Lukas! How are you today?' },
  { text: 'Ich möchte das Bestellen in einer Bäckerei üben.', en: 'I want to practice ordering at a bakery.' },
  { text: 'Was ist der Unterschied zwischen der, die und das?', en: 'What is the difference between der, die, and das?' },
  { text: 'Lass uns einen Check-in im Hotel auf Deutsch simulieren.', en: 'Let us simulate a hotel check-in in German.' },
];

const SPANISH_STARTER_PROMPTS = [
  { text: '¡Hola Sofía! ¿Cómo estás hoy?', en: 'Hello Sofía! How are you today?' },
  { text: 'Quiero practicar pedir tapas en un restaurante.', en: 'I want to practice ordering tapas in a restaurant.' },
  { text: '¿Cuál es la diferencia entre Por y Para?', en: 'What is the difference between Por and Para?' },
  { text: 'Simulemos un check-in en el hotel en español.', en: 'Let us simulate a hotel check-in in Spanish.' },
];

export const AITutorView: React.FC<AITutorViewProps> = ({ progress, onSelectLanguage }) => {
  const currentLang = SUPPORTED_LANGUAGES[progress.language] || SUPPORTED_LANGUAGES.es;
  const isGerman = progress.language === 'de';
  const starterPrompts = isGerman ? GERMAN_STARTER_PROMPTS : SPANISH_STARTER_PROMPTS;

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: `welcome_${progress.language}`,
      role: 'assistant',
      content: isGerman
        ? `Hallo! Ich bin ${currentLang.tutorName}, dein persönlicher Deutsch-Tutor für deinen 30-Tage-Kurs. Heute bist du an Tag ${progress.currentDay}. Worüber möchtest du sprechen?`
        : `¡Hola! Soy ${currentLang.tutorName}, tu tutor personal de español para tu curso de 30 días. Hoy estás en el Día ${progress.currentDay}. ¿De qué te gustaría conversar o qué duda tienes?`,
      translation: isGerman
        ? `Hello! I am ${currentLang.tutorName}, your personal German tutor for your 30-day course. Today you are on Day ${progress.currentDay}. What would you like to speak about?`
        : `Hello! I am ${currentLang.tutorName}, your personal Spanish tutor for your 30-day course. Today you are on Day ${progress.currentDay}. What would you like to chat about?`,
      timestamp: Date.now(),
    },
  ]);

  // When language changes, reset or update welcome message
  useEffect(() => {
    setMessages([
      {
        id: `welcome_${progress.language}_${Date.now()}`,
        role: 'assistant',
        content: isGerman
          ? `Hallo! Ich bin ${currentLang.tutorName}, dein persönlicher Deutsch-Tutor für deinen 30-Tage-Kurs. Heute bist du an Tag ${progress.currentDay}. Worüber möchtest du sprechen?`
          : `¡Hola! Soy ${currentLang.tutorName}, tu tutor personal de español para tu curso de 30 días. Hoy estás en el Día ${progress.currentDay}. ¿De qué te gustaría conversar o qué duda tienes?`,
        translation: isGerman
          ? `Hello! I am ${currentLang.tutorName}, your personal German tutor for your 30-day course. Today you are on Day ${progress.currentDay}. What would you like to speak about?`
          : `Hello! I am ${currentLang.tutorName}, your personal Spanish tutor for your 30-day course. Today you are on Day ${progress.currentDay}. What would you like to chat about?`,
        timestamp: Date.now(),
      },
    ]);
  }, [progress.language, currentLang.tutorName, progress.currentDay, isGerman]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSpeak = (text: string) => {
    playHapticSound('tap');
    speakText(text, {
      lang: progress.language,
      dialect: progress.dialectPreference,
      rate: progress.speechRate,
    });
  };

  const toggleTranslation = (id: string) => {
    playHapticSound('tap');
    setShowTranslations((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? false : !prev[id],
    }));
  };

  const handleSend = async (textToSend?: string) => {
    const userText = textToSend || input.trim();
    if (!userText || isLoading) return;

    playHapticSound('tap');
    setInput('');

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const historyPayload = newMessages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const res = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: historyPayload.slice(-8),
          currentDay: progress.currentDay,
          language: progress.language,
          dialect: progress.dialectPreference,
        }),
      });

      if (!res.ok) {
        throw new Error('Server returned error');
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: `ast_${Date.now()}`,
        role: 'assistant',
        content: data.reply || data.replyTarget || (isGerman ? 'Sehr gut gesagt! Weiter so.' : '¡Muy bien dicho! Continúa practicando.'),
        translation: data.translation || data.replyEn,
        grammarFeedback: data.feedback || data.corrections || data.grammarTip,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      playHapticSound('success');
      // Audio speak
      speakText(assistantMessage.content, {
        lang: progress.language,
        dialect: progress.dialectPreference,
        rate: progress.speechRate,
      });
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `ast_${Date.now()}`,
        role: 'assistant',
        content: isGerman
          ? 'Ich habe dich gut verstanden! Du machst tolle Fortschritte mit deinem Deutsch. Möchtest du einen weiteren Satz üben?'
          : '¡Te entendí perfectamente! Estás haciendo un gran trabajo con tu español. ¿Quieres probar con otra frase o situación?',
        translation: isGerman
          ? 'I understood you well! You are making great progress with your German. Would you like to practice another sentence?'
          : 'I understood you perfectly! You are doing a great job with your Spanish. Do you want to try another phrase or situation?',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVoiceInput = () => {
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
                              (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Browser speech recognition requires microphone permissions or running in a standard browser tab.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = progress.dialectPreference || (isGerman ? 'de-DE' : 'es-ES');
      recognition.interimResults = false;

      if (!isRecording) {
        setIsRecording(true);
        recognition.start();

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInput(transcript);
          }
          setIsRecording(false);
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };
      } else {
        recognition.stop();
        setIsRecording(false);
      }
    } catch (e) {
      setIsRecording(false);
    }
  };

  return (
    <div className="flex-1 min-h-0 min-w-0 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-3 pb-3 shrink-0 border-b border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-md flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-xl text-white shadow-md shadow-purple-500/20 shrink-0">
            {currentLang.tutorAvatar}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-black text-slate-900 dark:text-white truncate">
                {currentLang.tutorName}
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Native {currentLang.name} Coach • Day {progress.currentDay}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <LanguageSelector
            progress={progress}
            onSelectLanguage={onSelectLanguage}
            variant="pill"
          />
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-3.5">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isShown = showTranslations[msg.id] !== false;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[88%] ${isUser ? 'ml-auto' : 'mr-auto'}`}
            >
              <div
                className={`rounded-3xl px-4 py-3 shadow-2xs text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#007AFF] text-white rounded-br-xs'
                    : 'bg-white dark:bg-[#2c2c2e] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-xs'
                }`}
              >
                <p className="font-medium whitespace-pre-wrap">{msg.content}</p>

                {/* English translation dropdown / toggle */}
                {msg.translation && (
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                    {isShown ? (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 italic font-medium">
                        "{msg.translation}"
                      </p>
                    ) : null}

                    <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
                      <button
                        onClick={() => toggleTranslation(msg.id)}
                        className="hover:text-[#007AFF] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Languages className="w-3 h-3" />
                        <span>{isShown ? 'Hide English' : 'Show English Translation'}</span>
                      </button>

                      <button
                        onClick={() => handleSpeak(msg.content)}
                        className="hover:text-[#007AFF] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                        title="Listen to pronunciation"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Audio</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Feedback pill */}
                {msg.grammarFeedback && (
                  <div className="mt-2 p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/40 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{msg.grammarFeedback}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
            <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center text-xs">
              {currentLang.tutorAvatar}
            </div>
            <span className="italic">{currentLang.tutorName} is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Prompts */}
      <div className="px-4 py-2 bg-slate-50/80 dark:bg-slate-900/60 border-t border-slate-200/50 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#007AFF]" />
          Topics:
        </span>
        {starterPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt.text)}
            className="shrink-0 text-left bg-white dark:bg-[#1c1c1e] hover:border-blue-400/50 px-3 py-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 transition-colors shadow-2xs whitespace-nowrap cursor-pointer group"
          >
            <span className="block text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#007AFF]">
              {prompt.text}
            </span>
            <span className="block text-[10px] text-slate-400 font-medium">
              {prompt.en}
            </span>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white dark:bg-[#1c1c1e] border-t border-slate-200/80 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={handleToggleVoiceInput}
            className={`p-2.5 rounded-full transition-colors cursor-pointer ${
              isRecording
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title="Speech to text input"
            aria-label="Speech to text input"
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            id="ai-tutor-message-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${currentLang.tutorName} in ${currentLang.name} or English...`}
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40"
          />

          <button
            id="ai-tutor-send-btn"
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-full bg-[#007AFF] disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 transition-colors shadow-xs cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
