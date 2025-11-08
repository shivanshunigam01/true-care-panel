// src/lib/api.ts
import { Lead } from "@/types/leads";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://api.truehospitals.com/leads";

export const getLeads = async (): Promise<Lead[]> => {
  const { data } = await axios.get(API_URL);
  return data.leads;
};

export const addLead = async (lead: Omit<Lead, "_id">): Promise<Lead> => {
  const { data } = await axios.post(API_URL, lead);
  return data.lead;
};

export const updateLead = async (
  id: string,
  lead: Partial<Lead>
): Promise<Lead> => {
  const { data } = await axios.put(`${API_URL}/${id}`, lead);
  return data.lead;
};

export const deleteLead = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
