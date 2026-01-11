import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Scan, Crosshair, MapPin, Monitor, Layers, Radio } from 'lucide-react';

export const Observer: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 Hour cooldown
  const [isObservationMode, setIsObservationMode] = useState(false);
  const [obsTimeLeft, setObsTimeLeft] = useState(60); // 60 seconds active phase
  const [currentInstruction, setCurrentInstruction] = useState('');

  // Instructions cycle based on remaining observation time
  useEffect(() => {
    if (!isObservationMode) return;

    if (obsTimeLeft > 45) {
      setCurrentInstruction("ФАЗА 1: РАЗРЫВ СВЯЗИ. Представь, что камера находится в углу потолка. Посмотри на себя со стороны. Ты — просто объект в комнате.");
    } else if (obsTimeLeft > 30) {
      setCurrentInstruction("ФАЗА 2: ТЕЛЕМЕТРИЯ. Просканируй «объект» на стуле. Где зажимы? Плечи подняты? Челюсть сжата? Нога дергается? Выпрями структуру.");
    } else if (obsTimeLeft > 15) {
      setCurrentInstruction("ФАЗА 3: АНАЛИЗ ПРОЦЕССОВ. Какую эмоцию испытывает объект? Назови её (Скука? Раздражение? Интерес?). Не чувствуй, а фиксируй факт.");
    } else {
      setCurrentInstruction("ФАЗА 4: СИНХРОНИЗАЦИЯ. Вернись в тело. Сохрани холод отстраненности. Ты — водитель, тело — машина. Власть восстановлена.");
    }
  }, [obsTimeLeft, isObservationMode]);

  useEffect(() => {
    let interval: number;

    if (isActive) {
      interval = window.setInterval(() => {
        if (isObservationMode) {
          setObsTimeLeft((prev) => {
            if (prev <= 1) {
              setIsObservationMode(false);
              setTimeLeft(3600);
              return 60;
            }
            return prev - 1;
          });
        } else {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              setIsObservationMode(true);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isObservationMode]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startNow = () => {
      setIsActive(true);
      setTimeLeft(0); // Force trigger
  };

  return (
    <div className={`h-full flex flex-col md:flex-row transition-colors duration-1000 ${isObservationMode ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-950 text-zinc-100'}`}>
      
      {/* Left Panel: Active Interface */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Grid for aesthetic */}
        <div className={`absolute inset-0 opacity-10 pointer-events-none ${isObservationMode ? 'bg-[url("https://www.transparenttextures.com/patterns/graphy.png")] invert' : 'bg-[url("https://www.transparenttextures.com/patterns/graphy.png")]'}`}></div>

        <div className="max-w-md w-full text-center space-y-12 z-10">
            <div>
            <h2 className="text-2xl font-mono font-bold tracking-tighter uppercase flex items-center justify-center gap-3">
                {isObservationMode ? <Scan className="animate-spin-slow" /> : <EyeOff />}
                {isObservationMode ? 'СКАНИРОВАНИЕ ОБЪЕКТА' : 'РЕЖИМ ОЖИДАНИЯ'}
            </h2>
            <div className="h-1 w-full bg-current mt-4 opacity-20 rounded-full overflow-hidden">
                {isObservationMode && (
                    <div className="h-full bg-red-500 animate-pulse w-full origin-left transition-transform duration-1000" style={{ transform: `scaleX(${obsTimeLeft / 60})` }}></div>
                )}
            </div>
            </div>

            <div className="relative h-64 flex items-center justify-center">
                {isObservationMode ? (
                    <div className="relative w-64 h-64 border-2 border-zinc-900/20 rounded-sm p-4 flex flex-col items-center justify-center">
                         {/* Scanning Line Animation */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
                        
                        <div className="text-4xl font-mono font-bold mb-2">{obsTimeLeft}</div>
                        <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">Сбор данных...</div>
                        
                        <div className="absolute -bottom-12 w-full text-center">
                             <p className="text-sm font-bold font-mono animate-fade-in text-zinc-800 bg-white/50 p-2 border border-zinc-300 shadow-sm">
                                {currentInstruction}
                             </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="text-6xl font-mono font-bold text-zinc-600">
                            {formatTime(timeLeft)}
                        </div>
                        <div className="text-xs font-mono uppercase tracking-widest text-zinc-700">
                            ДО СЛЕДУЮЩЕЙ ПРОВЕРКИ
                        </div>
                    </div>
                )}
            </div>

            {!isObservationMode && (
                <div className="flex gap-4 justify-center">
                    <button 
                        onClick={() => setIsActive(!isActive)}
                        className={`px-6 py-3 font-mono text-xs tracking-widest border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-400 transition-all`}
                    >
                        {isActive ? 'ПАУЗА ТАЙМЕРА' : 'ЗАПУСТИТЬ ФОНОВЫЙ РЕЖИМ'}
                    </button>
                    <button 
                        onClick={startNow}
                        className="px-6 py-3 font-mono text-xs tracking-widest bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all flex items-center gap-2"
                    >
                        <Crosshair size={14} />
                        ПРИНУДИТЕЛЬНЫЙ СКАН
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Right Panel: Algorithm */}
      <div className={`md:w-80 p-6 border-t md:border-t-0 md:border-l border-zinc-800 flex flex-col overflow-y-auto ${isObservationMode ? 'bg-zinc-100 border-zinc-300' : 'bg-zinc-900/50'}`}>
          <h3 className="font-mono font-bold text-lg mb-6 flex items-center gap-2 border-b border-zinc-700/20 pb-2">
              <MapPin size={18} />
              АЛГОРИТМ ДИССОЦИАЦИИ
          </h3>
          
          <div className="space-y-8">
              <div>
                  <h4 className="flex items-center gap-2 font-bold text-xs uppercase mb-2">
                      <Monitor size={14} /> 1. Экран как Зеркало
                  </h4>
                  <p className="text-xs opacity-70 leading-relaxed font-mono">
                      В момент запуска сканера зафиксируй взгляд в центре экрана. Представь, что монитор — это прозрачное стекло, за которым сидит твой двойник. Твое сознание переходит в стекло.
                  </p>
              </div>

              <div>
                  <h4 className="flex items-center gap-2 font-bold text-xs uppercase mb-2">
                      <Layers size={14} /> 2. Слой Эмоций
                  </h4>
                  <p className="text-xs opacity-70 leading-relaxed font-mono">
                      Никогда не говори "Мне скучно". Говори: "Система регистрирует снижение дофамина". Превращай чувства в показания приборов. На приборы нельзя обижаться, их можно только калибровать.
                  </p>
              </div>

              <div>
                  <h4 className="flex items-center gap-2 font-bold text-xs uppercase mb-2">
                      <Radio size={14} /> 3. Вход в Аватар
                  </h4>
                  <p className="text-xs opacity-70 leading-relaxed font-mono">
                      По окончании таймера (Фаза 4) ты не просто "расслабляешься". Ты надеваешь свое тело как скафандр. Проверь рычаги управления (пальцы, шея). Теперь ты пилот, а не пассажир.
                  </p>
              </div>
          </div>
      </div>

      <style>{`
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};