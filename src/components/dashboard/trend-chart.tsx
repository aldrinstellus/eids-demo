"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TrendChartProps {
  data: Array<{
    month: string;
    submitted: number;
    completed: number;
    rejected: number;
  }>;
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Application Trends</span>
            <span className="text-sm font-normal text-muted-foreground">Last 12 months</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]" role="img" aria-label="Application volume trends chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSubmitted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(199 89% 48%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(199 89% 48%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
                <XAxis
                  dataKey="month"
                  stroke="hsl(215 20% 65%)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(215 20% 65%)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222 47% 9%)",
                    border: "1px solid hsl(217 33% 17%)",
                    borderRadius: "8px",
                    color: "hsl(210 40% 98%)",
                  }}
                  labelStyle={{ color: "hsl(215 20% 65%)" }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => (
                    <span style={{ color: "hsl(215 20% 65%)" }}>{value}</span>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="submitted"
                  name="Submitted"
                  stroke="hsl(199 89% 48%)"
                  strokeWidth={2}
                  fill="url(#colorSubmitted)"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  name="Completed"
                  stroke="hsl(142 76% 36%)"
                  strokeWidth={2}
                  fill="url(#colorCompleted)"
                  animationDuration={1500}
                  animationBegin={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Accessible data summary */}
          <details className="mt-4">
            <summary className="text-sm text-primary cursor-pointer hover:underline">
              View data table
            </summary>
            <table className="mt-2 w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Month</th>
                  <th className="text-right py-2">Submitted</th>
                  <th className="text-right py-2">Completed</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(-6).map((row) => (
                  <tr key={row.month} className="border-b border-muted">
                    <td className="py-2">{row.month}</td>
                    <td className="text-right py-2">{row.submitted}</td>
                    <td className="text-right py-2">{row.completed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </CardContent>
      </Card>
    </motion.div>
  );
}
