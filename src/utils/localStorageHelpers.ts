import { Lead } from "@/types/leads";
import { getLeads, updateLead, deleteLead } from "../lib/api";

export const fetchAllLeads = async (): Promise<Lead[]> => await getLeads();
export const addLead = async (lead: Omit<Lead, "id">) => await addLead(lead);
export const editLead = async (id: string, lead: Partial<Lead>) =>
  await updateLead(id, lead);
export const removeLead = async (id: string) => await deleteLead(id);
