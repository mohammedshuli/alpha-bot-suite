export interface TradingSymbol {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export interface TradingConfig {
  symbol: string;
  timeframe: string;
  sma5Period: number;
  sma20Period: number;
  sma50Period: number;
  rsiPeriod: number;
  rsiOverbought: number;
  rsiOversold: number;
  atrPeriod: number;
  atrMultiplier: number;
  riskPerTrade: number;
  stopLoss: number;
  takeProfit: number;
  maxDailyLoss: number;
  maxPositions: number;
}

export interface TradingSignal {
  id: string;
  timestamp: Date;
  symbol: string;
  type: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  price: number;
  sma5: number;
  sma20: number;
  sma50: number;
  rsi: number;
  atr: number;
  indicators: {
    smaSignal: 'BUY' | 'SELL' | 'HOLD';
    rsiSignal: 'BUY' | 'SELL' | 'HOLD';
    atrFilter: boolean;
  };
}

export interface TradingPosition {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  pnl: number;
  pnlPercent: number;
  stopLoss: number;
  takeProfit: number;
  entryTime: Date;
}

export interface TradingStats {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalPnL: number;
  dailyPnL: number;
  weeklyPnL: number;
  monthlyPnL: number;
  maxDrawdown: number;
  sharpeRatio: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
}

export interface HistoricalData {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  sma5?: number;
  sma20?: number;
  sma50?: number;
  rsi?: number;
  atr?: number;
}

export interface BacktestResult {
  equity: number[];
  trades: {
    entry: Date;
    exit: Date;
    type: 'BUY' | 'SELL';
    entryPrice: number;
    exitPrice: number;
    pnl: number;
    pnlPercent: number;
  }[];
  stats: TradingStats;
}

export interface BotStatus {
  isRunning: boolean;
  currentSymbol: string;
  lastSignal: TradingSignal | null;
  activePositions: TradingPosition[];
  connectionStatus: 'CONNECTED' | 'DISCONNECTED' | 'ERROR';
  lastUpdate: Date;
}