
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Sample revenue data for the chart
const data = [
  { name: "Jan", Revenue: 18500 },
  { name: "Feb", Revenue: 22300 },
  { name: "Mar", Revenue: 25400 },
  { name: "Apr", Revenue: 29100 },
  { name: "May", Revenue: 26500 },
  { name: "Jun", Revenue: 32800 },
  { name: "Jul", Revenue: 38200 },
  { name: "Aug", Revenue: 35600 },
  { name: "Sep", Revenue: 40100 },
  { name: "Oct", Revenue: 45200 },
];

const config = {
  Revenue: {
    label: "Revenue",
    theme: {
      light: "#00a3a1",
      dark: "#00a3a1",
    },
  },
};

export function RevenueChart() {
  return (
    <ChartContainer
      config={config}
      className="aspect-[4/3] w-full rounded-xl border bg-background p-4"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 8,
            left: 8,
            bottom: 8,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
          />
          <YAxis
            tickFormatter={(value) => `$${value / 1000}k`}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={12}
          />
          <ChartTooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                label={label}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
            )}
          />
          <Line
            type="monotone"
            dataKey="Revenue"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-Revenue)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-Revenue)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
