import { useState } from 'react';
import { Play, Square, Settings, Activity, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTradingStore } from '@/store/tradingStore';

export const BotControls = () => {
  const { botStatus, startBot, stopBot } = useTradingStore();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = async () => {
    setIsStarting(true);
    // Simulate connection delay
    setTimeout(() => {
      startBot();
      setIsStarting(false);
    }, 1500);
  };

  const getStatusBadge = () => {
    if (isStarting) {
      return <Badge variant="secondary" className="bg-trading-warning text-trading-warning-foreground">Connecting...</Badge>;
    }
    
    if (botStatus.isRunning) {
      return <Badge variant="secondary" className="bg-trading-success text-trading-success-foreground">
        <Activity className="w-3 h-3 mr-1" />
        Running
      </Badge>;
    }
    
    return <Badge variant="secondary" className="bg-trading-neutral text-trading-neutral-foreground">Stopped</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Trading Bot Control
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={handleStart}
            disabled={botStatus.isRunning || isStarting}
            className="flex-1 bg-trading-success hover:bg-trading-success/90 text-trading-success-foreground"
          >
            <Play className="w-4 h-4 mr-2" />
            {isStarting ? 'Starting...' : 'Start Bot'}
          </Button>
          
          <Button 
            onClick={stopBot}
            disabled={!botStatus.isRunning}
            variant="outline"
            className="flex-1 border-trading-danger text-trading-danger hover:bg-trading-danger hover:text-trading-danger-foreground"
          >
            <Square className="w-4 h-4 mr-2" />
            Stop Bot
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Symbol</p>
            <p className="font-mono">{botStatus.currentSymbol}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Connection</p>
            <p className={`font-mono ${
              botStatus.connectionStatus === 'CONNECTED' ? 'text-trading-success' :
              botStatus.connectionStatus === 'ERROR' ? 'text-trading-danger' :
              'text-trading-neutral'
            }`}>
              {botStatus.connectionStatus}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Last Update</p>
            <p className="font-mono text-xs">{botStatus.lastUpdate.toLocaleString()}</p>
          </div>
        </div>

        {botStatus.activePositions.length > 0 && (
          <div className="border-t pt-3">
            <div className="flex items-center gap-2 text-trading-warning">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {botStatus.activePositions.length} Active Position{botStatus.activePositions.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};