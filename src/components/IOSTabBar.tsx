import React from 'react';
import { CalendarCheck, Map, Layers, Bot, User } from 'lucide-react';
import { TabType } from '../types';
import { playHapticSound } from '../utils/audio';

interface IOSTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  uncompletedCardsCount?: number;
}

export const IOSTabBar: React.FC<IOSTabBarProps> = ({
  activeTab,
  onTabChange,
  uncompletedCardsCount = 0,
}) => {
  const tabs = [
    { id: 'today' as TabType, label: 'Hoy', icon: CalendarCheck },
    { id: 'curriculum' as TabType, label: '30 Días', icon: Map },
    { id: 'flashcards' as TabType, label: 'Tarjetas', icon: Layers, badge: uncompletedCardsCount > 0 ? uncompletedCardsCount : undefined },
    { id: 'tutor' as TabType, label: 'Sofía AI', icon: Bot, isAITag: true },
    { id: 'profile' as TabType, label: 'Progreso', icon: User },
  ];

  const handleSelect = (tab: TabType) => {
    if (tab !== activeTab) {
      playHapticSound('tap');
      onTabChange(tab);
    }
  };

  return (
    <nav aria-label="Navegación principal" className="w-full bg-[#f8f9fc]/90 dark:bg-[#16171d]/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 pt-2 pb-5 px-3 z-40 select-none">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 transition-colors duration-200 group ${
                isActive ? 'text-[#007AFF]' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4px]' : 'stroke-[1.8px] group-hover:scale-105'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-sm">
                    {tab.badge}
                  </span>
                )}
                {tab.isAITag && !isActive && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium tracking-tight ${isActive ? 'font-bold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2" />
    </nav>
  );
};
