import { useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lead } from "@/types/leads";

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

export const LeadsTable = ({ leads, onEdit, onDelete }: LeadsTableProps) => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // ✅ Sort by most recent first
  const sortedLeads = [...leads].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // ✅ Filter by name, phone, category
  const filteredLeads = sortedLeads.filter((lead) => {
    const phoneString = lead.phone?.toString() || "";
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      phoneString.includes(search);
    const matchesCategory =
      categoryFilter === "all" || lead.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // ✅ Badge style for status
  const getStatusBadge = (status: Lead["status"]) => {
    const variants = {
      New: "bg-info text-info-foreground",
      Contacted: "bg-warning text-warning-foreground",
      Converted: "bg-success text-success-foreground",
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* 🔍 Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="General Surgeon">General Surgeon</SelectItem>
            <SelectItem value="Gynecologist">Gynecologist</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 📋 Leads Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-muted-foreground"
                >
                  No leads found
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead, index) => (
                <TableRow
                  key={lead._id || index}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium text-muted-foreground">
                    {lead.leadId || index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.category}</Badge>
                  </TableCell>
                  <TableCell>{lead.surgeryType || lead.concern || "-"}</TableCell>
                  <TableCell>
                    {lead.date ? lead.date.split("T")[0] : "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(lead.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(lead)}
                        title="Edit Lead"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => lead._id && onDelete(lead._id)}
                        className="text-destructive hover:text-destructive"
                        title="Delete Lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
