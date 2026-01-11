import React, { useState, useEffect } from 'react';
import { Plus, Trash2, AlertTriangle, Terminal, PlayCircle, Save } from 'lucide-react';
import { ProtocolEntry } from '../types';
import { getProtocols, saveProtocol, deleteProtocol } from '../services/storage';

export const Protocols: React.FC = () => {
  const [protocols, setProtocols] = useState<ProtocolEntry[]>([]);
  const [trigger, setTrigger] = useState('');
  const [response, setResponse] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setProtocols(getProtocols());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trigger.trim() || !response.trim()) return;

    const newProtocol: ProtocolEntry = {
      id: crypto.randomUUID(),
      trigger: trigger.trim(),
      response: response.trim(),
      createdAt: Date.now(),
    };

    const updated = saveProtocol(newProtocol);
    setProtocols(updated);
    setTrigger('');
    setResponse('');
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = deleteProtocol(id);
    setProtocols(updated);
  };

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Left: Input & List */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
                <div>
                    <h2 className="text-2xl font-mono text-yellow-500 font-bold">ИНВЕНТАРИЗАЦИЯ ХАОСА</h2>
                </div>
                <button 
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-4 py-2 text-xs font-mono border border-zinc-700"
                >
                    <Plus size={14} />
                    {isFormOpen ? 'ОТМЕНА' : 'НОВЫЙ ПРОТОКОЛ'}
                </button>
            </div>

            {isFormOpen && (
                <form onSubmit={handleSave} className="bg-zinc-900/50 border border-zinc-800 p-6 space-y-4 animate-fade-in">
                    <div>
                        <label className="block text-xs font-mono text-red-400 mb-1">INPUT (ТРИГГЕР)</label>
                        <input 
                            type="text" 
                            value={trigger}
                            onChange={(e) => setTrigger(e.target.value)}
                            placeholder="Конкретное событие..."
                            className="w-full bg-black border border-zinc-700 text-zinc-200 p-3 focus:border-yellow-500 focus:outline-none placeholder-zinc-700 font-mono text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-cyan-400 mb-1">OUTPUT (АЛГОРИТМ)</label>
                        <textarea 
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            placeholder="Физическое действие..."
                            className="w-full bg-black border border-zinc-700 text-zinc-200 p-3 h-24 focus:border-yellow-500 focus:outline-none placeholder-zinc-700 resize-none font-mono text-sm"
                        />
                    </div>
                    <button type="submit" className="w-full bg-yellow-600/20 text-yellow-500 border border-yellow-600/50 py-3 font-mono font-bold hover:bg-yellow-600/40 transition-colors text-xs tracking-widest">
                        ЗАПИСАТЬ В BIOS
                    </button>
                </form>
            )}

            <div className="space-y-4">
                {protocols.length === 0 && !isFormOpen && (
                    <div className="text-center py-12 text-zinc-600">
                        <AlertTriangle className="mx-auto mb-2 opacity-20" size={48} />
                        <p className="font-mono text-sm">НЕТ ПРОТОКОЛОВ. СИСТЕМА УЯЗВИМА.</p>
                    </div>
                )}

                {protocols.map((p) => (
                    <div key={p.id} className="group relative bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-600 transition-colors">
                        <button 
                            onClick={() => handleDelete(p.id)}
                            className="absolute top-4 right-4 text-zinc-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="mb-4">
                            <span className="text-[10px] font-mono text-red-900 bg-red-950/30 px-2 py-1 border border-red-900/50 uppercase">IF (ЕСЛИ)</span>
                            <p className="text-zinc-300 mt-2 font-medium font-mono">{p.trigger}</p>
                        </div>
                        <div className="border-t border-zinc-900 pt-4">
                            <span className="text-[10px] font-mono text-cyan-900 bg-cyan-950/30 px-2 py-1 border border-cyan-900/50 uppercase">THEN (ТО)</span>
                            <p className="text-zinc-500 mt-2 font-mono text-sm">{p.response}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

       {/* Right: Coding Standards */}
       <div className="md:w-80 bg-zinc-900 border-l border-zinc-800 p-6 overflow-y-auto">
          <h3 className="font-mono font-bold text-yellow-500 mb-6 border-b border-zinc-800 pb-2">СИНТАКСИС КОДА</h3>
          
          <div className="space-y-8">
               <div>
                  <h4 className="flex items-center gap-2 font-bold text-xs text-white mb-2">
                      <Terminal size={14} /> 1. КОНКРЕТИЗАЦИЯ ВВОДА
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                      <span className="text-red-500 line-through mr-2">Плохо:</span> "Когда мне грустно" <br/>
                      <span className="text-green-500">Хорошо:</span> "Когда я чувствую ком в горле и желание лечь."<br/>
                      Триггер должен быть таким четким, чтобы его мог опознать датчик.
                  </p>
              </div>

              <div>
                  <h4 className="flex items-center gap-2 font-bold text-xs text-white mb-2">
                      <Save size={14} /> 2. ФИЗИЧЕСКИЙ СКРИПТ
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                      <span className="text-red-500 line-through mr-2">Плохо:</span> "Успокоиться" <br/>
                      <span className="text-green-500">Хорошо:</span> "Сделать 4 вдоха. Расслабить плечи. Выпить стакан воды."<br/>
                      Мозг в стрессе не понимает абстракций. Давай ему прямые команды на мышцы.
                  </p>
              </div>

              <div>
                  <h4 className="flex items-center gap-2 font-bold text-xs text-white mb-2">
                      <PlayCircle size={14} /> 3. КОМПИЛЯЦИЯ
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                      Просто записать недостаточно. После сохранения закрой глаза и проиграй этот сценарий в голове 3 раза с максимальной детализацией. Это запишет код в нейросеть.
                  </p>
              </div>
          </div>
      </div>

    </div>
  );
};