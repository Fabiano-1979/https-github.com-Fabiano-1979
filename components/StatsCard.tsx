import React from 'react';
import type { LotteryStat } from '../types';

interface StatsCardProps {
  title: string;
  stats: LotteryStat[];
  isLoading: boolean;
  color: string;
  unit?: string;
}

const StatSkeleton: React.FC = () => (
    <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-md animate-pulse">
        <div className="h-10 w-10 bg-slate-600 rounded-full"></div>
        <div className="flex flex-col items-end h-10">
            <div className="h-5 w-8 bg-slate-600 rounded mb-1"></div>
            <div className="h-3 w-12 bg-slate-600 rounded"></div>
        </div>
    </div>
);

export const StatsCard: React.FC<StatsCardProps> = ({ title, stats, isLoading, color, unit = 'vezes' }) => {
  return (
    <div className="bg-slate-800/60 p-6 rounded-2xl shadow-lg border border-slate-700 h-full backdrop-blur-sm">
      <h2 className={`text-2xl font-bold mb-4 ${color}`}>{title}</h2>
      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => <StatSkeleton key={index} />)
        ) : (
          stats.map((stat) => (
            <div key={stat.numero} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 hover:scale-[1.02] transition-all duration-200 cursor-default">
              <span className="text-xl font-mono font-bold bg-slate-800 h-10 w-10 flex items-center justify-center rounded-full border-2 border-slate-600">{String(stat.numero).padStart(2, '0')}</span>
              <div className="text-right">
                <p className="text-lg font-semibold text-slate-100">{stat.frequencia}</p>
                <p className="text-xs text-slate-400 uppercase">{unit}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};