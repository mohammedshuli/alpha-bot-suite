import { ArrowUp, ArrowDown, Clock, Target, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTradingStore } from '@/store/tradingStore';

export const PositionsPanel = () => {
  const { positions } = useTradingStore();

  const getPnLColor = (pnl: number) => {
    return pnl >= 0 ? 'text-trading-success' : 'text-trading-danger';
  };

  const getTypeIcon = (type: 'BUY' | 'SELL') => {
    return type === 'BUY' ? 
      <ArrowUp className="w-3 h-3 text-trading-success" /> : 
      <ArrowDown className="w-3 h-3 text-trading-danger" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {positions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No active positions</p>
          ) : (
            positions.map((position) => (
              <div key={position.id} className="border rounded-lg p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(position.type)}
                    <span className="font-mono font-semibold">{position.symbol}</span>
                    <Badge variant="outline">{position.type}</Badge>
                  </div>
                  <div className="text-right">
                    <p className={`font-mono font-semibold ${getPnLColor(position.pnl)}`}>
                      {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(2)}
                    </p>
                    <p className={`text-xs ${getPnLColor(position.pnlPercent)}`}>
                      {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Entry</p>
                    <p className="font-mono">{position.entryPrice.toFixed(5)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current</p>
                    <p className="font-mono">{position.currentPrice.toFixed(5)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Quantity</p>
                    <p className="font-mono">{position.quantity.toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-trading-danger" />
                    <span className="text-muted-foreground">SL:</span>
                    <span className="font-mono">{position.stopLoss.toFixed(5)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-trading-success" />
                    <span className="text-muted-foreground">TP:</span>
                    <span className="font-mono">{position.takeProfit.toFixed(5)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock className="w-3 h-3" />
                    {position.entryTime.toLocaleString()}
                  </div>
                  <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                    Close
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};