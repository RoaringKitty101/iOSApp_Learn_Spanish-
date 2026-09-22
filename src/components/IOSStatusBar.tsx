import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Sparkles } from 'lucide-react';

interface IOSStatusBarProps {
  currentDay: number;
  streak: number;
  activeAudioText?: string | null;
}

export const IOSStatusBar: React.FC<IOSStatusBarProps> = ({ currentDay, streak, activeAudioText }) => {
  const [time, setTime] = useState('9:41');
  const [islandExpanded, setIslandExpanded] = useState(false);

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

  return (
    <div className="relative z-50 pt-2 pb-1 px-7 flex items-center justify-between select-none text-slate-800 dark:text-slate-100 font-semibold text-xs tracking-tight">
      {/* Left time */}
      <span className="w-12 text-left font-bold text-[13px]">{time}</span>

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
            <span className="text-amber-400 font-bold">🔥 {streak}d</span>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e] border border-white/20" />
            <div className="w-2 h-2 rounded-full bg-[#1c1c1e] border border-white/10" />
          </div>
        )}
      </div>

      {/* Right icons (Cellular, Wifi, Battery) */}
      <div className="w-12 flex items-center justify-end gap-1.5 text-slate-700 dark:text-slate-200">
        <span className="text-[10px] font-bold">5G</span>
        <Wifi className="w-3.5 h-3.5" />
        <BatteryMedium className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      </div>
    </div>
  );
};
