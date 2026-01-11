import React, { useState, useEffect, useRef } from 'react';
import { saveReactionResult } from '../services/storage';
import { ShieldCheck, Wind, ZapOff, CheckCircle } from 'lucide-react';

type State = 'IDLE' | 'WAITING_FOR_STIMULUS' | 'STIMULUS_ACTIVE' | 'HOLDING' | 'SUCCESS' | 'FAILURE';

export const ReactionDrill: React.FC = () => {
  const [gameState, setGameState] = useState<State>('IDLE');
  const [holdProgress, setHoldProgress] = useState(0);
  const [message, setMessage] = useState('НАЖМИ СТАРТ ДЛЯ КАЛИБРОВКИ');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const stimulusTimeRef = useRef<number>(0);

  const REQUIRED_HOLD_TIME_MS = 3000;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startDrill = () => {
    setGameState('WAITING_FOR_STIMULUS');
    setHoldProgress(0);
    setReactionTime(null);
    setMessage('ЖДИ СИГНАЛ...');
    
    // Random delay between 2 and 6 seconds
    const delay = Math.random() * 4000 + 2000;
    
    timeoutRef.current = window.setTimeout(() => {
      setGameState('STIMULUS_ACTIVE');
      stimulusTimeRef.current = Date.now();
      setMessage('! СИГНАЛ ! НЕ РЕАГИРУЙ МГНОВЕННО');
    }, delay);
  };

  const handleInteraction = () => {
    if (gameState === 'WAITING_FOR_STIMULUS') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState('FAILURE');
      setMessage('ФАЛЬСТАРТ. ТЫ СУЕТИШЬСЯ.');
      return;
    }

    if (gameState === 'STIMULUS_ACTIVE') {
      const reactionMs = Date.now() - stimulusTimeRef.current;
      
      // If reaction is superhumanly fast (<100ms), it's likely a guess/accident
      if (reactionMs < 100) {
          setGameState('FAILURE');
          setMessage('СЛИШКОМ БЫСТРО. ЭТО УГАДАЙКА, А НЕ РЕАКЦИЯ.');
          return;
      }

      setReactionTime(reactionMs);

      // User pressed button. Now they must WAIT 3 seconds mentally (visualized here for training)
      setGameState('HOLDING');
      setMessage('ДЕРЖИ ПАУЗУ. ДЫШИ.');
      
      const startTime = Date.now();
      
      intervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / REQUIRED_HOLD_TIME_MS) * 100, 100);
        setHoldProgress(progress);

        if (elapsed >= REQUIRED_HOLD_TIME_MS) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setGameState('SUCCESS');
          saveReactionResult(reactionMs); // Save the reaction time, not the hold time
          setMessage('ВЛАСТЬ ВОССТАНОВЛЕНА. ОТВЕТ РАЗРЕШЕН.');
        }
      }, 50);
    }
  };

  const handleRelease = () => {
      // In a real physical scenario, releasing implies "Action". 
      // Here, if they release before the bar fills, they failed the 3-second rule.
      if (gameState === 'HOLDING') {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setGameState('FAILURE');
          setMessage('СРЫВ. ТЫ НЕ ВЫДЕРЖАЛ 3 СЕКУНДЫ.');
      }
  };

  const reset = () => {
    setGameState('IDLE');
    setHoldProgress(0);
    setReactionTime(null);
    setMessage('НАЖМИ СТАРТ');
  };

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Left: Active Zone */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-zinc-950 relative">
        <div className="w-full max-w-lg space-y-8 z-10">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-mono text-cyan-500 font-bold">ПРОТОКОЛ: ЗАДЕРЖКА</h2>
                <p className="text-zinc-500 text-sm">
                    Между стимулом и реакцией должна быть пауза. 
                </p>
            </div>

            <div className={`
                relative w-full aspect-square md:aspect-video rounded-none border-2 flex items-center justify-center transition-all duration-300
                ${gameState === 'IDLE' ? 'border-zinc-800 bg-zinc-900' : ''}
                ${gameState === 'WAITING_FOR_STIMULUS' ? 'border-zinc-700 bg-zinc-950' : ''}
                ${gameState === 'STIMULUS_ACTIVE' ? 'border-red-600 bg-red-950/20 animate-pulse' : ''}
                ${gameState === 'HOLDING' ? 'border-cyan-600 bg-cyan-950/20' : ''}
                ${gameState === 'SUCCESS' ? 'border-green-600 bg-green-950/20' : ''}
                ${gameState === 'FAILURE' ? 'border-red-600 bg-red-900' : ''}
            `}>
                
                {gameState === 'IDLE' && (
                    <button onClick={startDrill} className="px-8 py-3 bg-zinc-100 text-zinc-950 font-bold hover:bg-zinc-300 transition-colors tracking-widest font-mono">
                        НАЧАТЬ
                    </button>
                )}

                {(gameState === 'STIMULUS_ACTIVE' || gameState === 'HOLDING') && (
                    <button 
                        onMouseDown={handleInteraction}
                        onTouchStart={handleInteraction}
                        onMouseUp={handleRelease}
                        onTouchEnd={handleRelease}
                        className="w-48 h-48 rounded-full border border-zinc-500 flex items-center justify-center hover:bg-zinc-800 active:bg-zinc-700 transition-colors cursor-pointer touch-manipulation"
                    >
                        <span className="font-mono text-xs select-none">КОНТАКТ</span>
                    </button>
                )}

                {gameState === 'HOLDING' && (
                    <div className="absolute bottom-0 left-0 h-2 bg-cyan-500 transition-all ease-linear" style={{ width: `${holdProgress}%` }}></div>
                )}

                {gameState === 'SUCCESS' && (
                    <div className="text-center animate-fade-in">
                        <h3 className="text-sm font-mono text-green-500 mb-2">РЕАКЦИЯ: {reactionTime} мс</h3>
                        <h2 className="text-2xl font-bold text-white mb-4">КОНТРОЛЬ</h2>
                        <button onClick={reset} className="text-xs border border-zinc-600 px-4 py-2 hover:bg-zinc-800">
                            ПОВТОРИТЬ
                        </button>
                    </div>
                )}

                {gameState === 'FAILURE' && (
                    <div className="text-center animate-pulse">
                        <h3 className="text-2xl font-bold text-white mb-4">ХАОС</h3>
                        <button onClick={reset} className="text-xs border border-white px-4 py-2 hover:bg-white hover:text-black">
                            ПОВТОРИТЬ
                        </button>
                    </div>
                )}
            </div>

            <div className="text-center min-h-[60px]">
                <p className={`font-mono text-sm tracking-widest ${gameState === 'FAILURE' ? 'text-red-400' : 'text-zinc-400'}`}>
                    {message}
                </p>
            </div>
        </div>
      </div>

      {/* Right: Algorithm */}
      <div className="md:w-80 bg-zinc-900 border-l border-zinc-800 p-6 overflow-y-auto">
          <h3 className="font-mono font-bold text-cyan-500 mb-6 border-b border-zinc-800 pb-2">АЛГОРИТМ ИСПОЛНЕНИЯ</h3>
          
          <div className="space-y-6">
              <div className="flex gap-3">
                  <div className="mt-1"><ShieldCheck className="w-4 h-4 text-zinc-500" /></div>
                  <div>
                      <h4 className="font-bold text-xs text-white mb-1">1. ПОЗИЦИЯ СНАЙПЕРА</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                          Сядь прямо. Стопы плотно прижаты к полу. Рука на мышке/экране расслаблена. Ты не ждешь в напряжении, ты находишься в «нулевой точке».
                      </p>
                  </div>
              </div>

              <div className="flex gap-3">
                  <div className="mt-1"><ZapOff className="w-4 h-4 text-zinc-500" /></div>
                  <div>
                      <h4 className="font-bold text-xs text-white mb-1">2. СТИМУЛ = СТОП</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                          Когда экран вспыхнет красным — твоя задача НЕ нажать кнопку. Твоя задача — сделать короткий резкий вдох носом. Это перехват инициативы.
                      </p>
                  </div>
              </div>

              <div className="flex gap-3">
                  <div className="mt-1"><Wind className="w-4 h-4 text-zinc-500" /></div>
                  <div>
                      <h4 className="font-bold text-xs text-white mb-1">3. ПУСТОТА (3 СЕКУНДЫ)</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                          Во время удержания кнопки (полоса загрузки) ты должен быть пуст. Никаких мыслей. Только выдох. Ты не терпишь, ты властвуешь над временем.
                      </p>
                  </div>
              </div>

              <div className="flex gap-3">
                  <div className="mt-1"><CheckCircle className="w-4 h-4 text-zinc-500" /></div>
                  <div>
                      <h4 className="font-bold text-xs text-white mb-1">4. ВЫСТРЕЛ</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                          Только когда полоса заполнится, ты позволяешь себе ментально «ответить» или физически отпустить кнопку. Это осознанное действие, а не рефлекс.
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};