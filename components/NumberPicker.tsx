import React from 'react';

interface NumberPickerProps {
  selectedNumbers: number[];
  onNumberSelect: (numbers: number[]) => void;
}

const MAX_NUMBERS = 10;
const MIN_NUMBERS_FOR_ANALYSIS = 6;

// Tabela de preços oficial da Mega-Sena
const GAME_PRICES: { [key: number]: number } = {
  6: 5.00,
  7: 35.00,
  8: 140.00,
  9: 420.00,
  10: 1050.00,
};

export const NumberPicker: React.FC<NumberPickerProps> = ({ selectedNumbers, onNumberSelect }) => {
  const numbers = Array.from({ length: 60 }, (_, i) => i + 1);

  const handleNumberClick = (number: number) => {
    const newSelection = [...selectedNumbers];
    if (newSelection.includes(number)) {
      onNumberSelect(newSelection.filter(n => n !== number));
    } else if (newSelection.length < MAX_NUMBERS) {
      onNumberSelect([...newSelection, number].sort((a, b) => a - b));
    }
  };

  const clearSelection = () => {
    onNumberSelect([]);
  };
  
  const selectedCount = selectedNumbers.length;
  const gameCost = selectedCount >= MIN_NUMBERS_FOR_ANALYSIS ? GAME_PRICES[selectedCount] : null;

  return (
    <div className="bg-slate-800/60 p-6 rounded-2xl shadow-lg border border-slate-700 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <div>
           <h2 className="text-2xl font-bold text-cyan-400">Escolha seus Números</h2>
           <p className="text-slate-400 text-sm mt-1">Selecione de {MIN_NUMBERS_FOR_ANALYSIS} a {MAX_NUMBERS} dezenas.</p>
        </div>
        <div className="flex items-center divide-x divide-slate-700 bg-slate-900/50 border border-slate-700 rounded-lg mt-4 sm:mt-0 shadow-inner">
          <div className="flex flex-col items-center px-4 py-1 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Dezenas</span>
              <span className="text-lg font-mono font-bold text-white">
                {selectedCount}
              </span>
          </div>
          
          <div className="flex flex-col items-center px-5 py-1 text-center min-w-[110px]">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Custo</span>
             <span className="text-lg font-mono font-bold text-emerald-400">
                {gameCost ? gameCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ 0,00'}
              </span>
          </div>

           <button 
            onClick={clearSelection}
            className="px-4 self-stretch text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:text-slate-500 disabled:hover:bg-transparent rounded-r-md"
            disabled={selectedNumbers.length === 0}
            title="Limpar seleção"
            >
            Limpar
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
        {numbers.map((number) => {
          const isSelected = selectedNumbers.includes(number);
          const isDisabled = !isSelected && selectedNumbers.length >= MAX_NUMBERS;

          return (
            <button
              key={number}
              onClick={() => handleNumberClick(number)}
              disabled={isDisabled}
              className={`
                w-full h-12 sm:h-14 flex items-center justify-center text-lg font-mono font-semibold rounded-full
                transition-all duration-200 ease-in-out transform border
                ${isSelected 
                  ? 'bg-emerald-500 text-slate-900 scale-110 shadow-lg shadow-emerald-500/30 border-emerald-400' 
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600 border-slate-600'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
              `}
            >
              {String(number).padStart(2, '0')}
            </button>
          );
        })}
      </div>
    </div>
  );
};