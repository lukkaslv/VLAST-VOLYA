import React, { useState, useEffect } from 'react';
import { View } from './types';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ReactionDrill } from './components/ReactionDrill';
import { MechanicalBody } from './components/MechanicalBody';
import { Protocols } from './components/Protocols';
import { Observer } from './components/Observer';
import { Manifesto } from './components/Manifesto';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isBooted, setIsBooted] = useState(false);
  const [bootText, setBootText] = useState('');

  useEffect(() => {
    const sequence = [
      'INITIALIZING CORE SYSTEM...',
      'LOADING MATRIX: VITALITY...',
      'LOADING MATRIX: POWER...',
      'LOADING MATRIX: LAW...',
      'LOADING MATRIX: SPIRIT...',
      'SYSTEM ONLINE.'
    ];
    let step = 0;
    
    const interval = setInterval(() => {
        if (step < sequence.length) {
            setBootText(sequence[step]);
            step++;
        } else {
            clearInterval(interval);
            setTimeout(() => setIsBooted(true), 500);
        }
    }, 400); // Speed of boot sequence

    return () => clearInterval(interval);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard onNavigate={setCurrentView} />;
      case View.MANIFESTO:
        return <Manifesto />;
      case View.REACTION:
        return <ReactionDrill />;
      case View.MECHANICAL:
        return <MechanicalBody />;
      case View.PROTOCOLS:
        return <Protocols />;
      case View.OBSERVER:
        return <Observer />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  if (!isBooted) {
      return (
          <div className="h-screen w-screen bg-black flex items-center justify-center p-8">
              <div className="max-w-md w-full font-mono">
                  <div className="text-zinc-500 text-xs mb-2 tracking-widest">BOOT_SEQUENCE // V.1.0.4</div>
                  <div className="text-green-500 text-xl font-bold tracking-tighter animate-pulse">
                      {bootText}
                  </div>
                  <div className="mt-8 h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-green-900 animate-pulse w-full origin-left"></div>
                  </div>
              </div>
          </div>
      )
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden animate-fade-in">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-1 relative h-screen overflow-hidden flex flex-col">
        {/* Header / Top Bar */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950/50 backdrop-blur-sm z-40">
            <div className="text-xs font-mono text-zinc-500 tracking-widest">
                STATUS: {currentView}
            </div>
            <div className="hidden md:flex items-center space-x-2 text-zinc-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <span className="text-[10px] uppercase font-mono text-green-500">System Online</span>
            </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-gradient-to-br from-zinc-950 to-zinc-900">
            {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;