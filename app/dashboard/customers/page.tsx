"use client";

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download } from "lucide-react";

const mockCustomers = [
  {
    id: 1,
    name: "Amit Verma",
    email: "amit.verma@example.com",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60",
    initials: "AV",
    policies: ["FlexiSecure Plan", "Health Guard"],
    status: "Active",
    lastContact: "2024-03-15",
    premium: "$250/month",
  },
  {
    id: 2,
    name: "Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
    initials: "SK",
    policies: ["SmartLife Protection"],
    status: "Pending",
    lastContact: "2024-03-14",
    premium: "$180/month",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    avatar: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&auto=format&fit=crop&q=60",
    initials: "RM",
    policies: ["EasyCover Insurance", "Term Life Plus"],
    status: "Active",
    lastContact: "2024-03-13",
    premium: "$350/month",
  },
  {
    id: 4,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&auto=format&fit=crop&q=60",
    initials: "PS",
    policies: ["FlexiSecure Plan", "Health Guard"],
    status: "Active",
    lastContact: "2024-03-15",
    premium: "$250/month",
  },
  {
    id: 5,
    name: "Rohan Singh",
    email: "rohan.singh@example.com",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&auto=format&fit=crop&q=60",
    initials: "RS",
    policies: ["SmartLife Protection"],
    status: "Pending",
    lastContact: "2024-03-14",
    premium: "$180/month",
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-500/10 text-green-500";
    case "pending":
      return "bg-yellow-500/10 text-yellow-500";
    default:
      return "bg-gray-500/10 text-gray-500";
  }
};

export default function Customers() {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="link" onClick={() => router.push("/dashboard")} className="text-left">
          &larr; Back to Dashboard
        </Button>
        <h1 className="text-2xl font-semibold text-center flex-1">
          Customer Management
        </h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-9 w-full"
              />
            </div>
            <Button>Add Customer</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Policies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={customer.avatar} alt={customer.name} />
                        <AvatarFallback>{customer.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {customer.policies.map((policy, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="whitespace-nowrap"
                        >
                          {policy}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.lastContact}</TableCell>
                  <TableCell>{customer.premium}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
