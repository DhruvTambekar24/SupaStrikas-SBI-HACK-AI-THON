"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Shield, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    Age: "",
    Income: "",
    MaritalStatus: "Single",
    NumChildren: "",
    AgeChild1: "",
    AgeChild2: "",
  });

  const [predictions, setPredictions] = useState<Predictions | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAllPlans, setShowAllPlans] = useState(false);

  const [allPlans, setAllPlans] = useState<
    { planName: string; brochureLink: string }[]
  >([
    { planName: "SBI Life - Smart Fortune Builder", brochureLink: "/policies/fortunebuilder.pdf" },
    { planName: "SBI Life - Retire Smart Plus", brochureLink: "/policies/retirementsmartplus.pdf" },
    { planName: "SBI Life - Smart Elite Plus", brochureLink: "/policies/smarteliteplus.pdf" },
    { planName: "SBI Life - Smart Platina Supreme", brochureLink: "/policies/smartplatinasupreme.pdf" },
    { planName: "SBI Life - Smart Privilege Plus", brochureLink: "/policies/smartprivilegeplus.pdf" },
    { planName: "SBI Life - Smart Shield", brochureLink: "/policies/smartsheild.pdf" },
    { planName: "SBI Life - Smart Bachat Plus", brochureLink: "/policies/smartbachatplus.pdf" },
    { planName: "SBI Life - Smart Platina Assure", brochureLink: "/policies/smartplatinaassure.pdf" },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };

  interface FormData {
    Age: string;
    Income: string;
    MaritalStatus: string;
    NumChildren: string;
    AgeChild1: string;
    AgeChild2: string;
  }

  interface Predictions {
    "Best Plan 1": string;
    "Best Plan 2": string;
  }

  const handleMaritalStatusChange = (value: string) => {
    setFormData((prev: FormData) => ({ ...prev, MaritalStatus: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError(null);
    setPredictions(null);
    setLoading(true);

    const userInput: {
      Age: number;
      Income: number;
      MaritalStatus: string;
      NumChildren: number;
      AgeChild1: number;
      AgeChild2: number;
    } = {
      Age: parseInt(formData.Age),
      Income: parseFloat(formData.Income),
      MaritalStatus: formData.MaritalStatus,
      NumChildren: parseInt(formData.NumChildren) || 0,
      AgeChild1: parseFloat(formData.AgeChild1) || 0.0,
      AgeChild2: parseFloat(formData.AgeChild2) || 0.0,
    };

    try {
      const response = await axios.post<{
        "Best Plan 1": string;
        "Best Plan 2": string;
      }>("http://127.0.0.1:5001/predict", userInput);
      // If both plans are the same, change one of them
      const data = response.data;
      if (data["Best Plan 1"] === data["Best Plan 2"]) {
        data["Best Plan 2"] = "Retirement Smart Plus"; // Change to some default or alternate policy
      }
      setPredictions(data);
    } catch (err) {
      setError("Error: Could not fetch predictions. Please try again later.");
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openBrochure = (planName: string) => {
    const brochures: { [key: string]: string } = {
      "Fortune Builder": "/policies/fortunebuilder.pdf",
      "Retirement Smart Plus": "/policies/retirementsmartplus.pdf",
      "Smart Elite Plus": "/policies/smarteliteplus.pdf",
      "Smart Platina Supreme": "/policies/smartplatinasupreme.pdf",
      "Smart Privilege": "/policies/smartprivilegeplus.pdf",
      "Smart Shield": "/policies/smartsheild.pdf",
      "Smart Bachat Plus": "/policies/smartbachatplus.pdf",
      "Smart Platina Assure": "/policies/smartplatinaassure.pdf",
    };
    const url = brochures[planName];
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <img src="SBI-Logo.jpg" className="w-50 h-10 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Insurance Plan Recommender
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find the perfect insurance plan tailored to your needs
          </p>
        </div>

        <Card className="p-6 md:p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Fields */}
              <div className="space-y-2">
                <Label htmlFor="Age">Age</Label>
                <Input
                  id="Age"
                  name="Age"
                  type="number"
                  value={formData.Age}
                  onChange={handleChange}
                  required
                  placeholder="Enter your age"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="Income">Annual Income (LPA)</Label>
                <Input
                  id="Income"
                  name="Income"
                  type="number"
                  step="0.01"
                  value={formData.Income}
                  onChange={handleChange}
                  required
                  placeholder="Enter your income"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="MaritalStatus">Marital Status</Label>
                <Select
                  value={formData.MaritalStatus}
                  onValueChange={handleMaritalStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="NumChildren">Number of Children</Label>
                <Input
                  id="NumChildren"
                  name="NumChildren"
                  type="number"
                  value={formData.NumChildren}
                  onChange={handleChange}
                  placeholder="Number of children"
                  className="w-full"
                />
              </div>

              {parseInt(formData.NumChildren) > 0 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="AgeChild1">Age of Child 1</Label>
                    <Input
                      id="AgeChild1"
                      name="AgeChild1"
                      type="number"
                      step="0.1"
                      value={formData.AgeChild1}
                      onChange={handleChange}
                      placeholder="Age of first child"
                      className="w-full"
                    />
                  </div>

                  {parseInt(formData.NumChildren) > 1 && (
                    <div className="space-y-2">
                      <Label htmlFor="AgeChild2">Age of Child 2</Label>
                      <Input
                        id="AgeChild2"
                        name="AgeChild2"
                        type="number"
                        step="0.1"
                        value={formData.AgeChild2}
                        onChange={handleChange}
                        placeholder="Age of second child"
                        className="w-full"
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Predict Best Plans"
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {predictions && (
            <div className="mt-8 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Recommended SBI Plans
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Display Best Plan 1 */}
                <Card className="p-6 bg-primary/5">
                  <h3 className="text-lg font-semibold mb-2">Best Plan 1</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {predictions["Best Plan 1"]}
                  </p>
                  <Button
  onClick={() => openBrochure(predictions["Best Plan 1"])}
  className="mt-4 w-full"
  style={{
    background: 'linear-gradient(90deg, rgba(182,29,85,1) 35%, rgba(40,0,113,1) 100%)',
  }}
>
  View Brochure
</Button>

                </Card>

                {/* Display Best Plan 2 */}
                <Card className="p-6 bg-primary/5">
                  <h3 className="text-lg font-semibold mb-2">Best Plan 2</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {predictions["Best Plan 2"]}
                  </p>
                  <Button
                    onClick={() => openBrochure(predictions["Best Plan 2"])}
                    className="mt-4 w-full"
                    style={{
                        background: 'linear-gradient(90deg, rgba(182,29,85,1) 35%, rgba(40,0,113,1) 100%)',
                      }}
                  >
                    View Brochure
                  </Button>
                </Card>
              </div>

              {/* Button to toggle visibility of all plans */}
              <Button
                onClick={() => setShowAllPlans(!showAllPlans)}
                className="mt-8 w-full bg-primary text-white bg-blue-600 hover:bg-blue-700"
              >
                View All Plans
              </Button>

              {/* Show all plans in a table format */}
              {showAllPlans && (
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full table-auto bg-white dark:bg-gray-900 shadow-md rounded-lg">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Plan Name
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          View Brochure
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPlans.map((plan, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 dark:border-gray-700"
                        >
                          <td className="py-3 px-6 text-sm text-gray-700 dark:text-gray-300">
                            {plan.planName}
                          </td>
                          <td className="py-3 px-6 text-sm text-gray-700 dark:text-gray-300">
                            <Button
                              onClick={() => openBrochure(plan.brochureLink)}
                              className="mt-4 w-full bg-primary text-white"
                              style={{
                                background: 'linear-gradient(90deg, rgba(182,29,85,1) 35%, rgba(40,0,113,1) 100%)',
                              }}
                            >
                              View Brochure
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
