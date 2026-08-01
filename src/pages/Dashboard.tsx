import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProjectStatusTimeline from "@/components/ProjectStatusTimeline";
import AIChat from "@/components/AIChat";
import useAIInsights from "@/hooks/use-ai-insights";
import { formatINR } from "@/lib/utils";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { motion } from "framer-motion";

const mockStats = {
  totalRevenue: 125000,
  pendingPayments: 8500,
  overduePayments: 3200,
  totalClients: 12,
  activeProjects: 5,
  completedProjects: 23,
  monthlyProfit: 18500,
  totalExpenses: 4200,
  netEarnings: 14300,
  avgProjectValue: 5400,
};

const monthlyRevenueData = [
  { month: "Jan", revenue: 8500 },
  { month: "Feb", revenue: 12000 },
  { month: "Mar", revenue: 9800 },
  { month: "Apr", revenue: 15000 },
  { month: "May", revenue: 11000 },
  { month: "Jun", revenue: 13500 },
];

const revenueByClientData = [
  { name: "Alex Rivera", value: 45000 },
  { name: "Samira Khan", value: 25000 },
  { name: "John Smith", value: 18000 },
  { name: "Others", value: 37000 },
];

const paymentStatusData = [
  { name: "Paid", value: 65 },
  { name: "Pending", value: 20 },
  { name: "Overdue", value: 15 },
];

const expenseBreakdownData = [
  { name: "Software", value: 1200 },
  { name: "Equipment", value: 800 },
  { name: "Travel", value: 500 },
  { name: "Other", value: 1700 },
];

const profitTrendData = [
  { month: "Jan", profit: 5200 },
  { month: "Feb", profit: 7800 },
  { month: "Mar", profit: 6500 },
  { month: "Apr", profit: 9200 },
  { month: "May", profit: 7100 },
  { month: "Jun", profit: 8900 },
];

const cashFlowData = [
  { month: "Jan", inflow: 8500, outflow: 1200 },
  { month: "Feb", inflow: 12000, outflow: 1500 },
  { month: "Mar", inflow: 9800, outflow: 1800 },
  { month: "Apr", inflow: 15000, outflow: 1100 },
  { month: "May", inflow: 11000, outflow: 1600 },
  { month: "Jun", inflow: 13500, outflow: 1400 },
];

const COLORS = ["#2DD4BF", "#60A5FA", "#FBBF24", "#F87171"];

const StatCard = ({ title, value, subtitle, trend }: { title: string; value: string; subtitle?: string; trend?: "up" | "down" | "neutral" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-xl bg-white/[0.04] border border-white/5 backdrop-blur-sm p-6 relative overflow-hidden group"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-[#2DD4BF]/20 group-hover:bg-[#2DD4BF]/50 transition-colors" />
    <p className="text-sm text-gray-500 font-medium">{title}</p>
    <p className="text-2xl font-mono mt-2 text-white">{value}</p>
    {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
  </motion.div>
);

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-xl bg-white/[0.04] border border-white/5 backdrop-blur-sm p-6">
    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">{title}</h3>
    <div className="h-64">
      {children}
    </div>
  </div>
);

const Dashboard = () => {
  const { fetchAIInsights } = useAIInsights();
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  useEffect(() => {
    fetchAIInsights();
  }, [fetchAIInsights]);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
      </header>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={formatINR(mockStats.totalRevenue)} subtitle="All time" />
        <StatCard title="Pending Payments" value={formatINR(mockStats.pendingPayments)} subtitle="Awaiting payment" />
        <StatCard title="Overdue Payments" value={formatINR(mockStats.overduePayments)} subtitle="Past due" />
        <StatCard title="Total Clients" value={mockStats.totalClients.toString()} subtitle="Active clients" />
        <StatCard title="Active Projects" value={mockStats.activeProjects.toString()} subtitle="In progress" />
        <StatCard title="Completed Projects" value={mockStats.completedProjects.toString()} subtitle="Finished" />
        <StatCard title="Monthly Profit" value={formatINR(mockStats.monthlyProfit)} subtitle="This month" />
        <StatCard title="Net Earnings" value={formatINR(mockStats.netEarnings)} subtitle="After expenses" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard title="Monthly Revenue">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenueData}>
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(11, 12, 14, 0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="revenue" fill="#2DD4BF" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Revenue by Client">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByClientData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueByClientData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(11, 12, 14, 0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Payment Status Distribution">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(11, 12, 14, 0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Profit Trend">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitTrendData}>
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(11, 12, 14, 0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="profit" stroke="#2DD4BF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
    </div>
  );
};

export default Dashboard;