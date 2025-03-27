
import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Mock data for the mood trend
const moodData = [
  { date: "Mon", mood: 3, workload: 4 },
  { date: "Tue", mood: 4, workload: 3 },
  { date: "Wed", mood: 2, workload: 5 },
  { date: "Thu", mood: 3, workload: 4 },
  { date: "Fri", mood: 4, workload: 3 },
  { date: "Sat", mood: 5, workload: 1 },
  { date: "Sun", mood: 4, workload: 2 },
];

const MoodTrend: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={moodData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="mood" 
          stroke="hsl(var(--primary))" 
          activeDot={{ r: 8 }} 
          name="Mood (1-5)"
        />
        <Line 
          type="monotone" 
          dataKey="workload" 
          stroke="#8884d8" 
          name="Workload (1-5)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MoodTrend;
