import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center flex flex-col items-center justify-center space-y-3">
    <div className="w-16 h-16 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.411 1.323a2.955 2.955 0 0 1 4.162 4.195l-1.163 1.151a2.955 2.955 0 0 1-4.186-4.172l1.187-1.174Zm-7.822 0a2.955 2.955 0 0 1 4.186 4.172l-1.187 1.174a2.955 2.955 0 0 1-4.162-4.195l1.163-1.151Zm-2.029 6.557a2.955 2.955 0 0 1 4.172 4.186l-1.174 1.187a2.955 2.955 0 0 1-4.195-4.162l1.197-1.211Zm10.518 1.211a2.955 2.955 0 0 1 4.195 4.162l-1.151 1.163a2.955 2.955 0 0 1-4.172-4.186l1.128-1.139Z"/>
        <path d="M12 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm1.5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 0V15a1.5 1.5 0 1 1-3 0v-3a1.5 1.5 0 1 1 3 0Zm-1.5-1.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"/>
      </svg>
    </div>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 pb-2">
      Gerador da Sorte do TETINHA
    </h1>
    <p className="mt-2 text-lg text-slate-400 max-w-2xl mx-auto">
      Análise Estatística para a Mega da Virada com Gemini
    </p>
  </header>
);