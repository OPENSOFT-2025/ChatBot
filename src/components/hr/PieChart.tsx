
import React, { useEffect, useState } from 'react';
import { PieChart as RechartsPC, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Active', value: 540, color: '#0EA5E9' },
  { name: 'On Leave', value: 120, color: '#F97316' },
  { name: 'Remote', value: 240, color: '#8B5CF6' },
  { name: 'Contract', value: 90, color: '#10B981' }
];

const COLORS = ['#0EA5E9', '#F97316', '#8B5CF6', '#10B981'];

export function HRPieChart() {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <Card className={`shadow-card overflow-hidden ${isAnimating ? 'chart-appear' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-gray-800">Employee Status</CardTitle>
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
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
                iconSize={10}
              />
            </RechartsPC>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
