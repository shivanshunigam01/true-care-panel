import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Lead } from "@/utils/localStorageHelpers";

interface CategoryPieChartProps {
  leads: Lead[];
}

export const CategoryPieChart = ({ leads }: CategoryPieChartProps) => {
  const data = [
    {
      name: "General Surgeon",
      value: leads.filter((l) => l.category === "General Surgeon").length,
    },
    {
      name: "Gynecologist",
      value: leads.filter((l) => l.category === "Gynecologist").length,
    },
  ];

  const COLORS = ["hsl(var(--primary))", "hsl(var(--info))"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Category Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
