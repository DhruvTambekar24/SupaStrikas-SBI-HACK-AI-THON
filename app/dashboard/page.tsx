"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  TrendingUp,
  PieChart,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";

// Hardcoded data for demonstration
const mockData = {
  agent: {
    name: "Rajesh Kumar",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60",
  },
  customer_message: "I am unhappy with my current policy. It's too expensive.",
  sentiment: "negative",
  conversation_starters: [
    "I understand your concern. Let's explore a policy that fits your budget.",
    "Would you like to see flexible premium payment options?",
    "We offer customized insurance solutions. Let's discuss what works best for you.",
  ],
  recommended_policies: [
    {
      policy_name: "FlexiSecure Plan",
      benefits: "Low premium, flexible payment options",
      monthly_cost: "$15",
      description: "Perfect for budget-conscious customers seeking reliable coverage",
    },
    {
      policy_name: "EasyCover Insurance",
      benefits: "Covers pre-existing conditions, low commitment",
      monthly_cost: "$20",
      description: "Comprehensive coverage with minimal paperwork",
    },
    {
      policy_name: "SmartLife Protection",
      benefits: "High coverage, affordable premiums",
      monthly_cost: "$25",
      description: "Ideal for families looking for complete protection",
    },
  ],
  performance: {
    monthly_sales: [
      { month: "Jan", sales: 65 },
      { month: "Feb", sales: 59 },
      { month: "Mar", sales: 80 },
      { month: "Apr", sales: 81 },
      { month: "May", sales: 56 },
      { month: "Jun", sales: 95 },
    ],
    sentiment_distribution: [
      { name: "Positive", value: 45 },
      { name: "Neutral", value: 30 },
      { name: "Negative", value: 25 },
    ],
    policy_performance: [
      { name: "FlexiSecure", new: 28, renewal: 35 },
      { name: "EasyCover", new: 45, renewal: 25 },
      { name: "SmartLife", new: 32, renewal: 40 },
    ],
    customer_trends: [
      { date: "Mon", active: 31, new: 12 },
      { date: "Tue", active: 40, new: 15 },
      { date: "Wed", active: 28, new: 8 },
      { date: "Thu", active: 45, new: 20 },
      { date: "Fri", active: 50, new: 25 },
    ],
  },
  quick_stats: [
    { title: "Total Policies", value: "1,234", trend: "+12%", icon: TrendingUp },
    { title: "Active Customers", value: "856", trend: "+5%", icon: Users },
    { title: "Monthly Revenue", value: "$45,678", trend: "+8%", icon: BarChart3 },
    { title: "Satisfaction Rate", value: "92%", trend: "+3%", icon: Activity },
  ],
};

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Customers", href: "/dashboard/customers" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const COLORS = ['#10B981', '#FBBF24', '#EF4444'];

const chartDefaults = {
  xAxis: {
    axisLine: true,
    tickLine: true,
  },
  yAxis: {
    axisLine: true,
    tickLine: true,
  },
};

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const router = useRouter(); 

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-green-500/10 text-green-500";
      case "negative":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "🟢";
      case "negative":
        return "🔴";
      default:
        return "🟡";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-16 items-center border-b px-6">
          <h2 className="text-lg font-semibold">SBI Life Dashboard</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.label}
                variant={activeItem === item.label ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => {setActiveItem(item.label); 
                  router.push(item.href);
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-6">
          <h1 className="text-xl font-semibold">Welcome, {mockData.agent.name}</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src={mockData.agent.avatar} alt={mockData.agent.name} />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-4 mb-6">
            {mockData.quick_stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">{stat.trend}</span> from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {/* Monthly Sales Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.performance.monthly_sales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis {...chartDefaults.xAxis} dataKey="month" />
                      <YAxis {...chartDefaults.yAxis} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#10B981"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Policy Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Policy Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.performance.policy_performance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis {...chartDefaults.xAxis} dataKey="name" />
                      <YAxis {...chartDefaults.yAxis} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="new" fill="#10B981" name="New Policies" />
                      <Bar dataKey="renewal" fill="#6366F1" name="Renewals" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-1">
            {/* Sentiment Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border bg-card p-4">
                    <p className="mb-2 text-sm text-muted-foreground">Customer Message:</p>
                    <p className="text-sm">{mockData.customer_message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Sentiment:</span>
                    <Badge className={cn("capitalize", getSentimentColor(mockData.sentiment))}>
                      {getSentimentEmoji(mockData.sentiment)} {mockData.sentiment}
                    </Badge>
                  </div>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="90%" height="90%">
                      <RePieChart>
                        <Pie
                          data={mockData.performance.sentiment_distribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          {mockData.performance.sentiment_distribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
            
          </div>

          {/* Policy Recommendations */}
          <div className="mt-6">
            <h2 className="mb-4 text-xl font-semibold">Recommended Policies</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {mockData.recommended_policies.map((policy, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{policy.policy_name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Benefits</p>
                        <p className="text-sm">{policy.benefits}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Description</p>
                        <p className="text-sm">{policy.description}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                          Monthly Cost
                        </span>
                        <span className="text-lg font-semibold">{policy.monthly_cost}</span>
                      </div>
                      <Button className="w-full">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}