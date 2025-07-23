import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HistoricalData } from '@/types/trading';

interface RSIChartProps {
  data: HistoricalData[];
  height?: number;
  overbought?: number;
  oversold?: number;
}

export const RSIChart = ({ data, height = 200, overbought = 70, oversold = 30 }: RSIChartProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-chart-rsi">RSI Indicator</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="timestamp" 
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <YAxis 
              domain={[0, 100]} 
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
              labelFormatter={(value) => new Date(value).toLocaleString()}
            />
            
            {/* Reference Lines */}
            <ReferenceLine y={overbought} stroke="hsl(var(--trading-danger))" strokeDasharray="5 5" />
            <ReferenceLine y={50} stroke="hsl(var(--trading-neutral))" strokeDasharray="2 2" />
            <ReferenceLine y={oversold} stroke="hsl(var(--trading-success))" strokeDasharray="5 5" />
            
            {/* RSI Line */}
            <Line 
              type="monotone" 
              dataKey="rsi" 
              stroke="hsl(var(--chart-rsi))" 
              strokeWidth={2}
              dot={false}
              name="RSI"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};