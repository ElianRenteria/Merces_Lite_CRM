import { Client } from './Client';
import { Service } from './Service';

export type Invoice = {
  id: number;// Unique identifier for the invoice
  invoice_number: string;// Name of the invoice
  date: Date;//  Date of the invoice
  amount: number;// Total amount of the invoice
  client: Client;
  services: Service[]; // Services  provided in the invoice
  created_at?: Date; // Timestamp when the invoice was created
  updated_at?: Date; // Timestamp when the invoice was last updated
  status: InvoiceStatus; //Status of the invoice, if it has been paid or not
};

export type InvoiceStatus = "DRAFT" | "VIEWED" | "SENT" | "PARTIALLY_PAID" | "WRITTEN_OFF" | "OVERDUE" | "DISPUTED";

export const InvoiceStatusOptions = [
  { value: "DRAFT", label: "Draft" },
  { value: "VIEWED", label: "Viewed" },
  { value: "SENT", label: "Sent" },
  { value: "PARTIALLY_PAID", label: "Partially Paid" },
  { value: "WRITTEN_OFF", label: "Written Off" },
  { value: "OVERDUE", label: "Overdue" },
  { value: "DISPUTED", label: "Disputed" },
];

export type CreateInvoice = {
  id: number;// Unique identifier for the invoice
  invoice_number: string;// Name of the invoice
  date: Date;//  Date of the invoice
  amount: number;// Total amount of the invoice
  client_id: number;
  services: Service[]; // Services  provided in the invoice
  created_at?: Date; // Timestamp when the invoice was created
  updated_at?: Date; // Timestamp when the invoice was last updated
  status: InvoiceStatus; //Status of the invoice, if it has been paid or not
};