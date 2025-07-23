import { ArrowUp, ArrowDown, Minus, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TradingSignal } from '@/types/trading';
import { useTradingStore } from '@/store/tradingStore';

export const SignalsPanel = () => {
  const { signals } = useTradingStore();

  const getSignalIcon = (type: TradingSignal['type']) => {
    switch (type) {
      case 'BUY':
        return <ArrowUp className="w-4 h-4" />;
      case 'SELL':
        return <ArrowDown className="w-4 h-4" />;
      case 'HOLD':
        return <Minus className="w-4 h-4" />;
    }
  };

  const getSignalColor = (type: TradingSignal['type']) => {
    switch (type) {
      case 'BUY':
        return 'text-trading-success';
      case 'SELL':
        return 'text-trading-danger';
      case 'HOLD':
        return 'text-trading-neutral';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-trading-success text-trading-success-foreground';
    if (confidence >= 60) return 'bg-trading-warning text-trading-warning-foreground';
    return 'bg-trading-neutral text-trading-neutral-foreground';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading Signals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {signals.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No signals generated yet</p>
          ) : (
            signals.slice(0, 10).map((signal) => (
              <div key={signal.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={getSignalColor(signal.type)}>
                      {getSignalIcon(signal.type)}
                    </div>
                    <span className="font-mono font-semibold">{signal.type}</span>
                    <Badge variant="secondary" className={getConfidenceColor(signal.confidence)}>
                      {signal.confidence}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock className="w-3 h-3" />
                    {signal.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">Price</p>
                    <p className="font-mono">{signal.price.toFixed(5)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">RSI</p>
                    <p className="font-mono">{signal.rsi.toFixed(1)}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 text-xs">
                  <Badge variant="outline" className="text-chart-sma5">
                    SMA: {signal.indicators.smaSignal}
                  </Badge>
                  <Badge variant="outline" className="text-chart-rsi">
                    RSI: {signal.indicators.rsiSignal}
                  </Badge>
                  <Badge variant="outline" className={signal.indicators.atrFilter ? 'text-trading-success' : 'text-trading-danger'}>
                    ATR: {signal.indicators.atrFilter ? 'PASS' : 'BLOCK'}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};