import { Users, ClipboardList, HeartPulse, TrendingUp, ArrowRight } from "lucide-react";
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
import { getLeads } from "@/utils/localStorageHelpers";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const leads = getLeads();
  const recentLeads = leads.slice(-5).reverse();

  const stats = {
    total: leads.length,
    generalSurgeon: leads.filter((l) => l.category === "General Surgeon").length,
    gynecologist: leads.filter((l) => l.category === "Gynecologist").length,
    converted: leads.filter((l) => l.status === "Converted").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to T.R.U.E. Hospitals Admin Panel</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Leads"
          value={stats.total}
          icon={Users}
          trend="+12% from last month"
        />
        <StatCard
          title="General Surgeon"
          value={stats.generalSurgeon}
          icon={ClipboardList}
          iconColor="text-info"
        />
        <StatCard
          title="Gynecology"
          value={stats.gynecologist}
          icon={HeartPulse}
          iconColor="text-warning"
        />
        <StatCard
          title="Converted"
          value={stats.converted}
          icon={TrendingUp}
          iconColor="text-success"
        />
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
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No leads yet
                  </TableCell>
                </TableRow>
              ) : (
                recentLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.category}</Badge>
                    </TableCell>
                    <TableCell>{lead.date}</TableCell>
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
