import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, Sparkles, Languages, Bot, RefreshCw, Mic, MicOff } from 'lucide-react';
import { UserProgress, ChatMessage } from '../types';
import { speakSpanish, playHapticSound } from '../utils/audio';

interface AITutorViewProps {
  progress: UserProgress;
}

const STARTER_PROMPTS = [
  '¡Hola Sofía! ¿Cómo estás hoy?',
  'Quiero practicar pedir comida en un restaurante.',
  '¿Cuál es la diferencia entre Por y Para?',
  'Simulemos un check-in en el hotel.',
];

export const AITutorView: React.FC<AITutorViewProps> = ({ progress }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      role: 'assistant',
      content: `¡Hola! Soy Sofía, tu tutora personal de español para tus 30 días de aprendizaje. Hoy estás en el Día ${progress.currentDay}. ¿De qué te gustaría conversar o qué duda tienes?`,
      translation: `Hello! I am Sofía, your personal Spanish tutor for your 30 days of learning. Today you are on Day ${progress.currentDay}. What would you like to chat about or what question do you have?`,
      timestamp: Date.now(),
    },
  ]);

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
    speakSpanish(text, {
      dialect: progress.dialectPreference,
      rate: progress.speechRate,
    });
  };

  const toggleTranslation = (id: string) => {
    playHapticSound('tap');
    setShowTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
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
          history: historyPayload.slice(-8), // keep recent context
          currentDay: progress.currentDay,
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
        content: data.reply || '¡Muy bien dicho! Continúa practicando.',
        translation: data.translation,
        grammarFeedback: data.feedback,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      playHapticSound('success');
      // Auto speak first sentence of reply
      speakSpanish(assistantMessage.content, {
        dialect: progress.dialectPreference,
        rate: progress.speechRate,
      });
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback response for offline or server error
      const fallbackMsg: ChatMessage = {
        id: `ast_${Date.now()}`,
        role: 'assistant',
        content: '¡Te entendí perfectamente! Estás haciendo un gran trabajo con tu español. ¿Quieres probar con otra frase o situación?',
        translation: 'I understood you perfectly! You are doing a great job with your Spanish. Do you want to try another phrase or situation?',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Web Speech recognition support (optional microphone input)
  const handleToggleVoiceInput = () => {
    // Check SpeechRecognition support
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
                              (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('El reconocimiento de voz en el navegador requiere abrir la app en una nueva pestaña.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = progress.dialectPreference || 'es-ES';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
        playHapticSound('tap');
      };

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

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header bar */}
      <div className="px-4 py-2.5 bg-white/70 dark:bg-[#1c1c1e]/70 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              💃
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Sofía AI</h2>
              <span className="text-[10px] bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 font-bold px-1.5 py-0.2 rounded-full">
                Tutora Nativa
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              En línea • Adaptado al Día {progress.currentDay}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playHapticSound('tap');
            setMessages([
              {
                id: 'welcome_refresh',
                role: 'assistant',
                content: `¡Hola de nuevo! Continuemos practicando tu español para el Día ${progress.currentDay}.`,
                translation: `Hello again! Let's continue practicing your Spanish for Day ${progress.currentDay}.`,
                timestamp: Date.now(),
              },
            ]);
          }}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Reiniciar conversación"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const showTrans = showTranslations[msg.id];

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs space-y-1.5 shadow-xs ${
                  isUser
                    ? 'bg-[#007AFF] text-white rounded-tr-none'
                    : 'bg-white dark:bg-[#1c1c1e] text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-[10px] font-bold ${isUser ? 'text-sky-200' : 'text-slate-400'}`}>
                    {isUser ? 'Tú' : 'Sofía'}
                  </span>
                  {!isUser && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleTranslation(msg.id)}
                        className="p-1 text-slate-400 hover:text-[#007AFF] transition-colors"
                        title="Ver traducción"
                      >
                        <Languages className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleSpeak(msg.content)}
                        className="p-1 text-slate-400 hover:text-[#007AFF] transition-colors"
                        title="Escuchar audio"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <p className="font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                {showTrans && msg.translation && (
                  <p className="pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 italic">
                    {msg.translation}
                  </p>
                )}

                {msg.grammarFeedback && (
                  <div className="bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl text-[11px] text-amber-900 dark:text-amber-200 border border-amber-200/60 dark:border-amber-800/40">
                    💡 <strong>Tip de mejora:</strong> {msg.grammarFeedback}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
            <div className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center text-xs animate-pulse">
              💃
            </div>
            <span className="font-medium animate-pulse">Sofía está escribiendo...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Chips */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {STARTER_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="shrink-0 bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold px-3 py-1.5 rounded-full hover:border-blue-400 transition-colors shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Input Area */}
      <div className="p-3 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80">
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
            className={`p-2.5 rounded-full transition-colors ${
              isRecording
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
            title="Dictar por voz"
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe en español a Sofía..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs px-4 py-2.5 rounded-full outline-hidden focus:ring-2 focus:ring-[#007AFF] transition-all"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-full bg-[#007AFF] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
