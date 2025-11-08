import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", converted: 15, total: 45 },
  { month: "Feb", converted: 20, total: 55 },
  { month: "Mar", converted: 25, total: 60 },
  { month: "Apr", converted: 30, total: 70 },
  { month: "May", converted: 28, total: 65 },
  { month: "Jun", converted: 35, total: 75 },
];

export const ConversionBarChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Rate Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Bar dataKey="converted" fill="hsl(var(--success))" name="Converted" />
            <Bar dataKey="total" fill="hsl(var(--muted))" name="Total Leads" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
