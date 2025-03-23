
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample user activity data
const data = [
  { name: "Mon", Active: 420, New: 120 },
  { name: "Tue", Active: 680, New: 180 },
  { name: "Wed", Active: 890, New: 240 },
  { name: "Thu", Active: 1100, New: 280 },
  { name: "Fri", Active: 1500, New: 360 },
  { name: "Sat", Active: 980, New: 220 },
  { name: "Sun", Active: 750, New: 190 },
];

const config = {
  Active: {
    label: "Active Users",
    theme: {
      light: "#00a3a1",
      dark: "#00a3a1",
    },
  },
  New: {
    label: "New Users",
    theme: {
      light: "#86CBC9",
      dark: "#86CBC9",
    },
  },
};

export function UsersChart() {
  return (
    <ChartContainer
      config={config}
      className="aspect-[4/3] w-full rounded-xl border bg-background p-4"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          />
          <YAxis
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
              />
            )}
          />
          <Bar
            dataKey="Active"
            radius={[4, 4, 0, 0]}
            style={{
              fill: "var(--color-Active)",
              opacity: 0.9,
            }}
          />
          <Bar
            dataKey="New"
            radius={[4, 4, 0, 0]}
            style={{
              fill: "var(--color-New)",
              opacity: 0.9,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
