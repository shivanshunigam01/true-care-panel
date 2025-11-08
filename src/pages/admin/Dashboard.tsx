"use client";
import {
  Users,
  ClipboardList,
  HeartPulse,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getLeads } from "@/lib/api";
import { Lead } from "@/types/leads";

export default function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (err) {
        console.error("Error fetching leads:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-muted-foreground">Loading...</div>
    );

  const recentLeads = leads.slice(-5).reverse();

  const stats = {
    total: leads.length,
    generalSurgeon: leads.filter((l) => l.category === "General Surgeon")
      .length,
    gynecologist: leads.filter((l) => l.category === "Gynecologist").length,
    converted: leads.filter((l) => l.status === "Converted").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to T.R.U.E. Hospitals Admin Panel
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Leads"
          value={stats.total}
          icon={Users}
          trend="+12%"
        />
        <StatCard
          title="General Surgeon"
          value={stats.generalSurgeon}
          icon={ClipboardList}
        />
        <StatCard
          title="Gynecology"
          value={stats.gynecologist}
          icon={HeartPulse}
        />
        <StatCard title="Converted" value={stats.converted} icon={TrendingUp} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Leads</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/leads")}
            className="gap-2"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No leads yet
                  </TableCell>
                </TableRow>
              ) : (
                recentLeads.map((lead) => (
                  <TableRow key={lead._id}>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.category}</Badge>
                    </TableCell>
                    <TableCell>{lead.date.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          lead.status === "New"
                            ? "bg-info text-info-foreground"
                            : lead.status === "Contacted"
                            ? "bg-warning text-warning-foreground"
                            : "bg-success text-success-foreground"
                        }
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
