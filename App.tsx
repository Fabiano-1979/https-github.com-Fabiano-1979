import React, { useState, useEffect, useCallback } from 'react';
import { getLotteryStats, analyzeCombination } from './services/geminiService';
import type { LotteryStat } from './types';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { NumberPicker } from './components/NumberPicker';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [mostFrequent, setMostFrequent] = useState<LotteryStat[]>([]);
  const [leastFrequent, setLeastFrequent] = useState<LotteryStat[]>([]);
  const [mostOverdue, setMostOverdue] = useState<LotteryStat[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [isStatsLoading, setIsStatsLoading] = useState<boolean>(true);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const fetchStats = useCallback(async () => {
    try {
      setIsStatsLoading(true);
      setError(null);
      const stats = await getLotteryStats();
      setMostFrequent(stats.maisSorteados);
      setLeastFrequent(stats.menosSorteados);
      setMostOverdue(stats.maisAtrasadas);
    } catch (err) {
      setError('Falha ao carregar as estatísticas. Tente recarregar a página.');
      console.error(err);
    } finally {
      setIsStatsLoading(false);
    }
  }, []);

  const fetchAnalysis = useCallback(async (numbers: number[]) => {
    if (numbers.length < 6) {
      setAnalysis('');
      return;
    }
    try {
      setIsAnalysisLoading(true);
      setAnalysis('');
      setError(null);
      const result = await analyzeCombination(numbers);
      setAnalysis(result);
    } catch (err) {
       setError('Não foi possível analisar a combinação. Tente novamente.');
       console.error(err);
    } finally {
      setIsAnalysisLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    const handler = setTimeout(() => {
        if (selectedNumbers.length >= 6) {
            fetchAnalysis(selectedNumbers);
        } else {
            setAnalysis('');
        }
    }, 500); // Debounce to avoid excessive API calls

    return () => {
        clearTimeout(handler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNumbers]); // We disable exhaustive-deps because fetchAnalysis is memoized with useCallback

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />

        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Number Picker & Analysis */}
          <div className="lg:col-span-2 space-y-8">
            <NumberPicker
              selectedNumbers={selectedNumbers}
              onNumberSelect={setSelectedNumbers}
            />
            <AnalysisDisplay
              analysis={analysis}
              isLoading={isAnalysisLoading}
              selectedCount={selectedNumbers.length}
            />
          </div>

          {/* Sidebar: Stats */}
          <aside className="space-y-8">
            <StatsCard
              title="Números Mais Sorteados"
              stats={mostFrequent}
              isLoading={isStatsLoading}
              color="text-emerald-400"
              unit="vezes"
            />
            <StatsCard
              title="Números Menos Sorteados"
              stats={leastFrequent}
              isLoading={isStatsLoading}
              color="text-amber-400"
              unit="vezes"
            />
            <StatsCard
              title="Dezenas Mais Atrasadas"
              stats={mostOverdue}
              isLoading={isStatsLoading}
              color="text-sky-400"
              unit="concursos"
            />
          </aside>
        </main>

        {showError && (
            <div className="fixed top-5 right-5 bg-red-800 border border-red-600 text-white p-4 rounded-lg shadow-2xl transition-all duration-300 ease-in-out transform translate-x-0 opacity-100 z-50">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <div>
                        <p className="font-bold">Ocorreu um Erro</p>
                        <p className="text-sm text-red-200">{error}</p>
                    </div>
                </div>
            </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default App;