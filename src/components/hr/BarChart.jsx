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

// Updated data to use abbreviated day names
const data = [
  { day: 'Mon', Excited: 22, Happy: 35, Okay: 18, Sad: 15, Frustrated: 10 },
  { day: 'Tue', Excited: 25, Happy: 38, Okay: 15, Sad: 12, Frustrated: 8 },
  { day: 'Wed', Excited: 18, Happy: 30, Okay: 22, Sad: 18, Frustrated: 12 },
  { day: 'Thu', Excited: 28, Happy: 40, Okay: 16, Sad: 10, Frustrated: 6 },
  { day: 'Fri', Excited: 24, Happy: 36, Okay: 20, Sad: 12, Frustrated: 8 },
];

export function HRBarChart() {
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);

  const emotions = ['Excited', 'Happy', 'Okay', 'Sad', 'Frustrated'];
  const colors = {
    Excited: '#26890d', // dark green with more opacity
    Happy: '#CEFF00',   // bright yellow-green, more different from dark green
    Okay: '#facc15',    // yellow
    Sad: '#3b82f6',     // blue
    Frustrated: '#ef4444', // red
  };

  const handleMouseEnter = (emotion) => {
    setHoveredEmotion(emotion);
  };

  const handleMouseLeave = () => {
    setHoveredEmotion(null);
  };

  const getBarOpacity = (emotion) => {
    if (!hoveredEmotion) return 1;
    return emotion === hoveredEmotion ? 1 : 0.5;
  };

  const getBarStrokeWidth = (emotion) => {
    // Keep consistent stroke width
    return 0; // No stroke at all
  };

  const renderCustomizedLegend = (props) => {
    const { payload } = props;

    return (
      <div className="flex flex-wrap justify-center gap-4 mt-3">
        {payload.map((entry, index) => (
          <div 
            key={`item-${index}`}
            className="flex items-center cursor-pointer transition-opacity"
            style={{ opacity: getBarOpacity(entry.value) }}
            onMouseEnter={() => handleMouseEnter(entry.value)}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="w-3 h-3 mr-1 rounded"
              style={{ 
                backgroundColor: entry.color,
                // Remove any hover effects
              }}
            />
            <span className="text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="shadow-card bg-card border border-hr-green/20">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Employee Mood Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RechartsBC
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            onMouseEnter={(data) => {
              if (data && data.activePayload && data.activePayload[0]) {
                setHoveredDay(data.activeLabel);
              }
            }}
            onMouseLeave={() => {
              setHoveredDay(null);
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="day" 
              stroke="rgba(255,255,255,0.5)"
              // Add these properties for responsive font size
              tick={{ fontSize: '0.8rem' }}
              interval={0}
              height={50}
              tickMargin={8}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              // Make Y-axis font size responsive too
              tick={{ fontSize: '0.8rem' }}
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a',
                borderColor: 'rgba(74, 222, 128, 0.3)', 
                color: 'white' 
              }}
              cursor={{
                fill: 'rgba(38, 137, 13, 0.3)',  // Increased opacity to 0.3
                stroke: 'rgba(38, 137, 13, 0.7)', // Increased opacity to 0.7
                strokeWidth: 1,
              }}
            />
            <Legend content={renderCustomizedLegend} />
            {emotions.map((emotion) => (
              <Bar
                key={emotion}
                dataKey={emotion}
                fill={colors[emotion]}
                onMouseEnter={() => handleMouseEnter(emotion)}
                onMouseLeave={handleMouseLeave}
                opacity={getBarOpacity(emotion)}
                strokeWidth={0}
                stroke="none"
                // Disable the active bar style
                activeBar={{ strokeWidth: 0, stroke: "transparent", fill: colors[emotion] }}
                // Add a custom class to enable custom CSS if needed
                className="custom-bar-no-highlight"
              />
            ))}
          </RechartsBC>
        </ResponsiveContainer>

        {/* Add custom CSS to override any default hover styles */}
        <style jsx>{`
          :global(.recharts-cartesian-axis-tick-value) {
            font-size: 12px;
          }
          
          @media (max-width: 640px) {
            :global(.recharts-cartesian-axis-tick-value) {
              font-size: 10px;
            }
          }
          
          :global(.custom-bar-no-highlight:hover) {
            filter: none !important;
            stroke: none !important;
            stroke-width: 0 !important;
            box-shadow: none !important;
          }
        `}</style>
      </CardContent>
    </Card>
  );
}
