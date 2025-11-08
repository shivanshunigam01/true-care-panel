import { ReactNode } from "react";

export interface Lead {
  leadId: ReactNode;
  id: any;
  _id?: string;
  name: string;
  phone: string;
  category: "General Surgeon" | "Gynecologist";
  surgeryType?: string;
  concern?: string;
  status: "New" | "Contacted" | "Converted";
  date: string;
}
