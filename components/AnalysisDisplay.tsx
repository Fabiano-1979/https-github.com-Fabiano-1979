import React from 'react';

interface AnalysisDisplayProps {
  analysis: string;
  isLoading: boolean;
  selectedCount: number;
}

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center text-slate-400 space-y-3">
        <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="font-semibold text-slate-300">Analisando sua combinação...</p>
        <p className="text-sm">Gemini está consultando os dados históricos.</p>
    </div>
);


export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, isLoading, selectedCount }) => {
    
  const formatMarkdown = (text: string) => {
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-cyan-400 mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-emerald-400 mt-4 mb-2">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-amber-400 mt-3 mb-1">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-100">$1</strong>')
      .replace(/^\* (.*$)/gim, '<li class="ml-5 list-disc text-slate-300">$1</li>')
      .replace(/\n/g, '<br />')
      .replace(/<br \s*\/?>\s*(<li|<h[1-3])/g, '$1'); // Remove extra line breaks before lists/headings
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }
    if (analysis) {
      const htmlAnalysis = formatMarkdown(analysis);
      return <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-strong:text-emerald-400" dangerouslySetInnerHTML={{ __html: htmlAnalysis }} />;
    }
    if(selectedCount > 0 && selectedCount < 6){
        return <p className="text-center text-slate-400">Selecione pelo menos 6 números para iniciar a análise.</p>;
    }
    return <p className="text-center text-slate-400">A análise da sua combinação aparecerá aqui.</p>;
  };

  return (
    <div className="bg-slate-800/60 p-6 rounded-2xl shadow-lg border border-slate-700 min-h-[250px] flex items-center justify-center backdrop-blur-sm">
      <div className="w-full">
        {renderContent()}
      </div>
    </div>
  );
};