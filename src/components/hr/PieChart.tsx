
import React, { useEffect, useState } from 'react';
import { PieChart as RechartsPC, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Unflagged', value: 790, color: '#86BC25' },
  { name: 'Flagged', value: 210, color: '#E11D48' }
];

const COLORS = ['#86BC25', '#E11D48'];

export function HRPieChart() {
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
        <CardTitle className="text-[1.15rem] font-bold text-gray-200">Employee Flag Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPC>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={800}
                animationBegin={300}
                animationEasing="ease-out"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} employees`, name]}
                contentStyle={{ 
                  backgroundColor: 'rgba(20, 20, 20, 0.95)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  border: 'none',
                  color: '#f0f0f0'
                }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
                iconSize={10}
                formatter={renderColorfulLegendText}
              />
            </RechartsPC>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
