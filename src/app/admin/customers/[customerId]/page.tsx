"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CustomerDetailPageProps {
  params: {
    customerId: string;
  };
}

export default function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Customers
        </Button>
        <h1 className="text-2xl font-semibold text-gray-900">
          Customer Details - {params.customerId}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Customer ID:{" "}
            <span className="font-medium text-green-700">
              {params.customerId}
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This is a placeholder page for customer details. You can implement
            the full customer profile here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
