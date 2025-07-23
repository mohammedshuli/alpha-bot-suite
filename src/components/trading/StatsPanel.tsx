import { TrendingUp, TrendingDown, Target, Shield, Activity, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTradingStore } from '@/store/tradingStore';

export const StatsPanel = () => {
  const { stats } = useTradingStore();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getPnLColor = (value: number) => {
    return value >= 0 ? 'text-trading-success' : 'text-trading-danger';
  };

  return (
    <div className="grid gap-4">
      {/* Performance Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total P&L</span>
            </div>
            <p className={`text-2xl font-bold ${getPnLColor(stats.totalPnL)}`}>
              {formatCurrency(stats.totalPnL)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Daily P&L</span>
            </div>
            <p className={`text-2xl font-bold ${getPnLColor(stats.dailyPnL)}`}>
              {formatCurrency(stats.dailyPnL)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Win Rate</span>
            </div>
            <p className="text-2xl font-bold text-trading-success">
              {formatPercentage(stats.winRate)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
            </div>
            <p className="text-2xl font-bold">
              {stats.sharpeRatio.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Trading Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Trades</p>
              <p className="text-xl font-semibold">{stats.totalTrades}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Winning Trades</p>
              <p className="text-xl font-semibold text-trading-success">{stats.winningTrades}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Losing Trades</p>
              <p className="text-xl font-semibold text-trading-danger">{stats.losingTrades}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Average Win</p>
              <p className="text-xl font-semibold text-trading-success">
                {formatCurrency(stats.averageWin)}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Average Loss</p>
              <p className="text-xl font-semibold text-trading-danger">
                {formatCurrency(Math.abs(stats.averageLoss))}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Profit Factor</p>
              <p className="text-xl font-semibold">{stats.profitFactor.toFixed(2)}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Max Drawdown</p>
              <p className="text-xl font-semibold text-trading-danger">
                {formatCurrency(Math.abs(stats.maxDrawdown))}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Weekly P&L</p>
              <p className={`text-xl font-semibold ${getPnLColor(stats.weeklyPnL)}`}>
                {formatCurrency(stats.weeklyPnL)}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Monthly P&L</p>
              <p className={`text-xl font-semibold ${getPnLColor(stats.monthlyPnL)}`}>
                {formatCurrency(stats.monthlyPnL)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};