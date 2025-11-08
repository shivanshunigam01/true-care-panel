"use client";
import { useEffect, useState } from "react";
import { LeadsLineChart } from "@/components/admin/charts/LeadsLineChart";
import { CategoryPieChart } from "@/components/admin/charts/CategoryPieChart";
import { ConversionBarChart } from "@/components/admin/charts/ConversionBarChart";
import { getLeads } from "@/lib/api";
import { Lead } from "@/types/leads";

export default function Analytics() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Visualize your lead data and conversion trends
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <LeadsLineChart />
        <CategoryPieChart leads={leads} />{" "}
        {/* ✅ leads is now resolved array */}
      </div>

      <div className="grid gap-6">
        <ConversionBarChart />
      </div>
    </div>
  );
}
