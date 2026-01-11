import React from 'react';
import { View } from '../types';
import { ShieldAlert, Zap, Book, Eye, LayoutDashboard, FileText } from 'lucide-react';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { view: View.DASHBOARD, label: 'МАТРИЦЫ', icon: LayoutDashboard },
    { view: View.MANIFESTO, label: 'МАНИФЕСТ (ВЫГОДЫ)', icon: FileText },
    { view: View.REACTION, label: 'ВЛАСТЬ (ПАУЗА)', icon: ShieldAlert },
    { view: View.MECHANICAL, label: 'ВИТАЛЬНОСТЬ (ТЕМП)', icon: Zap },
    { view: View.PROTOCOLS, label: 'ЗАКОН (ПРОТОКОЛ)', icon: Book },
    { view: View.OBSERVER, label: 'ДУХ (НАБЛЮДАТЕЛЬ)', icon: Eye },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 pb-safe md:relative md:w-64 md:h-screen md:border-r md:border-t-0 flex flex-row md:flex-col z-50">
      <div className="hidden md:flex p-6 border-b border-zinc-800">
        <h1 className="font-mono text-lg font-bold tracking-tighter text-zinc-100">
          ТОЧКА<br />СБОРКИ
        </h1>
      </div>
      <div className="flex flex-1 justify-around md:justify-start md:flex-col md:p-4 gap-1 md:gap-2 overflow-x-auto md:overflow-visible">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`
              flex flex-col md:flex-row items-center md:px-4 md:py-3 rounded-md transition-all duration-200 min-w-[60px] md:min-w-0
              ${
                currentView === item.view
                  ? 'text-cyan-400 bg-zinc-900'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
              }
            `}
          >
            <item.icon className="w-5 h-5 mb-1 md:mb-0 md:mr-3" />
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};