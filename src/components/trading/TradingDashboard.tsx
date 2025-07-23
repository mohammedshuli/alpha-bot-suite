import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TradingChart } from './TradingChart';
import { RSIChart } from './RSIChart';
import { BotControls } from './BotControls';
import { SignalsPanel } from './SignalsPanel';
import { PositionsPanel } from './PositionsPanel';
import { ConfigurationPanel } from './ConfigurationPanel';
import { StatsPanel } from './StatsPanel';
import { useTradingStore } from '@/store/tradingStore';

// Mock data generator based on your Python bot logic
const generateMockData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 99; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 15 * 60 * 1000); // 15-minute intervals
    const basePrice = 1.1000 + Math.sin(i * 0.1) * 0.005 + Math.random() * 0.002;
    
    // Calculate SMAs (simplified)
    const sma5 = basePrice + Math.sin(i * 0.2) * 0.001;
    const sma20 = basePrice + Math.sin(i * 0.05) * 0.002;
    const sma50 = basePrice + Math.sin(i * 0.02) * 0.003;
    
    // Calculate RSI (simplified)
    const rsi = 50 + Math.sin(i * 0.15) * 20 + Math.random() * 10;
    
    data.push({
      timestamp,
      open: basePrice - Math.random() * 0.0001,
      high: basePrice + Math.random() * 0.0002,
      low: basePrice - Math.random() * 0.0002,
      close: basePrice,
      volume: Math.floor(Math.random() * 1000) + 500,
      sma5: sma5,
      sma20: sma20,
      sma50: sma50,
      rsi: Math.max(0, Math.min(100, rsi)),
      atr: 0.0005 + Math.random() * 0.0003,
    });
  }
  
  return data;
};

// Mock signals generator
const generateMockSignal = () => {
  const types = ['BUY', 'SELL', 'HOLD'] as const;
  const type = types[Math.floor(Math.random() * types.length)];
  const confidence = Math.floor(Math.random() * 40) + 60; // 60-100%
  
  return {
    id: Date.now().toString(),
    timestamp: new Date(),
    symbol: 'EURUSD',
    type,
    confidence,
    price: 1.1000 + Math.random() * 0.01,
    sma5: 1.1005,
    sma20: 1.1010,
    sma50: 1.1015,
    rsi: 45 + Math.random() * 10,
    atr: 0.0007,
    indicators: {
      smaSignal: type,
      rsiSignal: type,
      atrFilter: Math.random() > 0.3,
    },
  };
};

// Mock position generator
const generateMockPosition = () => {
  const type: 'BUY' | 'SELL' = Math.random() > 0.5 ? 'BUY' : 'SELL';
  const entryPrice = 1.1000 + Math.random() * 0.01;
  const currentPrice = entryPrice + (Math.random() - 0.5) * 0.005;
  const quantity = Math.floor(Math.random() * 50000) + 10000;
  
  return {
    id: Date.now().toString(),
    symbol: 'EURUSD',
    type,
    entryPrice,
    currentPrice,
    quantity,
    pnl: (currentPrice - entryPrice) * quantity * (type === 'BUY' ? 1 : -1),
    pnlPercent: ((currentPrice - entryPrice) / entryPrice) * 100 * (type === 'BUY' ? 1 : -1),
    stopLoss: type === 'BUY' ? entryPrice - 0.005 : entryPrice + 0.005,
    takeProfit: type === 'BUY' ? entryPrice + 0.01 : entryPrice - 0.01,
    entryTime: new Date(Date.now() - Math.random() * 3600000), // Random time within last hour
  };
};

export const TradingDashboard = () => {
  const { setHistoricalData, addSignal, setPositions, setStats, botStatus } = useTradingStore();

  useEffect(() => {
    // Initialize with mock data
    const mockData = generateMockData();
    setHistoricalData(mockData);

    // Mock some initial stats
    setStats({
      totalTrades: 45,
      winningTrades: 27,
      losingTrades: 18,
      winRate: 60,
      totalPnL: 1250.75,
      dailyPnL: 125.50,
      weeklyPnL: 340.25,
      monthlyPnL: 1250.75,
      maxDrawdown: -150.00,
      sharpeRatio: 1.8,
      averageWin: 85.30,
      averageLoss: -45.20,
      profitFactor: 1.67,
    });

    // Generate mock signals periodically when bot is running
    const signalInterval = setInterval(() => {
      if (botStatus.isRunning) {
        if (Math.random() > 0.7) { // 30% chance of signal
          addSignal(generateMockSignal());
        }
      }
    }, 10000); // Every 10 seconds

    // Generate mock positions
    const mockPositions = Array.from({ length: Math.floor(Math.random() * 3) }, generateMockPosition);
    setPositions(mockPositions);

    return () => clearInterval(signalInterval);
  }, [setHistoricalData, addSignal, setPositions, setStats, botStatus.isRunning]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Trading Bot Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last update: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="signals">Signals</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="backtest">Backtest</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <BotControls />
            </div>
            <div className="lg:col-span-2">
              <StatsPanel />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SignalsPanel />
            <PositionsPanel />
          </div>
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <TradingChart data={[]} height={400} />
          <RSIChart data={[]} height={200} />
        </TabsContent>

        <TabsContent value="signals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SignalsPanel />
            <PositionsPanel />
          </div>
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <ConfigurationPanel />
        </TabsContent>

        <TabsContent value="backtest" className="space-y-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Backtesting Module</h3>
            <p className="text-muted-foreground">
              Advanced backtesting with equity curves and detailed analytics coming soon...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};