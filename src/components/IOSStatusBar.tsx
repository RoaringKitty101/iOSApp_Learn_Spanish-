import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Sparkles, Flame, X, CalendarCheck, Zap } from 'lucide-react';
import { playHapticSound } from '../utils/audio';

interface IOSStatusBarProps {
  currentDay: number;
  streak: number;
  lastCompletedDate?: string;
  activeAudioText?: string | null;
}

export const IOSStatusBar: React.FC<IOSStatusBarProps> = ({
  currentDay,
  streak,
  lastCompletedDate,
  activeAudioText,
}) => {
  const [time, setTime] = useState('9:41');
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const completedToday = lastCompletedDate === todayStr;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formatted = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes}`;
      setTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenStreakDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHapticSound('tap');
    setShowStreakModal(true);
  };

  return (
    <>
      <div className="relative z-40 pt-2 pb-1 px-4 sm:px-6 flex items-center justify-between select-none text-slate-800 dark:text-slate-100 font-semibold text-xs tracking-tight">
        {/* Left: Time + Small Fire Icon Streak Counter */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-[13px] tracking-tight">{time}</span>

          {/* Small Fire Icon Counter in Header */}
          <button
            onClick={handleOpenStreakDetails}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
              streak > 0
                ? 'bg-amber-500/15 dark:bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 shadow-2xs'
                : 'bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
            }`}
            title={`Racha Diaria: ${streak} ${streak === 1 ? 'día' : 'días'}`}
          >
            <Flame
              className={`w-3.5 h-3.5 ${
                streak > 0
                  ? 'fill-orange-500 text-amber-500 animate-pulse'
                  : 'text-slate-400'
              }`}
            />
            <span className="font-mono">{streak}</span>
          </button>
        </div>

        {/* Dynamic Island */}
        <div
          onClick={() => setIslandExpanded(!islandExpanded)}
          className={`bg-black text-white rounded-full transition-all duration-300 ease-out flex items-center justify-between cursor-pointer px-3 ${
            islandExpanded || activeAudioText ? 'h-7 w-48 shadow-lg shadow-black/20' : 'h-6 w-24'
          }`}
        >
          {activeAudioText ? (
            <div className="w-full flex items-center justify-between text-[11px] truncate px-1">
              <span className="flex items-center gap-1.5 text-emerald-400 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="truncate max-w-[110px]">{activeAudioText}</span>
              </span>
              <span className="text-[10px] text-slate-400">Audio</span>
            </div>
          ) : islandExpanded ? (
            <div className="w-full flex items-center justify-between text-[11px] px-1">
              <span className="flex items-center gap-1 text-amber-400">
                <Sparkles className="w-3 h-3" />
                <span>Día {currentDay}/30</span>
              </span>
              <span
                onClick={handleOpenStreakDetails}
                className="flex items-center gap-1 text-orange-400 font-bold hover:underline cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-amber-400" />
                <span>{streak}d</span>
              </span>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e] border border-white/20" />
              <div className="w-2 h-2 rounded-full bg-[#1c1c1e] border border-white/10" />
            </div>
          )}
        </div>

        {/* Right icons (Cellular, Wifi, Battery) */}
        <div className="flex items-center justify-end gap-1.5 text-slate-700 dark:text-slate-200">
          <span className="text-[10px] font-bold">5G</span>
          <Wifi className="w-3.5 h-3.5" />
          <BatteryMedium className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>

      {/* Streak Information Sheet Modal */}
      {showStreakModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xs rounded-3xl bg-[#F2F2F7] dark:bg-[#1c1c1e] p-5 border border-white/20 shadow-2xl space-y-4 text-center">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-orange-500 text-amber-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Racha Diaria
                </span>
              </div>
              <button
                onClick={() => setShowStreakModal(false)}
                className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Giant Flame Badge */}
            <div className="py-2">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-orange-500/25">
                <Flame className="w-10 h-10 text-white fill-white" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-3">
                {streak} {streak === 1 ? 'Día' : 'Días'}
              </h3>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                {completedToday ? '¡Racha mantenida hoy!' : 'Completa la lección de hoy para aumentarla'}
              </p>
            </div>

            {/* Status Card */}
            <div className="p-3 bg-white dark:bg-[#2c2c2e] rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-left space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">
                    Regla de Racha
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    Aumenta +1 cada día que completas una lección. Si descansas un día sin practicar, la racha vuelve a 0.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1.5 border-t border-slate-100 dark:border-slate-700/50">
                <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">
                    Estado de Hoy
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {completedToday
                      ? '✓ Ya completaste tu lección hoy. ¡Tu fuego está a salvo!'
                      : '⚡ Aún no has completado la lección de hoy. ¡Hazlo para mantener la racha!'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowStreakModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#007AFF] text-white font-bold text-xs hover:bg-blue-600 transition-colors shadow-xs"
            >
              ¡A practicar!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
