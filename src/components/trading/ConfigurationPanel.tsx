import { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTradingStore } from '@/store/tradingStore';
import { toast } from 'sonner';

export const ConfigurationPanel = () => {
  const { config, setConfig } = useTradingStore();
  const [localConfig, setLocalConfig] = useState(config);

  const handleSave = () => {
    setConfig(localConfig);
    toast.success('Configuration saved successfully');
  };

  const handleReset = () => {
    setLocalConfig(config);
    toast.info('Configuration reset to last saved values');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Trading Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="strategy" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
          </TabsList>

          <TabsContent value="strategy" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="symbol">Symbol</Label>
                <Select 
                  value={localConfig.symbol} 
                  onValueChange={(value) => setLocalConfig({ ...localConfig, symbol: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EURUSD">EUR/USD</SelectItem>
                    <SelectItem value="GBPUSD">GBP/USD</SelectItem>
                    <SelectItem value="USDJPY">USD/JPY</SelectItem>
                    <SelectItem value="AUDUSD">AUD/USD</SelectItem>
                    <SelectItem value="USDCAD">USD/CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeframe">Timeframe</Label>
                <Select 
                  value={localConfig.timeframe} 
                  onValueChange={(value) => setLocalConfig({ ...localConfig, timeframe: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M5">5 Minutes</SelectItem>
                    <SelectItem value="M15">15 Minutes</SelectItem>
                    <SelectItem value="M30">30 Minutes</SelectItem>
                    <SelectItem value="H1">1 Hour</SelectItem>
                    <SelectItem value="H4">4 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">SMA Settings</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sma5">SMA 5 Period</Label>
                  <Input
                    id="sma5"
                    type="number"
                    value={localConfig.sma5Period}
                    onChange={(e) => setLocalConfig({ ...localConfig, sma5Period: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sma20">SMA 20 Period</Label>
                  <Input
                    id="sma20"
                    type="number"
                    value={localConfig.sma20Period}
                    onChange={(e) => setLocalConfig({ ...localConfig, sma20Period: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sma50">SMA 50 Period</Label>
                  <Input
                    id="sma50"
                    type="number"
                    value={localConfig.sma50Period}
                    onChange={(e) => setLocalConfig({ ...localConfig, sma50Period: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">RSI Settings</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rsiPeriod">RSI Period</Label>
                  <Input
                    id="rsiPeriod"
                    type="number"
                    value={localConfig.rsiPeriod}
                    onChange={(e) => setLocalConfig({ ...localConfig, rsiPeriod: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rsiOverbought">Overbought</Label>
                  <Input
                    id="rsiOverbought"
                    type="number"
                    value={localConfig.rsiOverbought}
                    onChange={(e) => setLocalConfig({ ...localConfig, rsiOverbought: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rsiOversold">Oversold</Label>
                  <Input
                    id="rsiOversold"
                    type="number"
                    value={localConfig.rsiOversold}
                    onChange={(e) => setLocalConfig({ ...localConfig, rsiOversold: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">ATR Settings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="atrPeriod">ATR Period</Label>
                  <Input
                    id="atrPeriod"
                    type="number"
                    value={localConfig.atrPeriod}
                    onChange={(e) => setLocalConfig({ ...localConfig, atrPeriod: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="atrMultiplier">ATR Multiplier</Label>
                  <Input
                    id="atrMultiplier"
                    type="number"
                    step="0.1"
                    value={localConfig.atrMultiplier}
                    onChange={(e) => setLocalConfig({ ...localConfig, atrMultiplier: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="riskPerTrade">Risk Per Trade (%)</Label>
                <Input
                  id="riskPerTrade"
                  type="number"
                  step="0.1"
                  value={localConfig.riskPerTrade}
                  onChange={(e) => setLocalConfig({ ...localConfig, riskPerTrade: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxDailyLoss">Max Daily Loss ($)</Label>
                <Input
                  id="maxDailyLoss"
                  type="number"
                  value={localConfig.maxDailyLoss}
                  onChange={(e) => setLocalConfig({ ...localConfig, maxDailyLoss: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stopLoss">Stop Loss (pips)</Label>
                <Input
                  id="stopLoss"
                  type="number"
                  value={localConfig.stopLoss}
                  onChange={(e) => setLocalConfig({ ...localConfig, stopLoss: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="takeProfit">Take Profit (pips)</Label>
                <Input
                  id="takeProfit"
                  type="number"
                  value={localConfig.takeProfit}
                  onChange={(e) => setLocalConfig({ ...localConfig, takeProfit: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPositions">Max Positions</Label>
              <Input
                id="maxPositions"
                type="number"
                value={localConfig.maxPositions}
                onChange={(e) => setLocalConfig({ ...localConfig, maxPositions: Number(e.target.value) })}
              />
            </div>
          </TabsContent>

          <TabsContent value="execution" className="space-y-4">
            <p className="text-muted-foreground">Execution settings will be available in future updates.</p>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-6">
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};