import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, Clock, Target, BarChart3, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '../types';
import { playHapticSound } from '../utils/audio';

interface StatsSectionProps {
  progress: UserProgress;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ progress }) => {
  const [activeChart, setActiveChart] = useState<'cumulative' | 'weekly'>('cumulative');

  const completedCount = progress.completedDays.length;
  const percentComplete = Math.round((completedCount / 30) * 100);

  // Average quiz score
  const scoreEntries = Object.values(progress.quizScores);
  const avgScore = scoreEntries.length > 0
    ? Math.round(scoreEntries.reduce((a, b) => a + b, 0) / scoreEntries.length)
    : 0;

  // Generate 30-day cumulative progress curve data
  const cumulativeData = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const isCompleted = progress.completedDays.includes(day);
    const completedUpToDay = progress.completedDays.filter((d) => d <= day).length;
    const userPercent = Math.round((completedUpToDay / 30) * 100);
    const targetPercent = Math.round((day / 30) * 100);

    return {
      day: `D${day}`,
      dayNum: day,
      progress: userPercent,
      target: targetPercent,
      completed: isCompleted,
    };
  });

  // Weekly aggregate data
  const weeklyData = [
    {
      week: 'Wk 1',
      daysCompleted: progress.completedDays.filter((d) => d >= 1 && d <= 7).length,
      totalDays: 7,
      minutes: progress.completedDays.filter((d) => d >= 1 && d <= 7).length * 15,
      level: 'A1 Essentials',
    },
    {
      week: 'Wk 2',
      daysCompleted: progress.completedDays.filter((d) => d >= 8 && d <= 14).length,
      totalDays: 7,
      minutes: progress.completedDays.filter((d) => d >= 8 && d <= 14).length * 15,
      level: 'A2 Daily Life',
    },
    {
      week: 'Wk 3',
      daysCompleted: progress.completedDays.filter((d) => d >= 15 && d <= 21).length,
      totalDays: 7,
      minutes: progress.completedDays.filter((d) => d >= 15 && d <= 21).length * 15,
      level: 'A2+ Past & Future',
    },
    {
      week: 'Wk 4',
      daysCompleted: progress.completedDays.filter((d) => d >= 22 && d <= 30).length,
      totalDays: 9,
      minutes: progress.completedDays.filter((d) => d >= 22 && d <= 30).length * 15,
      level: 'B1 Fluency',
    },
  ];

  // Custom iOS-styled tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 dark:bg-black/95 text-white p-2.5 rounded-xl border border-white/10 shadow-xl text-xs backdrop-blur-md space-y-1">
          <p className="font-bold text-slate-300 text-[11px]">{label}</p>
          {payload.map((item: any, idx: number) => {
            const displayName =
              item.name === 'progress'
                ? 'Your Progress'
                : item.name === 'target'
                ? 'Pacing Target'
                : item.name === 'daysCompleted'
                ? 'Days Finished'
                : item.name === 'minutes'
                ? 'Study Time'
                : item.name;

            const unit =
              item.name === 'progress' || item.name === 'target'
                ? '%'
                : item.name === 'minutes'
                ? ' min'
                : ' days';

            return (
              <div key={idx} className="flex items-center justify-between gap-3 text-[11px]">
                <span className="flex items-center gap-1.5" style={{ color: item.color || item.fill }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
                  <span>{displayName}:</span>
                </span>
                <span className="font-bold font-mono">
                  {item.value}{unit}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#1c1c1e] p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#007AFF] flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Learning Analytics
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Visualizing your 30-day curriculum mastery
            </p>
          </div>
        </div>

        {/* Chart View Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-[11px]">
          <button
            id="stats-cumulative-tab-btn"
            onClick={() => {
              playHapticSound('tap');
              setActiveChart('cumulative');
            }}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeChart === 'cumulative'
                ? 'bg-white dark:bg-[#2c2c2e] text-[#007AFF] shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            30D Curve
          </button>

          <button
            id="stats-weekly-tab-btn"
            onClick={() => {
              playHapticSound('tap');
              setActiveChart('weekly');
            }}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeChart === 'weekly'
                ? 'bg-white dark:bg-[#2c2c2e] text-[#007AFF] shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
            <Target className="w-3 h-3 text-[#007AFF]" />
            <span>Course Progress</span>
          </div>
          <p className="text-base font-black text-slate-900 dark:text-white mt-0.5 font-mono">
            {percentComplete}%
          </p>
          <span className="text-[9px] text-slate-500">{completedCount} of 30 days</span>
        </div>

        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
            <Clock className="w-3 h-3 text-emerald-500" />
            <span>Study Time</span>
          </div>
          <p className="text-base font-black text-slate-900 dark:text-white mt-0.5 font-mono">
            {progress.totalMinutesPracticed}
            <span className="text-xs font-normal text-slate-500 ml-0.5">m</span>
          </p>
          <span className="text-[9px] text-emerald-600 dark:text-emerald-400">~15m / lesson</span>
        </div>

        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
            <TrendingUp className="w-3 h-3 text-amber-500" />
            <span>Quiz Score</span>
          </div>
          <p className="text-base font-black text-slate-900 dark:text-white mt-0.5 font-mono">
            {avgScore}%
          </p>
          <span className="text-[9px] text-amber-600 dark:text-amber-400">Avg accuracy</span>
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="w-full h-48 pt-2">
        {activeChart === 'cumulative' ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cumulativeData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#007AFF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#007AFF" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8E8E93" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8E8E93" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: '#8E8E93' }}
                interval={4}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#8E8E93' }}
                domain={[0, 100]}
                unit="%"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              {/* Target benchmark dashed curve */}
              <Area
                type="monotone"
                dataKey="target"
                name="target"
                stroke="#8E8E93"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#targetGrad)"
              />
              {/* Actual user progress curve */}
              <Area
                type="monotone"
                dataKey="progress"
                name="progress"
                stroke="#007AFF"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#progressGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 10, fill: '#8E8E93' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#8E8E93' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="daysCompleted"
                name="daysCompleted"
                fill="#007AFF"
                radius={[6, 6, 0, 0]}
                maxBarSize={36}
              />
              <Bar
                dataKey="minutes"
                name="minutes"
                fill="#34C759"
                radius={[6, 6, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Milestones Legend */}
      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800 text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#007AFF]" />
          <span>Your Progress</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-slate-400 border-t border-dashed" />
          <span>Recommended Pacing</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
          <CheckCircle2 className="w-3 h-3" />
          <span>B1 at Day 30</span>
        </div>
      </div>
    </div>
  );
};
