import { useToastService } from "./useToastService";
import { Invoice } from "../types";
import HttpClient from "../utils/httpClient";

export function useInvoices() {
  const client = new HttpClient();
  const toast = useToastService();

  async function getInvoices() {
    try {
      const response = await client.get("/invoices");
      if (response.status !== 200) {
        throw new Error("Failed to load invoices.");
      }
      return response.data as Invoice[];
    } catch (error: Error | any) {
      toast.present("error", error, {
        title: "Load Failed",
      });
    }
  }

  async function createInvoices(_invoice: Invoice) {
    /**
     * TODO: TOAST FUNCTIONALITY
     * Implement toast messages for success and error cases.
     * Use the `toast.present` function from the `useToastService` composable.
     * Invoice type must be implemented prior to toast implementation.
     * Currently, the Invoice type is defined, but not implemented.
     */
    try {
      const response = await client.post("/invoices", _invoice);
      toast.present(
        response.status === 200 ? "success" : "error",
        `${_invoice.name} ${response.status === 200 ? "created successfully" : "failed to create"}.`,
        {
          title:
            response.status === 200 ? "Creation Successful" : "Creation Failed",
        },
      );
      return response.data as Invoice;
    } catch (error: Error | any) {
      toast.present("error", error, {
        title: "Creation Failed",
      });
    }
  }

  async function updateInvoice(_invoice: Invoice) {
    try {
      const response = await client.put(`/services/${_invoice.id}`, _invoice);
      toast.present(
        response.status === 200 ? "success" : "error",
        `${_invoice.name} ${response.status === 200 ? "updated successfully" : "failed to update"}.`,
        {
          title:
            response.status === 200 ? "Update Successful" : "Update Failed",
        },
      );
      return response.data as Invoice;
    } catch (error: Error | any) {
      toast.present("error", error, {
        title: "Update Failed",
      });
    }
  }

  async function deleteInvoice(_invoice: Invoice) {
    try {
      const response = await client.delete(`/services/${_invoice.id}`);
      toast.present(
        response.status === 200 ? "success" : "error",
        `${_invoice.name} ${response.status === 200 ? "deleted successfully" : "failed to delete"}.`,
        {
          title:
            response.status === 200 ? "Deletion Successful" : "Deletion Failed",
        },
      );
      return response.status === 200;
    } catch (error: Error | any) {
      toast.present("error", error, {
        title: "Deletion Failed",
      });
    }
  }

  return {
    getInvoices,
    createInvoices,
    updateInvoice,
    deleteInvoice,
  };
}
