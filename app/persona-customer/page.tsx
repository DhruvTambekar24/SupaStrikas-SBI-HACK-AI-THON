"use client";

import { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCircle2, PieChart } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Persona {
  Name: string;
  Policy_Type: string;
}

export default function PersonaDashboard() {
  const [description, setDescription] = useState("");
  const [persona, setPersona] = useState<Persona[] | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchPersona = async () => {
    if (!description.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5003/get_persona", {
        description,
      });
      setPersona(response.data);
      generateChartData(response.data);
    } catch (error) {
      console.error("Error fetching persona:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateChartData = (data: Persona[]) => {
    const policyCounts: Record<string, number> = {};
    data.forEach((p) => {
      policyCounts[p.Policy_Type] = (policyCounts[p.Policy_Type] || 0) + 1;
    });

    const total = Object.values(policyCounts).reduce((acc, val) => acc + val, 0);
    setTotal(total);
    setChartData({
      labels: Object.keys(policyCounts),
      datasets: [
        {
          label: "Recommended Policies",
          data: Object.values(policyCounts),
          backgroundColor: [
            "#FF6384", // Red
            "#36A2EB", // Blue
            "#FFCE56", // Yellow
            "#4BC0C0", // Teal
            "#9966FF", // Purple
            "#FF9F40", // Orange
            "#C9CBCF", // Gray
          ],
          borderColor: "#ffffff",
          borderWidth: 2,
          hoverOffset: 10,
        },
      ],
    });
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">
            Customer Persona Finder
          </h1>
          <p className="text-muted-foreground">
            Enter customer needs to find matching personas and policy recommendations
          </p>
        </div>

        <Card className="p-6">
          <div className="flex gap-4">
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe customer needs..."
              className="flex-1"
            />
            <Button onClick={fetchPersona} disabled={loading || !description.trim()}>
              {loading ? "Searching..." : "Find Persona"}
            </Button>
          </div>
        </Card>

        {persona && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <UserCircle2 className="h-5 w-5" />
                <h2 className="font-semibold">Similar Customer Personas</h2>
              </div>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {persona.map((p, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{p.Name}</span>
                        <span className="text-sm px-3 py-1 bg-secondary rounded-full">
                          {p.Policy_Type}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {chartData && (
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <PieChart className="h-5 w-5" />
                  <h2 className="font-semibold">Policy Distribution</h2>
                </div>
                <div className="h-[300px] flex items-center justify-center">
                  <Pie
                    data={chartData}
                    options={{
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                        tooltip: {
                          callbacks: {
                            label: function (tooltipItem: any) {
                              const dataset = tooltipItem.dataset;
                              const index = tooltipItem.dataIndex;
                              const value = dataset.data[index];
                              const percentage = ((value / total) * 100).toFixed(2);
                              return `${dataset.labels[index]}: ${value} (${percentage}%)`;
                            },
                          },
                        },
                      },
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
