import { create } from 'zustand';
import { TradingConfig, TradingSignal, TradingPosition, TradingStats, BotStatus, HistoricalData } from '@/types/trading';

interface TradingStore {
  // Bot State
  botStatus: BotStatus;
  setBotStatus: (status: Partial<BotStatus>) => void;
  
  // Configuration
  config: TradingConfig;
  setConfig: (config: Partial<TradingConfig>) => void;
  
  // Market Data
  historicalData: HistoricalData[];
  setHistoricalData: (data: HistoricalData[]) => void;
  
  // Signals
  signals: TradingSignal[];
  addSignal: (signal: TradingSignal) => void;
  
  // Positions
  positions: TradingPosition[];
  setPositions: (positions: TradingPosition[]) => void;
  
  // Statistics
  stats: TradingStats;
  setStats: (stats: TradingStats) => void;
  
  // Actions
  startBot: () => void;
  stopBot: () => void;
}

const defaultConfig: TradingConfig = {
  symbol: 'EURUSD',
  timeframe: 'M15',
  sma5Period: 5,
  sma20Period: 20,
  sma50Period: 50,
  rsiPeriod: 14,
  rsiOverbought: 70,
  rsiOversold: 30,
  atrPeriod: 14,
  atrMultiplier: 2.0,
  riskPerTrade: 2,
  stopLoss: 50,
  takeProfit: 100,
  maxDailyLoss: -500,
  maxPositions: 3,
};

const defaultBotStatus: BotStatus = {
  isRunning: false,
  currentSymbol: 'EURUSD',
  lastSignal: null,
  activePositions: [],
  connectionStatus: 'DISCONNECTED',
  lastUpdate: new Date(),
};

const defaultStats: TradingStats = {
  totalTrades: 0,
  winningTrades: 0,
  losingTrades: 0,
  winRate: 0,
  totalPnL: 0,
  dailyPnL: 0,
  weeklyPnL: 0,
  monthlyPnL: 0,
  maxDrawdown: 0,
  sharpeRatio: 0,
  averageWin: 0,
  averageLoss: 0,
  profitFactor: 0,
};

export const useTradingStore = create<TradingStore>((set, get) => ({
  botStatus: defaultBotStatus,
  setBotStatus: (status) => set((state) => ({ 
    botStatus: { ...state.botStatus, ...status, lastUpdate: new Date() } 
  })),
  
  config: defaultConfig,
  setConfig: (config) => set((state) => ({ 
    config: { ...state.config, ...config } 
  })),
  
  historicalData: [],
  setHistoricalData: (data) => set({ historicalData: data }),
  
  signals: [],
  addSignal: (signal) => set((state) => ({ 
    signals: [signal, ...state.signals].slice(0, 100) // Keep last 100 signals
  })),
  
  positions: [],
  setPositions: (positions) => set({ positions }),
  
  stats: defaultStats,
  setStats: (stats) => set({ stats }),
  
  startBot: () => {
    set((state) => ({
      botStatus: {
        ...state.botStatus,
        isRunning: true,
        connectionStatus: 'CONNECTED',
        lastUpdate: new Date(),
      }
    }));
  },
  
  stopBot: () => {
    set((state) => ({
      botStatus: {
        ...state.botStatus,
        isRunning: false,
        connectionStatus: 'DISCONNECTED',
        lastUpdate: new Date(),
      }
    }));
  },
}));