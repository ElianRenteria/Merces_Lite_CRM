import { Client } from "../types";

export const initializeClient = () => {
  return {
    id: 0,
    name: "",
    email: "",
    phone: "",
    facsimile: "",
    created_by: 0,
    contact_person: "",
    company_name: "",
    industry: "",
    website: "",
    notes: "",
    created_at: new Date(),
    updated_at: new Date(),
    status: "active",
    address_line1: "",
    address_line2: "",
    address_city: "",
    address_state: "",
    address_postal_code: "",
    address_country: "",
    billing_address_line1: "",
    billing_address_line2: "",
    billing_address_city: "",
    billing_address_state: "",
    billing_address_postal_code: "",
    billing_address_country: "",
  } as Client;
};
