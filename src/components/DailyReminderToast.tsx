import React, { useState, useEffect } from 'react';
import { Bell, Flame, X, ArrowRight, Clock } from 'lucide-react';
import { UserProgress } from '../types';
import { playHapticSound } from '../utils/audio';

interface DailyReminderToastProps {
  progress: UserProgress;
  onOpenLesson: (day: number) => void;
  triggerTest?: number; // timestamp to force show for testing
}

export const DailyReminderToast: React.FC<DailyReminderToastProps> = ({
  progress,
  onOpenLesson,
  triggerTest,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissedToday, setDismissedToday] = useState(false);

  const reminderEnabled = progress.dailyReminderEnabled !== false;
  const reminderTime = progress.dailyReminderTime || '20:00'; // Default 8:00 PM
  const isLessonCompletedToday = progress.completedDays.includes(progress.currentDay);

  // Format 24h to 12h readable string (e.g. 20:00 -> 8:00 PM)
  const formatTime12h = (time24: string) => {
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m < 10 ? '0' : ''}${m} ${period}`;
  };

  useEffect(() => {
    // If triggered manually via "Test Notification" button
    if (triggerTest) {
      setIsVisible(true);
      playHapticSound('success');
      return;
    }

    if (!reminderEnabled || isLessonCompletedToday || dismissedToday) {
      setIsVisible(false);
      return;
    }

    const checkReminderCondition = () => {
      const now = new Date();
      const [targetH, targetM] = reminderTime.split(':').map(Number);
      const currentH = now.getHours();
      const currentM = now.getMinutes();

      // Trigger if current time is at or past the configured reminder time (e.g. 8:00 PM)
      const isPastReminderTime =
        currentH > targetH || (currentH === targetH && currentM >= targetM);

      if (isPastReminderTime && !isLessonCompletedToday && !dismissedToday) {
        setIsVisible(true);
      }
    };

    checkReminderCondition();
    const interval = setInterval(checkReminderCondition, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [reminderEnabled, reminderTime, isLessonCompletedToday, dismissedToday, triggerTest]);

  if (!isVisible) return null;

  const handleAction = () => {
    playHapticSound('tap');
    setIsVisible(false);
    onOpenLesson(progress.currentDay);
  };

  const handleDismiss = () => {
    playHapticSound('tap');
    setIsVisible(false);
    setDismissedToday(true);
  };

  return (
    <div className="absolute top-12 left-3 right-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-slate-900/95 dark:bg-[#1c1c1e]/95 text-white p-3.5 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col gap-2.5">
        {/* iOS Push Notification Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#007AFF] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
              🇪🇸
            </div>
            <span className="text-[11px] font-bold tracking-tight text-slate-300 uppercase">
              Aprende • Recordatorio ({formatTime12h(reminderTime)})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Ahora</span>
            </span>
            <button
              onClick={handleDismiss}
              className="w-5 h-5 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors ml-1"
              aria-label="Cerrar aviso"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notification Body */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
            <Flame className="w-5 h-5 text-white fill-white animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>¡No olvides tu lección del Día {progress.currentDay}!</span>
              {progress.streak > 0 && (
                <span className="text-[10px] bg-orange-500/20 text-orange-300 font-semibold px-1.5 py-0.5 rounded-full border border-orange-500/30">
                  {progress.streak}d racha
                </span>
              )}
            </h4>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
              Son más de las {formatTime12h(reminderTime)} y aún no completas tu meta diaria. Dedica 10 minutos para mantener tu racha intacta.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/5">
          <button
            onClick={handleDismiss}
            className="px-3 py-1.5 rounded-xl text-slate-300 hover:text-white text-xs font-medium hover:bg-white/5 transition-colors"
          >
            Más tarde
          </button>
          <button
            onClick={handleAction}
            className="px-3.5 py-1.5 rounded-xl bg-[#007AFF] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span>Practicar Día {progress.currentDay}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
