"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { LeadModal } from "@/components/admin/LeadModal";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/hooks/use-toast";
import { getLeads, addLead, updateLead, deleteLead } from "@/lib/api";
import { Lead } from "@/types/leads";

export default function Leads() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);

  // ✅ Fetch all leads on mount
  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      toast({ title: "Error", description: "Failed to load leads." });
    }
  };

  const handleAddLead = () => {
    setSelectedLead(undefined);
    setIsModalOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleSaveLead = async (lead: Omit<Lead, "_id"> | Lead) => {
    try {
      if ("_id" in lead && lead._id) {
        await updateLead(lead._id, lead);
        toast({ title: "Success", description: "Lead updated successfully!" });
      } else {
        await addLead(lead);
        toast({ title: "Success", description: "Lead added successfully!" });
      }
      await loadLeads();
      setIsModalOpen(false);
    } catch (err) {
      toast({ title: "Error", description: "Unable to save lead." });
    }
  };

  const handleDeleteClick = (id: string) => {
    setLeadToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (leadToDelete) {
      try {
        await deleteLead(leadToDelete);
        toast({ title: "Success", description: "Lead deleted successfully!" });
        await loadLeads();
      } catch {
        toast({ title: "Error", description: "Failed to delete lead." });
      }
      setLeadToDelete(null);
      setIsConfirmOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Leads Management
          </h1>
          <p className="text-muted-foreground">Manage all your patient leads</p>
        </div>
        <Button onClick={handleAddLead} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Lead
        </Button>
      </div>

      <LeadsTable
        leads={leads}
        onEdit={handleEditLead}
        onDelete={handleDeleteClick}
      />

      <LeadModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLead}
        lead={selectedLead}
      />

      <ConfirmModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Lead"
        description="Are you sure you want to delete this lead? This action cannot be undone."
      />
    </div>
  );
}
