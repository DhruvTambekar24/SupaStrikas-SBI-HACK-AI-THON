"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, LineChart, Shield, Users } from "lucide-react";
import axios from "axios";

import { useEffect } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    age: "30",
    gender: "M",
    income: "500000",
    policy_type: "Term",
    policy_duration: "10",
    premium_amount: "20000",
    claim_history: "0",
    missed_payments: "1",
    customer_support_calls: "2",
    sentiment_score: "0.5",
    website_visit_frequency: "5",
    app_usage_frequency: "10",
    time_since_last_interaction: "30",
    days_since_last_payment: "30",
  });

  type ResultType = {
    churn_prediction: number;
    churn_probability: string;
  };

  const [result, setResult] = useState<ResultType | null>(null);

  type FormDataKey = keyof typeof formData;

  const handleChange = (name: FormDataKey, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const genderMap = { M: 0, F: 1 };
    const policyMap = { Term: 0, ULIP: 1, "Whole Life": 2 };

    const requestData = {
      features: [
        parseInt(formData.age),
        genderMap[formData.gender as keyof typeof genderMap],
        parseInt(formData.income),
        policyMap[formData.policy_type as keyof typeof policyMap],
        parseInt(formData.policy_duration),
        parseInt(formData.premium_amount),
        parseInt(formData.claim_history),
        parseInt(formData.missed_payments),
        parseInt(formData.customer_support_calls),
        parseFloat(formData.sentiment_score),
        parseInt(formData.website_visit_frequency),
        parseInt(formData.app_usage_frequency),
        parseInt(formData.time_since_last_interaction),
        parseInt(formData.days_since_last_payment), // Include new feature
      ],
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", requestData);
      setResult(response.data); // Update result state
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  // Log result whenever it changes
  useEffect(() => {
    console.log(result); // This will log the result after it has been updated
  }, [result]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Insurance Customer Insights
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Predict customer behavior and reduce churn with our advanced analytics platform
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: "Total Customers", value: "10,000+" },
            { icon: Shield, label: "Active Policies", value: "8,500+" },
            { icon: CheckCircle2, label: "Retention Rate", value: "95%" },
            { icon: LineChart, label: "Accuracy Rate", value: "98%" },
          ].map((stat, index) => (
            <Card key={index} className="p-6 flex items-center space-x-4">
              <stat.icon className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Customer Analysis</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income</Label>
                  <Input
                    id="income"
                    type="number"
                    value={formData.income}
                    onChange={(e) => handleChange("income", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policy_type">Policy Type</Label>
                  <Select value={formData.policy_type} onValueChange={(value) => handleChange("policy_type", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Term">Term</SelectItem>
                      <SelectItem value="ULIP">ULIP</SelectItem>
                      <SelectItem value="Whole Life">Whole Life</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Policy Duration (years)", name: "policy_duration" },
                  { label: "Premium Amount", name: "premium_amount" },
                  { label: "Claims Filed", name: "claim_history" },
                  { label: "Missed Payments", name: "missed_payments" },
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Input
                      id={field.name}
                      type="number"
                      value={formData[field.name as FormDataKey]}
                      onChange={(e) => handleChange(field.name as FormDataKey, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <Button type="submit" className="w-full">
                Analyze Customer Risk
              </Button>
            </form>
          </Card>

          {/* Results */}
          <Card className="p-6">
  <h2 className="text-2xl font-semibold mb-6">Analysis Results</h2>
  {result ? (
    <div className="space-y-6">
      {/* Churn Prediction Section */}
      <div className={`p-6 rounded-lg ${result.churn_prediction === 1 ? "bg-destructive/10 text-destructive" : "bg-green-100 text-green-800"}`}>
        <div className="flex items-center space-x-3">
          {result.churn_prediction === 1 ? (
            <AlertCircle className="h-6 w-6" />
          ) : (
            <CheckCircle2 className="h-6 w-6" />
          )}
          <h3 className="text-xl font-semibold">
            {result.churn_prediction === 1 ? "High Risk of Churn" : "Low Risk of Churn"}
          </h3>
        </div>
        <p className="mt-2">Probability: {result.churn_probability}%</p>
      </div>

      {/* Recommendations Section */}
      <div className="space-y-4">
        <h4 className="font-semibold">Recommendations:</h4>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          {result.churn_prediction === 1 ? (
            <>
              <li>Schedule a personal consultation</li>
              <li>Review policy terms and benefits</li>
              <li>Offer loyalty rewards program</li>
              <li>Provide premium payment flexibility</li>
            </>
          ) : (
            <>
              <li>Continue regular engagement</li>
              <li>Consider upsell opportunities</li>
              <li>Maintain excellent service quality</li>
              <li>Request referrals</li>
            </>
          )}
        </ul>
      </div>
    </div>
  ) : (
    <div className="h-full flex items-center justify-center text-muted-foreground">
      Enter customer details and analyze to see predictions
    </div>
  )}
</Card>

        </div>
      </div>
    </main>
  );
}