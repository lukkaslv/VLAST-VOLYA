import React from 'react';
import { MousePointer2, Shield, Terminal, Cpu, BrainCircuit, Users, Zap, Anchor } from 'lucide-react';

export const Manifesto: React.FC = () => {
  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto animate-fade-in pb-24 space-y-12">
      
      <div className="space-y-4 border-b border-zinc-800 pb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">НЕЙРО-ИНТЕРФЕЙС: ОТ ПК К РЕАЛЬНОСТИ</h2>
        <p className="text-zinc-400 max-w-2xl text-lg">
          Ты тренируешься, сидя за компьютером. Но ты не качаешь палец. Ты перепрошиваешь нейронные цепи торможения. 
          Мозгу все равно, что контролировать — клик мыши или удар кулаком. Механизм один.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: The Mouse as a Trigger */}
        <div className="bg-zinc-900/30 p-8 border border-zinc-800 space-y-4 hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 bg-cyan-900/20 flex items-center justify-center rounded-sm border border-cyan-900/50">
                <MousePointer2 className="text-cyan-400" size={20} />
             </div>
             <h3 className="text-lg font-mono font-bold text-zinc-200">МЫШЬ = СПУСКОВОЙ КРЮЧОК</h3>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-800 pl-4">
            <strong className="text-cyan-500 block mb-2">Механизм переноса:</strong>
            В упражнении «Задержка» ты учишься не нажимать кнопку сразу после сигнала. Ты тренируешь «мышцу отказа».
            <br/><br/>
            <strong className="text-white block mb-2">Выгода в жизни:</strong>
            Когда в реальности на тебя наорут, сработает тот же нейронный паттерн. Ты не «взорвешься» в ответ. Твоя пауза в 3 секунды станет автоматической. Ты будешь смотреть на агрессора как на глючный код.
          </p>
        </div>

        {/* Card 2: Static Posture */}
        <div className="bg-zinc-900/30 p-8 border border-zinc-800 space-y-4 hover:border-red-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 bg-red-900/20 flex items-center justify-center rounded-sm border border-red-900/50">
                <Anchor className="text-red-400" size={20} />
             </div>
             <h3 className="text-lg font-mono font-bold text-zinc-200">СТАТИКА ОПЕРАТОРА</h3>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-800 pl-4">
            <strong className="text-red-500 block mb-2">Механизм переноса:</strong>
            Сидя за ПК, ты обычно дергаешь ногой, сутулишься или теребишь лицо. Приложение требует полной неподвижности и медленных движений курсора.
            <br/><br/>
            <strong className="text-white block mb-2">Выгода в жизни:</strong>
            Это называется «Тяжелое Присутствие». В переговорах побеждает тот, кто меньше двигается. Ты научишься сидеть так, что собеседнику станет неуютно от твоей монументальности.
          </p>
        </div>

        {/* Card 3: Programming Behavior */}
        <div className="bg-zinc-900/30 p-8 border border-zinc-800 space-y-4 hover:border-yellow-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 bg-yellow-900/20 flex items-center justify-center rounded-sm border border-yellow-900/50">
                <Terminal className="text-yellow-400" size={20} />
             </div>
             <h3 className="text-lg font-mono font-bold text-zinc-200">КОД ПОВЕДЕНИЯ</h3>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-800 pl-4">
            <strong className="text-yellow-500 block mb-2">Механизм переноса:</strong>
            Ты печатаешь протоколы текстом. Моторика пальцев связывает абстрактную мысль с физическим миром. Ты буквально «прописываешь» скрипты в подкорку.
            <br/><br/>
            <strong className="text-white block mb-2">Выгода в жизни:</strong>
            В стрессовой ситуации мозг отключает логику и ищет готовый шаблон. Если шаблона нет — паника. Если шаблон прописан в «Протоколах» — хладнокровное действие.
          </p>
        </div>

        {/* Card 4: The Screen as a Filter */}
        <div className="bg-zinc-900/30 p-8 border border-zinc-800 space-y-4 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 bg-purple-900/20 flex items-center justify-center rounded-sm border border-purple-900/50">
                <BrainCircuit className="text-purple-400" size={20} />
             </div>
             <h3 className="text-lg font-mono font-bold text-zinc-200">ДИССОЦИАЦИЯ</h3>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-zinc-800 pl-4">
            <strong className="text-purple-500 block mb-2">Механизм переноса:</strong>
            Глядя в экран в режиме «Наблюдателя», ты тренируешь разделение: «Я» (сознание) и «Тело» (объект на стуле).
            <br/><br/>
            <strong className="text-white block mb-2">Выгода в жизни:</strong>
            Ты перестанешь принимать события на свой счет. Оскорбление — это просто звук, колеблющий воздух. Проблема — это просто задача. Ты станешь хирургом своей судьбы.
          </p>
        </div>

      </div>

      <div className="bg-zinc-100 text-zinc-950 p-6 md:p-8 mt-8 rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.1)]">
          <h3 className="font-mono font-bold text-lg mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            РЕАЛЬНЫЙ ЭФФЕКТ (ОТЧЕТ ОПЕРАТОРА)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm">
              <div>
                  <div className="font-bold mb-2 text-zinc-600">ДО ТРЕНИРОВОК (NPC):</div>
                  <ul className="list-disc list-inside space-y-2 text-zinc-800">
                    <li>Мгновенный ответ на сообщение в мессенджере.</li>
                    <li>Дрожание голоса при конфликте.</li>
                    <li>Суетливые движения руками.</li>
                    <li>Ощущение "жертвы обстоятельств".</li>
                  </ul>
              </div>
              <div>
                  <div className="font-bold mb-2 text-black border-b border-black inline-block">ПОСЛЕ ПРОТОКОЛА (ИГРОК):</div>
                  <ul className="list-disc list-inside space-y-2 font-bold">
                    <li>Тяжелый, "медленный" взгляд.</li>
                    <li>Пауза перед ответом, которая пугает оппонента.</li>
                    <li>Полная экономия движений (энергосбережение).</li>
                    <li>Ощущение, что ты управляешь временем.</li>
                  </ul>
              </div>
          </div>
      </div>

    </div>
  );
};