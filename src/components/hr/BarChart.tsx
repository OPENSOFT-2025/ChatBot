
import React, { useEffect, useState } from 'react';
import { 
  BarChart as RechartsBC, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Updated data to reflect weekdays instead of months
const data = [
  { day: 'Monday', Excited: 22, Happy: 35, Okay: 18, Sad: 15, Frustrated: 10 },
  { day: 'Tuesday', Excited: 25, Happy: 38, Okay: 15, Sad: 12, Frustrated: 8 },
  { day: 'Wednesday', Excited: 18, Happy: 30, Okay: 22, Sad: 18, Frustrated: 12 },
  { day: 'Thursday', Excited: 28, Happy: 40, Okay: 16, Sad: 10, Frustrated: 6 },
  { day: 'Friday', Excited: 24, Happy: 36, Okay: 20, Sad: 12, Frustrated: 8 },
];

export function HRBarChart() {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const renderColorfulLegendText = (value: string, entry: any) => {
    const color = entry.color;
    return <span style={{ color: color, fontWeight: 'bold' }}>{value}</span>;
  };

  return (
    <Card className={`shadow-card overflow-hidden ${isAnimating ? 'chart-appear' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-[1.25rem] font-bold text-gray-200">Employee Vibemeter Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBC
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#bbb', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#bbb', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(20, 20, 20, 0.95)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  border: 'none',
                  color: '#f0f0f0'
                }}
                formatter={(value, name) => [value, name]}
              />
              <Legend 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={renderColorfulLegendText}
              />
              <Bar 
                name="Excited" 
                dataKey="Excited" 
                fill="#86BC25" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1000}
                animationBegin={200}
              />
              <Bar 
                name="Happy" 
                dataKey="Happy" 
                fill="#9FD356" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1000}
                animationBegin={300}
              />
              <Bar 
                name="Okay" 
                dataKey="Okay" 
                fill="#33C3F0" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1000}
                animationBegin={400}
              />
              <Bar 
                name="Sad" 
                dataKey="Sad" 
                fill="#F97316" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1000}
                animationBegin={500}
              />
              <Bar 
                name="Frustrated" 
                dataKey="Frustrated" 
                fill="#E11D48" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1000}
                animationBegin={600}
              />
            </RechartsBC>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
