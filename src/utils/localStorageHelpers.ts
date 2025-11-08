export interface Lead {
  id: number;
  name: string;
  phone: string;
  category: "General Surgeon" | "Gynecologist";
  surgeryType?: string;
  concern?: string;
  date: string;
  status: "New" | "Contacted" | "Converted";
}

const STORAGE_KEY = "true_hospital_leads";

export const getLeads = (): Lead[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getSampleData();
  } catch (error) {
    console.error("Error reading leads:", error);
    return getSampleData();
  }
};

export const saveLeads = (leads: Lead[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (error) {
    console.error("Error saving leads:", error);
  }
};

export const addLead = (lead: Omit<Lead, "id">): Lead => {
  const leads = getLeads();
  const newLead = {
    ...lead,
    id: leads.length > 0 ? Math.max(...leads.map((l) => l.id)) + 1 : 1,
  };
  saveLeads([...leads, newLead]);
  return newLead;
};

export const updateLead = (id: number, updates: Partial<Lead>): void => {
  const leads = getLeads();
  const updatedLeads = leads.map((lead) =>
    lead.id === id ? { ...lead, ...updates } : lead
  );
  saveLeads(updatedLeads);
};

export const deleteLead = (id: number): void => {
  const leads = getLeads();
  saveLeads(leads.filter((lead) => lead.id !== id));
};

const getSampleData = (): Lead[] => [
  {
    id: 1,
    name: "Ramesh Gupta",
    phone: "9876543210",
    category: "General Surgeon",
    surgeryType: "Hernia Repair",
    date: new Date().toISOString().split("T")[0],
    status: "New",
  },
  {
    id: 2,
    name: "Sunita Devi",
    phone: "9988776655",
    category: "Gynecologist",
    concern: "Pregnancy Care",
    date: new Date().toISOString().split("T")[0],
    status: "Converted",
  },
  {
    id: 3,
    name: "Anil Kumar",
    phone: "9123456789",
    category: "General Surgeon",
    surgeryType: "Appendectomy",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    status: "Contacted",
  },
];
