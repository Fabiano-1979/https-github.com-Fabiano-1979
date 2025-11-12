
export interface LotteryStat {
  numero: number;
  frequencia: number;
}

export interface LotteryStatsResponse {
  maisSorteados: LotteryStat[];
  menosSorteados: LotteryStat[];
  maisAtrasadas: LotteryStat[];
}