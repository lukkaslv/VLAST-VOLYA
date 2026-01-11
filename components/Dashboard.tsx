import React, { useEffect, useState } from 'react';
import { View, ReactionStats } from '../types';
import { Activity, Brain, Scale, Sword, TrendingUp } from 'lucide-react';
import { getReactionStats } from '../services/storage';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<ReactionStats | null>(null);

  useEffect(() => {
    setStats(getReactionStats());
  }, []);

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-5xl mx-auto animate-fade-in pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter text-white">ДИАГНОСТИКА</h2>
            <p className="text-zinc-400 max-w-2xl">
            Ты хочешь «холодной силы», потому что сейчас ты обожжен хаосом своих реакций.
            Выбери инструмент для восстановления контроля.
            </p>
        </div>
        
        {stats && stats.total > 0 && (
             <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-sm flex gap-6">
                <div>
                    <div className="text-[10px] uppercase text-zinc-500 font-mono">Лучшая реакция</div>
                    <div className="text-xl font-mono text-cyan-400">{stats.best} мс</div>
                </div>
                <div>
                    <div className="text-[10px] uppercase text-zinc-500 font-mono">Средняя ({stats.total})</div>
                    <div className="text-xl font-mono text-zinc-300">{stats.average} мс</div>
                </div>
             </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vitality Matrix */}
        <div 
          onClick={() => onNavigate(View.MECHANICAL)}
          className="group relative p-6 bg-zinc-900/50 border border-zinc-800 hover:border-red-500/50 transition-all cursor-pointer rounded-sm"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500/20 group-hover:bg-red-500 transition-colors"></div>
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-mono text-xl text-zinc-200 group-hover:text-red-400">МАТРИЦА ВИТАЛЬНОСТИ</h3>
            <Activity className="text-zinc-600 group-hover:text-red-500" />
          </div>
          <p className="text-sm text-zinc-500 mb-4">
            Твое тело — неисправный генератор. Суета сжирает ресурс.
          </p>
          <div className="text-xs font-mono text-zinc-400 bg-zinc-950 p-2 inline-block">
            ПРОТОКОЛ: МЕХАНИЧЕСКОЕ ТЕЛО
          </div>
        </div>

        {/* Power Matrix */}
        <div 
          onClick={() => onNavigate(View.REACTION)}
          className="group relative p-6 bg-zinc-900/50 border border-zinc-800 hover:border-cyan-500/50 transition-all cursor-pointer rounded-sm"
        >
           <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20 group-hover:bg-cyan-500 transition-colors"></div>
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-mono text-xl text-zinc-200 group-hover:text-cyan-400">МАТРИЦА ВЛАСТИ</h3>
            <Sword className="text-zinc-600 group-hover:text-cyan-500" />
          </div>
          <p className="text-sm text-zinc-500 mb-4">
            Эмоции имеют власть над тобой. Верни контроль через паузу.
          </p>
          <div className="text-xs font-mono text-zinc-400 bg-zinc-950 p-2 inline-block">
            ПРОТОКОЛ: ЗАДЕРЖКА РЕАКЦИИ
          </div>
        </div>

        {/* Law Matrix */}
        <div 
          onClick={() => onNavigate(View.PROTOCOLS)}
          className="group relative p-6 bg-zinc-900/50 border border-zinc-800 hover:border-yellow-500/50 transition-all cursor-pointer rounded-sm"
        >
           <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors"></div>
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-mono text-xl text-zinc-200 group-hover:text-yellow-400">МАТРИЦА ЗАКОНА</h3>
            <Scale className="text-zinc-600 group-hover:text-yellow-500" />
          </div>
          <p className="text-sm text-zinc-500 mb-4">
            Суета от незнания правил. Установи свои законы реагирования.
          </p>
          <div className="text-xs font-mono text-zinc-400 bg-zinc-950 p-2 inline-block">
            ПРОТОКОЛ: ИНВЕНТАРИЗАЦИЯ
          </div>
        </div>

        {/* Spirit Matrix */}
        <div 
           onClick={() => onNavigate(View.OBSERVER)}
           className="group relative p-6 bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 transition-all cursor-pointer rounded-sm"
        >
           <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/20 group-hover:bg-purple-500 transition-colors"></div>
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-mono text-xl text-zinc-200 group-hover:text-purple-400">МАТРИЦА ДУХА</h3>
            <Brain className="text-zinc-600 group-hover:text-purple-500" />
          </div>
          <p className="text-sm text-zinc-500 mb-4">
            Твое "Я" на периферии. Выйди из тела и смотри со стороны.
          </p>
          <div className="text-xs font-mono text-zinc-400 bg-zinc-950 p-2 inline-block">
            ПРОТОКОЛ: ВЗГЛЯД НАБЛЮДАТЕЛЯ
          </div>
        </div>
      </div>
    </div>
  );
};