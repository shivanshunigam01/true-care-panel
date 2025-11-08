import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { LeadModal } from "@/components/admin/LeadModal";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/hooks/use-toast";
import {
  getLeads,
  addLead,
  updateLead,
  deleteLead,
  Lead,
} from "@/utils/localStorageHelpers";

export default function Leads() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>(getLeads());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const [leadToDelete, setLeadToDelete] = useState<number | null>(null);

  const handleAddLead = () => {
    setSelectedLead(undefined);
    setIsModalOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleSaveLead = (lead: Omit<Lead, "id"> | Lead) => {
    if ("id" in lead) {
      updateLead(lead.id, lead);
      toast({
        title: "Success",
        description: "Lead updated successfully!",
      });
    } else {
      addLead(lead);
      toast({
        title: "Success",
        description: "Lead added successfully!",
      });
    }
    setLeads(getLeads());
    setIsModalOpen(false);
  };

  const handleDeleteClick = (id: number) => {
    setLeadToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (leadToDelete !== null) {
      deleteLead(leadToDelete);
      setLeads(getLeads());
      toast({
        title: "Success",
        description: "Lead deleted successfully!",
      });
    }
    setIsConfirmOpen(false);
    setLeadToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads Management</h1>
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
