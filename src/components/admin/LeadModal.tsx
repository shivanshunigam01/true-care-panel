import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lead } from "@/types/leads";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (lead: Omit<Lead, "id"> | Lead) => void;
  lead?: Lead;
}

export const LeadModal = ({ open, onClose, onSave, lead }: LeadModalProps) => {
  const [formData, setFormData] = useState<Omit<Lead, "id">>({
    name: "",
    phone: "",
    category: "General Surgeon",
    surgeryType: "",
    concern: "",
    date: new Date().toISOString().split("T")[0],
    status: "New",
  });

  useEffect(() => {
    if (lead) {
      setFormData(lead);
    } else {
      setFormData({
        name: "",
        phone: "",
        category: "General Surgeon",
        surgeryType: "",
        concern: "",
        date: new Date(),
        status: "New",
      });
    }
  }, [lead, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lead) {
      onSave({ ...formData, id: lead.id });
    } else {
      onSave(formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{lead ? "Edit Lead" : "Add New Lead"}</DialogTitle>
            <DialogDescription>
              {lead
                ? "Update the lead information below."
                : "Fill in the details to add a new lead."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: "General Surgeon" | "Gynecologist") =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Surgeon">
                    General Surgeon
                  </SelectItem>
                  <SelectItem value="Gynecologist">Gynecologist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.category === "General Surgeon" ? (
              <div className="grid gap-2">
                <Label htmlFor="surgeryType">Surgery Type</Label>
                <Input
                  id="surgeryType"
                  value={formData.surgeryType || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, surgeryType: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="concern">Concern</Label>
                <Input
                  id="concern"
                  value={formData.concern || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, concern: e.target.value })
                  }
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "New" | "Contacted" | "Converted") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{lead ? "Update" : "Add"} Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
