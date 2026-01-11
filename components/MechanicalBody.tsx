import React, { useState, useEffect } from 'react';
import { Move, Anchor, Fingerprint } from 'lucide-react';

export const MechanicalBody: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'IN' | 'HOLD' | 'OUT' | 'WAIT'>('IN');
  
  // A very slow cycle to enforce the 1.5x slowness rule.
  const CYCLE_DURATION = 6000; 

  useEffect(() => {
    let interval: number;

    if (isActive) {
      const cycle = () => {
        setPhase('IN');
        setTimeout(() => setPhase('HOLD'), CYCLE_DURATION);
        setTimeout(() => setPhase('OUT'), CYCLE_DURATION + 2000); // 2s hold
        setTimeout(() => setPhase('WAIT'), CYCLE_DURATION + 2000 + CYCLE_DURATION);
      };

      cycle();
      interval = window.setInterval(cycle, (CYCLE_DURATION * 2) + 4000);
    } else {
        setPhase('IN');
    }

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Active Zone */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
          <div className="max-w-xl w-full space-y-12 z-10">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl font-mono text-zinc-100 font-bold border-b border-zinc-800 pb-2">
                МЕХАНИЧЕСКОЕ ТЕЛО
              </h2>
            </div>

            <div className="flex flex-col items-center justify-center py-10">
                <div className="relative flex items-center justify-center">
                    {/* The Pacer Core */}
                    <div 
                        className={`
                            w-48 h-48 rounded-full border-2 flex items-center justify-center transition-all duration-[6000ms] ease-in-out
                            ${phase === 'IN' || phase === 'HOLD' ? 'w-64 h-64 border-zinc-100 bg-zinc-900' : 'w-24 h-24 border-zinc-800 bg-black'}
                            ${!isActive ? 'w-48 h-48 border-zinc-800' : ''}
                        `}
                    >
                        <div className={`
                            w-2 h-2 rounded-full bg-white transition-opacity duration-1000
                            ${phase === 'HOLD' ? 'opacity-100 shadow-[0_0_20px_white]' : 'opacity-20'}
                        `}></div>
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {isActive && (
                            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
                                {phase === 'IN' && 'РАСШИРЕНИЕ (ДВИЖЕНИЕ)'}
                                {phase === 'HOLD' && 'ФИКСАЦИЯ'}
                                {phase === 'OUT' && 'СЖАТИЕ (ВОЗВРАТ)'}
                                {phase === 'WAIT' && 'ПОКОЙ'}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button 
                    onClick={() => setIsActive(!isActive)}
                    className={`
                        font-mono px-8 py-4 text-sm tracking-widest border transition-all
                        ${isActive 
                            ? 'border-zinc-700 text-zinc-500 hover:text-white hover:border-white' 
                            : 'bg-zinc-100 text-black border-transparent hover:bg-zinc-300'}
                    `}
                >
                    {isActive ? 'ОСТАНОВИТЬ ГЕНЕРАТОР' : 'ЗАПУСТИТЬ РИТМ'}
                </button>
            </div>
          </div>
      </div>

      {/* Manual */}
      <div className="md:w-80 bg-zinc-900 border-l border-zinc-800 p-6 overflow-y-auto">
          <h3 className="font-mono font-bold text-red-500 mb-6 border-b border-zinc-800 pb-2">КИНЕМАТИКА ДВИЖЕНИЯ</h3>
          
          <div className="space-y-8">
               <div>
                  <h4 className="flex items-center gap-2 font-bold text-xs text-white mb-2">
                      <Anchor size={14} /> 1. ПРИНЦИП ГИДРАВЛИКИ
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed border-l border-zinc-700 pl-3">
                      Выбери простое действие: поднять руку, взять телефон, повернуть голову. 
                      Запусти ритм. Твое движение должно длиться ровно столько, сколько расширяется круг (6 секунд).
                      Никаких рывков. Ты — тяжелая гидравлическая машина.
                  </p>
              </div>

              <div>
                  <h4 className="flex items-center gap-2 font-bold text-xs text-white mb-2">
                      <Fingerprint size={14} /> 2. ПОДАВЛЕНИЕ МИКРО-ДВИЖЕНИЙ
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed border-l border-zinc-700 pl-3">
                      В фазе «ПОКОЙ» ты должен замереть абсолютно. Если почесал нос, дернул ногой или моргнул слишком быстро — цикл провален.
                      Контролируй кончики пальцев. Они не должны дрожать.
                  </p>
              </div>

              <div>
                  <h4 className="flex items-center gap-2 font-bold text-xs text-white mb-2">
                      <Move size={14} /> 3. ЛИНЕЙНОСТЬ
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed border-l border-zinc-700 pl-3">
                      Траектория движения должна быть идеальной прямой или идеальной дугой. 
                      Суета — это лишние углы. Убирай паразитные движения плечами и шеей. Работает только нужный сустав.
                  </p>
              </div>
          </div>
      </div>

    </div>
  );
};