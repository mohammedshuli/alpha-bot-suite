import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HistoricalData } from '@/types/trading';

interface TradingChartProps {
  data: HistoricalData[];
  height?: number;
}

export const TradingChart = ({ data, height = 400 }: TradingChartProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-chart-price">Price Chart with Indicators</CardTitle>
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
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
              labelFormatter={(value) => new Date(value).toLocaleString()}
            />
            <Legend />
            
            {/* Price Line */}
            <Line 
              type="monotone" 
              dataKey="close" 
              stroke="hsl(var(--chart-price))" 
              strokeWidth={2}
              dot={false}
              name="Price"
            />
            
            {/* SMA Lines */}
            <Line 
              type="monotone" 
              dataKey="sma5" 
              stroke="hsl(var(--chart-sma5))" 
              strokeWidth={1}
              dot={false}
              name="SMA 5"
            />
            <Line 
              type="monotone" 
              dataKey="sma20" 
              stroke="hsl(var(--chart-sma20))" 
              strokeWidth={1}
              dot={false}
              name="SMA 20"
            />
            <Line 
              type="monotone" 
              dataKey="sma50" 
              stroke="hsl(var(--chart-sma50))" 
              strokeWidth={1}
              dot={false}
              name="SMA 50"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};