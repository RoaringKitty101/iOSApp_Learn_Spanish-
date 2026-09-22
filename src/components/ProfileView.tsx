import React, { useState } from 'react';
import { Award, Flame, BookCheck, Volume2, Star, Settings, RotateCcw, Download, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProgress } from '../types';
import { allCurriculumVocabulary } from '../data/curriculum';
import { speakSpanish, playHapticSound } from '../utils/audio';

interface ProfileViewProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: Partial<UserProgress>) => void;
  onResetProgress: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  progress,
  onUpdateProgress,
  onResetProgress,
}) => {
  const [userName, setUserName] = useState('Estudiante de Español');
  const [showCertificate, setShowCertificate] = useState(false);

  const completedCount = progress.completedDays.length;
  const percentComplete = Math.round((completedCount / 30) * 100);

  // CEFR Calculation
  let currentLevel = 'A1 Principiante';
  if (completedCount >= 22) currentLevel = 'B1 Intermedio Fluido';
  else if (completedCount >= 10) currentLevel = 'A2 Elemental';

  const bookmarkedItems = allCurriculumVocabulary.filter((v) =>
    progress.bookmarkedVocab.includes(v.id)
  );

  const handleSpeak = (text: string) => {
    playHapticSound('tap');
    speakSpanish(text, {
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

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-8 space-y-4">
      {/* Header Profile card */}
      <div className="bg-white dark:bg-[#1c1c1e] p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#007AFF] to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-blue-500/25">
          🇪🇸
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="text-base font-extrabold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#007AFF] outline-hidden px-0.5"
            placeholder="Tu Nombre"
          />
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] font-bold text-[#007AFF] bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
              {currentLevel}
            </span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              🔥 {progress.streak} {progress.streak === 1 ? 'día' : 'días'}
            </span>
          </div>
        </div>
      </div>

      {/* Mastery Stats Bento */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white dark:bg-[#1c1c1e] p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Días
          </span>
          <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {completedCount}/30
          </p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
            {percentComplete}% meta
          </span>
        </div>

        <div className="bg-white dark:bg-[#1c1c1e] p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Dominadas
          </span>
          <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {progress.masteredVocab.length}
          </p>
          <span className="text-[10px] text-blue-500 font-bold">Palabras</span>
        </div>

        <div className="bg-white dark:bg-[#1c1c1e] p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Guardadas
          </span>
          <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {progress.bookmarkedVocab.length}
          </p>
          <span className="text-[10px] text-amber-500 font-bold">Favoritas</span>
        </div>
      </div>

      {/* Fluency Certificate CTA */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-300 dark:border-amber-700/50 p-4 rounded-3xl flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Certificado Oficial B1
          </span>
          <h3 className="text-sm font-extrabold text-amber-950 dark:text-amber-100">
            Aprende Spanish 30-Day Diploma
          </h3>
          <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
            {completedCount >= 30
              ? '¡Completaste los 30 días! Tu diploma está emitido.'
              : `Llevas ${completedCount} días completados. Puedes previsualizarlo o generarlo.`}
          </p>
        </div>

        <button
          onClick={handleOpenCertificate}
          className="shrink-0 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/25 flex items-center gap-1.5 transition-colors"
        >
          <Award className="w-4 h-4" />
          <span>Ver</span>
        </button>
      </div>

      {/* Settings: Dialect & Speed */}
      <div className="bg-white dark:bg-[#1c1c1e] p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Ajustes de Voz y Dialecto
          </h3>
        </div>

        {/* Dialect Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Dialecto de Pronunciación:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'es-ES' as const, label: 'España (Castellano)', flag: '🇪🇸' },
              { id: 'es-MX' as const, label: 'México / LatAm', flag: '🇲🇽' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  playHapticSound('tap');
                  onUpdateProgress({ dialectPreference: d.id });
                }}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
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
            <span className="font-medium text-slate-600 dark:text-slate-400">Velocidad del Audio:</span>
            <span className="font-bold text-[#007AFF]">{progress.speechRate}x</span>
          </div>
          <input
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

      {/* Bookmarked Vocabulary List */}
      <div className="bg-white dark:bg-[#1c1c1e] p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-current" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Palabras Guardadas ({bookmarkedItems.length})
            </h3>
          </div>
        </div>

        {bookmarkedItems.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2 text-center">
            No tienes palabras guardadas aún. Marca la estrella en cualquier lección.
          </p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {bookmarkedItems.map((item) => (
              <div
                key={item.id}
                className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-200/60 dark:border-slate-700/60"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{item.es}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.en}</p>
                </div>
                <button
                  onClick={() => handleSpeak(item.es)}
                  className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#007AFF]"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reset Progress Button */}
      <div className="pt-2 text-center">
        <button
          onClick={() => {
            if (confirm('¿Deseas reiniciar tu progreso de los 30 días para empezar de nuevo?')) {
              playHapticSound('tap');
              onResetProgress();
            }
          }}
          className="text-xs text-rose-500 hover:text-rose-700 font-semibold inline-flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar progreso de estudio</span>
        </button>
      </div>

      {/* Official Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fffdfa] text-slate-900 max-w-sm w-full rounded-3xl p-6 border-4 border-amber-500 shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 text-lg font-bold w-7 h-7 flex items-center justify-center rounded-full bg-slate-100"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700">
                Certificado de Competencia Lingüística
              </span>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Aprende: Español en 30 Días
              </h2>
              <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mt-1" />
            </div>

            <div className="text-center py-2 space-y-2">
              <p className="text-xs text-slate-600">Se certifica con orgullo que:</p>
              <h3 className="text-lg font-black text-[#007AFF] border-b-2 border-slate-200 pb-1">
                {userName || 'Estudiante'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ha completado con éxito el programa intensivo de 30 días y alcanzado el nivel{' '}
                <strong>B1 (Marco Común Europeo de Referencia)</strong> en comprensión, conversación y gramática aplicada.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-amber-200 text-center">
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold">Fecha</span>
                <p className="text-xs font-bold text-slate-700">
                  {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-700 font-extrabold text-[10px] uppercase shadow-xs">
                ★ Sello ★
              </div>
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold">Tutora</span>
                <p className="text-xs font-bold text-slate-700">Sofía AI</p>
              </div>
            </div>

            <button
              onClick={() => {
                playHapticSound('tap');
                alert('¡Certificado listo! Puedes tomar una captura de pantalla para compartir tu logro en redes.');
              }}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Guardar / Compartir Certificado</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
