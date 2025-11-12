import { GoogleGenAI } from "@google/genai";
import type { LotteryStatsResponse } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLotteryStats = async (): Promise<LotteryStatsResponse> => {
  // Data extraída do documento fornecido pelo usuário.
  const staticData: LotteryStatsResponse = {
    maisSorteados: [
      { numero: 10, frequencia: 343 },
      { numero: 53, frequencia: 334 },
      { numero: 5, frequencia: 320 },
      { numero: 34, frequencia: 320 },
      { numero: 37, frequencia: 317 },
      { numero: 38, frequencia: 315 },
      { numero: 33, frequencia: 314 },
      { numero: 32, frequencia: 312 },
      { numero: 4, frequencia: 311 },
      { numero: 17, frequencia: 311 },
    ],
    menosSorteados: [
      { numero: 26, frequencia: 243 },
      { numero: 21, frequencia: 244 },
      { numero: 55, frequencia: 255 },
      { numero: 15, frequencia: 262 },
      { numero: 22, frequencia: 262 },
      { numero: 3, frequencia: 272 },
      { numero: 31, frequencia: 273 },
      { numero: 48, frequencia: 274 },
      { numero: 7, frequencia: 274 },
      { numero: 40, frequencia: 277 },
    ].sort((a, b) => a.frequencia - b.frequencia),
    maisAtrasadas: [
      { numero: 2, frequencia: 35 },
      { numero: 43, frequencia: 34 },
      { numero: 20, frequencia: 31 },
      { numero: 21, frequencia: 26 },
      { numero: 60, frequencia: 24 },
    ],
  };

  // Simula um atraso de rede para consistência da UX com os estados de carregamento.
  return new Promise(resolve => setTimeout(() => resolve(staticData), 300));
};

export const analyzeCombination = async (numbers: number[]): Promise<string> => {
    const prompt = `Você é um especialista em estatísticas da loteria Mega-Sena. Analise a seguinte combinação de números: [${numbers.join(', ')}].

Sua análise deve ser baseada em dados históricos e focar nos seguintes pontos. Use a pesquisa na web para obter os dados necessários.

# Análise da Combinação

## Frequência Individual
* Comente sobre a frequência com que cada um desses números já foi sorteado.

## Análise de Pares (Duplas)
* Investigue a frequência com que os pares de números desta combinação já foram sorteados juntos.

## Análise de Trios (Trincas)
* Se houver dados, comente sobre a frequência com que trios desta combinação já saíram juntos.

## Padrões Gerais
* Avalie padrões notáveis (ex: equilíbrio entre pares e ímpares, números em sequência, distribuição no volante).

## Conclusão
* Forneça uma avaliação geral e concisa do potencial estatístico da combinação.

Formate a resposta estritamente em markdown. Use títulos (hashtags) e listas (asteriscos). Não garanta a vitória, apenas forneça uma análise estatística aprofundada.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        }
    });

    return response.text;
};