
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

const data = [
  { month: 'Jan', hired: 12, separated: 8 },
  { month: 'Feb', hired: 19, separated: 5 },
  { month: 'Mar', hired: 15, separated: 7 },
  { month: 'Apr', hired: 20, separated: 4 },
  { month: 'May', hired: 18, separated: 6 },
  { month: 'Jun', hired: 22, separated: 9 },
];

export function HRBarChart() {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <Card className={`shadow-card overflow-hidden ${isAnimating ? 'chart-appear' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-gray-800">Hiring Trends</CardTitle>
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
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#888', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#888', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Legend 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ paddingTop: '10px' }}
              />
              <Bar 
                name="New Hires" 
                dataKey="hired" 
                fill="#0EA5E9" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1000}
                animationBegin={200}
              />
              <Bar 
                name="Separations" 
                dataKey="separated" 
                fill="#F97316" 
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationBegin={400}
              />
            </RechartsBC>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
